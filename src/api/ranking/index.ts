import Http from '@/utils/http'
import type {
  ICufaMemberuserReq,
  ICufaMemberuserRes,
  IGetMemberuserReq,
  IGetMemberuserRes,
  IWeifaMemberuserReq,
  IWeifaMemberuserRes
} from './type'
import type { IPagingListRes } from '@/hooks/usePagingList'
export const BASE_URL = '/api/m6980/'

export function CufaMemberuser(params: ICufaMemberuserReq) {
  return Http.post<IPagingListRes<ICufaMemberuserRes[]>, ICufaMemberuserReq>(
    BASE_URL + '668d054adc114',
    params
  )
}

export function WeifaMemberuser(params: IWeifaMemberuserReq) {
  return Http.post<IPagingListRes<IWeifaMemberuserRes[]>, IWeifaMemberuserReq>(
    BASE_URL + '668d0b8024851',
    params
  )
}

export function GetMemberuser(params: IGetMemberuserReq) {
  return Http.post<IPagingListRes<IGetMemberuserRes[]>, IGetMemberuserReq>(
    BASE_URL + '668d19b718315',
    params
  )
}
