<template>
    <page-body>
        <view class="page">
            <view
                class="flex flex-direction flex-wrap align-stretch justify-center benben-position-layout flex changePwdOldCode_flex_0"
                :style="{ height: (88 + StatusBarRpx) + 'rpx', paddingTop: StatusBarRpx + 'rpx', }">
                <view class='flex flex-wrap align-stretch justify-between changePwdOldCode_fd0_0'>
                    <view class='flex flex-wrap align-center changePwdOldCode_fd0_0_c0' @tap.stop="handleJumpDiy"
                        data-type="back" data-url="1">
                        <text class='fu-iconfont2  changePwdOldCode_fd0_0_c0_c0'>&#xe794;</text>
                    </view>
                    <view class='flex flex-wrap align-center'>
                        <text class='changePwdOldCode_fd0_0_c1_c0'>修改密码</text>
                    </view>
                    <view class='flex align-center justify-end changePwdOldCode_fd0_0_c2'>
                    </view>
                </view>

            </view>
            <view :style="{ height: (88 + StatusBarRpx) + 'rpx' }"></view>
            <!---改密-旧密码验证表单flex布局开始-->
            <view class="flex flex-direction flex-wrap align-stretch changePwdOldCode_flex_1">
                <view class='flex flex-wrap align-center changePwdOldCode_fd1_0'>
                    <text class='changePwdOldCode_fd1_0_c0'>旧密码</text>
                    <benben-input class='flex-sub changePwdOldCode_fd1_0_c1' type="text" :focus='true'
                        :placeholder="`请输入旧密码`" confirm-type="done" :maxlength="12" :password='true'
                        placeholder-style="color:rgba(156, 156, 156, 1);font-size:32rpx" v-model="security_code" />
                </view>
                <view class='flex flex-wrap align-center changePwdOldCode_fd1_0'>
                    <text class='changePwdOldCode_fd1_0_c0'>新密码</text>
                    <benben-input class='flex-sub changePwdOldCode_fd1_0_c1' type="text" :placeholder="`请输入新密码`"
                        confirm-type="done" :maxlength="12" :password='true'
                        placeholder-style="color:rgba(156, 156, 156, 1);font-size:32rpx" v-model="password" />
                </view>
                <view class='flex flex-wrap align-center changePwdOldCode_fd1_0'>
                    <text class='changePwdOldCode_fd1_2_c0'>确认新密码</text>
                    <benben-input class='flex-sub changePwdOldCode_fd1_0_c1' type="text" :placeholder="`请再次输入新密码`"
                        confirm-type="done" :maxlength="12" :password='true'
                        placeholder-style="color:rgba(156, 156, 156, 1);font-size:32rpx" v-model="password_code" />
                </view>
                <button class='changePwdOldCode_fd1_3' @tap.stop="checkPwdFunc()" open-type="contact">完成</button>
            </view>

            <!---改密-旧密码验证表单flex布局结束-->


        </view>
    </page-body>
</template>
<script setup lang="ts">
import { ModifyPwd } from '@/api/user';
import { HttpCode } from '@/constant';
import usePageMethod from '@/hooks/usePageMethod';
import { useUserStore } from '@/store/model/user';
import Message from '@/utils/message';
import { validate } from '@/utils/validate';
import { useDebounceFn } from '@vueuse/core';
import { ref } from 'vue';
import {MD5} from 'crypto-js'

const userStore = useUserStore()
const { StatusBarRpx, handleJumpDiy } = usePageMethod
const security_code = ref('')
const password = ref('')
const password_code = ref('')

function checkPwdFunc() {
    if (!validate(security_code.value, 'require')) {
        Message.info('请输入旧密码');
        return false;
    }
    if (!validate(security_code.value, 'password')) {
        Message.info('请输入密码（6~12位字母+数字）');
        return false;
    }
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
        Message.info('请输入确认密码（6~12位字母+数字）');
        return false;
    }
    if (!(password.value === password_code.value)) {
        Message.info('两次输入密码不一致');
        return false;
    }
    Message.loading('提交中...')
    useDebounceFn(async () => {
        console.log(1111111, security_code.value, password.value, password_code.value);
        
        const post = {
            security_code: MD5(security_code.value).toString(),
            password: MD5(password.value).toString(),
            password_code: MD5(password_code.value).toString(),
        }
        const { code, msg } = await ModifyPwd(post)
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

.changePwdOldCode_flex_0 {
    border-bottom: 1px solid #eee;
    background: #fff;
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background-size: 100% auto !important;
}

.changePwdOldCode_fd0_0_c2 {
    padding: 0rpx 0rpx 0rpx 0rpx;
    width: 100rpx;
}

.changePwdOldCode_fd0_0_c1_c0 {
    font-size: 36rpx;
    font-weight: 500;
    color: var(--benbenFontColor0);
    line-height: 50rpx;
}

.changePwdOldCode_fd0_0_c0_c0 {
    font-size: 36rpx;
    font-weight: 400;
    color: #333;
}

.changePwdOldCode_fd0_0_c0 {
    width: 100rpx;
}

.changePwdOldCode_fd0_0 {
    padding: 0rpx 32rpx 0rpx 32rpx;
    line-height: 88rpx;
}

.changePwdOldCode_flex_1 {
    background: #fff;
    font-size: 32rpx;
    background-size: 100% auto !important;
    padding: 0rpx 32rpx 0rpx 32rpx;
    position: relative;
}

.changePwdOldCode_fd1_3 {
    background: #3090FF;
    border-radius: 44rpx 44rpx 44rpx 44rpx;
    font-size: 32rpx;
    color: var(--benbenFontColor3);
    width: 690rpx;
    height: 88rpx;
    line-height: 88rpx;
    font-weight: 500;
    position: fixed;
    bottom: calc(56rpx + var(--window-bottom));
}

.changePwdOldCode_fd1_2_c0 {
    font-size: 32rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
    width: 192rpx;
}

.changePwdOldCode_fd1_0_c1 {
    line-height: 45rpx;
    font-size: 32rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
}

.changePwdOldCode_fd1_0_c0 {
    font-size: 32rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
    margin: 0rpx 96rpx 0rpx 0rpx;
}

.changePwdOldCode_fd1_0 {
    border-bottom: 1px solid #eee;
    padding: 32rpx 0rpx 32rpx 0rpx;
}
</style>