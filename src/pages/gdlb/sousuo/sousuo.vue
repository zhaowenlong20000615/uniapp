<template>
    <page-body>
        <view class="page">
            <view class="flex benben-position-layout flex flex-wrap align-center sousuo_flex_0"
                :style="{ height: (88 + StatusBarRpx) + 'rpx', paddingTop: StatusBarRpx + 'rpx', }">
                <view class='flex flex-wrap align-center justify-between flex-sub sousuo_fd0_0'>
                    <view class='flex flex-wrap align-center sousuo_fd0_0_c0' @tap.stop="handleJumpDiy" data-type="back"
                        data-url="1">
                        <text class='fu-iconfont2  sousuo_fd0_0_c0_c0'>&#xE794;</text>
                    </view>
                    <view class='flex flex-wrap align-stretch justify-center'>
                        <text class='sousuo_fd0_0_c1_c0'>搜索</text>
                    </view>
                    <view class='flex flex-wrap align-center justify-end sousuo_fd0_0_c0'>
                    </view>
                </view>

            </view>
            <view :style="{ height: (88 + StatusBarRpx) + 'rpx' }"></view>
            <!---flex布局flex布局开始-->
            <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout">
                <view class='flex flex-direction flex-wrap align-stretch sousuo_fd1_0'>
                    <view style="height:150rpx;"></view>
                    <view class="fixed-box" :style="{ top: (88 + StatusBarRpx) + 'rpx' }">
                        <view class='flex flex-wrap align-center sousuo_fd1_0_c0'>
                            <image class='sousuo_fd1_0_c0_c0' mode="aspectFit" :src='STATIC_URL + "58.png"'></image>
                            <benben-input class='sousuo_fd1_0_c0_c1' type="text" :placeholder="`华府小区`"
                                confirm-type="done" :maxlength="-1"
                                placeholder-style="color:rgba(153, 153, 153, 1);font-size:28rpx"
                                @confirm="pagingListToggle()" v-model="freeengineeringprojects_entry_name" />
                            <button class='sousuo_fd1_0_c0_c2' @tap.stop="pagingListToggle()">搜索</button>
                        </view>
                    </view>
                    <text class='sousuo_fd1_0_c1'>工单列表</text>
                    <view class='flex flex-direction flex-wrap align-stretch sousuo_fd1_0_c2' @tap.stop="handleJumpDiy"
                        v-for="item in listData" :key="item.aid" data-type="navigateTo"
                        :data-url="`/pages/gdlb/xtbzfp/xtbzfp?aid=${item.aid}`">
                        <view class='flex flex-wrap align-center justify-between sousuo_fd1_0_c2_c0'>
                            <view class='flex flex-wrap align-center'>
                                <text class='sousuo_fd1_0_c2_c0_c0_c0'>项目名称 :</text>
                                <text
                                    class='sousuo_fd1_0_c2_c0_c0_c0'>{{ item.freeengineeringprojects_entry_name }}</text>
                            </view>
                            <text class='sousuo_fd1_0_c2_c0_c1' v-if="item.system_state == '1'">待分配</text><text
                                class='sousuo_fd1_0_c2_c0_c1_1' v-if="item.system_state == '2'">进行中</text><text
                                class='sousuo_fd1_0_c2_c0_c1_2' v-if="item.system_state == '3'">已完成</text>
                        </view>
                        <view class='flex flex-wrap align-center justify-between sousuo_fd1_0_c2_c0'>
                            <view class='flex flex-wrap align-center'>
                                <text class='sousuo_fd1_0_c2_c1_c0_c0'>项目地点</text>
                                <text
                                    class='sousuo_fd1_0_c2_c1_c0_c1'>{{ item.freeengineeringprojects_project_location }}</text>
                            </view>
                            <view class='flex flex-wrap align-center'>
                                <text class='sousuo_fd1_0_c2_c1_c1_c0'>区域名称</text>
                                <text class='sousuo_fd1_0_c2_c1_c0_c1'>{{ item.freeregion_area_name }}</text>
                            </view>
                        </view>
                        <view class='flex flex-wrap align-center justify-between sousuo_fd1_0_c2_c0'>
                            <view class='flex flex-wrap align-center'>
                                <text class='sousuo_fd1_0_c2_c1_c0_c0'>系统名称</text>
                                <text class='sousuo_fd1_0_c2_c1_c0_c1'>{{ item.freesystem_system_name }}</text>
                            </view>
                            <view class='flex flex-wrap align-center'>
                                <text class='sousuo_fd1_0_c2_c1_c1_c0'>建筑物名称</text>
                                <text class='sousuo_fd1_0_c2_c1_c0_c1'>{{ item.freebuilding_building }}</text>
                            </view>
                        </view>
                        <view class='flex flex-wrap align-center justify-between sousuo_fd1_0_c2_c0'>
                            <view class='flex flex-wrap align-center'>
                                <text class='sousuo_fd1_0_c2_c1_c0_c0'>点位数量</text>
                                <text class='sousuo_fd1_0_c2_c3_c0_c1'>{{ item.free_field_14876 }}</text>
                            </view>
                        </view>
                        <view class='flex flex-wrap align-center justify-between sousuo_fd1_0_c2_c0'>
                            <view class='flex flex-wrap align-center'>
                                <text class='sousuo_fd1_0_c2_c1_c0_c0'>项目周期</text>
                                <text class='sousuo_fd1_0_c2_c4_c0_c1'>{{ item.freeengineeringprojects_start_time }} -
                                    {{ item.freeengineeringprojects_end_time }}</text>
                            </view>
                        </view>
                        <view class='flex flex-wrap align-center justify-between'>
                            <view class='flex flex-wrap align-center'>
                                <text class='sousuo_fd1_0_c2_c1_c0_c0'>施工周期</text>
                                <text class='sousuo_fd1_0_c2_c4_c0_c1'>{{ item.construction_start_time }} -
                                    {{ item.construction_completion_time }}</text>
                            </view>
                        </view>
                    </view>

                    <fu-empty :pagingListLoadedAll="pagingListLoadedAll" :pagingListNoListData="pagingListNoListData"
                        :listDataLength="listDataLength" :isLoadInit="isLoadInit"></fu-empty>
                </view>
            </view>

            <!---flex布局flex布局结束-->


        </view>
    </page-body>
</template>
<script setup lang="ts">
import { GetProjectsystemworkorder } from '@/api/home';
import type { IGetProjectsystemworkorderReq, IGetProjectsystemworkorderRes } from '@/api/home/type';
import { EventBusKey } from '@/constant';
import usePageMethod from '@/hooks/usePageMethod';
import { usePagingList } from '@/hooks/usePagingList';
import { ref, watchEffect } from 'vue';

const { STATIC_URL, handleJumpDiy, StatusBarRpx } = usePageMethod
const freeengineeringprojects_entry_name = ref('')

const { listData, pagingListLoadedAll, pagingListNoListData, listDataLength, isLoadInit, pagingListToggle } = usePagingList<IGetProjectsystemworkorderRes[], IGetProjectsystemworkorderReq>({ minixPagingListsApi: GetProjectsystemworkorder, pagingListPostData })

watchEffect((onCleanup) => {
    uni.$on(EventBusKey.WORK_ORDER_LIST, () => pagingListToggle())
    onCleanup(() => uni.$off(EventBusKey.WORK_ORDER_LIST))
})

function pagingListPostData() {
    return {
        freeengineeringprojects_entry_name: freeengineeringprojects_entry_name.value
    }
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

.sousuo_flex_0 {
    background: #fff;
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background-size: 100% auto !important;
}

.sousuo_fd0_0_c1_c0 {
    font-size: 36rpx;
    font-weight: 700;
    color: #333333;
    line-height: 50rpx;
}

.sousuo_fd0_0_c0_c0 {
    font-size: 36rpx;
    color: #333;
}

.sousuo_fd0_0_c0 {
    width: 120rpx;
}

.sousuo_fd0_0 {
    padding: 0rpx 32rpx 0rpx 32rpx;
}

.sousuo_fd1_0_c2_c4_c0_c1 {
    color: rgba(0, 0, 0, 1);
    font-size: 28rpx;
    font-weight: 400;
    text-align: right;
    font-style: normal;
}

.sousuo_fd1_0_c2_c3_c0_c1 {
    color: rgba(48, 144, 255, 1);
    font-size: 28rpx;
    font-weight: 400;
    text-align: right;
    font-style: normal;
}

.sousuo_fd1_0_c2_c1_c1_c0 {
    color: #666666;
    font-size: 28rpx;
    font-weight: 400;
    text-align: left;
    font-style: normal;
    min-width: 166rpx;
}

.sousuo_fd1_0_c2_c1_c0_c1 {
    color: #101010;
    font-size: 28rpx;
    font-weight: 400;
    text-align: right;
    font-style: normal;
}

.sousuo_fd1_0_c2_c1_c0_c0 {
    color: #666666;
    font-size: 28rpx;
    font-weight: 400;
    text-align: left;
    font-style: normal;
    margin: 0rpx 24rpx 0rpx 0rpx;
}

.sousuo_fd1_0_c2_c0_c1_2 {
    background: rgba(1, 206, 161, 0.14);
    border-radius: 8rpx 8rpx 8rpx 8rpx;
    color: rgba(1, 206, 161, 1);
    padding: 4rpx 10rpx 4rpx 10rpx;
}

.sousuo_fd1_0_c2_c0_c1_1 {
    background: rgba(48, 144, 255, 0.14);
    border-radius: 8rpx 8rpx 8rpx 8rpx;
    color: rgba(48, 144, 255, 1);
    padding: 4rpx 10rpx 4rpx 10rpx;
}

.sousuo_fd1_0_c2_c0_c1 {
    background: rgba(255, 64, 64, 0.14);
    border-radius: 8rpx 8rpx 8rpx 8rpx;
    color: rgba(255, 64, 64, 1);
    padding: 4rpx 10rpx 4rpx 10rpx;
}

.sousuo_fd1_0_c2_c0_c0_c0 {
    color: #101010;
    font-size: 32rpx;
    font-weight: 700;
    text-align: left;
    font-style: normal;
}

.sousuo_fd1_0_c2_c0 {
    margin: 0rpx 0rpx 24rpx 0rpx;
}

.sousuo_fd1_0_c2 {
    background: #FFFFFF;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    padding: 32rpx 24rpx 32rpx 24rpx;
    margin-bottom: 24rpx;
}

.sousuo_fd1_0_c1 {
    color: #101010;
    font-size: 32rpx;
    font-weight: 700;
    font-style: normal;
    margin: 0rpx 0rpx 24rpx 0rpx;
}

.sousuo_fd1_0_c0_c2 {
    background: rgba(48, 144, 255, 1);
    border-radius: 34rpx 34rpx 34rpx 34rpx;
    width: 120rpx;
    line-height: 64rpx;
    font-size: 24rpx;
    color: #fff;
    height: 64rpx;
    margin: 0rpx 4rpx 0rpx auto;
}

.sousuo_fd1_0_c0_c1 {
    color: var(--benbenFontColor0);
    font-size: 28rpx;
    font-weight: 500;
}

.sousuo_fd1_0_c0_c0 {
    width: 32rpx;
    height: 32rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    margin: 0rpx 16rpx 0rpx 32rpx;
}

.sousuo_fd1_0_c0 {
    background: rgba(255, 255, 255, 1);
    height: 72rpx;
    border-radius: 34rpx 34rpx 34rpx 34rpx;
    margin: 24rpx 0rpx 24rpx 0rpx;
}

.sousuo_fd1_0 {
    padding: 0rpx 24rpx 0rpx 24rpx;
}
</style>