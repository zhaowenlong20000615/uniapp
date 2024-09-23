import Message from '@/utils/message/index'
import UploadFiles from '@/utils/upload-image/index'
import type { IParamsFiles, IRetrunData } from '@/utils/upload-image/type'
import { HOME_PAGE_URL, LOGIN_PAGE_URL, STATIC_URL } from '@/config'
import { useSystemStore } from '@/store/model/system'

class CommonPageMethod {
  private static instance: CommonPageMethod
  public readonly STATIC_URL = STATIC_URL
  // public readonly StatusBarRpx = useSystemStore().StatusBarRpx
  // public readonly bottomSafeAreaRpx = useSystemStore().bottomSafeAreaRpx

  // private constructor(private readonly baseStore = useBaseStore()) {}
  private constructor() {}

  public static getInstance(): CommonPageMethod {
    if (!CommonPageMethod.instance) CommonPageMethod.instance = new CommonPageMethod()
    return CommonPageMethod.instance
  }

  get StatusBarRpx() {
    return useSystemStore().StatusBarRpx
  }

  get bottomSafeAreaRpx() {
    return useSystemStore().bottomSafeAreaRpx
  }

  // colorTheme() {
  //   const baseStore = useSystemStore()
  //   return baseStore.themeColor + '!important'
  // }

  // colorBgTheme() {
  //   const baseStore = useBaseStore()
  //   return baseStore.themeBgColor + '!important'
  // }

  // radioColor() {
  //   const baseStore = useBaseStore()
  //   return baseStore.themeColor
  // }

  i18n() {
    // return this.t;
  }

  // 跳转首页
  toHomeDiy() {
    const baseStore = useSystemStore()
    uni.switchTab({ url: HOME_PAGE_URL[baseStore.appTabBarType] })
  }

  // 跳转登录页
  toLoginDiy() {
    uni.navigateTo({ url: LOGIN_PAGE_URL })
  }

  _top() {
    const baseStore = useSystemStore()
    const h = uni.upx2px(110)
    const _h = h + baseStore.StatusBar! + 'px'
    console.log(_h)
    return _h
  }

  toJSON() {}

  // 动态跳转
  dynamicJump(url: string) {
    if (!url) return
    // 判断路径是否为网络路径
    if (/(http|https):\/\/([\w.]+\/?)\S*/.test(url)) {
      uni.navigateTo({
        url: `/pages/benben-built-in/web-view/index?webPath=${encodeURIComponent(url)}`
      })
    } else {
      uni.navigateTo({ url })
    }
  }

  // 设置自定义头部
  setNavigationBarTitle(title: string) {
    uni.setNavigationBarTitle({
      title: title
    })
  }

  // 点击复制
  copyText(data: any) {
    uni.setClipboardData({
      data: data,
      success: () => {
        Message.success('复制成功')
      }
    })
  }

  // 点击打电话
  callMobile(phoneNumber: string) {
    Message.showModal({
      title: '拨打电话给',
      content: phoneNumber,
      confirmText: '拨打',
      success: (res) => {
        if (res.confirm) {
          uni.makePhoneCall({
            phoneNumber
          })
        }
      }
    })
  }

  in_array(type: any, str: string | any) {
    let arr = []
    // str 是否为字符串
    if (typeof str === 'string') arr = str.split(',')
    // str 是否为数组
    if (typeof str === 'object') arr = str
    let index = -1
    index = arr.findIndex((item: any) => type == item)
    console.log('index-------------', index)
    if (index == -1) {
      return false
    }
    return true
  }

  mixinToPlayVideo(src: string) {
    const parm = encodeURIComponent(src)
    uni.navigateTo({
      url: `/pages/benben-built-in/play-video/index?src=${parm}`
    })
  }

  singleImagePreview(url: string) {
    uni.previewImage({
      current: url,
      urls: [url]
    })
  }

  multiImagePreview(url: string, images: any, field?: string) {
    let arr = []
    if (field) {
      images.map((item: any) => {
        arr.push(item[field])
      })
    } else {
      arr = images
    }
    uni.previewImage({
      current: url,
      urls: arr
    })
  }

  handleJumpDiy(e: UniHelper.BaseEvent) {
    const target = e.currentTarget || e.target,
      url = target?.dataset!.url || 'back',
      type = target?.dataset!.type
    if (url == '' || url == '#') return

    switch (type) {
      case 'switchTab':
        uni.switchTab({ url })
        break
      case 'redirectTo':
        uni.redirectTo({ url })
        break
      case 'reLaunch':
        uni.reLaunch({ url })
        break
      case 'navigateTo':
        uni.navigateTo({ url })
        break
      case 'back':
        uni.navigateBack({ delta: 1 })
        break
      default:
        uni.navigateTo({ url })
        break
    }
  }

  croppingUploadImage(path?: string): Promise<IRetrunData[] | null> {
    return new Promise((reslove, reject) => {
      const itemList = ['修改头像', '拍照', '从手机相册选择']

      function imageCroppingCuccess() {
        uni.$once('image-cropping-success', (file: IParamsFiles) => {
          if (!file) return
          new UploadFiles([file.path], {
            complete: (res) => {
              reslove(res)
            }
          })
        })
      }
      uni.showActionSheet({
        itemList: itemList,
        success: function (res) {
          if (res.tapIndex == 0 && path) {
            uni.navigateTo({
              url: `/pages/benben-built-in/image-cropping/index?rectHeight=200&rectWidth=200&&myImgUrl=${path}`,
              animationDuration: 0
            })
            imageCroppingCuccess()
          }
          if ((res.tapIndex == 1 && path) || (res.tapIndex == 0 && !path)) {
            uni.chooseImage({
              count: 1,
              sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
              success: (res: UniApp.ChooseImageSuccessCallbackResult) => {
                const tempFiles = res.tempFiles as File[]
                // 跳转到图片裁切页面
                uni.navigateTo({
                  url: `/pages/benben-built-in/image-cropping/index?rectHeight=200&rectWidth=200&fileType=${tempFiles[0].type}&myImgUrl=${res.tempFilePaths[0]}`,
                  animationDuration: 0
                })
                imageCroppingCuccess()
              }
            })
          }
          if ((res.tapIndex == 2 && path) || (res.tapIndex == 1 && !path)) {
            uni.chooseImage({
              count: 1,
              sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
              success: (res) => {
                const tempFiles = res.tempFiles as File[]
                // 跳转到图片裁切页面
                uni.navigateTo({
                  url: `/pages/benben-built-in/image-cropping/index?rectHeight=200&rectWidth=200&fileType=${tempFiles[0].type}&myImgUrl=${res.tempFilePaths[0]}`,
                  animationDuration: 0
                })
                imageCroppingCuccess()
              }
            })
          }
        },
        fail: function (res) {
          console.log(res.errMsg)
          reject('')
        }
      })
    })
  }
}

const usePageMethod = CommonPageMethod.getInstance()

export default usePageMethod
