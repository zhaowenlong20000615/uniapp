<template>
  <view class="fu-notwork" v-if="!isConnected">
    <view class="fu-count-df" v-if="mode == 'full'" :style="{ zIndex: zIndex }">
      <image class="icon" :src="image ? image : benbenImageSrcResolution('notwork.png', 'global')" mode="aspectFit"></image>
      <view class="tips">{{ tips }}</view>
      <view class="text-gray text-sm margin-bottom-sm">
        {{ $t('请检查网络，或者前往') }}
        <text class="text-blue">{{ $t('设置') }}</text>
      </view>
      <view @click="getNetworkStattus">{{ $t('点击刷新') }}</view>
    </view>
    <view class="fu-count-tips" v-if="mode == 'tips'">
      <text></text>
      <text>{{ tips }}</text>
    </view>
  </view>
</template>

<script>
/**
 * fu-notwork 无网络提示
 * @description 该组件无需任何配置，引入即可，内部自动处理所有功能和事件。
 * @property {String} mode full 全屏模式 | tips 占位模式 | toast 提示框模式 | modal 弹框模式
 * @property {String} tips 没有网络时的提示语（默认哎呀，网络信号丢失）
 * @property {String Number} zIndex 组件的z-index值（默认1080）
 * @property {String} image 无网络的图片提示，可用的src地址或base64图片
 * @event {Function} retry 用户点击页面的"重试"按钮时触发
 * @example <fu-notwork></fu-notwork>
 */
export default {
  name: 'fu-notwork',
  props: {
    // 组件模式 默认全屏模式 、tips 占位模式 、toast 提示框模式
    mode: {
      type: String,
      default() {
        return 'full'
      },
    },
    tips: {
      type: String,
      default() {
        return global.i18n.t('哎呀，网络信号丢失')
      },
    },
    zIndex: {
      type: [String, Number],
      default() {
        return 100
      },
    },

    image: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isConnected: true,
    }
  },
  created() {
    // 监听网络状态的变化
    uni.onNetworkStatusChange((res) => {
      // console.log(res)
      this.isConnected = res.isConnected
      if (this.isConnected) {
        if (!uni.getStorageSync('CommonNetConnected')) {
          uni.setStorageSync('CommonNetConnected', true)
          // #ifdef APP-PLUS
          setTimeout(() => {
            plus.runtime.restart()
          }, 1000)
          // #endif
        }
        this.$emit('retry', { msg: '网络链接成功', networkType: res.networkType })
      } else {
        if (this.mode == 'toast') {
          this.$message.info(this.tips)
        }
      }
    })
    this.getNetworkStattus()
  },
  methods: {
    // 功能：获取当前网络状态
    getNetworkStattus() {
      uni.getNetworkType({
        success: (res) => {
          // console.log(res.networkType);
          if (res.networkType == 'none') {
            this.isConnected = false
            switch (this.mode) {
              case 'modal':
                this.$util.showModal({
                  title: global.i18n.t('提示'),
                  content: this.tips,
                })
                break
              case 'toast':
                this.$message.info(this.tips)
                break
              default:
                this.$message.info({
                  content: global.i18n.t('无网络链接'),
                  position: 'top',
                })
                break
            }
          } else {
            this.isConnected = true
            if (!uni.getStorageSync('CommonNetConnected')) {
              uni.setStorageSync('CommonNetConnected', true)
              // #ifdef APP-PLUS
              setTimeout(() => {
                plus.runtime.restart()
              }, 1000)
              // #endif
            }
            this.$emit('retry', { msg: global.i18n.t('网络链接成功'), networkType: res.networkType })
          }
        },
      })
    },
  },
}
</script>

<style lang="scss">
.#{$fu-prefix} {
  &-notwork {
    color: #666;

    .#{$fu-prefix}-count-df {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: white;
      text-align: center;
      padding-top: 380rpx;
      z-index: 9999;
      .icon {
        width: 200rpx;
        height: 200rpx;
        margin-bottom: 20rpx;
      }

      .tips {
        margin-bottom: 20rpx;
      }
    }

    .#{$fu-prefix}-count-tips {
      font-size: 24rpx;
      line-height: 80rpx;
      background-color: #ffdfdf;
      color: #666;
      text-align: center;
    }
  }
}
</style>
