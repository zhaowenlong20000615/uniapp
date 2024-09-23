<template>
  <view
    :style="{
      marginLeft: config.backgroundMargin + 'rpx',
      marginRight: config.backgroundMargin + 'rpx',
      marginBottom: config.pageMargin + 'rpx',
    }"
    class="shop-goods-list"
  >
    <view class="head" :style="headStyle">
      <view class="head-item" @click="headItem(item)" v-for="(item, i) in tabs" :key="i">
        <text class="head-title">{{ item.name }}</text>
        <text :class="{ 'head-lable': true, 'active-title': tabsType == item.value }">
          最新出炉
          <text v-if="tabsType == item.value" class="active-tag"></text>
        </text>
      </view>
    </view>
    <view class="list">
      <view @click="handleAd(item)" class="goods_item" v-for="(item, i) in listData">
        <image class="goods_image" :src="item.thumb" mode="aspectFill" />
        <view class="goods_bottom">
          <view class="goods_title">{{ item.name }}</view>
          <view class="goods_crossed_price">¥{{ item.market_price }}</view>
          <view :style="{ color: config.priceColor }" class="goods_price">
            <text class="rmb">¥</text>
            {{ item.shop_price }}
          </view>
        </view>
      </view>
      <fu-empty
        :pagingListLoadedAll="pagingListLoadedAll"
        :pagingListNoListData="pagingListNoListData"
        :listDataLength="listDataLength"
        :isLoadInit="isLoadInit"
      ></fu-empty>
    </view>
  </view>
</template>
<script>
import { API_VERSION } from '@/config'
import pagingList from '@/common/mixin/paging_list.js'
export default {
  name: 'shop-goods-list',
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  mixins: [pagingList],
  data() {
    return {
      minixPagingListsApi: `/${API_VERSION}/64184ac1cafc3`,
      pageingListApiMethod: 'get',
      allowOnloadGetList: false,
      tabs: [
        {
          name: '猜你喜欢',
          value: '3',
        },
        {
          name: '首发新品',
          value: '4',
        },
        {
          name: '热门推荐',
          value: '2',
        },
      ],
      tabsType: 3,
    }
  },
  computed: {
    headStyle() {
      return `--subheading-color:${this.config.subheadingColor};--title-color:${this.config.titleColor}; --avtive-color:${this.config.avtiveColor};background-color:${this.config.backgroundColor}`
    },
  },
  watch: {},
  mounted() {},
  created() {
    this.pagingListGetLists()
    // if (this.allowOnloadGetList) this.pagingListGetLists()
  },
  methods: {
    refresh() {
      this.pagingListToggle()
    },
    pullUp() {
      this.pagingListGetLists()
    },
    pagingListPostData() {
      return { cid: 0, goods_type: this.tabsType, user_id: this.userInfo?.id }
    },
    headItem(item) {
      this.tabsType = item.value
      this.pagingListToggle()
    },
    handleAd(item) {
      this.$urouter.navigateTo(`/pages/fl/shopDetail/shopDetail?id=${item.aid}`)
      // this.dynamicJump(item.href)
    },
  },
}
</script>

<style scoped lang="scss">
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx 32rpx;
  margin-bottom: 24rpx;
  .head-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    .head-title {
      line-height: 40rpx;
      font-weight: 600;
      font-size: 32rpx;
      color: var(--title-color);
    }
    .head-lable {
      position: relative;
      padding: 0 24rpx;
      font-size: 24rpx;
      color: var(--subheading-color);
      &.active-title {
        color: var(--avtive-color);
      }
      .active-tag {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 10rpx;
        height: 10rpx;
        border-radius: 0 0 8rpx 0;
        border-right: 2px solid var(--avtive-color);
        border-bottom: 2px solid var(--avtive-color);
      }
    }
  }
}

.list {
  display: flex;
  flex-wrap: wrap;
  padding: 0 24rpx;
  justify-content: space-between;
  .goods_item {
    width: 48.5%;
    background-color: #fff;
    border-radius: 16rpx;
    margin-bottom: 16rpx;
    overflow: hidden;
    .goods_image {
      width: 100%;
      height: 350rpx;
    }
    .goods_bottom {
      padding: 24rpx;
      line-height: 1.4;
      .goods_title {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .goods_crossed_price {
        text-decoration: line-through;
        font-size: 22rpx;
        color: #aaa;
      }
      .goods_price {
        font-size: 32rpx;
        font-weight: 600;
        .rmb {
          font-size: 0.8em;
        }
      }
    }
  }
}
</style>
