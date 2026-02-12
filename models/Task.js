const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Task = sequelize.define("Task", {
  title: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT,
  status: {
    type: DataTypes.ENUM("pending", "in-progress", "completed"),
    defaultValue: "pending"
  },
  userId: { 
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

User.hasMany(Task, { 
  foreignKey: "userId",
  onDelete: "CASCADE" 
});

Task.belongsTo(User, { 
  foreignKey: "userId" 
});

module.exports = Task;
