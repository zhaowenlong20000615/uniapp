<template>
  <view :style="colorConfig" class="container">
    <view class="loader">
      <view class="loader__ball"></view>
      <view class="loader__ball"></view>
      <view class="loader__ball"></view>
    </view>
  </view>
</template>
<script>
import loadingMixin from './loadingMixin.js'
export default {
  mixins: [loadingMixin],
  name: 'loading4',
  data() {
    return {}
  },
  computed: {},
}
</script>
<style lang="scss" scoped>
$dotColor: var(--color1, linear-gradient(135deg, #1fa2ff, #12d8fa, #29ffc6));
$duration: 2s;
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader {
  animation: rotate $duration linear infinite normal;
  position: relative;
  width: 33%;
  height: 33%;
  transform-origin: 50% 50%;
  &__ball {
    position: absolute;
    inset: 0;
    transform-origin: 50% 50%;
    &:nth-of-type(2) {
      transform: rotate(120deg);
    }
    &:nth-of-type(3) {
      transform: rotate(240deg);
    }
    &::after {
      animation: move $duration ease-in-out infinite alternate;
      background: $dotColor;
      border-radius: 50%;
      content: '';
      display: inline-block;
      width: 100%;
      height: 100%;
      transform-origin: 50% 50%;
    }
  }
}
@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes move {
  0% {
    transform: translateY(150%);
  }
  40%,
  60% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-150%);
  }
}
</style>
