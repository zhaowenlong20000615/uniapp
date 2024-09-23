<template>
  <view class="benben-flex-collapse">
    <slot />
  </view>
</template>
<script>
export default {
  name: 'benben-flex-collapse',
  props: {
    value: {
      type: [String, Array, Number],
      default: '',
    },
    accordion: {
      // 是否开启手风琴效果
      type: [Boolean, String],
      default: false,
    },
  },
  data() {
    return {
      isUpdate: false,
    }
  },
  computed: {
    openIds() {
      if (typeof this.value === 'string') {
        return this.value.split(',')
      }
      if (typeof this.value === 'number') {
        return [this.value + '']
      }
      return this.value
    },
  },
  watch: {
    value() {
      if (this.isUpdate) {
        this.isUpdate = false
        return
      }
      this.childrens.forEach((item) => item.updateOpen())
    },
  },
  created() {
    this.childrens = []
    this.names = []
  },
  mounted() {},
  methods: {
    updateValue() {
      //过滤child
      this.isUpdate = true
      let ids = this.childrens.filter((item) => item.isOpen).map((item) => item.name + '')
      if (typeof this.value === 'string' || typeof this.value === 'number') {
        this.emit(ids.join(','))
      } else {
        this.emit(ids)
      }
    },

    emit(val) {
      this.$emit('change', val)
      this.$emit('input', val)
    },
  },
}
</script>
<style lang="scss" scoped>
.benben-flex-collapse {
  width: 100%;
}

</style>
