<template>
    <page-body>
        <view class="page">
            <view
                class="flex flex-direction flex-wrap align-stretch justify-center benben-position-layout flex changePwdPhone_flex_0"
                :style="{ height: (88 + StatusBarRpx) + 'rpx', paddingTop: StatusBarRpx + 'rpx', }">
                <view class='flex flex-wrap align-stretch justify-between changePwdPhone_fd0_0'>
                    <view class='flex flex-wrap align-center changePwdPhone_fd0_0_c0' @tap.stop="handleJumpDiy"
                        data-type="back" data-url="1">
                        <text class='fu-iconfont2  changePwdPhone_fd0_0_c0_c0'>&#xe794;</text>
                    </view>
                    <view class='flex flex-wrap align-center'>
                        <text class='changePwdPhone_fd0_0_c1_c0'>修改密码</text>
                    </view>
                    <view class='flex align-center justify-end changePwdPhone_fd0_0_c2'>
                    </view>
                </view>

            </view>
            <view :style="{ height: (88 + StatusBarRpx) + 'rpx' }"></view>
            <!---修改密码-手机验证-表单flex布局开始-->
            <view class="flex flex-direction flex-wrap align-stretch changePwdPhone_flex_1">
                <view class='flex flex-wrap align-center changePwdPhone_fd1_0'>
                    <text class='changePwdPhone_fd1_0_c0'>新密码</text>
                    <benben-input class='flex-sub changePwdPhone_fd1_0_c1' type="text" :focus='true'
                        :placeholder="`请输入新密码`" confirm-type="done" :maxlength="12" :password='true'
                        placeholder-style="color:#999;font-size:32rpx" v-model="password" />
                </view>
                <view class='flex flex-wrap align-center changePwdPhone_fd1_0'>
                    <text class='changePwdPhone_fd1_1_c0'>确认新密码</text>
                    <benben-input class='flex-sub changePwdPhone_fd1_0_c1' type="text" :focus='true'
                        :placeholder="`请再次输入新密码`" confirm-type="done" :maxlength="12" :password='true'
                        placeholder-style="color:#999;font-size:32rpx" v-model="password_code" />
                </view>
                <button class='changePwdPhone_fd1_2' @tap.stop="checkPwdFunc()" open-type="contact">完成</button>
            </view>

            <!---修改密码-手机验证-表单flex布局结束-->


        </view>
    </page-body>
</template>
<script setup lang="ts">
import { ResetPwd } from '@/api/user';
import type { IResetPwdReq } from '@/api/user/type';
import { HttpCode } from '@/constant';
import usePageMethod from '@/hooks/usePageMethod';
import { useUserStore } from '@/store/model/user';
import Message from '@/utils/message';
import { validate } from '@/utils/validate';
import { onLoad } from '@dcloudio/uni-app';
import { useDebounceFn } from '@vueuse/core';
import { MD5 } from 'crypto-js';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

onLoad((options: any) => {
    const { code } = options
    if (code) codeRef.value = code
})

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const { StatusBarRpx, handleJumpDiy } = usePageMethod
const password = ref('')
const password_code = ref('')
const codeRef = ref('')

async function checkPwdFunc() {
    if (!validate(password.value, 'require')) {
        Message.info('请输入新密码');
        return false;
    }
    if (!validate(password.value, 'password')) {
        Message.info('请输入新密码（6~12位字母+数字）');
        return false;
    }
    if (!validate(password_code.value, 'require')) {
        Message.info('请输入确认密码');
        return false;
    }
    if (!validate(password_code.value, 'password')) {
        Message.info('请输入确认密码（6~12位字母+数字');
        return false;
    }
    if (!(password.value == password_code.value)) {
        Message.info('两次输入密码不一致');
        return false;
    }
    Message.loading('提交中...')
    useDebounceFn(async () => {
        const post: IResetPwdReq = {
            password: MD5(password.value).toString(),
            mobile: userInfo.value?.mobile ?? '',
            code: codeRef.value,
            account_type: 'mobile',
        }
        const { code, msg } = await ResetPwd(post)
        Message.info(msg)
        if (code !== HttpCode.DATA_SUCCESS_CODE) return
        userStore.logout()
    }, 350)()
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

.changePwdPhone_flex_0 {
    border-bottom: 1px solid #eee;
    background: #fff;
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background-size: 100% auto !important;
}

.changePwdPhone_fd0_0_c2 {
    padding: 0rpx 0rpx 0rpx 0rpx;
    width: 100rpx;
}

.changePwdPhone_fd0_0_c1_c0 {
    font-size: 36rpx;
    font-weight: 500;
    color: var(--benbenFontColor0);
    line-height: 50rpx;
}

.changePwdPhone_fd0_0_c0_c0 {
    font-size: 36rpx;
    font-weight: 400;
    color: #333;
}

.changePwdPhone_fd0_0_c0 {
    width: 100rpx;
}

.changePwdPhone_fd0_0 {
    padding: 0rpx 32rpx 0rpx 32rpx;
    line-height: 88rpx;
}

.changePwdPhone_flex_1 {
    background: #fff;
    font-size: 32rpx;
    background-size: 100% auto !important;
    padding: 0rpx 32rpx 0rpx 32rpx;
}

.changePwdPhone_fd1_2 {
    background: #3090FF;
    border-radius: 44rpx 44rpx 44rpx 44rpx;
    font-size: 32rpx;
    color: var(--benbenFontColor3);
    width: 690rpx;
    height: 88rpx;
    line-height: 88rpx;
    font-weight: 500;
    margin: 64rpx 0rpx 0rpx 0rpx;
}

.changePwdPhone_fd1_1_c0 {
    font-size: 32rpx;
    font-weight: 400;
    font-style: normal;
    color: var(--benbenFontColor0);
    width: 192rpx;
}

.changePwdPhone_fd1_0_c1 {
    line-height: 45rpx;
    font-size: 32rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
}

.changePwdPhone_fd1_0_c0 {
    font-size: 32rpx;
    font-weight: 400;
    font-style: normal;
    color: var(--benbenFontColor0);
    margin: 0rpx 96rpx 0rpx 0rpx;
}

.changePwdPhone_fd1_0 {
    border-bottom: 1px solid #eee;
    padding: 32rpx 0rpx 32rpx 0rpx;
}
</style>