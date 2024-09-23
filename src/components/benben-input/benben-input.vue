<template>
  <view class="benben-input">
    <input @keyup="$emit('keyup', $event)" @focus="$emit('focus', $event)" @blur="$emit('blur', $event)"
      @confirm="$emit('confirm', $event)" @input="changeValue" :value="inputValue" :placeholder="placeholder"
      :type="type" :focus="focus" :maxlength="maxlength" :password="password" :disabled="disabled"
      :confirm-type="confirmType" :adjust-position="adjustPosition" :placeholder-style="placeholderStyle" />
    <view v-if="disabled" class="benben-input-mack"></view>
  </view>
</template>
<script>
export default {
  name: 'benben-input',
  props: {
    placeholderStyle: {
      type: [Object, String, Array],
      default: '',
    },
    adjustPosition: {
      type: [Boolean],
      default: true,
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
    password: {
      type: [Boolean],
      default: false,
    },
    type: {
      type: [String],
      default: 'text',
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
  components: {},
  //监听value
  watch: {
    value: {
      handler(val) {
        this.inputValue = val
      },
      immediate: true,
    },

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
    inputLength() {
      return this.value.length
    },
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
    },
  },
  created() { },
}
</script>
<style lang="scss" scoped>
.benben-input {
  position: relative;
  /* #ifdef MP-WEIXIN */
  height: 100%;

  /* #endif */
  input {
    height: inherit;
    line-height: inherit;
    font-size: inherit;
  }

  .benben-input-mack {
    position: absolute;
    inset: 0;
    z-index: 1;
  }
}
</style>
