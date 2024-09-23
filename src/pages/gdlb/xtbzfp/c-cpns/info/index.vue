<template>
    <view class='flex flex-direction flex-wrap align-stretch xtbzfp_fd1_0_c0'>
        <text class='xtbzfp_fd1_0_c0_c0'>工单列表</text>
        <view class='flex flex-direction flex-wrap align-stretch xtbzfp_fd1_0_c0_c1'>
            <view class='flex flex-wrap align-center justify-between xtbzfp_fd1_0_c0_c1_c0'>
                <view class='flex flex-wrap align-center'>
                    <text class='xtbzfp_fd1_0_c0_c1_c0_c0_c0'>项目名称 :</text>
                    <text class='xtbzfp_fd1_0_c0_c1_c0_c0_c0'>{{ itemData.freeengineeringprojects_entry_name }}</text>
                </view>
                <text class='xtbzfp_fd1_0_c0_c1_c0_c1' v-if="itemData.system_state == '1'">待分配</text><text
                    class='xtbzfp_fd1_0_c0_c1_c0_c1_1' v-if="itemData.system_state == '2'">进行中</text><text
                    class='xtbzfp_fd1_0_c0_c1_c0_c1_2' v-if="itemData.system_state == '3'">已完成</text>
            </view>
            <view class='flex flex-wrap align-center justify-between xtbzfp_fd1_0_c0_c1_c0'>
                <view class='flex flex-wrap align-center'>
                    <text class='xtbzfp_fd1_0_c0_c1_c1_c0_c0'>项目地点</text>
                    <text
                        class='xtbzfp_fd1_0_c0_c1_c1_c0_c1'>{{ itemData.freeengineeringprojects_project_location_area }}</text>
                </view>
                <view class='flex flex-wrap align-center'>
                    <text class='xtbzfp_fd1_0_c0_c1_c1_c1_c0'>区域名称</text>
                    <text class='xtbzfp_fd1_0_c0_c1_c1_c0_c1'>{{ itemData.freeregion_area_name }}</text>
                </view>
            </view>
            <view class='flex flex-wrap align-center justify-between xtbzfp_fd1_0_c0_c1_c0'>
                <view class='flex flex-wrap align-center'>
                    <text class='xtbzfp_fd1_0_c0_c1_c1_c0_c0'>系统名称</text>
                    <text class='xtbzfp_fd1_0_c0_c1_c1_c0_c1'>{{ itemData.freesystem_system_name }}</text>
                </view>
                <view class='flex flex-wrap align-center'>
                    <text class='xtbzfp_fd1_0_c0_c1_c1_c1_c0'>建筑物名称</text>
                    <text class='xtbzfp_fd1_0_c0_c1_c1_c0_c1'>{{ itemData.freebuilding_building }}</text>
                </view>
            </view>
            <view class='flex flex-wrap align-center justify-between xtbzfp_fd1_0_c0_c1_c0'>
                <view class='flex flex-wrap align-center'>
                    <text class='xtbzfp_fd1_0_c0_c1_c1_c0_c0'>点位数量</text>
                    <text class='xtbzfp_fd1_0_c0_c1_c3_c0_c1'>{{ itemData.free_field_14876 }}</text>
                </view>
            </view>
            <view class='flex flex-wrap align-center justify-between xtbzfp_fd1_0_c0_c1_c0'>
                <view class='flex flex-wrap align-center'>
                    <text class='xtbzfp_fd1_0_c0_c1_c1_c0_c0'>项目周期</text>
                    <text class='xtbzfp_fd1_0_c0_c1_c4_c0_c1'>{{ itemData.freeengineeringprojects_start_time }} -
                        {{ itemData.freeengineeringprojects_end_time }}</text>
                </view>
            </view>
            <view class='flex flex-wrap align-center justify-between'>
                <view class='flex flex-wrap align-center'>
                    <text class='xtbzfp_fd1_0_c0_c1_c1_c0_c0'>施工周期</text>
                    <text class='xtbzfp_fd1_0_c0_c1_c4_c0_c1'>{{ itemData.construction_start_time }} -
                        {{ itemData.construction_completion_time }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import type { IGetProjectsystemworkorderInfoRes } from '@/api/home/type';

interface IProps {
    itemData: IGetProjectsystemworkorderInfoRes
}

defineProps<IProps>()
</script>

<style scoped lang="scss">
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
</style>