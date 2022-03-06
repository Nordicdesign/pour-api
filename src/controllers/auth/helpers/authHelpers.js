import bcrypt from 'bcrypt'
import { Users } from '../../../database/models/users'
// import { api_response } from '../../../helpers/createResponse';
// import { sendError } from '../../../helpers/sendError';

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
