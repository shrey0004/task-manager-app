const bcrypt = require('bcrypt');
const { User } = require('../models');

exports.getAllUsers = async (req, res) => {
  // Only admin can access
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const users = await User.findAll({ attributes: ['id', 'email', 'role', 'createdAt'] });
  res.json(users);
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  if (req.user.role !== 'admin' && req.user.id !== id)
    return res.status(403).json({ message: 'Forbidden' });
  const user = await User.findByPk(id, { attributes: ['id', 'email', 'role', 'createdAt'] });
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  if (req.user.role !== 'admin' && req.user.id !== id)
    return res.status(403).json({ message: 'Forbidden' });
  const { email, password, role } = req.body;
  const user = await User.findByPk(id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  if (email) user.email = email;
  if (password) user.password = await bcrypt.hash(password, 10);
  if (role && req.user.role === 'admin') user.role = role;
  await user.save();
  res.json({ message: 'User updated' });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const user = await User.findByPk(id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  await user.destroy();
  res.json({ message: 'User deleted' });
};
