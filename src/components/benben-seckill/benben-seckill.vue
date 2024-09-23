<template>
  <view class="benben-seckill-box">
    <view class="titles">
      <count-down ref="count" @refresh="init"></count-down>
      <view @tap="handleList" class="view-more-box">
        <text class="text-sm view-more">{{ $t('查看更多') }}</text>
        <text class="fu-iconfont2 view-more-icon">&#xe7f2;</text>
      </view>
    </view>
    <view class="top-tab">
      <block v-for="(item, index) in nowTabs" :key="index">
        <view class="tab-item" :class="[index == curIndex ? 'current' : '']" @click="tabSelect(index)">
          <text class="number">{{ item.model }}</text>
          <text class="text">{{ index == 0 ? $t('抢购中') : $t('即将开始') }}</text>
        </view>
      </block>
    </view>
    <view>
      <view v-if="lists && lists.length > 0">
        <block v-for="(item, index) in lists" :key="index" v-if="index < 2">
          <view class="list-item padding-tb-sm flex" @click="navToDetail(item)">
            <view class="block-246 margin-right-sm">
              <image class="radius-16" :src="item.thumb" mode="aspectFill" lazy-load></image>
              <view class="tag"></view>
            </view>
            <view class="flex-sub flex flex-direction justify-between overHidden">
              <view class="text-df text-333 text-cut-2 text-bold">
                {{ item.name }}
              </view>
              <view class="flex align-center" v-if="tabIndex == curHour">
                <view class="cu-progress round xs" style="width: 65%">
                  <view class="bg-main" :style="{ width: item.rate + '%' }"></view>
                </view>
                <text class="text-999 text-xs margin-left-sm">{{ item.rate + '%' }}</text>
              </view>
              <view class="text-xs text-999 text-cut" v-if="tabIndex == curHour">
                <text>{{ item.sales_sum }}{{ $t('人成功秒杀') }}</text>
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
                      <view class="price-through text-sm text-999">
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
                    <text class="title">{{ $t('马上抢') }}</text>
                  </view>
                  <view class="right" v-else @tap.stop="">
                    <text class="title">{{ $t('抢光了') }}</text>
                  </view>
                </view>
                <view v-else>
                  <view class="jq-btn">
                    <text class="title" v-if="!item.is_remind" @click.stop="handleRemind(item)">
                      {{ $t('提醒我') }}
                    </text>
                    <text class="title disable" v-else @click.stop="handleUnRemind(item)">
                      {{ $t('取消提醒') }}
                    </text>
                    <!-- <text class="title" @click.stop="">{{ $t('敬请期待') }}</text> -->
                  </view>
                </view>
              </view>
            </view>
          </view>
        </block>
      </view>
      <view v-else class="empty-box">{{ $t('亲，这个时间段没有要秒杀的商品噢~') }}</view>
    </view>
  </view>
</template>
<script>
import countDown from './count-down/count-down.vue'
const tabs = [
  {
    model: '00:00',
    text: global.i18n.t('即将开始'),
    start: 0,
  },
  {
    model: '02:00',
    text: global.i18n.t('即将开始'),
    start: 2,
  },
  {
    model: '04:00',
    text: global.i18n.t('即将开始'),
    start: 4,
  },
  {
    model: '06:00',
    text: global.i18n.t('即将开始'),
    start: 6,
  },
  {
    model: '08:00',
    text: global.i18n.t('即将开始'),
    start: 8,
  },
  {
    model: '10:00',
    text: global.i18n.t('即将开始'),
    start: 10,
  },
  {
    model: '12:00',
    text: global.i18n.t('即将开始'),
    start: 12,
  },
  {
    model: '14:00',
    text: global.i18n.t('即将开始'),
    start: 14,
  },
  {
    model: '16:00',
    text: global.i18n.t('即将开始'),
    start: 16,
  },
  {
    model: '18:00',
    text: global.i18n.t('即将开始'),
    start: 18,
  },
  {
    model: '20:00',
    text: global.i18n.t('即将开始'),
    start: 20,
  },
  {
    model: '22:00',
    text: global.i18n.t('即将开始'),
    start: 22,
  },
]
export default {
  name: 'benben-seckill',
  props: {
    tmplId: {
      type: String,
      default: 'x3ljpUAnxYgi-u6iQcaRuP-Z3fVoJ5o22KTDqiNhPMk',
    },
    detailUrl: {
      type: String,
      default: '/pages/activity/seckill/seckill-detail',
    },
    goodsId: {
      type: [String, Number],
      default: '',
    },
    skuId: {
      type: [String, Number],
      default: '',
    },
    activityId: {
      type: [String, Number],
      default: '',
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
      tabIndex: 0, //选中项下标
      scrollLeft: 0, //滚动位置
      curHour: 0,
    }
  },
  computed: {},
  methods: {
    handleList() {
      this.$emit('toListPage')
    },
    handleRemind(item) {
      const { goods_id, activity_id, activity_type, sku_id } = item
      this.$util.actionAuth(() => {
        let postData = {
          activity_id: activity_id,
          sku_id: sku_id,
          goods_id: goods_id,
          pageUrl: this.detailUrl,
          time: this.start,
        }
        // #ifdef MP-WEIXIN
        postData.type = 1
        uni.requestSubscribeMessage({
          tmplIds: [this.tmplId],
          complete: () => {
            this.postRemind(postData)
          },
        })
        // #endif
        // #ifdef APP-PLUS
        postData.type = 2
        this.postRemind(postData)
        // #endif
        // #ifdef H5
        this.$message.info(this.$t('H5不支持推送功能'))
        // #endif
      })
    },
    async postRemind(postData) {
      try {
        let {
          data: { code, data, msg },
        } = await this.$api.post(global.apiUrls.post64a4000266253, postData)
        if (code != 1) {
          this.$message.info(msg)
          return
        }
        this.$message.info(global.i18n.t('设置成功,将在开抢前三分钟收到提醒'))
        this.getSeckill()
      } catch (error) {
        this.$message.info(global.i18n.t('该功能暂未开发'))
      }
    },
    // 取消通知
    handleUnRemind(item) {
      const { goods_id, activity_id, activity_type, sku_id, start } = item
      this.$util.actionAuth(() => {
        let postData = {
          activity_id: activity_id,
          sku_id: sku_id,
          goods_id: goods_id,
          time: this.start,
        }
        this.$api
          .post(global.apiUrls.post64a3ff1656173, {
            ...postData,
            // #ifdef MP-WEIXIN
            type: 1,
            // #endif
            // #ifdef APP-PLUS
            type: 2,
            // #endif
          })
          .then((res) => {
            console.log('取消通知', res)
            res = res.data
            if (res.code == 1) {
              this.$message.info(global.i18n.t('秒杀提醒已取消,您可能会抢不到哟~'))
              this.getSeckill()
            } else {
              this.$message.info(res.msg)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      })
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
    getSeckill() {
      let data = {
        start_time: this.start,
        end_time: this.start + 2,
        page: 1,
        list_rows: 5,
      }
      this.$api.post(global.apiUrls.post641aecd93aa49, data).then((res) => {
        if (res.data.code == 1) {
          this.lists = res.data.data.data
        } else if (res.code == 0) {
          this.lists = []
        }
      })
    },
    // 去详情
    navToDetail(item) {
      if (this.tabIndex != this.curHour) return
      this.$emit('update:goods-id', item.goods_id)
      this.$emit('update:activity-id', item.activity_id || 0)
      this.$emit('update:sku-id', item.sku_id || 0)
      this.$emit('toDetails', {
        goods_id: item.goods_id,
        activity_id: item.activity_id || 0,
        sku_id: item.sku_id || 0,
      })
    },
    tabSelect(index, start) {
      this.curIndex = index
      this.start = this.nowTabs[index].start
      this.getSeckill()
    },
    refresh() {
      this.init()
      this.$refs.count.refresh()
    },
  },
  filters: {
    filterPrice(price) {
      return parseFloat(price)
    },
  },
  destroyed() {
    // 移除页面更新监听
    uni.$off('onPageSeckillUpdata', this.getSeckill)
  },
  created() {
    this.init()
    // 监听页面更新
    uni.$on('onPageSeckillUpdata', this.getSeckill)
  },
}
</script>

<style lang="scss" scoped>
.price-through {
  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 2rpx;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #999;
  }
}
.bg-main {
  background-color: #fd513d;
}
.benben-seckill-box {
  .titles {
    height: 100rpx;
    padding-top: 10rpx;
    display: flex;
    justify-content: center;
    position: relative;
    align-items: center;
    .view-more-box {
      position: absolute;
      right: 0;
    }
    .view-more,
    .view-more-icon {
      color: var(--benben-seckill-view-more-color, '#fff');
      line-height: 32rpx;
      font-size: 24rpx;
    }
  }
  .top-tab {
    display: flex;
    align-items: center;
    margin-top: 20rpx;
    .tab-item {
      flex: 1;
      display: flex;
      flex-direction: column;

      /* align-items: center; */
      /* justify-content: center; */
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
        // padding: 10rpx 10rpx 5rpx;
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
      background-image: url(resolution-image-path('active_bg.png'));
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
