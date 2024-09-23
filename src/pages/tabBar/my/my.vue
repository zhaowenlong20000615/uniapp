<template>
    <page-body>
        <view class="page">
            <view class="flex benben-position-layout flex flex-wrap align-center my_flex_0"
                :style="{ height: (88 + StatusBarRpx) + 'rpx', paddingTop: StatusBarRpx + 'rpx', }">
                <view class='flex flex-wrap align-center justify-between flex-sub my_fd0_0'>
                    <view class='flex flex-wrap align-center my_fd0_0_c0' @tap.stop="handleJumpDiy" data-type="back"
                        data-url="1">
                        <text class='fu-iconfont2  my_fd0_0_c0_c0'>&#xE794;</text>
                    </view>
                    <view class='flex flex-wrap align-stretch justify-center'>
                        <text class='my_fd0_0_c1_c0'>个人中心</text>
                    </view>
                    <view class='flex flex-wrap align-center justify-end my_fd0_0_c0'>
                    </view>
                </view>

            </view>
            <view :style="{ height: (88 + StatusBarRpx) + 'rpx' }"></view>

            <view class="flex benben-flex-layout flex-wrap align-center">
                <view class='flex flex-direction flex-wrap align-stretch flex-sub my_fd1_0'>
                    <view class='flex flex-direction flex-wrap align-stretch justify-between my_fd1_0_c0'>
                        <view class='flex align-center justify-end my_fd1_0_c0_c0' v-if="isLogin === true">
                            <benben-image-upload :is-cropping="false" :is-show-clean="false"
                                class="upload position-relative my_fd1_0_c0_c0_c0">

                                <image class=" my_fd1_0_c0_c0_c0_image" mode="aspectFit"
                                    :src="userInfo?.avatar || STATIC_URL + '24.png'"></image>
                            </benben-image-upload>
                            <view class='flex flex-direction flex-wrap align-stretch flex-sub' @tap.stop="handleJumpDiy"
                                data-type="navigateTo" :data-url="`/pages/my/myInfo/myInfo`">
                                <view class='flex flex-wrap align-center my_fd1_0_c0_c0_c1_c0'>
                                    <text class='my_fd1_0_c0_c0_c1_c0_c0'>{{ userInfo?.nickname }}</text>
                                    <image v-if="userInfo?.sex === 1" class='my_fd1_0_c0_c0_c1_c0_c1' mode="aspectFit"
                                        :src='STATIC_URL + "10.png"'>
                                    </image>
                                    <image v-if="userInfo?.sex === 2" class='my_fd1_0_c0_c0_c1_c0_c2' mode="aspectFit"
                                        :src='STATIC_URL + "11.png"'>
                                    </image>
                                </view>
                                <view class='flex flex-wrap align-center my_fd1_0_c0_c0_c1_c0'>
                                    <text class='my_fd1_0_c0_c0_c1_c1_c0'>生日：</text>
                                    <text class='my_fd1_0_c0_c0_c1_c1_c0'>1998-08-08</text>
                                </view>
                                <view class='flex flex-wrap align-center'>
                                    <text class='my_fd1_0_c0_c0_c1_c1_c0'>联系方式：</text>
                                    <text class='my_fd1_0_c0_c0_c1_c1_c0'>{{ userInfo?.mobile }}</text>
                                </view>
                            </view>
                            <image class='my_fd1_0_c0_c0_c2' mode="aspectFit" :src='STATIC_URL + "9.png"'
                                @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/my/myInfo/myInfo`">
                            </image>
                        </view>
                        <view class='flex flex-wrap align-center' @tap.stop="toLoginDiy()" v-if="isLogin === false">
                            <image class='my_fd1_0_c0_c1_c0' mode="aspectFit" :src='STATIC_URL + "52.png"'></image>
                            <view class='flex flex-direction flex-wrap align-center'>
                                <text class='flex-sub my_fd1_0_c0_c1_c1_c0'>请登录</text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>


            <!---flex布局flex布局开始-->
            <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout my_flex_2">
                <view class='flex flex-wrap align-stretch justify-between flex-sub my_fd2_0' @tap.stop="handleJumpDiy"
                    data-type="navigateTo" :data-url="`/pages/my/wodexx/wodexx`">
                    <view class='flex flex-wrap align-center'>
                        <image class='my_fd2_0_c0_c0' mode="aspectFit" :src='STATIC_URL + "13.png"'></image>
                    </view>
                    <view class='flex flex-wrap align-center justify-between flex-sub my_fd2_0_c1'>
                        <text class='my_fd2_0_c1_c0'>我的学习</text>
                        <image class='my_fd2_0_c1_c1' mode="aspectFit" :src='STATIC_URL + "53.png"'></image>
                    </view>
                </view>
                <view class='flex flex-wrap align-stretch justify-between flex-sub my_fd2_0' @tap.stop="handleJumpDiy"
                    data-type="navigateTo" :data-url="`/pages/my/lianxiwom/lianxiwom`">
                    <view class='flex flex-wrap align-center'>
                        <image class='my_fd2_0_c0_c0' mode="aspectFit" :src='STATIC_URL + "14.png"'></image>
                    </view>
                    <view class='flex flex-wrap align-center justify-between flex-sub my_fd2_0_c1'>
                        <text class='my_fd2_0_c1_c0'>联系平台</text>
                        <image class='my_fd2_0_c1_c1' mode="aspectFit" :src='STATIC_URL + "53.png"'></image>
                    </view>
                </view>
                <view class='flex flex-wrap align-stretch justify-between flex-sub my_fd2_0' @tap.stop="handleJumpDiy"
                    data-type="navigateTo" :data-url="`/pages/my/feedBack/feedBack`">
                    <view class='flex flex-wrap align-center'>
                        <image class='my_fd2_0_c0_c0' mode="aspectFit" :src='STATIC_URL + "15.png"'></image>
                    </view>
                    <view class='flex flex-wrap align-center justify-between flex-sub my_fd2_0_c1'>
                        <text class='my_fd2_0_c1_c0'>意见反馈</text>
                        <image class='my_fd2_0_c1_c1' mode="aspectFit" :src='STATIC_URL + "53.png"'></image>
                    </view>
                </view>
                <!-- <view class='flex flex-wrap align-stretch justify-between flex-sub my_fd2_0' @tap.stop="handleJumpDiy"
                    data-type="navigateTo" :data-url="`/pages/dlzc/agreements/agreements`">
                    <view class='flex flex-wrap align-center'>
                        <image class='my_fd2_0_c0_c0' mode="aspectFit" :src='STATIC_URL + "16.png"'></image>
                    </view>
                    <view class='flex flex-wrap align-center justify-between flex-sub my_fd2_0_c1'>
                        <text class='my_fd2_0_c1_c0'>用户协议</text>
                        <image class='my_fd2_0_c1_c1' mode="aspectFit" :src='STATIC_URL + "53.png"'></image>
                    </view>
                </view>
                <view class='flex flex-wrap align-stretch justify-between flex-sub my_fd2_0' @tap.stop="handleJumpDiy"
                    data-type="navigateTo" :data-url="`/pages/dlzc/privacyPolicy/privacyPolicy`">
                    <view class='flex flex-wrap align-center'>
                        <image class='my_fd2_0_c0_c0' mode="aspectFit" :src='STATIC_URL + "17.png"'></image>
                    </view>
                    <view class='flex flex-wrap align-center justify-between flex-sub my_fd2_0_c1'>
                        <text class='my_fd2_0_c1_c0'>隐私协议</text>
                        <image class='my_fd2_0_c1_c1' mode="aspectFit" :src='STATIC_URL + "53.png"'></image>
                    </view>
                </view> -->
                <view class='flex flex-wrap align-stretch justify-between flex-sub my_fd2_5' @tap.stop="handleJumpDiy"
                    data-type="navigateTo" :data-url="`/pages/my/system/system`">
                    <view class='flex flex-wrap align-center'>
                        <image class='my_fd2_0_c0_c0' mode="aspectFit" :src='STATIC_URL + "18.png"'></image>
                    </view>
                    <view class='flex flex-wrap align-center justify-between flex-sub my_fd2_0_c1'>
                        <text class='my_fd2_0_c1_c0'>系统设置</text>
                        <image class='my_fd2_0_c1_c1' mode="aspectFit" :src='STATIC_URL + "53.png"'></image>
                    </view>
                </view>
            </view>

            <!---flex布局flex布局结束-->


        </view>
    </page-body>
</template>
<script setup lang="ts">
import usePageMethod from '@/hooks/usePageMethod';
import { useUserStore } from '@/store/model/user';
import { storeToRefs } from 'pinia';

const useStore = useUserStore()
const { StatusBarRpx, STATIC_URL, handleJumpDiy, toLoginDiy } = usePageMethod

const { isLogin, userInfo } = storeToRefs(useStore)
</script>

<style lang="scss" scoped>
.page {
    width: 100vw;
    overflow-x: hidden;
    min-height: calc(100vh - var(--window-bottom));
    background: url(image-path('8.png')) no-repeat;
    background-size: 100% auto;
}

.my_flex_0 {
    background: url(image-path('8.png')) no-repeat;
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background-size: 100% auto !important;
}

.my_fd0_0_c1_c0 {
    font-size: 36rpx;
    font-weight: 700;
    color: rgba(255, 255, 255, 1);
    line-height: 88rpx;
}

.my_fd0_0_c0_c0 {
    font-size: 36rpx;
    color: rgba(255, 255, 255, 1);
}

.my_fd0_0_c0 {
    width: 120rpx;
}

.my_fd0_0 {
    padding: 0rpx 32rpx 0rpx 32rpx;
}

.my_fd1_0_c0_c1_c1_c0 {
    color: #FFFFFF;
    font-size: 36rpx;
    font-weight: 700;
    margin: 0rpx 0rpx 17rpx 0rpx;
    text-align: left;
    font-style: normal;
}

.my_fd1_0_c0_c1_c0 {
    width: 120rpx;
    height: 120rpx;
    border-radius: 180rpx 180rpx 180rpx 180rpx;
    margin: 0rpx 38rpx 0rpx 0rpx;
}

.my_fd1_0_c0_c0_c2 {
    width: 30rpx;
    height: 30rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
}

.my_fd1_0_c0_c0_c1_c1_c0 {
    color: #FFFFFF;
    font-size: 26rpx;
    font-weight: 400;
    line-height: 56rpx;
    text-align: left;
    font-style: normal;
}

.my_fd1_0_c0_c0_c1_c0_c2 {
    width: 48rpx;
    height: 32rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
}

.my_fd1_0_c0_c0_c1_c0_c1 {
    width: 48rpx;
    height: 32rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    margin: 0rpx 8rpx 0rpx 0rpx;
}

.my_fd1_0_c0_c0_c1_c0_c0 {
    color: #FFFFFF;
    font-size: 36rpx;
    font-weight: 700;
    text-align: left;
    font-style: normal;
    margin: 0rpx 16rpx 0rpx 0rpx;
}

.my_fd1_0_c0_c0_c1_c0 {
    margin: 0rpx 0rpx 10rpx 0rpx;
}

.my_fd1_0_c0_c0_c0_image {
    width: 120rpx;
    height: 120rpx;
    margin: 0rpx 0rpx 0rpx 0rpx;
    border-radius: 120rpx;
}

.my_fd1_0_c0_c0_c0 {
    margin: 0rpx 38rpx 0rpx 0rpx;
}

.my_fd1_0_c0_c0 {
    width: 100%;
}

.my_fd1_0_c0 {
    padding: 64rpx 27rpx 48rpx 0rpx;
}

.my_fd1_0 {
    padding: 0rpx 32rpx 0rpx 32rpx;
}

.my_flex_2 {
    padding: 0rpx 24rpx 24rpx 24rpx;
}

.my_fd2_5 {
    background: #FFFFFF;
    padding: 0rpx 24rpx 0rpx 24rpx;
    border-radius: 0rpx 0rpx 16rpx 16rpx;
}

.my_fd2_0_c1_c1 {
    width: 14rpx;
    height: 26rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
}

.my_fd2_0_c1_c0 {
    color: #333333;
    font-size: 28rpx;
    font-weight: 400;
}

.my_fd2_0_c1 {
    border-bottom: 1px solid #eee;
    margin: 0rpx 0rpx 0rpx 24rpx;
    padding: 32rpx 0rpx 32rpx 0rpx;
}

.my_fd2_0_c0_c0 {
    width: 48rpx;
    height: 48rpx;
}

.my_fd2_0 {
    background: #FFFFFF;
    padding: 0rpx 24rpx 0rpx 24rpx;
}
</style>