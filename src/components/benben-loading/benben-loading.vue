<template>
  <view style="position: relative">
    <view
      class="benben-loading"
      v-if="loadingning"
      :class="{ fixed: fixed }"
      :style="{ zIndex: zIndex, position: soltDom ? 'absolute' : 'relative' }"
    >
      <view class="benben-loading-bag" :style="{ opacity: opacity, backgroundColor: backgroundColor }"></view>
      <view class="benben-loading-body">
        <view class="loafding" :style="{ width: size + 'rpx', height: size + 'rpx' }">
          <loading0 v-if="type == 'loading0'" :color="loadingIconColor" :size="size" />
          <loading1 v-if="type == 'loading1'" :color="loadingIconColor" :size="size" />
          <loading2 v-else-if="type == 'loading2'" :color="loadingIconColor" :size="size" />
          <loading3 v-else-if="type == 'loading3'" :color="loadingIconColor" :size="size" />
          <loading4 v-else-if="type == 'loading4'" :color="loadingIconColor" :size="size" />
          <loading5 v-else-if="type == 'loading5'" :color="loadingIconColor" :size="size" />
          <loading6 v-else-if="type == 'loading6'" :color="loadingIconColor" :size="size" />
          <loading7 v-else-if="type == 'loading7'" :color="loadingIconColor" :size="size" />
          <loading8 v-else-if="type == 'loading8'" :color="loadingIconColor" :size="size" />
          <loading9 v-else-if="type == 'loading9'" :color="loadingIconColor" :size="size" />
          <loading10 v-else-if="type == 'loading10'" :color="loadingIconColor" :size="size" />
          <loading11 v-else-if="type == 'loading11'" :color="loadingIconColor" :size="size" />
        </view>
        <view class="loafdingText" :style="{ fontSize: textSize + 'rpx', color: textColor }">
          <view v-if="!textFlicker">{{ loadingText }}</view>
          <view class="textFlicker" v-if="textFlicker">
            <text v-for="(text, i) in loadingText" :key="i" class="letter" :style="{ animationDelay: 0.48 + i * 0.12 + 's' }">{{ text }}</text>
          </view>
        </view>
      </view>
    </view>
    <view class="benben-loadingSole">
      <slot></slot>
    </view>
  </view>
</template>

<script>
/*
		@property  {Boolean} loadingning      加载状态     true，
		@property  {Boolean} fixed            固定定位     false，
		@property  {Number} zIndex            层级        false，
		@property  {Number} opacity          背景透明度     1
		@property  {String} backgroundColor  背景颜色       #fff
		@property  {String} loadingText      加载文字提示   加载中....
		@property  {String} textColor        加载文字颜色   #3375f6
		@property  {Number} textSize         加载文字大小   30
		@property  {Boolean} textFlicker     加载文字闪动   true
		@property  {String} type             加载图类型     loading1
		@property  {Number} size             加载图大小     120
    */
import loading0 from './loadingBack/loading0.vue'
import loading1 from './loadingBack/loading1.vue'
import loading2 from './loadingBack/loading2.vue'
import loading3 from './loadingBack/loading3.vue'
import loading4 from './loadingBack/loading4.vue'
import loading5 from './loadingBack/loading5.vue'
import loading6 from './loadingBack/loading6.vue'
import loading7 from './loadingBack/loading7.vue'
import loading8 from './loadingBack/loading8.vue'
import loading9 from './loadingBack/loading9.vue'
import loading10 from './loadingBack/loading10.vue'
import loading11 from './loadingBack/loading11.vue'
import pageLoadingConfig from './page-loading-config.json'
import pageLoadingProps from './page-loading-props.js'

export default {
  name: 'benben-loading',
  props: {
    loadingning: {
      type: Boolean,
      default: true,
    },
    fixed: {
      type: Boolean,
      default: false,
    },
    zIndex: {
      type: [Number, String],
      default: pageLoadingConfig?.zIndex || 100,
    },
    textColor: {
      type: String,
      default: pageLoadingConfig?.textColor || '#3375f6',
    },
    textSize: {
      type: [Number, String],
      default: pageLoadingConfig?.textSize || 24,
    },
    textFlicker: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: pageLoadingConfig?.defaultLoadingType || 'loading0',
    },
    opacity: {
      type: Number,
      default: 1,
    },
    backgroundColor: {
      type: String,
      default: pageLoadingConfig?.backgroundColor || '#FFF',
    },
    size: {
      type: [Number, String],
      default: pageLoadingConfig?.size || 120,
    },
    ...pageLoadingProps,
  },
  data() {
    return {
      soltDom: false,
    }
  },
  components: {
    loading0,
    loading1,
    loading2,
    loading3,
    loading4,
    loading5,
    loading6,
    loading7,
    loading8,
    loading9,
    loading10,
    loading11,
  },
  computed: {
    loadingIconColor() {
      if (pageLoadingConfig?.loadingconfig.hasOwnProperty(this.type)) {
        return pageLoadingConfig.loadingconfig[this.type]
      }
      return {}
    },
  },
  mounted() {
    this.soltDom = this.$slots?.default?.length
  },
}
</script>

<style lang="scss" scoped>
.benben-loading {
  &.fixed {
    position: fixed !important;
    z-index: 10000;
    left: 0;
    top: 0;
  }
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .benben-loading-bag {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: #fff;
  }
  .benben-loading-body {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .loafdingText {
      font-size: 30rpx;
      line-height: 60rpx;
      text-align: center;
      .textFlicker {
        .letter {
          animation-name: loadingF;
          animation-duration: 1.6s;
          animation-iteration-count: infinite;
          animation-direction: linear;
        }
      }
    }
  }
}
.loafding {
  position: relative;
}

@keyframes loadingF {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}
</style>
