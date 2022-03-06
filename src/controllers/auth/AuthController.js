import bcrypt from 'bcrypt';
import { api_response } from '../../helpers/createResponse.js';
import { doesUserExist } from './helpers/authHelpers.js'

const Auth = {
  async createUser(req, res) {
    const saltRounds = 10;
    console.log(req.body);
    res.send(api_response({ 
      statusCode: 200, 
      responseCode: "user_login",
      message: "User logged in"
    }))
  },


  async logUser(req, res) {
    try {
      const user = await doesUserExist(req.body.userName);
      if (user) {
        res.send(api_response({ 
          statusCode: 200, 
          responseCode: "user_login",
          message: "User logged in",
          payload: {
            user
          }
        }))
      } else {
        res.send(api_response({
          statusCode: 401,
          responseCode: "not_authorised",
          message: "Not authorised"
        }))
      } 
    } catch (err) {
      console.error(err)
      res.send(api_response({
        statusCode: 422,
        responseCode: "boop_boot_broken"
      }))
    }    
  }
}

export default Auth;