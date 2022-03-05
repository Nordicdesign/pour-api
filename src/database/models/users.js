import DataTypes from "sequelize";
import { db } from "../database";
// import { user_roles } from "./user_roles";
// import { roles } from "./roles";

export const users = db.define("users", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  is_active: {
    type: DataTypes.TINYINT,
    allowNull: false,
    default: "1",
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// users.hasMany(role, {
//   foreignKey: "user_id",
//   sourceKey: "user_id",
//   as: "profile_data",
//   constraints: false,
// });
