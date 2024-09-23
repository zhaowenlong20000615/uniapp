import Http from '@/utils/http'
import type {
  IAddFeedbackReq,
  IAddFeedbackRes,
  IFindSystempageReq,
  IFindSystempageRes,
  IGetFeedbackListRes,
  IGetFeedbacktypeRes,
  IGetSystempageRes,
  IQueryAutographReq,
  IQueryAutographRes
} from './type'
import type { IPagingListRes } from '@/hooks/usePagingList'

export const BASE_URL = '/api/v1/'
export const BASE_URL_V2 = '/api/m6980/'

export function QueryAutograph(params: IQueryAutographReq) {
  return Http.post<IQueryAutographRes, IQueryAutographReq>(BASE_URL + '6454d9663e508', params)
}

export function GetSystempage() {
  return Http.post<IGetSystempageRes>(BASE_URL_V2 + '6695cda36640b')
}

export function FindSystempage(params: IFindSystempageReq) {
  return Http.post<IFindSystempageRes, IFindSystempageReq>(BASE_URL_V2 + '6695e02c1ccf5', params)
}

export function GetFeedbacktype() {
  return Http.post<IGetFeedbacktypeRes[]>(BASE_URL_V2 + '668667fe89f13')
}

export function AddFeedback(params: IAddFeedbackReq) {
  return Http.post<IAddFeedbackRes, IAddFeedbackReq>(BASE_URL_V2 + '6686684eccb0d', params)
}

export function GetFeedbackList() {
  return Http.post<IPagingListRes<IGetFeedbackListRes[]>>(BASE_URL_V2 + '66866aadf1cda')
}

export function GetVerifyCode(params: any) {
  return Http.post<any>(BASE_URL + '5b5bdc44796e8', params)
}

export function GetVerifyCodeNew(params: any) {
  return Http.post<any>(BASE_URL + '666a45d4d6bb4', params)
}

export function BeforeGetVerifyCodeNew(params: any) {
  return Http.post<any>(BASE_URL + '6668f5d1d434e', params)
}
