<template>
  <view :style="colorConfig" class="container">
    <view class="pulse-bubble pulse-bubble-1"></view>
    <view class="pulse-bubble pulse-bubble-2"></view>
    <view class="pulse-bubble pulse-bubble-3"></view>
  </view>
</template>

<script>
import loadingMixin from './loadingMixin.js'
export default {
  mixins: [loadingMixin],
  name: 'loading1',
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
/* pulse */
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
}

.pulse-bubble {
  width: 15%;
  height: 15%;
  border-radius: 50%;
  background: var(--color1, #007aff);
}

.pulse-bubble-1 {
  background: var(--color2, #1fa2ff);
  animation: pulse 0.4s ease 0s infinite alternate;
}

.pulse-bubble-2 {
  background: var(--color3, #12d8fa);
  animation: pulse 0.4s ease 0.2s infinite alternate;
}

.pulse-bubble-3 {
  background: var(--color4, #29ffc6);
  animation: pulse 0.4s ease 0.4s infinite alternate;
}

@keyframes pulse {
  from {
    opacity: 1;
    transform: scale(1);
  }

  to {
    opacity: 0.25;
    transform: scale(0.75);
  }
}
</style>
