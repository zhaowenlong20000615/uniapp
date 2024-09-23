<template>
  <benben-popup v-model="popupShow" :z-index="zIndex" mode="bottom">
    <view class="time_popup">
      <view class="after_time_head">
        <text class="after_time_title">{{ title }}</text>
        <text @tap="popupShow = false" class="fu-iconfont2">&#59029;</text>
      </view>
      <view class="after_time_body">
        <scroll-view :scroll-into-view="leftScrollIntoView" class="left_scroll" scroll-y>
          <view
            :id="'left-' + item.value"
            @tap="activeIndex = i"
            class="left_time"
            :class="{ active_date: activeIndex == i }"
            v-for="(item, i) in dateList"
          >
            {{ item.lable }}
            <view class="radius_top"></view>
            <view class="radius_bottom"></view>
          </view>
        </scroll-view>
        <scroll-view class="right_scroll" :scroll-into-view="RightScrollIntoView" scroll-y>
          <view
            :id="getRightId(item.dateTime)"
            :class="{ active_time: item.dateTime == currentTime }"
            @tap="handlerTime(item)"
            class="right_time"
            v-for="(item, i) in childData"
          >
            {{ item.lable }}
            <text v-if="item.dateTime == currentTime" class="fu-iconfont2">&#xe7d8;</text>
          </view>
        </scroll-view>
      </view>
    </view>
  </benben-popup>
</template>
<script>
/**
 * benben-after-time-popup 未来时间选择弹窗
 * @description 弹出层容器，用于展示弹窗时间选择弹窗
 * @property {Boolean} v-model / value 弹窗开启关闭
 * @property {Boolean} z-index 弹窗层级
 * @property {Boolean} expand 往后拓展天数
 * @property {Boolean} isShowNow 是否显当前时间
 * @property {Number, String} nowText 当前时间文本
 * @example <benben-after-time-popup v-model="show"></benben-after-time-popup>
 */
import Dayjs from '@/libs/day.js'
export default {
  name: 'benben-after-time-popup',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    asyncChange: {
      type: Boolean,
      default: false,
    },
    zIndex: {
      type: [Number, String],
      default: '99',
    },
    lable: {
      type: [Number, String],
      default: '',
    },
    dateTime: {
      type: [Number, String],
      default: '',
    },
    isShowNow: {
      type: Boolean,
      default: true,
    },
    title: {
      type: [Number, String],
      default: global.i18n.t('选择时间'),
    },
    nowText: {
      type: [Number, String],
      default: global.i18n.t('立即送出'),
    },
    expand: {
      type: [Number, String],
      default: 3,
    },
    startTime: {
      type: [String],
      default: '09:00',
    },
    endTime: {
      type: [String],
      default: '18:00',
    },
    timeInterval: {
      type: [Number, String],
      default: 30,
    },
  },
  data() {
    return {
      today: Dayjs(),
      dateList: [],
      activeIndex: 0,
      leftScrollIntoView: '',
      RightScrollIntoView: '',
      currentTime: '',
      currentText: '',
    }
  },
  created() {
    this.initTime()
  },
  computed: {
    popupShow: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
    childData() {
      let activeItem = this.dateList[this.activeIndex]
      if (!activeItem) return []
      return activeItem.child
    },
  },
  watch: {
    dateTime: {
      handler(value) {
        if (value && value !== this.currentTime) this.currentTime = value
      },
      immediate: true,
    },
    value: {
      handler(value) {
        if (!value) {
          this.leftScrollIntoView = ''
          this.RightScrollIntoView = ''
          return
        }
        let activeIndex = this.dateList.findIndex((item) => this.currentTime.indexOf(item.value) != -1)
        this.activeIndex = activeIndex == -1 ? 0 : activeIndex
        if (this.dateTime && activeIndex != -1) {
          setTimeout(() => {
            this.leftScrollIntoView = 'left-' + this.dateTime.split(' ')[0]
            this.RightScrollIntoView = this.getRightId(this.dateTime)
          }, 100)
        }
      },
      immediate: true,
    },
  },
  mounted() {},
  methods: {
    getRightId(dateTime) {
      return 'right-' + dateTime.replace(/[ :]/g, '')
    },
    handlerTime(item) {
      this.currentTime = item.dateTime
      this.currentText = item.dateText
      this.confirm()
    },
    confirm() {
      if (!this.currentTime) return this.$message.info(global.i18n.t('请选择时间'))
      this.$emit('input', false)
      this.$emit('update:date-time', this.currentTime)
      this.$emit('update:lable', this.currentText)
      this.$emit('change', { value: this.currentTime, lable: this.currentText })
    },
    initTime() {
      let dates = []
      const { today } = this
      for (let i = 0; i < +this.expand; i++) {
        const value = today.add(i, 'day').format('YYYY-MM-DD')
        let lable = ''
        let nowTime = false
        switch (i) {
          case 0:
            lable = global.i18n.t('今天')
            nowTime = today
            break
          case 1:
            lable = global.i18n.t('明天')
            break
          case 2:
            lable = global.i18n.t('后天')
            break
          default:
            lable = value
            break
        }
        let child = this.getDateTime(`${value} ${this.startTime}`, `${value} ${this.endTime}`, +this.timeInterval, lable, nowTime)
        if (child.length) {
          dates.push({ lable, child, value })
        }
      }
      this.dateList = dates
      // if (!this.dateTime && this.asyncChange) {
      //   this.currentTime = dates[0].child[0].dateTime
      //   this.currentText = dates[0].child[0].dateText
      // }
    },
    getDateTime(startTime, endTime, timeInterval, lable, nowTime = false) {
      const start = Dayjs(startTime)
      const end = Dayjs(endTime)
      const times = []
      let index = 0
      for (let i = start; i <= end; i = i.add(timeInterval, 'minute')) {
        if (nowTime && nowTime > i && index == 0 && this.isShowNow) {
          times.push({
            lable: this.nowText,
            value: nowTime.format('HH:mm'),
            dateText: `${this.nowText}`,
            dateTime: nowTime.format('YYYY-MM-DD HH:mm'),
          })
        }
        if ((nowTime && nowTime < i) || !nowTime) {
          let aTime = i.format('HH:mm')
          times.push({
            lable: aTime,
            value: aTime,
            dateText: `${lable} ${aTime}`,
            dateTime: i.format('YYYY-MM-DD HH:mm'),
          })
        }
        index++
      }
      return times
    },
  },
}
</script>
<style scoped lang="scss">
.after_time_head {
  line-height: 88rpx;
  padding: 0 24rpx;
  display: flex;
  .after_time_title {
    margin-left: 30rpx;
    flex: 1;
    text-align: center;
    font-size: 32rpx;
  }
  .fu-iconfont2 {
    font-size: 20rpx;
    color: var(--benbenFontColor2);
  }
}
.time_popup {
  background-color: var(--benbenbgColor1);
  color: var(--benbenFontColor0);
  border-radius: 24rpx 24rpx 0 0;
}
.after_time_body {
  height: 750rpx;
  display: flex;
  font-weight: 500;
  font-size: 28rpx;

  .left_scroll {
    width: 250rpx;
    height: 100%;
    background-color: var(--benbenbgColor0);
    .left_time {
      line-height: 104rpx;
      text-align: center;
      background-color: var(--benbenbgColor0);
      position: relative;
      &:first-child .radius_top {
        display: none;
      }
      .radius_bottom {
        position: absolute;
        bottom: -16rpx;
        right: 0;
        width: 16rpx;
        height: 16rpx;
        background-color: var(--benbenbgColor1);
        overflow: hidden;
        display: none;
        z-index: 1;
        &::before {
          content: '';
          width: 200%;
          height: 200%;
          position: absolute;
          top: 0;
          right: 0;
          border-radius: 50%;
          background-color: var(--benbenbgColor0);
        }
      }
      .radius_top {
        position: absolute;
        top: -16rpx;
        right: 0;
        width: 16rpx;
        height: 16rpx;
        background-color: var(--benbenbgColor1);
        display: none;
        overflow: hidden;
        z-index: 1;
        &::before {
          content: '';
          width: 200%;
          height: 200%;
          position: absolute;
          bottom: 0;
          right: 0;
          border-radius: 50%;
          background-color: var(--benbenbgColor0);
        }
      }
    }
    .active_date {
      background-color: var(--benbenbgColor1);
      .radius_bottom {
        display: block;
      }
      .radius_top {
        display: block;
      }
    }
  }
  .right_scroll {
    width: 500rpx;
    height: 100%;
    padding-left: 32rpx;
    .right_time {
      position: relative;
      line-height: 104rpx;
      padding-right: 32rpx;
      display: flex;
      &.active_time {
        color: var(--benbenFontColor6);
        .fu-iconfont2 {
          margin-left: auto;
          font-size: 20rpx;
        }
      }
      &:last-child::after {
        display: none;
      }
      &::after {
        @include bottom-line(var(--benbenbdColor0));
      }
    }
  }
}
</style>
