import type { WorkerTypeData } from '@/constant/mock'

export interface IGetManagementassistancedailyReq {}
export interface IGetManagementassistancedailyRes {
  aid: number
  freeengineeringprojects_entry_name: string
  freesystem_system_name: string
  coordination_content: string
  coordination_results: string
  coordination_personnel: string
  code: string
  publisher: string
  create_time: number
  freeengineeringprojects_id: number
  freesystem_id: number
  coordination_personnel_name: string
  publisher_name: string
  dianwei: IGetManagementassistancedailyResDianwei[]
}

export interface IGetManagementassistancedailyResDianwei {
  aid: number
  freeengineeringprojects_entry_name: string
  freesystem_system_name: string
  freesystempointlocation_system_point_location: string
  freeprocesssteps_process_steps: string
  freemanagementassistancedaily_id: number
  freeengineeringprojects_id: number
  freesystem_id: number
  freesystempointlocation_id: number
  freeprocesssteps_id: number
}

export interface IGetTechnicalcoordinationdailyReq {}
export interface IGetTechnicalcoordinationdailyRes {
  coordination_content: string
  publisher: string
  aid: number
  create_time: number
  publisher_name: string
}

export interface IGetRwccReq {}
export interface IGetRwccRes {
  aid: number
  freesystempointlocation_system_point_location: null
  freesystem_system_name: null
  freeengineeringprojects_entry_name: null
  result_content: string
  publisher: string
  create_time: string
  freeengineeringprojects_id: number
  freesystem_id: number
  freesystempointlocation_id: number
  publisher_name: string
}

export interface IGetSmalatchconstructionReq {}
export interface IGetSmalatchconstructionRes {
  content: string
  publisher: string
  aid: number
  create_time: string
  publisher_name: string
}

export interface IGetEngineeringprojectsListReq {}
export interface IGetEngineeringprojectsListRes {
  entry_name: string
  project_location: string
  project_address: string
  free_field_14860: number
  free_field_14861: number
  project_cycle: string
  wanchenglv: number
  project_status: string
  aid: number
  create_time: string
  project_location_area: string
  project_status_name: string
}

export interface IGetSystemListReq {}
export interface IGetSystemListRes {
  system_name: string
  aid: number
  freeregion_area_name: string
  freebuilding_building: string
  freeengineeringprojects_entry_name: string
  system_state: string
  create_time: number
  system_state_name: string
}

export interface IGetSystempointlocationReq {
  freesystem_id: string | number
  freeprojectsystemworkorder_id?: string | number
}
export interface IGetSystempointlocationRes {
  total: number
  per_page: number
  current_page: number
  last_page: number
  data: IGetSystempointlocationResData[]
}

export interface IGetSystempointlocationResData {
  system_point_location: string
  aid: number
  freesystem_system_name: string
  freeregion_area_name: string
  freebuilding_building: string
  freeengineeringprojects_entry_name: string
  designated_foreman: string
  freeprojectsystemworkorder_designated_foreman_time: string
  construction_time: string
  construction_start_time: string
  construction_completion_time: string
  state: string
  major: string
  secondary_repair: string
  material_requisition: string
  create_time: number
  freebuilding_id: number
  freeregion_id: number
  freesystem_id: number
  freeengineeringprojects_id: number
  freeprojectsystemworkorder_id: number
  designated_foreman_name: string
  state_name: string
  major_name: string
  secondary_repair_name: string
  material_requisition_name: string
  gongxu: IGetSystempointlocationReqGongxu[]
}

export interface IGetSystempointlocationReqGongxu {
  aid: number
  create_time: string
  process_steps: string
  freebuilding_building: string
  freeregion_area_name: string
  freesystem_system_name: string
  freesystempointlocation_system_point_location: string
  freeengineeringprojects_entry_name: string
  completed_or_not: string
  completion_time: string
  freebuilding_id: number
  freeregion_id: number
  freesystem_id: number
  freesystempointlocation_id: number
  freeengineeringprojects_id: number
  completed_or_not_name: string
}

export interface IGetProcessstepsReq {
  freesystempointlocation_id: string | number
}

export interface IGetProcessstepsRes {
  total: number
  per_page: number
  current_page: number
  last_page: number
  data: IGetProcessstepsResDatum[]
}

export interface IGetProcessstepsResDatum {
  process_steps: string
  completed_or_not: string
  completion_time: string
  aid: number
  freesystempointlocation_system_point_location: string
  freesystem_system_name: string
  freeregion_area_name: string
  freebuilding_building: string
  freeengineeringprojects_entry_name: string
  create_time: number
  freebuilding_id: number
  freeregion_id: number
  freesystem_id: number
  freesystempointlocation_id: number
  freeengineeringprojects_id: number
  completed_or_not_name: string
}

export interface IGetMemberuserXiezhuReq {}
export interface IGetMemberuserXiezhuRes {
  aid: number
  nickname: string
  mobile: string
  memberdept_name: string
  memberrole_id: string
  zhiji: string
  sex: number
  birthday: string
  status: number
  zaizhizhuangtai: string
  avatar: string
  create_time: number
  last_login_time: string
  hired_date: number
  lizhishijian: string
  is_sub_admin: number
  memberrole_name: string
  sex_name: string
  zaizhizhuangtai_name: string
}

export interface IAddManagementassistancedailyReq {
  coordination_content: string
  coordination_results: string
  coordination_personnel: string | number
  coordination_personnel_name: string
  freeengineeringprojects_id: string | number
  freeengineeringprojects_name: string
  freesystem_id: string | number
  freesystem_name: string
  info: IAddManagementassistancedailyReqInfo[]
}

export interface IAddManagementassistancedailyReqInfo {
  freesystempointlocation_id: string | number
  freesystempointlocation_name: string
  freeprocesssteps_id: string | number
  freeprocesssteps_name: string
  id: number
}

export interface IAddManagementassistancedailyRes {}

export interface IAddTechnicalcoordinationdailyReq {
  coordination_content: string
}
export interface IAddTechnicalcoordinationdailyRes {}

export interface IAddRwccReq {
  result_content: string
  freeengineeringprojects_id: string | number
  freeengineeringprojects_name: string
  freesystem_id: string | number
  freesystem_name: string
  freesystempointlocation_id: string | number
  freesystempointlocation_name: string
}
export interface IAddRwccRes {}

export interface IAddSmalatchconstructionReq {
  content: string
}
export interface IAddSmalatchconstructionRes {}

export interface IGetProjectsystemworkorderReq {
  freeengineeringprojects_entry_name: string
}

export interface IGetProjectsystemworkorderRes {
  aid: number
  merge: string
  freebuilding_building: null | string
  freesystem_system_name: null | string
  freeregion_area_name: null | string
  freeengineeringprojects_project_location: string
  freeengineeringprojects_entry_name: string
  designated_foreman: string
  system_state: string
  free_field_14876: number
  designated_foreman_time: string
  create_time: string
  freeengineeringprojects_id: number
  freebuilding_id: number
  freeregion_id: number
  freesystem_id: number
  construction_start_time: string
  construction_completion_time: string
  freeengineeringprojects_start_time: string
  freeengineeringprojects_end_time: string
  freeengineeringprojects_project_location_area: string
  designated_foreman_name: string
  system_state_name: string
  dianweishu: number
}

export interface IGetProjectsystemworkorderInfoReq {
  aid: string | number
}
export interface IGetProjectsystemworkorderInfoRes extends IGetProjectsystemworkorderRes {}

export interface IGetSystempointlocationListReq {
  state?: string
  freesystem_id: string | number
  freeprojectsystemworkorder_id?: string | number
}
export interface IGetSystempointlocationListRes {
  system_point_location: string
  aid: number
  freesystem_system_name: string
  freeregion_area_name: string
  freebuilding_building: string
  freeengineeringprojects_entry_name: string
  designated_foreman: string
  freeprojectsystemworkorder_designated_foreman_time: string
  construction_time: string
  construction_start_time: string
  construction_completion_time: string
  state: string
  major: string
  secondary_repair: string
  material_requisition: string
  create_time: number
  freebuilding_id: number
  freeregion_id: number
  freesystem_id: number
  freeengineeringprojects_id: number
  freeprojectsystemworkorder_id: number
  designated_foreman_name: string
  state_name: string
  major_name: string
  secondary_repair_name: string
  material_requisition_name: string
  gongxu: IGetSystempointlocationListResGongxu[]
}

export interface IGetSystempointlocationListResGongxu {
  aid: number
  create_time: string
  process_steps: string
  freebuilding_building: string
  freeregion_area_name: string
  freesystem_system_name: string
  freesystempointlocation_system_point_location: string
  freeengineeringprojects_entry_name: string
  completed_or_not: string
  completion_time: string
  freebuilding_id: number
  freeregion_id: number
  freesystem_id: number
  freesystempointlocation_id: number
  freeengineeringprojects_id: number
  completed_or_not_name: string
}

export interface IGetSystempointlocationInfoReq {
  aid: string | number
}
export interface IGetSystempointlocationInfoRes extends IGetSystempointlocationListRes {}

export interface IGetWorkerListReq {
  nickname: string
}
export interface IGetWorkerListRes {
  aid: number
  nickname: string
  mobile: string
  memberdept_name: string
  memberrole_id: string
  zhiji: string
  sex: number
  birthday: string
  status: number
  zaizhizhuangtai: string
  avatar: string
  create_time: number
  last_login_time: string
  hired_date: number
  lizhishijian: string
  memberrole_name: string
  sex_name: string
  zaizhizhuangtai_name: string
  select_id: number
  WorkerTypeData: typeof WorkerTypeData
  major: number | null | undefined
  secondary_repair: number | null | undefined
}

export interface IGetMaterialinformationReq {
  material_science: string
  freewarehousearea_id: string
}
export interface IGetMaterialinformationRes {
  material_science: string
  freegoodsshelves_goods_shelves: string
  freenumberzone_number_zone: string
  freewarehousearea_region: string
  aid: number
  create_time: number
  freewarehousearea_id: number
  freenumberzone_id: number
  freegoodsshelves_id: number
  isSelected: boolean
  quantity_received: string
}

export interface IGetWarehouseareaReq {}
export interface IGetWarehouseareaRes {
  region: string
  remarks: string
  aid: number
  create_time: number
  isSelected: boolean
}

export interface ISetSystempointlocationZhuxiuReq {
  aid: string | number
  major: string | number
  secondary_repair?: string
  cailiao: ISetSystempointlocationZhuxiuReqcailiao[]
}
export interface ISetSystempointlocationZhuxiuReqcailiao {
  freematerialinformation_id: string | number
  quantity_received: string | number
}
export interface ISetSystempointlocationZhuxiuRes {}

export interface IGetCompletionrecordReq {
  freesystempointlocation_id: string | number
}
export interface IGetCompletionrecordRes {
  completion_site: string[]
  completion_remarks: string
  freesystempointlocation_system_point_location: string
  freeengineeringprojects_entry_name: string
  aid: number
  create_id: number
  create_id_name: string
  create_time: string
  freesystempointlocation_id: number
  freeengineeringprojects_id: number
  fangong: any[]
}

export interface IGetReworkrecordsReq {
  freesystempointlocation_id?: string | number
  freecompletionrecord_id?: string | number
}
export interface IGetReworkrecordsRes {
  rework_remarks: string
  on_site_nodes: string[]
  freecompletionrecord_completion_remarks: string
  freecompletionrecord_create_time: string
  freesystempointlocation_system_point_location: string
  freeengineeringprojects_entry_name: string
  aid: number
  create_time: number
  freeengineeringprojects_id: number
  freesystempointlocation_id: number
  freecompletionrecord_id: number
}

export interface IGetFeedbackrecordReq {
  freesystempointlocation_id: string | number
}
export interface IGetFeedbackrecordRes {
  feedback_explanation: string
  on_site_images: string[]
  whether_to_rectify_or_not: string
  submitter: string
  freesystempointlocation_system_point_location: string
  freeengineeringprojects_entry_name: string
  aid: number
  create_time: string
  freesystempointlocation_id: number
  freeengineeringprojects_id: number
  whether_to_rectify_or_not_name: string
  submitter_name: string
}

export interface IGetPunishmentrecordsReq {
  freesystempointlocation_id: string | number
}
export interface IGetPunishmentrecordsRes {
  punishment_remarks: string
  penalty_days: number
  whether_to_confirm: string
  aid: number
  create_time: string
  confirmation_time: string
  freesystempointlocation_system_point_location: string
  freeengineeringprojects_entry_name: string
  freeengineeringprojects_id: number
  freesystempointlocation_id: number
  whether_to_confirm_name: string
}

export interface IAddReworkrecordsReq {
  rework_remarks?: string
  on_site_nodes: string
  freeengineeringprojects_id: string | number
  freesystempointlocation_id: string | number
  freecompletionrecord_id: string | number
}
export interface IAddReworkrecordsRes {}

export interface ISetCompletionrecordGongtouReq {
  foremans_remarks?: string
  aid: string | number
}
export interface ISetCompletionrecordGongtouRes {}

export interface IAddPunishmentrecordsReq {
  punishment_remarks: string
  penalty_days: string
  freesystempointlocation_id: string | number
  freeengineeringprojects_id: string | number
}
export interface IAddPunishmentrecordsRes {}

export interface IDelPunishmentrecordsReq {
  aid: string | number
}
export interface IDelPunishmentrecordsRes {}

export interface IGetProcessmaterialsReq {
  freesystempointlocation_id: string | number
}
export interface IGetProcessmaterialsRes {
  aid: number
  freematerialinformation_material_science: string
  quantity_received: number
  freesystempointlocation_system_point_location: string
  freesystem_system_name: string
  freeengineeringprojects_entry_name: string
  create_time: number
  freeengineeringprojects_id: number
  freesystem_id: number
  freesystempointlocation_id: number
  freeprocesssteps_id: number
  freematerialinformation_id: number
  quyu: IGetProcessmaterialsReqQuyu
}
export interface IGetProcessmaterialsReqQuyu {
  freewarehousearea_region: string
}

export interface ITongjiProjectsystemworkorderReq {}
export interface ITongjiProjectsystemworkorderRes {
  zhongshu: number
  yiwancheng: number
  weiwancheng: number
  daifenpei: number
  yifenpei: number
}

export interface ISetFeedbackrecordReq {
  aid: string | number
}
export interface ISetFeedbackrecordRes {}
