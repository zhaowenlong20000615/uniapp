<template>
  <view
    class="user-order"
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
    <view class="order-title">
      <text class="order-title-text">我的订单</text>
      <text class="right-icon" @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/ddgl/order/order?type=all`">
        全部订单
        <text class="fu-iconfont2">&#xe78e;</text>
      </text>
    </view>
    <view class="order-box">
      <view class="order-item" @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/ddgl/order/order?type=unpay`">
        <benben-message-num
          class="benben-message-num"
          :message-num="orderInfo.no_pay"
          size="24"
          color="#fff"
          background-color="red"
          v-if="isLogin === true"
        ></benben-message-num>
        <image :src="config.unpayIcon" />
        <text>待付款</text>
      </view>
      <view class="order-item" @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/ddgl/order/order?type=unship`">
        <benben-message-num
          class="benben-message-num"
          :message-num="orderInfo.deliver"
          size="24"
          color="#fff"
          background-color="red"
          v-if="isLogin === true"
        ></benben-message-num>
        <image :src="config.unshipIcon" />
        <text>待发货</text>
      </view>
      <view class="order-item" @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/ddgl/order/order?type=unreceive`">
        <benben-message-num
          class="benben-message-num"
          :message-num="orderInfo.receiv"
          size="24"
          color="#fff"
          background-color="red"
          v-if="isLogin === true"
        ></benben-message-num>
        <image :src="config.unreceiveIcon" />
        <text>待收货</text>
      </view>
      <view class="order-item" @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/ddgl/order/order?type=finish`">
        <benben-message-num
          class="benben-message-num"
          :message-num="orderInfo.evaluate"
          size="24"
          color="#fff"
          background-color="red"
          v-if="isLogin === true"
        ></benben-message-num>
        <image :src="config.finishIcon" />
        <text>待评价</text>
      </view>
      <view class="order-item" @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/ddgl/order/order?type=6`">
        <benben-message-num
          class="benben-message-num"
          :message-num="orderInfo.refund"
          size="24"
          color="#fff"
          background-color="red"
          v-if="isLogin === true"
        ></benben-message-num>
        <image :src="config.serviceIcon" />
        <text>退款/售后</text>
      </view>
    </view>
  </view>
</template>
<script>
import { API_VERSION } from '@/config'
export default {
  name: 'user-order',
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      infoApi: `/${API_VERSION}/644ceb577e29e`,
      orderInfo: {},
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
        this.orderInfo = data
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
.user-order {
  padding: 24rpx;
  .order-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15rpx;
    .order-title-text {
      font-size: 28rpx;
      font-weight: 600;
    }
  }
  .order-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .order-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      font-size: 24rpx;
      padding-top: 10rpx;
      .benben-message-num {
        position: absolute;
        top: -5rpx;
        right: -5rpx;
        z-index: 1;
      }
      image {
        width: 60rpx;
        height: 60rpx;
        margin-bottom: 15rpx;
      }
    }
  }
}
</style>
