<template>
  <view class="loader" :style="colorConfig"></view>
</template>
<script>
import loadingMixin from './loadingMixin.js'
export default {
  mixins: [loadingMixin],
  name: 'loading11',
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.loader {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loader::before {
  content: '';
  box-sizing: border-box;
  position: absolute;
  width: 60%;
  height: 60%;
  border-radius: 50%;
  border-top: 2px solid var(--color1,#1178F0);
  border-right: 2px solid transparent;
  animation: spinner 1s linear infinite;
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}
</style>
