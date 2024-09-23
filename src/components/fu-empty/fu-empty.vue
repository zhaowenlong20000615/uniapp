<template>
  <view style="width: 100%">
    <view class="loading-wapper" v-if="!pagingListLoadedAll && !pagingListNoListData">
      <view class="loading-icon"></view>
      <text class="loading-txt">{{ $t('加载中') }}</text>
    </view>
    <view class="loading-wapper" v-if="pagingListLoadedAll && !pagingListNoListData && listDataLength != 0">
      <text class="loading-txt">{{ pagingListLoadedAllText }}</text>
    </view>
    <view
      v-if="((pagingListLoadedAll && pagingListNoListData) || (pagingListLoadedAll && listDataLength == 0)) && isLoadInit">
      <slot>
        <view class="public-page-empty">
          <image :src="emptyImages[emptyImage]['image']"></image>
          <view class="txt">{{ pagingListNoListDataText }}</view>
        </view>
      </slot>
    </view>
  </view>
</template>

<script>
import i18nConfig from '@/locales';

export default {
  name: 'fu-empty',
  options: {
    virtualHost: true,
  },
  props: {
    pagingListLoadedAll: {
      type: Boolean,
      default: false,
    },
    pagingListNoListData: {
      type: Boolean,
      default: false,
    },
    listDataLength: {
      type: Number,
      default: 0,
    },
    pagingListLoadedAllText: {
      type: String,
      default() {
        return i18nConfig.global.t('已加载全部')
      },
    },
    pagingListNoListDataText: {
      type: String,
      default() {
        return ''
      },
    },
    emptyImage: {
      type: String,
      default: 'order', //collect|order|message|coupons
    },
    isLoadInit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      emptyImages: Object.freeze({
        collection: {
          // 收藏
          image: '/static/empty/collect.png',
        },
        order: {
          // 订单
          image: '/static/empty/order.png',
        },
        message: {
          // 消息
          image: '/static/empty/message.png',
        },
        coupons: {
          // 优惠券
          image: '/static/empty/coupon.png',
        },
      }),
    }
  },
}
</script>

<style scoped lang="scss">
.loading-wapper {
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20upx;

  &.mj {
    display: flex;
  }

  text {
    font-size: 24upx;
    color: var(--benben-loading-color, #999999);
  }
}

.loading-icon {
  margin: 0 10upx;
  width: 40upx;
  height: 40upx;
  display: inline-block;
  vertical-align: middle;
  -webkit-animation: a 1s steps(12) infinite;
  animation: a 1s steps(12) infinite;
  background: transparent url(resolution-image-path('loading.png')) no-repeat;
  background-size: 100%;
}

.loading-txt {
  font-size: 24upx;
  font-weight: normal;
  line-height: 60upx;
  color: var(--benben-loading-color, #999999);
}

@-webkit-keyframes a {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}

@keyframes a {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}

.public-page-empty {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 120upx 0 0 0;

  image {
    width: 300rpx;
    height: 300rpx;
  }

  .txt {
    font-size: 28upx;
    color: $uni-text-color;
    text-align: center;
    line-height: 100upx;
    color: var(--benben-loading-color, #999999);
  }

  .loadTips {
    line-height: 30upx;
  }

  .btn {
    width: 260upx;
    height: 78upx;
    line-height: 78upx;
    background: linear-gradient(309deg, rgba(254, 49, 0, 1) 0%, rgba(255, 90, 16, 1) 100%);
    opacity: 1;
    border-radius: 44upx;
    font-size: 28upx;
    color: #fff;
    text-align: center;
    margin-top: 100upx;
  }
}
</style>
