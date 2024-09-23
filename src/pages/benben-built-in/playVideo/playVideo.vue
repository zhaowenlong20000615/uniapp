<template>
  <video id="videoId" object-fit="contain" :src="videoUrl" autoplay>
    <cover-view :style="{ top: StatusBarRpx + 20 + 'rpx' }" @click="back" class="close">×</cover-view>
  </video>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      videoplay: false,
      videoUrl: '',
    }
  },
  computed: {},
  watch: {},
  onLoad(options) {
    if (options?.src) this.videoUrl = decodeURIComponent(options.src)
  },
  onUnload() {},
  onReady() {},
  onShow(options) {},
  onPullDownRefresh() {},
  onReachBottom(e) {},
  onPageScroll(e) {},
  methods: {
    back() {
      uni.navigateBack()
    },
  },
}
</script>
<style lang="scss" scoped>
video {
  height: 100vh;
  width: 100vw;
  position: relative;
}
.close {
  position: absolute;
  left: 30rpx;
  color: #fff;
  z-index: 9999;
  font-size: 50rpx;
  width: 60rpx;
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
  z-index: 99;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 16rpx;
}
page {
  background: rgba(0, 0, 0, 0.3);
}
</style>
