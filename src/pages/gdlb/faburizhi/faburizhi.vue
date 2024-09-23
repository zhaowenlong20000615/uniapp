<template>
    <page-body>
        <view class="page">
            <view class="flex benben-position-layout flex flex-wrap align-center faburizhi_flex_0"
                :style="{ height: (88 + StatusBarRpx) + 'rpx', paddingTop: StatusBarRpx + 'rpx', }">
                <view class='flex flex-wrap align-center justify-between flex-sub faburizhi_fd0_0'>
                    <view class='flex flex-wrap align-center faburizhi_fd0_0_c0' @tap.stop="handleJumpDiy"
                        data-type="back" data-url="1">
                        <text class='fu-iconfont2  faburizhi_fd0_0_c0_c0'>&#xE794;</text>
                    </view>
                    <view class='flex flex-wrap align-stretch justify-center'>
                        <text class='faburizhi_fd0_0_c1_c0'>发布日志</text>
                    </view>
                    <view class='flex flex-wrap align-center justify-end faburizhi_fd0_0_c0'>
                    </view>
                </view>

            </view>
            <view :style="{ height: (88 + StatusBarRpx) + 'rpx' }"></view>
            <!---flex布局flex布局开始-->
            <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout faburizhi_flex_1"
                @tap.stop="pickerDiy1656384671721 = true">
                <view class='flex flex-wrap align-center justify-between faburizhi_fd1_0'>
                    <text class='faburizhi_fd1_0_c0'>日报类型</text>
                    <view class='flex flex-wrap align-center'>
                        <benben-input class='faburizhi_fd1_0_c1_c0' type="text" :placeholder="`请选择日报类型`"
                            confirm-type="done" :maxlength="-1" :adjust-position='true' :disabled='true'
                            placeholder-style="color:#999;font-size:28rpx" v-model="dailyName" />
                        <image class='faburizhi_fd1_0_c1_c1' mode="aspectFit" :src='STATIC_URL + "36.png"'></image>
                    </view>
                </view>
            </view>

            <!---flex布局flex布局结束-->
            <!---flex布局flex布局开始-->
            <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout">
                <ManagementCoordination ref="ManagementCoordinationRef" v-if="dailyType === 1" />
                <TechnicalCoordination ref="TechnicalCoordinationRef" v-if="dailyType === 2" />
                <NoConstruction ref="NoConstructionRef" v-if="dailyType === 3" />
                <SmallConstruction ref="SmallConstructionRef" v-if="dailyType === 4" />
            </view>

            <!---flex布局flex布局结束-->
            <view class="flex flex-wrap align-start justify-center benben-position-layout flex faburizhi_flex_3"
                :style="{ height: (128 + bottomSafeAreaRpx) + 'rpx', paddingBottom: bottomSafeAreaRpx + 'rpx', }">
                <button class='faburizhi_fd3_0' @tap.stop="releaseFunc()">确定发布</button>

            </view>
            <view :style="{ height: (128 + bottomSafeAreaRpx) + 'rpx' }"></view>
        </view>

        <benben-picker ref="benbenWritePickerCodepicker2" v-model:visible="pickerDiy1656384671721"
            v-model:label="dailyName" v-model:value='dailyType' :options='DailyReportType' mode='selector'
            :mask-show='true' :timeout='true' :picker-height='88' default-type='type'
            :default-props='{ "label": "name", "value": "type" }'>
            <template #picker-header>
                <view class='flex flex-wrap align-center justify-between myInfo_picker2_0'>
                    <text class='myInfo_picker2_0_c0' @tap="benbenWritePickerCodepicker2.cancel()">取消</text>
                    <text class='myInfo_picker2_0_c1'>选择日报类型</text>
                    <text class='myInfo_picker2_0_c2' @tap="benbenWritePickerCodepicker2.pickerConfirm()">确定</text>
                </view>
            </template>
        </benben-picker>
    </page-body>
</template>
<script setup lang="ts">
import { DailyReportType } from '@/constant/mock';
import usePageMethod from '@/hooks/usePageMethod';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import ManagementCoordination from './c-cpns/management-coordination/index.vue';
import NoConstruction from './c-cpns/no-construction/index.vue';
import SmallConstruction from './c-cpns/small-construction/index.vue';
import TechnicalCoordination from './c-cpns/technical-coordination/index.vue';

const { bottomSafeAreaRpx, StatusBarRpx, handleJumpDiy, STATIC_URL } = usePageMethod
const pickerDiy1656384671721 = ref(false)
const benbenWritePickerCodepicker2 = ref()
const dailyType = ref(1)
const dailyName = ref('')
const ManagementCoordinationRef = ref()
const TechnicalCoordinationRef = ref()
const NoConstructionRef = ref()
const SmallConstructionRef = ref()

onLoad((options: any) => {
    const { tabs } = options
    if (tabs) {
        dailyType.value = Number(tabs)
        dailyName.value = DailyReportType.find(item => item.type === dailyType.value)?.name!
    }
})

function releaseFunc() {

    switch (dailyType.value) {
        case 1:
            ManagementCoordinationRef.value?.releaseHandle?.()
            break;
        case 2:
            TechnicalCoordinationRef.value?.releaseHandle?.()
            break;
        case 3:
            NoConstructionRef.value?.releaseHandle?.()
            break;
        case 4:
            SmallConstructionRef.value?.releaseHandle?.()
            break;
        default:
            break;
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

.faburizhi_flex_0 {
    background: #fff;
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background-size: 100% auto !important;
}

.faburizhi_fd0_0_c1_c0 {
    font-size: 36rpx;
    font-weight: 700;
    color: #333333;
    line-height: 50rpx;
}

.faburizhi_fd0_0_c0_c0 {
    font-size: 36rpx;
    color: #333;
}

.faburizhi_fd0_0_c0 {
    width: 120rpx;
}

.faburizhi_fd0_0 {
    padding: 0rpx 32rpx 0rpx 32rpx;
}

.faburizhi_flex_1 {
    padding: 24rpx 24rpx 0rpx 24rpx;
}

.faburizhi_fd1_0_c1_c1 {
    width: 24rpx;
    height: 24rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
}

.faburizhi_fd1_0_c1_c0 {
    text-align: right;
    margin: 0rpx 18rpx 0rpx 0rpx;
}

.faburizhi_fd1_0_c0 {
    color: #333333;
    font-size: 32rpx;
    font-weight: 400;
    line-height: 48rpx;
    text-align: left;
    font-style: normal;
}

.faburizhi_fd1_0 {
    background: #FFFFFF;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    padding: 32rpx 24rpx 32rpx 24rpx;
    margin: 0rpx 0rpx 24rpx 0rpx;
}



.faburizhi_fd2_0_c3 {
    background: #FFFFFF;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    margin: 0rpx 24rpx 24rpx 24rpx;
    padding: 0rpx 24rpx 0rpx 24rpx;
}

.faburizhi_fd2_0_c2 {
    color: #3090FF;
    font-size: 32rpx;
    font-weight: 500;
    text-align: right;
    font-style: normal;
    margin: 20rpx 24rpx 24rpx 0rpx;
}


.faburizhi_fd2_0_c1_c0 {
    border-bottom: 1px solid #eee;
    background: #FFFFFF;
    padding: 32rpx 0rpx 32rpx 0rpx;
    border-radius: 16rpx;
}

.faburizhi_fd2_0_c1 {
    background: #FFFFFF;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    margin: 0rpx 24rpx 0rpx 24rpx;
    padding: 0rpx 24rpx 0rpx 24rpx;
}



.faburizhi_flex_3 {
    background: #F8F8FA;
    width: 750rpx;
    height: 128rpx;
    overflow: hidden;
    z-index: 10;
    bottom: calc(0rpx + var(--window-bottom));
    bottom: 0;
    background-size: 100% auto;
}

.faburizhi_fd3_0 {
    background: #3090FF;
    border-radius: 44rpx 44rpx 44rpx 44rpx;
    width: 702rpx;
    line-height: 88rpx;
    font-size: 32rpx;
    color: #fff;
    height: 88rpx;
}

.myInfo_picker2_0 {
    border-bottom: 1px solid #eee;
    background: #fff;
    background-size: 100% !important;
    padding: 0rpx 32rpx 0rpx 32rpx;
    line-height: 88rpx;
    border-radius: 25rpx 25rpx 0rpx 0rpx;
    background-size: 100% auto !important;
}

.myInfo_picker2_0_c0 {
    line-height: 40rpx;
    font-size: 32rpx;
    font-weight: 500;
    color: #BFBFBF;
}

.myInfo_picker2_0_c1 {
    font-size: 32rpx;
    font-weight: 400;
    color: #333333;
}

.myInfo_picker2_0_c2 {
    color: #3090FF;
    line-height: 40rpx;
    font-size: 32rpx;
    font-weight: 500;
}
</style>