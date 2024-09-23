export interface ICufaMemberuserReq {
  type: string
}
export interface ICufaMemberuserRes {
  aid: number
  nickname: string
  mobile: string
  memberdept_name: string
  memberrole_id: string
  zhiji: string
  sex: number
  status: number
  avatar: string
  create_time: number
  memberrole_name: string
  sex_name: string
  num: number
}

export interface IWeifaMemberuserReq extends ICufaMemberuserReq {}
export interface IWeifaMemberuserRes extends ICufaMemberuserRes {}

export interface IGetMemberuserReq extends ICufaMemberuserReq {}
export interface IGetMemberuserRes extends ICufaMemberuserRes {}
