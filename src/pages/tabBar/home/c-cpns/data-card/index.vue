<template>
    <view class='flex flex-direction flex-wrap align-stretch home_fd1_0_c0_c1'>
        <text class='home_fd1_0_c0_c0_c0'>数据概览</text>
        <view class='flex flex-wrap align-center justify-between home_fd1_0_c0_c1_c1' @tap.stop="handleJumpDiy"
            data-type="navigateTo" :data-url="`/pages/gdlb/sousuo/sousuo`">
            <view class='flex flex-direction flex-wrap align-center'>
                <view class='flex flex-wrap align-center home_fd1_0_c0_c1_c1_c0_c0'>
                    <image class='home_fd1_0_c0_c1_c1_c0_c0_c0' mode="aspectFit" :src='STATIC_URL + "32.png"'></image>
                    <benben-message-num v-model:messageNum="itemData.daifenpei" class='home_fd1_0_c0_c1_c1_c0_c0_c1'
                        size='24' color='#fff' background-color='red'>
                    </benben-message-num>
                </view>
                <text class='home_fd1_0_c0_c1_c1_c0_c1'>待分配</text>
            </view>
            <view class='flex flex-direction flex-wrap align-center'>
                <view class='flex flex-wrap align-center home_fd1_0_c0_c1_c1_c0_c0'>
                    <image class='home_fd1_0_c0_c1_c1_c0_c0_c0' mode="aspectFit" :src='STATIC_URL + "34.png"'></image>
                    <benben-message-num v-model:messageNum="itemData.yifenpei" class='home_fd1_0_c0_c1_c1_c0_c0_c1'
                        size='24' color='#fff' background-color='red'>
                    </benben-message-num>
                </view>
                <text class='home_fd1_0_c0_c1_c1_c0_c1'>进行中</text>
            </view>
            <view class='flex flex-direction flex-wrap align-center'>
                <view class='flex flex-wrap align-center home_fd1_0_c0_c1_c1_c0_c0'>
                    <image class='home_fd1_0_c0_c1_c1_c0_c0_c0' mode="aspectFit" :src='STATIC_URL + "33.png"'></image>
                    <benben-message-num v-model:messageNum="itemData.yifenpei" class='home_fd1_0_c0_c1_c1_c0_c0_c1'
                        size='24' color='#fff' background-color='red'>
                    </benben-message-num>
                </view>
                <text class='home_fd1_0_c0_c1_c1_c0_c1'>已完成</text>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import type { ITongjiProjectsystemworkorderRes } from '@/api/home/type';
import usePageMethod from '@/hooks/usePageMethod';

interface IProps {
    itemData: ITongjiProjectsystemworkorderRes
}

defineProps<IProps>()

const { STATIC_URL, handleJumpDiy } = usePageMethod
</script>

<style scoped lang="scss">
.home_fd1_0_c0_c1_c1_c0_c1 {
    color: #242424;
    font-size: 26rpx;
    font-weight: 400;
    text-align: center;
    font-style: normal;
}

.home_fd1_0_c0_c1_c1_c0_c0_c1 {
    position: absolute;
    right: -10rpx;
    top: -10rpx;
}

.home_fd1_0_c0_c1_c1_c0_c0_c0 {
    width: 80rpx;
    height: 80rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
}

.home_fd1_0_c0_c1_c1_c0_c0 {
    margin: 0rpx 0rpx 16rpx 0rpx;
    position: relative;
}

.home_fd1_0_c0_c1_c1 {
    margin: 24rpx 32rpx 24rpx 32rpx;
}

.home_fd1_0_c0_c1 {
    background: #FFFFFF;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    padding: 32rpx 24rpx 0rpx 24rpx;
    margin: 0rpx 0rpx 24rpx 0rpx;
}
</style>