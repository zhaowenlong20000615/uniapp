<template>
  <view class="content">
    <view class="top-tab">
      <view v-for="(item, index) in nowTabs" :key="index" class="tab-item" :class="[index == curIndex ? 'current' : '']" @click="tabSelect(index)">
        <text class="number">{{ item.model }}</text>
        <text class="text">{{ index == 0 ? $t('抢购中') : $t('即将开始') }}</text>
      </view>
    </view>
    <view v-show="curIndex == 0" class="titles mt-32 mb-40">
      <view class="flex align-center justify-center benben_countdown_row">
        {{ $t('距离本场结束还剩') }}
        <benben-countdown @time-end="refresh" class="benben_countdown" :count-time="countTime">
          <template #default="{ d, h, i, s }">
            <text class="time_box">{{ h }}</text>
            <text style="margin-left: 10rpx">:</text>
            <text class="time_box">{{ i }}</text>
            <text style="margin-left: 10rpx">:</text>
            <text class="time_box">{{ s }}</text>
          </template>
        </benben-countdown>
      </view>
    </view>
    <view class="kill_list">
      <view v-for="(item, index) in listData" :key="index" class="list-item flex align-stretch" @click="navToDetail(item)">
        <image class="thumb" :src="item.thumb" mode="aspectFill" lazy-load></image>
        <view class="flex-sub flex flex-direction justify-between">
          <view class="goods_title">
            {{ item.name }}
          </view>
          <view class="flex align-center" v-if="curIndex == curHour">
            <view class="cu-progress round xs" style="width: 65%">
              <view :style="{ width: item.rate + '%' }" style="background: #ffeb00"></view>
            </view>
            <text class="c-f text-xs margin-left-sm">{{ item.rate + '%' }}</text>
          </view>
          <view class="text-xs c-f text-hidden" v-if="curIndex == curHour">
            <text>{{ $t('kill-tips', { num: item.sales_sum, price: item.economize_price }) }}</text>
          </view>
          <view class="flex align-center justify-between">
            <view class="text-cut flex flex-direction">
              <view class="color1">
                <text class="pr-10 f20">{{ $t('秒杀价') }}</text>
                <text class="text-price text-sm"></text>
                <text class="text-xl text-bold text-cut">{{ item.activity_price }}</text>
              </view>
              <view class="flex align-center justify-between mt-6">
                <view class="text-through text-sm" style="color: rgba(255, 255, 255, 0.6)">
                  <text class="">¥{{ item.shop_price }}</text>
                </view>
              </view>
            </view>
            <view class="action" v-if="curIndex == 0">
              <view class="right" v-if="item.rate !== 100">{{ $t('马上抢') }}</view>
              <view class="right disable" v-else @tap.stop="">{{ $t('抢光了') }}</view>
            </view>
            <view v-else class="action call">
              <view class="right" v-if="!item.is_remind" @click.stop="handleRemind(item)">
                {{ $t('提醒我') }}
              </view>
              <view class="right disable" v-else @click.stop="handleUnRemind(item)">
                {{ $t('取消提醒') }}
              </view>
            </view>
          </view>
        </view>
      </view>
      <fu-empty
        :pagingListLoadedAll="pagingListLoadedAll"
        :pagingListNoListData="pagingListNoListData"
        :listDataLength="listDataLength"
        :isLoadInit="isLoadInit"
      >
        <view class="empty-box">{{ $t('亲，这个时间段没有要秒杀的商品噢~') }}</view>
      </fu-empty>
    </view>
  </view>
</template>
<script>
import Dayjs from '@/libs/day.js'
import pagingList from '@/common/mixin/paging_list.js'
const _tabs = [
  {
    model: '00:00',
    start: 0,
  },
  {
    model: '02:00',
    start: 2,
  },
  {
    model: '04:00',
    start: 4,
  },
  {
    model: '06:00',
    start: 6,
  },
  {
    model: '08:00',
    start: 8,
  },
  {
    model: '10:00',
    start: 10,
  },
  {
    model: '12:00',
    start: 12,
  },
  {
    model: '14:00',
    start: 14,
  },
  {
    model: '16:00',
    start: 16,
  },
  {
    model: '18:00',
    start: 18,
  },
  {
    model: '20:00',
    start: 20,
  },
  {
    model: '22:00',
    start: 22,
  },
]
//
export default {
  name: 'benben-kill-list',
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
  mixins: [pagingList],
  data() {
    return {
      tabs: [],
      nowTabs: [],
      start: null,
      curIndex: 0, //选中项下标
      curHour: 0,
      allowOnloadGetList: false, // 是否允许页面onload生命周期进入后立马执行
    }
  },
  computed: {
    countTime() {
      return (7200000 - (+new Date() % 7200000)) / 1000
    },
    userInfo() {
      return this.$store.state.userInfo
    },
  },
  filters: {},
  created() {
    this.refresh()
    // 监听页面更新
    uni.$on('onPageSeckillUpdata', this.getSeckill)
  },
  destroyed() {
    // 移除页面更新监听
    uni.$off('onPageSeckillUpdata', this.getSeckill)
  },
  methods: {
    refresh() {
      let _hour = new Date().getHours() - 2
      const tabs = []
      _tabs.map((item, index) => {
        if (_hour < item.start && tabs.length < 5) {
          tabs.push(item)
        }
      })
      if (tabs.length < 5) {
        _tabs.map((item, index) => {
          if (tabs.length < 5) {
            tabs.push(item)
          }
        })
      }
      if (this.nowTabs.length == 0 || tabs[0].start !== this.nowTabs[0].start) {
        this.nowTabs = tabs
        this.curIndex = 0
        this.start = this.nowTabs[this.curIndex].start
      }
      this.getSeckill()
    },
    // 获取秒杀活动
    getSeckill() {
      this.minixPagingListsApi = global.apiUrls.post641aecd93aa49
      this.pageingListApiMethod = 'post'
      this.allowOnloadGetList = true // 是否允许页面onload生命周期进入后立马执行
      this.listData = []
      this.pagingListToggle()
    },
    pagingListPostData() {
      return {
        user_id: this.userInfo?.id,
        start_time: this.start,
        end_time: this.start + 2,
      }
    },

    // 去详情
    navToDetail(item) {
      if (this.curIndex != this.curHour) return
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
    // 发送通知
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
        console.log('postData', postData)
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
        this.$message.info(global.i18n.t('H5不支持推送功能'))
        // #endif
      })
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
  },
}
</script>

<style lang="scss" scoped>
.empty-box {
  width: 100%;
  height: 150rpx;
  line-height: 150rpx;
  font-size: 24rpx;
  color: #efefef;
  text-align: center;
}
.content {
  background: #ff6855;
  border: 4rpx solid #fde497;
  border-radius: 20rpx;

  // 时间
  .top-tab {
    display: flex;
    align-items: center;

    .tab-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;

      .number {
        font-size: 30rpx;
        font-weight: bold;
        color: #ffffff;
      }

      .text {
        font-size: 20rpx;
        color: rgba(255, 255, 255, 0.7);
        margin-top: 10rpx;
      }
    }

    .tab-item.current {
      .number {
        color: #fff;
        font-size: 40rpx;
      }

      .text {
        color: #fd513d;
        width: 120rpx;
        height: 32rpx;
        line-height: 32rpx;
        background: #fff;
        margin-top: 6rpx;
        border-radius: 30rpx;
      }
    }
  }
  // 倒计时
  .benben_countdown_row {
    padding: 15rpx 0;
    color: #fff;
    line-height: 40rpx;
    font-size: 24rpx;
    .benben_countdown {
      display: flex;
      .time_box {
        width: 40rpx;
        border-radius: 8rpx;
        background-color: #fff;
        text-align: center;
        // font-size: 20rpx;
        margin-left: 10rpx;
        color: #ff6855;
      }
    }
  }
  .kill_list {
    padding: 24rpx;
    .list-item {
      padding: 12rpx 0;
      color: #fff;
      .thumb {
        width: 246rpx;
        height: 246rpx;
        border-radius: 12rpx;
        margin-right: 12rpx;
      }
      .goods_title {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        word-break: break-all;
        -webkit-line-clamp: 2;
        font-size: 28rpx;
        font-weight: 700;
      }
      .cu-progress {
        background-color: rgb(235, 238, 245);
      }
      //按钮
      .action {
        .right {
          width: 119rpx;
          height: 64rpx;
          background: #fff;
          border-radius: 8rpx;
          color: #fd513d;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        &.call {
          .right {
            color: #05c47a;
          }
        }
        .disable {
          background: #efccd3;
          color: #fff !important;
        }
      }
    }
  }
}

.block-246 {
  width: 246rpx;
  height: 246rpx;
  min-width: 246rpx;
  min-height: 246rpx;

  image {
    width: 100%;
    height: 100%;
  }
}

.color1 {
  color: #ffe76d;
}
</style>
