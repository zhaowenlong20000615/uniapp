<template>
  <view
    :style="{
      marginLeft: config.backgroundMargin + 'rpx',
      marginRight: config.backgroundMargin + 'rpx',
      backgroundColor: config.backgroundColor,
      marginBottom: config.pageMargin + 'rpx',
    }"
    class="shop-notice"
    :class="{ 'shop-radius': config.isRadius }"
  >
    <image :src="config.noticeImage" :style="{ width: config.noticeWidth + 'rpx' }" mode="widthFix" />
    <swiper class="notice-swiper" :indicator-dots="false" :interval="config.interval" :vertical="config.vertical" autoplay circular>
      <swiper-item @tap="handleAd(item)" v-for="(item, i) in noticeList" :style="{ color: config.fontColor }" class="notice-swiper-item">
        <text class="notice-text">{{ item.content }}</text>
        <text class="fu-iconfont2 notice-right-icon">&#xe78e;</text>
      </swiper-item>
    </swiper>
  </view>
</template>
<script>
import { API_VERSION } from '@/config'
export default {
  name: 'shop-notice',
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      api: `/${API_VERSION}/64219a95b6200`,
      noticeList: [],
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {
    this.getData()
  },
  methods: {
    refresh() {
      this.getData()
    },
    pullUp() {},
    handleAd(item) {
      this.$urouter.navigateTo(`/pages/sy/articleDetails/articleDetails?id=${item.aid}`)
      // this.dynamicJump(item.href)
    },
    async getData() {
      try {
        let {
          data: { data, code, msg },
        } = await this.$api.get(this.api, { category_id: 8 })
        console.log('code', code !== 1)
        if (code != 1) return (this.adList = [])
        console.log('data', data)
        this.noticeList = data.data
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped lang="scss">
.shop-notice {
  display: flex;
  height: 80rpx;
  align-items: center;
  padding: 0 24rpx;
  .notice-swiper {
    flex: 1;
    height: 100%;
    .notice-swiper-item {
      display: flex;
      align-items: center;
      .notice-text {
        padding-left: 24rpx;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        flex: 1;
        font-size: 28rpx;
      }
      .notice-right-icon {
        font-size: 24rpx;
        flex-shrink: 0;
      }
    }
  }
}
</style>
