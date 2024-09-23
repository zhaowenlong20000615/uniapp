<template>
    <view class='flex flex-direction flex-wrap align-stretch dingdanxq_fd1_0_c0_c0'>
        <view class='flex flex-wrap align-center justify-between dingdanxq_fd1_0_c0_c0_c0'>
            <text class='dingdanxq_fd1_0_c0_c0_c0_c0'>点位名称</text>
            <text class='dingdanxq_fd1_0_c0_c0_c0_c1'>{{ itemData.system_point_location }}</text>
        </view>
        <view class='flex flex-wrap align-center justify-between dingdanxq_fd1_0_c0_c0_c0'>
            <text class='dingdanxq_fd1_0_c0_c0_c0_c0'>点位状态</text>
            <text class='dingdanxq_fd1_0_c0_c0_c0_c1'>{{ itemData.state_name }}</text>
        </view>
        <view class='flex flex-wrap align-center justify-between dingdanxq_fd1_0_c0_c0_c0'>
            <text class='dingdanxq_fd1_0_c0_c0_c0_c0'>点位主修人员</text>
            <text class='dingdanxq_fd1_0_c0_c0_c0_c1'>{{ itemData.major_name }}</text>
        </view>
        <view class='flex flex-wrap align-center justify-between dingdanxq_fd1_0_c0_c0_c0'>
            <text class='dingdanxq_fd1_0_c0_c0_c0_c0'>点位次修人员</text>
            <text class='dingdanxq_fd1_0_c0_c0_c0_c1'>{{ itemData.secondary_repair_name }}</text>
        </view>
        <view v-if="itemData.material_requisition === '1'"
            class='flex flex-wrap align-center justify-between dingdanxq_fd1_0_c0_c0_c4' @tap.stop="handleJumpDiy"
            data-type="navigateTo" :data-url="`/pages/gdlb/linymx/linymx?freesystempointlocation_id=${itemData.aid}`">
            <text class='dingdanxq_fd1_0_c0_c0_c0_c0'>物资是否领用</text>
            <text class='dingdanxq_fd1_0_c0_c0_c0_c1'>{{ itemData.material_requisition_name }}</text>
        </view>
        <view v-else class='flex flex-wrap align-center justify-between dingdanxq_fd1_0_c0_c0_c4'>
            <text class='dingdanxq_fd1_0_c0_c0_c0_c0'>物资是否领用</text>
            <text class='dingdanxq_fd1_0_c0_c0_c0_c1'>{{ itemData.material_requisition_name }}</text>
        </view>
    </view>
    <view class='flex flex-direction flex-wrap align-stretch dingdanxq_fd1_0_c0_c0'>
        <view v-for="item in itemData.gongxu" :key="item.aid"
            class='flex flex-direction flex-wrap align-stretch justify-between dingdanxq_fd1_0_c0_c0_c0'>
            <view class='flex flex-wrap align-center justify-between'>
                <view class='flex flex-wrap align-center'>
                    <text class='dingdanxq_fd1_0_c0_c1_c0_c0_c0_c0'>点位工序</text>
                    <text
                        class='dingdanxq_fd1_0_c0_c1_c0_c0_c0_c1'>{{ item.freesystempointlocation_system_point_location }}</text>
                </view>
                <view class='flex flex-wrap align-center'>
                    <text class='dingdanxq_fd1_0_c0_c1_c0_c0_c1_c0'>是否完工</text>
                    <text class='dingdanxq_fd1_0_c0_c1_c0_c0_c1_c1'>{{ item.completed_or_not_name }}</text>
                </view>
            </view>
            <view class='flex flex-wrap align-center dingdanxq_fd1_0_c0_c1_c0_c1' v-if="item.completion_time">
                <view class='flex flex-wrap align-center'>
                    <text class='dingdanxq_fd1_0_c0_c1_c0_c0_c0_c0'>完工时间</text>
                    <text class='dingdanxq_fd1_0_c0_c1_c0_c0_c0_c1'>{{ item.completion_time }}</text>
                </view>
            </view>
        </view>

    </view>
</template>

<script setup lang="ts">
import type { IGetSystempointlocationInfoRes } from '@/api/home/type';
import usePageMethod from '@/hooks/usePageMethod';

interface IProps {
    itemData: IGetSystempointlocationInfoRes
}

const props = defineProps<IProps>()

const { handleJumpDiy } = usePageMethod

//领取物资
function lingquwuziFunc() {
    // if (this.wuzi == '是') {
    //     this.$urouter.navigateTo(``);
    // }
}
</script>

<style scoped lang="scss">
.dingdanxq_fd1_0_c0_c0_c4 {
    padding: 32rpx 0rpx 32rpx 0rpx;
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

.dingdanxq_fd1_0_c0_c0 {
    background: #FFFFFF;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    padding: 0rpx 24rpx 0rpx 24rpx;
    margin: 0rpx 0rpx 24rpx 0rpx;
}

.dingdanxq_fd1_0_c0_c1_c0_c0_c0_c0 {
    color: #999999;
    font-size: 28rpx;
    font-weight: 400;
    text-align: left;
    font-style: normal;
    margin: 0rpx 24rpx 0rpx 0rpx;
}

.dingdanxq_fd1_0_c0_c1_c0_c0_c0_c1 {
    color: #333333;
    font-size: 28rpx;
    font-weight: 400;
    text-align: left;
    font-style: normal;
}

.dingdanxq_fd1_0_c0_c1_c0_c0_c1_c0 {
    color: #999999;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 48rpx;
    text-align: left;
    font-style: normal;
}

.dingdanxq_fd1_0_c0_c1_c0_c0_c1_c1 {
    color: #333333;
    font-size: 28rpx;
    font-weight: 400;
    text-align: left;
    font-style: normal;
    margin: 0rpx 0rpx 0rpx 24rpx;
}

.dingdanxq_fd1_0_c0_c1_c0_c1 {
    margin: 24rpx 0rpx 0rpx 0rpx;
}
</style>