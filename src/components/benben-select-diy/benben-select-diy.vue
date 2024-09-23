<template>
  <view :class="className">
    <slot></slot>
  </view>
</template>

<script>
export default {
  name: 'benben-select-diy',

  options: {
    virtualHost: true,
  },
  props: {
    className: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'radio',
    },
    maxSelect: {
      type: Number,
      default: -1,
    },
    items: {
      type: Array,
      default: () => [],
    },
    defaultType: {
      type: String,
      default: 'value',
    },
    defaultLabel: {
      type: String,
      default: 'name',
    },
    allowCancel: {
      type: Boolean,
      default: true,
    },
    value: {
      type: [String, Number],
      default: '',
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    selectAll: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    selectArr: [],

    labelArr: [],
  }),

  computed: {},

  //监听value
  watch: {
    value: {
      handler(val) {
        if (!this.items.length) return
        let items = JSON.parse(JSON.stringify(this.items))
        let flag = false
        let selectLab = []
        if (this.type == 'checkbox') {
          let selectArr = val ? (val + '').split(',') : []
          let selectLgh = 0
          items.forEach((item) => {
            let index = selectArr.findIndex((id) => id == item[this.defaultType])

            if (index != -1) {
              selectLab.push(item[this.defaultLabel])
              item.isSelected = true
              selectLgh++
            } else {
              item.isSelected = false
            }
          })
          flag = selectLgh == this.items.length
        } else {
          items.forEach((item) => {
            if (item[this.defaultType] == val) {
              selectLab.push(item[this.defaultLabel])
              item.isSelected = true
            } else {
              item.isSelected = false
            }
          })
        }
        this.$emit('update:label', selectLab.join(','))
        this.$emit('update:selectAll', flag)
        this.$emit('update:items', items)
      },

      immediate: true,
    },
    // #ifdef VUE3
    modelValue: {
      handler(val) {
        if (!this.items.length) return
        let items = JSON.parse(JSON.stringify(this.items))
        let flag = false
        let selectLab = []
        if (this.type == 'checkbox') {
          let selectArr = val ? (val + '').split(',') : []
          let selectLgh = 0
          items.forEach((item) => {
            let index = selectArr.findIndex((id) => id == item[this.defaultType])

            if (index != -1) {
              selectLab.push(item[this.defaultLabel])
              item.isSelected = true
              selectLgh++
            } else {
              item.isSelected = false
            }
          })
          flag = selectLgh == this.items.length
        } else {
          items.forEach((item) => {
            if (item[this.defaultType] == val) {
              selectLab.push(item[this.defaultLabel])
              item.isSelected = true
            } else {
              item.isSelected = false
            }
          })
        }
        this.$emit('update:label', selectLab.join(','))
        this.$emit('update:selectAll', flag)
        this.$emit('update:items', items)
      },

      immediate: true,
    },
    // #endif
  },

  methods: {
    checkAll(flag = this.selectAll) {
      let selectId = ''
      let selectLab = ''
      if (this.disabled) return
      let selectArr = []
      let labelArr = []
      if (!flag) {
        let items = JSON.parse(JSON.stringify(this.items))
        items.forEach((item) => {
          item.isSelected = true
          selectArr.push(item[this.defaultType])
          labelArr.push(item[this.defaultLabel])
        })
        selectId = selectArr.join(',')
        selectLab = labelArr.join(',')
      }
      this.$emit('input', selectArr.join(','))
      this.$emit('update:modelValue', selectArr.join(','))
      this.$emit('update:label', labelArr.join(','))
      this.$emit('change', {
        label: selectId,
        value: selectLab,
      })
    },
    tapHandle(index) {
      if (this.disabled) return
      let item = this.items[index]
      let selectId = ''
      let selectLab = ''
      let flag = false
      if (this.type == 'checkbox') {
        let selectArr = ''
        // #ifdef VUE2
        selectArr = this.value ? (this.value + '').split(',') : []
        // #endif
        // #ifdef VUE3
        selectArr = this.modelValue ? (this.modelValue + '').split(',') : []
        // #endif
        let labelArr = this.label ? (this.label + '').split(',') : []
        let index = selectArr.findIndex((id) => id == item[this.defaultType])
        let labelindex = labelArr.findIndex((id) => id == item[this.defaultLabel])
        if (index != -1 && this.allowCancel) selectArr.splice(index, 1)
        if (labelindex != -1 && this.allowCancel) labelArr.splice(labelindex, 1)
        if (index == -1) selectArr.push(item[this.defaultType])
        if (labelindex == -1) labelArr.push(item[this.defaultLabel])
        flag = selectArr.length == this.items.length
        if (this.maxSelect != -1 && this.maxSelect < selectArr.length) return
        selectId = selectArr.join(',')
        selectLab = labelArr.join(',')
      } else {
        if (this.allowCancel) {
          
          // #ifdef VUE2
          selectId = item[this.defaultType] === this.value ? '' : item[this.defaultType]
          selectLab = item[this.defaultType] === this.value ? '' : item[this.defaultLabel]
          // #endif
          // #ifdef VUE3
          selectId = item[this.defaultType] === this.modelValue ? '' : item[this.defaultType]
          selectLab = item[this.defaultType] === this.modelValue ? '' : item[this.defaultLabel]
          // #endif
        } else {
          selectId = item[this.defaultType]
          selectLab = item[this.defaultLabel]
        }
      }
      console.log('item[this.defaultLabel] === this.label', item[this.defaultLabel] === this.labell, selectId, selectLab)
      // #ifdef VUE2
      this.$emit('input', selectId)
      // #endif
      // #ifdef VUE3
      this.$emit('update:modelValue', selectId)
      // #endif
      this.$emit('update:label', selectLab)
      this.$emit('update:selectAll', flag)
      this.$emit('change', {
        label: selectId,
        value: selectLab,
      })
      return
    },
    isSelected(val) {
      if (this.type == 'checkbox') {
        return this.selectArr.findIndex((item) => item === val) != -1
      } else {
        // #ifdef VUE2
        return this.value === val
        // #endif
        // #ifdef VUE3
        return this.modelValue === val
        // #endif
      }
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

<style></style>
