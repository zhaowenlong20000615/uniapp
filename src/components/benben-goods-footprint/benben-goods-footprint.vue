<template>
  <view>
    <view class="flex flex-direction align-stretch benben-flex-layout footprint_flex_1">
      <view class="flex flex-direction align-stretch" v-for="(item, i) in goodsList" :key="i">
        <view class="footprint_fd1_0_c0" @click="handleItemAllSelect(item)">
          <text v-if="isEditor" :class="{ checked_icon: true, checked_active: isItemAllSelect(item) }" class="fu-iconfont2">
            {{ isItemAllSelect(item) ? '&#59463;' : '&#59221;' }}
          </text>
          <text style="padding-left: 15rpx">{{ item.datetime | formatDate(timeFormat) }}</text>
        </view>
        <view class="flex flex-wrap align-center">
          <view @click="handleItem(val)" class="flex flex-direction align-stretch footprint_fd1_0_c1_c0" v-for="(val, j) in item.goods" :key="j">
            <text v-if="isEditor" :class="{ checked_icon: true, checked_active: val.isSelected }" class="fu-iconfont2 myCollection_fd2_0_c0_c0">
              {{ val.isSelected ? '&#59463;' : '&#59221;' }}
            </text>
            <image class="footprint_fd1_0_c1_c0_c0" mode="aspectFit" :src="val.goods_thumb"></image>
            <view style="padding-left: 12rpx" class="footprint_fd1_0_c1_c0_c1_c0">{{ val.goods_name }}</view>
            <view style="padding-left: 12rpx" class="footprint_fd1_0_c1_c0_c1_c1_c1">
              <text class="footprint_price1_fd1_0_c1_c0_c1_c1_c1">{{ priceBefore }}{{ val.goods_shop_price | frontPrice }}</text>
              <text class="footprint_price2_fd1_0_c1_c0_c1_c1_c1">{{ val.goods_shop_price | laterPrice }}{{ priceAfter }}</text>
            </view>
          </view>
        </view>
      </view>
      <benben-empty :list-data="goodsList"></benben-empty>
    </view>
    <!---flex布局flex布局结束-->
    <view class="flex flex-direction align-stretch benben-position-layout flex myCollection_flex_3" v-if="isEditor">
      <view class="flex align-center justify-between flex-sub myCollection_fd3_0">
        <view class="flex flex-wrap align-center">
          <view class="flex flex position-relative align-center" @click="isAllSelect = !isAllSelect">
            <text v-if="isEditor" :class="{ checked_icon: true, checked_active: isAllSelect }" class="fu-iconfont2">
              {{ isAllSelect ? '&#59463;' : '&#59221;' }}
            </text>
            <text class="myCollection_fd3_0_c0_c1">{{ $t('全选') }}</text>
          </view>
        </view>
        <button class="myCollection_fd3_0_c1" @tap.stop="getdeleteCollect()">{{ $t('删除') }}</button>
      </view>
    </view>
    <view :style="{ height: '100rpx' }" v-if="isEditor"></view>
  </view>
</template>

<script>
export default {
  name: 'benben-goods-footprint',
  props: {
    // 商品列表
    goodsList: {
      type: Array,
      default: () => [],
    },
    goodsId: {
      type: [String, Number],
      default: '',
    },
    value: {
      type: [String],
      default: '',
    },
    isEditor: {
      type: Boolean,
      default: false,
    },
    timeFormat: {
      type: [String, Number],
      default: `MM ${global.i18n.t('月')} DD ${global.i18n.t('日')}`,
    },
    priceBefore: {
      type: [String, Number],
      default: '',
    },
    priceAfter: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {
    isAllSelect: {
      get() {
        let flag = true
        this.goodsList.map((item) => {
          let _val = item.goods.find((val) => !val.isSelected)
          if (_val) {
            flag = false
          }
        })
        return flag
      },
      set(value) {
        this.goodsList.forEach((item) => {
          item.goods.forEach((val) => {
            this.$set(val, 'isSelected', value)
          })
        })
      },
    },
  },
  watch: {
    isEditor(val) {
      if (val) this.goodsList.forEach((item) => item.goods.forEach((val) => this.$set(val, 'isSelected', false)))
    },
  },
  methods: {
    isItemAllSelect(item) {
      let val = item.goods.find((val) => !val.isSelected)
      return val ? false : true
    },
    handleItemAllSelect(item) {
      if (!this.isEditor) return
      let flag = !this.isItemAllSelect(item)
      item.goods.forEach((val) => {
        this.$set(val, 'isSelected', flag)
      })
    },

    handleItem(item) {
      if (this.isEditor) {
        this.$set(item, 'isSelected', !item.isSelected)
      } else {
        this.$emit('update:goods-id', item.goods_id)
        this.$emit('handleGoods')
      }
    },
    //删除收藏
    getdeleteCollect() {
      let aids = []
      this.goodsList.map((item) => {
        item.goods.map((val) => {
          if (val.isSelected) {
            aids.push(val.aid)
          }
        })
      })
      if (!aids.length) return this.$message.info(global.i18n.t('请选择'))
      this.$emit('input', aids.join(','))
      this.$emit('handleDel')
    },
  },
}
</script>

<style lang="scss" scoped>
.checked_icon {
  color: #dddddd;
  font-size: 36rpx;
  background-color: #fff;
  border-radius: 50%;
  font-weight: 100;
}
.myCollection_fd2_0_c0_c0 {
  position: absolute;
  right: 15rpx;
  top: 15rpx;
  z-index: 5;
}
.checked_active {
  color: var(--checked-active);
}
.myCollection_fd3_0 {
  padding: 0rpx 24rpx 0rpx 32rpx;
}
.myCollection_fd3_0_c0_c1 {
  font-size: 28rpx;
  font-weight: 400;
  color: #333333;
  margin: 0rpx 0rpx 0rpx 14rpx;
}
.myCollection_fd3_0_c1 {
  background: #f6f6f6;
  border-radius: 50rpx 50rpx 50rpx 50rpx;
  font-size: 24rpx;
  color: #333;
  width: 170rpx;
  height: 60rpx;
  line-height: 60rpx;
  font-weight: 500;
}
.myCollection_flex_3 {
  background: #fff;
  width: 750rpx;
  height: 100rpx;
  overflow: hidden;
  z-index: 10;
  bottom: calc(0rpx + var(--window-bottom));
}
.footprint_fd1_0_c0 {
  display: flex;
  align-items: center;
  padding-left: 8rpx;
  margin-bottom: 10rpx;
  height: 50rpx;
  font-size: 28rpx;
  font-weight: 700;
  color: #666666;
}
.footprint_fd1_0_c1_c0 {
  position: relative;
  width: 246rpx;
  margin: 0rpx 6rpx 28rpx 0rpx;
  &:nth-child(3n) {
    margin-right: 0;
  }
}
.footprint_fd1_0_c1_c0_c0 {
  width: 246rpx;
  height: 246rpx;
  border-radius: 0rpx 0rpx 0rpx 0rpx;
}
.footprint_fd1_0_c1_c0_c1_c0 {
  width: 100%;
  font-size: 24rpx;
  font-weight: 400;
  color: #333333;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  margin: 20rpx 0rpx 14rpx 0rpx;
}
.footprint_fd1_0_c1_c0_c1_c1_c1 {
  color: #ff5536;
  font-weight: 600;
}
.footprint_price1_fd1_0_c1_c0_c1_c1_c1 {
  font-size: 32rpx;
}
.footprint_price2_fd1_0_c1_c0_c1_c1_c1 {
  font-size: 22rpx;
}
.footprint_flex_1 {
  padding: 24rpx 0rpx 0rpx 0rpx;
}
</style>
