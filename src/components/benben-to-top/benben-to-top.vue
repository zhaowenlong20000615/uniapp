<template>
  <view v-if="isShow" @tap="handleTop" :class="benbenToTop">
    <slot />
  </view>
</template>

<script>
export default {
  name: 'benben-to-top',
  props: {
    showScrollTop: {
      type: [String, Number],
      default: 500,
    },
    scrollTop: {
      type: [String, Number],
      default: 500,
    },
  },
  data() {
    return {
      benbenToTop: 'benben-to-top',
    }
  },
  computed: {
    isShow() {
      return this.scrollTop > this.showScrollTop
    },
  },
  watch: {
    isShow(val) {
      setTimeout(() => {
        this.benbenToTop = val ? 'benben-to-top show' : 'benben-to-top'
      }, 50)
    },
  },
  mounted() {},

  methods: {
    handleTop() {
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 300,
      })
    },
  },
}
</script>
<style scoped lang="scss">
.benben-to-top {
  opacity: 0;
  transition: all 1s ease-in;
  &.show {
    opacity: 1;
  }
}
</style>
