<template>
  <view @tap.stop="handleSend">
    <template v-if="timer">
      {{ `${time}s ${afterText}` }}
    </template>
    <template v-else>
      {{ beforeText }}
    </template>
  </view>
</template>
<script>
import { BeforeGetVerifyCodeNew, GetVerifyCode, GetVerifyCodeNew } from '@/api/system';
import { IS_DEV } from '@/config';
import i18nConfig from '@/locales';
import Message from '@/utils/message';
import { validate } from '@/utils/validate';
import { getCaptchaData } from './crypto.js';

export default {
  name: 'benben-send-verification-code',
  props: {
    phone: {
      //发送短信的验证码
      type: [String, Number],
      default: '',
    },
    type: {
      //发送短信类型
      type: [String, Number],
      default: 1,
    },
    parameter: {
      //额外参数
      type: [Object],
      default: () => ({}),
    },
    afterText: {
      //发送成功后展示的文本
      type: [String, Number],
      default: i18nConfig.global.t('后重新获取'),
    },
    beforeText: {
      //未发送时展示的文本
      type: [String, Number],
      default: i18nConfig.global.t('请发送验证码'),
    },
    emptyeText: {
      //账号为空提示文本
      type: [String, Number],
      default: i18nConfig.global.t('请输入账号'),
    },
    validateText: {
      //验证提示文本
      type: [String, Number],
      default: i18nConfig.global.t('请输入正确账号'),
    },
    accountType: {
      //账号类型  email  / phone
      type: [String, Number],
      default: 'phone',
    },
    auto: {
      // 是否自动发送验证码
      type: Boolean,
      default: true,
    },
    isEnvironmentVerification: {
      // 开启环境验证
      type: Boolean,
      default: false,
    },
  },
  computed: {},
  data() {
    return {
      time: 60, // 倒计时60S,@Number
      timer: null, // 计时器,@Function
    }
  },
  created() { },
  methods: {
    handleSend() {
      if (this.auto) {
        this.sendVerificationCode()
      } else {
        this.$emit('handle')
      }
    },
    async sendVerificationCode() {
      // 从this里结构出来phone
      let { type, phone } = this
      // 验证手机号strat
      if (!phone && this.emptyeText) return Message.info(this.emptyeText)
      if (!validate(phone, this.accountType) && this.validateText) return Message.info(this.validateText)
      // 验证手机号 end
      // 如果有倒计时，return false
      if (this.flag) return false
      this.flag = true
      uni.showLoading({
        title: i18nConfig.global.t('发送中...'),
        mask: true,
      })
      try {
        let textObj = { phone: 'mobile', email: 'user_email' }
        let postData = {
          is_test: IS_DEV != 0 ? 1 : 0,
          [textObj[this.accountType] || 'mobile']: phone,
          accountType: this.accountType,
          type: type,
          ...this.parameter,
        }
        let apiUrls = GetVerifyCode
        if (this.isEnvironmentVerification) {
          apiUrls = GetVerifyCodeNew
          let { data, code, msg } = await BeforeGetVerifyCodeNew({
            captcha_data: getCaptchaData(),
          })
          if (code != 1) {
            Message.info(msg)
            uni.hideLoading()
            this.flag = false
            return
          }
          postData.captcha_data = getCaptchaData()
          postData.captcha_key = data.captcha_key
        }
        let { data, code, msg } = await apiUrls(postData)
        uni.hideLoading()
        if (code != 1) {
          Message.info(msg)
          this.flag = false
          return
        }
        // 清除倒计时,防抖作用
        this.timer && clearInterval(this.timer)
        this.timer = setInterval(() => {
          if (this.time == 1) {
            //倒计时结束就清楚这个倒计时
            clearInterval(this.timer)
            this.timer = null
            this.flag = false
            this.time = 60 // 倒计时60s
            return
          }
          this.time--
        }, 1000)
        // 向用户发送提示
        if (IS_DEV != 0) {
          Message.info(data.code)
        } else {
          Message.info(i18nConfig.global.t('验证码发送成功'))
        }
      } catch (error) {
        this.flag = false
        uni.hideLoading()
        // 接口错误打印错误
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
