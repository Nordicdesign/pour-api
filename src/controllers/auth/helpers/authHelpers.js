import { Users } from '../../../database/models/users.js';
import { api_response } from '../../../helpers/createResponse.js';

export async function doesUserExist(userName) {
  const user = Users.findOne({ where: { email: userName }});

  if (user === null) {
    return false
  }
  else {
    return user
  } 
}