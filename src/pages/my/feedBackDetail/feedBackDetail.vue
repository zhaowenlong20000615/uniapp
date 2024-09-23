<template>
    <page-body>
        <view class="page">
            <view
                class="flex flex-direction flex-wrap align-stretch justify-center benben-position-layout flex feedBackDetail_flex_0"
                :style="{ height: (88 + StatusBarRpx) + 'rpx', paddingTop: StatusBarRpx + 'rpx', }">
                <view class='flex flex-wrap align-stretch justify-between feedBackDetail_fd0_0'>
                    <view class='flex flex-wrap align-center feedBackDetail_fd0_0_c0' @tap.stop="handleJumpDiy"
                        data-type="back" data-url="1">
                        <text class='fu-iconfont2  feedBackDetail_fd0_0_c0_c0'>&#xe794;</text>
                    </view>
                    <view class='flex flex-wrap align-center'>
                        <text class='feedBackDetail_fd0_0_c1_c0'>历史反馈</text>
                    </view>
                    <view class='flex align-center justify-end feedBackDetail_fd0_0_c2'>
                    </view>
                </view>

            </view>
            <view :style="{ height: (88 + StatusBarRpx) + 'rpx' }"></view>
            <!---反馈记录带联系人flex布局开始-->
            <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout feedBackDetail_flex_1">
                <template v-for='item in listData' :key='item.aid'>
                    <view class='flex flex-wrap align-start feedBackDetail_fd1_0'>
                        <image class='feedBackDetail_fd1_0_c0' mode="aspectFit" :src='item.avatar'></image>
                        <view class='flex flex-direction flex-wrap align-stretch flex-sub feedBackDetail_fd1_0_c1'>
                            <view class='flex flex-direction flex-wrap align-stretch feedBackDetail_fd1_0_c1_c0'>
                                <view class='flex-sub'>
                                    <text class='feedBackDetail_fd1_0_c1_c0_c0_c0'>{{ item.problem_description }}</text>
                                </view>
                            </view>
                            <view class='flex flex-wrap align-center'>
                                <template v-for='(child, key1) in item.feedback_image' :key='key1'>
                                    <view class='flex flex-wrap align-center feedBackDetail_fd1_0_c1_c1_c0'>
                                        <image class='feedBackDetail_fd1_0_c1_c1_c0_c0' mode="aspectFill" :src='child'
                                            @tap.stop="multiImagePreview(child, item.feedback_image, '')"></image>
                                    </view>
                                </template>

                            </view>
                            <view class='flex flex-wrap align-center feedBackDetail_fd1_0_c1_c2'>
                                <text class='feedBackDetail_fd1_0_c1_c2_c0'>联系方式：</text>
                                <text class='feedBackDetail_fd1_0_c1_c2_c1'></text>
                            </view>
                            <view class='flex flex-wrap align-center feedBackDetail_fd1_0_c1_c3'>
                                <text class='feedBackDetail_fd1_0_c1_c3_c0'>反馈类型：</text>
                                <text
                                    class='feedBackDetail_fd1_0_c1_c3_c0'>{{ item.freefeedbacktype_feedback_type }}</text>
                            </view>
                            <view class='flex flex-wrap align-center feedBackDetail_fd1_0_c1_c4'>
                                <text class='feedBackDetail_fd1_0_c1_c3_c0'>反馈时间：</text>
                                <text class='feedBackDetail_fd1_0_c1_c3_c0'>{{ item.create_time }}</text>
                            </view>
                        </view>
                    </view>
                </template>
                <fu-empty :pagingListLoadedAll="pagingListLoadedAll" :pagingListNoListData="pagingListNoListData"
                    :listDataLength="listDataLength" :isLoadInit="isLoadInit"></fu-empty>
            </view>

            <!---反馈记录带联系人flex布局结束-->


        </view>
    </page-body>
</template>
<script setup lang="ts">
import { GetFeedbackList } from '@/api/system';
import type { IGetFeedbackListRes } from '@/api/system/type';
import usePageMethod from '@/hooks/usePageMethod';
import { usePagingList } from '@/hooks/usePagingList';

const { StatusBarRpx, handleJumpDiy, multiImagePreview } = usePageMethod
const { listData, pagingListLoadedAll, pagingListNoListData, listDataLength, isLoadInit } = usePagingList<IGetFeedbackListRes[]>({ minixPagingListsApi: GetFeedbackList })

</script>

<style lang="scss" scoped>
.page {
    width: 100vw;
    overflow-x: hidden;
    min-height: calc(100vh - var(--window-bottom));
    background: #fff;
    background-size: 100% auto;
}

.feedBackDetail_flex_0 {
    border-bottom: 1px solid #eee;
    background: #fff;
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background-size: 100% auto !important;
}

.feedBackDetail_fd0_0_c2 {
    padding: 0rpx 0rpx 0rpx 0rpx;
    width: 100rpx;
}

.feedBackDetail_fd0_0_c1_c0 {
    font-size: 36rpx;
    font-weight: 500;
    color: #333333;
    line-height: 50rpx;
}

.feedBackDetail_fd0_0_c0_c0 {
    font-size: 36rpx;
    font-weight: 400;
    color: #333;
}

.feedBackDetail_fd0_0_c0 {
    width: 100rpx;
}

.feedBackDetail_fd0_0 {
    padding: 0rpx 32rpx 0rpx 32rpx;
    line-height: 88rpx;
}

.feedBackDetail_flex_1 {
    padding: 0rpx 24rpx 0rpx 24rpx;
}

.feedBackDetail_fd1_0_c1_c4 {
    margin: 0rpx 0rpx 0rpx 16rpx;
}

.feedBackDetail_fd1_0_c1_c3_c0 {
    line-height: 33rpx;
    font-size: 24rpx;
    font-weight: 400;
    color: var(--benbenFontColor2);
}

.feedBackDetail_fd1_0_c1_c3 {
    margin: 32rpx 0rpx 16rpx 16rpx;
}

.feedBackDetail_fd1_0_c1_c2_c1 {
    font-size: 24rpx;
    font-weight: 400;
    color: #4B5269;
    text-align: left;
    font-style: normal;
    line-height: 46rpx;
}

.feedBackDetail_fd1_0_c1_c2_c0 {
    line-height: 46rpx;
    font-size: 24rpx;
    font-weight: 400;
    color: #4B5269;
    text-align: left;
    font-style: normal;
}

.feedBackDetail_fd1_0_c1_c2 {
    margin: 24rpx 0rpx 0rpx 16rpx;
}

.feedBackDetail_fd1_0_c1_c1_c0_c0 {
    width: 180rpx;
    height: 180rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
}

.feedBackDetail_fd1_0_c1_c1_c0 {
    margin: 12rpx 5rpx 12rpx 5rpx;
}

.feedBackDetail_fd1_0_c1_c0_c0_c0 {
    line-height: 46rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
    padding: 0rpx 30rpx 0rpx 0rpx;
}

.feedBackDetail_fd1_0_c1_c0 {
    position: relative;
    padding: 0rpx 0rpx 0rpx 16rpx;
}

.feedBackDetail_fd1_0_c1 {
    margin: 0rpx 0rpx 0rpx 0rpx;
}

.feedBackDetail_fd1_0_c0 {
    width: 72rpx;
    height: 72rpx;
    border-radius: 50rpx 50rpx 50rpx 50rpx;
}

.feedBackDetail_fd1_0 {
    border-bottom: 1px solid #eee;
    padding: 24rpx 0rpx 32rpx 0rpx;
}
</style>