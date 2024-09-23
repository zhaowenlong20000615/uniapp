<template>
  <view class="content" :style="{ top: top + StatusBarRpx + 'rpx' }">
    <!-- 左边tab栏开始 -->
    <scroll-view class="left" scroll-with-animation="all 0.2s ease" :scroll-into-view="toLeftId" scroll-y>
      <view
        :upper-threshold="500"
        :id="`l_id${i}`"
        v-for="(item, i) in lists"
        :key="i"
        class="item text-center"
        :class="{ active: index == i }"
        @click="handleSelect(i)"
      >
        {{ item.name }}
        <view class="cuIconlujing226"></view>
      </view>
    </scroll-view>
    <!-- 左边tab栏结束 -->
    <!-- 右边列表开始 -->
    <scroll-view
      class="right"
      scroll-with-animation="all 0.2s ease"
      refresher-background="transparent"
      scroll-y
      @scroll="scroll"
      :scroll-top="scrollTop"
      :refresher-triggered="refresherTriggered"
      :refresher-enabled="true"
      :refresher-threshold="100"
      @refresherrefresh="refresherrefresh"
    >
      <swiper v-if="isSwiper && rightList.ad_list.length" style="height: 220rpx" :interval="5000" :duration="500" :circular="true">
        <swiper-item @tap="handlerSwiper(item)" class="swiper-item" v-for="(item, key0) in rightList.ad_list" :key="key0">
          <image class="home_fd3_0_c2" mode="aspectFill" :src="item.thumb"></image>
        </swiper-item>
      </swiper>
      <view v-if="isThreeLevel">
        <view v-for="(e, j) in rightList.children" :key="e.aid">
          <template v-if="e.children && e.children.length">
            <view class="cate-title">{{ e.name }}</view>
            <view class="cate-box">
              <view class="cate-box-item" v-for="(child, j) in e.children" :key="child.aid" @tap.stop="handlerClassify(child)">
                <image :style="{ 'border-radius': classifyRadius + 'rpx' }" class="classify-image" :src="child.thumb" mode="aspectFill" />
                <text class="text-333 text-sm goods_title">{{ child.name }}</text>
              </view>
            </view>
          </template>
        </view>
      </view>
      <view class="cate-box" v-else>
        <view class="cate-box-item" v-for="(e, j) in rightList.children" :key="e.aid" @tap.stop="handlerClassify(e)">
          <image :style="{ 'border-radius': classifyRadius + 'rpx' }" class="classify-image" :src="e.thumb" mode="aspectFill" />
          <text class="text-333 text-sm goods_title">{{ e.name }}</text>
        </view>
      </view>
      <benben-empty :listData="rightList.children"></benben-empty>
    </scroll-view>
    <!-- 右边列表结束 -->
  </view>
</template>
<script>
export default {
  name: 'benben-goods-classify-swiper',
  props: {
    // 分类列表
    lists: {
      type: Array,
      default: () => [],
    },
    top: {
      type: [Number, String],
      default: 88,
    },
    handleId: {
      type: [Number, String],
      default: '',
    },
    swiperId: {
      type: [Number, String],
      default: '',
    },
    classifyRadius: {
      type: [Number, String],
      default: 16,
    },
    isThreeLevel: {
      type: Boolean,
      default: false,
    },
    isSwiper: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      toLeftId: '',
      torightId: '',
      refresherTriggered: false,
      scrollTop: 0,
      index: 0,
    }
  },
  watch: {
    lists: {
      handler(value) {
        if (value.length && value.length - 1 < this.index) {
          this.index = value.length - 1
        }
      },
      deep: true,
      immediate: true,
    },
  },
  components: {},
  computed: {
    rightList() {
      if (!this.lists[this.index]) {
        return { ad_list: [], children: [] }
      }
      return this.lists[this.index]
    },
  },
  onLoad() {},
  mounted() {},
  methods: {
    refresherrefresh() {
      this.refresherTriggered = true
      setTimeout(() => {
        this.refresherTriggered = false
        this.$emit('refresh')
      }, 500)
    },
    scroll(e) {
      this.scrollTop = e.detail.scrollTop
    },
    handleSelect(index) {
      this.index = index
      this.toLeftId = `l_id${index}`
      this.scrollTop = 0
    },
    handlerClassify(item) {
      this.$emit('update:handle-id', item.aid)
      this.$emit('handle-item', item)
    },
    handlerSwiper(item) {
      this.$emit('update:swiper-id', item.aid)
      this.$emit('handle-swiper', item)
    },
  },
}
</script>

<style lang="scss" scoped>
.classify-image {
  width: 146rpx;
  height: 146rpx;
}
.cate-title {
  background-color: #fff;
  text-align: center;
  font-size: 32rpx;
  color: #333;
  font-weight: 600;
  line-height: 80rpx;
}
.goods_title {
  padding-top: 8rpx;
  width: 146rpx;
  overflow: hidden; //超出的文本隐藏
  text-overflow: ellipsis; //用省略号显示
  white-space: nowrap; //不换行
}
.content {
  border-top: 1px solid #f8f8f8;
  position: fixed;
  bottom: var(--window-bottom);
  display: flex;
  .left {
    width: 180rpx;
    height: 100%;
    background-color: #f8f8f8;
    box-sizing: border-box;
    .item {
      width: 100%;
      height: 99rpx;
      line-height: 99rpx;
      font-size: 28rpx;
      color: #333;
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
    .item.active {
      background-color: #fff;
      color: var(--active-tag-color, #d90b20);
      font-weight: bold;
      position: relative;
      &::before {
        content: '';
        width: 8rpx;
        height: 34rpx;
        background: var(--active-tag-color, #d90b20);
        border-radius: 4rpx;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      }
    }
  }
  .right {
    padding-top: 20rpx;
    width: 570rpx;
    height: 100%;
    background-color: #fff;
  }
}
.cate-box {
  display: flex;
  flex-wrap: wrap;
  .cate-box-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 33%;
    text-align: center;
    padding-bottom: 20rpx;
  }
}
.swiper-item {
  display: flex;
  justify-content: center;
}
.home_fd3_0_c2 {
  width: 530rpx;
  height: 200rpx;
  border-radius: 16rpx;
}
</style>
