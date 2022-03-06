import DataTypes from 'sequelize'
import { db } from '../database'

export const Roles = db.define('roles', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
})
