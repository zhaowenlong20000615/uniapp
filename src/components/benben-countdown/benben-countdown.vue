<template>
  <view class="benben-countdown">
    <slot v-bind:d="d" v-bind:h="h" v-bind:i="i" v-bind:s="s"></slot>
  </view>
</template>
<script>
import Dayjs from '@/libs/day.js'
export default {
  name: 'benben-countdown',
  props: {
    showDay: { type: Boolean, default: false },
    showHour: { type: Boolean, default: true },
    showMinute: { type: Boolean, default: true },
    showSecond: { type: Boolean, default: true },
    timeType: { type: Boolean, default: false }, //false countTime为剩余秒数  true countTime 为截至时间
    countTime: { type: [String, Number], default: 0 }, //剩余时间
  },
  options: {
    virtualHost: true,
  },
  components: {},
  computed: {},
  data() {
    return { timer: null, syncFlag: false, d: '00', h: '00', i: '00', s: '00', seconds: 0 }
  },
  watch: {
    countTime(val) {
      this.startData()
    },
  },
  methods: {
    startData() {
      this.seconds = this.getSeconds()
      if (this.seconds <= 0) {
        return
      }
      this.countDown()
      this.timer && clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.seconds--
        if (this.seconds <= 0) {
          clearInterval(this.timer)
          this.$emit('time-end')
          return
        }
        this.countDown()
      }, 1000)
    },
    getSeconds() {
      let countTime = this.countTime
      if (!this.timeType) {
        return countTime
      }
      if (isNaN(+this.countTime)) {
        countTime = Dayjs(this.countTime).unix() - Dayjs().unix()
      } else {
        countTime = this.countTime - Dayjs().unix()
      }
      return countTime
    },
    countDown() {
      let seconds = this.seconds
      let [day, hour, minute, second] = [0, 0, 0, 0]
      if (seconds > 0) {
        if (this.showDay) {
          day = Math.floor(seconds / (60 * 60 * 24))
          seconds = seconds % (60 * 60 * 24)
        }
        if (this.showHour) {
          hour = Math.floor(seconds / (60 * 60))
          seconds = seconds % (60 * 60)
        }
        if (this.showMinute) {
          minute = Math.floor(seconds / 60)
          seconds = seconds % 60
        }
        if (this.showSecond) {
          second = Math.floor(seconds)
        }
      }
      if (day < 10) {
        day = '0' + day
      }
      if (hour < 10) {
        hour = '0' + hour
      }
      if (minute < 10) {
        minute = '0' + minute
      }
      if (second < 10) {
        second = '0' + second
      }
      this.d = day
      this.h = hour
      this.i = minute
      this.s = second
    },
  },
  created() {
    this.startData()
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
}
</script>
<style lang="scss" scoped>
.benben-countdown {
  display: inline;
}
</style>
