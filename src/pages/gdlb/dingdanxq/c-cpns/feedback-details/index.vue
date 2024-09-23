<template>
    <view class='flex flex-direction flex-wrap align-stretch dingdanxq_fd1_0_c0_c3' v-for="(item, index) in listData"
        :key="item.aid">
        <text class='dingdanxq_fd1_0_c0_c2_c0' v-if="index === 0">反馈详情</text>
        <view class='flex flex-wrap align-center justify-between dingdanxq_fd1_0_c0_c0_c0'>
            <text class='dingdanxq_fd1_0_c0_c0_c0_c0'>反馈时间</text>
            <text class='dingdanxq_fd1_0_c0_c2_c1_c1'>{{ item.create_time }}</text>
        </view>
        <view class='flex flex-wrap align-center justify-between dingdanxq_fd1_0_c0_c0_c0'>
            <text class='dingdanxq_fd1_0_c0_c0_c0_c0'>反馈说明</text>
            <text class='dingdanxq_fd1_0_c0_c2_c1_c1'>{{ item.feedback_explanation }}</text>
        </view>
        <view class='flex flex-direction flex-wrap align-stretch dingdanxq_fd1_0_c0_c2_c3'>
            <text class='dingdanxq_fd1_0_c0_c2_c3_c0'>反馈现场</text>
            <view class='flex flex-wrap align-center'>
                <image class='dingdanxq_fd1_0_c0_c2_c3_c1_c0' v-for="item1 in item.on_site_images" mode="aspectFit"
                    :src='item1'></image>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { GetFeedbackrecord } from '@/api/home';
import type { IGetFeedbackrecordReq, IGetFeedbackrecordRes } from '@/api/home/type';
import usePageMethod from '@/hooks/usePageMethod';
import { usePagingList } from '@/hooks/usePagingList';
import { useWorkerStore } from '@/store/model/worker';

interface IProps {
    aid: string | number
}

const props = defineProps<IProps>()

const { STATIC_URL } = usePageMethod
const workerStore = useWorkerStore()

const { listData, pagingListLoadedAll, pagingListNoListData, listDataLength, isLoadInit, pagingListToggle } = usePagingList<IGetFeedbackrecordRes[], IGetFeedbackrecordReq>({ minixPagingListsApi: GetFeedbackrecord, pagingListPostData, formatDataFn })

function formatDataFn() {
    listData.value.forEach(item => {
        if (item.whether_to_rectify_or_not === '2') return workerStore.setWhetherToRectifyOrNot(item.aid, item.whether_to_rectify_or_not)
    })
}

function pagingListPostData() {
    return {
        freesystempointlocation_id: props.aid,
    }
}

defineExpose({ pagingListToggle })
</script>

<style scoped lang="scss">
.dingdanxq_fd1_0_c0_c3 {
    background: #FFFFFF;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    padding: 32rpx 24rpx 32rpx 24rpx;
    margin: 0rpx 0rpx 24rpx 0rpx;
}

.dingdanxq_fd1_0_c0_c2_c0 {
    color: #101010;
    font-size: 32rpx;
    font-weight: 700;
}

.dingdanxq_fd1_0_c0_c0_c0_c1 {
    color: #101010;
    font-size: 32rpx;
    font-weight: 400;
    line-height: 56rpx;
    text-align: left;
    font-style: normal;
}

.dingdanxq_fd1_0_c0_c0_c0_c0 {
    color: #666666;
    font-size: 32rpx;
    font-weight: 400;
    text-align: left;
    font-style: normal;
    line-height: 56rpx;
}

.dingdanxq_fd1_0_c0_c0_c0 {
    border-bottom: 1px solid #eee;
    padding: 32rpx 0rpx 32rpx 0rpx;
}

.dingdanxq_fd1_0_c0_c2_c1_c1 {
    color: #101010;
    font-size: 32rpx;
    font-weight: 400;
    line-height: 56rpx;
    text-align: right;
    font-style: normal;
}

.dingdanxq_fd1_0_c0_c2_c3_c1_c0 {
    width: 200rpx;
    height: 200rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    margin: 0rpx 24rpx 0rpx 0rpx;
}

.dingdanxq_fd1_0_c0_c2_c3_c0 {
    color: #666666;
    font-size: 32rpx;
    font-weight: 400;
    text-align: left;
    font-style: normal;
    line-height: 56rpx;
    margin: 0rpx 0rpx 24rpx 0rpx;
}

.dingdanxq_fd1_0_c0_c2_c3 {
    border-bottom: 1px solid #eee;
    padding: 32rpx 0rpx 0rpx 0rpx;
}
</style>