<template>
  <view
    :style="{
      marginLeft: config.backgroundMargin + 'rpx',
      marginRight: config.backgroundMargin + 'rpx',
      backgroundColor: config.backgroundColor,
      marginBottom: config.pageMargin + 'rpx',
    }"
    :class="{ 'shop-radius': config.isRadius }"
  >
    <view class="shop-grid" v-if="gridList.length == 1">
      <view @tap="handleGrid(item)" v-for="(item, j) in gridList[0]" :key="j" class="grid_item" :style="gridStyle">
        <image :class="{ 'icon-radius': config.iconRadius }" style="width: 80rpx; height: 80rpx" :src="item.thumb" mode="scaleToFill" />
        <text class="text-cut">{{ item.name }}</text>
      </view>
    </view>
    <template v-if="gridList.length > 1">
      <swiper @change="swiperChange" style="width: 100%" :style="{ height: config.rowNum * 150 + 'rpx' }" :indicator-dots="false" autoplay circular>
        <swiper-item class="shop-grid" v-for="(swiperItem, index) in gridList" :key="index">
          <view @tap="handleGrid(item)" v-for="(item, j) in swiperItem" :key="j" class="grid_item" :style="gridStyle">
            <image :class="{ 'icon-radius': config.iconRadius }" style="width: 80rpx; height: 80rpx" :src="item.thumb" mode="scaleToFill" />
            <text class="text-cut">{{ item.name }}</text>
          </view>
        </swiper-item>
      </swiper>
      <div :class="'indicator_box ' + config.indicatorType">
        <div
          v-for="(item, i) in gridList"
          :style="{ 'background-color': index == i ? config.indicatorActiveColor : config.indicatorColor }"
          class="indicator_item"
        ></div>
      </div>
    </template>
  </view>
</template>
<script>
import { API_VERSION } from '@/config'
export default {
  name: 'shop-grid',
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      api: `/${API_VERSION}/641e5f0526964`,
      gridList: [],
      index: 0,
    }
  },
  computed: {
    gridStyle() {
      return `width:calc(100% / ${this.config.colNum})`
    },
  },
  watch: {
    'config.rowNum'() {
      this.getData()
    },
    'config.colNum'() {
      this.getData()
    },
  },
  mounted() {},
  created() {
    this.getData()
  },
  methods: {
    swiperChange(e) {
      this.index = e.detail.current
    },
    handleGrid(item) {
      this.dynamicJump(item.href)
    },
    refresh() {
      this.getData()
    },
    pullUp() {},
    async getData() {
      try {
        let {
          data: { data, code, msg },
        } = await this.$api.get(this.api)
        if (code != 1) return (this.adList = [])
        function splitArray(array, chunkSize) {
          const chunks = []
          for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize))
          }
          return chunks
        }
        this.gridList = splitArray(data, this.config.rowNum * this.config.colNum)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped lang="scss">
.shop-grid {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  .grid_item {
    .icon-radius {
      border-radius: 50%;
    }
    padding: 12rpx 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text {
      font-size: 28rpx;
      width: 80%;
      padding-top: 10rpx;
      display: block;
      margin: auto;
      text-align: center;
    }
  }
}
.indicator_box {
  width: 100%;
  // position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30rpx;
  .indicator_item {
    margin: 0 5rpx;
  }

  &.round {
    .indicator_item {
      width: 10rpx;
      height: 10rpx;
      border-radius: 50%;
    }
  }
  &.square {
    .indicator_item {
      width: 20rpx;
      height: 5rpx;
    }
  }
}
</style>
