<template>
  <view
    :style="{
      marginBottom: config.pageMargin + 'rpx',
      backgroundImage: config.backgroundImage,
      width: config.shopWidth + 'rpx',
    }"
    :class="{
      'shop-radius': config.isRadius,
    }"
    class="shop-killing-box"
  >
    <view class="titles">
      <view class="title_text" :style="{ color: config.titleColor }">
        <image :src="config.titleImage" mode="scaleToFill" />
        限时秒杀
      </view>
      <view class="flex align-center">
        <count-down ref="count" class="margin-left-sm" @refresh="init"></count-down>
      </view>
      <view @tap="handleList" class="flex align-center">
        <text
          @tap.stop="handleJumpDiy"
          data-type="navigateTo"
          :data-url="`/pages/sy/seckillList/seckillList`"
          class="text-sm"
          :style="{ color: config.moreColor }"
        >
          查看更多
        </text>
        <text class="cuIcon-right margin-left-xs" style="font-size: 24rpx; color: #ffffff; margin-top: 4rpx"></text>
      </view>
    </view>
    <view class="top-tab">
      <block v-for="(item, index) in nowTabs" :key="index">
        <view class="tab-item" :class="[index == curIndex ? 'current' : '']" @click="tabSelect(index)">
          <text class="number">{{ item.model }}</text>
          <text class="text">{{ index == 0 ? '抢购中' : '即将开始' }}</text>
        </view>
      </block>
    </view>
    <view class="shop-list" :style="{ padding: '0 32rpx', backgroundColor: config.backgroundColor }">
      <template v-if="lists && lists.length > 0">
        <view v-for="(item, index) in lists" :key="index" class="list-item padding-tb-sm flex" @click="navToDetail(item)">
          <image class="radius-16 block-246 margin-right-sm" :src="item.thumb" mode="aspectFill" lazy-load></image>
          <view class="flex-sub flex flex-direction justify-between overHidden">
            <view class="text-df text-333 text-cut-2 text-bold">
              {{ item.name }}
            </view>
            <view class="flex align-center" v-if="curIndex == curHour">
              <view class="cu-progress round xs" style="width: 65%">
                <view class="bg-main" :style="{ width: item.rate + '%' }"></view>
              </view>
              <text class="text-999 text-xs margin-left-sm">{{ item.rate + '%' }}</text>
            </view>
            <view class="text-xs text-999 text-cut" v-if="curIndex == curHour">
              <text>{{ item.sales_sum }}人成功秒杀</text>
            </view>

            <view class="flex align-center justify-between">
              <view class="flex flex-direction overHidden">
                <view class="text-cut flex flex-direction">
                  <view>
                    <text class="text-price text-sm color1"></text>
                    <text class="text-xl color1 text-bold text-cut" style="font-size: 48rpx">{{ item.activity_price | frontPrice }}</text>
                    <text class="text-xl color1 text-bold text-cut" style="font-size: 20rpx">{{ item.activity_price | laterPrice }}</text>
                  </view>
                  <view class="flex align-center justify-between margin-bottom-sm">
                    <view class="text-through text-sm text-999">
                      <text class="">
                        <text class="text-price"></text>
                        <text>{{ item.shop_price | frontPrice }}</text>
                        <text>{{ item.shop_price | laterPrice }}</text>
                      </text>
                    </view>
                  </view>
                </view>
              </view>
              <view class="action" v-if="curIndex == 0">
                <view class="right" v-if="item.rate !== 100">
                  <text class="title">马上抢</text>
                </view>
                <view class="right" v-else>
                  <text class="title">抢光了</text>
                </view>
              </view>
              <view v-else>
                <view class="jq-btn">
                  <text class="title" @click.stop="">敬请期待</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </template>
      <view v-else class="empty-box">亲，这个时间段没有要秒杀的商品噢~</view>
    </view>
  </view>
</template>

<script>
const tabs = [
  {
    model: '00:00',
    text: '即将开始',
    start: 0,
  },
  {
    model: '02:00',
    text: '即将开始',
    start: 2,
  },
  {
    model: '04:00',
    text: '即将开始',
    start: 4,
  },
  {
    model: '06:00',
    text: '即将开始',
    start: 6,
  },
  {
    model: '08:00',
    text: '即将开始',
    start: 8,
  },
  {
    model: '10:00',
    text: '即将开始',
    start: 10,
  },
  {
    model: '12:00',
    text: '即将开始',
    start: 12,
  },
  {
    model: '14:00',
    text: '即将开始',
    start: 14,
  },
  {
    model: '16:00',
    text: '即将开始',
    start: 16,
  },
  {
    model: '18:00',
    text: '即将开始',
    start: 18,
  },
  {
    model: '20:00',
    text: '即将开始',
    start: 20,
  },
  {
    model: '22:00',
    text: '即将开始',
    start: 22,
  },
]
import countDown from './count-down/count-down.vue'
import { API_VERSION } from '@/config'
export default {
  name: 'shop-killing',
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    countDown,
  },
  data() {
    return {
      lists: [],
      nowTabs: [],
      curIndex: 0,
      start: null,
      curIndex: 0, //选中项下标
      scrollLeft: 0, //滚动位置
      curHour: 0,
      api: `/${API_VERSION}/641aecd93aa49`,
    }
  },
  computed: {},
  methods: {
    handleList() {
      this.$emit('toListPage')
    },
    init() {
      let nowDate = new Date()
      let _hour = nowDate.getHours()
      let _count
      if (_hour % 2 === 0) {
        _count = _hour
      } else {
        _count = _hour - 1
      }
      let _startIndex = _count / 2
      const _tabs = tabs.filter((item, index) => {
        return index >= _startIndex && index <= _startIndex + 4
      })
      if (_tabs.length < 5) {
        let _len = 5 - _tabs.length
        for (let i = 0; i < _len; i++) {
          _tabs.push(tabs[i])
        }
      }
      if (this.nowTabs.length == 0 || _tabs[0].start !== this.nowTabs[0].start) {
        this.nowTabs = _tabs
        this.curIndex = 0
        this.start = this.nowTabs[this.curIndex].start
      }
      this.getSeckill()
    },
    // 获取秒杀活动
    async getSeckill() {
      let {
        data: { data, code, msg },
      } = await this.$api.post(this.api, {
        start_time: this.start,
        end_time: this.start + 2,
        page: 1,
        list_rows: 2,
      })
      if (code == 0) {
        this.lists = []
        return
      }
      this.lists = data.data
    },
    // 去详情
    navToDetail(item) {
      if (this.curIndex != this.curHour) return
      this.$urouter.navigateTo(
        `/pages/sy/killMerchandiseDetails/killMerchandiseDetails?goods_id=${item.goods_id}&activity_id=${item.activity_id || 0}&sku_id=${
          item.sku_id || 0
        }`
      )
    },
    tabSelect(index, start) {
      this.curIndex = index
      this.start = this.nowTabs[index].start
      this.getSeckill()
    },
    refresh() {
      this.init()
    },
    pullUp() {},
  },
  filters: {
    filterPrice(price) {
      return parseFloat(price)
    },
  },
  destroyed() {},
  created() {
    this.init()
  },
}
</script>

<style lang="scss" scoped>
.bg-main {
  background-color: #fd513d;
}

.shop-list {
  border-radius: 16rpx 16rpx 0 0;
}
.shop-killing-box {
  margin: 0 auto;
  background-size: 100% auto;
  background-repeat: no-repeat;
  overflow: hidden;
  .titles {
    height: 100rpx;
    padding: 10rpx 32rpx 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title_text {
      display: flex;
      align-items: center;
      color: #fff;
      font-size: 32rpx;
      font-weight: 700;
      image {
        height: 40rpx;
        width: 40rpx;
        margin-right: 10rpx;
      }
    }
  }
  .top-tab {
    display: flex;
    align-items: center;
    margin-top: 20rpx;
    padding: 0 32rpx;
    .tab-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      .number {
        font-size: 30rpx;
        font-weight: bold;
        color: #ffffff;
        text-align: center;
      }

      .text {
        text-align: center;
        display: inline-block;
        font-size: 20rpx;
        color: #ffffff;
        border-radius: 20rpx;
        margin-top: 10rpx;
      }
    }

    .tab-item.current {
      width: 162rpx;
      height: 114rpx;
      min-width: 162rpx;
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: url(https://zhongben-crm.oss-cn-zhangjiakou.aliyuncs.com/uploads/images/20230323/5a5c3d013b3a5a89c26fbc74ecf2bc81.png);
      background-size: 162rpx 114rpx;
      background-repeat: no-repeat;
      .number {
        color: #fd513d;
        font-size: 40rpx;
      }
      .text {
        color: #ffffff;
        width: 120rpx;
        height: 32rpx;
        line-height: 32rpx;
        background: #fd513d;
        margin-top: 6rpx;
      }
    }
  }

  .list-item {
    overflow: hidden;
    .action {
      width: 119rpx;
      height: 64rpx;
      line-height: 64rpx;

      background: #fd513d;
      border-radius: 8rpx;
      object-fit: fill;
      text-align: center;
      color: #fff;
      display: flex;

      .right {
        text-align: center;
        width: 100%;
      }
    }
  }
  .empty-box {
    width: 100%;
    height: 150rpx;
    line-height: 150rpx;
    font-size: 24rpx;
    color: #999999;
    text-align: center;
    font-weight: bold;
    color: rgba(191, 191, 191, 1);
  }
}

.block-246 {
  width: 234rpx;
  height: 234rpx;
  min-width: 234rpx;
  min-height: 234rpx;
  background-color: #f8f8f8;
  position: relative;

  image {
    width: 100%;
    height: 100%;
  }

  .tag {
    position: absolute;
    top: 0;
    left: 0;
  }
}
@keyframes heart {
  0% {
    font-size: 20rpx;
  }

  50% {
    font-size: 26rpx;
  }

  100% {
    font-size: 20rpx;
  }
}
.radius-16 {
  border-radius: 16rpx;
}
.jq-btn {
  width: 156rpx;
  height: 56rpx;
  background: linear-gradient(132deg, #22e177 0%, #05c47a 100%);
  opacity: 1;
  border-radius: 44rpx;
  text-align: center;
  line-height: 56rpx;
  color: #ffffff;
}
</style>
