const Task = require('../models/Task');

const createTask = async (taskData, userId) => {
  const task = await Task.create({ ...taskData, user: userId });
  return task;
};

const getTasks = async (userId, { category, dueBefore }) => {
  const query = { user: userId };
  if (category) query.category = category;
  if (dueBefore) query.deadline = { $lte: new Date(dueBefore) };
  return await Task.find(query).sort({ createdAt: -1 });
};

const getTaskById = async (taskId, userId) => {
  const task = await Task.findOne({ _id: taskId, user: userId });
  if (!task) {
    const error = new Error('Task not found or not authorized');
    error.statusCode = 404;
    throw error;
  }
  return task;
};

const updateTask = async (taskId, userId, updateData) => {
  const task = await Task.findOneAndUpdate(
    { _id: taskId, user: userId },
    { $set: updateData },
    { new: true, runValidators: true }
  );
  if (!task) {
    const error = new Error('Task not found or not authorized');
    error.statusCode = 404;
    throw error;
  }
  return task;
};

const deleteTask = async (taskId, userId) => {
  const task = await Task.findOneAndDelete({ _id: taskId, user: userId });
  if (!task) {
    const error = new Error('Task not found or not authorized');
    error.statusCode = 404;
    throw error;
  }
  return task;
};

const toggleTaskCompletion = async (taskId, userId) => {
  const task = await Task.findOne({ _id: taskId, user: userId });
  if (!task) {
    const error = new Error('Task not found or not authorized');
    error.statusCode = 404;
    throw error;
  }
  task.completed = !task.completed;
  await task.save();
  return task;
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
};