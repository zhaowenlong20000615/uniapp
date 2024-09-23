<template>
  <view class="box" :style="colorConfig">
    <view class="atom"></view>
    <view class="atom"></view>
    <view class="atom"></view>
    <view class="dot"></view>
  </view>
</template>

<script>
import loadingMixin from './loadingMixin.js'
export default {
  mixins: [loadingMixin],
  name: 'loading8',

  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.box {
  position: relative;
  width: 100%;
  height: 100%;
}
.dot {
  position: absolute;
  width: 10%;
  height: 10%;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--color1, #12d8fa);
  animation: dotbreath 2s linear infinite;
}
.atom {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border-left-width: 6rpx;
  border-top-width: 6rpx;
  border-left-color: var(--color2, #29ffc6);
  border-left-style: solid;
  border-top-style: solid;
  border-top-color: transparent;
}
.atom:nth-of-type(1) {
  left: 0%;
  top: 0%;
  animation: atom1 1s linear infinite;
}
.atom:nth-of-type(2) {
  right: 0%;
  top: 0%;
  animation: atom2 1s linear infinite;
}
.atom:nth-of-type(3) {
  right: 0%;
  bottom: 0%;
  animation: atom3 1s linear infinite;
}
@keyframes dotbreath {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
@keyframes atom1 {
  0% {
    transform: rotateZ(120deg) rotateX(66deg) rotateZ(0deg);
  }
  100% {
    transform: rotateZ(120deg) rotateX(66deg) rotateZ(360deg);
  }
}
@keyframes atom2 {
  0% {
    transform: rotateZ(240deg) rotateX(66deg) rotateZ(0deg);
  }
  100% {
    transform: rotateZ(240deg) rotateX(66deg) rotateZ(360deg);
  }
}

@keyframes atom3 {
  0% {
    transform: rotateZ(360deg) rotateX(66deg) rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg) rotateX(66deg) rotateZ(360deg);
  }
}
</style>
