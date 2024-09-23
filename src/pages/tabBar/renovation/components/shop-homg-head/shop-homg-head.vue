<template>
  <view>
    <view class="shop-homg-head-height" :style="{ paddingTop: (config.isStatusBar ? StatusBarRpx : 0) + 'rpx' }"></view>
    <view :style="headStyle" class="shop-homg-head">
      <view class="shop-homg-status">
        <text>{{ config.title }}</text>
        <image
          class="sign-icon"
          @click.stop="handleJumpDiy"
          data-url="/pages/wd/signinPage/signinPage"
          v-if="config.signIcon"
          :src="config.signIcon"
          mode="widthFix"
        />
        <view class="message-icon" @click.stop="handleJumpDiy" data-url="/pages/wd/myNews/myNews" v-if="config.messageIcon">
          <benben-message-num
            class="benben-message-num"
            :message-num="messageNum"
            size="24"
            color="#fff"
            background-color="red"
            v-if="isLogin === true"
          ></benben-message-num>
          <image :src="config.messageIcon" mode="widthFix" />
        </view>
      </view>
      <view :style="{ backgroundColor: config.seachBackgroundColor }" class="seach-input">
        <text class="fu-iconfont2 seach-icon">&#xe741;</text>
        <swiper style="height: 100%" autoplay circular vertical>
          <swiper-item @click.stop="handleJumpDiy" :data-url="`/pages/sy/search/search?keyword=${item.name}`" v-for="(item, i) in seachList" :key="i">
            <view class="text-cut">{{ item.name }}</view>
          </swiper-item>
        </swiper>
      </view>
      <benben-flex-tabs
        v-if="tabs.length"
        class-name="benbenTabsfd0_0"
        v-model="tabsType"
        ref="benben_tabsfd0_0"
        select-mark="benben_tabsfd0_0"
        key="benben_tabsfd0_0"
        :open-title-type="false"
        :open-sticky="false"
        :top="0"
        :is-show-content="false"
        :scrollspy="false"
        @change="getGrid"
        :tabs-info.sync="tabsInfofd0_0"
      >
        <scroll-view
          @scroll="tabsInfofd0_0.scrollX = $event.detail.scrollLeft"
          id="benben_tabsfd0_0"
          class="benben-tabs"
          :scroll-x="true"
          :scroll-left.sync="tabsInfofd0_0.moveX"
          scroll-with-animation="all .3s ease"
        >
          <view class="benben-tabs-content" id="benben_tabsfd0_0-content">
            <view id="benben_tabsfd0_0-title" class="benben-tabs-title flex align-center flex">
              <view
                v-for="(item, key0) in tabs"
                :key="key0"
                :class="{ checkTitlefd0_0: tabsType == item.aid, 'tabs-item': true }"
                @tap="tabsType = item.aid"
                :id="`benben_tabsfd0_0-title-item-${item.aid}`"
              >
                {{ item.name }}
              </view>
            </view>
            <image
              :style="{ left: tabsInfofd0_0.lineleft }"
              id="benben_tabsfd0_0-line"
              class="benben-tabs-line"
              src="https://ttk-saas.oss-cn-beijing.aliyuncs.com/m1899/e6e65da63bef0b24bb5cbe1e82f0a7dd.png"
              mode="widthFix"
            />
          </view>
        </scroll-view>
        <!-- <view class="rightfd0_0_c0"> 更多 </view> -->
      </benben-flex-tabs>
    </view>
    <view
      :style="{
        marginLeft: config.backgroundMargin + 'rpx',
        marginRight: config.backgroundMargin + 'rpx',
        backgroundColor: config.backgroundColor,
        marginBottom: config.pageMargin + 'rpx',
      }"
      :class="{ 'shop-radius': config.isRadius }"
    >
      <view class="shop-grid" v-if="gridList.length == 1">
        <view
          @click.stop="handleJumpDiy"
          :data-url="`/pages/fl/commodityList/commodityList?cid=${item.aid}`"
          v-for="(item, j) in gridList[0]"
          :key="j"
          class="grid_item"
          :style="gridStyle"
        >
          <image :class="{ 'icon-radius': config.iconRadius }" style="width: 80rpx; height: 80rpx" :src="item.thumb" mode="scaleToFill" />
          <text class="text-cut">{{ item.name }}</text>
        </view>
      </view>
      <template v-if="gridList.length > 1">
        <swiper @change="swiperChange" style="width: 100%" :style="{ height: config.rowNum * 150 + 'rpx' }" :indicator-dots="false" circular>
          <swiper-item class="shop-grid" v-for="(swiperItem, index) in gridList" :key="index">
            <view
              @click.stop="handleJumpDiy"
              :data-url="`/pages/fl/commodityList/commodityList?cid=${item.aid}`"
              v-for="(item, j) in swiperItem"
              :key="j"
              class="grid_item"
              :style="gridStyle"
            >
              <image :class="{ 'icon-radius': config.iconRadius }" style="width: 80rpx; height: 80rpx" :src="item.thumb" mode="scaleToFill" />
              <text class="text-cut">{{ item.name }}</text>
            </view>
          </swiper-item>
        </swiper>
        <div :class="'indicator_box ' + config.indicatorType">
          <div
            v-for="(item, i) in gridList"
            :style="{ 'background-color': index == i ? config.indicatorActiveColor : config.indicatorColor }"
            class="indicator_item"
          ></div>
        </div>
      </template>
    </view>
  </view>
</template>
<script>
import { API_VERSION } from '@/config'
export default {
  name: 'shop-homg-head',
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {},
  data() {
    return {
      tabsInfofd0_0: {
        lineleft: '',
        lineWidth: '',
        moveX: 0,
        scrollX: 0,
        PageScrollX: 0,
      },
      tabs: [],
      tabsType: '0',
      api: `/${API_VERSION}/641591a873763`,
      tabsApi: `/${API_VERSION}/641590baa0d47`,
      seachApi: `/${API_VERSION}/641af9cb8b32f`,
      messageApi: `/${API_VERSION}/64241ca6cf066`, //获取消息数量
      gridList: [],
      seachList: [],
      index: 0,
      messageNum: 0,
    }
  },
  created() {
    this.showCallback()
  },
  computed: {
    headStyle() {
      return `marginBottom: ${this.config.pageMargin}rpx;  backgroundColor: ${this.config.backgroundColor}; backgroundImage:${
        this.config.backgroundImage
      }; paddingTop:${this.config.isStatusBar ? this.StatusBarRpx : 0}rpx;color:${this.config.color}; --seach-color:${this.config.seachColor}`
    },
    gridStyle() {
      return `width:calc(100% / ${this.config.colNum})`
    },
    isLogin() {
      return this.$store.state.token == '' ? false : true
    },
  },
  watch: {},
  mounted() {},
  methods: {
    swiperChange(e) {
      this.index = e.detail.current
    },
    handleGrid(item) {
      this.dynamicJump(item.href)
    },
    refresh() {
      this.showCallback()
    },
    showCallback() {
      this.getTabs()
      this.getSeach()
      this.getmessageNum()
    },
    pullUp() {},
    async getmessageNum() {
      if (!this.isLogin) return (this.messageNum = 0)
      try {
        let {
          data: { data, code, msg },
        } = await this.$api.get(this.messageApi)
        if (code != 1) return (this.messageNum = 0)
        this.messageNum = data.all
      } catch (error) {
        console.log(error)
      }
    },
    //商品管理-获取一级商品分类
    async getTabs() {
      //请求方法
      //数据验证
      let {
        data: { data, code, msg },
      } = await this.$api.get(this.tabsApi)
      if (code != 1) return (this.tabs = [])
      if (data.length) {
        this.tabs = data
        this.tabsType = data[0].aid
        this.index = 0
        this.getGrid()
      }
    },
    async getSeach() {
      let {
        data: { data, code, msg },
      } = await this.$api.get(this.seachApi)
      if (code != 1) return
      this.seachList = data
    },
    async getGrid() {
      try {
        let {
          data: {
            data: { category_list: data },
            code,
            msg,
          },
        } = await this.$api.get(this.api, { pid: this.tabsType })
        if (code != 1) return (this.adList = [])
        function splitArray(array, chunkSize) {
          const chunks = []
          for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize))
          }
          return chunks
        }
        this.gridList = splitArray(data, this.config.rowNum * this.config.colNum)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped lang="scss">
.shop-homg-head-height {
  height: 250rpx;
  box-sizing: content-box;
}
.shop-homg-head {
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100vw;
  box-sizing: content-box;
  background-size: 100% auto;
  background-repeat: no-repeat;
  .shop-homg-status {
    padding: 0 32rpx;
    height: 88rpx;
    display: flex;
    align-items: center;
    font-size: 32rpx;
    font-weight: 600;
    text {
      margin-right: auto;
    }
    .sign-icon {
      margin-left: 24rpx;
      width: 40rpx;
    }

    .message-icon {
      position: relative;
      margin-left: 24rpx;
      width: 40rpx;
      image {
        width: 100%;
      }
      .benben-message-num {
        position: absolute;
        top: -15rpx;
        right: -15rpx;
        z-index: 10;
      }
    }
  }
  .seach-input {
    width: 686rpx;
    margin: 0 auto;
    padding: 0 24rpx;
    height: 60rpx;
    line-height: 60rpx;
    border-radius: 30rpx;
    font-size: 24rpx;
    display: flex;
    align-items: center;
    color: var(--seach-color);
    .seach-icon {
      font-size: 24rpx;
      margin-right: 12rpx;
    }
    swiper {
      flex: 1;
    }
  }
}
.benben-tabs {
  width: 750rpx;
  .benben-tabs-content {
    position: relative;
    display: inline-block;
    height: 80rpx;
    .benben-tabs-title {
      height: 100%;
      .tabs-item {
        padding: 0 32rpx;
        flex-shrink: 0;
      }
      .checkTitlefd0_0 {
        font-weight: 700;
        font-size: 28rpx;
      }
    }
    .benben-tabs-line {
      position: absolute;
      bottom: 10rpx;
      transform: translateX(-50%);
      transition: all 0.4s ease;
      width: 40rpx;
    }
  }
}
.rightfd0_0_c0 {
  width: 120rpx;
  line-height: 80rpx;
}

::v-deep .benbenTabsfd0_0 {
  width: 750rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  white-space: nowrap;
  text-align: center;
}

.shop-grid {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  .grid_item {
    .icon-radius {
      border-radius: 50%;
    }
    padding: 12rpx 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text {
      font-size: 28rpx;
      width: 80%;
      padding-top: 10rpx;
      display: block;
      margin: auto;
      text-align: center;
    }
  }
}
.indicator_box {
  width: 100%;
  // position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30rpx;
  .indicator_item {
    margin: 0 5rpx;
  }

  &.round {
    .indicator_item {
      width: 10rpx;
      height: 10rpx;
      border-radius: 50%;
    }
  }
  &.square {
    .indicator_item {
      width: 20rpx;
      height: 5rpx;
    }
  }
}
</style>
