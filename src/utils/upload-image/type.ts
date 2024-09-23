import type { IQueryAutographRes } from '@/api/system/type'

export interface ICBOtions {
  success?: (obj: any) => void
  complete?: (data: IRetrunData[]) => void
  url?: string
  formData?: any
  dir?: string
}

export interface IParamsFiles {
  name: string
  path: string
}

export type IParamsFiles1 = Partial<File> & IParamsFiles

export interface IResData extends IQueryAutographRes {
  // is_public: number;
  // size: number;
  // deploy: number;
  // dir: string;
  // host: string;
  // policy: number;
  // accessid: string;
  // signature: string;
}

export interface IRetrunData {
  id: number
  path: string
  thumb: string
}
