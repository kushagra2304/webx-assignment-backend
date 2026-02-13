const Task = require("../models/Task");
const User = require("../models/User");
const { Op } = require("sequelize");
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
    const { status, search = "" } = req.query;
    const page = Number(req.query.page) || 1;        //pagination
    const limit = Number(req.query.limit) || 5;
    const offset = (page - 1) * limit;
  
    let whereClause = {};
    if (req.user.role !== "admin") {
      whereClause.userId = Number(req.user.id);
    }

    if (status) {
      whereClause.status = status;
    }

if (search && search.trim() !== "") {    //SEARCH
  whereClause[Op.and] = [
    ...(whereClause[Op.and] || []),
    {
      [Op.or]: [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ]
    }
  ];
}

    const { count, rows } = await Task.findAndCountAll({
      where: whereClause,
      include: {
        model: User,
        attributes: ["id", "fullName", "email"]
      },
      order: [["createdAt", "DESC"]],
      limit,
      offset
    });

    res.json({
      totalTasks: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      tasks: rows
    });

  } catch (error) {
    console.error(error);
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
