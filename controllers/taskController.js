const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  const task = await Task.create({
    ...req.body,
    UserId: req.user.id
  });
  res.status(201).json(task);
};

exports.getTasks = async (req, res) => {
  const { status } = req.query;

  let whereClause = {};

  if (req.user.role !== "admin") {
    whereClause.UserId = req.user.id;
  }

  if (status) {
    whereClause.status = status;
  }

  const tasks = await Task.findAll({ where: whereClause });
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findByPk(req.params.id);

  if (!task)
    return res.status(404).json({ message: "Task Not Found" });

  if (req.user.role !== "admin" && task.UserId !== req.user.id)
    return res.status(403).json({ message: "Forbidden" });

  await task.update(req.body);
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findByPk(req.params.id);

  if (!task)
    return res.status(404).json({ message: "Task Not Found" });

  if (req.user.role !== "admin" && task.UserId !== req.user.id)
    return res.status(403).json({ message: "Forbidden" });

  await task.destroy();
  res.json({ message: "Task Deleted Successfully" });
};
