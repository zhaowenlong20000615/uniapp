import { API_VERSION, SERIAL, SERVER_TYPE, host } from '@/config'
import i18nConfig from '@/locales'
import dayjs from 'dayjs'
import Message from '../message'
import type { ICBOtions, IParamsFiles, IParamsFiles1, IResData, IRetrunData } from './type'
import { useUserStore } from '@/store/model/user'
import { useLocale } from '@/hooks/useLocale'
import { QueryAutograph } from '@/api/system'

const getUUID = () => {
  const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  return (
    S4() + S4() + '' + S4() + '' + S4() + '' + S4() + '' + S4() + S4() + S4() + new Date().getTime()
  )
}
// 获取文件后缀名
const getSuffix = (fileName: string) => {
  let pos = fileName.lastIndexOf('.')
  return pos != -1 ? fileName.substring(pos) : ''
}
/* 判断url路径处理 */
function posUrl(url: string) {
  let newUrl = ''
  if (/(http|https):\/\/([\w.]+\/?)\S*/.test(url)) {
    newUrl = url
  } else {
    newUrl = `${host}/api/${url}`
  }
  return newUrl
}

/**
 * [constructor description]
 * @param  {[Array]} files [chooseImg选中的tempFilePaths]
 * @param  {[Object]} json  [success每上传成功一张调用 complete全部上传完成调用]
 * @return {[void]}       [description]
 */
class OrdinaryUploadFiles {
  private fn!: (data: any) => void
  private complete!: (data: IRetrunData[]) => void
  private data!: IRetrunData[]
  private fileLen!: number
  private curIndex!: number
  private url!: string
  private formData!: any
  private dir!: string

  constructor(
    private readonly files: string[] | IParamsFiles[],
    cbOptions: ICBOtions
  ) {
    this.fn = cbOptions.success!
    this.complete = cbOptions.complete!
    this.data = []
    this.url = cbOptions.url ? host + '/api' + cbOptions.url : host + '/api' + '/v1/62d8baaa8f779'
    this.formData = cbOptions.formData || {}
    this.fileLen = files.length
    this.curIndex = 0
    this.dir = cbOptions.dir ?? ''
    Message.loading(i18nConfig.global.t('上传中'))
    this.upload()
  }
  upload() {
    const [locale] = useLocale()
    const tempPath = this.files[this.curIndex]
    const filePath = typeof tempPath === 'string' ? tempPath : tempPath.path
    uni.uploadFile({
      url: this.url,
      filePath,
      name: 'file',
      header: {
        'user-token': useUserStore().getToken,
        'Accept-Language': locale,
        'Accept-Serial': SERIAL
      },
      formData: {
        module: '',
        dir: this.dir,
        ...this.formData
      },
      success: (res) => {
        let data = JSON.parse(res.data)
        if (data.code == 1) {
          let file = Array.isArray(data.data) ? data.data[0] : data.data
          this.data.push(file)
          if (this.fn) this.fn(this.data)
        } else {
          Message.info(i18nConfig.global.t(data.msg))
        }
      },
      fail: (err) => {
        console.log(22222222, err)
      },
      complete: () => {
        this.curIndex++ // 这个图片执行完上传后，开始上传下一张
        if (this.curIndex >= this.fileLen) {
          // 当图片传完时，停止调用
          this.complete(this.data)
          uni.hideLoading()
        } else {
          // 若图片还没有传完，则继续调用函数
          this.upload()
        }
      }
    })
  }
}

class SaiZhuGeUploadFiles {
  private fn!: (obj: any) => void
  private complete!: (obj: any) => void
  private data!: any[]
  private fileLen!: number
  private curIndex!: number
  private resData!: IResData | null

  constructor(
    private readonly files: string[] | IParamsFiles1[],
    cbOptions: ICBOtions
  ) {
    this.fn = cbOptions.success!
    this.complete = cbOptions.complete!
    this.data = []
    this.fileLen = files.length
    this.curIndex = 0
    this.resData = null
    Message.loading(i18nConfig.global.t('加载中'))
    if (!this.resData) this.getUploadConfig()
  }

  async getUploadConfig() {
    try {
      const post = {
        member_id: API_VERSION.replace(/\D/g, '')
      }
      const { code, msg, data } = await QueryAutograph(post)
      if (code != 1) {
        uni.hideLoading()
        Message.info(msg)
        return
      }
      this.resData = data
      this.uploadFile()
    } catch (error) {
      uni.hideLoading()
      Message.info(JSON.stringify(error))
    }
  }

  uploadFile() {
    let resData = this.resData
    const fileInfo = this.files[this.curIndex]
    let allowUploadFile = this.uploadVerification(
      fileInfo,
      resData!.is_public,
      +(resData!.size + 1000000)
    )
    if (allowUploadFile !== true) {
      uni.hideLoading()
      return Message.info('文件超出大小限制')
    }
    // deploy 1 本地服务器上传 否则 上传至oss
    if (resData!.deploy === '1') this.uploadFileToLocal(resData!)
    else this.uploadFileToOSS(resData!)
  }

  // oss 上传验证
  uploadVerification(file: string | IParamsFiles1, isPublic = 1, size = 2048) {
    if (typeof file !== 'string' && file.size) return true
    if (isPublic != 1) return true
    if (typeof file !== 'string' && (file.size! ?? 0) / 1024 < size) return true
    return false
  }

  // 本地上传
  uploadFileToLocal(resData: IResData) {
    const [locale] = useLocale()
    let fileInfo = this.files[this.curIndex]
    uni.uploadFile({
      url: posUrl(''),
      filePath: typeof fileInfo === 'string' ? fileInfo : fileInfo.path,
      name: 'file',
      // #ifdef MP-DINGTALK
      fileType: 'image',
      // #endif
      header: {
        'user-token': useUserStore().getToken,
        'Accept-Language': locale,
        'Accept-Serial': SERIAL
      },
      formData: {
        module: '',
        dir: resData.dir || ''
      },
      success: (res) => {
        let data = JSON.parse(res.data)
        if (data.code == 1) {
          this.data.push({
            name: typeof fileInfo === 'string' ? fileInfo : fileInfo.name,
            ...data.data[0]
          })
          if (this.fn) this.fn(this.data)
        } else {
          Message.info('上传失败，请重试')
        }
      },
      complete: () => {
        this.curIndex++ // 这个图片执行完上传后，开始上传下一张
        if (this.curIndex >= this.fileLen) {
          // 当图片传完时，停止调用
          this.complete(this.data)
          uni.hideLoading()
        } else {
          // 若图片还没有传完，则继续调用函数
          this.uploadFile()
        }
      }
    })
  }
  // oss上传
  uploadFileToOSS(ossData: IResData) {
    const fileInfo = this.files[this.curIndex]
    let joint = getUUID()
    let fileName = `${joint}${getSuffix(
      typeof fileInfo === 'string' ? fileInfo : fileInfo.name ?? fileInfo.path
    )}`
    let filePath = `${ossData.dir}${dayjs(new Date()).format('YYYY-MM-DD')}/${fileName}`
    let fileNetworkPath = `${ossData.host}/${filePath}`
    uni.uploadFile({
      url: ossData.host,
      filePath: typeof fileInfo === 'string' ? fileInfo : fileInfo.path,
      // #ifdef MP-DINGTALK
      fileType: 'image',
      // #endif
      name: 'file',
      formData: {
        key: filePath, // 文件名
        policy: ossData.policy, // 后台获取超时时间
        OSSAccessKeyId: ossData.accessid, // 后台获取临时ID
        success_action_status: 200, // 让服务端返回200,不然，默认会返回204
        signature: ossData.signature // 后台获取签名
      },
      success: (res) => {
        console.log(res)
        if (res.statusCode == 200) {
          this.data.push({
            id: fileNetworkPath,
            name: typeof fileInfo === 'string' ? fileInfo : fileInfo.name || fileName,
            path: fileNetworkPath,
            thumb: fileNetworkPath + '?x-oss-process=video/snapshot,t_1000,m_fast'
          })
          if (this.fn) this.fn(this.data)
        } else {
          Message.info('上传失败，请重试')
        }
      },
      fail(err) {
        console.log(err)
      },
      complete: () => {
        this.curIndex++ // 当前文件执行完上传后，开始上传下一张
        if (this.curIndex >= this.fileLen) {
          // 当文件传完时，停止调用
          this.complete(this.data)
          uni.hideLoading()
        } else {
          // 若文件还没有传完，则继续调用函数
          this.uploadFile()
        }
      }
    })
  }
}

let UploadFiles: typeof OrdinaryUploadFiles | typeof SaiZhuGeUploadFiles

switch (SERVER_TYPE) {
  case 0: //赛诸葛
    UploadFiles = SaiZhuGeUploadFiles
    break
  case 1: //java
    UploadFiles = OrdinaryUploadFiles
    break
  default:
    UploadFiles = OrdinaryUploadFiles
    break
}

export default UploadFiles
