<template>
  <textarea :class="{ 'benben-textarea-content': true, 'auto-height': autoHeight }" @keyup="$emit('keyup', $event)"
    @focus="$emit('focus', $event)" @blur="$emit('blur', $event)" @confirm="$emit('confirm', $event)"
    @input="changeValue" :value="inputValue" :placeholder="placeholder" :focus="focus" :maxlength="maxlength"
    :auto-height="autoHeight" :disabled="disabled" :confirm-type="confirmType" :adjust-position="adjustPosition"
    :placeholder-style="placeholderStyle" />
</template>
<script>
export default {
  name: 'benben-textarea',
  props: {
    placeholderStyle: {
      type: [Object, String, Array],
      default: '',
    },
    adjustPosition: {
      type: [Boolean],
      default: true,
    },
    autoHeight: {
      type: [Boolean],
      default: false,
    },
    focus: {
      type: [Boolean],
      default: false,
    },
    confirmType: {
      type: [String],
      default: 'done',
    },
    placeholder: {
      type: [String],
      default: '',
    },
    maxlength: {
      type: [String, Number],
      default: -1,
    },
    disabled: {
      type: [Boolean],
      default: false,
    },
    value: {
      type: [String, Number],
      default: '',
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
  },
  //   options: {
  //   virtualHost: true,
  // },
  components: {},

  //监听value
  watch: {
    // #ifdef VUE2
    value: {
      handler(val) {
        this.inputValue = val
      },
      immediate: true,
    },
    // #endif
    // #ifdef VUE3
    modelValue: {
      handler(val) {
        this.inputValue = val
      },
      immediate: true,
    },
    // #endif

  },
  computed: {
    // #ifdef VUE2
    inputLength() {
      return this.value.length
    },
    // #endif
    // #ifdef VUE3
    inputLength() {
      return this.modelValue.length
    },
    // #endif
  },
  data() {
    return {
      inputValue: '',
    }
  },
  methods: {
    changeValue(e) {
      let value = e.detail.value
      this.$emit('input', value)
      // #ifdef VUE3
      this.$emit('update:modelValue', value)
      // #endif
      if (this.maxlength > -1 && value.length > this.maxlength) {
        value = value.substr(0, this.maxlength)
        setTimeout(() => {
          this.$emit('input', value)
          // #ifdef VUE3
          this.$emit('update:modelValue', value)
          // #endif
        }, 0)
      }
    },
  },
  created() { },
}
</script>
<style lang="scss" scoped>
.benben-textarea-content {
  /* #ifdef MP-WEIXIN */
  width: 100%;
  height: 100%;
  font-weight: inherit;
  font-size: inherit;
  display: block;

  /* #endif */
  color: #000 !important;

  &.auto-height {
    min-height: 100rpx;
    height: auto;
  }
}

.uni-textarea-textarea {
  color: #000 !important;
}
</style>
