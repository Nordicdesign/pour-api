import DataTypes from 'sequelize'
import { db } from '../database'
// import { Users } from './users'

export const UserRoles = db.define('user_roles', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'User',
      key: 'id',
    },
  },
  role_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Roles',
      key: 'id',
    },
  },
})

// UserRoles.belongsTo(Users, {
//   foreignKey: 'user_id',
// })
