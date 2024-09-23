import Http from '@/utils/http'
import type {
  IAddManagementassistancedailyReq,
  IAddManagementassistancedailyRes,
  IAddPunishmentrecordsReq,
  IAddPunishmentrecordsRes,
  IAddReworkrecordsReq,
  IAddReworkrecordsRes,
  IAddRwccReq,
  IAddRwccRes,
  IAddSmalatchconstructionReq,
  IAddSmalatchconstructionRes,
  IAddTechnicalcoordinationdailyReq,
  IAddTechnicalcoordinationdailyRes,
  IDelPunishmentrecordsReq,
  IDelPunishmentrecordsRes,
  IGetCompletionrecordReq,
  IGetCompletionrecordRes,
  IGetEngineeringprojectsListReq,
  IGetEngineeringprojectsListRes,
  IGetFeedbackrecordReq,
  IGetFeedbackrecordRes,
  IGetManagementassistancedailyReq,
  IGetManagementassistancedailyRes,
  IGetMaterialinformationReq,
  IGetMaterialinformationRes,
  IGetMemberuserXiezhuReq,
  IGetMemberuserXiezhuRes,
  IGetProcessmaterialsReq,
  IGetProcessmaterialsRes,
  IGetProcessstepsReq,
  IGetProcessstepsRes,
  IGetProjectsystemworkorderInfoReq,
  IGetProjectsystemworkorderInfoRes,
  IGetProjectsystemworkorderReq,
  IGetProjectsystemworkorderRes,
  IGetPunishmentrecordsReq,
  IGetPunishmentrecordsRes,
  IGetReworkrecordsReq,
  IGetReworkrecordsRes,
  IGetRwccReq,
  IGetRwccRes,
  IGetSmalatchconstructionReq,
  IGetSmalatchconstructionRes,
  IGetSystemListReq,
  IGetSystemListRes,
  IGetSystempointlocationInfoReq,
  IGetSystempointlocationInfoRes,
  IGetSystempointlocationListReq,
  IGetSystempointlocationListRes,
  IGetSystempointlocationReq,
  IGetSystempointlocationRes,
  IGetTechnicalcoordinationdailyReq,
  IGetTechnicalcoordinationdailyRes,
  IGetWarehouseareaReq,
  IGetWarehouseareaRes,
  IGetWorkerListReq,
  IGetWorkerListRes,
  ISetCompletionrecordGongtouReq,
  ISetCompletionrecordGongtouRes,
  ISetFeedbackrecordReq,
  ISetFeedbackrecordRes,
  ISetSystempointlocationZhuxiuReq,
  ISetSystempointlocationZhuxiuRes,
  ITongjiProjectsystemworkorderRes
} from './type'
import type { IPagingListRes } from '@/hooks/usePagingList'

export const BASE_URL = '/api/m6980/'

export function GetManagementassistancedaily() {
  return Http.post<Array<IGetManagementassistancedailyRes>>(BASE_URL + '6686737b86f37')
}

export function GetTechnicalcoordinationdaily(params?: IGetTechnicalcoordinationdailyReq) {
  return Http.post<Array<IGetTechnicalcoordinationdailyRes>, IGetTechnicalcoordinationdailyReq>(
    BASE_URL + '668678aa21ec7',
    params
  )
}

export function GetRwcc(params?: IGetRwccReq) {
  return Http.post<Array<IGetRwccRes>, IGetRwccReq>(BASE_URL + '66875b9355435', params)
}

export function GetSmalatchconstruction(params?: IGetSmalatchconstructionReq) {
  return Http.post<Array<IGetSmalatchconstructionRes>, IGetSmalatchconstructionReq>(
    BASE_URL + '66875c1a2a8b6',
    params
  )
}

export function GetEngineeringprojectsList(params?: IGetEngineeringprojectsListReq) {
  return Http.post<Array<IGetEngineeringprojectsListRes>, IGetEngineeringprojectsListReq>(
    BASE_URL + '668e64d2b6358',
    params
  )
}

export function GetSystemList(params?: IGetSystemListReq) {
  return Http.post<Array<IGetSystemListRes>, IGetSystemListReq>(BASE_URL + '668e656e2cb25', params)
}

export function GetSystempointlocation(params: IGetSystempointlocationReq) {
  return Http.post<IGetSystempointlocationRes, IGetSystempointlocationReq>(
    BASE_URL + '6688ea3617cbe',
    params
  )
}

export function GetProcesssteps(params: IGetProcessstepsReq) {
  return Http.post<IGetProcessstepsRes, IGetProcessstepsReq>(BASE_URL + '6688e979ee556', params)
}

export function GetMemberuserXiezhu(params?: IGetMemberuserXiezhuReq) {
  return Http.post<IGetMemberuserXiezhuRes[], IGetMemberuserXiezhuReq>(
    BASE_URL + '668e67e17291c',
    params
  )
}

export function AddManagementassistancedaily(params?: IAddManagementassistancedailyReq) {
  return Http.post<IAddManagementassistancedailyRes[], IAddManagementassistancedailyReq>(
    BASE_URL + '66867588e105f',
    params
  )
}

export function AddTechnicalcoordinationdaily(params?: IAddTechnicalcoordinationdailyReq) {
  return Http.post<IAddTechnicalcoordinationdailyRes[], IAddTechnicalcoordinationdailyReq>(
    BASE_URL + '6686788bc448d',
    params
  )
}

export function AddRwcc(params?: IAddRwccReq) {
  return Http.post<IAddRwccRes[], IAddRwccReq>(BASE_URL + '66875b6918d7e', params)
}

export function AddSmalatchconstruction(params?: IAddSmalatchconstructionReq) {
  return Http.post<IAddSmalatchconstructionRes[], IAddSmalatchconstructionReq>(
    BASE_URL + '66875bfa68681',
    params
  )
}

export function GetProjectsystemworkorder(params: IGetProjectsystemworkorderReq) {
  return Http.post<IPagingListRes<IGetProjectsystemworkorderRes[]>, IGetProjectsystemworkorderReq>(
    BASE_URL + '6688e85906caf',
    params
  )
}

export function GetProjectsystemworkorderInfo(params: IGetProjectsystemworkorderInfoReq) {
  return Http.post<IGetProjectsystemworkorderInfoRes, IGetProjectsystemworkorderInfoReq>(
    BASE_URL + '668e016eb29a3',
    params
  )
}

export function GetSystempointlocationList(params: IGetSystempointlocationListReq) {
  return Http.post<
    IPagingListRes<IGetSystempointlocationListRes[]>,
    IGetSystempointlocationListReq
  >(BASE_URL + '6688ea3617cbe', params)
}

export function GetSystempointlocationInfo(params: IGetSystempointlocationInfoReq) {
  return Http.post<IGetSystempointlocationInfoRes, IGetSystempointlocationInfoReq>(
    BASE_URL + '6688eb3c5fd87',
    params
  )
}

export function GetWorkerList(params: IGetWorkerListReq) {
  return Http.post<IPagingListRes<IGetWorkerListRes[]>, IGetWorkerListReq>(
    BASE_URL + '6694bfde1d0b1',
    params
  )
}

export function GetMaterialinformation(params: IGetMaterialinformationReq) {
  return Http.post<IPagingListRes<IGetMaterialinformationRes[]>, IGetMaterialinformationReq>(
    BASE_URL + '6695cf2a703f9',
    params
  )
}

export function GetWarehousearea() {
  return Http.post<IGetWarehouseareaRes[]>(BASE_URL + '6695cf075322b')
}

export function SetSystempointlocationZhuxiu(params: ISetSystempointlocationZhuxiuReq) {
  return Http.post<ISetSystempointlocationZhuxiuRes[], ISetSystempointlocationZhuxiuReq>(
    BASE_URL + '6688f2ae419eb',
    params
  )
}

export function GetCompletionrecord(params: IGetCompletionrecordReq) {
  return Http.post<IPagingListRes<IGetCompletionrecordRes[]>, IGetCompletionrecordReq>(
    BASE_URL + '6695d02b3a6fd',
    params
  )
}

export function GetReworkrecords(params: IGetReworkrecordsReq) {
  return Http.post<IPagingListRes<IGetReworkrecordsRes[]>, IGetReworkrecordsReq>(
    BASE_URL + '6695d060288ea',
    params
  )
}

export function GetFeedbackrecord(params: IGetFeedbackrecordReq) {
  return Http.post<IPagingListRes<IGetFeedbackrecordRes[]>, IGetFeedbackrecordReq>(
    BASE_URL + '6695d0d8e2e5c',
    params
  )
}

export function GetPunishmentrecords(params: IGetPunishmentrecordsReq) {
  return Http.post<IPagingListRes<IGetPunishmentrecordsRes[]>, IGetPunishmentrecordsReq>(
    BASE_URL + '668cea99cd99e',
    params
  )
}

export function AddReworkrecords(params: IAddReworkrecordsReq) {
  return Http.post<IAddReworkrecordsRes[], IAddReworkrecordsReq>(BASE_URL + '6687c3d6a752f', params)
}

export function SetCompletionrecordGongtou(params: ISetCompletionrecordGongtouReq) {
  return Http.post<ISetCompletionrecordGongtouRes[], ISetCompletionrecordGongtouReq>(
    BASE_URL + '66971959c64d6',
    params
  )
}

export function AddPunishmentrecords(params: IAddPunishmentrecordsReq) {
  return Http.post<IAddPunishmentrecordsRes[], IAddPunishmentrecordsReq>(
    BASE_URL + '6687c495d03d6',
    params
  )
}

export function DelPunishmentrecords(params: IDelPunishmentrecordsReq) {
  return Http.post<IDelPunishmentrecordsRes[], IDelPunishmentrecordsReq>(
    BASE_URL + '668cec8ab11d8',
    params
  )
}

export function GetProcessmaterials(params: IGetProcessmaterialsReq) {
  return Http.post<IPagingListRes<IGetProcessmaterialsRes[]>, IGetProcessmaterialsReq>(
    BASE_URL + '66963d2f802e2',
    params
  )
}

export function TongjiProjectsystemworkorder() {
  return Http.post<ITongjiProjectsystemworkorderRes>(BASE_URL + '668cef2d41f26')
}

export function SetFeedbackrecord(params: ISetFeedbackrecordReq) {
  return Http.post<ISetFeedbackrecordRes[], ISetFeedbackrecordReq>(
    BASE_URL + '669f14ff3f19c',
    params
  )
}
