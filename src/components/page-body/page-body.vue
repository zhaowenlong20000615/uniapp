<template>
  <view :style="themeColor">
    <slot></slot>
    <benben-loading :text-color="textColor" :loadingning="loading" :type="loadingType" :loading-text="loadingText"
      :background-color="backgroundColor" :text-flicker="true" :size="loadingSize" :text-size="textSize"
      :fixed="true"></benben-loading>
    <!-- #ifdef APP-PLUS -->
    <!-- <fu-notwork @retry="retry"></fu-notwork> -->
    <!-- #endif -->
  </view>
</template>
<script>
import { useSystemStore } from '@/store/model/system';
import pageLoadingConfig from '../benben-loading/page-loading-config.json';
import pageLoadingProps from '../benben-loading/page-loading-props.js';
export default {
  name: 'page-body',
  // #ifdef MP-WEIXIN
  // 将自定义节点设置成虚拟的（去掉自定义组件包裹层），更加接近Vue组件的表现，能更好的使用flex属性
  // options: {
  // virtualHost: true,
  // multipleSlots: true,
  //   styleIsolation: 'apply-shared',
  // },
  // #endif
  props: {
    zIndex: {
      type: [Number, String],
      default: pageLoadingConfig?.zIndex || 100,
    },
    loading: {
      type: [Boolean],
      default: false,
    },
    loadingType: {
      type: [String],
      default: pageLoadingConfig?.defaultLoadingType || 'loading0',
    },
    loadingSize: {
      type: [String, Number],
      default: pageLoadingConfig?.size || 120,
    },
    textSize: {
      type: [Number, String],
      default: pageLoadingConfig?.textSize || 24,
    },
    textColor: {
      type: String,
      default: pageLoadingConfig?.textColor || '#3375f6',
    },
    backgroundColor: {
      type: String,
      default: pageLoadingConfig?.backgroundColor || '#FFF',
    },
    ...pageLoadingProps,
  },
  data() {
    return {}
  },
  computed: {
    themeColor() {
      return useSystemStore().getThemeColor
    },
  },
  created() { },
  watch: {},
  mounted() { },
  methods: {
    retry() { },
  },
}
</script>

<style scoped lang="scss"></style>
