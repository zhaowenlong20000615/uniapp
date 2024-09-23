import type { TSuccessOptions } from "./type";

class MessageRealization {
  private static instance: MessageRealization;

  private constructor() {}

  public static getInstance(): MessageRealization {
    if (!MessageRealization.instance)
      MessageRealization.instance = new MessageRealization();
    return MessageRealization.instance;
  }

  success(): void;
  success(title: string): void;
  success(options: TSuccessOptions): void;
  success(params?: string | TSuccessOptions) {
    if (typeof params === "string")
      return this.showToast({ title: params, icon: "success", mask: true });
    uni.showToast({ ...params, icon: "success" });
  }

  error(): void;
  error(title: string): void;
  error(options: TSuccessOptions): void;
  error(params?: string | TSuccessOptions) {
    if (typeof params === "string")
      return this.showToast({ title: params, icon: "error", mask: true });
    uni.showToast({ ...params, icon: "error" });
  }

  info(): void;
  info(title: string): void;
  info(options: TSuccessOptions): void;
  info(params?: string | TSuccessOptions) {
    if (typeof params === "string")
      return this.showToast({ title: params, icon: "none", mask: true });
    uni.showToast({ ...params, icon: "none" });
  }

  showToast(options: UniApp.ShowToastOptions) {
    uni.showToast(options);
  }

  loading(): void;
  loading(title: string): void;
  loading(options: UniApp.ShowLoadingOptions): void;
  loading(params?: string | UniApp.ShowLoadingOptions | undefined) {
    if (typeof params === "string")
      return this.showLoading({ title: params, mask: true });
    uni.showLoading(params);
  }

  showLoading(options: UniApp.ShowLoadingOptions) {
    uni.showLoading(options);
  }

  showModal(
    options?: UniApp.ShowModalOptions | undefined
  ): Promise<UniApp.ShowModalRes>;
  showModal(options: UniApp.ShowModalOptions): void;
  async showModal(options: UniApp.ShowModalOptions) {
    return await uni.showModal(options);
  }
}

const Message = MessageRealization.getInstance();

export default Message;
