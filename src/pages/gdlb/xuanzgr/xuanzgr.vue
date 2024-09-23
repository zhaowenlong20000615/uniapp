<template>
    <page-body>
        <view class="page">
            <view class="flex benben-position-layout flex flex-wrap align-center xuanzgr_flex_0"
                :style="{ height: (88 + StatusBarRpx) + 'rpx', paddingTop: StatusBarRpx + 'rpx', }">
                <view class='flex flex-wrap align-center justify-between flex-sub xuanzgr_fd0_0'>
                    <view class='flex flex-wrap align-center xuanzgr_fd0_0_c0' @tap.stop="handleJumpDiy"
                        data-type="back" data-url="1">
                        <text class='fu-iconfont2  xuanzgr_fd0_0_c0_c0'>&#xE794;</text>
                    </view>
                    <view class='flex flex-wrap align-stretch justify-center'>
                        <text class='xuanzgr_fd0_0_c1_c0'>选择工人</text>
                    </view>
                    <view class='flex flex-wrap align-center justify-end xuanzgr_fd0_0_c0'>
                    </view>
                </view>

            </view>
            <view :style="{ height: (88 + StatusBarRpx) + 'rpx' }"></view>
            <!---flex布局flex布局开始-->
            <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout">
                <view class='flex flex-direction flex-wrap align-stretch xuanzgr_fd1_0'>
                    <view class='flex flex-wrap align-center xuanzgr_fd1_0_c0'>
                        <image class='xuanzgr_fd1_0_c0_c0' mode="aspectFit" :src='STATIC_URL + "58.png"'></image>
                        <benben-input class='xuanzgr_fd1_0_c0_c1' type="text" :placeholder="`搜索名称`" confirm-type="done"
                            :maxlength="-1" placeholder-style="color:rgba(153, 153, 153, 1);font-size:28rpx"
                            @confirm="pagingListToggle()" v-model="nicknameRef" />
                        <button class='xuanzgr_fd1_0_c0_c2' @tap.stop="pagingListToggle()">搜索</button>
                    </view>
                    <view v-for="item in listData" :key="item.aid" class='flex flex-wrap align-start xuanzgr_fd1_0_c1'>
                        <image class='xuanzgr_fd1_0_c1_c0' mode="aspectFit" :src='item.avatar'
                            @tap="item.select_id = 2"></image>
                        <view class='flex flex-direction flex-wrap align-stretch flex-sub xuanzgr_fd1_0_c1_c1'>
                            <text class='xuanzgr_fd1_0_c1_c1_c0'>{{ item.nickname }}</text>
                            <view class='flex flex-wrap align-center' @tap="item.select_id = 1">
                                <text class='xuanzgr_fd1_0_c1_c1_c1_c0'>入职时间：</text>
                                <text class='xuanzgr_fd1_0_c1_c1_c1_c0'>{{ item.create_time }}</text>
                            </view>
                        </view>
                        <view class='flex flex-direction flex-wrap align-stretch'>
                            <template v-for='(item1, key1) in item.WorkerTypeData' :key="item1.value">
                                <view class='flex flex-wrap align-center' style="margin-bottom: 20rpx"
                                    @tap.stop="clickHandle(item, item1)">
                                    <image v-if="item1.isSelected" class='xuanzgr_fd1_0_c1_c2_c0_c0_c0_c0'
                                        mode="aspectFit" :src='STATIC_URL + "2.png"'></image>
                                    <image v-else class='xuanzgr_fd1_0_c1_c2_c0_c0_c0_c0' mode="aspectFit"
                                        :src='STATIC_URL + "23.png"'></image>
                                    <text class='xuanzgr_fd1_0_c1_c2_c0_c0_c0_c1'>{{ item1.name }}</text>
                                </view>

                            </template>
                        </view>
                    </view>
                </view>

                <fu-empty :pagingListLoadedAll="pagingListLoadedAll" :pagingListNoListData="pagingListNoListData"
                    :listDataLength="listDataLength" :isLoadInit="isLoadInit"></fu-empty>
            </view>

            <!---flex布局flex布局结束-->
            <view class="flex flex-wrap align-start justify-center benben-position-layout flex xuanzgr_flex_2"
                :style="{ height: (128 + bottomSafeAreaRpx) + 'rpx', paddingBottom: bottomSafeAreaRpx + 'rpx', }">
                <button class='xuanzgr_fd2_0' @tap.stop="chooseHandle" data-type="navigateTo"
                    :data-url="`/pages/gdlb/cailiaofp/cailiaofp`">下一步材料分配</button>
            </view>
            <view :style="{ height: (128 + bottomSafeAreaRpx) + 'rpx' }"></view>
        </view>
    </page-body>
</template>
<script setup lang="ts">
import { GetWorkerList } from '@/api/home';
import type { IGetWorkerListReq, IGetWorkerListRes } from '@/api/home/type';
import { WorkerTypeData } from '@/constant/mock';
import usePageMethod from '@/hooks/usePageMethod';
import { usePagingList } from '@/hooks/usePagingList';
import { useWorkerStore } from '@/store/model/worker';
import Message from '@/utils/message';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';

onLoad((options: any) => {
    const { aid } = options
    if (aid) aidRef.value = aid
})

const workerStore = useWorkerStore()
const { handleJumpDiy, bottomSafeAreaRpx, STATIC_URL, StatusBarRpx } = usePageMethod
const nicknameRef = ref('')
const aidRef = ref('')
const { listData, pagingListLoadedAll, pagingListNoListData, listDataLength, isLoadInit, pagingListToggle } = usePagingList<IGetWorkerListRes[], IGetWorkerListReq>({ minixPagingListsApi: GetWorkerList, pagingListPostData, formatDataFn })

function formatDataFn() {
    listData.value = listData.value.map(item => ({ ...item, select_id: 1, WorkerTypeData: JSON.parse(JSON.stringify(WorkerTypeData)) }))
}

function pagingListPostData() {
    return {
        nickname: nicknameRef.value
    }
}

function clickHandle(item: IGetWorkerListRes, item1: typeof WorkerTypeData[0]) {
    if (item1.value === 1) listData.value.forEach(item => item.WorkerTypeData.forEach(item1 => { if (item1.value === 1) item1.isSelected = false }))
    item.WorkerTypeData.forEach(item => item.isSelected = false)
    item1.isSelected = !item1.isSelected
}

function chooseHandle() {
    const arr = listData.value.map(item => {
        const tempArr = item.WorkerTypeData.filter(item1 => item1.isSelected)
        const major = tempArr.at(0)?.value === 1 ? item.aid : null
        const secondary_repair = tempArr.at(0)?.value === 2 ? item.aid : null
        if (tempArr.length > 0) return { ...item, major, secondary_repair }
    }).filter(item => item) as IGetWorkerListRes[]
    if (arr.length <= 0) return Message.info('请选择工人！')
    workerStore.setChooseWorkerData(arr)
    uni.navigateTo({ url: `/pages/gdlb/cailiaofp/cailiaofp?aid=${aidRef.value}` })
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

.xuanzgr_flex_0 {
    background: #fff;
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background-size: 100% auto !important;
}

.xuanzgr_fd0_0_c1_c0 {
    font-size: 36rpx;
    font-weight: 700;
    color: #333333;
    line-height: 50rpx;
}

.xuanzgr_fd0_0_c0_c0 {
    font-size: 36rpx;
    color: #333;
}

.xuanzgr_fd0_0_c0 {
    width: 120rpx;
}

.xuanzgr_fd0_0 {
    padding: 0rpx 32rpx 0rpx 32rpx;
}

.xuanzgr_fd1_0_c1_c2_c0_c1_c0_c1 {
    color: #BFBFBF;
    font-size: 26rpx;
    font-weight: 400;
    text-align: left;
    font-style: normal;
}

.xuanzgr_fd1_0_c1_c2_c0_c0_c0_c1 {
    color: #333333;
    font-size: 26rpx;
    font-weight: 400;
    text-align: left;
    font-style: normal;
}

.xuanzgr_fd1_0_c1_c2_c0_c0_c0_c0 {
    width: 32rpx;
    height: 32rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    margin: 0rpx 16rpx 0rpx 0rpx;
}

.xuanzgr_fd1_0_c1_c2_c0_c0 {
    margin: 0rpx 0rpx 24rpx 0rpx;
}

.xuanzgr_fd1_0_c1_c1_c1_c0 {
    color: #999999;
    font-size: 24rpx;
    font-weight: 400;
    text-align: left;
    font-style: normal;
}

.xuanzgr_fd1_0_c1_c1_c0 {
    color: #101010;
    font-size: 28rpx;
    font-weight: 700;
    text-align: left;
    font-style: normal;
    margin: 0rpx 0rpx 7rpx 0rpx;
}

.xuanzgr_fd1_0_c1_c1 {
    margin: 8rpx 0rpx 0rpx 0rpx;
}

.xuanzgr_fd1_0_c1_c0 {
    width: 96rpx;
    height: 96rpx;
    border-radius: 96rpx;
    margin: 0rpx 24rpx 0rpx 0rpx;
}

.xuanzgr_fd1_0_c1 {
    background: #FFFFFF;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    margin: 0rpx 0rpx 24rpx 0rpx;
    padding: 24rpx 24rpx 24rpx 24rpx;
}

.xuanzgr_fd1_0_c0_c2 {
    background: rgba(48, 144, 255, 1);
    border-radius: 34rpx 34rpx 34rpx 34rpx;
    width: 120rpx;
    line-height: 64rpx;
    font-size: 24rpx;
    color: #fff;
    height: 64rpx;
    margin: 0rpx 4rpx 0rpx auto;
}

.xuanzgr_fd1_0_c0_c1 {
    color: var(--benbenFontColor0);
    font-size: 28rpx;
    font-weight: 500;
}

.xuanzgr_fd1_0_c0_c0 {
    width: 32rpx;
    height: 32rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    margin: 0rpx 16rpx 0rpx 32rpx;
}

.xuanzgr_fd1_0_c0 {
    border: 1px solid rgba(48, 144, 255, 1);
    background: rgba(255, 255, 255, 1);
    height: 72rpx;
    border-radius: 34rpx 34rpx 34rpx 34rpx;
    margin: 24rpx 0rpx 24rpx 0rpx;
}

.xuanzgr_fd1_0 {
    padding: 0rpx 24rpx 0rpx 24rpx;
}

.xuanzgr_flex_2 {
    background: #F8F8F8;
    width: 750rpx;
    height: 128rpx;
    overflow: hidden;
    z-index: 10;
    bottom: calc(0rpx + var(--window-bottom));
    bottom: 0;
    background-size: 100% auto;
}

.xuanzgr_fd2_0 {
    background: #3090FF;
    border-radius: 44rpx 44rpx 44rpx 44rpx;
    width: 702rpx;
    line-height: 88rpx;
    font-size: 32rpx;
    color: #fff;
    height: 88rpx;
}
</style>