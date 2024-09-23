import { HOME_PAGE_URL, LOGIN_PAGE_URL, STATIC_URL, needLoginPages } from '@/config';
import i18nConfig from '@/locales';
import { useSystemStore } from '@/store/model/system';

export default {
  data() { return { STATIC_URL: STATIC_URL } },
  computed: {
    i18n() {
      return i18nConfig.global.t('defVal');
    },
    StatusBarRpx() {
      return useSystemStore().StatusBarRpx
    },
    unitRatio() {
      return useSystemStore().unitRatio
    },
    bottomSafeAreaRpx() {
      return useSystemStore().bottomSafeAreaRpx
    },
    $t() {
      return (str) => i18nConfig.global.t(str)
    }
  },
  methods: {
    handleJumpDiy(e) {
      const target = e.currentTarget || e.target,
        url = target?.dataset.url || 'back',
        type = target?.dataset.type
      if (url == '' || url == '#') return

      switch (type) {
        case 'switchTab':
          uni.switchTab({ url })
          break
        case 'redirectTo':
          uni.redirectTo({ url })
          break
        case 'reLaunch':
          uni.reLaunch({ url })
          break
        case 'navigateTo':
          uni.navigateTo({ url })
          break
        case 'back':
          uni.navigateBack({ delta: 1 })
          break
        default:
          uni.navigateTo({ url })
          break
      }
    },

    in_array(type, str) {
      let arr = []
      // str 是否为字符串
      if (typeof str === 'string') arr = str.split(',')
      // str 是否为数组
      if (typeof str === 'object') arr = str
      let index = -1
      index = arr.findIndex((item) => type == item)
      if (index == -1) {
        return false
      }
      return true
    },

    // 画布生成图片
    painterGenerateImages(refName, showName) {
      return new Promise(async (resolve, reject) => {
        if (this[showName]) {
          Promise.resolve('')
          return
        }
        this[showName] = true
        uni.showLoading({
          mask: true,
        })
        setTimeout(() => {
          this.$refs[refName].canvasToTempFilePathSync({
            success: (res) => {
              uni.hideLoading()
              resolve(res.tempFilePath)
              this[showName] = false
            },
            fail(e) {
              this[showName] = false
              uni.hideLoading()
              reject(e)
            },
          })
        }, 300)
      })
    },


    // 页面抛出事件
    benbenThrowPageEvent(event, data) {
      uni.$emit(event, data)
    },

    //修改uniapi为promise类型
    syncUniApi(apiName, params) {
      return new Promise((resolve, reject) => {
        uni[apiName]({
          ...params,
          success: (res) => {
            resolve(res)
          },
          fail: (err) => {
            reject(err)
          },
        });
      })
    },

    // 跳转首页
    toHomeDiy() {
      const baseStore = useSystemStore()
      uni.switchTab({ url: HOME_PAGE_URL[baseStore.appTabBarType] })
    },


    // 动态跳转
    dynamicJump(url) {
      if (!url) return
      // 判断路径是否为网络路径
      if (/(http|https):\/\/([\w.]+\/?)\S*/.test(url)) {
        uni.navigateTo({
          url: `/pages/benben-built-in/web-view/index?webPath=${encodeURIComponent(url)}`
        })
      } else {
        uni.navigateTo({ url })
      }
    }

  }
}