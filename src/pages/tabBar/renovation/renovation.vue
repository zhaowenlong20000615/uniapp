<template>
  <view :style="pageInfo.pageConfig.style" class="renovation-page">
    <template v-for="item in pageInfo.componentList">
      <shop-advertisement
        ref="pageComponent"
        :key="item.elementId"
        v-if="item.type == 'shop-advertisement'"
        :config="item.config"
      ></shop-advertisement>
      <shop-homg-head ref="pageComponent" :key="item.elementId" v-else-if="item.type == 'shop-homg-head'" :config="item.config"></shop-homg-head>
      <shop-brand-store
        ref="pageComponent"
        :key="item.elementId"
        v-else-if="item.type == 'shop-brand-store'"
        :config="item.config"
      ></shop-brand-store>
      <shop-goods-list ref="pageComponent" :key="item.elementId" v-else-if="item.type == 'shop-goods-list'" :config="item.config"></shop-goods-list>
      <shop-collective ref="pageComponent" :key="item.elementId" v-else-if="item.type == 'shop-collective'" :config="item.config"></shop-collective>
      <renovation-title
        ref="pageComponent"
        :key="item.elementId"
        v-else-if="item.type == 'renovation-title'"
        :config="item.config"
      ></renovation-title>
      <shop-grid ref="pageComponent" :key="item.elementId" v-else-if="item.type == 'shop-grid'" :config="item.config"></shop-grid>
      <shop-homg-seach ref="pageComponent" :key="item.elementId" v-else-if="item.type == 'shop-homg-seach'" :config="item.config"></shop-homg-seach>
      <shop-killing ref="pageComponent" :key="item.elementId" v-else-if="item.type == 'shop-killing'" :config="item.config"></shop-killing>
      <shop-notice ref="pageComponent" :key="item.elementId" v-else-if="item.type == 'shop-notice'" :config="item.config"></shop-notice>
      <shop-recommend ref="pageComponent" :key="item.elementId" v-else-if="item.type == 'shop-recommend'" :config="item.config"></shop-recommend>
    </template>
  </view>
</template>
<script>
let componentFolders = require.context('./components/', true, /\.vue$/)
function JudgingComponentsPath(folderPath) {
  const folderNameRegExp = /\/([\w-]+)\/[\w-]+\.vue$/
  const fileNameRegExp = /([\w-]+)\.vue$/
  if (folderNameRegExp.test(folderPath) && fileNameRegExp.test(folderPath)) {
    // 匹配文件夹名称
    const folderName = folderPath.match(folderNameRegExp)[1]
    // 匹配文件名称
    const fileName = folderPath.match(fileNameRegExp)[1]
    // 判断文件夹名称和文件名称是否相同
    if (folderName === fileName) return true
    return false
  }
  return false
}
// 遍历获取的所有模块路径
let components = {}
componentFolders.keys().map((folderPath) => {
  if (JudgingComponentsPath(folderPath)) {
    let moduleDefault = componentFolders(folderPath).default
    components[moduleDefault.name] = moduleDefault
  }
})
import { API_VERSION } from '@/config'
export default {
  components: {
    ...components,
  },
  data() {
    return {
      componentList: [],
      isReady: false,
      activeElementId: '',
      pageInfo: {
        pageConfig: {},
        componentList: [],
      },
    }
  },
  watch: {},
  methods: {
    async getPageInfo() {
      let {
        data: { data, code, msg },
      } = await this.$api.get(`/${API_VERSION}/6545e2c30a41d`, { type: 'home' })
      if (code != 1) return this.$message.info(msg)
      if (!data.type) return this.$message.info('请先装修店铺')
      console.log(data)
      let pageInfo = JSON.parse(data.data)
      this.pageInfo = pageInfo
    },
  },
  onLoad(options) {
    this.getPageInfo()
  },
  onReady() {
    this.isReady = true
  },
  onShow() {
    if (!this.isReady) return
    this.$refs.pageComponent.map((component) => {
      if (component.showCallback) component.showCallback()
    })
  },
  onPageScroll(e) {},
  onPullDownRefresh() {
    this.$refs.pageComponent.map((component) => {
      if (component.refresh) component.refresh()
    })
  },
  onReachBottom() {
    this.$refs.pageComponent.map((component) => {
      if (component.pullUp) component.pullUp()
    })
  },
}
</script>
<style lang="scss" scoped>
.renovation-page {
  min-height: calc(100vh - var(--window-bottom));
  background-size: 100% auto;
  background-repeat: no-repeat;
}
.active-component {
  outline: 2px solid #1890ff;
  box-shadow: 0 0 10px 0 rgba(24, 144, 255, 0.3);
}
</style>
