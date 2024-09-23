<template>
  <view>
    <fu-popup v-model="sharePopup" mode="bottom" :safe-area-inset-bottom="true" :mask-close-able="true" border-radius="24">
      <view class="wrap">
        <view class="flex">
          <view class="flex-sub text-center">{{$t('分享到')}}</view>
          <view class="cuIcon-close" @tap.stop="close"></view>
        </view>
        <view class="share-row">
          <template v-for="(item, index) in shareList">
            <button :key="index" v-if="item.type == 'weixin'" class="share-item" open-type="share">
              <image class="share-image" :src="item.icon" mode="aspectFit"></image>
              <text class="share-text">{{ item.title }}</text>
            </button>
            <view :key="index" v-else @tap.stop="share(item)" class="share-item">
              <image class="share-image" :src="item.icon" mode="aspectFit"></image>
              <text class="share-text">{{ item.title }}</text>
            </view>
          </template>
        </view>
      </view>
    </fu-popup>
    <fu-popup v-model="posterPopup" mode="bottom" :safe-area-inset-bottom="true" :mask-close-able="true" border-radius="24">
      <view class="wrap">
        <view class="flex">
          <view class="flex-sub text-center">{{$t('保存到相册')}}</view>
          <view class="cuIcon-close" @click.stop="posterPopup = false"></view>
        </view>
        <view class="preview-box">
          <view class="preview-img">
            <image class="preview-image" :src="previewImageUrl" mode="aspectFill" @click="previewImage(previewImageUrl)"></image>
          </view>
          <text @click="saveImage()" class="save_btn">{{$t('保存图片')}}</text>
        </view>
      </view>
    </fu-popup>
    <l-painter
      v-if="posterPopup"
      isCanvasToTempFilePath
      @success="success"
      @fail="fail"
      css="width:550rpx;height:800rpx;background:#fff;border-radius:16rpx;overflow: hidden;"
      ref="painter"
      :hidden="true"
      file-type="png"
      path-type="url"
    >
      <l-painter-image css="width:550rpx;height:700rpx;position:absolute;top:0rpx;left:0rpx;object-fit:cover" :src="info.coverImg"></l-painter-image>
      <l-painter-image
        css="border:1rpx solid #eee; width:86rpx;height:86rpx;background:#fff;position:absolute;top:660rpx;left:10rpx;object-fit:cover;border-radius:50%"
        :src="info.avatar"
      ></l-painter-image>
      <l-painter-text css="position:absolute;top:700rpx;left:108rpx;width;366rpx;font-size:24rpx;" :text="info.nickname"></l-painter-text>
      <l-painter-text css="position:absolute;top:750rpx;left:20rpx;width;510rpx;font-size:20rpx;color:#999;" :text="title"></l-painter-text>
    </l-painter>
  </view>
</template>

<script>
import index from './index.js'
export default index
</script>

<style lang="scss" scoped>
.wrap {
  padding: 30rpx;
}

.share-image {
  width: 85rpx;
  height: 85rpx;
}

.height-200 {
  height: 200rpx;
}

.save_btn {
  width: 550rpx;
  height: 60rpx;
  line-height: 60rpx;
  font-size: 26rpx;
  text-align: center;
  color: #ffffff;
  background-color: #0a20e5;
  border-radius: 30rpx;
  margin-bottom: 20rpx;
}
.preview-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 20rpx;
}
.share-row {
  display: flex;
  flex-direction: row;
  /* padding: 0 32rpx; */
  flex-wrap: wrap;
  .share-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    height: 220rpx;
  }
  .share-text {
    line-height: 44rpx;
    font-size: 26rpx;
  }
}
.preview-img {
  box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.2);
  margin-bottom: 20rpx;
  border-radius: 8rpx;
  width: 550rpx;
  height: 800rpx;
}
.preview-image {
  width: 550rpx;
  height: 800rpx;
  border-radius: 8rpx;
}

.offset-canvas {
  position: fixed;
  top: -1000px;
  left: 0;
  z-index: 9999;
}
</style>
