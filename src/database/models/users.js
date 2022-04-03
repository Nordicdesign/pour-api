import DataTypes from 'sequelize'
import { db } from '../database'
import { Plan } from './plan'
import { Recipe } from './recipes'
import { UserRoles } from './user_roles'

export const Users = db.define('users', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  is_active: {
    type: DataTypes.TINYINT,
    allowNull: false,
    default: '1',
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email_confirmed_at: {
    type: DataTypes.DATE,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

Users.hasMany(Recipe, {
  foreignKey: 'user_id',
})
Users.hasMany(UserRoles)
Users.hasMany(Plan, {
  foreignKey: 'user_id',
})
Recipe.hasMany(Plan, {
  onDelete: 'cascade',
  hooks: true,
})

Plan.belongsTo(Recipe, {
  foreignKey: 'recipe_id',
})
