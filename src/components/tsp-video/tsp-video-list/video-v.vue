<template>
  <view class="page">
    <view :style="{ height: videoStyle.statusBarHeight }"></view>
    <view v-if="!isTabbar" :style="{ top: videoStyle.statusBarHeight }" class="title-box">
      <image @click="black" :src="benbenImageSrcResolution('black2.png', 'global')" mode="aspectFit" class="title-image"></image>
      <image @click="jumpBtn(6)" :src="benbenImageSrcResolution('ward.png', 'global')" mode="aspectFit" class="title-image"></image>
    </view>
    <view class="contentBox" v-if="contentShow" :style="{ width: videoStyle.width, height: videoStyle.height }">
      <swiper
        :style="{ width: videoStyle.width, height: videoStyle.height }"
        vertical
        :circular="circular"
        :duration="durationNum"
        @change="changeSwiper"
        @animationfinish="swiperVod"
        class="swiperBox"
        :current="currentIndex"
      >
        <swiper-item v-for="(item, index) in vodList" :key="index" class="box">
          <view :style="{ opacity: shadeNum > 2 ? '0' : '1' }">
            <view class="vodPlayer">
              <video
                :style="{ width: videoStyle.width, height: videoStyle.height }"
                :src="item.vodUrl"
                :controls="false"
                :enable-progress-gesture="false"
                :show-loading="false"
                :show-play-btn="false"
                :show-center-play-btn="false"
                :show-fullscreen-btn="false"
                :vslide-gesture-in-fullscreen="false"
                :show-progress="false"
                :object-fit="item.object_fit"
                :http-cache="true"
                :loop="loopPlay"
                :muted="index == vodIndex ? false : true"
                :id="'myVideo' + index"
                @play="startPlay(index)"
                @waiting="bufferVod(index)"
                @timeupdate="timeupdateVod($event, index)"
                @error="errVod(index)"
                @ended="endedVod(index)"
              ></video>
            </view>
            <!-- 视频封面 -->
            <view class="vodPause-img" v-if="item.coverShow">
              <image
                :src="item.coverImg"
                :mode="item.object_fit == 'cover' ? 'aspectFill' : 'widthFix'"
                class="cover-img"
                :style="{
                  opacity: item.coverOpacity ? 1 : 0,
                  width: videoStyle.width,
                  height: item.object_fit == 'cover' ? videoStyle.height : 0,
                }"
              ></image>
            </view>
            <!-- 暂停图标 -->
            <view class="vodPause-img" v-if="item.pauseShow">
              <image :src="benbenImageSrcResolution('vodPause.png', 'global')" class="vodPauseImage"></image>
            </view>
            <view
              @click="playSpot(index)"
              class="vodPlayView"
              :style="videoStyle"
              @touchstart="vodViewStart($event)"
              @touchmove="vodViewMove($event)"
              @touchend="vodViewEnd($event)"
            ></view>
            <!-- 底部标题、右侧操作栏 -->
            <view>
              <videoMenu
                :ref="'menuRef' + index"
                :vodIndex="vodIndex"
                :vodCurIndex="vodCurIndex"
                :item="item"
                :index="index"
                :sliderDrag="sliderDrag"
                :moveOpacity="moveOpacity"
                :palyCartoon="palyCartoon"
                @jump-btn="jumpBtn($event)"
                @handleInfo="handleInfo"
                :is-tabbar="isTabbar"
              ></videoMenu>
            </view>
          </view>
          <!-- 底层图标 -->
          <view class="vodLayer">
            <image :src="benbenImageSrcResolution('sound.png', 'global')" mode="" class="vodLayer-img"></image>
          </view>
        </swiper-item>
      </swiper>

      <swiper
        class="shade-swiper"
        :style="{
          width: videoStyle.width,
          height: videoStyle.height,
          pointerEvents: showShade ? 'auto' : 'none',
          opacity: showShade ? '1' : '0',
        }"
        vertical
      >
        <swiper-item v-for="(item, index) in 1" :key="index" class="box">
          <!-- 底层图标 -->
          <view class="vodLayer">
            <image :src="benbenImageSrcResolution('sound.png', 'global')" mode="" class="vodLayer-img"></image>
          </view>
        </swiper-item>
      </swiper>
      <!-- 底部加载动画 -->
      <view class="pullup" v-if="loadShow">
        <view style="width: 32rpx; height: 32rpx; margin-right: 30rpx">
          <view class="k-ball7a" style="width: 20rpx; height: 20rpx"></view>
          <view class="k-ball7b" style="width: 20rpx; height: 20rpx"></view>
          <view class="k-ball7c" style="width: 20rpx; height: 20rpx"></view>
          <view class="k-ball7d" style="width: 20rpx; height: 20rpx"></view>
        </view>
      </view>
      <view
        class="flooter"
        :style="{ opacity: moveOpacity ? 0 : 1, bottom: speedBottom + 'px' }"
        v-if="vodList.length > 0 && beforeVodInfo.sliderShow"
      >
        <!-- 滑动进度条显示时间 -->
        <view class="sliderData" v-if="sliderDrag">
          <view class="slider-text">
            <text>{{ formatSeconds(sliderTime) }}</text>
            <text style="font-size: 30rpx; margin: 0 10rpx">/</text>
            <text style="opacity: 0.5">{{ formatSeconds(videoTime) }}</text>
          </view>
        </view>
        <!-- 进度条 -->
        <view
          class="sliderBox"
          :style="{ opacity: shadeNum > 2 ? '0' : '1' }"
          @touchmove.stop="touchmoveSlider"
          @touchstart.stop="touchmoveSlider"
          @touchend.stop="touchendSlider"
          v-if="vodList.length > 0 && beforeVodInfo.sliderShow && videoTime > 0"
        >
          <view class="slider-item" :style="{ height: brightSlider ? '18px' : '2px' }">
            <!-- 底层 -->
            <view class="slider-box" :class="[brightSlider ? 'slider-box-active' : '']"></view>
            <!-- 滑块 -->
            <!-- <view class="slider-block" :class="[brightSlider?'slider-block-active':'']" :style="{transform:`translateX(${sliderProgress}px)`}"></view> -->
            <!-- 滑动层 -->
            <view
              class="slider-load"
              :class="[brightSlider ? 'slider-load-active' : '']"
              :style="{
                transform: `translateX(${sliderProgress > 0 ? sliderProgress - screenWidth : -screenWidth}px)`,
              }"
            ></view>
          </view>
        </view>
        <view v-else :style="{ width: screenWidth + 'px', height: '18px' }"></view>
        <!-- loading加载动画进度 -->
        <view class="loadSlider" v-if="vodList.length > 0 && beforeVodInfo.loadingShow">
          <view :style="{ opacity: brightSlider ? 0 : 1 }">
            <view class="loading-slider" ref="loadSlider" :style="{ width: screenWidth + 'px' }"></view>
          </view>
        </view>
      </view>
    </view>
    <!-- 刷新 -->
    <view class="refresh" v-if="refreshShow">
      <view style="height: 140rpx"></view>
      <!--  :style="{opacity:refreshOpacity,transform: 'translateY('+refreshclientY+'px)'}" -->
      <view class="refreshBox" :style="{ opacity: refreshOpacity }">
        <view style="width: 32rpx; height: 32rpx"></view>
        <view>{{ $t('下拉刷新内容') }}</view>
        <view style="width: 32rpx; height: 32rpx; margin-right: 30rpx">
          <view class="k-ball7a k-paused" style="width: 20rpx; height: 20rpx" :class="[refreshOpen ? 'k-running' : '']"></view>
          <view class="k-ball7b k-paused" style="width: 20rpx; height: 20rpx" :class="[refreshOpen ? 'k-running' : '']"></view>
          <view class="k-ball7c k-paused" style="width: 20rpx; height: 20rpx" :class="[refreshOpen ? 'k-running' : '']"></view>
          <view class="k-ball7d k-paused" style="width: 20rpx; height: 20rpx" :class="[refreshOpen ? 'k-running' : '']"></view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import videoJs from './video-v-encipher.js'
import videoMenu from '../tsp-menu/tsp-menu-v.vue'
export default {
  components: {
    videoMenu,
  },
  mixins: [videoJs],
}
</script>

<style>
.title-box {
  position: fixed;
  height: 88rpx;
  width: 750rpx;
  /* #ifdef MP-WEIXIN */
  width: 600rpx;
  /* #endif */
  padding: 0 32rpx;
  left: 0;
  z-index: 999;
  display: flex;
  flex-direction: row;
  background-color: transparent;
  justify-content: space-between;
  align-items: center;
}
.title-image {
  width: 42rpx;
  height: 42rpx;
}
.page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.contentBox {
  position: relative;
}
.shade-swiper {
  position: absolute;
  pointer-events: none;
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
}
.swiperBox {
  position: relative;
  z-index: 2;
}
.box {
  position: relative;
}
.vodLayer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.vodLayer-img {
  width: 150rpx;
  height: 150rpx;
  opacity: 0.8;
}
.cover-img {
  width: 750rpx;
  height: auto;
}
.vodPlayer {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
}
.vodPlayView {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 7;
}
.vodPause-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.vodPauseImage {
  width: 94rpx;
  height: 94rpx;
}
/* loading动画 */
.loadingView {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000;
}
.k-ball7a {
  border: 0;
  margin: 0;
  width: 25rpx;
  height: 25rpx;
  position: absolute;
  border-radius: 50%;
  animation: k-loadingO 2s ease infinite;
  background: #4cd964;
  animation-delay: -1.5s;
}
.k-ball7b {
  border: 0;
  margin: 0;
  width: 25rpx;
  height: 25rpx;
  position: absolute;
  border-radius: 50%;
  animation: k-loadingO 2s ease infinite;
  background: #f63d3a;
  animation-delay: -1s;
}
.k-ball7c {
  border: 0;
  margin: 0;
  width: 25rpx;
  height: 25rpx;
  position: absolute;
  border-radius: 50%;
  animation: k-loadingO 2s ease infinite;
  background: #fda543;
  animation-delay: -0.5s;
}
.k-ball7d {
  border: 0;
  margin: 0;
  width: 25rpx;
  height: 25rpx;
  position: absolute;
  border-radius: 50%;
  animation: k-loadingO 2s ease infinite;
  background: #5c6bc0;
}
.k-paused {
  animation-play-state: paused;
}
.k-running {
  animation-play-state: running;
}
@keyframes k-loadingO {
  0%,
  100% {
    transform: translate(0);
  }
  25% {
    transform: translate(160%);
  }
  50% {
    transform: translate(160%, 160%);
  }
  75% {
    transform: translate(0, 160%);
  }
}
/* 进度条 */
.flooter {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1100;
  transition: all 0.3s linear;
}
.sliderBox {
  position: relative;
  min-height: 18px;
  width: 750rpx;
}
.slider-item {
  width: 750rpx;
  min-height: 2px;
  position: absolute;
  left: 0;
  bottom: 0;
  overflow: hidden;
}
.slider-box {
  height: 2px;
  background-color: #c8c7cc;
  opacity: 0.2;
  border-radius: 2px;
}
.slider-block {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  background-color: #ffffff;
  top: -1px;
  left: 0;
  z-index: 3;
  opacity: 0.5;
}
.slider-load {
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 2px;
  background-color: #ffffff;
  opacity: 0.4;
  z-index: 3;
  border-radius: 2px;
  transition: all 0.02s linear;
}
.slider-box-active {
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 7px;
  background-color: #c8c7cc;
  opacity: 0.4;
  border-radius: 7px;
  transition: height 0.2s linear;
}
.slider-block-active {
  position: absolute;
  top: 8px;
  width: 15px;
  height: 15px;
  border-radius: 15px;
  opacity: 1;
  left: -3px;
  background-color: #ffffff;
}
.slider-load-active {
  width: 100%;
  opacity: 1;
  height: 7px;
  border-radius: 7px;
  transition: height 0.2s linear;
}
.sliderData {
  width: 750rpx;
  height: 200rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 50rpx;
  font-weight: bold;
}
.slider-text {
  display: flex;
  align-items: center;
}
/* 下拉刷新 */
.refresh {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 15;
}
.refreshBox {
  height: 100rpx;
  color: #ffffff;
  font-size: 33rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30rpx;
  /* transform: translateY(-30px); */
  transition: all 0.01s linear;
  opacity: 0;
}
.pullup {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
  height: 200rpx;
  opacity: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loadSlider {
  position: absolute;
  bottom: 0px;
  width: 750rpx;
  height: 2px;
  align-items: center;
}
.loading-slider {
  width: 750rpx;
  height: 2px;
  background-color: #ffffff;
  opacity: 0.6;
  animation: sliderName 0.4s linear infinite;
}
@keyframes sliderName {
  0% {
    opacity: 0.9;
    transform: scale(0.4);
  }
  100% {
    opacity: 0.1;
    transform: scale(1);
  }
}
</style>
