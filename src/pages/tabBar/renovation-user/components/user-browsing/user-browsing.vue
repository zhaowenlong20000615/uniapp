<template>
  <view
    class="user-browsing"
    :class="{
      'shop-radius': config.isRadius,
    }"
    :style="{
      marginLeft: config.backgroundMargin + 'rpx',
      marginRight: config.backgroundMargin + 'rpx',
      backgroundColor: config.backgroundColor,
      marginBottom: config.pageMargin + 'rpx',
    }"
  >
    <view class="browsingbox">
      <view @click="handleJumpDiy" data-url="/pages/wd/myCollections/myCollections" class="browsingitem">
        <image :src="config.collectIcon" />
        <text class="price-lable">收藏</text>
        {{ userInfo.collection_count || 0 }}
      </view>
      <view class="browsingitem" @click="handleJumpDiy" data-url="/pages/wd/concernMy/concernMy">
        <image :src="config.followIcon" />
        <text class="price-lable">关注</text>
        {{ userInfo.follow_count || 0 }}
      </view>
      <view class="browsingitem" @click="handleJumpDiy" data-url="/pages/wd/myTrack/myTrack">
        <image :src="config.footprintIcon" />
        <text class="price-lable">足迹</text>
        {{ userInfo.browse_count || 0 }}
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: 'user-browsing',
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
    userInfo: {
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
.right-icon {
  font-size: 24rpx;
  color: #999;
  text {
    font-size: 24rpx;
  }
}
.user-browsing {
  padding: 24rpx;
  .browsingbox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .browsingitem {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 33%;
      font-size: 28rpx;
      font-weight: 600;
      color: #333;
      .price-lable {
        margin-right: 15rpx;
      }
      image {
        width: 40rpx;
        height: 40rpx;
        margin-right: 15rpx;
      }
    }
  }
}
</style>
