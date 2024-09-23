<template>
  <view
    class="shop-brand-store"
    :style="{
      marginBottom: config.pageMargin + 'rpx',
      backgroundColor: config.backgroundColor,
      backgroundImage: config.backgroundImage,
      width: config.shopWidth + 'rpx',
    }"
    :class="{ 'shop-radius': config.isRadius }"
  >
    <view class="collective-head">
      <view :style="{ color: config.titleColor }" class="head-title">品牌店铺</view>
      <view
        @tap.stop="handleJumpDiy"
        data-type="navigateTo"
        :data-url="`/pages/sy/brandStore/brandStore`"
        class="head-more"
        :style="{ color: config.moreColor }"
      >
        查看更多
        <text class="fu-iconfont2">&#xe78e;</text>
      </view>
    </view>
    <view :style="{ backgroundColor: config.storeBackgroundColor }" :class="{ 'shop-radius': config.isRadius }" class="store_list">
      <view class="store_item" v-for="(store, i) in collectiveList">
        <view class="store_head">
          <image class="store_image" :src="store.store_logo" mode="aspectFill" />
          <view class="store_center">
            <view :style="{ color: config.storeTitleColor }" class="store_name">{{ store.store_name }}</view>
            <view :style="{ color: config.tagColor, backgroundColor: config.tagBackgroundColor }" class="run_type">{{ store.run_type }}</view>
            <view class="star_row">
              <text
                :style="{ color: starNum <= store.store_star ? config.starColor : '' }"
                v-for="starNum in [1, 2, 3, 4, 5]"
                class="star_icon fu-iconfont2"
              >
                &#xe841;
              </text>
              {{ store.store_collection_num }}人关注
            </view>
          </view>
          <view class="store_right">
            <view
              @tap.stop="handleJumpDiy"
              data-type="navigateTo"
              :data-url="`/pages/fl/shopIndex/shopIndex?usermerchant_aid=${store.store_id}`"
              :style="{ color: config.btnColor, backgroundColor: config.btnBackgroundColor }"
              class="import_btn"
            >
              进店
            </view>
            <view class="distance">
              <text class="fu-iconfont2">&#xe844;</text>
              {{ store.juli }}km
            </view>
          </view>
        </view>
        <view class="goods_list">
          <view
            @tap.stop="handleJumpDiy"
            data-type="navigateTo"
            :data-url="`/pages/fl/shopDetail/shopDetail?id=${item.goods_id}`"
            class="goods_item"
            v-for="(item, i) in store.goods_list"
          >
            <image class="goods_image" :src="item.goods_thumb" mode="aspectFill" />
            <view :style="{ color: config.priceColor, backgroundColor: config.priceBackgroundColor }" class="goods_crossed_price">
              ¥{{ item.shop_price }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { API_VERSION } from '@/config'
export default {
  name: 'shop-brand-store',
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      api: `/${API_VERSION}/641e88b843d57`,
      collectiveList: [],
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
    async getData() {
      try {
        let {
          data: { data, code, msg },
        } = await this.$api.get(this.api, { is_goods: 1, goods_num: 3, page: 1, list_rows: 2, is_recommend: 1 })
        if (code != 1) return (this.collectiveList = [])
        console.log(' data.data', data.data)
        this.collectiveList = data.data
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped lang="scss">
.shop-brand-store {
  margin: auto;
  background-size: 100% auto;
  background-repeat: no-repeat;
  .collective-head {
    padding: 0 24rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80rpx;
    .head-title {
      font-size: 34rpx;
      font-weight: 600;
    }
    .head-more {
      font-size: 22rpx;
      color: #ccc;
      .fu-iconfont2 {
        font-size: 20rpx;
      }
    }
  }
  .store_item {
    padding: 0 24rpx 24rpx;
    .store_head {
      display: flex;
      align-items: center;
      padding: 20rpx 0;
      .store_image {
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
        margin-right: 15rpx;
      }
      .store_center {
        flex: 1;
        .store_name {
          font-size: 28rpx;
        }
        .run_type {
          font-size: 22rpx;
          padding: 3rpx 10rpx;
          border-radius: 5rpx;
          display: inline;
          background-color: #ad2626;
        }
        .star_row {
          font-size: 22rpx;
          color: #999;
          .star_icon {
            font-size: 20rpx;
            margin-right: 4rpx;
            color: #efefef;
          }
        }
      }
      .store_right {
        // width: 120rpx;
        flex-shrink: 0;

        .import_btn {
          padding: 5rpx 20rpx;
          border-radius: 20rpx;
          background-color: pink;
          font-size: 20rpx;
          margin-bottom: 10rpx;
        }
        .distance {
          font-size: 20rpx;
          text {
            font-size: 20rpx;
            margin-right: 5rpx;
          }
        }
      }
    }
  }

  .goods_list {
    display: flex;
    gap: 10rpx;
    .goods_item {
      width: 33%;
      position: relative;

      .goods_image {
        width: 100%;
        border-radius: 16rpx;
        height: 220rpx;
      }
      .goods_crossed_price {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 40%);
        font-size: 22rpx;
        white-space: nowrap;
        background-color: #fff;
        padding: 0 15rpx;
        line-height: 40rpx;
        border-radius: 20rpx;
      }
    }
  }
}
</style>
