<template>
  <view class="calendar">
    <slot name="head" v-bind:currentDate="currentDate">
      <view class="header">
        <view class="btn btn-prev fu-iconfont2" @click="onSwitchPrevMonth()">&#59290;</view>
        <view class="current-date">{{ currentDate }}</view>
        <view class="btn btn-next fu-iconfont2" @click="onSwitchNextMonth()">&#59278;</view>
      </view>
    </slot>
    <view class="body">
      <view class="weeks">
        <view class="week-item" v-for="week in weeks" :key="week">{{ week }}</view>
      </view>
      <view class="day-list">
        <view class="day-item" v-for="(day, index) in dayList" :key="index" @click="handleClick(day)">
          <text v-if="day.checked" class="checked">{{ day.day }}</text>
          <text v-else-if="day.isToday" class="today">{{ day.day }}</text>
          <text v-else-if="day.type === 'current'" class="current-month-day">{{ day.day }}</text>
          <text v-else>{{ day.day }}</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: 'benben-sign-card',
  props: {
    signData: {
      type: Array,
      default() {
        return []
      },
    },
    keyName: {
      type: String,
      default: '',
    },
    currentMonth: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      setTimeoutFn: null,
      year: null,
      month: null,
      day: null,
      dayList: [],
      weeks: [
        global.i18n.t('z日'),
        global.i18n.t('z一'),
        global.i18n.t('z二'),
        global.i18n.t('z三'),
        global.i18n.t('z四'),
        global.i18n.t('z五'),
        global.i18n.t('z六'),
      ],
    }
  },
  computed: {
    checks() {
      if (this.keyName) {
        return this.signData.map((item) => item[this.keyName])
      } else {
        return this.signData
      }
    },
    currentDate() {
      const year = this.year
      const month = this.month < 10 ? '0' + this.month : this.month
      return `${year}-${month}`
    },
  },
  watch: {
    checks() {
      this.initDate()
    },
  },
  created() {
    const { year, month, day } = this.getCurrentDate()
    this.initDate(year, month, day)
  },
  methods: {
    // 初始化日期数据
    initDate(year = this.year, month = this.month, day = this.day) {
      // 获取日期列表
      const dayList = this.getDayList(year, month)
      // 更新年月日以及日期列表
      this.year = year
      this.month = month
      this.day = day
      this.dayList = dayList
    },
    // 处理点击事件
    handleClick(day) {
      // 构造数据
      const payload = {
        year: this.year,
        month: this.month,
        ...day,
      }
      // 根据日期类型，执行相应操作
      switch (day.type) {
        case 'prev':
          this.onSwitchPrevMonth(day)
          break
        case 'next':
          this.onSwitchNextMonth(day)
          break
        default:
          this.$emit('current-month-day', payload)
      }
    },
    // 切换到上一个月
    onSwitchPrevMonth(day) {
      // 获取上一个月的年月信息
      const { prevYear, prevMonth } = this.getPrevMonthInfo(this.year, this.month)
      // 构造数据
      const payload = {
        year: prevYear,
        month: prevMonth,
        oldYear: this.year,
        oldMonth: this.month,
        ...day,
      }
      // 初始化日期数据
      this.initDate(prevYear, prevMonth)
      // 触发事件
      this.$emit('update:current-month', this.currentDate)
      this.emitChange(payload)
    },
    // 切换到下一个月
    onSwitchNextMonth(day) {
      // 获取下一个月的年月信息
      const { nextYear, nextMonth } = this.getNextMonthInfo(this.year, this.month)
      // 构造数据
      const payload = {
        year: nextYear,
        month: nextMonth,
        oldYear: this.year,
        oldMonth: this.month,
        ...day,
      }
      // 初始化日期数据
      this.initDate(nextYear, nextMonth)
      // 修改current-month的值
      this.$emit('update:current-month', this.currentDate)
      // 触发事件
      this.emitChange(payload)
    },
    // 触发change
    emitChange(payload) {
      this.setTimeoutFn && clearTimeout(this.setTimeoutFn)
      this.setTimeoutFn = setTimeout(() => {
        this.$emit('change', payload)
      }, 300)
    },
    // 获取上一个月的年月信息
    getPrevMonthInfo(year, month) {
      let prevYear = year
      let prevMonth = month - 1
      if (prevMonth < 1) {
        prevMonth = 12
        prevYear -= 1
      }
      return {
        prevYear,
        prevMonth,
      }
    },
    // 获取下一个月的年月信息
    getNextMonthInfo(year, month) {
      let nextYear = year
      let nextMonth = month + 1
      if (nextMonth > 12) {
        nextMonth = 1
        nextYear += 1
      }
      return {
        nextYear,
        nextMonth,
      }
    },
    // 获取日期列表
    getDayList(year, month) {
      // 获取前一个月的日期列表
      const prevMonthDays = this.getPrevMonthDays(year, month)
      // 获取当前月的日期列表
      const currentMonthDays = this.getCurrentMonthDays(year, month)
      // 获取下一个月的日期列表
      const nextMonthDays = this.getNextMonthDays(year, month)
      // 合并日期列表
      return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]
    },
    // 获取当前日期
    getCurrentDate() {
      // const date = this.currentMonth ? new Date(this.currentMonth) : new Date()
      const date = new Date()
      const year = date.getFullYear() // 获取当前年份
      const month = date.getMonth() + 1 // 获取当前月份，注意需要加1，因为月份从0开始
      const day = date.getDate() // 获取当前日期
      return {
        year,
        month,
        day,
      }
    },
    // 获取下一个月天数
    getMonthLastDay(year, month) {
      // 根据传入的年份和月份获取下一个月的信息
      const { nextYear, nextMonth } = this.getNextMonthInfo(year, month)
      // 构建一个日期对象，设置为下一个月的第一天
      const date = new Date(`${nextYear}/${nextMonth}/1`)
      // 获取下一个月的第一天的时间戳
      const firstDayTimeStamp = date.getTime()
      const oneDayTimeStamp = 24 * 60 * 60 * 1000 // 一天的毫秒数
      // 上一个月最后一天的日期
      const prevMonthLastDay = new Date(firstDayTimeStamp - oneDayTimeStamp).getDate()
      return prevMonthLastDay
    },
    // 获取上一个月的日期列表
    getPrevMonthDays(year, month) {
      // 根据传入的年份和月份获取上一个月的信息
      const { prevYear, prevMonth } = this.getPrevMonthInfo(year, month)
      // 获取上一个月的最后一天
      const prevMonthLastDay = this.getMonthLastDay(prevYear, prevMonth)
      // 构建一个日期对象，设置为当前月的第一天
      const date = new Date(`${year}/${month}/1`)
      // 获取当前月的第一天是星期几
      const week = date.getDay()
      const days = []
      // 遍历上一个月的日期，并添加到日期列表中
      for (let i = 0; i < week; i++) {
        days.unshift({
          type: 'prev',
          checked: false,
          day: prevMonthLastDay - i, // 依次从上一个月最后一天向前推
        })
      }
      return days
    },
    // 获取当前月天数日期列表
    // 参数：year-年份，month-月份
    getCurrentMonthDays(year, month) {
      // 获取当前月的最后一天
      const currentMonthLastDay = this.getMonthLastDay(year, month)
      // 获取已选日期
      const checks = this.checks
      // 存储当月所有日期的数组
      const days = []
      // 获取当前日期
      const { year: currentYear, month: currentMonth, day: currentDay } = this.getCurrentDate()
      // 遍历当月所有日期
      for (let i = 1; i <= currentMonthLastDay; i++) {
        let checked = false
        let isToday = currentYear === year && currentMonth === month && currentDay === i
        // 判断当前日期是否被选中
        checks.forEach((date) => {
          const dateArr = date.split('-')
          if (year == dateArr[0] && month == dateArr[1] && i == dateArr[2]) {
            checked = true
          }
        })
        // 将日期对象添加到数组中
        days.push({
          type: 'current',
          checked,
          isToday,
          day: i,
        })
      }
      return days
    },
    // 获取下一个月天数
    // 参数：year-年份，month-月份
    getNextMonthDays(year, month) {
      // 获取当前月的最后一天
      const currentMonthLastDay = this.getMonthLastDay(year, month)
      // 获取下一个月的最后一天对应的日期
      const date = new Date(`${year}/${month}/${currentMonthLastDay}`)
      // 获取下一个月的第一天是星期几
      const week = date.getDay()
      // 存储下一个月从第一天开始的日期
      const days = []
      let day = 0
      // 遍历下一个月的日期
      for (let i = week + 1; i <= 6; i++) {
        day++
        // 将日期对象添加到数组中
        days.push({
          type: 'next',
          checked: false,
          day,
        })
      }
      return days
    },
  },
}
</script>
<style lang="scss" scoped>
.calendar {
  color: $uni-text-color;
  .header {
    padding: 0 24rpx;
    justify-content: center;
    display: flex;
    align-items: center;
    border-bottom: 2rpx solid #eee;
    .current-date {
      text-align: center;
      font-size: 34rpx;
      padding: 32rpx 0;
      color: #030303;
      margin: 0 24rpx;
    }
    .btn {
      line-height: 1;
      background: #fff;
      border: 1px solid #dcdfe6;
      color: #606266;
      text-align: center;
      box-sizing: border-box;
      font-weight: 500;
      padding: 12rpx 20rpx;
      font-size: 24rpx;
    }
  }
  .body {
    .weeks {
      display: flex;
      font-size: 30rpx;
      padding: 32rpx 0;
      .week-item {
        flex: 1;
        text-align: center;
      }
    }
    .day-list {
      display: flex;
      flex-wrap: wrap;
      .day-item {
        display: flex;
        justify-content: center;
        text-align: center;
        width: 14.285%;
        padding: 15rpx 0;
        font-size: 28rpx;
        color: #c8c8c8;
        line-height: 56rpx;
        .current-month-day {
          color: #171717;
        }
        .today {
          width: 56rpx;
          border-radius: 50%;
          background: var(--benbenbgColor2);
          color: #fff;
        }
        .checked {
          color: #171717;
          border-radius: 50%;
          position: relative;
          &::before {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            content: '';
            width: 10rpx;
            height: 10rpx;
            border-radius: 50%;
            background: var(--benbenbgColor7);
          }
        }
      }
    }
  }
}
</style>
