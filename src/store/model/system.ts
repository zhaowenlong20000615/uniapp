import { cartNumIndex, tabbarConfig, themeColorConfig } from '@/config'
import i18nConfig from '@/locales'
import Message from '@/utils/message'
import { defineStore } from 'pinia'

export const useSystemStore = defineStore('system', {
  state: () => ({
    StatusBar: 0,
    CustomBar: 0,
    StatusBarRpx: 0,
    CustomBarRpx: 0,
    unitRatio: 0,
    bottomSafeArea: 0,
    bottomSafeAreaRpx: 0,
    cartNum: 0,
    appTabBarType: 0,
    appRubbishCacheSize: '0B',
    appVersion: '',
    themeType: 0 //主题色类型
  }),

  actions: {
    initApp() {
      this.initSafetyData()
    },

    initSafetyData() {
      uni.getSystemInfo({
        success: (e) => {
          // #ifndef MP
          this.StatusBar = e.statusBarHeight ?? 0
          if (e.platform == 'android') {
            this.CustomBar = e.statusBarHeight ?? 0 + 50
          } else {
            this.CustomBar = e.statusBarHeight ?? 0 + 45
          }
          // #endif
          // #ifdef MP-WEIXIN
          this.StatusBar = e.statusBarHeight ?? 0
          const custom = uni.getMenuButtonBoundingClientRect()
          this.CustomBar = custom.bottom + custom.top - e.statusBarHeight!
          // #endif
          // #ifdef MP-ALIPAY
          this.StatusBar = e.statusBarHeight ?? 0 //状态栏高度(px)
          this.CustomBar = e.statusBarHeight! + e.titleBarHeight! //整个标题栏高度(px)
          // #endif
          const unitRatio = 750 / uni.getSystemInfoSync().windowWidth
          this.StatusBarRpx = this.StatusBar * unitRatio //状态栏高度(rpx)
          this.CustomBarRpx = this.CustomBar * unitRatio //整个标题栏高度(rpx)
          this.unitRatio = unitRatio
          this.bottomSafeArea = e.safeAreaInsets?.bottom ?? 0
          this.bottomSafeAreaRpx = this.bottomSafeArea * unitRatio
        }
      })
    },

    setBadge(num: number) {
      this.cartNum = num
      if (num) {
        if (Number(num) > 99) {
          uni.setTabBarBadge({
            index: cartNumIndex,
            text: '99+'
          })
        } else {
          uni.setTabBarBadge({
            index: cartNumIndex,
            text: num + ''
          })
        }
      } else {
        uni.removeTabBarBadge({
          index: cartNumIndex
        })
      }
    },

    // 设置tabBar类型
    setAppTabbarType(data: any) {
      let type = data.type ?? data
      this.appTabBarType = type || 0
      uni.setStorageSync('appTabBarType', type)
      for (let index = 0; index < tabbarConfig.listNum; index++) {
        let flag = tabbarConfig.roleTabBarShow[+type].find((item) => item.index == index)
        let tabBarOption = { index: index, visible: flag !== undefined }
        // if (flag && flag.ident) tabBarOption.text = global.i18n.t(flag.ident)
        uni.setTabBarItem(tabBarOption)
      }
    },

    appClearCache() {
      /* #ifdef APP-PLUS */
      let os = plus.os.name
      if (os == 'Android') {
        let main: any = plus.android.runtimeMainActivity()
        let sdRoot = main.getCacheDir()
        let files = plus.android.invoke(sdRoot, 'listFiles')
        let len = files.length
        if (len == 0) {
          Message.info(i18nConfig.global.t('缓存清理完成!'))
          this.appRubbishCacheSize = '0B'
        }
        for (let i = 0; i < len; i++) {
          let filePath = '' + files[i] // 没有找到合适的方法获取路径，这样写可以转成文件路径
          plus.io.resolveLocalFileSystemURL(
            filePath,
            (entry) => {
              if (entry.isDirectory) {
                entry.removeRecursively(
                  () => {
                    //递归删除其下的所有文件及子目录
                    Message.info(i18nConfig.global.t('缓存清理完成!'))
                    this.getAppCache() // 重新计算缓存
                  },
                  function (e) {
                    console.log(e.message)
                  }
                )
              } else {
                entry.remove()
              }
            },
            function () {
              console.log('文件路径读取失败')
            }
          )
        }
      } else {
        // ios暂时未找到清理缓存的方法，以下是官方提供的方法，但是无效，会报错
        ;(plus as any).cache.clear(() => {
          Message.info(i18nConfig.global.t('缓存清理完成!'))
          this.getAppCache() // 重新计算缓存
        })
      }
      /* #endif */
    },

    getAppCache() {
      /* #ifdef APP-PLUS */
      ;(plus as any).cache.calculate((size: string) => {
        let sizeCache = parseInt(size)
        console.log('缓存大小：' + sizeCache)
        if (sizeCache == 0) {
          this.appRubbishCacheSize = '0B'
        } else if (sizeCache < 1024) {
          this.appRubbishCacheSize = sizeCache + 'B'
        } else if (sizeCache < 1048576) {
          this.appRubbishCacheSize = (sizeCache / 1024).toFixed(2) + 'KB'
        } else if (sizeCache < 1073741824) {
          this.appRubbishCacheSize = (sizeCache / 1048576).toFixed(2) + 'MB'
        } else {
          this.appRubbishCacheSize = (sizeCache / 1073741824).toFixed(2) + 'GB'
        }
      })
      /* #endif */
    },

    //获取app版本号
    getAppVersion() {
      /* #ifdef APP-PLUS */
      plus.runtime.getProperty(plus.runtime.appid!, (widgetInfo) => {
        this.appVersion = 'V' + widgetInfo.version
      })
      /* #endif */
    }
  },

  getters: {
    getThemeColor(state) {
      let projectConfig = themeColorConfig[state.themeType]
      let themeColor = ''
      projectConfig.colorConfig.map((item, index) => {
        themeColor += `--benbenFontColor${index}:${item};`
      })
      projectConfig.bgColorConfig.map((item, index) => {
        themeColor += `--benbenbgColor${index}:${item};`
      })
      projectConfig.bdColorConfig.map((item, index) => {
        themeColor += `--benbenbdColor${index}:${item};`
      })
      return themeColor
    }
  }
})
