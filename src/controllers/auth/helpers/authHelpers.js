import bcrypt from 'bcrypt'
import { Users } from '../../../database/models/users'
import jwt from 'jsonwebtoken'
import { sendError } from '../../../helpers/sendError'

// import { api_response } from '../../../helpers/createResponse';
// import { sendError } from '../../../helpers/sendError';

const jwtToken = process.env.JWT_TOKEN
const jwtExp = process.env.JWT_EXP

export async function doesUserExist(userName) {
  const user = Users.findOne({ where: { email: userName } })

  if (user === null) {
    return false
  } else {
    return user
  }
}

export async function checkPassword(password, hash) {
  const isValid = bcrypt.compare(password, hash, function (err, result) {
    if (err) {
      const error = {
        error: err,
      }
      return error
    }
    if (result === true) {
      return true
    } else {
      return false
    }
    // result == true
  })

  return isValid
}

export const newToken = (user) => {
  return jwt.sign({ id: user }, jwtToken, {
    expiresIn: jwtExp,
  })
}

export const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, jwtToken, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

// export const signup = async (req, res) => {
//   if (!req.body.email || !req.body.password) {
//     return res.status(400).send({ message: 'need email and password' })
//   }

//   try {
//     const user = await Users.create(req.body)
//     const token = newToken(user)
//     return res.status(201).send({ token })
//   } catch (e) {
//     return res.status(500).end()
//   }
// }

// export const signin = async (req, res) => {
//   if (!req.body.email || !req.body.password) {
//     return res.status(400).send({ message: 'need email and password' })
//   }

//   const invalid = { message: 'Invalid email and passoword combination' }

//   try {
//     const user = await User.findOne({ email: req.body.email })
//       .select('email password')
//       .exec()

//     if (!user) {
//       return res.status(401).send(invalid)
//     }

//     const match = await user.checkPassword(req.body.password)

//     if (!match) {
//       return res.status(401).send(invalid)
//     }

//     const token = newToken(user)
//     return res.status(201).send({ token })
//   } catch (e) {
//     console.error(e)
//     res.status(500).end()
//   }
// }

export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).end()
  }

  const token = bearer.split('Bearer ')[1].trim()
  let payload
  try {
    payload = await verifyToken(token)
  } catch (e) {
    return res.status(401).end()
  }

  try {
    const user = await Users.findByPk(payload.id)

    if (!user) {
      return res.status(401).end()
    }
    console.log('user found ', user)

    req.user = user.id
    next()
  } catch (err) {
    sendError(res, err)
  }
}
