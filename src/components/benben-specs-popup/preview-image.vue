<template>
  <view class="previewImage" v-if="show" @tap="close">
    <view class="page" :style="{ top: StatusBarRpx + 'rpx' }" v-if="urls.length > 0">
      <text class="text">{{ current + 1 }} / {{ urls.length }}</text>
    </view>
    <swiper class="swiper" :current="currentIndex" @change="swiperChange" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
      <swiper-item v-for="(item, index) in urls" :key="index">
        <movable-area class="movable-area" scale-area>
          <movable-view v-if="scaleArr[index]" class="movable-view" direction="all" :inertia="true" scale damping="100" scale-min="1" scale-max="4">
            <scroll-view scroll-y="true" class="uni-scroll-view">
              <view class="scroll-view">
                <image :key="index" class="image" :src="keyName ? item[keyName] : item" mode="widthFix" @longpress="onLongpress(item)" />
              </view>
            </scroll-view>
          </movable-view>
        </movable-area>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  name: 'preview-image.vue',
  data() {
    return {
      urls: [],
      keyName: '',
      show: false,
      currentIndex: 0, //当前项
      current: 0, //当前页
      scaleIndex: 0, //当前页
      scale: 1,
      scaleArr: [],
      isZooming: false, // 是否处于缩放状态
    }
  },
  methods: {
    //打开
    open({ url, current, urls, keyName }) {
      this.current = current !== undefined ? current : 0
      if (url !== undefined) {
        let _current = this.urls.findIndex((item) => item === url)
        this.current = _current == -1 ? 0 : _current
      }
      this.currentIndex = this.current
      this.scaleIndex = this.current
      this.urls = urls !== undefined ? urls : []
      this.scaleArr = this.urls.map((item) => 1)
      this.keyName = keyName !== undefined ? keyName : ''
      this.show = this.urls.length ? true : false
      this.$emit('open')
    },
    //关闭
    close() {
      if (!this.isZooming) {
        this.show = false
        this.$emit('close', {
          current: this.current,
          data: this.urls[this.current],
        })
        this.current = 0
      }
    },
    //图片改变
    swiperChange(e) {
      this.eliminateZooming(this.current)
      this.current = e.detail.current
    },
    //消除缩放
    eliminateZooming(index) {
      let that = this
      setTimeout(() => {
        that.$set(that.scaleArr, index, 0)
        setTimeout(() => {
          that.$set(that.scaleArr, index, 1)
        }, 20)
      }, 500)
    },

    //监听长按
    onLongpress(e) {
      this.$emit('onLongpress', e)
    },
    handleTouchStart() {
      this.isZooming = true
    },
    handleTouchEnd(e) {
      this.isZooming = false
    },
  },
}
</script>

<style lang="scss" scoped>
.previewImage {
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
  .swiper {
    width: 100%;
    height: 100vh;
    swiper-item {
      .movable-area {
        height: 100%;
        width: 100%;
        .movable-view {
          width: 100%;
          min-height: 100%;
          .uni-scroll-view {
            height: 100vh;
          }
          .scroll-view {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            .image {
              width: 100%;
              height: auto;
            }
          }
        }
      }
    }
  }
  .page {
    position: absolute;
    z-index: 9999;
    width: 100%;
    text-align: center;
    .text {
      color: #fff;
      font-size: 32rpx;
      background-color: rgba(0, 0, 0, 0.5);
      padding: 3rpx 16rpx;
      border-radius: 20rpx;
      user-select: none;
    }
  }
}
</style>
