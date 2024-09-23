<template>
  <view class="benben-image-upload" @click="clickEvent">
    <slot />
  </view>
</template>
<script>
import i18nConfig from '@/locales';
import UploadFiles from '@/utils/upload-image';
/*  @property  {String} imgiId            图片id    选填填项
    @property  {String} path            图片路径    必填项
    @property  {Boolean} isCropping     是否开启裁剪模式   false
    @property  {Boolean} isShowClean     是否显示删除图标   false
    @property  {function} update-success  上传成功回调
    */
// isShowClean 为true 时  slot 中必须有一个data-type="clean"的 text 标签
// <text  data-type="clean" class='fu-iconfont2 position-absolute'>&#xE8E7;</text>
export default {
  name: 'benben-image-upload',
  props: {
    isShowClean: {
      type: [Boolean],
      default: false,
    },
    isCropping: {
      type: [Boolean],
      default: false,
    },
    uploadLoading: {
      type: [Boolean],
      default: false,
    },
    path: {
      type: String,
      default: '',
    },
    imgiId: {
      type: [String, Number],
      default: '',
    },
  },
  data: () => ({
    uploading: false,
  }),
  computed: {},
  //监听imgIds
  watch: {},
  methods: {
    clickEvent(e) {
      // #ifndef MP-WEIXIN
      if (this.isShowClean && e.target.dataset.type == 'clean') {
        this.$emit('update:img-id', '')
        this.$emit('update:path', '')
        return
      }
      // #endif
      // #ifdef MP-WEIXIN
      if (this.isShowClean && e._relatedInfo.anchorTargetText) {
        this.$emit('update:img-id', '')
        this.$emit('update:path', '')
        return
      }
      // #endif
      if (this.isShowClean && this.path) {
        uni.previewImage({
          current: this.path,
          urls: [this.path],
        })
        return
      }
      if (!this.isCropping) this.soloChooseImage()
      else this.croppingUploadImage()
    },
    UploadImage(tempFiles) {
      this.$emit('update:upload-loading', true)
      // 开始上传
      this.uploading = true
      new UploadFiles(tempFiles, {
        complete: (res) => {
          this.uploading = false
          this.$emit('update:img-id', res[0].id)
          this.$emit('update:path', res[0].path)
          this.$emit('update:upload-loading', false)
          this.$emit('update-success', res[0])
        },
      })
    },
    soloChooseImage() {
      if (this.uploading) return
      // 从相册中选择图片
      uni.chooseImage({
        count: 1, // 默认3
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        success: (res) => this.UploadImage(res.tempFiles),
      })
    },
    imageCroppingCuccess() {
      uni.$once('image-cropping-success', (file) => {
        if (!file) return
        this.UploadImage([file])
      })
    },
    //裁剪图片上传
    croppingUploadImage(id, path, obj, obj1, fnName = false) {
      let itemList = this.path
        ? [i18nConfig.global.t('修改头像'), i18nConfig.global.t('拍照'), i18nConfig.global.t('从手机相册选择')]
        : [i18nConfig.global.t('拍照'), i18nConfig.global.t('从手机相册选择')]
      uni.showActionSheet({
        itemList: itemList,
        success: (res) => {
          if (res.tapIndex == 0 && this.path) {
            uni.navigateTo({
              url: '/pages/benben-built-in/image-cropping/image-cropping?rectHeight=200&rectWidth=200&&myImgUrl=' + this.path,
              animationDuration: 0,
            })
            this.imageCroppingCuccess()
          }
          if ((res.tapIndex == 1 && this.path) || (res.tapIndex == 0 && !this.path)) {
            uni.chooseImage({
              count: 1,
              sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
              success: (res) => {
                // 跳转到图片裁切页面
                uni.navigateTo({
                  url: `/pages/benben-built-in/image-cropping/image-cropping?rectHeight=200&rectWidth=200&fileType=${res.tempFiles[0].type}&myImgUrl=${res.tempFilePaths[0]}`,
                  animationDuration: 0,
                })
                this.imageCroppingCuccess()
              },
            })
          }
          if ((res.tapIndex == 2 && this.path) || (res.tapIndex == 1 && !this.path)) {
            uni.chooseImage({
              count: 1,
              sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
              success: (res) => {
                // 跳转到图片裁切页面
                uni.navigateTo({
                  url: `/pages/benben-built-in/image-cropping/image-cropping?rectHeight=200&rectWidth=200&fileType=${res.tempFiles[0].type}&myImgUrl=${res.tempFilePaths[0]}`,
                  animationDuration: 0,
                })
                this.imageCroppingCuccess()
              },
            })
          }
        },
        fail: function (res) {
          console.log(res.errMsg)
        },
      })
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
<style lang="scss">
.benben-image-upload {
  line-height: initial;
}
</style>
