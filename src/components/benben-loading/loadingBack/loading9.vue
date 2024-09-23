<template>
  <view class="box" :style="colorConfig">
    <view class="gear1">
      <view class="inner inner1"></view>
      <view class="inner inner2"></view>
      <view class="inner inner3"></view>
    </view>
    <view class="gear2">
      <view class="inner inner1"></view>
      <view class="inner inner2"></view>
      <view class="inner inner3"></view>
    </view>
    <view class="gear3">
      <view class="inner inner1"></view>
      <view class="inner inner2"></view>
      <view class="inner inner3"></view>
    </view>
  </view>
</template>
<script>
import loadingMixin from './loadingMixin.js'
export default {
  mixins: [loadingMixin],
  name: 'loading9',

  data() {
    return {}
  },
}
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  position: relative;
}
@mixin gear($size, $bgc) {
  width: $size;
  height: $size;
  .inner {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: $bgc;
    border-radius: 6rpx;
    mask: radial-gradient(transparent 40%, #fff 60%);
  }
  .inner2 {
    transform: rotate(120deg);
  }
  .inner3 {
    transform: rotate(240deg);
  }
}
.gear1 {
  @include gear(50%, var(--color1, #0396ff));
  position: absolute;
  top: 0;
  left: 0;
  animation: rotate 5s infinite linear;
}
.gear2 {
  @include gear(40%, var(--color2, #dd524d));
  position: absolute;
  top: 15%;
  right: 0;
  animation: rotateR 5s infinite linear;
}
.gear3 {
  @include gear(40%, var(--color3, #f0ad4e));
  position: absolute;
  bottom: 2%;
  left: 25%;
  animation: rotateR 5s infinite linear;
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes rotateR {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}
</style>
