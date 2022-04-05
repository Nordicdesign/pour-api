import DataTypes from 'sequelize'
import { db } from '../database'

export const Requests = db.define('requests', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})
