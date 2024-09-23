<template>
  <view>
    <!-- 底部标题 -->
    <view
      class="footTitle"
      :class="[vodIndex == index ? (sliderDrag ? 'vodMenu-bright1' : moveOpacity ? 'vodMenu-bright2' : 'vodMenu-bright0') : '']"
    >
      <view v-if="item.shopNum" class="shop-box" @click="JumpBtn(8)">
        <image class="shop-icon" :src="benbenImageSrcResolution('shop_icon.png', 'global')" mode="scaleToFill" />
        <text class="shop-text">{{ $t('查看TA提到的商品') }}({{ item.shopNum }})</text>
      </view>
      <view class="foot-name">@{{ item.nickname }}</view>
      <view class="foot-cont">{{ item.title }}</view>
      <view class="foot-tag" v-if="item.topic">
        <text @click="JumpBtn(9)" class="foot-tag-item">{{ item.topic.name }}</text>
      </view>
      <view v-if="item.address" class="location-box">
        <image class="location-icon" :src="benbenImageSrcResolution('location.png', 'global')" mode="scaleToFill" />
        <text class="location-text">
          {{ item.address }}
        </text>
      </view>
    </view>
    <!-- 右侧操作栏 -->
    <view class="menuBox">
      <view
        class="vodMenu"
        :class="[vodIndex == index ? (sliderDrag ? 'vodMenu-bright1' : moveOpacity ? 'vodMenu-bright2' : 'vodMenu-bright0') : '']"
      >
        <!-- 头像 -->
        <view class="menu-avatar">
          <image v-if="item.avatar" :src="item.avatar" mode="" class="avatar-image" @click="JumpBtn(1)"></image>
          <image v-else :src="benbenImageSrcResolution('touxiang.jpg', 'global')" mode="" class="avatar-image" @click="JumpBtn(1)"></image>
          <view class="follow" @click.stop="JumpBtn(2)" v-if="!item.followReally" :class="{ followHide: followShow == 2 }">
            <image
              :src="benbenImageSrcResolution('gou.png', 'global')"
              mode=""
              class="follow-guanzhu guanzhu-gou"
              v-if="followShow == 1 || followShow == 2"
            ></image>
            <image
              mode=""
              class="follow-guanzhu"
              v-if="followShow == null || followShow == 0"
              :src="benbenImageSrcResolution('guanzhu.png', 'global')"
              :class="{ followActive: followShow == 0 }"
            ></image>
          </view>
        </view>
        <!-- 点赞 -->
        <view class="fabulous" @click="JumpBtn(3)">
          <view class="fabulous-image fabulous-taoxin">
            <image :src="benbenImageSrcResolution('selectTaoxin.png', 'global')" mode="" class="fabulous-image" v-if="item.fabulousShow"></image>
            <image :src="benbenImageSrcResolution('taoxin.png', 'global')" mode="" class="fabulous-image" v-else></image>
          </view>
          <view class="fabulous-num">{{ item.fabulousNum }}</view>
        </view>
        <view class="fabulous" style="margin-top: 30rpx" @click="JumpBtn(5)">
          <view class="fabulous-image">
            <image v-if="item.collectShow" :src="benbenImageSrcResolution('star_active.png', 'global')" mode="" class="fabulous-image"></image>
            <image v-else :src="benbenImageSrcResolution('star.png', 'global')" mode="" class="fabulous-image"></image>
          </view>
          <view class="fabulous-num">{{ item.collectNum }}</view>
        </view>
        <!-- 评论 -->
        <view class="fabulous" style="margin-top: 30rpx" @click="JumpBtn(4)">
          <view class="fabulous-image">
            <image :src="benbenImageSrcResolution('pinlun.png', 'global')" mode="" class="fabulous-image"></image>
          </view>
          <view class="fabulous-num">{{ item.discussNum }}</view>
        </view>
        <!-- 转发 -->
        <view class="fabulous" v-if="isTabbar" style="margin-top: 30rpx" @click="JumpBtn(6)">
          <view class="fabulous-image">
            <image :src="benbenImageSrcResolution('ward.png', 'global')" mode="" class="fabulous-image"></image>
          </view>
        </view>
      </view>
    </view>
    <!-- 旋转头像 -->
    <view
      class="avatarMenu"
      v-if="item.rotateImgShow"
      :class="[vodIndex == index ? (sliderDrag ? 'vodMenu-bright1' : moveOpacity ? 'vodMenu-bright2' : 'vodMenu-bright0') : '']"
    >
      <view class="rotate-avatar k-paused" :class="[item.vodPaly && palyCartoon ? 'k-running' : '']" @click="JumpBtn(7)">
        <image :src="benbenImageSrcResolution('touxiang.jpg', 'global')" mode="" class="rotate-image"></image>
      </view>
    </view>
  </view>
</template>

<script>
import { benbenImageSrcResolution } from '@/common/utils/utils.js'
export default {
  components: {},
  data() {
    return {
      fabulousShow: false,
      followShow: null,
      followOpen: false,
      fabuTimeOut: null,
    }
  },
  props: {
    isTabbar: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
      default: 0,
    },
    vodIndex: {
      type: Number,
      default: 0,
    },
    vodCurIndex: {
      type: Number,
      default: 0,
    },
    item: {
      type: Object,
      default: () => {
        return {}
      },
    },
    discussNum: {
      type: Number,
      default: 0,
    },
    sliderDrag: {
      //是否在拖动进度
      type: Boolean,
      default: false,
    },
    moveOpacity: {
      //是否透明
      type: Boolean,
      default: false,
    },
    palyCartoon: {
      //是否播放旋转头像
      type: Boolean,
      default: false,
    },
  },
  watch: {
    'item.followReally'(value) {
      console.log(value)
      this.followBtn()
    },
  },
  methods: {
    benbenImageSrcResolution,
    /* 视频点赞动效 */
    fabulousBtn() {
      let obj = Object.assign({}, this.item)
      obj.fabulousShow = !obj.fabulousShow
      clearTimeout(this.fabuTimeOut)
      this.fabuTimeOut = setTimeout(() => {
        // this.$emit('handleInfo', obj) //点赞成功
      }, 200)
    },
    /* 关注动效 */
    followBtn() {
      if (this.followOpen) return
      this.followOpen = true
      // let obj = Object.assign({}, this.item)
      // obj.followReally = true
      this.followShow = 0
      setTimeout(() => {
        this.followShow = 1
        setTimeout(() => {
          this.followShow = 2
          setTimeout(() => {
            this.followOpen = false
            this.followShow = null
            // this.$emit('handleInfo', obj) //关注成功
          }, 300)
        }, 100)
      }, 500)
    },
    /* 点击右侧菜单选项 1头像 2点赞 3评论 4转发 5旋转头像 6点击关注 */
    JumpBtn(index) {
      this.$emit('jump-btn', index)
    },
  },
}
</script>

<style>
.foot-tag {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.foot-tag-item {
  padding: 0 10rpx;
  font-size: 18rpx;
  background-color: rgba(49, 153, 229, 0.2);
  color: #3199e5;
  margin-right: 5rpx;
  margin-bottom: 5rpx;
  line-height: 28rpx;
  border-radius: 16rpx;
}
.shop-box {
  padding: 0 15rpx;
  height: 32rpx;
  background-color: rgba(255, 255, 255, 0.3);
  align-items: center;
  display: flex;
  flex-direction: row;
  border-radius: 16rpx;
  margin-bottom: 10rpx;
}
.shop-icon {
  width: 22rpx;
  height: 22rpx;
  margin-right: 5rpx;
}
.shop-text {
  font-size: 20rpx;
  color: #fff;
}
.location-box {
  padding: 0 10rpx;
  height: 32rpx;
  background-color: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  flex-direction: row;
  border-radius: 16rpx;
}
.location-icon {
  width: 22rpx;
  height: 22rpx;
  margin-right: 5rpx;
}
.location-text {
  max-width: 200rpx;
  font-size: 20rpx;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  lines: 1;
}
/* 右边菜单栏 */
.menuBox {
  position: absolute;
  right: 10rpx;
  width: 115rpx;
  height: 100%;
  z-index: 8;
  display: flex;
  align-items: center;
}
.avatarMenu {
  position: absolute;
  bottom: 20px;
  right: 10rpx;
  width: 115rpx;
  z-index: 8;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.vodMenu {
  margin-top: 100rpx;
  width: 115rpx;
  /* bottom: 400rpx; */
  display: flex;
  align-items: center;
  flex-direction: column;
}
.vodMenu-bright0 {
  opacity: 1;
  transition: all 0.3s linear;
}
.vodMenu-bright1 {
  opacity: 0;
  transition: all 0.3s linear;
}
.vodMenu-bright2 {
  opacity: 0.2;
  transition: all 0.3s linear;
}
.menu-avatar {
  position: relative;
  width: 115rpx;
  height: 115rpx;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar-image {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
}
.follow {
  position: absolute;
  bottom: -20rpx;
  width: 40rpx;
  height: 40rpx;
  background-color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.follow:active {
  transform: scale(0.7);
  transition: all 0.3s linear;
}
.follow-guanzhu {
  width: 40rpx;
  height: 40rpx;
}
.guanzhu-gou {
  width: 30rpx;
  height: 30rpx;
}
.followActive {
  transform: rotate(180deg);
  transition: all 0.5s linear;
}
.followHide {
  transform: scale(0);
  transition: all 0.8s linear;
}
.fabulous {
  width: 100rpx;
  margin-top: 80rpx;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.fabulous-image {
  width: 80rpx;
  height: 80rpx;
}
.fabulous-num {
  width: 100rpx;
  font-size: 28rpx;
  color: #ffffff;
  text-align: center;
  margin-top: 10rpx;
}
.fabulous-taoxin:active {
  transition: all 0.2s linear;
  transform: scale(0.7);
}
.rotate-avatar {
  width: 95rpx;
  height: 95rpx;
  border-radius: 95rpx;
  background-color: #333333;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: rotateName 5s linear infinite;
}
.rotate-image {
  width: 55rpx;
  height: 55rpx;
  border-radius: 55rpx;
}
@keyframes rotateName {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
/* 底部标题部分 */
.footTitle {
  position: absolute;
  bottom: 20px;
  left: 0;
  z-index: 8;
  width: 500rpx;
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-left: 30rpx;
}
.foot-name {
  font-size: 28rpx;
  color: #ffffff;
  font-weight: bold;
  margin-bottom: 5rpx;
}
.foot-cont {
  line-height: 32rpx;
  font-size: 20rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 5rpx;
  /* white-space: nowrap; */
  lines: 2;
  color: #ffffff;
}
.foot-primary {
  font-size: 27rpx;
  color: #ffffff;
}
.k-paused {
  animation-play-state: paused;
}
.k-running {
  animation-play-state: running;
}
</style>
