<template>
    <page-body>
        <view class="page">
            <view class="flex benben-position-layout flex flex-wrap align-center wodexx_flex_0"
                :style="{ height: (88 + StatusBarRpx) + 'rpx', paddingTop: StatusBarRpx + 'rpx', }">
                <view class='flex flex-wrap align-center justify-between flex-sub wodexx_fd0_0'>
                    <view class='flex flex-wrap align-center wodexx_fd0_0_c0' @tap.stop="handleJumpDiy" data-type="back"
                        data-url="1">
                        <text class='fu-iconfont2  wodexx_fd0_0_c0_c0'>&#xE794;</text>
                    </view>
                    <view class='flex flex-wrap align-stretch justify-center'>
                        <text class='wodexx_fd0_0_c1_c0'>我的学习</text>
                    </view>
                    <view class='flex flex-wrap align-center justify-end wodexx_fd0_0_c0'>
                    </view>
                </view>

            </view>
            <view :style="{ height: (88 + StatusBarRpx) + 'rpx' }"></view>
            <!---flex布局flex布局开始-->
            <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout">
                <view class='flex flex-direction flex-wrap align-stretch'>
                    <view class='flex flex-wrap align-center wodexx_fd1_0_c0'>
                        <view>
                            <benben-flex-tabs class-name='wodexx_benbenTabsfd1_0_c0_c0' v-model="tabs"
                                ref="benben_tabsfd1_0_c0_c0" select-mark="benben_tabsfd1_0_c0_c0"
                                key="benben_tabsfd1_0_c0_c0" :open-title-type='false' :open-sticky='true' :top='0'
                                :is-show-content='false' :scrollspy='false' v-model:tabs-info="tabsInfofd1_0_c0_c0">

                                <scroll-view @scroll="tabsInfofd1_0_c0_c0.scrollX = $event.detail.scrollLeft"
                                    id="benben_tabsfd1_0_c0_c0" class="benben-tabs" style="width:750rpx"
                                    :scroll-x="true" :scroll-left="tabsInfofd1_0_c0_c0.moveX"
                                    scroll-with-animation="all .3s ease">
                                    <view class="benben-tabs-content" id="benben_tabsfd1_0_c0_c0-content">
                                        <view id="benben_tabsfd1_0_c0_c0-title"
                                            class="benben-tabs-title flex flex align-center justify-around">
                                            <view
                                                :class="{ 'checkTitlefd1_0_c0_c0': tabs == '2', 'flex flex-wrap align-center': true }"
                                                @tap="tabs = '2'" :id="`benben_tabsfd1_0_c0_c0-title-item-${'2'}`">

                                                <text>未完成</text>

                                            </view>
                                            <view
                                                :class="{ 'checkTitlefd1_0_c0_c0': tabs == '1', 'flex flex-wrap align-center': true }"
                                                @tap="tabs = '1'" :id="`benben_tabsfd1_0_c0_c0-title-item-${'1'}`">

                                                <text>已完成</text>

                                            </view>
                                        </view>
                                        <view
                                            :style="{ left: tabsInfofd1_0_c0_c0.lineleft, maxWidth: tabsInfofd1_0_c0_c0.lineWidth, }"
                                            id="benben_tabsfd1_0_c0_c0-line"
                                            class="benben-tabs-line flex benben-flex-tabs-line wodexx_linefd1_0_c0_c0">
                                        </view>
                                    </view>
                                </scroll-view>

                            </benben-flex-tabs>

                        </view>
                    </view>
                    <view class='flex flex-direction flex-wrap align-stretch wodexx_fd1_0_c1'>
                        <view class='flex flex-wrap align-start wodexx_fd1_0_c1_c0' @tap.stop="handleJumpDiy"
                            data-type="navigateTo"
                            :data-url="`/pages/message/newDetail/newDetail?aid=${item.aid}&tabs=2`"
                            v-for="item in listData" :key="item.aid">
                            <image class='wodexx_fd1_0_c1_c0_c0' mode="aspectFit"
                                :src='item.freelearningandtraininglist_picture'></image>
                            <view class='flex flex-direction flex-wrap align-start justify-start flex-sub'>
                                <text class='wodexx_fd1_0_c1_c0_c1_c0'>安全生产教育法规第一条安全生产教育法规第一条</text>
                                <view>
                                    <button class='wodexx_fd1_0_c1_c0_c1_c1' v-if="item.read === '2'">去完成</button>
                                    <button class='wodexx_fd1_0_c1_c0_c1_c1_1' v-if="item.read === '1'">已完成</button>
                                </view>
                            </view>
                        </view>

                        <fu-empty :pagingListLoadedAll="pagingListLoadedAll"
                            :pagingListNoListData="pagingListNoListData" :listDataLength="listDataLength"
                            :isLoadInit="isLoadInit"></fu-empty>
                    </view>
                </view>
            </view>

            <!---flex布局flex布局结束-->


        </view>
    </page-body>
</template>
<script setup lang="ts">
import { GetLatpr } from '@/api/user';
import type { IGetLatprReq, IGetLatprRes } from '@/api/user/type';
import usePageMethod from '@/hooks/usePageMethod';
import { usePagingList } from '@/hooks/usePagingList';
import Message from '@/utils/message';
import { ref, watch, watchEffect } from 'vue';

const { StatusBarRpx, handleJumpDiy, STATIC_URL } = usePageMethod
const tabsInfofd1_0_c0_c0 = ref({ lineleft: '', lineWidth: '', moveX: 0, scrollX: 0, PageScrollX: 0 })
const tabs = ref('2')
const { listData, pagingListLoadedAll, pagingListNoListData, listDataLength, isLoadInit, pagingListToggle } = usePagingList<IGetLatprRes[], IGetLatprReq>({ minixPagingListsApi: GetLatpr, pagingListPostData })

function pagingListPostData() {
    return {
        read: tabs.value
    }
}

watchEffect((onCleanup) => {
    uni.onUserCaptureScreen(() => {
        Message.info('不允许截屏')
    });
    uni.setUserCaptureScreen({ enable: false })

    onCleanup(() => uni.offUserCaptureScreen(() => { }))
})

watch(() => tabs.value, () => pagingListToggle())
</script>
<style lang="scss" scoped>
.page {
    width: 100vw;
    overflow-x: hidden;
    min-height: calc(100vh - var(--window-bottom));
    background: #F8F8F8;
    background-size: 100% auto;
}

.wodexx_flex_0 {
    background: #fff;
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background-size: 100% auto !important;
}

.wodexx_fd0_0_c1_c0 {
    font-size: 36rpx;
    font-weight: 700;
    color: #333333;
    line-height: 50rpx;
}

.wodexx_fd0_0_c0_c0 {
    font-size: 36rpx;
    color: #333;
}

.wodexx_fd0_0_c0 {
    width: 120rpx;
}

.wodexx_fd0_0 {
    padding: 0rpx 32rpx 0rpx 32rpx;
}

.wodexx_fd1_0_c1_c0_c1_c1_1 {
    background: rgba(1, 206, 161, 1);
    border-radius: 33rpx 33rpx 33rpx 33rpx;
    /* width: 125rpx !important; */
    line-height: 56rpx;
    font-size: 26rpx;
    color: #fff;
    font-weight: 500;
    white-space: nowrap;
}

.wodexx_fd1_0_c1_c0_c1_c1 {
    background: #4781f5;
    border-radius: 33rpx 33rpx 33rpx 33rpx;
    /* width: 125rpx; */
    line-height: 56rpx;
    font-size: 26rpx;
    color: #fff;
    font-weight: 500;
}

.wodexx_fd1_0_c1_c0_c1_c0 {
    color: #101010;
    font-size: 32rpx;
    font-weight: 700;
    text-align: left;
    font-style: normal;
    margin: 0rpx 0rpx 24rpx 0rpx;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}

.wodexx_fd1_0_c1_c0_c0 {
    width: 180rpx;
    height: 180rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    margin: 0rpx 24rpx 0rpx 0rpx;
}

.wodexx_fd1_0_c1_c0 {
    background: #FFFFFF;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    height: 228rpx;
    padding: 24rpx;
    margin: 0rpx 0rpx 24rpx 0rpx;
}

.wodexx_fd1_0_c1 {
    background: rgba(251, 250, 246, 1);
    background-size: 100% auto;
    padding: 24rpx;
}

.wodexx_linefd1_0_c0_c0 {
    background: #3090FF;
    width: 40rpx;
    height: 6rpx;
    top: 80rpx;
    background-size: 100% auto !important;
    border-radius: 4rpx 4rpx 4rpx 4rpx;
}

.checkTitlefd1_0_c0_c0 {
    font-weight: 700 !important;
    font-size: 32rpx !important;
    color: #101010 !important;
    background-color: rgba(255, 255, 255, 1) !important;
}

::v-deep .wodexx_benbenTabsfd1_0_c0_c0 {
    background: #fff;
    width: 750rpx;
    height: 90rpx;
    white-space: nowrap;
    text-align: center;
    font-size: 30rpx;
    font-weight: 400;
    font-style: normal;
    color: #81848F;
}

.wodexx_fd1_0_c0 {
    background: rgba(255, 255, 255, 1);
    background-size: 100% auto;
}
</style>