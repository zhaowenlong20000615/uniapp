<template>
  <view class="public-page-empty">
    <image class="image" :src="benbenImageSrcResolution(emptyImage + '.png', 'global')"></image>
    <view class="txt">{{ pagingListNoListDataText }}</view>
  </view>
</template>

<script>
/**
 * @author 刘欢
 * @description 空布局组件
 * @property {String} pagingListNoListDataText 提示语 默认: 暂无数据
 * @param {String} pagingListNoListDataText 提示语 默认: 暂无数据
 * @param {String} emptyImage 空布局的类型,有两种样式: order和collection 默认: order
 * @example <fu-empty-ui pagingListNoListDataText="" emptyImage=""></fu-empty-ui>
 * */
export default {
  name: 'fu-empty-ui',
  props: {
    pagingListNoListDataText: {
      type: String,
      default() {
        return ''
      },
    },
    emptyImage: {
      type: String,
      default: 'order', // order,collection,cart,message,coupons
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.public-page-empty {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 120upx 0 0 0;
  .image {
    width: 300rpx;
    height: 300rpx;
  }

  .txt {
    font-size: 28upx;
    color: $uni-text-color;
    text-align: center;
    line-height: 100upx;
    color: #999;
  }
}
</style>
