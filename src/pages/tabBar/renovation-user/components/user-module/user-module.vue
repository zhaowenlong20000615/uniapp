<template>
  <view
    class="user-module"
    :class="moduleClass"
    :style="{
      marginLeft: config.backgroundMargin + 'rpx',
      marginRight: config.backgroundMargin + 'rpx',
      backgroundColor: config.backgroundColor,
      marginBottom: config.pageMargin + 'rpx',
    }"
  >
    <view @click="handleModuleItem(item)" v-for="(item, i) in pathList" class="module-item">
      <image :src="item.icon" />
      <view class="module-title">
        <text>{{ item.name || '未设置' }}</text>
        <text class="fu-iconfont2 right-icon">&#xe78e;</text>
      </view>
    </view>
  </view>
</template>
<script>
import { API_VERSION } from '@/config'
import pathList from '../../path.json'
export default {
  name: 'user-module',
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      infoApi: `/${API_VERSION}/63732dbecbc14`,
      kefuApi: `/${API_VERSION}/64897f6fd5486`,
      settleStatus: 0,
    }
  },
  computed: {
    moduleClass() {
      return ` ${this.config.mode} ${this.config.isRadius ? 'shop-radius' : ''} `
    },
    pathList() {
      return this.config.pathList.map((item) => {
        if (item.path == '5') {
          let name = item.name
          switch (this.settleStatus) {
            case 1:
              name = '待认证审核'
              break
            case 5:
              name = '我的店铺'
              break
            case 3:
              name = '认证审核失败 '
              break
            case 4:
              name = '待财务审核 '
              break
            case 6:
              name = '财务审核失败 '
              break
            case 2:
              name = '待提交财务凭证 '
              break
          }
          return { ...item, name }
        } else {
          return item
        }
      })
    },
  },
  watch: {},
  mounted() {},
  created() {
    this.showCallback()
  },
  methods: {
    handleModuleItem(item) {
      let handleItem = pathList.find((val) => val.pageType == item.path)
      if (!handleItem) return
      switch (handleItem.pageType) {
        case '5':
          switch (this.settleStatus) {
            case 0:
              this.$urouter.navigateTo('/pages/wd/settlementMerchant/settlementMerchant')
              break
            case 5:
              this.$message.info('请通过链接下载商家端app')
              break
            default:
              this.$urouter.navigateTo('/pages/wd/reviewSubmit/reviewSubmit')
              break
          }
          break
        case '10':
          this.getKefuFunc()
          break
        default:
          this.$urouter.navigateTo(handleItem.path)
          break
      }
    },
    showCallback() {
      if (this.isLogin) {
        this.getInfo()
      }
    },
    refresh() {
      if (this.isLogin) {
        this.getInfo()
      }
    },
    //获取客服链接
    async getKefuFunc() {
      let {
        data: { code, data },
      } = await this.$api.get(this.kefuApi, {
        store_id: '1',
      })
      if (code != 1) return this.$message.info(msg)
      this.dynamicJump(data.chat_url)
    },
    async getInfo() {
      try {
        let {
          data: { data, code, msg },
        } = await this.$api.get(this.infoApi)
        if (code != 1) return
        this.settleStatus = data
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped lang="scss">
.right-icon {
  font-size: 24rpx;
  color: #999;
  text {
    font-size: 24rpx;
  }
}
.user-module {
  display: flex;
  flex-wrap: wrap;
  &.list {
    padding: 0 24rpx;
    flex-direction: column;
    .module-item {
      display: flex;
      width: 100%;
      align-items: center;
      font-size: 24rpx;
      height: 88rpx;
      image {
        width: 40rpx;
        height: 40rpx;
        margin-right: 15rpx;
      }
      .module-title {
        display: flex;
        align-items: center;
        flex: 1;
        position: relative;
        justify-content: space-between;
        height: 100%;
        &::after {
          @include bottom-line(#eeeeee);
        }
      }
      &:last-child .module-title::after {
        display: none;
      }
    }
  }
  &.grid {
    padding: 24rpx 0;
    .module-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 24rpx;
      padding: 10rpx 0;
      width: 25%;
      image {
        width: 60rpx;
        height: 60rpx;
        margin-bottom: 10rpx;
      }
      .module-title {
        .right-icon {
          display: none;
        }
      }
    }
  }
}
</style>
