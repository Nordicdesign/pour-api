import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { sendError } from '../../helpers/sendError'
import { Users } from '../../database/models/users'
import { doesUserExist, newToken, getResetRequest } from './helpers/authHelpers'
import { Requests } from '../../database/models/requests'

const Auth = {
  async createUser(req, res) {
    try {
      const user = await doesUserExist(req.body.userName)
      if (user) {
        res.status(202).send({
          responseCode: 'user_exists',
          message: 'User already exists',
        })
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
          res.status(201).send({
            responseCode: 'user_created',
            message: 'User created',
            user: user.id,
          })
        })
      }
    } catch (err) {
      sendError(res, err)
    }
  },

  async logUser(req, res) {
    if (!req.body.userName || !req.body.password) {
      return res.status(400).send({
        message: 'Email and password are required',
      })
    }
    try {
      const user = await doesUserExist(req.body.userName)
      if (user) {
        try {
          const match = await bcrypt.compare(req.body.password, user.password)
          if (match) {
            const token = newToken(user.id)
            res.status(200).send({
              responseCode: 'user_login',
              message: 'User logged in',
              user_id: user.id,
              access_token: token,
            })
          } else {
            res.status(401).send({
              code: 'responseCode',
              message: 'message',
            })
          }
        } catch (err) {
          sendError(res, err)
        }
      } else {
        res.status(401).send({
          responseCode: 'not_authorised',
          message: 'Not authorised',
        })
      }
    } catch (err) {
      sendError(res, err)
    }
  },

  async forgotRequest(req, res) {
    try {
      const user = await doesUserExist(req.body.userName)
      console.log(user)
      if (user) {
        const id = uuidv4()
        const request = {
          id,
          email: user.email,
        }
        Requests.create(request)
      }
      res.status(200).json()
    } catch (err) {
      sendError(res, err)
    }
  },

  async resetPassword(req, res) {
    try {
      const thisRequest = await getResetRequest(req.body.id)
      if (thisRequest) {
        const user = await doesUserExist(thisRequest.email)
        console.log('found user > ', user)
        const password = req.body.password
        console.log(password)
        const saltRounds = 10
        bcrypt.hash(password, saltRounds, async function (err, hash) {
          if (err) {
            sendError(res, err)
          }
          console.log('new password > ', hash)
          // all good, store the user
          await Users.update(
            { password: hash },
            {
              where: {
                email: user.email,
              },
            }
          )
          res.status(204).json()
        })
        // bcrypt.hash(req.body.password, 10).then((hashed) => {
        //   user.password = hashed
        //   updateUser(user)
        //   res.status(204).json()
        // })
      } else {
        res.status(404).json()
      }
    } catch (err) {
      sendError(res, err)
    }
    res.status(200).json()
  },
}

export default Auth
