<template>
    <view v-for="item in itemData" :key="item.aid" class='flex flex-direction flex-wrap align-stretch xtbzfp_fd1_0_c2'
        @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/gdlb/dingdanxq/dingdanxq?aid=${item.aid}`">
        <view class='flex flex-direction flex-wrap align-stretch xtbzfp_fd1_0_c2_c0'>
            <view class='flex flex-wrap align-start justify-between xtbzfp_fd1_0_c0_c1_c0'>
                <view class='flex flex-direction flex-wrap align-stretch flex-sub'>
                    <view class='flex flex-wrap align-center xtbzfp_fd1_0_c0_c1_c0'>
                        <text class='xtbzfp_fd1_0_c2_c0_c0_c0_c0_c0'>点位名称</text>
                        <text class='xtbzfp_fd1_0_c0_c1_c1_c0_c1'>{{ item.system_point_location }}</text>
                    </view>
                    <view class='flex flex-wrap align-center xtbzfp_fd1_0_c0_c1_c0'>
                        <text class='xtbzfp_fd1_0_c2_c0_c0_c0_c0_c0'>点位主修人员</text>
                        <text class='xtbzfp_fd1_0_c0_c1_c1_c0_c1'>{{ item.major_name }}</text>
                    </view>
                    <view class='flex flex-wrap align-center'>
                        <text class='xtbzfp_fd1_0_c2_c0_c0_c0_c0_c0'>物资是否领取</text>
                        <text class='xtbzfp_fd1_0_c0_c1_c4_c0_c1'>{{ item.material_requisition_name }}</text>
                    </view>
                </view>
                <view class='flex flex-direction flex-wrap align-stretch'>
                    <view class='flex flex-wrap align-center justify-end xtbzfp_fd1_0_c0_c1_c0'>
                        <text class='xtbzfp_fd1_0_c2_c0_c0_c0_c0_c0'>点位状态</text>
                        <text class='xtbzfp_fd1_0_c2_c0_c0_c1_c0_c1'
                            v-if="item.state === '1'">{{ item.state_name }}</text><text
                            class='xtbzfp_fd1_0_c2_c0_c0_c1_c0_c1_1'
                            v-if="item.state === '2'">{{ item.state_name }}</text><text
                            class='xtbzfp_fd1_0_c2_c0_c0_c1_c0_c1_2'
                            v-if="item.state === '3'">{{ item.state_name }}</text><text
                            class='xtbzfp_fd1_0_c2_c0_c0_c1_c0_c1_3'
                            v-if="item.state === '4'">{{ item.state_name }}</text><text
                            class='xtbzfp_fd1_0_c2_c0_c0_c1_c0_c1_4'
                            v-if="item.state === '5'">{{ item.state_name }}</text><text
                            class='xtbzfp_fd1_0_c2_c0_c0_c1_c0_c1_5'
                            v-if="item.state === '6'">{{ item.state_name }}</text><text
                            class='xtbzfp_fd1_0_c2_c0_c0_c1_c0_c1_6'
                            v-if="item.state === '7'">{{ item.state_name }}</text>
                    </view>
                    <view class='flex flex-wrap align-center justify-end xtbzfp_fd1_0_c0_c1_c0'>
                        <text class='xtbzfp_fd1_0_c2_c0_c0_c0_c0_c0'>点位次修人员</text>
                        <text class='xtbzfp_fd1_0_c0_c1_c1_c0_c1'>{{ item.secondary_repair_name }}</text>
                    </view>
                </view>
            </view>
            <view class='flex flex-direction flex-wrap align-stretch xtbzfp_fd1_0_c2_c0_c1'>
                <view v-for="item1 in item.gongxu" :key="item1.aid"
                    class='flex flex-direction flex-wrap align-stretch justify-between xtbzfp_fd1_0_c2_c0_c1_c0'>
                    <view class='flex flex-wrap align-center justify-between'>
                        <view class='flex flex-wrap align-center'>
                            <text class='xtbzfp_fd1_0_c2_c0_c1_c0_c0_c0_c0'>点位工序</text>
                            <text
                                class='xtbzfp_fd1_0_c2_c0_c1_c0_c0_c0_c1'>{{ item1.freesystempointlocation_system_point_location }}</text>
                        </view>
                        <view class='flex flex-wrap align-center'>
                            <text class='xtbzfp_fd1_0_c2_c0_c1_c0_c0_c1_c0'>是否完工</text>
                            <text class='xtbzfp_fd1_0_c2_c0_c1_c0_c0_c1_c1'>{{ item1.completed_or_not_name }}</text>
                        </view>
                    </view>
                    <view class='flex flex-wrap align-center xtbzfp_fd1_0_c2_c0_c1_c0_c1' v-if="item1.completion_time">
                        <view class='flex flex-wrap align-center'>
                            <text class='xtbzfp_fd1_0_c2_c0_c1_c0_c0_c0_c0'>完工时间</text>
                            <text class='xtbzfp_fd1_0_c2_c0_c1_c0_c0_c0_c1'>{{ item1.completion_time }}</text>
                        </view>
                    </view>
                </view>

            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import type { IGetSystempointlocationListRes } from '@/api/home/type';
import usePageMethod from '@/hooks/usePageMethod';

interface IProps {
    itemData: IGetSystempointlocationListRes[]
}

defineProps<IProps>()

const { handleJumpDiy } = usePageMethod
</script>

<style scoped lang="scss">
.xtbzfp_fd1_0_c2_c0_c1_c0_c1 {
    margin: 24rpx 0rpx 0rpx 0rpx;
}

.xtbzfp_fd1_0_c2_c0_c1_c0_c0_c1_c1 {
    color: #333333;
    font-size: 28rpx;
    font-weight: 400;
    text-align: left;
    font-style: normal;
    margin: 0rpx 0rpx 0rpx 24rpx;
}

.xtbzfp_fd1_0_c2_c0_c1_c0_c0_c1_c0 {
    color: #999999;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 48rpx;
    text-align: left;
    font-style: normal;
}

.xtbzfp_fd1_0_c2_c0_c1_c0_c0_c0_c1 {
    color: #333333;
    font-size: 28rpx;
    font-weight: 400;
    text-align: left;
    font-style: normal;
}

.xtbzfp_fd1_0_c2_c0_c1_c0_c0_c0_c0 {
    color: #999999;
    font-size: 28rpx;
    font-weight: 400;
    text-align: left;
    font-style: normal;
    margin: 0rpx 24rpx 0rpx 0rpx;
}

.xtbzfp_fd1_0_c2_c0_c1_c0 {
    border-bottom: 1px solid #eee;
    padding: 24rpx 0rpx 24rpx 0rpx;
}

.xtbzfp_fd1_0_c2_c0_c1 {
    background: rgba(248, 248, 250, 1);
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    padding: 0rpx 24rpx 0rpx 24rpx;
    margin: 0rpx 0rpx 24rpx 0rpx;
}

.xtbzfp_fd1_0_c2_c0_c0_c1_c0_c1_6 {
    color: rgba(1, 206, 161, 1);
    font-size: 28rpx;
    font-weight: 400;
    text-align: left;
    font-style: normal;
    line-height: 48rpx;
}

.xtbzfp_fd1_0_c2_c0_c0_c1_c0_c1_5 {
    color: rgba(45, 161, 219, 1);
    font-size: 28rpx;
    font-weight: 400;
    text-align: left;
    font-style: normal;
    line-height: 48rpx;
}

.xtbzfp_fd1_0_c2_c0_c0_c1_c0_c1_4 {
    color: rgba(216, 18, 18, 1);
    font-size: 28rpx;
    font-weight: 400;
    text-align: left;
    font-style: normal;
    line-height: 48rpx;
}

.xtbzfp_fd1_0_c2_c0_c0_c1_c0_c1_3 {
    color: rgba(255, 132, 48, 1);
    font-size: 28rpx;
    font-weight: 400;
    text-align: left;
    font-style: normal;
    line-height: 48rpx;
}

.xtbzfp_fd1_0_c2_c0_c0_c1_c0_c1_2 {
    color: rgba(48, 144, 255, 1);
    font-size: 28rpx;
    font-weight: 400;
    text-align: left;
    font-style: normal;
    line-height: 48rpx;
}

.xtbzfp_fd1_0_c2_c0_c0_c1_c0_c1_1 {
    color: rgba(73, 208, 242, 1);
    font-size: 28rpx;
    font-weight: 400;
    text-align: left;
    font-style: normal;
    line-height: 48rpx;
}

.xtbzfp_fd1_0_c2_c0_c0_c1_c0_c1 {
    color: rgba(255, 64, 64, 1);
    font-size: 28rpx;
    font-weight: 400;
    text-align: left;
    font-style: normal;
    line-height: 48rpx;
}

.xtbzfp_fd1_0_c2_c0_c0_c0_c0_c0 {
    color: rgba(153, 153, 153, 1);
    font-size: 28rpx;
    font-weight: 400;
    text-align: left;
    font-style: normal;
    margin: 0rpx 24rpx 0rpx 0rpx;
}

.xtbzfp_fd1_0_c2_c0 {
    background: #FFFFFF;
    margin: 0rpx 0rpx 24rpx 0rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    padding: 24rpx 24rpx 0rpx 24rpx;
}

.xtbzfp_fd1_0_c2 {
    padding: 24rpx 24rpx 0rpx 24rpx;
}

.xtbzfp_fd1_0_c0_c1_c0_c1_2 {
    background: rgba(1, 206, 161, 0.14);
    border-radius: 8rpx 8rpx 8rpx 8rpx;
    color: rgba(1, 206, 161, 1);
    padding: 4rpx 10rpx 4rpx 10rpx;
}

.xtbzfp_fd1_0_c0_c1_c0_c1_1 {
    background: rgba(48, 144, 255, 0.14);
    border-radius: 8rpx 8rpx 8rpx 8rpx;
    color: rgba(48, 144, 255, 1);
    padding: 4rpx 10rpx 4rpx 10rpx;
}

.xtbzfp_fd1_0_c0_c1_c0_c1 {
    background: rgba(255, 64, 64, 0.14);
    border-radius: 8rpx 8rpx 8rpx 8rpx;
    color: rgba(255, 64, 64, 1);
    padding: 4rpx 10rpx 4rpx 10rpx;
}

.xtbzfp_fd1_0_c0_c1_c0_c0_c0 {
    color: #101010;
    font-size: 32rpx;
    font-weight: 700;
    text-align: left;
    font-style: normal;
}

.xtbzfp_fd1_0_c0_c1_c0 {
    margin: 0rpx 0rpx 24rpx 0rpx;
}
</style>