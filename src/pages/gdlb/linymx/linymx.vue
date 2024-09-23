<template>
    <page-body>
        <view class="page">
            <view class="flex benben-position-layout flex flex-wrap align-center linymx_flex_0"
                :style="{ height: (88 + StatusBarRpx) + 'rpx', paddingTop: StatusBarRpx + 'rpx', }">
                <view class='flex flex-wrap align-center justify-between flex-sub linymx_fd0_0'>
                    <view class='flex flex-wrap align-center linymx_fd0_0_c0' @tap.stop="handleJumpDiy" data-type="back"
                        data-url="1">
                        <text class='fu-iconfont2  linymx_fd0_0_c0_c0'>&#xE794;</text>
                    </view>
                    <view class='flex flex-wrap align-stretch justify-center'>
                        <text class='linymx_fd0_0_c1_c0'>领用明细</text>
                    </view>
                    <view class='flex flex-wrap align-center justify-end linymx_fd0_0_c0'>
                    </view>
                </view>

            </view>
            <view :style="{ height: (88 + StatusBarRpx) + 'rpx' }"></view>
            <!---flex布局flex布局开始-->
            <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout">
                <view class='flex flex-direction flex-wrap align-stretch linymx_fd1_0' v-for="item in listData"
                    :key="item.aid">
                    <view class='flex flex-direction flex-wrap align-stretch linymx_fd1_0_c0'>
                        <view class='flex flex-wrap align-center justify-between linymx_fd1_0_c0_c0'>
                            <text class='linymx_fd1_0_c0_c0_c0'>材料名称</text>
                            <text
                                class='linymx_fd1_0_c0_c0_c1'>{{ item.freematerialinformation_material_science }}</text>
                        </view>
                        <view class='flex flex-wrap align-center justify-between linymx_fd1_0_c0_c0'>
                            <text class='linymx_fd1_0_c0_c0_c0'>区域名称</text>
                            <text class='linymx_fd1_0_c0_c0_c1'>{{ item.quyu.freewarehousearea_region }}</text>
                        </view>
                        <view class='flex flex-wrap align-center justify-between linymx_fd1_0_c0_c1'>
                            <text class='linymx_fd1_0_c0_c0_c0'>领取数量</text>
                            <text class='linymx_fd1_0_c0_c0_c1'>{{ item.quantity_received }}</text>
                        </view>
                    </view>
                </view>
            </view>

            <fu-empty :pagingListLoadedAll="pagingListLoadedAll" :pagingListNoListData="pagingListNoListData"
                :listDataLength="listDataLength" :isLoadInit="isLoadInit"></fu-empty>

            <!---flex布局flex布局结束-->
            <!-- <view class="flex flex-wrap align-start justify-center benben-position-layout flex linymx_flex_2"
                :style="{ height: (128 + bottomSafeAreaRpx) + 'rpx', paddingBottom: bottomSafeAreaRpx + 'rpx', }">
                <button class='linymx_fd2_0'>已确认领取</button>

            </view>
            <view :style="{ height: (128 + bottomSafeAreaRpx) + 'rpx' }"></view> -->


        </view>
    </page-body>
</template>
<script setup lang="ts">
import { GetProcessmaterials } from '@/api/home';
import type { IGetProcessmaterialsReq, IGetProcessmaterialsRes } from '@/api/home/type';
import usePageMethod from '@/hooks/usePageMethod';
import { usePagingList } from '@/hooks/usePagingList';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';

onLoad((options: any) => {
    const { freesystempointlocation_id } = options
    if (freesystempointlocation_id) freesystempointlocation_idRef.value = freesystempointlocation_id
})

const { StatusBarRpx, handleJumpDiy } = usePageMethod
const freesystempointlocation_idRef = ref('')
const { listData, pagingListLoadedAll, pagingListNoListData, listDataLength, isLoadInit } = usePagingList<IGetProcessmaterialsRes[], IGetProcessmaterialsReq>({ minixPagingListsApi: GetProcessmaterials, pagingListPostData })

function pagingListPostData() {
    return {
        freesystempointlocation_id: freesystempointlocation_idRef.value
    }
}
</script>
<style lang="scss" scoped>
.page {
    width: 100vw;
    overflow-x: hidden;
    min-height: calc(100vh - var(--window-bottom));
    background: rgba(251, 250, 246, 1);
    background-size: 100% auto;
}

.linymx_flex_0 {
    background: #fff;
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background-size: 100% auto !important;
}

.linymx_fd0_0_c1_c0 {
    font-size: 36rpx;
    font-weight: 700;
    color: #333333;
    line-height: 50rpx;
}

.linymx_fd0_0_c0_c0 {
    font-size: 36rpx;
    color: #333;
}

.linymx_fd0_0_c0 {
    width: 120rpx;
}

.linymx_fd0_0 {
    padding: 0rpx 32rpx 0rpx 32rpx;
}

.linymx_fd1_0_c0_c1 {
    padding: 32rpx 0rpx 32rpx 0rpx;
}

.linymx_fd1_0_c0_c0_c1 {
    color: #101010;
    font-size: 32rpx;
    font-weight: 400;
    line-height: 56rpx;
    text-align: left;
    font-style: normal;
}

.linymx_fd1_0_c0_c0_c0 {
    color: #666666;
    font-size: 32rpx;
    font-weight: 400;
    text-align: left;
    font-style: normal;
    line-height: 56rpx;
}

.linymx_fd1_0_c0_c0 {
    border-bottom: 1px solid #eee;
    padding: 32rpx 0rpx 32rpx 0rpx;
}

.linymx_fd1_0_c0 {
    background: #FFFFFF;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    padding: 0rpx 24rpx 0rpx 24rpx;
    margin: 0rpx 0rpx 24rpx 0rpx;
}

.linymx_fd1_0 {
    padding: 24rpx;
}

.linymx_flex_2 {
    background: rgba(251, 250, 246, 1);
    width: 750rpx;
    height: 128rpx;
    overflow: hidden;
    z-index: 10;
    bottom: calc(0rpx + var(--window-bottom));
    background-size: 100% auto;
}

.linymx_fd2_0 {
    background: #3090FF;
    border-radius: 44rpx 44rpx 44rpx 44rpx;
    width: 702rpx;
    line-height: 88rpx;
    font-size: 32rpx;
    color: #fff;
    height: 88rpx;
}
</style>