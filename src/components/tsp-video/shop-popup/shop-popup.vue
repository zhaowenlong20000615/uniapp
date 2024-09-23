<template>
  <fu-popup safe-area-inset-bottom border-radius="15" v-model="show" mode="bottom">
    <view class="discuss-title">
      {{ $t('TA提到的商品') }}
      <text @tap="show = false" class="x-text">×</text>
    </view>
    <scroll-view scroll-y style="height: 500rpx">
      <view class="goods-item" @click="handleItem(item)" v-for="(item, i) in goodsList" :key="i">
        <image class="goods-thumb" :src="item.thumb" mode="aspectFill" />
        <view class="goods-right">
          <text class="goods-name">{{ item.name }}</text>
          <text class="goods-price">￥{{ item.shop_price }}</text>
        </view>
      </view>
      <view v-if="!goodsList.length" class="empty">
        <image class="empty-image" :src="benbenImageSrcResolution('sound.png', 'global')" mode="scaleToFill" />
        <text class="empty-text">{{ $t('暂无评论') }}</text>
      </view>
    </scroll-view>
  </fu-popup>
</template>
<script>
import shopPopup from './shop-popup.js'

export default shopPopup
</script>
<style lang="scss">
.discuss-title {
  /* #ifdef APP-PLUS-NVUE */
  display: block;
  /* #endif */
  position: relative;
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  .x-text {
    position: absolute;
    right: 30rpx;
    top: 50%;
    transform: translateY(-50%);
    height: 80rxp;
    width: 80rpx;
    line-height: 80rpx;
    text-align: center;
    font-size: 40rpx;
  }
}

.empty {
  width: 750rpx;
  height: 500rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.empty-image {
  width: 200rpx;
  height: 200rpx;
}
.empty-text {
  color: #999;
  font-size: 28rpx;
}

.close-btn {
  width: 70rpx;
  height: 50rpx;
  font-size: 18rpx;
  background-color: #ff7f50;
  color: #fff;
  border-radius: 4rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.goods-item {
  display: flex;
  align-items: stretch;
  flex-direction: row;
  padding: 10rpx 24rpx;
  border-bottom: 1px solid #ddd;
}
.goods-right {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  padding-left: 20rpx;
}
.goods-thumb {
  width: 150rpx;
  height: 150rpx;
  border-radius: 16rpx;
}
.goods-price {
  color: #f02325;
  font-size: 28rpx;
}
.goods-name {
  font-size: 28rpx;
  font-weight: 600;
}
</style>
