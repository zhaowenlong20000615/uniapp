<template>
  <view
    class="shop-advertisement"
    :style="{
      marginBottom: config.pageMargin + 'rpx',
      backgroundColor: config.backgroundColor,
      backgroundImage: config.backgroundImage,
      width: config.shopWidth + 'rpx',
      height: config.shopHeight + 'rpx',
    }"
    :class="{
      'shop-radius': config.isRadius,
      'ad-type1': config.type == 1,
      'ad-type2': config.type == 3,
      'ad-type3': config.type == 4,
      'ad-type4': config.type == 14,
    }"
  >
    <template v-if="config.type == 1 || config.type == 14">
      <swiper class="swiper-ad" autoplay circular>
        <swiper-item class="swiper-ad-item" v-for="(item, i) in adList" :key="i">
          <image
            @click="handleAd(item)"
            :class="{
              'shop-radius': config.isRadius,
            }"
            class="advertisement-image"
            :src="item.thumb"
            mode="aspectFill"
          />
        </swiper-item>
      </swiper>
    </template>
    <template v-else-if="config.type == 3">
      <image v-for="(item, i) in adList" @click="handleAd(item)" class="advertisement-image" :key="i" :src="item.thumb" mode="widthFix" />
    </template>
    <template v-else-if="config.type == 4">
      <image v-for="(item, i) in adList" @click="handleAd(item)" class="advertisement-image" :key="i" :src="item.thumb" mode="aspectFill" />
    </template>
  </view>
</template>
<script>
// type  1  轮播广告  3  4图轮播    4 3图轮播   14 底部广告
import { API_VERSION } from '@/config'
export default {
  name: 'shop-advertisement',
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      api: `/${API_VERSION}/641e624160dd0`,
      adList: [],
    }
  },
  computed: {},
  watch: {
    'config.type'(val) {
      this.getData()
    },
  },
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
      this.dynamicJump(item.href)
    },
    async getData() {
      try {
        let {
          data: { data, code, msg },
        } = await this.$api.get(this.api, { type: this.config.type })
        console.log('code', code !== 1)
        if (code != 1) return (this.adList = [])
        console.log('data', data)
        this.adList = data
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
<style scoped lang="scss">
.shop-advertisement.ad-type1,
.shop-advertisement.ad-type4 {
  padding: 0;
  .swiper-ad {
    width: 100%;
    height: 100%;
    .advertisement-image {
      width: 100%;
      height: 100%;
    }
  }
}
.shop-advertisement {
  margin: auto;
  gap: 4%;
  padding: 24rpx;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-size: 100% auto;
  background-repeat: no-repeat;
  &.ad-type2 {
    .advertisement-image {
      width: 48%;
      border-radius: 16rpx;
    }
  }
  &.ad-type3 {
    flex-direction: column;
    .advertisement-image {
      width: 48%;
      border-radius: 16rpx;
    }
    image {
      width: 48%;
    }
    image:first-child {
      height: 100%;
    }
    image:nth-child(n + 2) {
      height: 48%;
    }
  }
}
</style>
