<template>
  <fu-popup v-model="isShow" mode="center" border-radius="16" :mask-close-able="false">
    <view class="update-box">
      <view class="title">{{ $t('发现新版本') }}</view>
      <scroll-view scroll-y="true" class="content">
        <mp-html :content="content | richTextFormat" />
      </scroll-view>
      <view class="cu-progress" v-if="loading > 0">
        <view class="bg-theme" :style="[{ width: loading + '%' }]"></view>
      </view>
      <view class="foot solid-top">
        <view class="flex-sub text-gray solid-right" @click="handleCancel">{{ $t('下次再说') }}</view>
        <view class="flex-sub text-green" @click="handleConfirm">{{ $t('马上更新') }}</view>
      </view>
    </view>
  </fu-popup>
</template>

<script>
/**
 * author: 刘欢
 * @description app检测升级组件
 * @param {boolean} auto 是否自动检测更新
 * **/
import { API_BASE_URL, SYSTEM_CONFIG } from '@/config/index';
export default {
  name: 'app-update',
  props: {
    auto: {
      type: Boolean,
      default: false,
    }, // 是否自动检测更新
    appIdent: {
      type: String,
      default: 'user',
    }, // 应用程序标识
  },
  data() {
    return {
      isShow: false,
      updateType: 1, //1热更新  2整包
      content: '',
      apkUrl: '',
      loading: 0,
      isLoad: false,
      downloadTask: null,
    }
  },
  methods: {
    checkAppUpdate() {
      const self = this
      try {
        if (self.isLoad) return
        self.isLoad = true
        if (!self.auto) uni.showLoading()
        plus.runtime.getProperty(plus.runtime.appid, async function (widgetInfo) {
          console.log('本地版本信息', widgetInfo)
          // 请求版本检查接口
          const [error, result] = await uni.request({
            url: API_BASE_URL + global.apiUrls.publicUpdateAPP,
            header: {
              'content-type': 'application/x-www-form-urlencoded',
            },
            data: {
              app_ident: self.appIdent,
              client: SYSTEM_CONFIG.platform === 'Android' ? 3 : 2,
            },
            method: 'POST',
          })
          console.log('result.data', result.data)
          self.isLoad = false
          if (!self.auto) uni.hideLoading()
          if (result.data.code != 1) return !self.auto ? self.$message.info(global.i18n.t('已是最新版本~')) : ''
          const data = result.data.data
          console.log('接口信息', data)
          if (data.is_take != 1) return !self.auto ? self.$message.info(global.i18n.t('已是最新版本~')) : ''
          if (data.version <= widgetInfo.versionCode) return !self.auto ? self.$message.info(global.i18n.t('已是最新版本~')) : ''
          console.log('是有效的版本')
          self.updateType = data.type == 2 ? 2 : 1
          self.content = data.readme
          self.apkUrl = data.url
          self.isShow = true
        })
      } catch (error) {
        self.isLoad = false
        if (!self.auto) uni.hideLoading()
      }
    },
    // 取消
    handleCancel() {
      this.downloadTask && this.downloadTask.abort()
      this.isShow = false
    },
    //整包更新
    fullPackageUpdate() {
      if (plus.os.name.toLowerCase() === 'android') {
        console.log('是安卓系统')
        this.hotUpdate()
      } else {
        console.log('是苹果系统,跳转到苹果应用商店')
        plus.runtime.openURL(this.apkUrl)
      }
    },
    //更新
    hotUpdate() {
      if (this.isLoad) return
      this.isLoad = true
      this.downloadTask = uni.downloadFile({
        url: this.apkUrl,
        success: (downloadResult) => {
          console.log('downloadResult 下载成功', downloadResult)
          if (downloadResult.statusCode === 200) {
            plus.runtime.install(downloadResult.tempFilePath, {
              force: true,
            })
            if (this.updateType == 1) {
              this.$util.showModal({
                title: global.i18n.t('提示'),
                content: global.i18n.t('已准备好新版本,是否重启体验新版?'),
                confirmText: global.i18n.t('重启'),
                success: (res) => {
                  if (res.confirm) {
                    plus.runtime.restart()
                  } else {
                    this.isShow = false
                  }
                },
                fail: () => {
                  this.isShow = false
                },
              })
            } else {
              plus.runtime.restart()
              this.isShow = false
            }
          }
        },
        fail: (err) => {
          console.log('ERROR', err)
          if (err.errMsg == 'downloadFile:fail abort') {
            this.$message.info(global.i18n.t('取消下载'))
          } else {
            this.$message.info(global.i18n.t('下载失败'))
          }
        },
        complete: () => {
          this.isLoad = false
        },
      })
      this.downloadTask.onProgressUpdate((res) => {
        console.log('res', res)
        this.loading = res.progress
      })
    },

    // 确定
    handleConfirm() {
      /* #ifdef APP-PLUS */
      if (this.updateType == 2) {
        this.fullPackageUpdate()
      } else {
        this.hotUpdate()
      }
      /* #endif */
    },
  },
  created() {
    // #ifdef APP-PLUS
    if (this.auto) {
      setTimeout(() => {
        this.checkAppUpdate()
      }, 2500)
    }
    // #endif
  },
}
</script>

<style lang="scss" scoped>
.cu-progress {
  height: 40rpx;
  border-radius: 20rpx;

  .bg-theme {
    height: 100%;
    background-color: #0055ff;
    border-radius: 20rpx;
  }
}

.update-box {
  width: 500rpx;
  background-color: #ffffff;

  .title {
    height: 100rpx;
    line-height: 100rpx;
    text-align: center;
    font-size: 32rpx;
    color: #333333;
  }

  .content {
    max-height: 500rpx;
    padding: 0 32rpx;
    box-sizing: border-box;
  }

  .foot {
    height: 80rpx;
    display: flex;
    line-height: 80rpx;
    text-align: center;
  }
}
</style>
