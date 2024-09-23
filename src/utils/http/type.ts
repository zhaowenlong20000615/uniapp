export interface IRes<T> {
  code: number;
  data: T;
  msg: string;
  time: number;
  user: any;
}

export interface IRequestSuccessCallbackResult<T>
  extends Omit<UniApp.RequestSuccessCallbackResult, "data"> {
  data: T;
}

export interface IResFactoryOptions<ResT> {
  res: IRequestSuccessCallbackResult<IRes<ResT>>;
  resolve: (value: IRes<ResT> | PromiseLike<IRes<ResT>>) => void;
  reject: (reason?: any) => void;
}

export interface IResFactory {
  response(): void;
}
