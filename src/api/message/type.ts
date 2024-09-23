export interface IGetSystempushrecordsReq {
  read: string
}
export interface IGetSystempushrecordsRes {
  aid: number
  memberuser_nickname: string
  freelistofinstitutions_institutional_regulations: string
  enclosure: IGetSystempushrecordsResEnclosure[]
  remarks: string
  create_time: string
  freelistofinstitutions_id: number
  memberuser_id: string | number
  read: string
  read_name: string
}
export interface IGetSystempushrecordsResEnclosure {
  path: string
  name: string
  thumb: string
}

export interface IGetLatprReq extends IGetSystempushrecordsReq {}
export interface IGetLatprRes extends IGetSystempushrecordsRes {
  aid: number
  freelearningandtraininglist_title: string
  memberuser_id: string | number
  memberuser_mobile: string
  create_time: string
  freelearningandtraininglist_id: number
  read: string
  freelearningandtraininglist_picture: string
  memberuser_nickname: string
  read_name: string
}

export interface IGetTaskmessageReq extends IGetSystempushrecordsReq {}
export interface IGetTaskmessageRes extends IGetSystempushrecordsRes {
  content: string
  recipient: string
  type: string
  aid: number
  create_time: string
  freesystempointlocation_system_point_location: string
  freesystem_system_name: string
  freeengineeringprojects_entry_name: string
  freeprojectsystemworkorder_system_state: null
  freeengineeringprojects_id: number
  freesystem_id: number
  freesystempointlocation_id: number
  freeprojectsystemworkorder_id: number
  read: string
  recipient_name: string
  type_name: string
  freeprojectsystemworkorder_system_state_name: string
  read_name: string
}

export interface IGetSystempushrecordsInfoReq {
  aid: string | number
}
export interface IGetSystempushrecordsInfoRes {
  aid: number
  memberuser_nickname: string
  freelistofinstitutions_institutional_regulations: string
  enclosure: IGetSystempushrecordsInfoReqEnclosure[]
  remarks: string
  create_time: string
  freelistofinstitutions_id: number
  memberuser_id: number
  freelistofinstitutions_content: string
}
export interface IGetSystempushrecordsInfoReqEnclosure {
  path: string
  name: string
  thumb: string
}

export interface IGetLatprInfoReq {
  aid: string | number
}
export interface IGetLatprInfoRes {
  aid: number
  freelearningandtraininglist_title: string
  memberuser_id: string
  memberuser_mobile: string
  create_time: string
  freelearningandtraininglist_id: number
  freelearningandtraininglist_picture: string
  freelearningandtraininglist_content: string
  memberuser_nickname: string
}
