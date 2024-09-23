<template>
  <view :class="show">
    <swiper class="emoji-swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
      <swiper-item v-for="(item, key) in emojiObj" :key="key">
        <view class="emoji_item">
          <text class="emoji" decode v-for="(val, j) in item.split(',')" :key="j" @tap="sendEmoji" :data-emoji="val">
            {{ val }}
          </text>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
let EMOJI_STATUS = {
  OPENED: 'showEmoji',
  CLOSED: 'emoji_list',
}
export default {
  components: {},
  props: {
    mTop: {
      type: String,
      value: 'margin-top:30',
    },
  },
  data() {
    return {
      show: EMOJI_STATUS.CLOSED,
      emojiObj: {
        map1: '😀,😁,😂,😃,😄,😅,😆,😇,😈,😉,😊,😋,😌,😍,😎,😏,😐,😑,😒,😓,😔,😕,😖,😗,😘,😙,😚,😛',
        map2: '😜,😝,😞,😟,😠,😡,😢,😣,😤,😥,😦,😧,😨,😩,😪,😫,😬,😭,😮,😯,😰,😱,😲,😳,😴,😵,😶,😷',
        map3: '😸,😹,😺,😻,😼,😽,😾,😿,🙀,🙅,🙆,🙇,🙈,🙉,🙊,🙋,🙌,🙍,🙎,🙏,🐽,🐾,👀,👂,👃,👄,👅,👆',
        map4: '👇,👈,👉,👊,👋,👌,👍,👎,👏,👐,👑,💃,💄,💅,💆,💇,💈,💉,💊,💋,💌,💍,💎,👨,💐,💑,💒,💓',
        map5: '💔,💕,💖,💗,💘,💙,💚,💛,💜,💝,💞,💟,💠,💡,💢,💣,💤,💥,💦,💧,💨,💩,💪,💫,💬,💭,💮,💯',
        map6: '🌰,🌱,🌲,🌳,🌴,🌵,🌷,🌸,🌹,🌺,🌻,🌼,🌽,🌾,🌿,🍀,🍁,🍂,🍃,🍄,🍅,🍆,🍇,🍈,🍉,🍊,🍋,🍌',
        map7: '🍍,🍎,🍏,🍐,🍑,🍒,🍓,🍔,🍕,🍖,🍗,🍘,🍙,🍚,🍛,🍜,🍝,🍞,🍟,🍠,🍡,🍢,🍣,🍤,🍥,🍦,🍧,🍨',
        map8: '🍩,🍪,🍫,🍬,🍭,🍮,🍯,🍰,🍱,🍲,🍳,🍴,🍵,🍶,🍷,🍸,🍹,🍺,🍻,🍼',
      },
      interval: 5000,
      duration: 1000,
      autoplay: false,
      indicatorDots: true, // 显示面板指示点
    }
  },

  created() {},

  amount() {
    console.log(1)
  },
  onReady() {},

  methods: {
    openEmoji() {
      this.show = EMOJI_STATUS.OPENED
    },
    cancelEmoji() {
      this.show = EMOJI_STATUS.CLOSED
    },
    // 输出 emoji
    sendEmoji(event) {
      var emoji = event.target.dataset.emoji
      this.$emit('newEmojiStr', {
        msg: emoji,
        type: 'sss',
      })
    },
  },
}
</script>

<style>
.emoji_list {
  width: 750rpx;
  height: 0rpx;
  overflow: hidden;
}
.showEmoji {
  width: 750rpx;
}
.emoji-swiper {
  width: 750rpx;
  height: 430rpx;
  background-color: #fff;
}
/* #ifdef APP-NVUE*/
.emoji_item {
  width: 750rpx;
  height: 430rpx;
  padding: 0 24rpx;
  flex-direction: row;
  flex-wrap: wrap;
}
.emoji {
  line-height: 100rpx;
  text-align: center;
  width: 100rpx;
  height: 100rpx;
}
/* #endif */
/* #ifndef APP-NVUE*/
.emoji_item {
  padding: 0 24rpx;
  display: flex;
  flex-wrap: wrap;
}
.emoji {
  width: 100rpx;
  height: 100rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* #endif */
</style>
