<template>
  <view :style="colorConfig" class="container">
    <view class="eye"></view>
    <view class="eye"></view>
  </view>
</template>

<script>
import loadingMixin from './loadingMixin.js'
export default {
  mixins: [loadingMixin],
  name: 'loading3',

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

.eye {
  width: 45%;
  height: 45%;
  background: var(--color1, linear-gradient(135deg, #1fa2ff, #12d8fa));
  border-radius: 50%;
  position: relative;
}

.eye:after {
  background: var(--color2, #ffffff);
  width: 35%;
  height: 35%;
  border-radius: 50%;
  left: 40%;
  top: 45%;
  position: absolute;
  content: '';
  -webkit-animation: eyeball 1s linear infinite alternate;
  -moz-animation: eyeball 1s linear infinite alternate;
  animation: eyeball 1s linear infinite alternate;
}

@-webkit-keyframes eyeball {
  0% {
    left: 40%;
  }

  100% {
    left: 10%;
  }
}

@-moz-keyframes eyeball {
  0% {
    left: 40%;
  }

  100% {
    left: 10%;
  }
}

@keyframes eyeball {
  0% {
    left: 40%;
  }

  100% {
    left: 10%;
  }
}
</style>
