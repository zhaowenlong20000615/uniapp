<template>
    <page-body>
        <view class="page">
            <view class="flex align-stretch benben-position-layout flex newDetail_flex_0"
                :style="{ height: (88 + StatusBarRpx) + 'rpx', paddingTop: StatusBarRpx + 'rpx', }">
                <view class='flex align-center justify-between flex-sub newDetail_fd0_0'>
                    <view class='flex align-center newDetail_fd0_0_c0' @tap.stop="handleJumpDiy" data-type="back"
                        data-url="1">
                        <text class='fu-iconfont2  newDetail_fd0_0_c0_c0'>&#xE794;</text>
                    </view>
                    <view class='flex align-center'>
                        <text class='newDetail_fd0_0_c1_c0'>消息详情</text>
                    </view>
                    <view class='flex align-center newDetail_fd0_0_c0'>
                    </view>
                </view>

            </view>
            <view :style="{ height: (88 + StatusBarRpx) + 'rpx' }"></view>

            <view class="flex flex-direction align-stretch newDetail_flex_1">
                <text
                    class='newDetail_fd1_0'>{{ dataMessage.freelistofinstitutions_institutional_regulations || dataMessage.freelearningandtraininglist_title }}</text>
                <text class='newDetail_fd1_1'>{{ dataMessage.create_time }}</text>
                <mp-html class='newDetail_fd1_2'
                    :content="dataMessage.freelistofinstitutions_content || dataMessage.freelearningandtraininglist_content" />
            </view>
        </view>
    </page-body>
</template>
<script setup lang="ts">
import { GetLatprInfo, GetSystempushrecordsInfo } from '@/api/message';
import usePageMethod from '@/hooks/usePageMethod';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';

onLoad((options: any) => {
    const { tabs, aid } = options
    if (tabs) tabsRef.value = tabs
    if (aid) aidRef.value = aid
    initFun()
})

const { StatusBarRpx, handleJumpDiy } = usePageMethod
const tabsRef = ref('1')
const aidRef = ref('')
const dataMessage = ref()

async function initFun() {
    switch (tabsRef.value) {
        case '1':
            const { data } = await GetSystempushrecordsInfo({ aid: aidRef.value })
            dataMessage.value = data
            break
        case '2':
            const { data: data1 } = await GetLatprInfo({ aid: aidRef.value })
            dataMessage.value = data1
            break
        default:
    }

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

.newDetail_flex_0 {
    background: #fff;
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background-size: 100% auto !important;
}

.newDetail_fd0_0_c1_c0 {
    font-size: 36rpx;
    font-weight: 700;
    color: #101010;
    text-align: center;
    font-style: normal;
}

.newDetail_fd0_0_c0_c0 {
    font-size: 32rpx;
    font-weight: 500;
    color: #333;
}

.newDetail_fd0_0_c0 {
    width: 180rpx;
}

.newDetail_fd0_0 {
    padding: 0rpx 32rpx 0rpx 32rpx;
    line-height: 88rpx;
}

.newDetail_flex_1 {
    padding: 25rpx 32rpx 16rpx 32rpx;
}

::v-deep .newDetail_fd1_2 {
    width: 100%;
    padding: 32rpx 0rpx 32rpx 0rpx;
}

.newDetail_fd1_1 {
    color: #999999;
    font-size: 24rpx;
    font-weight: 400;
    margin: 24rpx 0rpx 0rpx 0rpx;
    text-align: left;
    font-style: normal;
}

.newDetail_fd1_0 {
    font-size: 34rpx;
    line-height: 54rpx;
    font-weight: 500;
    color: #333333;
    text-align: left;
    font-style: normal;
}
</style>