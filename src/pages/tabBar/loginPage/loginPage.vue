<template>
    <page-body>
        <view class="page">
            <!---flex布局flex布局开始-->
            <view class="flex flex-direction flex-wrap align-center benben-flex-layout loginPage_flex_0">
                <image class='loginPage_fd0_0' mode="aspectFit" :src='STATIC_URL + "1.png"'></image>
            </view>

            <!---flex布局flex布局结束-->
            <!---flex布局flex布局开始-->
            <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout loginPage_flex_1">
                <view class='flex flex-wrap align-center loginPage_fd1_0'>
                    <image class='loginPage_fd1_0_c0' mode="aspectFit" :src='STATIC_URL + "49.png"'></image>
                    <benben-input class='flex-sub loginPage_fd1_0_c1' type="number" :placeholder="`请输入手机号`"
                        confirm-type="done" :maxlength="11" placeholder-style="color:#999;font-size:32rpx"
                        v-model="mobile" />
                </view>
                <view class='flex flex-wrap align-center loginPage_fd1_1'>
                    <image class='loginPage_fd1_0_c0' mode="aspectFit" :src='STATIC_URL + "50.png"'></image>
                    <benben-flex-password-diy v-model="password" class-name="flex align-center flex loginPage_fd1_1_c1"
                        :placeholder="'请输入密码(6~12位字母+数字)'" :maxlength="12" :default-type='true'
                        placeholder-style="color:#999;font-size:32rpx">
                        <template #show>
                            <text class='fu-iconfont2  loginPage_fd1_1_c1_icon1' data-type="show">&#xE837;</text>
                        </template>
                        <template #hide>
                            <text class='fu-iconfont2  loginPage_fd1_1_c1_icon1' data-type="hide">&#xEBCC;</text>
                        </template>
                    </benben-flex-password-diy>
                </view>
                <view class='flex flex-direction-row-reverse flex-wrap align-center loginPage_fd1_2'>
                    <text class='loginPage_fd1_2_c0' @tap.stop="handleJumpDiy" data-type="redirectTo"
                        :data-url="`/pages/dlzc/verificationCodeLogin/verificationCodeLogin`">验证码登录</text>
                </view>
                <button class='loginPage_fd1_3' @tap.stop="onlogonFunc()">登录</button>
                <!-- <view class='flex flex-wrap align-center justify-center loginPage_fd1_4'>
                    <benben-flex-switch-new class-name='flex flex' v-model="id_tk" :disabled='false'>
                        <template v-slot:checked>

                            <view class='flex flex position-relative align-center'>
                                <image class='loginPage_checkfd1_4_c0_c0_c0' mode="aspectFit"
                                    :src='STATIC_URL + "2.png"'>
                                </image>
                            </view>

                        </template>
                        <template v-slot:unchecked>

                            <view class='flex flex position-relative justify-end align-center'>
                                <image class='loginPage_noCheckfd1_4_c0_c1_c0' mode="aspectFit"
                                    :src='STATIC_URL + "51.png"'></image>
                            </view>

                        </template>
                    </benben-flex-switch-new>
                    <text class='loginPage_fd1_4_c1'>已阅读并同意</text>
                    <text class='loginPage_fd1_4_c2' @tap.stop="handleJumpDiy" data-type="navigateTo"
                        :data-url="`/pages/dlzc/agreements/agreements`">《用户注册协议》</text>
                    <text class='loginPage_fd1_4_c3'>与</text>
                    <text class='loginPage_fd1_4_c2' @tap.stop="handleJumpDiy" data-type="navigateTo"
                        :data-url="`/pages/dlzc/privacyPolicy/privacyPolicy`">《隐私政策》</text>
                </view> -->
            </view>

            <!---flex布局flex布局结束-->


        </view>
    </page-body>
</template>
<script setup lang="ts">
import { PwdLogin } from '@/api/user';
import type { IPwdLoginReq } from '@/api/user/type';
import { HttpCode } from '@/constant';
import usePageMethod from '@/hooks/usePageMethod';
import { useUserStore } from '@/store/model/user';
import Message from '@/utils/message';
import { validate } from '@/utils/validate';
import { useDebounceFn, } from '@vueuse/core';
import { MD5 } from 'crypto-js';
import { ref } from 'vue';

const useStore = useUserStore()

const { STATIC_URL, handleJumpDiy, toHomeDiy } = usePageMethod
const id_tk = ref(true)
const mobile = ref('13735882408')
const password = ref('123456a')

function onlogonFunc() {
    if (!validate(mobile.value, 'require')) {
        Message.info('请输入手机号');
        return false;
    }
    if (!validate(mobile.value, 'phone')) {
        Message.info('请输入正确的手机号');
        return false;
    }
    if (!validate(password.value, 'require')) {
        Message.info('请输入密码');
        return false;
    }
    if (!validate(password.value, 'password')) {
        Message.info('请输入正确的密码');
        return false;
    }
    if (id_tk.value === false) {
        Message.info('请勾选协议');
        return false;
    }
    Message.loading('登录中...')
    useDebounceFn(async () => {
        const post: IPwdLoginReq = {
            mobile: mobile.value,
            account_type: 'mobile',
            password: MD5(password.value).toString()
        }
        const { code, msg, data: { userinfo } } = await PwdLogin(post)
        Message.info(msg)
        if (code !== HttpCode.DATA_SUCCESS_CODE) return
        useStore.updateUserInfo(userinfo)
        useStore.saveToken(userinfo.user_token)
        toHomeDiy()
    }, 500)()
}   
</script>

<style lang="scss" scoped>
.page {
    width: 100vw;
    overflow-x: hidden;
    min-height: calc(100vh - var(--window-bottom));
    background: #F8F8F8;
    background-size: 100% auto;
}

.loginPage_flex_0 {
    padding: 110rpx 0rpx 80rpx 0rpx;
}

.loginPage_fd0_0 {
    width: 180rpx;
    height: 180rpx;
    border-radius: 33rpx 33rpx 33rpx 33rpx;
}

.loginPage_flex_1 {
    padding: 0rpx 56rpx 0rpx 56rpx;
}

.loginPage_fd1_4_c3 {
    color: rgba(153, 153, 153, 1);
    font-size: 24rpx;
    font-weight: 400;
    line-height: 32rpx;
    text-align: left;
    font-style: normal;
}

.loginPage_fd1_4_c2 {
    color: #3090FF;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 32rpx;
    text-align: left;
    font-style: normal;
}

.loginPage_fd1_4_c1 {
    color: rgba(153, 153, 153, 1);
    font-size: 24rpx;
    font-weight: 400;
    line-height: 32rpx;
    margin: 0rpx 0rpx 0rpx 16rpx;
    text-align: left;
    font-style: normal;
}

.loginPage_noCheckfd1_4_c0_c1_c0 {
    border-radius: 24rpx 24rpx 24rpx 24rpx;
    width: 32rpx;
    height: 32rpx;
}

.loginPage_checkfd1_4_c0_c0_c0 {
    width: 32rpx;
    height: 32rpx;
    border-radius: 24rpx 24rpx 24rpx 24rpx;
}

.loginPage_fd1_4 {
    position: fixed;
    bottom: calc(40rpx + var(--window-bottom));
    left: 0rpx;
    width: 750rpx;
}

.loginPage_fd1_3 {
    background: #3090FF;
    border-radius: 44rpx 44rpx 44rpx 44rpx;
    font-size: 32rpx;
    color: var(--benbenFontColor3);
    width: 638rpx;
    height: 88rpx;
    line-height: 88rpx;
    margin: 46rpx 0rpx 0rpx 0rpx;
}

.loginPage_fd1_2_c0 {
    font-size: 28rpx;
    font-weight: 400;
    line-height: 40rpx;
    color: rgba(0, 0, 0, 1);
}

.loginPage_fd1_2 {
    margin: 32rpx 0rpx 0rpx 0rpx;
}

.loginPage_fd1_1_c1_icon1 {
    width: 88rpx;
    line-height: 88rpx;
    text-align: center;
    font-size: 40rpx;
}

::v-deep .loginPage_fd1_1_c1 {
    height: 45rpx;
    font-size: 32rpx;
    margin: 0rpx 0rpx 0rpx 24rpx;
    line-height: 40rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
    width: 572rpx;
}

.loginPage_fd1_1 {
    border-bottom: 1px solid rgba(238, 238, 238, 1);
    margin: 0rpx 0rpx 0rpx 0rpx;
    padding: 40rpx 0rpx 40rpx 0rpx;
}

.loginPage_fd1_0_c1 {
    color: var(--benbenFontColor0);
    font-size: 32rpx;
    font-weight: 400;
    line-height: 40rpx;
    margin: 0rpx 0rpx 0rpx 24rpx;
    height: 45rpx;
}

.loginPage_fd1_0_c0 {
    width: 34rpx;
    height: 34rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
}

.loginPage_fd1_0 {
    border-bottom: 1px solid rgba(238, 238, 238, 1);
    padding: 40rpx 0rpx 40rpx 0rpx;
}
</style>