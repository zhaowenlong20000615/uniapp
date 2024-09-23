<template>
    <view class='flex flex-direction flex-wrap align-stretch home_fd1_0_c0_c0'>
        <text class='home_fd1_0_c0_c0_c0'>数据概览</text>
        <view class='flex flex-wrap align-center justify-between home_fd1_0_c0_c0_c1'>
            <view class='flex flex-direction flex-wrap align-stretch home_fd1_0_c0_c0_c1_c0'>
                <text class='home_fd1_0_c0_c0_c1_c0_c0'>工单总数</text>
                <text class='home_fd1_0_c0_c0_c1_c0_c1'>{{ itemData.zhongshu }}</text>
            </view>
            <view class='flex flex-direction flex-wrap align-stretch home_fd1_0_c0_c0_c1_c1'>
                <text class='home_fd1_0_c0_c0_c1_c0_c0'>已完成总数</text>
                <text class='home_fd1_0_c0_c0_c1_c0_c1'>{{ itemData.yiwancheng }}</text>
            </view>
            <view class='flex flex-direction flex-wrap align-stretch home_fd1_0_c0_c0_c1_c2'>
                <text class='home_fd1_0_c0_c0_c1_c0_c0'>未完成总数</text>
                <text class='home_fd1_0_c0_c0_c1_c0_c1'>{{ itemData.weiwancheng }}</text>
            </view>
        </view>
        <view class='flex flex-wrap align-start justify-between home_fd1_0_c0_c0_c2'>
            <view class='flex flex-wrap align-center home_fd1_0_c0_c0_c2_c0'>
                <qiun-data-charts type="arcbar" :opts="opts" :chartData="chartData" />
            </view>
            <view class='flex flex-direction flex-wrap align-stretch'>
                <view class='flex flex-direction flex-wrap align-stretch home_fd1_0_c0_c0_c2_c1_c0'>
                    <view class='flex flex-wrap align-center'>
                        <view class='flex flex-wrap align-center home_fd1_0_c0_c0_c2_c1_c0_c0_c0'>
                        </view>
                        <text class='home_fd1_0_c0_c0_c2_c1_c0_c0_c1'>整体进度已完成</text>
                    </view>
                    <view class='flex flex-wrap align-center home_fd1_0_c0_c0_c2_c1_c0_c1'>
                        <text class='home_fd1_0_c0_c0_c2_c1_c0_c1_c0'>{{ process.success }}</text>
                        <text class='home_fd1_0_c0_c0_c2_c1_c0_c1_c0'>%</text>
                    </view>
                </view>
                <view class='flex flex-direction flex-wrap align-stretch home_fd1_0_c0_c0_c2_c1_c1'>
                    <view class='flex flex-wrap align-center'>
                        <view class='flex flex-wrap align-center home_fd1_0_c0_c0_c2_c1_c1_c0_c0'>
                        </view>
                        <text class='home_fd1_0_c0_c0_c2_c1_c0_c0_c1'>整体进度未完成</text>
                    </view>
                    <view class='flex flex-wrap align-center home_fd1_0_c0_c0_c2_c1_c0_c1'>
                        <text class='home_fd1_0_c0_c0_c2_c1_c0_c1_c0'>{{ process.error }}</text>
                        <text class='home_fd1_0_c0_c0_c2_c1_c0_c1_c0'>%</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import type { ITongjiProjectsystemworkorderRes } from '@/api/home/type';
import { computed } from 'vue';

interface IProps {
    itemData: ITongjiProjectsystemworkorderRes
}

const props = defineProps<IProps>()

const process = computed(() => {
    const tempSuccess = props.itemData.yiwancheng / props.itemData.zhongshu
    const success = parseInt((isNaN(tempSuccess) ? 0 : tempSuccess)?.toFixed?.(2)) * 100
    const error = 100 - success
    return {
        success,
        error,
    }
})

const chartData = computed(() => ({
    series: [
        {
            name: "整体进度",
            color: "#3493FF",
            data: process.value.success / 100
        }
    ]
}))

const opts = computed(() => ({
    color: ["#3493FF", "#5BB1FF",],
    padding: undefined,
    title: {
        name: `${process.value.success}%`,
        fontSize: 25,
        color: "#000"
    },
    subtitle: {
        name: "整体进度",
        fontSize: 14,
        color: "#666666"
    },
    extra: {
        arcbar: {
            type: "circle",
            width: 16,
            backgroundColor: "#E7E7E7",
            startAngle: 1.5,
            endAngle: 0.25,
            gap: 2,
            direction: "ccw"
        }
    }
}))
</script>

<style scoped lang="scss">
.home_fd1_0_c0_c0_c2_c1_c1_c0_c0 {
    background: rgba(231, 231, 231, 1);
    border-radius: 4rpx 4rpx 4rpx 4rpx;
    width: 22rpx;
    height: 22rpx;
}

.home_fd1_0_c0_c0_c2_c1_c1 {
    background: #F8F8FA;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    width: 274rpx;
    padding: 16rpx 0rpx 0rpx 20rpx;
}

.home_fd1_0_c0_c0_c2_c1_c0_c1_c0 {
    color: #101010;
    font-size: 38rpx;
    font-weight: 700;
    text-align: center;
    font-style: normal;
}

.home_fd1_0_c0_c0_c2_c1_c0_c1 {
    padding: 0rpx 0rpx 0rpx 34rpx;
    margin: 8rpx 0rpx 0rpx 0rpx;
}

.home_fd1_0_c0_c0_c2_c1_c0_c0_c1 {
    color: #333333;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 48rpx;
    text-align: center;
    font-style: normal;
    margin: 0rpx 0rpx 0rpx 12rpx;
}

.home_fd1_0_c0_c0_c2_c1_c0_c0_c0 {
    background: #3997FF;
    border-radius: 4rpx 4rpx 4rpx 4rpx;
    width: 22rpx;
    height: 22rpx;
}

.home_fd1_0_c0_c0_c2_c1_c0 {
    background: #F8F8FA;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    width: 274rpx;
    margin: 0rpx 0rpx 16rpx 0rpx;
    padding: 16rpx 0rpx 0rpx 20rpx;
}

.home_fd1_0_c0_c0_c2_c0 {
    width: 244rpx;
    height: 244rpx;
    position: relative;

    .chartsview {
        display: block;
    }
}

.home_fd1_0_c0_c0_c2 {
    padding: 0rpx 27rpx 0rpx 27rpx;
}

.home_fd1_0_c0_c0_c1_c2 {
    background: url(image-path('31.png')) no-repeat;
    width: 208rpx;
    background-size: 100% auto;
    padding: 20rpx;
}

.home_fd1_0_c0_c0_c1_c1 {
    background: url(image-path('30.png')) no-repeat;
    width: 208rpx;
    background-size: 100% auto;
    padding: 20rpx;
}

.home_fd1_0_c0_c0_c1_c0_c1 {
    color: #101010;
    font-size: 40rpx;
    font-weight: 700;
    line-height: 42rpx;
    text-align: left;
    font-style: normal;
}

.home_fd1_0_c0_c0_c1_c0_c0 {
    margin: 0rpx 0rpx 7rpx 0rpx;
    color: #6E767D;
    font-size: 26rpx;
    font-weight: 400;
    line-height: 48rpx;
}

.home_fd1_0_c0_c0_c1_c0 {
    background: url(image-path('29.png')) no-repeat;
    width: 208rpx;
    background-size: 100% auto;
    padding: 20rpx;
}

.home_fd1_0_c0_c0_c1 {
    margin: 24rpx 0rpx 40rpx 0rpx;
}

.home_fd1_0_c0_c0_c0 {
    color: #101010;
    font-size: 34rpx;
    font-weight: 700;
    line-height: 42rpx;
    text-align: left;
    font-style: normal;
}

.home_fd1_0_c0_c0 {
    background: #FFFFFF;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    padding: 32rpx 24rpx 40rpx 24rpx;
    margin: 24rpx 0rpx 24rpx 0rpx;
}
</style>