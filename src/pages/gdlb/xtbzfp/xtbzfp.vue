<template>
    <page-body>
        <view class="page">
            <view class="flex benben-position-layout flex flex-wrap align-center xtbzfp_flex_0"
                :style="{ height: (88 + StatusBarRpx) + 'rpx', paddingTop: StatusBarRpx + 'rpx', }">
                <view class='flex flex-wrap align-center justify-between flex-sub xtbzfp_fd0_0'>
                    <view class='flex flex-wrap align-center xtbzfp_fd0_0_c0' @tap.stop="handleJumpDiy" data-type="back"
                        data-url="1">
                        <text class='fu-iconfont2  xtbzfp_fd0_0_c0_c0'>&#xE794;</text>
                    </view>
                    <view class='flex flex-wrap align-stretch justify-center'>
                        <text class='xtbzfp_fd0_0_c1_c0'>工单详情</text>
                    </view>
                    <view class='flex flex-wrap align-center justify-end xtbzfp_fd0_0_c0'>
                    </view>
                </view>

            </view>
            <view :style="{ height: (88 + StatusBarRpx) + 'rpx' }"></view>
            <!---flex布局flex布局开始-->
            <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout">
                <view class='flex flex-direction flex-wrap align-stretch xtbzfp_fd1_0'>
                    <Info v-if="infoRef" v-model:itemData="infoRef!" />
                    <Tabs v-model="tabs" @change="pagingListToggle()" />
                    <Card v-model:itemData="listData" />
                    <fu-empty :pagingListLoadedAll="pagingListLoadedAll" :pagingListNoListData="pagingListNoListData"
                        :listDataLength="listDataLength" :isLoadInit="isLoadInit"></fu-empty>
                </view>
            </view>

            <!---flex布局flex布局结束-->


        </view>
    </page-body>
</template>

<script setup lang="ts">
import { GetProjectsystemworkorderInfo, GetSystempointlocationList } from '@/api/home';
import type { IGetProjectsystemworkorderInfoRes, IGetSystempointlocationListReq, IGetSystempointlocationListRes } from '@/api/home/type';
import { EventBusKey } from '@/constant';
import usePageMethod from '@/hooks/usePageMethod';
import { usePagingList } from '@/hooks/usePagingList';
import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app';
import { ref, watchEffect } from 'vue';
import Card from './c-cpns/card/index.vue';
import Info from './c-cpns/info/index.vue';
import Tabs from './c-cpns/tabs/index.vue';

onLoad(async (options: any) => {
    const { aid } = options
    if (aid) aidRef.value = aid
    await getProjectsystemworkorderInfo()
    pagingListToggle()
})

onPullDownRefresh(async () => {
    getProjectsystemworkorderInfo()
})

const { StatusBarRpx, handleJumpDiy } = usePageMethod
const { listData, pagingListLoadedAll, pagingListNoListData, listDataLength, isLoadInit, pagingListToggle } = usePagingList<IGetSystempointlocationListRes[], IGetSystempointlocationListReq>({ minixPagingListsApi: GetSystempointlocationList, pagingListPostData, allowOnloadGetList: false })
const aidRef = ref('')
const tabs = ref('0')
const infoRef = ref<IGetProjectsystemworkorderInfoRes>()

async function getProjectsystemworkorderInfo() {
    const { data } = await GetProjectsystemworkorderInfo({ aid: aidRef.value })
    infoRef.value = data
}

watchEffect((onCleanup) => {
    uni.$on(EventBusKey.WORK_ORDER_DETAILS, () => {
        pagingListToggle()
        getProjectsystemworkorderInfo()
    })
    onCleanup(() => uni.$off(EventBusKey.WORK_ORDER_DETAILS))
})

function pagingListPostData() {
    return {
        state: tabs.value === '0' ? '' : tabs.value,
        freesystem_id: infoRef.value?.freesystem_id!,
        freeprojectsystemworkorder_id: infoRef.value?.aid
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

.xtbzfp_flex_0 {
    background: #fff;
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background-size: 100% auto !important;
}

.xtbzfp_fd0_0_c1_c0 {
    font-size: 36rpx;
    font-weight: 700;
    color: #333333;
    line-height: 50rpx;
}

.xtbzfp_fd0_0_c0_c0 {
    font-size: 36rpx;
    color: #333;
}

.xtbzfp_fd0_0_c0 {
    width: 120rpx;
}

.xtbzfp_fd0_0 {
    padding: 0rpx 32rpx 0rpx 32rpx;
}




.xtbzfp_linefd1_0_c1_c0 {
    background: #3090FF;
    width: 40rpx;
    height: 6rpx;
    top: 80rpx;
    background-size: 100% auto !important;
    border-radius: 4rpx 4rpx 4rpx 4rpx;
}

.checkTitlefd1_0_c1_c0 {
    font-weight: 700 !important;
    font-size: 32rpx !important;
    color: #101010 !important;
    background-color: #FBFAF6 !important;
}

::v-deep .xtbzfp_benbenTabsfd1_0_c1_c0 {
    width: 750rpx;
    height: 90rpx;
    white-space: nowrap;
    text-align: center;
    font-size: 30rpx;
    font-weight: 400;
    font-style: normal;
    color: #81848F;
}

.xtbzfp_fd1_0_c0_c1_c4_c0_c1 {
    color: rgba(0, 0, 0, 1);
    font-size: 28rpx;
    font-weight: 400;
    text-align: right;
    font-style: normal;
}

.xtbzfp_fd1_0_c0_c1_c3_c0_c1 {
    color: rgba(48, 144, 255, 1);
    font-size: 28rpx;
    font-weight: 400;
    text-align: right;
    font-style: normal;
}

.xtbzfp_fd1_0_c0_c1_c1_c1_c0 {
    color: #666666;
    font-size: 28rpx;
    font-weight: 400;
    text-align: left;
    font-style: normal;
    min-width: 166rpx;
}

.xtbzfp_fd1_0_c0_c1_c1_c0_c1 {
    color: #101010;
    font-size: 28rpx;
    font-weight: 400;
    text-align: right;
    font-style: normal;
}

.xtbzfp_fd1_0_c0_c1_c1_c0_c0 {
    color: #666666;
    font-size: 28rpx;
    font-weight: 400;
    text-align: left;
    font-style: normal;
    margin: 0rpx 24rpx 0rpx 0rpx;
}


.xtbzfp_fd1_0_c0_c1 {
    background: #FFFFFF;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    padding: 32rpx 24rpx 32rpx 24rpx;
}

.xtbzfp_fd1_0_c0_c0 {
    color: #101010;
    font-size: 32rpx;
    font-weight: 700;
    font-style: normal;
    margin: 24rpx 0rpx 24rpx 0rpx;
}

.xtbzfp_fd1_0_c0 {
    padding: 0rpx 24rpx 0rpx 24rpx;
}

.xtbzfp_fd1_0 {
    background: #FBFAF6;
    background-size: 100% auto;
}
</style>