<template>
  <view>
    <slot v-bind:fileList="fileList"></slot>
  </view>
</template>
<script>
import UploadImage from '@/common/utils/upload-image.js'
import { ACCEPT_PLATFORM, BenBenChooseFileKey, SERVER_TYPE } from '@/config'
// #ifdef APP-PLUS
//app端需引入插件市场中的BenBen-ChooseFile插件
// 链接地址 https://ext.dcloud.net.cn/plugin?id=9867
const fileModule = uni.requireNativePlugin('BenBen-ChooseFile')
// #endif
export default {
  name: 'benben-files-upload',
  props: {
    maxlength: {
      type: [String, Number],
      default: '1',
    },
    fileList: {
      type: Array,
      default: () => [],
    },
    fileType: {
      type: String,
      default: '',
    },
    isShowTips: {
      type: Boolean,
      default: false,
    },
    fileIds: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    uploading: false,
    fileIdArr: [],
  }),
  computed: {},
  //监听imgIds
  watch: {
    fileList: {
      handler(val) {
        let ids = ''
        if (SERVER_TYPE === 0) {
          // 环境为赛诸葛
          ids = JSON.stringify(val)
        } else {
          ids = val.map((item) => item.id).join(',')
        }
        this.$emit('update:file-ids', ids)
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    //点击删除
    delFile(index) {
      let fileList = JSON.parse(JSON.stringify(this.fileList))
      fileList.splice(index, 1)
      this.$emit('update:file-list', fileList)
    },
    //点击预览
    previewfile(index) {
      console.log('点击文件')
    },
    manyChooseFiles() {
      if (this.uploading) return
      let that = this
      if (+this.maxlength - this.fileList.length < 1)
        return this.$message.info(`${global.i18n.t('最多只能上传')}${this.maxlength}${global.i18n.t('个文件')}`)
      let flieTypes = {}
      let type = []
      let fileType = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.txt', '.mp3']
      if (this.fileType) {
        fileType = this.fileType.split(',')
      }
      if (ACCEPT_PLATFORM == 'IOS') {
        flieTypes = {
          '.pdf': 'com.adobe.pdf',
          '.doc': 'com.microsoft.word.doc',
          '.docx': 'com.microsoft.word.doc',
          '.xls': 'com.microsoft.excel.xls',
          '.xlsx': 'com.microsoft.excel.xls',
          '.ppt': 'com.microsoft.powerpoint.ppt',
          '.pptx': 'com.microsoft.powerpoint.ppt',
          '.txt': 'public.text',
          '.mp3': 'public.audio',
        }
      }
      if (ACCEPT_PLATFORM == 'Android') {
        flieTypes = {
          '.pdf': 'application/pdf',
          '.doc': 'application/msword',
          '.docx': 'application/msword',
          '.xls': 'application/vnd.ms-excel',
          '.xlsx': 'application/vnd.ms-excel',
          '.ppt': 'application/vnd.ms-powerpoint',
          '.pptx': 'application/vnd.ms-powerpoint',
          '.txt': 'text/plain',
          '.mp3': 'audio/*',
        }
      }
      if (ACCEPT_PLATFORM == 'Android' || ACCEPT_PLATFORM == 'IOS') {
        fileType.map((key) => {
          if (flieTypes.hasOwnProperty(key)) {
            type.push(flieTypes[key])
          }
        })
        type = [...new Set(type)].join(',')
        if (!fileModule) return this.$message.info('BenBen-ChooseFile组件未引入')
        fileModule.chooseFile(
          {
            type: type,
          },
          (ret) => {
            if (ret.code != 1) return
            // 获取文件信息
            plus.io.getFileInfo({
              filePath: ret.data,
              success: (fileInfo) => {
                var name = ret.data.replace(/.*(\/|\\)/, '')
                that.uploadFile([{ name: name, path: ret.data, size: fileInfo.size }])
              },
              fail: (err) => {},
            })
          }
        )
      } else {
        // #ifdef MP-WEIXIN
        wx.chooseMessageFile({
          count: this.maxlength - this.fileList.length, // 默认1
          type: file,
          extension: fileType,
          success: (res) => {
            this.uploadFile(res.tempFiles)
          },
        })
        // #endif
        // #ifdef H5
        uni.chooseFile({
          count: this.maxlength - this.fileList.length, // 默认1
          extension: fileType,
          success: (res) => {
            this.uploadFile(res.tempFiles)
          },
        })
        // #endif
      }
    },
    // 上传文件
    uploadFile(tempFilePaths) {
      this.uploading = true
      // 开始上传
      new UploadImage(tempFilePaths, {
        complete: (res) => {
          this.uploading = false
          let fileList = JSON.parse(JSON.stringify(this.fileList))
          res.map((item) => {
            fileList.push(item)
          })
          this.$emit('update:file-list', fileList)
        },
      })
    },
  },
  // 组件周期函数--监听组件挂载完毕
  mounted() {},
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
}
</script>

<style></style>
