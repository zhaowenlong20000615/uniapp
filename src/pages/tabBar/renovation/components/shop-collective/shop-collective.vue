<template>
  <view
    class="shop-collective"
    :style="{
      marginBottom: config.pageMargin + 'rpx',
      backgroundColor: config.backgroundColor,
      backgroundImage: config.backgroundImage,
      width: config.shopWidth + 'rpx',
    }"
    :class="{ 'shop-radius': config.isRadius }"
  >
    <view class="collective-head">
      <view :style="{ color: config.titleColor }" class="head-title">拼团抢购</view>
      <view
        :style="{ color: config.moreColor }"
        @tap.stop="handleJumpDiy"
        data-type="navigateTo"
        :data-url="`/pages/sy/ordersScramble/ordersScramble`"
        class="head-more"
      >
        查看更多
        <text class="fu-iconfont2">&#xe78e;</text>
      </view>
    </view>
    <scroll-view style="width: 100%" scroll-x>
      <view class="goods_list">
        <view
          class="goods_item"
          @tap.stop="handleJumpDiy"
          data-type="navigateTo"
          :data-url="`/pages/sy/listDetailsGoods/listDetailsGoods?goods_id=${item.goods_id}&activity_id=${item.activity_id}&sku_id=${item.sku_id}`"
          v-for="(item, i) in collectiveList"
        >
          <image class="goods_image" :src="item.thumb" mode="aspectFill" />
          <view class="goods_bottom">
            <view class="goods_title text-cut-2">{{ item.name }}</view>
            <view class="price_row">
              <view :style="{ color: config.priceColor }" class="goods_price">
                <text class="rmb">¥</text>
                {{ item.activity_price }}
              </view>
              <view class="goods_crossed_price">¥{{ item.shop_price }}</view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
<script>
import { API_VERSION } from '@/config'
export default {
  name: 'shop-collective',
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      api: `/${API_VERSION}/641eb8b1ee7fe`,
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
        } = await this.$api.get(this.api, { type: this.config.type })
        if (code != 1) return (this.collectiveList = [])
        this.collectiveList = data.data
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped lang="scss">
.shop-collective {
  margin: auto;
  padding: 0 24rpx 24rpx;
  background-size: 100% auto;
  background-repeat: no-repeat;
  .collective-head {
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

  .goods_list {
    display: inline-flex;
    .goods_item {
      width: 260rpx;
      margin-right: 10rpx;
      border-radius: 16rpx;
      background-color: #fff;
      overflow: hidden;
      .goods_image {
        width: 100%;
        height: 300rpx;
      }
      .goods_bottom {
        padding: 24rpx;
        line-height: 1.4;
        .goods_title {
          // text-overflow: ellipsis;
          // white-space: nowrap;
          // overflow: hidden;
        }
        .price_row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .goods_crossed_price {
          text-decoration: line-through;
          font-size: 22rpx;
          white-space: nowrap;
          color: #aaa;
        }
        .goods_price {
          font-size: 28rpx;
          font-weight: 600;
          white-space: nowrap;
          .rmb {
            font-size: 0.8em;
          }
        }
      }
    }
  }
}
</style>
