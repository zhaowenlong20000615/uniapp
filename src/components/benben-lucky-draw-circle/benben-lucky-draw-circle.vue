<template>
  <view class="df-Jc-c" style="border-radius: 50%; padding: 35upx 30upx 30upx 30upx" v-if="isShowLamp">
    <view class="luckDraw">
      <!--跑马灯-->
      <view class="decorate" :style="decorateStyle">
        <view v-for="(item, index) in 8" :key="index" :style="{ background: flashChange(index) }"></view>
      </view>
      <!--转盘本身-->
      <view class="turntable" :style="{ clipPath: `circle(${height}rpx at 50% 50%)` }">
        <view class="pointer">
          <slot></slot>
        </view>
        <view class="giftArr" :style="giftArrStyle">
          <view class="giftBox df-c" v-for="(item, index) in prizeData" :key="index" :style="[...giftBoxStyle(index)]">
            <view class="">
              {{ item[keyName] }}
            </view>
            <image :src="item[keyImage]" mode="aspectFill" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: 'benben-lucky-draw-circle',
  props: {
    isShowLamp: {
      type: Boolean,
      default: true,
    },
    prizeData: {
      type: Array,
      default: () => [],
    },
    //跑马灯背景色
    backgroundColor: {
      type: String,
      default: '',
    },
    //亮起的跑马灯背景色
    activeBackgroundColor: {
      type: String,
      default: '',
    },
    //亮起的跑马灯边框色
    borderColor: {
      type: String,
      default: '',
    },
    //三角块背景色even
    evenBackgroundColor: {
      type: String,
      default: '',
    },
    //三角块背景色odd
    oddBackgroundColor: {
      type: String,
      default: '',
    },
    //转盘大小
    size: {
      type: [Number, String],
      default: 650,
    },
    //id
    keyId: {
      type: [String, Number],
      default: 'id',
    },
    keyName: {
      type: String,
      default: 'name',
    },
    keyImage: {
      type: String,
      default: 'image',
    },
  },
  data() {
    return {
      throttle: false,
      time: 2,
      flash: false,
      flashBegin: null,
      spin: 0,
      list: [],
      result: {
        deg: 0,
        giftIndex: 0,
        transition: '',
      },
    }
  },
  beforeDestroy() {
    clearInterval(this.flashBegin)
    this.flashBegin = null
  },
  mounted() {
    this.$nextTick(() => {
      this.flashBegin = setInterval(() => {
        this.flash = !this.flash
      }, 500)
    })
  },
  computed: {
    decorateStyle() {
      return {
        width: `${+this.size - 60}rpx`,
        height: `${+this.size - 60}rpx`,
      }
    },
    giftArrStyle() {
      return {
        width: `${+this.size - 60}rpx`,
        height: `${+this.size - 60}rpx`,
        transform: `rotate(${this.result.deg}deg)`,
        transition: this.result.transition,
        '--evenBg': this.evenBackgroundColor,
        '--oddBg': this.oddBackgroundColor,
      }
    },
    //高即半径
    height() {
      return (+this.size - 60) / 2
    },
    // 求宽高的所需度数
    degree() {
      return 360 / this.prizeData.length / 2
    },
    giftBoxStyle() {
      return (i) => {
        let width = Math.tan((this.degree * Math.PI) / 180) * this.height * 2
        let pddinglr =
          (width -
            Math.sqrt(Math.pow(this.height * 0.85, 2) * 2 - Math.pow(this.height * 0.85, 2) * 2 * Math.cos((this.degree * 2 * Math.PI) / 180))) /
          2
        let styleData = {
          width: `${width}rpx`,
          height: `${this.height}rpx`,
          left: `calc(50% - (${width}rpx / 2))`,
          top: `0rpx`,
          padding: `${this.height * 0.15}rpx ${pddinglr}rpx 0`,
          transform: ` rotateZ(${this.degree * 2 * i}deg)`,
        }
        if (this.prizeData.length % 2 && i == this.prizeData.length - 1) styleData.background = '#FCFAED'
        return styleData
      }
    },
  },
  methods: {
    flashChange(i) {
      return i % 2 && !this.flash
        ? `-webkit-radial-gradient(circle closest-side, ${this.backgroundColor} 70%, rgba(0, 0, 0, 0) 30%)`
        : `-webkit-radial-gradient(circle closest-side, ${this.activeBackgroundColor} 50%, ${this.borderColor} 50%)`
    },
    startLuckyDraw(id) {
      let num = this.prizeData.findIndex((item) => item[this.keyId] == id)
      if (num === -1) return
      if (this.throttle) return console.log('转盘抽奖中...')
      this.throttle = true
      this.spin = this.spin == num + 5 ? 5 - (num || 2) : num + 5
      this.result.deg += this.spin * 360 - num * this.degree * 2 + (360 - (this.result.deg % 360))
      this.result.giftIndex = num
      this.result.transition = `all ${this.time}s`
      setTimeout(() => {
        this.throttle = false
        this.$emit('drawEnd')
      }, this.time * 1000)
    },
  },
}
</script>
<style lang="scss" scoped>
view {
  box-sizing: border-box;
}

.df-c {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}

.df-Jc-c {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.luckDraw {
  position: relative;
  z-index: 1;

  .decorate {
    pointer-events: none;
    z-index: 2;
    position: absolute;
    left: 0;
    top: 0px;
    border-radius: 50%;

    > view {
      position: absolute;
      height: 20rpx;
      width: 20rpx;
      border-radius: 10rpx;
    }

    > view:nth-child(1) {
      left: calc(50% - 10rpx);
      top: -27rpx;
    }

    > view:nth-child(2) {
      left: 13%;
      top: 10%;
    }

    > view:nth-child(3) {
      left: -26rpx;
      top: calc(50% - 10rpx);
    }

    > view:nth-child(4) {
      left: 13%;
      bottom: 10.5%;
    }

    > view:nth-child(5) {
      left: calc(50% - 10rpx);
      bottom: -26rpx;
    }

    > view:nth-child(6) {
      right: 13%;
      bottom: 10.5%;
    }

    > view:nth-child(7) {
      right: -26rpx;
      top: calc(50% - 10rpx);
    }

    > view:nth-child(8) {
      right: 13%;
      top: 10%;
    }
  }

  .pointer {
    z-index: 3;
    top: calc(50% - 60rpx);
    left: calc(50% - 60rpx);
    position: absolute;
    width: 120rpx;
    height: 120rpx;
    font-size: 22rpx;
    color: #ffffff;
    line-height: 30rpx;
    text-align: center;
    > view:nth-child(3) {
      position: absolute;
      z-index: -1;
      bottom: calc(40rpx + 35rpx);
      left: 20rpx;
      height: 80rpx;
      width: 80rpx;
      background: linear-gradient(to right, #fabd01 0%, #fabd01 50%, #e8af00 50%, #e8af00 100%);

      clip-path: polygon(50% 0, 0 100%, 100% 100%);
    }

    > view:nth-child(2) {
      position: absolute;
      z-index: 2;
      left: 0;
      bottom: 0;
      width: 120rpx;
      background: #fabd01;
      height: 120rpx;
      border-radius: 50%;
      z-index: 1;
    }

    > view:nth-child(1) {
      left: 10rpx;
      bottom: 10rpx;
      position: absolute;
      z-index: 2;
      width: 100rpx;
      background: #f56503;
      border: 4rpx solid #fed860;
      height: 100rpx;
      border-radius: 50%;
    }
  }

  .turntable {
    position: relative;
    display: inline-block;
    border-radius: 50%;
    overflow: hidden;

    .giftArr {
      margin: auto;
      position: relative;

      .giftBox {
        box-sizing: border-box;
        transform-origin: bottom center;
        // background: #FC8608;
        position: absolute;
        font-weight: bold;
        clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
        font-size: 24rpx;
        // color: #EB7336;
        line-height: 50rpx;
        text-align: center;

        image {
          margin: 0 auto auto;
          height: 50rpx;
          width: 50rpx;
        }
      }

      > view:nth-child(even) {
        background: var(--evenBg);
      }

      > view:nth-child(odd) {
        background: var(--oddBg);
      }
    }
  }
}
</style>
