<template>
    <page-body>
        <view class="page">
            <view class="flex benben-position-layout flex flex-wrap align-center lianxiwom_flex_0"
                :style="{ height: (88 + StatusBarRpx) + 'rpx', paddingTop: StatusBarRpx + 'rpx', }">
                <view class='flex flex-wrap align-center justify-between flex-sub lianxiwom_fd0_0'>
                    <view class='flex flex-wrap align-center lianxiwom_fd0_0_c0' @tap.stop="handleJumpDiy"
                        data-type="back" data-url="1">
                        <text class='fu-iconfont2  lianxiwom_fd0_0_c0_c0'>&#xE794;</text>
                    </view>
                    <view class='flex flex-wrap align-stretch justify-center'>
                        <text class='lianxiwom_fd0_0_c1_c0'>联系我们</text>
                    </view>
                    <view class='flex flex-wrap align-center justify-end lianxiwom_fd0_0_c0'>
                    </view>
                </view>

            </view>
            <view :style="{ height: (88 + StatusBarRpx) + 'rpx' }"></view>
            <!---flex布局flex布局开始-->
            <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout lianxiwom_flex_1">
                <text class='lianxiwom_fd1_0'>{{ info?.system_page }}</text>
                <mp-html :content="info?.content" style="margin-top: 20rpx;" />
                <view class='flex flex-wrap align-center justify-center lianxiwom_fd1_2'
                    @tap.stop="callMobile(telInfo?.tel!)">
                    <image class='lianxiwom_fd1_2_c0' mode="aspectFit" :src='STATIC_URL + "40.png"'></image>
                    <text class='lianxiwom_fd1_2_c1'>立刻拨打官方电话</text>
                </view>
            </view>

            <!---flex布局flex布局结束-->


        </view>
    </page-body>
</template>
<script setup lang="ts">
import { FindSystempage, GetSystempage } from '@/api/system';
import type { IFindSystempageRes, IGetSystempageRes } from '@/api/system/type';
import usePageMethod from '@/hooks/usePageMethod';
import { ref } from 'vue';

const { StatusBarRpx, STATIC_URL, handleJumpDiy, callMobile } = usePageMethod
const info = ref<IGetSystempageRes>()
const telInfo = ref<IFindSystempageRes>()

GetSystempage().then(({ data }) => { info.value = data })

FindSystempage({ title: 'tel' }).then(({ data }) => {
    telInfo.value = data
})

</script>

<style lang="scss" scoped>
.page {
    width: 100vw;
    overflow-x: hidden;
    min-height: calc(100vh - var(--window-bottom));
    background: rgba(255, 255, 255, 1);
    background-size: 100% auto;
}

.lianxiwom_flex_0 {
    background: #fff;
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background-size: 100% auto !important;
}

.lianxiwom_fd0_0_c1_c0 {
    font-size: 36rpx;
    font-weight: 700;
    color: #333333;
    line-height: 50rpx;
}

.lianxiwom_fd0_0_c0_c0 {
    font-size: 36rpx;
    color: #333;
}

.lianxiwom_fd0_0_c0 {
    width: 120rpx;
}

.lianxiwom_fd0_0 {
    padding: 0rpx 32rpx 0rpx 32rpx;
}

.lianxiwom_flex_1 {
    padding: 24rpx 24rpx 24rpx 24rpx;
}

.lianxiwom_fd1_2_c1 {
    color: #FFFFFF;
    font-size: 32rpx;
    font-weight: 400;
    line-height: 0rpx;
    text-align: left;
    font-style: normal;
}

.lianxiwom_fd1_2_c0 {
    width: 32rpx;
    height: 32rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    margin: 0rpx 17rpx 0rpx 0rpx;
}

.lianxiwom_fd1_2 {
    background: #3090FF;
    border-radius: 44rpx 44rpx 44rpx 44rpx;
    width: 702rpx;
    height: 88rpx;
    margin: 72rpx 0rpx 0rpx 0rpx;
}

.lianxiwom_fd1_1 {
    color: #666666;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 46rpx;
    text-align: left;
    font-style: normal;
    margin: 15rpx 0rpx 0rpx 0rpx;
}

.lianxiwom_fd1_0 {
    color: #333333;
    font-size: 34rpx;
    font-weight: 500;
    line-height: 54rpx;
    text-align: left;
    font-style: normal;
}
</style>