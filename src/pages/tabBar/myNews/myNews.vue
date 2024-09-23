<template>
    <page-body>
        <view class="page">
            <view class="flex align-stretch benben-position-layout flex myNews_flex_0"
                :style="{ height: (88 + StatusBarRpx) + 'rpx', paddingTop: StatusBarRpx + 'rpx', }">
                <view class='flex align-center justify-between flex-sub myNews_fd0_0'>
                    <view class='flex align-center myNews_fd0_0_c0'>
                    </view>
                    <view class='flex align-center'>
                        <text class='myNews_fd0_0_c1_c0'>消息中心</text>
                    </view>
                    <view class='flex align-center myNews_fd0_0_c0'>
                    </view>
                </view>

            </view>
            <view :style="{ height: (88 + StatusBarRpx) + 'rpx' }"></view>

            <view class="flex flex-direction align-stretch benben-flex-layout myNews_flex_1">
                <view class='flex flex-wrap align-center myNews_fd1_0' @tap.stop="handleJumpDiy" data-type="navigateTo"
                    :data-url="`/pages/message/orderMessages/orderMessages`">
                    <image class='myNews_fd1_0_c0' mode="aspectFit" :src='STATIC_URL + "7.png"'></image>
                    <view class='flex flex-direction align-stretch flex-sub'>
                        <text class='myNews_fd1_0_c1_c0'>系统消息</text>
                    </view>
                    <!-- <benben-message-num :message-num="item.num" size='24' color='#fff' background-color='red'>
                    </benben-message-num> -->
                </view>
            </view>
        </view>
    </page-body>
</template>
<script setup lang="ts">
import usePageMethod from '@/hooks/usePageMethod';

const { STATIC_URL, StatusBarRpx, handleJumpDiy } = usePageMethod
</script>

<style lang="scss" scoped>
.page {
    width: 100vw;
    overflow-x: hidden;
    min-height: calc(100vh - var(--window-bottom));
    background: #fff;
    background-size: 100% auto;
}

.myNews_flex_0 {
    background: #fff;
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background-size: 100% auto !important;
}

.myNews_fd0_0_c1_c0 {
    font-size: 36rpx;
    font-weight: 700;
    color: #101010;
    text-align: center;
    font-style: normal;
}

.myNews_fd0_0_c0 {
    width: 180rpx;
}

.myNews_fd0_0 {
    padding: 0rpx 32rpx 0rpx 32rpx;
    line-height: 88rpx;
}

.myNews_flex_1 {
    margin: 0rpx 30rpx 0rpx 30rpx;
}

.myNews_fd1_0_c1_c1 {
    font-size: 24rpx;
    font-weight: 500;
    color: #999999;
    margin: 20rpx 0rpx 0rpx 0rpx;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-align: left;
    font-style: normal;
}

.myNews_fd1_0_c1_c0 {
    font-size: 32rpx;
    font-weight: 700;
    color: #333333;
    text-align: left;
    font-style: normal;
}

.myNews_fd1_0_c0_1 {
    width: 80rpx;
    height: 80rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    margin: 0rpx 24rpx 0rpx 0rpx;
}

.myNews_fd1_0_c0 {
    width: 110rpx;
    height: 110rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    margin: 0rpx 24rpx 0rpx 0rpx;
}

.myNews_fd1_0 {
    background: #FFFFFF;
    margin: 0rpx 0rpx 0rpx 0rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    padding: 20rpx 0rpx 20rpx 0rpx;
}
</style>