<template>
  <view :style="styleInfo" v-if="messageNum > 0" class="benben_message_num">
    <template v-if="isMore">
      {{ messageNum }}
    </template>
    <template v-else>
      <view :style="{ 'background-color': color }" class="more"></view>
      <view :style="{ 'background-color': color }" class="more"></view>
      <view :style="{ 'background-color': color }" class="more"></view>
    </template>
  </view>
</template>
<script>
export default {
  name: 'benben-message-num',
  props: {
    messageNum: { type: [String, Number], default: 0 },
    size: { type: [String, Number], default: '24' }, //消息字体大小
    color: { type: [String, Number], default: '#eee' },
    backgroundColor: { type: [String, Number], default: 'red' },
  },
  components: {},
  computed: {
    styleInfo() {
      let _size = this.size / 0.6 + 'rpx'
      return `background-color:${this.backgroundColor};font-size:${this.size}rpx;color:${this.color};width:${_size};height:${_size};`
    },
    isMore() {
      return +this.messageNum < 100
    },
  },
  data() {
    return {}
  },
  watch: {},
  methods: {},
  created() {},
  beforeDestroy() {},
}
</script>
<style lang="scss" scoped>
.benben_message_num {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 500;
  letter-spacing: 0px;
}

.more {
  width: 0.25em;
  height: 0.25em;
  margin-right: 0.12em;
  border-radius: 50%;
  &:first-child {
    margin-left: 0.12em;
  }
}
</style>
