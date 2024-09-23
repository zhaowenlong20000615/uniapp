<template>
  <view class="fu-calendar-wrap" :style="defaultCssVar">
    <!-- 日历选择 start -->
    <view class="fu-calendar-data fu-flex fu-justify-center fu-align-center fu-margin fu-height-72" v-if="changeTitle">
      <block v-if="changeYear">
        <view class="fu-arrow fu-flex fu-justify-between fu-align-center" @click="prevYear">
          <text class="fu-iconfont2" :style="[yaColor]">&#xE807;</text>
        </view>
      </block>
      <block v-if="changeMonth">
        <view class="fu-arrow single fu-flex fu-justify-between fu-align-center" @click="prevMonth">
          <text class="fu-iconfont2" :style="[maColor]">&#xE794;</text>
        </view>
      </block>
      <view class="fu-title fu-text-32 fu-text-333">{{ currentDateYear }}{{ $t('年') }}{{ currentDateMonth }}{{ $t('月') }}</view>
      <block v-if="changeMonth">
        <view class="fu-arrow single fu-flex fu-justify-between fu-align-center" @click="nextMonth">
          <text class="fu-iconfont2" :style="[maColor]">&#xE7f2;</text>
        </view>
      </block>
      <block v-if="changeYear">
        <view class="fu-arrow fu-flex fu-justify-between fu-align-center" @click="nextYear">
          <text class="fu-iconfont2" :style="[yaColor]">&#xE7af;</text>
        </view>
      </block>
    </view>
    <!-- 日历选择 end -->
    <!-- 星期 start -->
    <view class="fu-week fu-flex fu-justify-between fu-align-center fu-text-333 fu-height-72">
      <view class="fu-week-item fu-text-center" v-for="item in weekData" :key="item">{{ item }}</view>
    </view>
    <!-- 星期 end -->
    <!-- 日历 start -->
    <view class="aaaa fu-calendar fu-flex fu-justify-between fu-align-center fu-flex-wrap fu-text-333">
      <!-- mode == date || mode == range -->
      <view
        class="fu-calendar-item fu-text-center"
        @click="changeCalendar(item)"
        :class="{ isNot: item.isNot, isFuture: item.isFuture && !item.isNot }"
        v-for="(item, index) in calendar"
        :key="index"
      >
        <view
          class="fu-calendar-num fu-flex fu-justify-center fu-align-center"
          :class="{
            signin: mode == 'signin' || mode == 'date',
            range: mode == 'range',
            start: start == item.timestamp && mode == 'range',
            end: end == item.timestamp && mode == 'range',
            'is-default-day': isDefaultDay && currentTimestamp == item.timestamp,
            'day-active':
              (currenTimeTimestamp == item.timestamp && mode == 'date') || (signinDataTimestamps.includes(item.timestamp) && mode == 'signin'),
            'range-active': start < item.timestamp && end > item.timestamp && mode == 'range',
          }"
        >
          {{ item.day }}
          <view class="fu-calendar-text" v-show="start === item.timestamp && mode == 'range'">{{ startText }}</view>
          <view class="fu-calendar-text" v-show="end === item.timestamp && mode == 'range'">{{ endText }}</view>
        </view>
      </view>
    </view>
    <!-- 日历 end -->
  </view>
</template>

<script>
import dayjs from '@/libs/day.js'
export default {
  name: 'benben-calendar-diy',
  props: {
    mode: {
      type: String,
      default: 'range', //日期模式 range date signin
    },
    yearArrowColor: {
      type: String,
      default: '#666666', //年份箭头颜色
    },
    monthArrowColor: {
      type: String,
      default: '#999999', //月份箭头颜色
    },
    startText: {
      type: String,
      default: global.i18n.t('开始'), //起始日期底部文字
    },
    endText: {
      type: String,
      default: global.i18n.t('结束'), //结束日期底部文字
    },
    activeBgColor: {
      type: String,
      default: 'rgba(41,121,255,1)', //开始结束日期背景色
    },
    rangeBgColor: {
      type: String,
      default: 'rgba(41,121,255,0.13)', //日期区间背景色
    },
    future: {
      type: Boolean,
      default: false, //未来日期是否可选择
    },
    changeTitle: {
      type: Boolean,
      default: true, //是否显示顶部年月
    },
    changeYear: {
      type: Boolean,
      default: true, //是否显示顶部的切换年份方向的按钮
    },
    changeMonth: {
      type: Boolean,
      default: true, //是否显示顶部的切换月份方向的按钮
    },
    // 日期段回显时 若只传入一个日期则不显示
    //日期段选择时默认显示开始时间
    startTime: {
      type: String,
      default: '',
    },
    //日期段选择时默认显示结束时间
    endTime: {
      type: String,
      default: '',
    },
    // 当前日期是否高亮
    isDefaultDay: {
      type: Boolean,
      default: false,
    },
    // 单个日期选择默认选中时间 xxxx-yy-dd
    currenTime: {
      type: String,
      default: '',
    },
    // 签到模式数据 [xxxx-yy-dd]
    signinData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      weekData: [
        global.i18n.t('z日'),
        global.i18n.t('z一'),
        global.i18n.t('z二'),
        global.i18n.t('z三'),
        global.i18n.t('z四'),
        global.i18n.t('z五'),
        global.i18n.t('z六'),
      ], //星期
      currentDay: '', //当天时间
      start: '', //开始时间
      end: '', //结束时间
      isUpdate: true, //mode == range是否推送
      currentTimestamp: dayjs().startOf('day').valueOf(),
      currentDateTamp: dayjs(),
    }
  },

  computed: {
    defaultCssVar() {
      return `--default-active-bg-color:${this.activeBgColor};--default-range-bg-color:${this.rangeBgColor};`
    },
    currentDateYear() {
      return this.currentDateTamp.year()
    },
    currentDateMonth() {
      return this.currentDateTamp.month() + 1
    },
    currenTimeTimestamp() {
      return this.currenTime ? dayjs(this.currenTime).valueOf() : ''
    },
    signinDataTimestamps() {
      return this.signinData.map((item) => dayjs(item).valueOf())
    },
    calendar() {
      // 获取当前月份的第一天
      const currentDate = this.currentDateTamp
      const lastDayOfLastMonth = currentDate.subtract(1, 'month').endOf('month').date() //获取上个月最大天数
      const startWeek = currentDate.startOf('month').day() //获取本月第一天是周几
      const endWeek = currentDate.endOf('month').day() //获取本月最后一天是周几
      const endDay = currentDate.endOf('month').date() //获取本月最大天数
      const specificDateTimestamp = currentDate.startOf('month').valueOf() //获取本月第一天是周几
      let calendar = []
      let totalDay = endDay + 6 - endWeek
      for (let index = -startWeek; index < totalDay; index++) {
        let timestamp = specificDateTimestamp + index * 86400000
        let day = 0
        if (index < 0) {
          day = index + lastDayOfLastMonth + 1
        } else if (index >= 0 && index < endDay) {
          day = index + 1
        } else {
          day = index - endDay + 1
        }
        calendar.push({
          timestamp: timestamp,
          day: day,
          isFuture: this.currentTimestamp >= timestamp ? true : false,
          isNot: index >= endDay || index < 0 ? true : false,
        })
      }
      return calendar
    },
    // 年份箭头颜色
    yaColor() {
      return { color: this.yearArrowColor }
    },
    // 月份箭头颜色
    maColor() {
      return { color: this.monthArrowColor }
    },
  },
  watch: {
    endTime: {
      deep: true,
      immediate: true,
      handler() {
        this.updatedTimeRange()
      },
    },
    startTime: {
      deep: true,
      immediate: true,
      handler() {
        this.updatedTimeRange()
      },
    },
  },
  mounted() {},
  methods: {
    updatedTimeRange() {
      if (this.isUpdate && this.startTime && this.endTime) {
        this.end = dayjs(this.endTime).valueOf()
        this.start = dayjs(this.startTime).valueOf()
      }
    },
    calendarCalss(item) {
      return {
        signin: this.mode == 'signin',
        range: this.mode == 'range',
        start: this.start == item.timestamp,
        end: this.end == item.timestamp,
        'day-active': this.currenTimeTimestamp == item.timestamp && this.mode == 'date',
        'range-active': this.start < item.timestamp && this.end > item.timestamp && this.mode == 'range',
      }
    },
    /**
     * @description 上年今月
     */
    prevYear() {
      this.currentDateTamp = this.currentDateTamp.subtract(1, 'year')
    },
    /**
     * @description 下年今月
     */
    nextYear() {
      this.currentDateTamp = this.currentDateTamp.add(1, 'year')
    },
    /**
     * @description 上月
     */
    prevMonth() {
      this.currentDateTamp = this.currentDateTamp.subtract(1, 'month')
    },
    /**
     * @description 下月
     */
    nextMonth() {
      this.currentDateTamp = this.currentDateTamp.add(1, 'month')
    },

    /**
     * @description 点击日期
     * @param {Object} item 入参 所点击日期信息
     */
    changeCalendar(item) {
      // 签到模式纯展示模式
      if (this.mode == 'signin') return
      // 未来日期 上下月日期不可选择
      if ((!item.isFuture && !this.future) || item.isNot) return
      if (this.mode == 'date' && item.timestamp != this.currenTimeTimestamp) {
        let currenDate = dayjs(item.timestamp).format('YYYY-MM-DD')
        this.$emit('update:curren-time', currenDate)
        this.$emit('change', currenDate)
      }
      if (this.mode == 'range') {
        // 当已经选择了开始结束时间时  再次点击时先清空之前的时间
        if (!this.start && !this.end) {
          this.start = item.timestamp
          this.end = ''
        } else if (this.start && !this.end) {
          // 如果已经选择了开始时间  则判断是否点击的结束时间
          if (this.start < item.timestamp) {
            this.end = item.timestamp
          }
          if (this.start > item.timestamp) {
            this.end = this.start
            this.start = item.timestamp
          }
        } else {
          this.start = item.timestamp
          this.end = ''
        }
        if (this.start && this.end) {
          let start = dayjs(this.start).format('YYYY-MM-DD')
          let end = dayjs(this.end).format('YYYY-MM-DD')
          this.$emit('update:start-time', start)
          this.$emit('update:end-time', end)
          this.$emit('change', { start, end })
          this.isUpdate = false
          setTimeout(() => {
            this.isUpdate = true
          }, 200)
        }
      }
    },
  },
}
</script>

<style scoped lang="scss">
.day-active {
  color: #fff;
  background: var(--active-bg-color, var(--default-active-bg-color));
}
.range-active {
  color: #fff;
  background: var(--range-bg-color, var(--default-range-bg-color));
}
.fu-calendar-wrap {
  background-size: 100% auto !important;
}
.fu-flex {
  display: flex;
}
.fu-justify-center {
  justify-content: center;
}
.fu-justify-between {
  justify-content: space-between;
}
.fu-align-center {
  align-items: center;
}
.fu-text-32 {
  font-size: 32rpx;
}
.fu-text-333 {
  color: #333333;
}
.fu-text-center {
  text-align: center;
}
.fu-margin {
  margin: 10rpx 0;
}
.fu-height-72 {
  height: 72rpx;
  line-height: 72rpx;
}
.fu-flex-wrap {
  flex-wrap: wrap;
}
// 日历选择 start
.fu-calendar-data {
  .fu-title {
    padding: 0 10rpx;
  }
  .fu-arrow {
    height: 100%;
    // padding: 0 10rpx;
    text {
      font-size: 24rpx;
      padding: 0 10rpx;
    }
  }
}
// 日历选择 end
// 星期 start
.fu-week {
  .fu-week-item {
    width: calc(100% / 7);
  }
}

// 星期 end
// 日历 start
.fu-calendar {
  .fu-calendar-item {
    width: calc(100% / 7);
    padding-bottom: calc(100% / 7);
    position: relative;
    overflow: hidden;

    .fu-calendar-num {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      &.start {
        border-radius: 16rpx 0 0 16rpx;
        color: #fff;
        background: var(--active-bg-color, var(--default-active-bg-color));
      }
      &.end {
        border-radius: 0 16rpx 16rpx 0;
        color: #fff;
        background: var(--active-bg-color, var(--default-active-bg-color));
      }
      .fu-calendar-text {
        position: absolute;
        bottom: 4rpx;
        left: 0;
        width: 100%;
        font-size: 20rpx;
        color: #ffffff;
        text-align: center;
      }
      &.range {
        position: absolute;
        width: 100%;
        height: 90%;
        top: 50%;
        transform: translateY(-50%);
      }

      &.signin {
        position: absolute;
        width: 60%;
        height: 60%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        &.is-default-day {
          border: 1px solid var(--active-bg-color, var(--default-active-bg-color));
        }
      }
    }
    &.isNot {
      color: #999;
    }
    &.isFuture {
      color: #666;
    }
  }
}
// 日历 end
</style>
