export function apiResponse({
  statusCode,
  responseCode,
  message = null,
  payload = null,
}) {
  return {
    status: statusCode,
    code: responseCode,
    message: message,
    payload: payload,
  }
}
