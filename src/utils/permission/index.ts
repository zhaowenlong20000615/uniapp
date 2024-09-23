import permisionUtils from "./wa-permission/permission";

/**
 * @function: addApiInterceptor 增加uni api 拦截器 ， 在app.vue onLaunch 引入函数
 * @return {void}
 * @param {Array<String>} arr uni api名称  例如：['chooseImage', 'getLocation', 'makePhoneCall']
 */
export const addApiInterceptor = (
  arr = ["chooseImage", "getLocation", "makePhoneCall"]
) => {
  if (plus.os.name === "iOS") return;
  for (let i = 0; i < arr.length; i++) {
    uni.addInterceptor(arr[i], {
      invoke(args) {
        return new Promise(async (resolve) => {
          if (!(await requestAndroidPermission(arr[i])))
            throw `uni.${arr[i]} permission`;
          else resolve(args);
        });
      },
      success(args) {
        console.log("permission ", args);
        uni.setStorageSync(arr[i], 1);
      },
      fail(e) {
        console.log(e);
        if (e.errMsg == `${arr[i]}:fail No Permission`)
          _disablePermissions(arr[i]);
        if (e.errMsg == `${arr[i]}:fail 获取定位权限失败`)
          _disablePermissions(arr[i]);
      },
      complete(args) {
        console.log("complete ", args);
      },
    });
  }
};

export const requestAndroidPermission = (permisionID: string) => {
  return new Promise(async (resolve) => {
    const result = uni.getStorageSync(permisionID);
    switch (result) {
      case 1:
        resolve(true);
        break;
      case 0:
        _enablePermissions(permisionID, resolve);
        break;
      case -1:
        _disablePermissions(permisionID, resolve);
        break;
      default:
        _enablePermissions(permisionID, resolve);
        break;
    }
  });
};

const _enablePermissions = (
  permisionID: string,
  resolve: (value: unknown) => void
) => {
  uni.showModal({
    title: "提示",
    content: _promptContent(permisionID),
    success: (res) => {
      if (res.confirm) {
        resolve(true);
      } else if (res.cancel) {
        resolve(false);
      }
    },
  });
};

const _disablePermissions = (
  permisionID: string,
  resolve?: (value: unknown) => void
) => {
  uni.showModal({
    title: "提示",
    content: _openPromptContent(permisionID),
    success: (res) => {
      if (res.confirm) {
        permision.gotoAppPermissionSetting();
        resolve?.(false);
      } else if (res.cancel) {
        resolve?.(false);
      }
    },
  });
};

const _promptContent = (permisionID: string) => {
  switch (permisionID) {
    case "chooseImage":
      return "该应用需要使用您的摄像头权限和相册，以便用户修改头像和上传资料";
    case "makePhoneCall":
      return "该应用需要使用拨打电话权限，以便用户联系到发布者";
    case "getLocation":
      return "该应用需要使用位置权限，以便给你推荐更加准确的信息";
  }
};

const _openPromptContent = (permisionID: string) => {
  switch (permisionID) {
    case "chooseImage":
      return "该应用的相机和相册已被禁用，是否开启？";
    case "makePhoneCall":
      return "该应用的拨打电话权限已被禁用，是否开启？";
    case "getLocation":
      return "该应用的位置权限已被禁用，是否开启？";
  }
};

export const permision = permisionUtils;
