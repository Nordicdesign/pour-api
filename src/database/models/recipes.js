import DataTypes from 'sequelize'
import { db } from '../database'
import { Plan } from './plan'
// import { Users } from './users'

export const Recipe = db.define('recipe', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  // user_id: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: 'Users',
  //     key: 'id',
  //   },
  // },
})

// Recipe.belongsTo(Plan, {
//   foreignKey: 'recipe_id',
// })
// Recipe.hasMany(Plan)
// Recipe.hasMany(Plan, {
//   foreignKey: 'recipe_id',
// })
// Recipe.belongsTo(Users, {
//   foreignKey: 'user_id',
// })
