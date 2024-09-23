<template>
  <view class="benben-collapse-item">
    <view @click="onClick()" :class="{ open: isOpen }">
      <slot name="title" v-bind:isOpen="isOpen" v-bind:disabled="disabled"></slot>
      <slot name="line" v-if="border"></slot>
    </view>
    <view class="benben-collapse-item__wrap">
      <view ref="collapse--hook" class="benben-collapse-item__wrap-content">
        <slot v-if="isOpen" name="content"></slot>
      </view>
    </view>
  </view>
</template>
<script>
/**
 * @property {String} name 唯一标志符
 * @property {Boolean} border = [true|false] 是否显示分隔线
 * @property {Boolean} disabled = [true|false] 是否展开面板
 */
export default {
  name: 'benben-collapse-item',
  props: {
    name: {
      type: [Number, String],
      default: '',
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 是否显示边框
    border: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.collapse = this.getCollapse()
    if (this.collapse.openIds.includes(this.name + '')) {
      this.isOpen = true
    }
    this.collapse.childrens.push(this)
  },
  destroyed() {
    this.collapse.childrens.forEach((item, index) => {
      if (item === this) {
        this.collapse.childrens.splice(index, 1)
      }
    })
    this.collapse.updateValue()
  },
  methods: {
    updateOpen() {
      this.isOpen = this.collapse.openIds.includes(this.name + '')
    },
    onClick() {
      if (this.disabled) return
      this.collapse.childrens.forEach((item) => {
        if (item.name === this.name) item.isOpen = !item.isOpen
        if (item.name !== this.name && this.collapse.accordion) item.isOpen = false
      })
      this.collapse.updateValue()
    },
    /**
     * 获取父元素实例
     */
    getCollapse(name = 'benben-flex-collapse') {
      let parent = this.$parent
      let parentName = parent.$options.name
      while (parentName !== name) {
        parent = parent.$parent
        if (!parent) return false
        parentName = parent.$options.name
      }
      return parent
    },
  },
}
</script>

<style lang="scss">
.benben-collapse-item__wrap {
  overflow: hidden;
}
.is--transition {
  // transition: all 0.3s;
  transition-property: height, border-bottom-width;
  transition-duration: 0.3s;
  /* #ifndef APP-NVUE */
  will-change: height;
  /* #endif */
}
</style>
