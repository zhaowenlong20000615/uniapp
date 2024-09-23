<template>
  <view
    class="user-wallet"
    :class="{
      'shop-radius': config.isRadius,
    }"
    :style="{
      marginLeft: config.backgroundMargin + 'rpx',
      marginRight: config.backgroundMargin + 'rpx',
      backgroundColor: config.backgroundColor,
      marginBottom: config.pageMargin + 'rpx',
    }"
  >
    <view class="wallet-box">
      <view class="wallet-item">
        <view class="price-text">
          <text class="price-tag">￥</text>
          {{ walletInfo.self_total || 0 }}
        </view>
        <text class="price-lable">自购返佣</text>
      </view>
      <view class="wallet-item">
        <view class="price-text">
          <text class="price-tag">￥</text>
          {{ walletInfo.share_total || 0 }}
        </view>
        <text class="price-lable">分享获利</text>
      </view>
      <view class="wallet-item">
        <view class="price-text">
          <text class="price-tag">￥</text>
          {{ userInfo.user_money || 0 }}
        </view>
        <text class="price-lable">可用余额</text>
      </view>
      <view @click="handleJumpDiy" data-url="/pages/wd/myMoney/myMoney" class="wallet-item">
        <image :src="config.walletIcon" />
        <text>我的钱包</text>
      </view>
    </view>
  </view>
</template>
<script>
import { API_VERSION } from '@/config'
export default {
  name: 'user-wallet',
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
      infoApi: `/${API_VERSION}/64254d2ad5999`, //获取消息数量
      walletInfo: {},
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.token == '' ? false : true
    },
  },
  watch: {},
  mounted() {},
  created() {
    this.showCallback()
  },
  methods: {
    showCallback() {
      if (this.isLogin) {
        this.getInfo()
      }
    },
    refresh() {
      if (this.isLogin) {
        this.getInfo()
      }
    },
    async getInfo() {
      try {
        let {
          data: { data, code, msg },
        } = await this.$api.get(this.infoApi)
        if (code != 1) return
        this.walletInfo = data
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
  color: #999;
  text {
    font-size: 24rpx;
  }
}
.user-wallet {
  padding: 24rpx;
  .wallet-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .wallet-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 10rpx;
      font-size: 28rpx;
      width: 25%;
      .price-text {
        font-size: 38rpx;
        font-weight: 700;
        line-height: 48rpx;
        margin-bottom: 15rpx;
        .price-tag {
          font-size: 24rpx;
        }
      }
      .price-lable {
        font-size: 28rpx;
        font-weight: 400;
        color: #999;
      }
      image {
        width: 48rpx;
        height: 48rpx;
        margin-bottom: 15rpx;
      }
    }
  }
}
</style>
