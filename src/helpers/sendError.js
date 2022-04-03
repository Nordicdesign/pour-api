import { apiResponse } from './createResponse'

export function sendError(res, err) {
  console.log(err)
  res.status(422).send(
    apiResponse({
      statusCode: 422,
      responseCode: 'boop_boot_broken',
      message: 'something broken',
      payload: { error: err },
    })
  )
}
