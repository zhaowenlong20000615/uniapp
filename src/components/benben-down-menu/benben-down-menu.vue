<template>
  <view :style="styleInfo" @click.stop="handleMenu" class="benben-down-menu">
    <slot></slot>
    <view id="popup" class="popupstyle" @click.stop="handlePopup" style="" :style="popupStyleInfo">
      <slot name="popup"></slot>
    </view>
    <view
      @touchmove.stop.prevent="closeMenu"
      @click.stop="closeMenu"
      :style="{
        background: `linear-gradient(to bottom, transparent, transparent ${markTop}px, ${markColor}  ${markTop}px)`,
      }"
      v-if="show"
      class="mark"
    ></view>
  </view>
</template>
<script>
export default {
  name: 'benben-down-menu',
  options: {
    virtualHost: true,
  },
  props: {
    value: {
      type: [Boolean, String, Number, Object, Array],
      default: false,
    },
    auto: {
      type: Boolean,
      default: false,
    },
    markColor: {
      type: String,
      default: 'rgba(0, 0,0,0.3)',
    },
    zIndex: {
      type: [String, Number],
      default: 99,
    },
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          this.openMenu()
        } else {
          this.closeMenu()
        }
      },
      immediate: true,
    },
  },
  data() {
    return {
      popupStyle: '',
      markTop: 0,
      show: false,
    }
  },
  computed: {
    styleInfo() {
      return `--popup-z-index:${this.zIndex};--mark-z-index:${this.zIndex - 1}; overflow:${this.show ? '' : 'hidden'}`
    },
    popupStyleInfo() {
      return this.show ? this.popupStyle : `left:0; bottom: 0; transform: translateY(-100%)`
    },
  },
  methods: {
    setValue(value) {
      this.show = false
      if (value != this.value) {
        this.$emit('input', value)
        this.$emit('change', value)
      }
    },
    closeMenu() {
      this.setValue(false)
      this.popupStyle = {}
    },
    handleMenu() {
      if (this.auto) {
        this.openMenu()
      }
    },
    handlePopup() {
      if (this.auto) {
        this.closeMenu()
      }
    },
    openMenu() {
      let that = this
      let { windowHeight, windowWidth } = uni.getSystemInfoSync()
      setTimeout(() => {
        uni
          .createSelectorQuery()
          .in(that)
          .select(`.benben-down-menu`)
          .boundingClientRect((menuInfo) => {
            uni
              .createSelectorQuery()
              .in(that)
              .select(`#popup`)
              .boundingClientRect((popupInfo) => {
                let popupStyle = ``
                that.markTop = menuInfo.bottom
                if (!popupInfo) {
                  that.popupStyle = `bottom:0;transform:translateY(-100%);left:0;`
                  that.show = true
                  return
                }
                if (windowHeight > menuInfo.bottom + popupInfo.height) {
                  popupStyle += `bottom:-${popupInfo.height}px;`
                } else {
                  popupStyle += `top"-${popupInfo.height}px;`
                }
                if (windowWidth > menuInfo.left + popupInfo.width) {
                  popupStyle += `left:0px;`
                } else {
                  popupStyle += `left:-${menuInfo.left + popupInfo.width - windowWidth}px;`
                }
                that.popupStyle = popupStyle
                that.show = true
              })
              .exec()
          })
          .exec()
      }, 50)
    },
    hanleStop() {},
  },
}
</script>

<style lang="scss" scoped>
.benben-down-menu {
  position: relative;
}
.popupstyle {
  position: absolute;
  z-index: var(--popup-z-index);
}

.mark {
  position: fixed;
  inset: 0;
  z-index: var(--mark-z-index);
}
</style>
