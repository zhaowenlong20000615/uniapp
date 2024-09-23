
// #ifdef APP-NVUE
import wjEmoji from './wj-emoji.vue'
// #endif

import { benbenImageSrcResolution } from '@/common/utils/utils.js';
export default {
  // #ifdef APP-NVUE
  components: { wjEmoji },
  // #endif
  props: {
    isTabbar: {
      type: Boolean,
      default: false,
    },
    discussNum: {
      type: [String, Number],
      default: 0,
    },
    authorId: {
      type: [String, Number],
      default: 0,
    },
  },
  data() {
    return {
      show: false,
      emojiIsOpen: false, //表情框是否打开
      isReply: false, //是否为回复模式
      discussContent: '',
      keyboardHeight: '0px',
      disscusList: [],
      seeMoreId: '',//展开的id
      replyData: {}, //回复人对象
    }
  },
  created() {
    // #ifdef APP-NVUE
    uni.onKeyboardHeightChange(res => {
      console.log(res.height)
      let keyboardHeight = res.height > 0 ? res.height - (this.isTabbar ? 50 : 0) : 0
      this.keyboardHeight = keyboardHeight + 'px'
    })
    // #endif
  },
  methods: {
    benbenImageSrcResolution,
    handleSeeMore(id) {
      if (this.seeMoreId == id) {
        this.seeMoreId = ''
      } else {
        this.seeMoreId = id
      }
    },
    initList(data) {
      this.show = true
      this.disscusList = data
      console.log('initList', data);
    },
    lodingData(data) {
      this.disscusList.push(...data)
      console.log('lodingData', data);

    },
    // 添加表情
    emojiAction(emoji) {
      this.discussContent += emoji.msg
    },
    closePopup() {
      this.disscusList = []
      this.show = false
      this.closeReply()
      this.discussContent = ''
      this.seeMoreId = ''
      this.cancelEmoji()
      uni.hideKeyboard()
    },
    handleReply(item) {
      this.isReply = true
      this.replyData = item
    },
    // 打开表情
    openEmoji() {
      uni.hideKeyboard()
      if (this.emojiIsOpen) {
        this.cancelEmoji()
      } else {
        this.emojiIsOpen = true
        this.$refs.emoji.openEmoji()
      }
    },
    // 评论分页
    loadData() {
      this.$emit('loadData')
    },
    //取消回复
    closeReply() {
      this.isReply = false
      this.replyData = {}
      this.discussContent = ''
      this.cancelEmoji()
    },
    // 关闭表情
    cancelEmoji() {
      if (this.emojiIsOpen) {
        this.emojiIsOpen = false
        this.$refs.emoji.cancelEmoji()
      }
    },
    // 发送评论
    sendMsg() {
      let sendMsg = this.discussContent.trim()
      if (!sendMsg.length) return
      this.$emit('sendMsg', { sendMsg, isReply: this.isReply, ...this.replyData })
      uni.hideKeyboard()
      this.closeReply()
    },
  },
}
