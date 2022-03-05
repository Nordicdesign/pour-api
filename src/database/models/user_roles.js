import DataTypes from "sequelize";
import { db } from "../database.js";

export const user_roles = db.define("user_roles", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "user",
      key: "id",
    },
  },
  role_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "roles",
      key: "id"
    }
  }
});
