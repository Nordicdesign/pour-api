import DataTypes from 'sequelize'
import { db } from '../database'
// import { Users } from './users'

export const Recipe = db.define('recipe', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
})

// Recipe.belongsTo(Users)
