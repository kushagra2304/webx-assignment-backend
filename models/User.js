const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  fullName: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },

  email: { 
    type: DataTypes.STRING, 
    unique: true, 
    allowNull: false 
  },

  contactNumber: { 
    type: DataTypes.STRING 
  },

  username: { 
    type: DataTypes.STRING, 
    unique: true, 
    allowNull: false 
  },

  password: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },

  profileImage: { 
    type: DataTypes.STRING 
  }, 

  role: {
    type: DataTypes.ENUM("admin", "user"),
    defaultValue: "user"
  }

}, {
  timestamps: true
});

module.exports = User;
