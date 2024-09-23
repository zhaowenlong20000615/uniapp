<template>
  <view class="benben-waterfall">
    <!-- #ifndef APP-NVUE -->
    <view class="benben-waterfall__gap_left" :style="[gapLeftStyle]"></view>
    <template v-if="columnNum >= 1">
      <view id="benben-waterfall-1" class="benben-waterfall__column">
        <slot name="list1"></slot>
      </view>
    </template>
    <template v-if="columnNum >= 2">
      <view class="benben-waterfall__gap_center" :style="[gapCenterStyle]"></view>
      <view id="benben-waterfall-2" class="benben-waterfall__column">
        <slot name="list2"></slot>
      </view>
    </template>
    <template v-if="columnNum >= 3">
      <view class="benben-waterfall__gap_center" :style="[gapCenterStyle]"></view>
      <view id="benben-waterfall-3" class="benben-waterfall__column">
        <slot name="list3"></slot>
      </view>
    </template>
    <template v-if="columnNum >= 4">
      <view class="benben-waterfall__gap_center" :style="[gapCenterStyle]"></view>
      <view id="benben-waterfall-4" class="benben-waterfall__column">
        <slot name="list4"></slot>
      </view>
    </template>
    <template v-if="columnNum >= 5">
      <view class="benben-waterfall__gap_center" :style="[gapCenterStyle]"></view>
      <view id="benben-waterfall-5" class="benben-waterfall__column">
        <slot name="list5"></slot>
      </view>
    </template>
    <view class="benben-waterfall__gap_right" :style="[gapRightStyle]"></view>
    <!-- #endif -->
    <!-- #ifdef APP-NVUE -->
    <view class="waterfall-warapper">
      <waterfall
        :column-count="columnNum"
        :show-scrollbar="false"
        column-width="auto"
        :column-gap="columnGap"
        :left-gap="leftGap"
        :right-gap="rightGap"
        :always-scrollable-vertical="true"
        :style="[nvueWaterfallStyle]"
        @loadmore="scrolltolower"
      >
        <slot></slot>
      </waterfall>
    </view>
    <!-- #endif -->
  </view>
</template>
<script>
/**
 * 瀑布流
 * @property {Array}	value/modelValue	瀑布流数组数据，非nvue生效 （默认 [] ）
 * @property {String}	idKey	  数据的id值，根据id值对数据执行删除操作，如数据为：{id: 1, name: 'benben-ui'}，那么该值设置为id，非nvue有效 （默认 '' ）
 * @property {String ｜ Number}	addTime		每次插入数据的事件间隔，间隔越长能保证两列高度相近，但是用户体验不好，单位ms，非nvue生效（默认 200 ）
 * @property {String ｜ Number}	columnCount		瀑布流的列数（默认 2 ）
 * @property {String ｜ Number}			columnGap		列与列的间隙（默认 0 ）
 * @property {String ｜ Number}			leftGap		左边和列表的间隙（默认 0 ）
 * @property {String ｜ Number}			rightGap	右边和列表的间隙（默认 0 ）
 * @property {Boolean}	showScrollbar		控制是否出现滚动条，仅nvue有效 （默认 false ）
 * @property {String ｜ Number}		columnWidth		描述瀑布流每一列的列宽，nvue生效 （默认 auto）
 * @property {String ｜ Number}	  width	  瀑布流的宽度，nvue生效 （默认 屏幕宽 ）
 * @property {String ｜ Number}		height	 瀑布流的高度，nvue生效 （默认 屏幕高 ）
 * @property {Object}	customStyle		定义需要用到的外部样式
 * @example <benben-waterfall :waterfallData.sync=waterfallData v-model="list"></benben-waterfall>
 * waterfallData:{ list1: [], list2: [], list3: [], list4: [], list5: [] }
 */
import { addUnit, deepClone, addStyle, deepMerge, sys, sleep } from './tools.js'
export default {
  name: 'benben-waterfalls',
  props: {
    // 瀑布流数据
    // #ifdef VUE2
    value: {
      type: Array,
      default: () => [],
    },
    // #endif
    // #ifdef VUE3
    modelValue: {
      type: Array,
      default: () => [],
    },
    // #endif

    waterfallData: {
      type: Object,
      default: () => ({ list1: [], list2: [], list3: [], list4: [], list5: [] }),
    },
    // 数据的id值，根据id值对数据执行删除操作
    // 如数据为：{id: 1, name: 'uv-ui'}，那么该值设置为id
    idKey: {
      type: String,
      default: 'id',
    },
    // 每次插入数据的事件间隔，间隔越长能保证两列高度相近，但是用户体验不好，单位ms
    addTime: {
      type: [Number, String],
      default: 200,
    },
    // 瀑布流的列数，默认2，最高为5
    columnCount: {
      type: [Number, String],
      default: 2,
    },
    // 列与列的间隙，默认20
    columnGap: {
      type: [Number, String],
      default: 20,
    },
    // 左边和列表的间隙
    leftGap: {
      type: [Number, String],
      default: 0,
    },
    // 右边和列表的间隙
    rightGap: {
      type: [Number, String],
      default: 0,
    },
    // 是否显示滚动条，仅nvue生效
    showScrollbar: {
      type: [Boolean],
      default: false,
    },
    // 列宽，nvue生效
    columnWidth: {
      type: [Number, String],
      default: 'auto',
    },
    // 瀑布流的宽度，nvue生效
    width: {
      type: [Number, String],
      default: '',
    },
    // 瀑布流的高度，nvue生效
    height: {
      type: [Number, String],
      default: '',
    },
  },
  // #ifdef MP-WEIXIN
  // 将自定义节点设置成虚拟的（去掉自定义组件包裹层），更加接近Vue组件的表现，能更好的使用flex属性
  options: {
    virtualHost: true,
    multipleSlots: true,
  },
  // #endif
  data() {
    return {
      // 临时列表
      tempList: [],
    }
  },
  created() {
    // #ifdef MP-WEIXIN
    this.$emit('update:waterfall-data', {
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      list5: [],
    })
    // #endif
    // #ifndef MP-WEIXIN
    for (let i = 0; i < 5; i++) {
      this.waterfallData[`list${i + 1}`] = []
    }
    // #endif
  },
  computed: {
    // 破坏value变量引用，否则数据会保持不变
    copyValue() {
      // #ifdef VUE2
      return deepClone(this.value)
      // #endif
      // #ifdef VUE3
      return deepClone(this.modelValue)
      // #endif
    },
    columnNum() {
      return this.columnCount <= 0 ? 0 : this.columnCount >= 5 ? 5 : this.columnCount
    },
    gapLeftStyle() {
      const style = {}
      style.width = addUnit(this.leftGap)
      return style
    },
    gapRightStyle() {
      const style = {}
      style.width = addUnit(this.rightGap)
      return style
    },
    gapCenterStyle() {
      const style = {}
      style.width = addUnit(this.columnGap)
      return style
    },
    nvueWaterfallStyle() {
      const style = {}
      if (this.width != 0) style.width = addUnit(this.width)
      if (this.height != 0) style.height = addUnit(this.height)
      // 如果没有定义列表高度，则默认使用屏幕高度
      if (!style.width) style.width = addUnit(sys().windowWidth, 'px')
      if (!style.height) style.height = addUnit(sys().windowHeight, 'px')
      return deepMerge(style, addStyle(this.customStyle))
    },
  },
  watch: {
    copyValue(nVal, oVal) {
      // #ifndef APP-NVUE
      if (nVal.length != 0) {
        // 取出数组发生变化的部分
        let startIndex = Array.isArray(oVal) && oVal.length > 0 ? oVal.length : 0
        // 拼接原有数据
        this.tempList = this.tempList.concat(deepClone(nVal.slice(startIndex)))
        this.splitData()
      }
      // #endif
    },
  },
  mounted() {
    // #ifndef APP-NVUE
    this.tempList = deepClone(this.copyValue)
    this.splitData()
    // #endif
  },
  methods: {
    // 重置瀑布流数据
    refresh() {
      // #ifdef VUE2
      this.$emit('input', [])
      // #endif
      // #ifdef VUE3
      this.$emit('update:modelValue', [])
      // #endif
      // #ifdef MP-WEIXIN
      this.$emit('update:waterfall-data', {
        list1: [],
        list2: [],
        list3: [],
        list4: [],
        list5: [],
      })
      // #endif
      // #ifndef MP-WEIXIN
      for (let i = 0; i < 5; i++) {
        this.waterfallData[`list${i + 1}`] = []
      }
      // #endif
      this.tempList = []
    },
    // 更新瀑布流视图
    renew() {
      // #ifdef MP-WEIXIN
      this.$emit('update:waterfall-data', { list1: [], list2: [], list3: [], list4: [], list5: [] })
      // #endif
      // #ifndef MP-WEIXIN
      for (let i = 0; i < 5; i++) {
        this.waterfallData[`list${i + 1}`] = []
      }
      // #endif
      this.tempList = deepClone(this.copyValue)
      this.splitData()
    },
    addItem(addData) {
      // #ifdef MP-WEIXIN
      this.$emit('update:waterfall-data', { ...this.waterfallData, [addData.name]: [...this.waterfallData[addData.name], addData.value] })
      // #endif
      // #ifndef MP-WEIXIN
      this.waterfallData[addData.name].push(addData.value)
      // #endif
    },
    // 滚动到底部触发事件
    scrolltolower(e) {
      sleep(30).then(() => {
        this.$emit('scrolltolower')
      })
    },
    $uvGetRect(selector, all) {
      return new Promise((resolve) => {
        uni
          .createSelectorQuery()
          .in(this)
          [all ? 'selectAll' : 'select'](selector)
          .boundingClientRect((rect) => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect)
            }
            if (!all && rect) {
              resolve(rect)
            }
          })
          .exec()
      })
    },
    // 拆分数据
    async splitData() {
      let rectArr = []
      let emitList = {}
      if (!this.tempList.length) return
      for (let i = 1; i <= this.columnNum; i++) {
        const rect = await this.$uvGetRect(`#benben-waterfall-${i}`)
        rectArr.push({ ...rect, name: i })
      }
      let item = this.tempList[0]
      // 因为经过上面两个await节点查询和定时器，数组有可能会变成空[]，导致item的值为undefined
      // 解决多次快速滚动会导致数据乱的问题
      if (!item) return
      const minCol = this.getMin(rectArr)
      item.width = minCol.width
      // 列宽可能使用的到
      this.addItem({ name: `list${minCol.name}`, value: item })
      // 移除临时数组中已处理的数据
      this.tempList.splice(0, 1)
      // 如果还有数据则继续执行
      if (this.tempList.length) {
        let _timeout = +this.addTime
        // 部分平台在延时较短的情况会出现BUG
        // #ifdef MP-BAIDU
        _timeout = _timeout < 200 ? 200 : _timeout
        // #endif
        await sleep(_timeout)
        this.splitData()
      } else {
        this.$emit('finish')
      }
    },
    getMin(arr) {
      let result = null
      const filter = arr.filter((item) => item.height == 0)
      if (!filter.length) {
        result = arr.reduce((min, current) => {
          return current['height'] < min['height'] ? current : min
        }, arr[0])
      } else {
        let newArr = []
        arr.map((item, index) => {
          newArr.push({ len: this.waterfallData[`list${index + 1}`].length, item: item })
        })
        const minLen = Math.min.apply(
          Math,
          newArr.map((item) => {
            return item.len
          })
        )
        try {
          const { item } = newArr.find((item) => item.len == minLen && item.item.height == 0)
          result = item
        } catch (e) {
          const { item } = newArr.find((item) => item.item.height == 0)
          result = item
        }
      }
      return result
    },
    // 清空数据列表
    async clear() {
      // 清除数据
      for (let i = 0; i < 5; i++) {
        this.waterfallData[`list${i + 1}`] = []
      }
      // #ifdef VUE2
      this.$emit('input', [])
      // #endif
      // #ifdef VUE3
      this.$emit('update:modelValue', [])
      // #endif
      this.tempList = []
      await sleep(300)
      this.$emit('clear')
    },
    // 清除指定的某一条数据，根据id来实现
    remove(id) {
      let index = -1
      // 删除组件数据
      for (let i = 1; i <= this.columnCount; i++) {
        index = this.waterfallData[`list${i}`].findIndex((item) => item[this.idKey] == id)
        if (index != -1) {
          // #ifdef MP-WEIXIN
          let list = deepClone(this.waterfallData[`list${i}`])
          list.splice(index, 1)
          this.$emit('update:waterfall-data', { ...this.waterfallData, [`list${i}`]: list })
          // #endif
          // #ifndef MP-WEIXIN
          this.waterfallData[`list${i}`].splice(index, 1)
          // #endif
        }
      }
      // 同时删除父组件对应的数据
      // #ifdef VUE2
      index = this.value.findIndex((item) => item[this.idKey] == id)
      if (index != -1) this.$emit('input', this.value.splice(index, 1))
      // #endif
      // #ifdef VUE3
      index = this.modelValue.findIndex((item) => item[this.idKey] == id)
      if (index != -1) this.$emit('update:modelValue', this.modelValue.splice(index, 1))
      // #endif
      this.$emit('remove', id)
    },
  },
}
</script>
<style lang="scss" scoped>
.benben-waterfall {
  display: flex;
  align-items: flex-start;
  &__column {
    display: flex;
    flex-direction: column;
    flex: 1;
    // #ifndef APP-NVUE
    height: auto;
    // #endif
  }
}
</style>
