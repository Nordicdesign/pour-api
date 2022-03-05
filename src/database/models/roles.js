import { STRING } from "sequelize";
import DataTypes from "sequelize";
import { db } from "../database";

export const roles = db.define("roles", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  }
});

