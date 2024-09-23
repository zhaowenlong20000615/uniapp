<template>
  <view
    :style="{
      marginBottom: config.pageMargin + 'rpx',
      backgroundColor: config.backgroundColor,
      backgroundImage: config.backgroundImage,
      paddingTop: (config.isStatusBar ? StatusBarRpx : 0) + 'rpx',
    }"
    class="shop-homg-seach"
  >
    <image :src="config.logo" :style="{ width: config.logoWidth + 'rpx' }" mode="widthFix" />
    <view :style="{ backgroundColor: config.seachBackgroundColor }" class="seach-input"></view>
  </view>
</template>
<script>
import { API_VERSION } from '@/config'
export default {
  name: 'shop-homg-seach',
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="scss">
.shop-homg-seach {
  height: 88rpx;
  box-sizing: content-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32rpx;
  background-size: 100% auto;
  background-repeat: no-repeat;
  .seach-input {
    height: 60rpx;
    flex: 1;
    border-radius: 30rpx;
    margin-left: 24rpx;
  }
}
</style>
