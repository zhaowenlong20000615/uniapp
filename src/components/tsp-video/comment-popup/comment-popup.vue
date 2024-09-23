<template>
  <fu-popup safe-area-inset-bottom border-radius="15" v-model="show" mode="bottom" @close="closePopup">
    <view class="discuss-title">
      {{ discussNum }}{{ $t('条') }}{{ $t('评论') }}
      <text @tap="show = false" class="x-text">×</text>
    </view>
    <scroll-view @scrolltolower="loadData" scroll-y style="height: 500rpx">
      <view class="discuss-list" v-for="(item, i) in disscusList" :key="i">
        <view class="discuss-item">
          <image class="avatar-img" :src="item.avatar" mode="scaleToFill" />
          <view class="discuss-right">
            <view class="nickname-row">
              <text class="nickname">
                {{ item.nickname }}
              </text>
              <text v-if="authorId == item.user_id" class="author-text">{{ $t('作者') }}</text>
              <text class="reply-btn" @tap="handleReply(item)">{{ $t('回复') }}</text>
              <text class="discuss-time">{{ item.create_time }}</text>
            </view>
            <view class="content-box">
              {{ item.content }}
            </view>
            <template v-for="(val, j) in item.comment_reply_list">
              <view class="discuss-item" v-if="j < 3 || seeMoreId == item.aid" :key="j">
                <image class="avatar-img2" :src="val.avatar" mode="scaleToFill" />
                <view class="discuss-right">
                  <view class="nickname-row">
                    <text class="nickname">
                      {{ val.nickname }}
                    </text>
                    <text v-if="authorId == val.user_id" class="author-text">{{ $t('作者') }}</text>
                    <!-- <text class="reply-btn" @tap="handleReply(val)">回复</text> -->
                    <text class="discuss-time">{{ val.create_time }}</text>
                  </view>
                  <view class="content-box">
                    {{ val.content }}
                  </view>
                </view>
              </view>
            </template>
            <view @click="handleSeeMore(item.aid)" v-if="item.comment_reply_list.length > 3 && seeMoreId != item.aid" class="see-more">
              ∨{{ $t('查看更多') }}
            </view>
          </view>
        </view>
      </view>
      <view v-if="!disscusList.length" class="empty">
        <image class="empty-image" :src="benbenImageSrcResolution('sound.png', 'global')" mode="scaleToFill" />
        <text class="empty-text">{{ $t('暂无评论') }}</text>
      </view>
    </scroll-view>
    <view class="discuss-bottom-box" v-if="!isReply">
      <input confirm-type="send" :placeholder="$t('说点什么吧')" @focus="cancelEmoji" @confirm="sendMsg" type="text" v-model="discussContent" />
      <image @tap="openEmoji" class="face-icon" :src="benbenImageSrcResolution('sound.png', 'global')" mode="scaleToFill" />
      <view @tap="sendMsg" class="send-btn">{{ $t('发送') }}</view>
    </view>
    <view v-else class="discuss-bottom-box">
      <view @tap="closeReply" class="close-btn">{{ $t('回复') }}X</view>
      <input
        style="width: 430rpx"
        confirm-type="send"
        :placeholder="'@' + replyData.nickname"
        @focus="cancelEmoji"
        @confirm="sendMsg"
        type="text"
        v-model="discussContent"
      />
      <image @tap="openEmoji" class="face-icon" :src="benbenImageSrcResolution('sound.png', 'global')" mode="scaleToFill" />
      <view @tap="sendMsg" class="send-btn">{{ $t('发送') }}</view>
    </view>
    <wj-emoji ref="emoji" @newEmojiStr="emojiAction"></wj-emoji>
    <!-- <view :style="{ height: keyboardheight + 'px' }"></view> -->
  </fu-popup>
</template>

<script>
import wjEmoji from './wj-emoji.vue'
import commentPopup from './comment-popup.js'
export default {
  mixins: [commentPopup],
  components: {
    wjEmoji,
  },
}
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
.see-more {
  color: #0c1ad8;
  font-size: 18rpx;
  text-align: center;
  margin-bottom: 20rpx;
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
.discuss-bottom-box {
  height: 100rpx;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32rpx;
  input {
    background-color: #f6f7f9;
    height: 64rpx;
    width: 520rpx;
    border-radius: 32rpx;
    padding: 0 24rpx;
  }
  .face-icon {
    width: 50rpx;
    height: 50rpx;
  }
}

.discuss-list {
  padding: 0 32rpx;
}
.discuss-item {
  display: flex;
  justify-content: space-between;
  .discuss-right {
    flex: 1;
    padding-left: 20rpx;
  }
}
.avatar-img {
  width: 72rpx;
  height: 72rpx;
  border-radius: 50%;
  flex-shrink: 0;
}
.avatar-img2 {
  width: 54rpx;
  height: 54rpx;
  border-radius: 50%;
  flex-shrink: 0;
}
.nickname-row {
  display: flex;
  align-items: center;
  .nickname {
    line-height: 36rpx;
    font-size: 24rpx;
    color: #666;
  }

  .author-text {
    font-size: 18rpx;
    height: 25rpx;
    line-height: 25rpx;
    padding: 0 5rpx;
    background-color: #fb4c58;
    border-radius: 4rpx;
    color: #fff;
    margin: 0 15rpx;
  }
  .reply-btn {
    font-size: 18rpx;
    // margin-left: auto;
    color: #0c1ad8;
    padding-left: 15rpx;
  }
  .discuss-time {
    font-size: 22rpx;
    color: #999;
    padding-left: 15rpx;
    margin-left: auto;
  }
}
.content-box {
  padding-top: 10rpx;
  margin-bottom: 20rpx;
  font-size: 24rpx;
  line-height: 32rpx;
}

.send-btn {
  width: 70rpx;
  height: 50rpx;
  font-size: 18rpx;
  background-color: #1577fc;
  color: #fff;
  border-radius: 4rpx;
  display: flex;
  justify-content: center;
  align-items: center;
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
</style>
