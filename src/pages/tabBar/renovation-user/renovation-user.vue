<template>
  <view :style="pageInfo.pageConfig.style" class="renovation-page">
    <template v-for="item in pageInfo.componentList">
      <user-browsing
        :user-info="userInfo"
        ref="pageComponent"
        :key="item.elementId"
        v-if="item.type == 'user-browsing'"
        :config="item.config"
      ></user-browsing>
      <user-info
        ref="pageComponent"
        :user-info="userInfo"
        :key="item.elementId"
        v-else-if="item.type == 'user-info'"
        :config="item.config"
      ></user-info>
      <user-module ref="pageComponent" :key="item.elementId" v-else-if="item.type == 'user-module'" :config="item.config"></user-module>
      <user-order ref="pageComponent" :key="item.elementId" v-else-if="item.type == 'user-order'" :config="item.config"></user-order>
      <renovation-title
        ref="pageComponent"
        :key="item.elementId"
        v-else-if="item.type == 'renovation-title'"
        :config="item.config"
      ></renovation-title>
      <user-wallet
        :user-info="userInfo"
        ref="pageComponent"
        :key="item.elementId"
        v-else-if="item.type == 'user-wallet'"
        :config="item.config"
      ></user-wallet>
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
      isReady: false,
      componentList: [],
      userInfo: {},
      browsing: {},
      activeElementId: '',
      userApi: `/${API_VERSION}/5c78c4772da97`, //获取会员信息
      pageInfo: {
        pageConfig: {},
        componentList: [],
      },
    }
  },
  watch: {},
  computed: {
    isLogin() {
      return this.$store.state.token == '' ? false : true
    },
  },
  methods: {
    getData() {
      if (this.isLogin) {
        this.getUserInfo()
      }
    },
    async getUserInfo() {
      try {
        let {
          data: { data, code, msg },
        } = await this.$api.get(this.userApi)
        if (code != 1) return (this.messageNum = 0)
        this.userInfo = data
      } catch (error) {
        console.log(error)
      }
    },
    async getPageInfo() {
      let {
        data: { data, code, msg },
      } = await this.$api.get(`/${API_VERSION}/6545e2c30a41d`, { type: 'user' })
      if (code != 1) return this.$message.info(msg)
      if (!data.type) return this.$message.info('请先装修店铺')
      console.log(data)
      let pageInfo = JSON.parse(data.data)
      this.pageInfo = pageInfo
    },
  },
  onLoad(options) {
    this.getPageInfo()
    this.getData()
  },
  onReady() {
    this.isReady = true
  },
  onShow() {
    if (!this.isReady) return
    this.getData()
    this.$refs.pageComponent.map((component) => {
      if (component.showCallback) component.showCallback()
    })
  },
  onPageScroll(e) {},
  onPullDownRefresh() {
    console.log('aaa')
    if (!this.isLogin) {
      uni.stopPullDownRefresh()
    }
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
