<template>
  <view class="benben-empty">
    <view v-if="show == 1" class="loading-wapper">
      <view class="loading-icon"></view>
      <text class="loading-txt">{{ $t('加载中') }}</text>
    </view>
    <view class="public-page-empty" v-if="show == 2">
      <slot>
        <image :src="benbenImageSrcResolution('order.png', 'global')"></image>
        <view class="txt"></view>
      </slot>
    </view>
  </view>
</template>
<script>
export default {
  name: 'benben-empty',
  options: {
    virtualHost: true,
  },
  props: {
    listData: {
      type: Array,
      default() {
        return []
      },
    },
  },
  watch: {
    'listData.length': {
      handler(value) {
        console.log(value)
        if (value == 0) {
          this.show = 1
          this.setTimeoutFn = setTimeout(() => {
            this.show = 2
          }, 2000)
        } else {
          this.setTimeoutFn && clearTimeout(this.setTimeoutFn)
          this.show = 3
        }
      },
      immediate: true,
    },
  },
  data() {
    return {
      show: 1,
      setTimeoutFn: null,
    }
  },
}
</script>

<style lang="scss" scoped>
.benben-empty {
  width: 100%;
  color: var(--benben-loading-color, #999999);
}
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
</style>
