import { api_response } from './createResponse.js';

export function sendError(res, err) {
  console.log(err);
  res.send(api_response({
    statusCode: 422,
    responseCode: "boop_boot_broken",
    message: "something broken",
    payload: {"error": err}
  }))
}