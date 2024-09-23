<template>
    <page-body>
        <view class="page">
            <view
                class="flex flex-direction flex-wrap align-stretch justify-center benben-position-layout flex changePayPwdMessageCode_flex_0"
                :style="{ height: (88 + StatusBarRpx) + 'rpx', paddingTop: StatusBarRpx + 'rpx', }">
                <view class='flex flex-wrap align-stretch justify-between changePayPwdMessageCode_fd0_0'>
                    <view class='flex flex-wrap align-center changePayPwdMessageCode_fd0_0_c0' @tap.stop="handleJumpDiy"
                        data-type="back" data-url="1">
                        <text class='fu-iconfont2  changePayPwdMessageCode_fd0_0_c0_c0'>&#xe794;</text>
                    </view>
                    <view class='flex flex-wrap align-center'>
                        <text class='changePayPwdMessageCode_fd0_0_c1_c0'>修改密码</text>
                    </view>
                    <view class='flex align-center justify-end changePayPwdMessageCode_fd0_0_c2'>
                    </view>
                </view>

            </view>
            <view :style="{ height: (88 + StatusBarRpx) + 'rpx' }"></view>

            <view class="flex flex-direction align-center benben-flex-layout changePayPwdMessageCode_flex_1">
                <text class='changePayPwdMessageCode_fd1_0'>我们要对您绑定的手机号进行验证：</text>
                <text class='changePayPwdMessageCode_fd1_1'>{{ userInfo?.mobile }}</text>
                <benben-digital-password :box-num='6' mode='number'
                    class-name="flex flex align-center justify-center changePayPwdMessageCode_fd1_2" v-model="code">
                    <template #default="{ content, active, index }">
                        <view v-if="active"
                            class="flex align-center justify-center active-digital-password changePayPwdMessageCode_flex_password_active_fd1_2">
                            {{ content }}
                        </view>
                        <view v-else
                            class="flex align-center justify-center changePayPwdMessageCode_flex_password_active_fd1_2">
                            {{ content }}
                        </view>
                    </template>
                </benben-digital-password>
                <view class='flex flex-wrap align-center justify-center'>
                    <benben-send-verification-code key='1688627720354' ref="vCode1688627720354"
                        class=' changePayPwdMessageCode_fd1_3_c0' after-text='后重新获取' before-text='获取验证码' type='3'
                        :phone="userInfo?.mobile"></benben-send-verification-code>
                </view>
                <button class='changePayPwdMessageCode_fd1_4' @tap.stop="checkCodeFunc()"
                    open-type="contact">下一步</button>
            </view>




        </view>
    </page-body>
</template>
<script setup lang="ts">
import usePageMethod from '@/hooks/usePageMethod';
import { useUserStore } from '@/store/model/user';
import Message from '@/utils/message';
import { validate } from '@/utils/validate';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const { StatusBarRpx, handleJumpDiy } = usePageMethod
const code = ref()

function checkCodeFunc() {
    if (!validate(code.value, 'require')) {
        Message.info('请输入验证码');
        return false;
    }
    if (!validate(code.value, 'captcha')) {
        Message.info('请输入正确的验证码');
        return false;
    }
    uni.navigateTo({ url: `/pages/my/changePwdPhone/changePwdPhone?code=${code.value}` })
}
</script>
<style lang="scss" scoped>
.page {
    width: 100vw;
    overflow-x: hidden;
    min-height: calc(100vh - var(--window-bottom));
    background: #fff;
    background-size: 100% auto;
}

.changePayPwdMessageCode_flex_0 {
    border-bottom: 1px solid #eee;
    background: #fff;
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background-size: 100% auto !important;
}

.changePayPwdMessageCode_fd0_0_c2 {
    padding: 0rpx 0rpx 0rpx 0rpx;
    width: 100rpx;
}

.changePayPwdMessageCode_fd0_0_c1_c0 {
    font-size: 36rpx;
    font-weight: 500;
    color: var(--benbenFontColor0);
    line-height: 50rpx;
}

.changePayPwdMessageCode_fd0_0_c0_c0 {
    font-size: 36rpx;
    font-weight: 400;
    color: #333;
}

.changePayPwdMessageCode_fd0_0_c0 {
    width: 100rpx;
}

.changePayPwdMessageCode_fd0_0 {
    padding: 0rpx 32rpx 0rpx 32rpx;
    line-height: 88rpx;
}

.changePayPwdMessageCode_flex_1 {
    padding: 100rpx 0rpx 0rpx 0rpx;
}

.changePayPwdMessageCode_fd1_4 {
    background: #3090FF;
    border-radius: 44rpx 44rpx 44rpx 44rpx;
    font-size: 32rpx;
    color: var(--benbenFontColor3);
    margin: 80rpx 30rpx 0rpx 30rpx;
    height: 88rpx;
    line-height: 88rpx;
    width: 690rpx;
}

.changePayPwdMessageCode_fd1_3_c0 {
    font-size: 28rpx;
    font-weight: 500;
    color: var(--benbenFontColor4);
    text-align: center;
    margin: 40rpx 0rpx 0rpx 0rpx;
}

.changePayPwdMessageCode_flex_password_active_fd1_2 {
    border: 1px solid rgba(217, 217, 217, 1);
    width: 100rpx;
    height: 100rpx;
}

::v-deep .changePayPwdMessageCode_fd1_2 {
    width: 750rpx;
}

.changePayPwdMessageCode_fd1_1 {
    margin: 48rpx 0rpx 72rpx 0rpx;
    line-height: 37rpx;
    font-size: 32rpx;
    font-weight: 500;
    color: var(--benbenFontColor0);
}

.changePayPwdMessageCode_fd1_0 {
    font-size: 28rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
}
</style>