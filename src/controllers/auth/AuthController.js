// import { users } from '../../database/models/users';
// import { api_response } from '../../helpers/createResponse';

import { api_response } from '../../helpers/createResponse.js';

const Auth = {
  async createUser(req, res) {
    console.log(req.body);
    res.send(api_response({ 
      statusCode: 200, 
      responseCode: "user_login",
      message: "User logged in"
    }))
  }
}

export default Auth;