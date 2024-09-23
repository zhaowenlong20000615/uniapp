<template>
  <view
    :style="{
      marginLeft: config.backgroundMargin + 'rpx',
      marginRight: config.backgroundMargin + 'rpx',
      marginBottom: config.pageMargin + 'rpx',
    }"
    class="shop-recommend"
  >
    <view :style="{ backgroundColor: config.backgroundColor }" @click="handleAd(item)" class="goods_item" v-for="(item, i) in listData">
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
</template>
<script>
import pagingList from '@/common/mixin/paging_list.js'
import { API_VERSION } from '@/config'
export default {
  name: 'shop-recommend',
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
    }
  },
  computed: {
    userInfo: {
      get() {
        return this.$store.state.userInfo
      },
      set() {
        this.$store.commit('updateUserInfo', value)
      },
    },
  },
  watch: {},
  mounted() {},
  created() {
    this.pagingListGetLists()
  },
  methods: {
    refresh() {
      this.pagingListToggle()
    },
    pullUp() {
      this.pagingListGetLists()
    },
    pagingListPostData() {
      return { cid: 0, goods_type: 3, user_id: this.userInfo.id }
    },
    handleAd(item) {
      this.$urouter.navigateTo(`/pages/fl/shopDetail/shopDetail?id=${item.aid}`)
    },
  },
}
</script>

<style scoped lang="scss">
.shop-recommend {
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
