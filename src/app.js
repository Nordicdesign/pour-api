import 'dotenv/config'
import express from 'express'
// import bodyParser from 'body-parser';
import morgan from 'morgan'
import cors from 'cors'

import authRoute from './routes/auth.js'
import { sendError } from './helpers/sendError.js'

const app = express()

app.use(express.json())
// app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*') // update to match the domain you will make the request from
  next()
})
app.options('*', cors())

// request logging
app.use(morgan('dev'))

// ROUTES =============================================

app.use('/auth', authRoute)

// Handle 404
app.use((req, res, next) => res.status(404).send('404: Not found'))
// Handle 500
app.use((error, req, res, next) => {
  console.error(error)
  res.status(500).send('500: Internal Server Error')
})
// handle 401
app.use((error, req, res) => {
  if (error) {
    sendError(error)
  }
  return res.status(401).send('401: Unauthorized')
})

export default app
