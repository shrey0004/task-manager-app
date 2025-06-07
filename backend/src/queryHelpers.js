const { Op } = require('sequelize');

exports.buildTaskQueryParams = (query) => {
  const where = {};
  if (query.status) where.status = query.status;
  if (query.priority) where.priority = query.priority;
  if (query.dueDateBefore) where.dueDate = { [Op.lt]: new Date(query.dueDateBefore) };
  if (query.assignedTo) where.assignedTo = query.assignedTo;
  return where;
};

exports.buildPagination = (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const offset = (page - 1) * limit;
  return { limit, offset };
};
