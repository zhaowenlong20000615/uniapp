<template>
    <page-body>
        <view class="page">
            <!---flex布局flex布局开始-->
            <view class="flex flex-direction flex-wrap align-center benben-flex-layout verificationCodeLogin_flex_0">
                <image class='verificationCodeLogin_fd0_0' mode="aspectFit" :src='STATIC_URL + "1.png"'></image>
            </view>

            <!---flex布局flex布局结束-->
            <!---flex布局flex布局开始-->
            <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout verificationCodeLogin_flex_1">
                <view class='flex flex-wrap align-center verificationCodeLogin_fd1_0'>
                    <image class='verificationCodeLogin_fd1_0_c0' mode="aspectFit" :src='STATIC_URL + "49.png"'></image>
                    <benben-input class='flex-sub verificationCodeLogin_fd1_0_c1' type="number" :placeholder="`请输入手机号`"
                        confirm-type="done" :maxlength="11" placeholder-style="color:#999;font-size:32rpx"
                        v-model="mobile" />
                </view>
                <view class='flex flex-wrap align-center verificationCodeLogin_fd1_1'>
                    <image class='verificationCodeLogin_fd1_0_c0' mode="aspectFit" :src='STATIC_URL + "56.png"'></image>
                    <benben-input class='flex-sub verificationCodeLogin_fd1_1_c1' type="number" :placeholder="`请输入验证码`"
                        confirm-type="done" :maxlength="4" placeholder-style="color:#999;font-size:32rpx"
                        v-model="codeRef" />
                    <benben-send-verification-code key='1701479963937' ref="vCode1701479963937"
                        class=' verificationCodeLogin_fd1_1_c2' after-text='后重新获取' before-text='获取验证码' type='3'
                        :phone="mobile"></benben-send-verification-code>
                </view>
                <view class='flex flex-direction-row-reverse flex-wrap align-center verificationCodeLogin_fd1_2'>
                    <text class='verificationCodeLogin_fd1_2_c0' @tap.stop="handleJumpDiy" data-type="redirectTo"
                        :data-url="`/pages/tabBar/loginPage/loginPage`">密码登录</text>
                </view>
                <button class='verificationCodeLogin_fd1_3' @tap.stop="codelogonFunc()">登录</button>
                <!-- <view class='flex flex-wrap align-center justify-center verificationCodeLogin_fd1_4'>
                    <benben-flex-switch-new class-name='flex flex' v-model="id_tk" :disabled='false'>
                        <template v-slot:checked>

                            <view class='flex flex position-relative align-center'>
                                <image class='verificationCodeLogin_checkfd1_4_c0_c0_c0' mode="aspectFit"
                                    :src='STATIC_URL + "2.png"'></image>
                            </view>

                        </template>
                        <template v-slot:unchecked>

                            <view class='flex flex position-relative justify-end align-center'>
                                <image class='verificationCodeLogin_noCheckfd1_4_c0_c1_c0' mode="aspectFit"
                                    :src='STATIC_URL + "51.png"'></image>
                            </view>

                        </template>
                    </benben-flex-switch-new>
                    <text class='verificationCodeLogin_fd1_4_c1'>已阅读并同意</text>
                    <text class='verificationCodeLogin_fd1_4_c2' @tap.stop="handleJumpDiy" data-type="navigateTo"
                        :data-url="`/pages/dlzc/agreements/agreements`">《用户注册协议》</text>
                    <text class='verificationCodeLogin_fd1_4_c3'>与</text>
                    <text class='verificationCodeLogin_fd1_4_c2' @tap.stop="handleJumpDiy" data-type="navigateTo"
                        :data-url="`/pages/dlzc/privacyPolicy/privacyPolicy`">《隐私政策》</text>
                </view> -->
            </view>

            <!---flex布局flex布局结束-->


        </view>
    </page-body>
</template>
<script setup lang="ts">
import { CodeLogin } from '@/api/user';
import { HttpCode } from '@/constant';
import usePageMethod from '@/hooks/usePageMethod';
import { useUserStore } from '@/store/model/user';
import Message from '@/utils/message';
import { validate } from '@/utils/validate';
import { useDebounceFn } from '@vueuse/core';
import { ref } from 'vue';

const useStore = useUserStore()
const { toHomeDiy, handleJumpDiy, STATIC_URL } = usePageMethod
const mobile = ref('13735882408')
const codeRef = ref('')
const id_tk = ref(true)

async function codelogonFunc() {
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
    if (id_tk.value === false) {
        Message.info('请勾选协议');
        return false;
    }
    Message.loading('登录中...')
    useDebounceFn(async () => {
        const post = {
            mobile: mobile.value,
            code: codeRef.value
        }
        const { code, msg, data: { userinfo } } = await CodeLogin(post)
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
    background: rgba(255, 255, 255, 1);
    background-size: 100% auto;
}

.verificationCodeLogin_flex_0 {
    padding: 120rpx 0rpx 80rpx 0rpx;
}

.verificationCodeLogin_fd0_0 {
    width: 180rpx;
    height: 180rpx;
    border-radius: 33rpx 33rpx 33rpx 33rpx;
}

.verificationCodeLogin_flex_1 {
    padding: 0rpx 56rpx 0rpx 56rpx;
}

.verificationCodeLogin_fd1_4_c3 {
    color: rgba(153, 153, 153, 1);
    font-size: 24rpx;
    font-weight: 400;
    line-height: 32rpx;
    text-align: left;
    font-style: normal;
}

.verificationCodeLogin_fd1_4_c2 {
    color: #3090FF;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 32rpx;
    text-align: left;
    font-style: normal;
}

.verificationCodeLogin_fd1_4_c1 {
    color: rgba(153, 153, 153, 1);
    font-size: 24rpx;
    font-weight: 400;
    line-height: 32rpx;
    margin: 0rpx 0rpx 0rpx 16rpx;
    text-align: left;
    font-style: normal;
}

.verificationCodeLogin_noCheckfd1_4_c0_c1_c0 {
    border-radius: 24rpx 24rpx 24rpx 24rpx;
    width: 32rpx;
    height: 32rpx;
}

.verificationCodeLogin_checkfd1_4_c0_c0_c0 {
    width: 32rpx;
    height: 32rpx;
    border-radius: 24rpx 24rpx 24rpx 24rpx;
}

.verificationCodeLogin_fd1_4 {
    position: fixed;
    bottom: calc(48rpx + var(--window-bottom));
    left: 0rpx;
    width: 750rpx;
}

.verificationCodeLogin_fd1_3 {
    background: #3090FF;
    border-radius: 44rpx 44rpx 44rpx 44rpx;
    font-size: 32rpx;
    color: #fff;
    width: 638rpx;
    height: 88rpx;
    line-height: 88rpx;
    margin: 46rpx 0rpx 0rpx 0rpx;
}

.verificationCodeLogin_fd1_2_c0 {
    color: #333333;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 40rpx;
}

.verificationCodeLogin_fd1_2 {
    margin: 32rpx 0rpx 0rpx 0rpx;
}

.verificationCodeLogin_fd1_1_c2 {
    line-height: 40rpx;
    font-size: 28rpx;
    color: rgba(48, 144, 255, 1);
    font-weight: 400;
}

.verificationCodeLogin_fd1_1_c1 {
    color: var(--benbenFontColor0);
    font-size: 28rpx;
    font-weight: 400;
    line-height: 45rpx;
    margin: 0rpx 0rpx 0rpx 24rpx;
}

.verificationCodeLogin_fd1_1 {
    border-bottom: 1px solid #eee;
    padding: 40rpx 0rpx 40rpx 0rpx;
}

.verificationCodeLogin_fd1_0_c1 {
    color: var(--benbenFontColor0);
    font-size: 32rpx;
    font-weight: 400;
    line-height: 45rpx;
    margin: 0rpx 0rpx 0rpx 24rpx;
}

.verificationCodeLogin_fd1_0_c0 {
    width: 34rpx;
    height: 34rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
}

.verificationCodeLogin_fd1_0 {
    border-bottom: 1px solid #eee;
    padding: 40rpx 0rpx 40rpx 0rpx;
    margin: 40rpx 0rpx 0rpx 0rpx;
}
</style>