export interface IQueryAutographReq {
  member_id: string
}
export interface IQueryAutographRes {
  accessid: string
  host: string
  policy: string
  signature: string
  expire: number
  callback: string
  dir: string
  uid: number
  size: string
  file_ext: string
  image_size: string
  image_ext: string
  video_size: string
  video_ext: string
  audio_size: string
  audio_ext: string
  is_public: number
  deploy: string
  value_info: IQueryAutographResValueinfo
}

export interface IQueryAutographResValueinfo {
  accessKeyId: string
  accessSecret: string
  endpoint: string
  bucket: string
  host: string
  prefix: string
  is_plan: number
}

export interface IGetSystempageRes {
  system_page: string
  content: string
  aid: number
  create_time: number
}

export interface IFindSystempageReq {
  title: string
}
export interface IFindSystempageRes {
  tel: string
}

export interface IGetFeedbacktypeRes {
  feedback_type: string
  aid: number
  status: number
  isSelected: boolean
}

export interface IAddFeedbackReq {
  freefeedbacktypeFeedback_type_1_id: string | number
  problem_description: string
  contact_information: string
  feedback_image: string
}
export interface IAddFeedbackRes {}

export interface IGetFeedbackListRes {
  aid: number
  freefeedbacktypeFeedback_type_1: null | string
  problem_description: string
  feedback_image: string[]
  submitter: string
  create_time: number
  freefeedbacktypeFeedback_type_1_id: string
  contact_information: null | string
  freefeedbacktype_feedback_type: string
  freefeedbacktype_aid: number
  submitter_name: string
  avatar: string
}
