<template>
  <view :style="colorConfig" class="box">
    <view class="sun"></view>
    <view class="orbit orbit-box1">
      <view class="orbit1">
        <view class="planetX planet1"></view>
      </view>
    </view>
    <view class="orbit orbit-box2">
      <view class="orbit2">
        <view class="planetX planet2"></view>
      </view>
    </view>
    <view class="orbit orbit-box3">
      <view class="orbit3">
        <view class="planetX planet3"></view>
      </view>
    </view>
  </view>
</template>

<script>
import loadingMixin from './loadingMixin.js'
export default {
  mixins: [loadingMixin],
  name: 'loading5',

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
.sun {
  background: var(--color2, radial-gradient(#ff0, #f90));
  height: 20%;
  width: 20%;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.planetX {
  position: absolute;
  z-index: 100;
  border-radius: 50%;
}

.planet1 {
  left: 10%;
  height: 20%;
  width: 20%;
  background: var(--color3, #fed313);
}

.planet2 {
  left: 10%;
  height: 20%;
  width: 20%;
  background: var(--color4, linear-gradient(#00ff00, #09f, #09f));
  -webkit-animation: rotation 1s infinite linear;
  animation: rotation 1s infinite linear;
}

.planet3 {
  left: 10%;
  height: 20%;
  width: 20%;
  background: var(--color5, radial-gradient(#ff9900, #ff4400));
}

.orbit {
  background: transparent;
  border-radius: 50%;
  border: 1px solid var(--color1, #cccccc);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.orbit-box1 {
  width: 40%;
  height: 40%;
}
.orbit-box2 {
  width: 70%;
  height: 70%;
}
.orbit-box3 {
  width: 100%;
  height: 100%;
}

.orbit1 {
  height: 100%;
  width: 100%;
  -webkit-animation: rotation 2s infinite linear;
  -moz-animation: rotation 2s infinite linear;
  animation: rotation 2s infinite linear;
}

.orbit2 {
  height: 100%;
  width: 100%;
  -webkit-animation: rotation 3s infinite linear;
  -moz-animation: rotation 3s infinite linear;
  animation: rotation 3s infinite linear;
}

.orbit3 {
  height: 100%;
  width: 100%;
  -moz-animation: rotation 6s infinite linear;
  -webkit-animation: rotation 6s infinite linear;
  animation: rotation 6s infinite linear;
}

@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(359deg);
  }
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(359deg);
  }
}

@-moz-keyframes rotation {
  from {
    -moz-transform: rotate(0deg);
  }

  to {
    -moz-transform: rotate(359deg);
  }
}
</style>
