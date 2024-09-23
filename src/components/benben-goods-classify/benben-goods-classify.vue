<template>
  <view class="content" :style="{ top: top + StatusBarRpx + 'rpx' }">
    <!-- 左边tab栏开始 -->
    <scroll-view class="left" scroll-with-animation="all 0.2s ease" :scroll-into-view="toLeftId" scroll-y>
      <view
        :upper-threshold="500"
        :id="`l_id${index}`"
        v-for="(item, index) in lists"
        :key="index"
        class="item text-center"
        :class="{ active: index == currentId }"
        @click="handleSelect(index)"
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
      <swiper class="ad-swiper" v-if="isSwiper && adList.length" style="height: 220rpx" :interval="5000" :duration="500" :circular="true">
        <swiper-item @tap="handlerSwiper(item)" class="swiper-item" v-for="(item, key0) in adList" :key="key0">
          <image class="home_fd3_0_c2" mode="aspectFill" :src="item.thumb"></image>
        </swiper-item>
      </swiper>
      <block v-if="!isThreeLevel">
        <view class="cate-box-wrap" v-for="(item, index) in lists" :key="index">
          <view class="flex align-center justify-between text-333">
            <text class="cate-box-wrap-title text-bold text-df">{{ item.name }}</text>
          </view>
          <view class="cate-box">
            <view class="cate-box-item" v-for="(ele, j) in item.children" :key="j" @tap.stop="handlerClassify(ele)">
              <image :style="{ 'border-radius': classifyRadius + 'rpx' }" class="classify-image" :src="ele.thumb" mode="aspectFill" />
              <text class="text-333 text-sm goods_title">{{ ele.name }}</text>
            </view>
          </view>
        </view>
      </block>
      <block v-else>
        <view class="cate-box-wrap" v-for="(item, index) in lists" :key="index">
          <view v-for="(ele, key) in item.children" :key="key">
            <view class="flex align-center justify-between text-333">
              <text class="cate-box-wrap-title text-bold text-df">{{ ele.name }}</text>
            </view>
            <view class="cate-box">
              <view class="cate-box-item" v-for="(e, j) in ele.children" :key="j" @tap.stop="handlerClassify(ele)">
                <image :style="{ 'border-radius': classifyRadius + 'rpx' }" class="classify-image" :src="e.thumb" mode="aspectFill" />
                <text class="text-333 text-sm goods_title">{{ e.name }}</text>
              </view>
            </view>
          </view>
        </view>
      </block>
    </scroll-view>
    <!-- 右边列表结束 -->
  </view>
</template>
<script>
export default {
  name: 'benben-goods-classify',
  props: {
    // 分类列表
    lists: {
      type: Array,
      default: () => [],
    },
    adList: {
      type: Array,
      default: () => [],
    },
    top: {
      type: [Number, String],
      default: 88,
    },
    isThreeLevel: {
      type: Boolean,
      default: false,
    },
    classifyRadius: {
      type: [Number, String],
      default: 16,
    },
    handleId: {
      type: [Number, String],
      default: '',
    },
    swiperId: {
      type: [Number, String],
      default: '',
    },
    isSwiper: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      refresherTriggered: false,
      heightArr: [],
      flag: false,
      setTimeoutFn: null,
      setTimeoutLists: null,
      scrollTop: '',
      currentId: 0, //选中id
      setTimeoutHandle: null,
    }
  },
  watch: {
    lists: {
      handler() {
        this.setTimeoutLists && clearTimeout(this.setTimeoutLists)
        this.setTimeoutLists = setTimeout(this.getHeight, 300)
      },
      deep: true,
      immediate: true,
    },
  },
  components: {},
  computed: {
    toLeftId() {
      return `l_id${this.index >= 3 ? this.index - 3 : 0}`
    },
  },
  onLoad() {},
  mounted() {},
  methods: {
    handlerSwiper(item) {
      this.$emit('update:swiper-id', item.aid)
      this.$emit('handle-swiper', item)
    },
    refresherrefresh() {
      this.refresherTriggered = true
      setTimeout(() => {
        this.refresherTriggered = false
        this.$emit('refresh')
      }, 500)
    },
    scroll(e) {
      if (this.flag) return
      let height = e.target.scrollTop
      let index = this.heightArr.findIndex((item) => height >= item.minHeight && height < item.maxHeight)
      if (index == -1 || this.currentId == index) return true
      this.currentId = index
    },
    handleSelect(index) {
      this.scrollTop = this.heightArr[index].minHeight + 4
      this.flag = true
      this.setTimeoutFn && clearTimeout(this.setTimeoutFn)
      this.setTimeoutFn = setTimeout(() => {
        this.flag = false
        this.scrollTop = this.heightArr[index].minHeight + 5
      }, 500)
      this.currentId = index
    },
    handlerClassify(item) {
      this.$emit('update:handle-id', item.aid)
      this.$emit('handle-item', item)
    },
    // 获取元素
    uGetRect(selector, all) {
      return new Promise((resolve) => {
        // #ifdef H5
        let dom = document[all ? 'querySelectorAll' : 'querySelector'](selector)
        let rect = all ? [] : {}
        if (all) {
          for (let index = 0; index < dom.length; index++) {
            rect.push(dom[index].getBoundingClientRect())
          }
        } else {
          rect = dom.getBoundingClientRect()
        }
        if (all && Array.isArray(rect) && rect.length) {
          resolve(rect)
        }
        if (!all && rect) {
          resolve(rect)
        }
        // #endif
        // #ifndef H5
        uni
          .createSelectorQuery()
          .in(this)
          [all ? 'selectAll' : 'select'](selector)
          .boundingClientRect((rect) => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect)
            }
            if (!all && rect) {
              resolve(rect)
            }
          })
          .exec()
        // #endif
      })
    },
    async getHeight() {
      let swiperHeight = 0
      if (this.isSwiper && this.adList.length) {
        let { height } = await this.uGetRect('.ad-swiper')
        swiperHeight = height
      }
      let res = await this.uGetRect('.cate-box-wrap', true)
      let heightArr = []
      let height = 0
      res.map((item) => {
        let obj = { minHeight: height > 0 ? height : height }
        if (!height && swiperHeight) {
          height += Math.floor(swiperHeight)
        }
        height += Math.floor(item.height)
        obj.maxHeight = height
        heightArr.push(obj)
      })
      this.heightArr = heightArr
    },
  },
}
</script>

<style lang="scss" scoped>
.swiper-item {
  display: flex;
  align-items: center;
  justify-content: center;
}
.home_fd3_0_c2 {
  width: 530rpx;
  height: 180rpx;
  border-radius: 16rpx;
}
.classify-image {
  width: 146rpx;
  height: 146rpx;
}
.title {
  background-color: #fff;
  text-align: center;
  font-size: 36rpx;
  color: #333;
  font-weight: 500;
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
    width: 570rpx;
    height: 100%;
    background-color: #fff;
  }
}
.cate-box-wrap {
  .cate-box-wrap-title {
    line-height: 80rpx;
    padding: 0 32rpx;
  }
  &:last-child {
    // min-height: calc(100vh - var(--window-bottom) - var(--window-top));
    min-height: 100%;
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
}
</style>
