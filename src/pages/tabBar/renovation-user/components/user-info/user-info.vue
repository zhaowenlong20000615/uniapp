<template>
  <view
    class="user-info"
    :style="{
      paddingTop: (config.isStatusBar ? StatusBarRpx : 0) + 'rpx',
      backgroundColor: config.backgroundColor,
      backgroundImage: config.backgroundImage,
      marginBottom: config.pageMargin + 'rpx',
      color: config.themeColor,
      '--btn-color': config.btnColor,
      '--btn-color-bg': config.btnColorBg,
      '--upgrade-center': config.upgradeCenter,
      '--upgrade-bg': config.upgradeBg,
    }"
  >
    <view
      class="title-height"
      :style="{
        paddingTop: (config.isStatusBar ? StatusBarRpx : 0) + 'rpx',
      }"
    ></view>
    <view
      class="title-box"
      :style="{
        paddingTop: (config.isStatusBar ? StatusBarRpx : 0) + 'rpx',
        backgroundColor: config.backgroundColor,
        backgroundImage: config.backgroundImage,
      }"
    >
      {{ config.titleText }}
      <view class="message-icon" @click.stop="handleJumpDiy" data-url="/pages/wd/myNews/myNews">
        <benben-message-num
          class="benben-message-num"
          :message-num="messageNum"
          size="24"
          color="#fff"
          background-color="red"
          v-if="isLogin === true"
        ></benben-message-num>
        <image style="width: 40rpx" mode="widthFix" :src="config.magessIcon" />
      </view>
    </view>
    <view @click="toLoginDiy" v-if="!isLogin" class="head-box">
      <image class="head-img" src="https://ttk-saas.oss-cn-beijing.aliyuncs.com/m1899/3306f42ab72e5ea5dbd3877ccfe45d3d.png" mode="widthFix" />
      <view class="to-login">立即登录</view>
      <text style="margin-left: auto" class="fu-iconfont2 right-icon">&#xe78e;</text>
    </view>
    <template v-else>
      <view class="head-box" @click="handleJumpDiy" data-url="/pages/wd/myInfo/myInfo">
        <image class="head-img" :src="userInfo.avatar" mode="widthFix" />
        <view class="head-right">
          <view class="flex align-center">
            <text class="text-cut">{{ userInfo.nickname }}</text>
            <image style="height: 40rpx; margin-left: 10rpx" mode="heightFix" :src="upgradeInfo.icon" />
          </view>
          <view class="invite-code">
            邀请码：{{ userInfo.invite_code }}
            <text @click="copyText(userInfo.invite_code)" class="copy-btn">复制</text>
          </view>
        </view>
        <text style="margin-left: auto" class="fu-iconfont2 right-icon">&#xe78e;</text>
      </view>
      <view class="upgrade-box">
        <view class="upgrade-title">
          <text class="upgrade-text">距离下次升级还差{{ upgradeInfo.discount }}元</text>
          <text @click="handleJumpDiy" data-url="/pages/wd/member/member" class="upgrade-btn">会员权益</text>
        </view>
        <view class="progress-bar">
          <view :style="{ width: upgradeInfo.next_speed + '%' }" class="progress-bar-center"></view>
          <image
            v-if="config.upgradeIcon"
            :style="{ left: upgradeInfo.next_speed + '%' }"
            class="progress-bar-img"
            :src="config.upgradeIcon"
            mode="widthFix"
          />
        </view>
        <view class="upgrade-bottom">
          <text>{{ upgradeInfo.name }}</text>
          <text>{{ upgradeInfo.intro || 0 }}元</text>
        </view>
      </view>
    </template>
  </view>
</template>
<script>
import { API_VERSION } from '@/config'
export default {
  name: 'user-info',
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
    userInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      messageApi: `/${API_VERSION}/64241ca6cf066`, //获取消息数量
      upgradeApi: `/${API_VERSION}/636de668c7eb0`, //会员进度
      messageNum: 0,
      upgradeInfo: {},
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.token == '' ? false : true
    },
  },
  watch: {},
  created() {
    this.showCallback()
  },
  mounted() {},
  methods: {
    showCallback() {
      if (this.isLogin) {
        this.getmessageNum()
        this.getUpgradeInfo()
      }
    },
    refresh() {
      if (this.isLogin) {
        this.getmessageNum()
        this.getUpgradeInfo()
      }
    },
    async getmessageNum() {
      try {
        let {
          data: { data, code, msg },
        } = await this.$api.get(this.messageApi)
        if (code != 1) return (this.messageNum = 0)
        this.messageNum = data.all
      } catch (error) {
        console.log(error)
      }
    },
    async getUpgradeInfo() {
      try {
        let {
          data: { data, code, msg },
        } = await this.$api.get(this.upgradeApi)
        if (code != 1) return (this.upgradeInfo = {})
        this.upgradeInfo = data
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped lang="scss">
.right-icon {
  font-size: 24rpx;
  color: #efefef;
}
.user-info {
  box-sizing: content-box;
  .to-login {
    font-size: 36rpx;
    font-weight: 700;
  }
  .upgrade-box {
    padding: 0 32rpx;
    .upgrade-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .upgrade-text {
        font-size: 20rpx;
        font-weight: 400;
      }
      .upgrade-btn {
        font-size: 20rpx;
        font-weight: 400;
        padding: 0 16rpx;
        border-radius: 6rpx;
        height: 36rpx;
        line-height: 36rpx;
        background-color: var(--btn-color-bg);
        color: var(--btn-color);
      }
    }
    .progress-bar {
      height: 10rpx;
      border-radius: 5rpx;
      background-color: var(--upgrade-bg);
      margin: 15rpx 0;
      position: relative;
      .progress-bar-center {
        height: 100%;
        border-radius: 5rpx;
        background-color: var(--upgrade-center);
      }
      .progress-bar-img {
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 32rpx;
      }
    }
    .upgrade-bottom {
      display: flex;
      justify-content: space-between;
      padding-bottom: 20rpx;
      font-size: 24rpx;
      font-weight: 600;
    }
  }
  .title-height {
    height: 80rpx;
    box-sizing: content-box;
  }
  .title-box {
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 100;
    box-sizing: content-box;

    .message-icon {
      position: absolute;
      right: 32rpx;
      top: 50%;
      transform: translateY(-50%);
      line-height: 0;
      .benben-message-num {
        position: absolute;
        top: -15rpx;
        right: -15rpx;
        z-index: 10;
      }
    }
  }
  .head-box {
    padding: 0 32rpx;
    display: flex;
    align-items: center;
    line-height: 1.5;
    .text-cut {
      max-width: 200rpx;
      font-size: 40rpx;
      font-weight: 700;
    }
    .invite-code {
      font-size: 28rpx;
      font-weight: 600;
      line-height: 20px;
      display: flex;
      align-items: center;
    }
    .copy-btn {
      line-height: 35rpx;
      padding: 0 10rpx;
      background-color: var(--btn-color-bg);
      color: var(--btn-color);
      font-size: 20rpx;
      font-weight: 400;
      border-radius: 5rpx;
      margin-left: 10rpx;
    }
    .head-img {
      margin-right: 10rpx;
      width: 150rpx;
      height: 150rpx;
      border-radius: 50%;
    }
  }
}
</style>
