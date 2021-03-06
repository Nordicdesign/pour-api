import { Sequelize } from 'sequelize'

const config = {
  dialect: 'mysql',
  logging: false,
  define: {
    freezeTableName: true,
    underscored: true,
    timestamps: false,
  },
  retry: {
    match: [/Deadlock/i],
    max: 3, // Maximum rety 3 times
    backoffBase: 1000, // Initial backoff duration in ms. Default: 100,
    backoffExponent: 1.5, // Exponent to increase backoff each try. Default: 1.1
  },
}

export let db

if (process.env.DB_URL) {
  const DB_URL = process.env.DB_URL
  db = new Sequelize(DB_URL, config)
} else {
  const DATABASE = process.env.DB_NAME
  const USER = process.env.DB_USER
  const PASSWORD = process.env.DB_PASS
  const HOST = process.env.DB_HOST
  const DB_PORT = process.env.DB_PORT
  config.host = HOST
  config.port = DB_PORT
  db = new Sequelize(DATABASE, USER, PASSWORD, config)
}

db.sync({ alter: true })
