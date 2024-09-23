<template>
    <page-body>
        <view class="page">
            <view
                class="flex flex-direction flex-wrap align-stretch justify-center benben-position-layout flex inputNewPhone_flex_0"
                :style="{ height: (88 + StatusBarRpx) + 'rpx', paddingTop: StatusBarRpx + 'rpx', }">
                <view class='flex flex-wrap align-stretch justify-between inputNewPhone_fd0_0'>
                    <view class='flex flex-wrap align-center inputNewPhone_fd0_0_c0' @tap.stop="handleJumpDiy"
                        data-type="back" data-url="1">
                        <text class='fu-iconfont2  inputNewPhone_fd0_0_c0_c0'>&#xe794;</text>
                    </view>
                    <view class='flex flex-wrap align-center'>
                        <text class='inputNewPhone_fd0_0_c1_c0'>绑定新手机</text>
                    </view>
                    <view class='flex align-center justify-end inputNewPhone_fd0_0_c2'>
                    </view>
                </view>

            </view>
            <view :style="{ height: (88 + StatusBarRpx) + 'rpx' }"></view>
            <!---输入新的手机号-表单flex布局开始-->
            <view class="flex flex-direction flex-wrap align-stretch inputNewPhone_flex_1">
                <view class='flex flex-wrap align-center inputNewPhone_fd1_0'>
                    <text class='inputNewPhone_fd1_0_c0'>新手机号码</text>
                    <benben-input class='flex-sub inputNewPhone_fd1_0_c1' type="number" :focus='true'
                        :placeholder="`请输入新的手机号`" confirm-type="done" :maxlength="11"
                        placeholder-style="color:#999;font-size:32rpx" v-model="mobile" />
                </view>
                <view class='flex flex-wrap align-center inputNewPhone_fd1_0'>
                    <text class='inputNewPhone_fd1_0_c0'>短信验证</text>
                    <benben-input class='flex-sub inputNewPhone_fd1_1_c1' type="number" :placeholder="`请输入验证码`"
                        confirm-type="done" :maxlength="6" placeholder-style="color:#999;font-size:32rpx"
                        v-model="codeRef" />
                    <benben-send-verification-code key='1687690525918' ref="vCode1687690525918"
                        class=' inputNewPhone_fd1_1_c2' after-text='后重新获取' before-text='获取短信验证' type='5'
                        :phone="mobile"></benben-send-verification-code>
                </view>
                <button class='flex-sub inputNewPhone_fd1_2' @tap.stop="checkCodeFunc()" open-type="contact">完成</button>
            </view>

            <!---输入新的手机号-表单flex布局结束-->


        </view>
    </page-body>
</template>
<script setup lang="ts">
import { ModifyMobile } from '@/api/user';
import { HttpCode } from '@/constant';
import usePageMethod from '@/hooks/usePageMethod';
import { useUserStore } from '@/store/model/user';
import Message from '@/utils/message';
import { validate } from '@/utils/validate';
import { useDebounceFn } from '@vueuse/core';
import { ref } from 'vue';

const useStore = useUserStore()
const { StatusBarRpx, handleJumpDiy, toHomeDiy } = usePageMethod
const mobile = ref('')
const codeRef = ref('')

async function checkCodeFunc() {
    if (!validate(mobile.value, 'require')) {
        Message.info('请输入手机号');
        return false;
    }
    if (!validate(mobile.value, 'phone')) {
        Message.info('请输入正确的手机号');
        return false;
    }
    if (!validate(codeRef.value, 'require')) {
        Message.info('请输入验证码');
        return false;
    }
    if (!validate(codeRef.value, 'captcha')) {
        Message.info('请输入正确的验证码');
        return false;
    }
    Message.loading('登录中...')
    useDebounceFn(async () => {
        const post = {
            mobile: mobile.value, code: codeRef.value, type: '5'
        }
        const { code, msg } = await ModifyMobile(post)
        Message.info(msg)
        if (code !== HttpCode.DATA_SUCCESS_CODE) return
        useStore.asyncUpdateUserInfo()
        toHomeDiy()
    }, 500)()

}
</script>
<style lang="scss" scoped>
.page {
    width: 100vw;
    overflow-x: hidden;
    min-height: calc(100vh - var(--window-bottom));
    background: rgba(255, 255, 255, 1);
    background-size: 100% auto;
}

.inputNewPhone_flex_0 {
    border-bottom: 1px solid #eee;
    background: #fff;
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background-size: 100% auto !important;
}

.inputNewPhone_fd0_0_c2 {
    padding: 0rpx 0rpx 0rpx 0rpx;
    width: 100rpx;
}

.inputNewPhone_fd0_0_c1_c0 {
    font-size: 36rpx;
    font-weight: 500;
    color: var(--benbenFontColor0);
    line-height: 50rpx;
}

.inputNewPhone_fd0_0_c0_c0 {
    font-size: 36rpx;
    font-weight: 400;
    color: #333;
}

.inputNewPhone_fd0_0_c0 {
    width: 100rpx;
}

.inputNewPhone_fd0_0 {
    padding: 0rpx 32rpx 0rpx 32rpx;
    line-height: 88rpx;
}

.inputNewPhone_flex_1 {
    background: #fff;
    font-size: 32rpx;
    background-size: 100% auto !important;
    padding: 0rpx 30rpx 0rpx 30rpx;
}

.inputNewPhone_fd1_2 {
    background: #3090FF;
    border-radius: 44rpx 44rpx 44rpx 44rpx;
    font-size: 32rpx;
    color: #fff;
    margin: 80rpx 0rpx 0rpx 0rpx;
    height: 88rpx;
    line-height: 88rpx;
    width: 690rpx;
}

.inputNewPhone_fd1_1_c2 {
    font-size: 32rpx;
    font-weight: 400;
    color: #3090FF;
    font-style: normal;
    text-align: left;
}

.inputNewPhone_fd1_1_c1 {
    line-height: 45rpx;
    color: var(--benbenFontColor0);
    font-size: 32rpx;
    font-weight: 400;
}

.inputNewPhone_fd1_0_c1 {
    line-height: 45rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
}

.inputNewPhone_fd1_0_c0 {
    font-size: 32rpx;
    font-weight: 400;
    font-style: normal;
    color: var(--benbenFontColor0);
    width: 192rpx;
}

.inputNewPhone_fd1_0 {
    border-bottom: 1px solid #eee;
    padding: 32rpx 0rpx 32rpx 0rpx;
}
</style>