import { EventBusKey, HttpCode } from '@/constant'
import type { IResFactory, IResFactoryOptions } from './type'
import { useUserStore } from '@/store/model/user'
import Message from '../message'

export class ResFactory {
  private constructor() {}

  public static createRes<ResT>(options: IResFactoryOptions<ResT>) {
    const {
      res: { statusCode }
    } = options
    switch (statusCode) {
      case HttpCode.STATUS_SUCCESS_CODE_200:
        new StatusCode200<ResT>(options)
        break
      case HttpCode.STATUS_CODE_400:
        break
      case HttpCode.STATUS_CODE_401:
        break
      case HttpCode.STATUS_CODE_403:
        break
      case HttpCode.STATUS_CODE_404:
        break
      case HttpCode.STATUS_CODE_500:
        new StatusCode500<ResT>(options)
        break
      default:
        break
    }
  }
}

export class StatusCode200<ResT> implements IResFactory {
  constructor(private readonly options: IResFactoryOptions<ResT>) {
    this.response()
  }

  response(): void {
    const { header, data } = this.options.res
    const { resolve } = this.options
    const { code } = data

    uni.$emit(EventBusKey.RES_HEADER, header)
    resolve({ ...data, code: Number(code) })
    const baseStore = useUserStore()
    switch (Number(code)) {
      case HttpCode.DATA_SUCCESS_CODE:
        break
      case HttpCode.DATA_NO_LOGIN_CODE:
        baseStore?.logout()
        break
      case HttpCode.DATA_INVALID_TOKEN:
        baseStore?.logout()
        break

      default:
        Message.info(data.msg)
        break
    }
  }
}

export class StatusCode500<ResT> implements IResFactory {
  constructor(private readonly options: IResFactoryOptions<ResT>) {
    this.response()
  }

  response(): void {
    const { reject } = this.options
    reject('服务器错误！')
  }
}
