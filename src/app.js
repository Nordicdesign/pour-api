import 'dotenv/config'
import express from 'express'
// import bodyParser from 'body-parser';
import morgan from 'morgan'
import cors from 'cors'
import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'

import authRoute from './routes/auth'
import recipesRoute from './routes/recipes'
import plansRoute from './routes/plans'
import { sendError } from './helpers/sendError'
import { protect } from './controllers/auth/helpers/authHelpers'

const app = express()

Sentry.init({
  dsn: 'https://404318ab40f2405ba504946211571b20@o551962.ingest.sentry.io/6311890',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler())
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler())

// All controllers should live here

app.use(express.json())
// app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*') // update to match the domain you will make the request from
  next()
})
app.options('*', cors())

// ROUTES =============================================
app.use('/auth', authRoute)

app.use('/api', protect)
app.use('/api/recipes', recipesRoute)
app.use('/api/plans', plansRoute)

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

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler())

// Optional fallthrough error handler
// eslint-disable-next-line node/handle-callback-err
// app.use(function onError(err, req, res, next) {
//   // The error id is attached to `res.sentry` to be returned
//   // and optionally displayed to the user for support.
//   res.statusCode = 500
//   res.end(res.sentry + '\n')
// })

// request logging
app.use(morgan('dev'))

export default app
