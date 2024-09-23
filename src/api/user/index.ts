import Http from '@/utils/http'
import type {
  IAsyncUpdateUserInfoRes,
  ICodeLoginReq,
  ICodeLoginRes,
  IEditUserInfoReq,
  IEditUserInfoRes,
  IGetLatprReq,
  IGetLatprRes,
  IModifyMobileReq,
  IModifyPwdReq,
  IPwdLoginReq,
  IPwdLoginRes,
  IResetPwdReq
} from './type'
import type { IPagingListRes } from '@/hooks/usePagingList'

export const BASE_URL = '/api/v1/'
export const BASE_URL_V2 = '/api/m6980/'

export function PwdLogin(params: IPwdLoginReq) {
  return Http.post<IPwdLoginRes, IPwdLoginReq>(BASE_URL + '5c78dbfd977cf', params)
}

export function GetLatpr(params: IGetLatprReq) {
  return Http.post<IPagingListRes<IGetLatprRes[]>, IGetLatprReq>(
    BASE_URL_V2 + '668ba25d0a0c3',
    params
  )
}

export function EditUserInfo(params: IEditUserInfoReq) {
  return Http.post<IEditUserInfoRes, IEditUserInfoReq>(BASE_URL_V2 + '669096d7605aa', params)
}

export function AsyncUpdateUserInfo() {
  return Http.post<IAsyncUpdateUserInfoRes>(BASE_URL_V2 + '668de96cdbb5e')
}

export function ModifyPwd(params: IModifyPwdReq) {
  return Http.post<any[], IModifyPwdReq>(BASE_URL + '5da9ab4c4c7af', params)
}

export function ResetPwd(params: IResetPwdReq) {
  return Http.post<any[], IResetPwdReq>(BASE_URL + '5caeeba9866aa', params)
}

export function CodeLogin(params: ICodeLoginReq) {
  return Http.post<ICodeLoginRes, ICodeLoginReq>(BASE_URL + '5c78dca45ebc1', params)
}

export function ModifyMobile(params: IModifyMobileReq) {
  return Http.post<any[], IModifyMobileReq>(BASE_URL + '5f6c915d69d1f', params)
}
