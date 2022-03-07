import DataTypes from 'sequelize'
import { db } from '../database'

export const Plan = db.define('plan', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  date: {
    type: DataTypes.STRING,
  },
  slot: {
    type: DataTypes.INTEGER,
  },
  order: {
    type: DataTypes.INTEGER,
  },
  recipe_id: {
    type: DataTypes.STRING,
    references: {
      model: 'Recipe',
      key: 'id',
    },
  },
})
