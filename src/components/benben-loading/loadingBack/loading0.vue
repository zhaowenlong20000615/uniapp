<template>
  <view :style="colorConfig" class="loader"></view>
</template>

<script>
import loadingMixin from './loadingMixin.js'
export default {
  mixins: [loadingMixin],
  name: 'loading0',
  data() {
    return {}
  },
}
</script>
<style lang="scss" scoped>
.loader {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3rpx solid transparent;
  border-top-color: var(--color1, #1fa2ff);
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
  position: relative;
  -webkit-text-security: aa;
}

.loader::before {
  content: '';
  position: absolute;
  top: 8rpx;
  left: 8rpx;
  right: 8rpx;
  bottom: 8rpx;
  border-radius: 50%;
  border: 3rpx solid transparent;
  border-top-color: var(--color2, #12d8fa);
  -webkit-animation: spin 3s linear infinite;
  animation: spin 3s linear infinite;
}

.loader::after {
  content: '';
  position: absolute;
  top: 16rpx;
  left: 16rpx;
  right: 16rpx;
  bottom: 16rpx;
  border-radius: 50%;
  border: 3rpx solid transparent;
  border-top-color: var(--color3, #29ffc6);
  -webkit-animation: spin 1.5s linear infinite;
  animation: spin 1.5s linear infinite;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
