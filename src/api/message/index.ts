import Http from '@/utils/http'

import type { IPagingListRes } from '@/hooks/usePagingList'
import type {
  IGetLatprInfoReq,
  IGetLatprInfoRes,
  IGetLatprReq,
  IGetLatprRes,
  IGetSystempushrecordsInfoReq,
  IGetSystempushrecordsInfoRes,
  IGetSystempushrecordsReq,
  IGetSystempushrecordsRes,
  IGetTaskmessageReq,
  IGetTaskmessageRes
} from './type'
export const BASE_URL = '/api/m6980/'

export function GetSystempushrecords(params: IGetSystempushrecordsReq) {
  return Http.post<IPagingListRes<IGetSystempushrecordsRes[]>, IGetSystempushrecordsReq>(
    BASE_URL + '668ba61cdaa66',
    params
  )
}

export function GetLatpr() {
  return Http.post<IPagingListRes<IGetLatprRes[]>, IGetLatprReq>(BASE_URL + '668ba25d0a0c3')
}

export function GetTaskmessage() {
  return Http.post<IPagingListRes<IGetTaskmessageRes[]>, IGetTaskmessageReq>(
    BASE_URL + '669097c14423f'
  )
}

export function GetSystempushrecordsInfo(params: IGetSystempushrecordsInfoReq) {
  return Http.post<IGetSystempushrecordsInfoRes, IGetSystempushrecordsInfoReq>(
    BASE_URL + '668ba74c5be60',
    params
  )
}

export function GetLatprInfo(params: IGetLatprInfoReq) {
  return Http.post<IGetLatprInfoRes, IGetLatprInfoReq>(BASE_URL + '668ba7fd28ea1', params)
}
