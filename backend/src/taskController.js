const { Task, User } = require('../models');
const { buildTaskQueryParams, buildPagination } = require('../utils/queryHelpers');
const fs = require('fs');
const path = require('path');

exports.getTasks = async (req, res) => {
  const filters = buildTaskQueryParams(req.query);
  const { limit, offset } = buildPagination(req.query);
  // If non-admin, only their own tasks
  if (req.user.role !== 'admin') filters.assignedTo = req.user.id;
  const result = await Task.findAndCountAll({
    where: filters,
    order: [[req.query.sortField || 'dueDate', req.query.sortOrder || 'ASC']],
    limit,
    offset,
    include: [{ model: User, as: 'user', attributes: ['id', 'email'] }]
  });
  res.json({ count: result.count, tasks: result.rows });
};

exports.getTaskById = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByPk(id, {
    include: [{ model: User, as: 'user', attributes: ['id', 'email'] }]
  });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  if (req.user.role !== 'admin' && task.assignedTo !== req.user.id)
    return res.status(403).json({ message: 'Forbidden' });
  res.json(task);
};

exports.createTask = async (req, res) => {
  const { title, description, status, priority, dueDate, assignedTo } = req.body;
  const assignee = req.user.role === 'admin' && assignedTo ? assignedTo : req.user.id;
  const newTask = await Task.create({
    title, description, status, priority, dueDate, assignedTo: assignee
  });
  res.status(201).json(newTask);
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByPk(id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  if (req.user.role !== 'admin' && task.assignedTo !== req.user.id)
    return res.status(403).json({ message: 'Forbidden' });
  const { title, description, status, priority, dueDate, assignedTo } = req.body;
  if (title) task.title = title;
  if (description) task.description = description;
  if (status) task.status = status;
  if (priority) task.priority = priority;
  if (dueDate) task.dueDate = dueDate;
  if (assignedTo && req.user.role === 'admin') task.assignedTo = assignedTo;
  await task.save();
  res.json({ message: 'Task updated' });
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByPk(id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  if (req.user.role !== 'admin' && task.assignedTo !== req.user.id)
    return res.status(403).json({ message: 'Forbidden' });
  // Optionally: remove associated files
  const uploadDir = path.join(__dirname, '../uploads/tasks', id);
  if (fs.existsSync(uploadDir)) fs.rmSync(uploadDir, { recursive: true, force: true });
  await task.destroy();
  res.json({ message: 'Task deleted' });
};

exports.uploadTaskDocuments = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByPk(id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  if (req.user.role !== 'admin' && task.assignedTo !== req.user.id)
    return res.status(403).json({ message: 'Forbidden' });
  if (!req.files || req.files.length === 0)
    return res.status(400).json({ message: 'No files uploaded' });
  // Limit to 3 total
  const existing = task.attachedDocuments || [];
  if (existing.length + req.files.length > 3)
    return res.status(400).json({ message: 'Cannot attach more than 3 documents' });
  // Save file info
  const saved = req.files.map((file) => ({ filename: file.filename, url: `/uploads/tasks/${id}/${file.filename}`, uploadedAt: new Date() }));
  task.attachedDocuments = [...existing, ...saved];
  await task.save();
  res.json({ message: 'Files uploaded', attachments: task.attachedDocuments });
};
