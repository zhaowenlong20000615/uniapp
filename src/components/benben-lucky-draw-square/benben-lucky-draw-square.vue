<template>
  <view class="lottery_container" style="border-radius: 12px; overflow: hidden">
    <view class="grid_wrap" :style="decorateStyle">
      <view
        class="lottery_wrap"
        :style="{
          '--liBg': backgroundColor,
        }"
      >
        <!-- @click="beginBefore(index)" -->
        <ul class="lottery_grid">
          <li
            v-for="(item, index) in prizeData"
            :class="{ active: current_index == index && index != 8 }"
            :key="index"
            :data-index="index"
            :style="{
              boxShadow: `0upx 8upx 0upx 0upx ${borderColor}`,
              '--activeBackgroundColor': activeBackgroundColor,
            }"
          >
            <image v-if="index != 8" class="grid_img" mode="aspectFit" :src="item[keyImage]" alt="" />
            {{ index == 8 ? '' : item[keyName] }}
          </li>
          <li class="img-btn" style="width: 28%; height: 28%">
            <slot></slot>
          </li>
        </ul>
      </view>
      <view
        class="lottery_wrap_border"
        v-if="isShowLamp"
        :style="{
          '--evenBg': backgroundColorEven,
          '--oddBg': backgroundColorOdd,
        }"
      >
        <ul v-for="(item, index) in 4" :key="index" :style="{ background: squareBorderColor }">
          <li v-for="(item, index) in 12" :key="index"></li>
        </ul>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'benben-lucky-draw-square',
  data() {
    return {
      current_index: -1,
      count: 0,
      totalCount: 6,
      startIndex: 0,
      timer: null,
      speed: 50,
      winingIndex: 3,
      throttle: false,
    }
  },
  props: {
    isShowLamp: {
      type: Boolean,
      default: true,
    },
    prizeData: {
      type: Array,
      default: () => [],
    },
    //方块背景色
    backgroundColor: {
      type: String,
      default: '',
    },
    //方块的下边框阴影
    borderColor: {
      type: String,
      default: '',
    },
    //九宫格边框颜色
    squareBorderColor: {
      type: String,
      default: '',
    },
    //三角块背景色even
    backgroundColorEven: {
      type: String,
      default: '',
    },
    //三角块背景色odd
    backgroundColorOdd: {
      type: String,
      default: '',
    },
    //转盘大小
    size: {
      type: [Number, String],
      default: 650,
    },
    //中奖背景色
    activeBackgroundColor: {
      type: String,
      default: '',
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
  onLoad() {},
  computed: {
    decorateStyle() {
      return {
        width: `${this.size}rpx`,
        height: `${this.size}rpx`,
      }
    },
  },
  methods: {
    rollFn() {
      this.timer = null //计时器
      this.startIndex = 0 //从第几个位置开始抽奖 [默认为零]
      this.count = 0 //计数，跑的圈数
      this.winingIndex = 3 //获奖的位置
      this.totalCount = 6 //抽奖跑的圈数
      this.speed = 50
    },
    startLuckyDraw(id) {
      let num = this.prizeData.findIndex((item) => item[this.keyId] == id)
      if (num === -1) return
      this.winingIndex = num
      // 当跑的圈数等于设置的圈数，且活动的index值是奖品的位置时停止
      if (this.throttle) return console.log('转盘抽奖中...')
      this.throttle = true
      this.luckyDraw()
    },
    luckyDraw() {
      this.startIndex++
      if (this.startIndex > this.prizeData.length - 1) {
        this.startIndex = 0
        this.count++
      }
      this.current_index = this.startIndex
      if (this.count >= this.totalCount && this.startIndex === this.winingIndex) {
        this.rollFn()
        this.$emit('drawEnd')
        this.throttle = false
      } else {
        //重新开始一圈
        if (this.count >= this.totalCount - 1) {
          this.speed += 30
        }
        var that = this
        this.timer = setTimeout(function () {
          that.luckyDraw()
        }, this.speed)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
li {
  list-style: none;
}

ul,
li {
  margin: 0;
  padding: 0;
}

.grid_wrap {
  /* background-color: #9ad3ff; */
  width: 650upx;
  height: 650upx;
  position: relative;
  border-radius: 12upx;
  /* box-shadow: 0upx 12upx 0upx 0upx #89bbf7; */
  display: flex;
  align-items: center;
  justify-content: center;
}

.grid_wrap .lottery_wrap_border {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.grid_wrap .lottery_wrap_border ul {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}

.grid_wrap .lottery_wrap_border ul li {
  border-radius: 50%;
  width: 17upx;
  height: 17upx;
  background: var(--evenBg);
}

.grid_wrap .lottery_wrap_border ul li:nth-child(even) {
  width: 24upx;
  height: 24upx;
  background: var(--oddBg);
}

.grid_wrap .lottery_wrap_border ul:nth-child(odd) {
  width: 100%;
  height: 35upx;
  left: 0;
  right: 0;
  flex-direction: row;
}

.grid_wrap .lottery_wrap_border ul:nth-child(odd) li {
  margin: 0 10upx;
}

.grid_wrap .lottery_wrap_border ul:nth-child(even) {
  width: 35upx;
  height: 100%;
  top: 0;
  bottom: 0;
  flex-direction: column;
}

.grid_wrap .lottery_wrap_border ul:nth-child(even) li {
  margin: 10upx 0;
}

.grid_wrap .lottery_wrap_border ul:nth-child(3) {
  bottom: 0;
}

.grid_wrap .lottery_wrap_border ul:nth-child(4) {
  right: 0;
}

.grid_wrap .lottery_wrap_border ul:nth-child(1) li:nth-child(odd),
.grid_wrap .lottery_wrap_border ul:nth-child(4) li:nth-child(odd) {
  animation: blink_large 1s linear infinite;
}

.grid_wrap .lottery_wrap_border ul:nth-child(1) li:nth-child(even),
.grid_wrap .lottery_wrap_border ul:nth-child(4) li:nth-child(even) {
  animation: blink_small 1s linear infinite;
}

.grid_wrap .lottery_wrap_border ul:nth-child(3) li:nth-child(even),
.grid_wrap .lottery_wrap_border ul:nth-child(2) li:nth-child(even) {
  width: 17upx;
  height: 17upx;
  background: var(--evenBg);
  animation: blink_large 1s linear infinite;
}

.grid_wrap .lottery_wrap_border ul:nth-child(3) li:nth-child(odd),
.grid_wrap .lottery_wrap_border ul:nth-child(2) li:nth-child(odd) {
  width: 24upx;
  height: 24upx;
  background: var(--oddBg);
  animation: blink_small 1s linear infinite;
}

.grid_wrap .lottery_wrap {
  width: calc(100% - 75upx);
  height: calc(100% - 75upx);
  font-size: 14upx;
  background-color: #61a2fc;
  border-radius: 12upx;
  /* position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%); */
  z-index: 1;
}

.grid_wrap .lottery_wrap .lottery_grid {
  width: 100%;
  height: 100%;
  position: relative;
}

.grid_wrap .lottery_wrap .lottery_grid li {
  width: 28%;
  height: 28%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  float: left;
  position: absolute;
  background-color: var(--liBg);
  border-radius: 12upx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 28upx;
}

.grid_wrap .lottery_wrap .lottery_grid li .grid_img {
  width: 65upx;
  height: 65upx;
  margin-bottom: 10upx;
}

.grid_wrap .lottery_wrap .lottery_grid .active {
  background: var(--activeBackgroundColor);
  box-shadow: 0upx 8upx 0upx 0upx var(--activeBackgroundColor) !important;
  color: #ffffff !important;
}

.grid_wrap .lottery_wrap .lottery_grid li:nth-of-type(1) {
  left: 4%;
  top: 3%;
}

.grid_wrap .lottery_wrap .lottery_grid li:nth-of-type(2) {
  left: 36%;
  top: 3%;
}

.grid_wrap .lottery_wrap .lottery_grid li:nth-of-type(3) {
  left: 68%;
  top: 3%;
}

.grid_wrap .lottery_wrap .lottery_grid li:nth-of-type(4) {
  left: 68%;
  top: 35.5%;
}

.grid_wrap .lottery_wrap .lottery_grid li:nth-of-type(5) {
  left: 68%;
  top: 68%;
}

.grid_wrap .lottery_wrap .lottery_grid li:nth-of-type(6) {
  left: 36%;
  top: 68%;
}

.grid_wrap .lottery_wrap .lottery_grid li:nth-of-type(7) {
  left: 4%;
  top: 68%;
}

.grid_wrap .lottery_wrap .lottery_grid li:nth-of-type(8) {
  left: 4%;
  top: 35.5%;
}

.grid_wrap .lottery_wrap .lottery_grid li:nth-of-type(9) {
  left: 36%;
  top: 35.5%;
  cursor: pointer;
  background: #ff3a59;
  box-shadow: none !important;
  color: #ffffff !important;
  font-size: 40upx;
  font-weight: bolder;
}

@keyframes blink_large {
  to {
    width: 24upx;
    height: 24upx;
    background: var(--oddBg);
  }
}

@keyframes blink_small {
  to {
    width: 17upx;
    height: 17upx;
    /* background-color: #bce0e9; */
  }
}
.img-btn {
  width: 28%;
  height: 28%;
  view,
  div,
  img,
  image {
    width: 100% !important;
    height: 100% !important;
  }
}
.testTabs_key-image_c0 {
  width: 100% !important;
  height: 100% !important;
}
</style>
