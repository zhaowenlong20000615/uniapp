<template>
  <!-- #ifndef MP-WEIXIN -->
  <view>
    <!-- #endif -->
    <view @tap="tapHandle" :class="[disabled && 'disabledSwtich', className]">
      <slot v-if="active" name="checked"></slot>
      <slot v-else name="unchecked"></slot>
    </view>
    <!-- #ifndef MP-WEIXIN -->
  </view>
  <!-- #endif -->
</template>
<script>
export default {
  name: 'benben-flex-switch-new',
  props: {
    className: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    auto: { type: [Boolean], default: true }, //是否自动修改值
    value: {
      type: [Boolean, String, Number],
      default: false,
    },
    modelValue: {
      type: [Boolean, String, Number],
      default: false,
    },
  },
  data: () => ({}),
  computed: {
    // #ifdef VUE3
    active() {
      // 处理字符串的情况
      if (typeof this.modelValue === 'string') {
        return this.modelValue == '1'
      }
      // 处理数字的情况
      if (typeof this.modelValue === 'number') {
        return this.modelValue == 1
      }
      // 处理布尔值的情况
      return this.modelValue
    },
    // #endif
    // #ifdef VUE2
    active() {
      // 处理字符串的情况
      if (typeof this.value === 'string') {
        return this.value == '1'
      }
      // 处理数字的情况
      if (typeof this.value === 'number') {
        return this.value == 1
      }
      // 处理布尔值的情况
      return this.value
    },
    // #endif

  },
  //监听value
  watch: {},
  methods: {
    tapHandle() {
      if (this.disabled) {
        return
      }
      let value = ''
      // #ifdef VUE2
      if (typeof this.value === 'string') {
        // 处理字符串的情况
        value = this.value == '1' ? '0' : '1'
      } else if (typeof this.value === 'number') {
        // 处理数字的情况
        value = this.value ? 0 : 1
      } else {
        // 处理其他情况
        value = !this.value
      }
      if (this.auto) this.$emit('input', value)
      // #endif

      // #ifdef VUE3
      if (typeof this.modelValue === 'string') {
        // 处理字符串的情况
        value = this.modelValue == '1' ? '0' : '1'
      } else if (typeof this.modelValue === 'number') {
        // 处理数字的情况
        value = this.modelValue ? 0 : 1
      } else {
        // 处理其他情况
        value = !this.modelValue
      }
      if (this.auto) this.$emit('update:modelValue', value)
      // #endif

      this.$emit('change', value)
    },
  },
  // 组件周期函数--监听组件挂载完毕
  mounted() { },
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() { },
  // 组件周期函数--监听组件数据更新之后
  updated() { },
  // 组件周期函数--监听组件激活(显示)
  activated() { },
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() { },
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() { },
}
</script>

<style>
.disabledSwtich {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
