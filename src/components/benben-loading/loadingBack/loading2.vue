<template>
  <view :style="colorConfig" class="container">
    <view class="dot dot1"></view>
    <view class="dot dot2"></view>
    <view class="dot dot3"></view>
  </view>
</template>

<script>
import loadingMixin from './loadingMixin.js'
export default {
  mixins: [loadingMixin],
  name: 'loading2',
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
}
.dot {
  width: 15%;
  height: 15%;
  background: var(--color1, #007aff);
  border-radius: 50%;
}

.dot1 {
  background: var(--color2, #1fa2ff);
  left: 0rpx;
  -webkit-animation: bounce 0.5s cubic-bezier(0.77, 0.47, 0.64, 0.28) alternate infinite;
  animation: bounce 0.5s cubic-bezier(0.77, 0.47, 0.64, 0.28) alternate infinite;
}

.dot2 {
  background: var(--color3, #12d8fa);
  -webkit-animation: bounce 0.5s 0.2s cubic-bezier(0.77, 0.47, 0.64, 0.28) alternate infinite;
  animation: bounce 0.5s 0.2s cubic-bezier(0.77, 0.47, 0.64, 0.28) alternate infinite;
}

.dot3 {
  background: var(--color4, #29ffc6);
  -webkit-animation: bounce 0.5s 0.4s cubic-bezier(0.77, 0.47, 0.64, 0.28) alternate infinite;
  animation: bounce 0.5s 0.4s cubic-bezier(0.77, 0.47, 0.64, 0.28) alternate infinite;
}

@-webkit-keyframes bounce {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }

  100% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }
}

@keyframes bounce {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }

  100% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }
}
</style>
