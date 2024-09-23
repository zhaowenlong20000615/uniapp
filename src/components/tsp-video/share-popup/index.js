let uniShowToast = (msg) => {
  uni.showToast({
    title: msg,
    icon: 'none',
  })
}
import { benbenImageSrcResolution } from '@/common/utils/utils.js';
export default {
  props: {
    info: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      ctx: null,
      previewImageUrl: '',
      shareList: [
        // #ifdef MP-WEIXIN||APP-PLUS-NVUE
        {
          title: '微信好友',
          icon: benbenImageSrcResolution('weixin.png', 'global'),
          type: 'weixin',
          scene: 'WXSceneSession',
        },
        // #endif
        // #ifdef APP-PLUS-NVUE
        {
          title: '朋友圈',
          icon: benbenImageSrcResolution('pengyouquan.png', 'global'),
          type: 'weixin',
          scene: 'WXSenceTimeline',
        },
        // #endif
        {
          title: '复制链接',
          icon: benbenImageSrcResolution('copy.png', 'global'),
          type: 'link',
        },
        {
          title: '海报',
          icon: benbenImageSrcResolution('poster.png', 'global'),
          type: 'image',
        },
      ],
      sharePopup: false,
      posterPopup: false,
    }
  },
  computed: {
    title() {
      if (!this.info.title) {
        return ''
      }
      if (this.info.title.length < 24) {
        return this.info.title
      }
      if (this.info.title) {
        return this.info.title.substring(0, 24) + '...'
      }
    }
  },

  methods: {
    success(e) {
      uni.hideLoading()
      this.previewImageUrl = e
    },
    fail(error) {
      console.log('fail', error);
      uni.hideLoading()
      uniShowToast('海报生成失败')
    },
    // 图片点击放大
    previewImage(url) {
      uni.previewImage({
        current: url,
        urls: [url],
      })
    },
    // 打开弹窗
    open() {
      this.sharePopup = true
      this.previewImageUrl = ''
    },
    // 关闭弹窗
    close() {
      this.sharePopup = false
      this.posterPopup = false
      this.previewImageUrl = ''
    },

    // 分享
    share(item) {
      let _scene = ''
      let _provider = item.type
      let _type = 0
      switch (_provider) {
        case 'weixin':
          _scene = item.scene
          uni.share({
            provider: _provider,
            type: _type,
            title: this.info.title,
            scene: _scene,
            // summary: this.info.summary,
            href: this.info.href,
            imageUrl: this.info.coverImg,
            success: (res) => {
              this.close()
            },
            fail: (err) => {
              console.log('分享失败', err)
              uniShowToast('分享失败')
            },
          })
          break
        case 'link':
          console.log(123456);
          uni.setClipboardData({
            data: this.info.href,
            success: () => {
              uniShowToast('复制成功')
              this.close()
            },
          })
          break
        case 'image':
          // this.createPoster()
          this.previewImageUrl = ''
          this.posterPopup = true
          uni.showLoading({
            title: '生成中...',
            mask: true
          })
          break
      }
    },
    // 保存图片
    saveImage() {
      console.log(123456);
      if (!this.previewImageUrl) return
      uni.saveImageToPhotosAlbum({
        filePath: this.previewImageUrl,
        success: () => {
          uniShowToast('保存成功')
          this.close()
        },
        fail: (e) => {
          console.log(e);
        }
      })
    },

  },
  created() {
  },
}
