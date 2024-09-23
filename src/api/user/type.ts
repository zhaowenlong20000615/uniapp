export interface IPwdLoginReq {
  mobile: string
  password: string
}

export interface IPwdLoginRes {
  userinfo: IPwdLoginResUserinfo
}

export interface IPwdLoginResUserinfo {
  user_token: string
  aid: number
  avatar: string
  nickname: string
  is_admin: number
  mobile: string
  receive_level: number
  receive_max_num: number
  member_id: number
  sex: number
  last_login_time: string
  is_init: number
  is_reset_password: number
  company_name: string
  audition_id: number
  at_id: number
  three_sources: number
  combo_id: number
  lang_arr: any[]
  is_show_ranking: number
  roles: string
  is_sub_admin: number
  dept_id: number
  hetong_code: string
  adv_id: string
  dis_code: string
  installed_app_code: string
  AppVersionStatus: number
}

export interface IGetLatprReq {
  read: string
}
export interface IGetLatprRes {
  aid: number
  freelearningandtraininglist_title: string
  memberuser_id: string
  memberuser_mobile: string
  create_time: string
  freelearningandtraininglist_id: number
  read: string
  freelearningandtraininglist_picture: string
  memberuser_nickname: string
  read_name: string
}

export interface IEditUserInfoReq {
  avatar: string
  birthday: string
  nickname: string
  sex: number
}
export interface IEditUserInfoRes {}

export interface IAsyncUpdateUserInfoRes extends IPwdLoginResUserinfo {}

export interface IModifyPwdReq {
  security_code: string
  password: string
  password_code: string
}

export interface IResetPwdReq {
  password: string
  mobile: string
  code: string
  account_type: 'mobile'
}

export interface ICodeLoginReq {
  mobile: string
  code: string
}
export interface ICodeLoginRes extends IPwdLoginRes {}

export interface IModifyMobileReq {
  mobile: string
  code: string
}
