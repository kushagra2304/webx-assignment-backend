const Task = require("../models/Task");
const User = require("../models/User");

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      userId: Number(req.user.id)
    });

    const createdTask = await Task.findByPk(task.id, {
      include: {
        model: User,
        attributes: ["id", "fullName", "email"]
      }
    });

    res.status(201).json(createdTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { status } = req.query;

    let whereClause = {};
    if (req.user.role !== "admin") {
      whereClause.userId = Number(req.user.id);
    }

    if (status) {
      whereClause.status = status;
    }

    const tasks = await Task.findAll({
      where: whereClause,
      include: {
        model: User,
        attributes: ["id", "fullName", "email"]
      },
      order: [["createdAt", "DESC"]]
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task Not Found" });
    }
    if (
      req.user.role !== "admin" &&
      Number(task.userId) !== Number(req.user.id)
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await task.update(req.body);

    const updatedTask = await Task.findByPk(task.id, {
      include: {
        model: User,
        attributes: ["id", "fullName", "email"]
      }
    });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task Not Found" });
    }
    if (
      req.user.role !== "admin" &&
      Number(task.userId) !== Number(req.user.id)
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await task.destroy();

    res.json({ message: "Task Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
