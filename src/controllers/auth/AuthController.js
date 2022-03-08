import bcrypt from 'bcrypt'
import { apiResponse } from '../../helpers/createResponse'
import { sendError } from '../../helpers/sendError'
import { Users } from '../../database/models/users'
import { doesUserExist, newToken } from './helpers/authHelpers'

const Auth = {
  async createUser(req, res) {
    try {
      const user = await doesUserExist(req.body.userName)
      if (user) {
        res.status(202).send(
          apiResponse({
            responseCode: 'user_exists',
            message: 'User already exists',
          })
        )
      } else {
        const userName = req.body.userName
        const password = req.body.password
        const saltRounds = 10
        bcrypt.hash(password, saltRounds, function (err, hash) {
          if (err) {
            sendError(res, err)
          }
          // all good, store the user
          const user = Users.create({
            email: userName,
            password: hash,
            is_active: '1',
          })
          res.status(201).send(
            apiResponse({
              responseCode: 'user_created',
              message: 'User created',
              payload: {
                user: user.id,
              },
            })
          )
        })
      }
    } catch (err) {
      sendError(res, err)
    }
  },

  async logUser(req, res) {
    if (!req.body.userName || !req.body.password) {
      return res.status(400).send(
        apiResponse({
          message: 'Email and password are required',
        })
      )
    }
    try {
      const user = await doesUserExist(req.body.userName)
      if (user) {
        try {
          const match = await bcrypt.compare(req.body.password, user.password)
          if (match) {
            const token = newToken(user.id)
            res.status(200).send(
              apiResponse({
                responseCode: 'user_login',
                message: 'User logged in',
                payload: {
                  user_id: user.id,
                  access_token: token,
                },
              })
            )
          } else {
            res.status(401).send(
              apiResponse({
                responseCode: 'not_authorized',
                message: 'User not authorized',
              })
            )
          }
        } catch (err) {
          sendError(res, err)
        }
      } else {
        res.status(401).send(
          apiResponse({
            responseCode: 'not_authorised',
            message: 'Not authorised',
          })
        )
      }
    } catch (err) {
      sendError(res, err)
    }
  },
}

export default Auth
