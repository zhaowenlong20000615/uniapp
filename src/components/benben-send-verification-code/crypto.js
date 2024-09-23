// import CryptoJS from './crypto-js.min'
import CryptoJS from 'crypto-js'
const secret = 'c81b7d38b57d7dbabcd3c38dc37446f4'
/**
 * ### 字符串加密
 * @param text 需要加密的文本
 * @returns 加密后的文本
 */
export function encrypt(text) {
  let key = CryptoJS.enc.Utf8.parse(secret)
  let srcs = CryptoJS.enc.Utf8.parse(text)
  let encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
  return encrypted.toString()
}

/**
 * ### 字符串解密
 * @param text 需要解密的文本
 * @returns 解密后的文本
 */
export function decrypt(word) {
  let key = CryptoJS.enc.Utf8.parse(secret)
  let decrypt = CryptoJS.AES.decrypt(word, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}
const getUUID = () => {
  const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  return S4() + S4() + '' + S4() + '' + S4() + '' + S4() + '' + S4() + S4() + S4() + new Date().getTime()
}
export function getCaptchaData() {
  let device = ''
  // app端获取设备唯一标识
  // #ifdef APP-PLUS
  // device = plus.push.getClientInfo().clientid || ''
  // #endif
  let DEVICE_ID = uni.getStorageSync('DEVICE_ID')
  if (!DEVICE_ID) {
    DEVICE_ID = getUUID()
    uni.setStorageSync('DEVICE_ID', DEVICE_ID)
  }
  device = DEVICE_ID
  // 获取当前时间戳单位秒
  return encrypt(JSON.stringify({ device, timestamp: Math.floor(new Date().getTime() / 1000) }))
}
