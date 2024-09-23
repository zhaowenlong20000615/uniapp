<template>
  <view
    class="renovation-title"
    :class="moduleClass"
    :style="{
      marginLeft: config.backgroundMargin + 'rpx',
      marginRight: config.backgroundMargin + 'rpx',
      backgroundColor: config.backgroundColor,
      marginBottom: config.pageMargin + 'rpx',
    }"
  >
    <image v-if="config.leftIcon" :src="config.leftIcon" mode="heightFix" />
    <text :style="{ color: config.color, fontSize: config.fontSize + 'rpx', fontWeight: config.fontWeight }" style="padding: 0 10px"
      >{{ config.text }}
    </text>
    <image v-if="config.rightIcon" :src="config.rightIcon" mode="heightFix" />
  </view>
</template>
<script>
export default {
  name: 'renovation-title',
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {}
  },
  computed: {
    moduleClass() {
      return ` ${this.config.mode} ${this.config.isRadius ? 'shop-radius' : ''} `
    },
  },
  watch: {},
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="scss">
.renovation-title {
  display: flex;
  align-items: center;
  height: 80rpx;
  image {
    height: 32rpx;
  }
}
</style>
