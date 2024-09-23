<template>
  <view
    :style="{
      'font-size': `${size}px`,
      'background-color': active ? color : defaultColor,
    }"
    @tap.stop="handleSwitch"
    :class="{
      'benbne-switch': true,
      'switch-active': active,
      'benbne-switch-disabled': disabled,
    }"
  ></view>
</template>
<script>
export default {
  name: "benbne-switch",
  props: {
    value: { type: [Boolean, String, Number], default: false }, //开关状态
    color: { type: [String], default: "#007aff" }, //激活是的颜色
    defaultColor: { type: [String], default: "#f8f8f8" }, //未激活是的颜色
    auto: { type: [Boolean], default: true }, //是否自动修改值
    disabled: { type: [Boolean], default: false }, //是否禁用
    size: { type: [String, Number], default: 96 }, //开关的大小
  },
  data() {
    return {};
  },
  computed: {
    active() {
      // 处理字符串的情况
      if (typeof this.value === "string") {
        return this.value == "1";
      }
      // 处理数字的情况
      if (typeof this.value === "number") {
        return this.value == 1;
      }
      // 处理布尔值的情况
      return this.value;
    },
  },
  created() {},
  watch: {},
  mounted() {},
  methods: {
    handleSwitch() {
      if (this.disabled) return;
      let value = "";
      if (typeof this.value === "string") {
        // 处理字符串的情况
        value = this.value == "1" ? "0" : "1";
      } else if (typeof this.value === "number") {
        // 处理数字的情况
        value = this.value ? 0 : 1;
      } else {
        // 处理其他情况
        value = !this.value;
      }
      // 是否自动修改值
      if (this.auto) this.$emit("input", value);
      this.$emit("change", value);
    },
  },
};
</script>
<style scoped lang="scss">
.benbne-switch {
  box-sizing: content-box;
  width: 0.5em;
  height: 0.26em;
  border-radius: 0.13em;
  position: relative;
  transition: background-color 0.4s ease;
  &::before {
    content: "";
    position: absolute;
    width: 0.26em;
    height: 0.26em;
    left: 0;
    border-radius: 50%;
    background-color: #fff;
    transform: scale(0.9, 0.9);
    transition: left 0.4s ease;
  }
  &.switch-active::before {
    left: calc(100% - 0.26em);
  }
  &-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
