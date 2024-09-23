<template>
    <page-body>
        <view class="page">
            <view class="flex align-stretch benben-position-layout flex privacyPolicy_flex_0"
                :style="{ height: (88 + StatusBarRpx) + 'rpx', paddingTop: StatusBarRpx + 'rpx', }">
                <view class='flex align-center justify-between flex-sub privacyPolicy_fd0_0'>
                    <view class='flex align-center privacyPolicy_fd0_0_c0' @tap.stop="handleJumpDiy" data-type="back"
                        data-url="1">
                        <text class='fu-iconfont2  privacyPolicy_fd0_0_c0_c0'>&#xE794;</text>
                    </view>
                    <view class='flex align-center'>
                        <!-- <text class='privacyPolicy_fd0_0_c1_c0'>{{ dataMessage.name }}</text> -->
                    </view>
                    <view class='flex align-center privacyPolicy_fd0_0_c0'>
                    </view>
                </view>

            </view>
            <view :style="{ height: (88 + StatusBarRpx) + 'rpx' }"></view>
            <view class="ben_fu-jyf-parser_1">
                <mp-html :content="dataMessage.content | richTextFormat" />
            </view>


        </view>
    </page-body>
</template>
<script setup lang="ts">
import usePageMethod from '@/hooks/usePageMethod';

const { handleJumpDiy, StatusBarRpx } = usePageMethod
</script>
<style lang="scss" scoped>
.page {
    width: 100vw;
    overflow-x: hidden;
    min-height: calc(100vh - var(--window-bottom));
    background: #fff;
    background-size: 100% auto;
}

.privacyPolicy_flex_0 {
    border-bottom: 1px solid #eee;
    background: #fff;
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background-size: 100% auto !important;
}

.privacyPolicy_fd0_0_c1_c0 {
    font-size: 36rpx;
    font-weight: 500;
    color: var(--benbenFontColor0);
}

.privacyPolicy_fd0_0_c0_c0 {
    font-size: 32rpx;
    font-weight: 500;
    color: #333;
}

.privacyPolicy_fd0_0_c0 {
    width: 180rpx;
}

.privacyPolicy_fd0_0 {
    padding: 0rpx 32rpx 0rpx 32rpx;
    line-height: 88rpx;
}

.ben_fu-jyf-parser_1 {
    background-color: #fff;
    padding-left: 32rpx;
    padding-right: 32rpx;
    padding-top: 32rpx;
    padding-bottom: 32rpx;

}
</style>