import bcrypt from 'bcrypt';
import { api_response } from '../../helpers/createResponse.js';
import { sendError } from '../../helpers/sendError.js';
import { Users } from '../../database/models/users.js';
import { doesUserExist } from './helpers/authHelpers.js';

const Auth = {
  async createUser(req, res) {
    try {
      const user = await doesUserExist(req.body.userName);
      if (user) {
        res.send(api_response({ 
          statusCode: 202, 
          responseCode: "user_exists",
          message: "User already exists"
        }))
      } else {
        const userName = req.body.userName;
        const password = req.body.password;
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, function(err, hash) {
          if (err) {
            sendError(err)  
          } 
          // all good, store the user
          const user = Users.create({
            email: userName,
            password: hash,
            is_active: "1"
          })
          res.send(api_response({ 
            statusCode: 201, 
            responseCode: "user_created",
            message: "User created"
          }))
        })
      }
    } catch (err) {
      sendError(err)      
    }
      
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
            "id": user.id
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
      sendError(err)  
    }    
  }
}

export default Auth;