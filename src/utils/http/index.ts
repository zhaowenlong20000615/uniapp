import { useUserStore } from '@/store/model/user'
import { httpBaseConfig } from './config'
import { ResFactory } from './mode'
import type { IRequestSuccessCallbackResult, IRes } from './type'

class CustomRequest {
  request<ResT, dataT = string | AnyObject | ArrayBuffer>(
    url: string,
    data?: dataT,
    options?: UniApp.RequestOptions
  ): Promise<IRes<ResT>> {
    const newOptions = this.requestInterceptor<dataT>(url, data, options)
    return new Promise<IRes<ResT>>((resolve, reject) => {
      uni.request({
        ...newOptions,
        success: (response: UniApp.RequestSuccessCallbackResult) => {
          const res = response as IRequestSuccessCallbackResult<IRes<ResT>>
          ResFactory.createRes<ResT>({ res, resolve, reject })
        },
        fail: (err: UniApp.GeneralCallbackResult) => {
          console.log(err)
          console.log(`${options!.url}网络错误！`)
          reject(err)
        },
        complete: () => {}
      })
    })
  }

  async get<ResT, dataT = string | AnyObject | ArrayBuffer>(
    url: string,
    data?: dataT,
    options?: UniApp.RequestOptions
  ): Promise<IRes<ResT>> {
    return await this.request(url, data, { ...options!, method: 'GET' })
  }

  async post<ResT, dataT = string | AnyObject | ArrayBuffer>(
    url: string,
    data?: dataT,
    options?: UniApp.RequestOptions
  ): Promise<IRes<ResT>> {
    return await this.request(url, data, { ...options!, method: 'POST' })
  }

  async put<ResT, dataT = string | AnyObject | ArrayBuffer>(
    url: string,
    data?: dataT,
    options?: UniApp.RequestOptions
  ): Promise<IRes<ResT>> {
    return await this.request(url, data, { ...options!, method: 'PUT' })
  }

  async delete<ResT, dataT = string | AnyObject | ArrayBuffer>(
    url: string,
    data?: dataT,
    options?: UniApp.RequestOptions
  ): Promise<IRes<ResT>> {
    return await this.request(url, data, { ...options!, method: 'DELETE' })
  }

  requestInterceptor<dataT>(url: string, data?: dataT, options?: UniApp.RequestOptions) {
    const newOptions = {
      ...httpBaseConfig,
      ...options,
      url: `${httpBaseConfig.url}${url}`,
      data
    }

    const baseStore = useUserStore()
    newOptions.header['User-Token'] = baseStore.getToken ?? ''
    return newOptions as UniApp.RequestOptions
  }
}

export default new CustomRequest()
