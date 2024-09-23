export default class HttpCode {
  static readonly STATUS_SUCCESS_CODE_200 = 200
  // HTTP 请求失败
  static readonly STATUS_CODE_400 = 400
  static readonly STATUS_CODE_401 = 401
  static readonly STATUS_CODE_403 = 403
  static readonly STATUS_CODE_404 = 404
  static readonly STATUS_CODE_408 = 408
  static readonly STATUS_CODE_500 = 500
  static readonly STATUS_CODE_501 = 501
  static readonly STATUS_CODE_502 = 502
  static readonly STATUS_CODE_503 = 503
  static readonly STATUS_CODE_504 = 504
  static readonly STATUS_CODE_505 = 505

  // data -> code 请求成功
  static readonly DATA_SUCCESS_CODE = 1

  // data -> code 未登录
  static readonly DATA_NO_LOGIN_CODE = -201
  static readonly DATA_INVALID_TOKEN = -202
}
