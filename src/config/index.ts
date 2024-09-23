import type { ILANGUAGES, ITabbarConfig, IThemeColorConfig } from './type'

export const dev_host = 'https://yufabu.saizhuge.net' // 开发环境域名
export const mock_host = 'http://mock.zhongbenruanjian.com' // MOCK环境域名
export const product_host = 'https://app.bocuiyige.com' // 生产环境域名
export const WEBSOCKET = 'wss://zbphp.zhongbenzx.com/socket/'
export const PAAS_URL = 'https://yufabu.saizhuge.net' // paas域名
export let IS_DEV = 1 // 0:生产环境 1:开发环境 2:mock环境 3:paas环境
export let SERVER_TYPE = 0 // 服务端类型 0:赛诸葛  1:java 其他待添加开发
export const PAGE_SIZE = 15 // 分页配置 每页条数
export const API_VERSION = 'm6980' //APP接口版本号 正常是V1 使用天添客m加企业ID
let _host = ''
switch (IS_DEV) {
  case 0:
    _host = product_host
    break
  case 1:
    _host = dev_host
    break
  case 2:
    _host = mock_host
    break
  case 3:
    _host = PAAS_URL
    break
  default:
    break
}
export const host = _host // 项目中接口地址host
export const SHAREURL = host + '/h5/#/' // 分享的H5地址
export const SERIAL = '' // 项目序列号(千万千万千万不要修改!!!!)
export const BenBenChooseFileKey = '' // 文件选择原生插件key
export const BASE_URL = `${host}` // 基础路径
export const API_BASE_URL = `${host}` // 接口请求基础路径
export const STATIC_URL = '/static/images/' // 静态资源目录
export const IMG_BASE_URL = `${host}/upload/` // 图片基础路径 公共filters assembleImgSrc依赖此配置
export const HOME_PAGE_URL = ['/pages/tabBar/home/home'] // 配置首页路由 主要用于跳转首页
// tabBar配置
export const tabbarConfig: ITabbarConfig = {
  roleTabBarShow: [
    [
      {
        index: 0,
        ident: ''
      },
      {
        index: 1,
        ident: ''
      },
      {
        index: 2,
        ident: ''
      },
      {
        index: 3,
        ident: ''
      }
    ]
  ],
  listNum: 4
}
// 主题色配置
export const themeColorConfig: Array<IThemeColorConfig> = [
  {
    colorConfig: [
      '#333333',
      '#666666',
      '#999999',
      '#ffffff',
      '#1178F0',
      '#F02325',
      '#FC9C3A',
      '#4DC777',
      '#F2CC98',
      '#F2CC66'
    ],
    bgColorConfig: [
      'rgba(255, 120, 110, 1)',
      'rgba(103, 162, 248, 1)',
      'rgba(5, 172, 156, 1)',
      'rgba(176, 141, 234, 1)',
      'rgba(235, 149, 75, 1)',
      'rgba(0, 82, 199, 1)',
      'rgba(26, 104, 64, 1)',
      'rgba(235, 104, 30, 1)',
      'rgba(27, 37, 64, 1)',
      'rgba(24, 144, 255, 1)'
    ],
    bdColorConfig: [
      '#f8f8f8',
      '#FFFFFF',
      '#1178F0',
      '#FC9C3A',
      '#333333',
      '#666666',
      '#999999',
      '#ffffff',
      '#1178F0',
      '#F02325'
    ]
  }
]
export const cartNumIndex = 2
export let LOGIN_PAGE_URL = ''
// #ifdef APP-PLUS || H5
LOGIN_PAGE_URL = '/pages/tabBar/loginPage/loginPage' // 登录页面路由 request.js 依赖此配置 主要用于登录失效跳转
// #endif
// #ifdef MP-WEIXIN
LOGIN_PAGE_URL = '/pages/tabBar/loginPage/loginPage' // 登录页面路由 request.js 依赖此配置 主要用于登录失效跳转
// #endif
export const LANGUAGES: Array<ILANGUAGES> = [
  {
    name: '中文 (简体)',
    value: 'zh-Hans'
  }
] //语言包配置
const locale = uni.getLocale()
export const LOCALE = LANGUAGES.find((item) => item.value == locale) //语言包配置
let _platform = uni.getSystemInfoSync().platform
// #ifdef APP-PLUS
_platform = _platform === 'android' ? 'Android' : 'IOS'
// #endif
// #ifdef H5
_platform = 'Web'
// #endif
// #ifdef MP-WEIXIN
_platform = 'Wechat'
// #endif
// #ifdef MP-ALIPAY
_platform = 'Alipay'
// #endif
// #ifdef MP-BAIDU
_platform = 'Baidu'
// #endif
// #ifdef MP-TOUTIAO
_platform = 'ByteBounce'
// #endif
// #ifdef MP-360
_platform = '360'
// #endif
// #ifdef QUICKAPP-WEBVIEW
_platform = 'FastApp'
// #endif
export const ACCEPT_PLATFORM = _platform //所属平台
export const SYSTEM_CONFIG = {
  // 系统配置
  logo: '/static/logo.png',
  appName: '美世企业微信小程序',
  appVersion: '1.0.0',
  platform: _platform
}
export const needProductUrl = []
const needPageUrl: Array<string> = [
  // "/pages/kehuguanli/newCustomer/newCustomer", "/pages/kehuguanli/channelSelection/channelSelection",
  // 	"/pages/kehuguanli/selectiveActivity/selectiveActivity", "/pages/kehuguanli/newSuccess/newSuccess",
  // 	"/pages/kehuguanli/resourceAssignment/resourceAssignment", "/pages/kehuguanli/suballotment/suballotment",
  // 	"/pages/kehuguanli/transferCharge/transferCharge", "/pages/kehuguanli/customerDetails/customerDetails",
  // 	"/pages/kehuguanli/addedReturnVisitRecord/addedReturnVisitRecord",
  // 	"/pages/kehuguanli/returnVisitDetails/returnVisitDetails",
  // 	"/pages/kehuguanli/newInterviewInvitation/newInterviewInvitation",
  // 	"/pages/kehuguanli/addedInterviewRecords/addedInterviewRecords",
  // 	"/pages/kehuguanli/addedInterviewRecord/addedInterviewRecord", "/pages/kehuguanli/orderDetails/orderDetails",
  // 	"/pages/kehuguanli/collectionDetails/collectionDetails", "/pages/kehuguanli/packageDetails/packageDetails",
  // 	"/pages/kehuguanli/newPresaleApplication/newPresaleApplication",
  // 	"/pages/qudaoliebiao/channelDetails/channelDetails", "/pages/qudaoliebiao/rebateDetails/rebateDetails",
  // 	"/pages/qudaoliebiao/eventDetails/eventDetails", "/pages/gongzuotai/customerHighSeas/customerHighSeas",
  // 	"/pages/gongzuotai/activityList/activityList", "/pages/gongzuotai/highSeasCustomerDetail/highSeasCustomerDetail"
]
const defNeedLoginPage = [
  '/pages/user/address/address-list/index',
  '/pages/user/address/address-add/index',
  '/pages/index/setting/change-pay-password/index',
  '/pages/index/setting/modify-pay-password/index',
  '/pages/index/setting/change-password/index',
  '/pages/service-mssage/message/message-list/index',
  '/pages/user/user/info/index',
  '/pages/user/user/avatar-cropping/index',
  '/pages/index/setting/setting/index',
  '/pages/index/setting/feedback/index',
  '/pages/index/setting/my-feedback/index',
  '/pages/index/setting/verify-oldphone/index',
  '/pages/index/setting/change-newphone/index',
  '/pages/user/wallet/my-wallet/index',
  '/pages/user/wallet/consumer-detail/index',
  '/pages/user/wallet/recharge/index',
  '/pages/user/wallet/recharge-log/index',
  '/pages/user/wallet/withdraw/index',
  '/pages/user/wallet/withdraw-success/index',
  '/pages/user/wallet/account-bind/index',
  '/pages/user/wallet/alipay-bind/index',
  '/pages/user/wallet/wechat-bind/index',
  '/pages/user/user/my-favorites/index',
  '/pages/user/user/my-footprint/index',
  '/pages/order/afterorder/afterorder-apply/index',
  '/pages/order/afterorder/afterorder-status-list/index',
  '/pages/order/afterorder/afterorder-detail/index',
  '/pages/order/afterorder/afterorder-sendback/index',
  '/pages/order/order-process/confirm-order/index',
  '/pages/order/order-process/pay-order/index',
  '/pages/order/order-process/pay-success/index',
  '/pages/order/order-process/choos_coupon/index',
  '/pages/order/order-list/all-order/index',
  '/pages/order/orderdetail/order-detail/index',
  '/pages/order/orderdetail/express-delivery/index',
  '/pages/order/evaluation/order-evaluation/index',
  '/pages/news/article/article-favoriters/index',
  '/pages/goods/ask-answer/my-ask-answer/index',
  '/pages/service-message/message/message-type/index',
  '/pages/user/coupon/my-coupon/index',
  '/pages/integral/myintegral/my-integral/index',
  '/pages/distribution/distribution/my-distribution/index',
  '/pages/service-message/service/service-detail/index',
  '/pages/user/invite/user-invite/index',
  '/pages/index/setting/modify-password-verify-phone/index',
  '/pages/index/setting/modify-password/index'
]
let needLoginPage = defNeedLoginPage
if (Array.isArray(needPageUrl)) {
  needLoginPage = defNeedLoginPage.concat(needPageUrl)
}

export const needLoginPages = needLoginPage
