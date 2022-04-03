import DataTypes from 'sequelize'
import { db } from '../database'

export const Recipe = db.define('recipe', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
})
