<template>
    <page-body :loading="!info">
        <view class="page">
            <view class="flex benben-position-layout flex flex-wrap align-center dingdanxq_flex_0"
                :style="{ height: (88 + StatusBarRpx) + 'rpx', paddingTop: StatusBarRpx + 'rpx', }">
                <view class='flex flex-wrap align-center justify-between flex-sub dingdanxq_fd0_0'>
                    <view class='flex flex-wrap align-center dingdanxq_fd0_0_c0'>
                        <text class='fu-iconfont2  dingdanxq_fd0_0_c0_c0' @tap.stop="handleJumpDiy" data-type="back"
                            data-url="1">&#xE794;</text>
                    </view>
                    <view class='flex flex-wrap align-stretch justify-center'>
                        <text class='dingdanxq_fd0_0_c1_c0'>点位详情</text>
                    </view>
                    <view class='flex flex-wrap align-center justify-end dingdanxq_fd0_0_c0'>
                    </view>
                </view>

            </view>
            <view :style="{ height: (88 + StatusBarRpx) + 'rpx' }"></view>
            <!---flex布局flex布局开始-->
            <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout">
                <view class='flex flex-direction flex-wrap align-stretch dingdanxq_fd1_0'>
                    <view class='flex flex-direction flex-wrap align-stretch dingdanxq_fd1_0_c0'>
                        <BaseInfo ref="BaseInfoEl" v-if="info" v-model:itemData="info" />
                        <CompletionDetails ref="CompletionDetailsEl" v-model:aid="aidRef" />
                        <ReworkDetails ref="ReworkDetailsEl" v-model:aid="aidRef" />

                        <!-- <view class='flex flex-direction flex-wrap align-stretch dingdanxq_fd1_0_c0_c0'>
                            <view class='flex flex-wrap align-center justify-between dingdanxq_fd1_0_c0_c0_c0'>
                                <text class='dingdanxq_fd1_0_c0_c0_c0_c0'>确认时间</text>
                                <text class='dingdanxq_fd1_0_c0_c2_c1_c1'>2023.10.10 12:00:00</text>
                            </view>
                            <view class='flex flex-wrap align-start justify-between dingdanxq_fd1_0_c0_c0_c0'>
                                <text class='dingdanxq_fd1_0_c0_c0_c0_c0'>确认备注</text>
                                <text class='dingdanxq_fd1_0_c0_c4_c1_c1'>xxxxxxxxxxxxxxxxxxxxxxxxxx
                                    xxxxxxxxxxxxxxxxxxxxxx</text>
                            </view>
                        </view> -->
                        <feedBackDetail ref="feedBackDetailEl" v-model:aid="aidRef" />
                        <PunishmentDetails ref="PunishmentDetailsEl" v-model:aid="aidRef" />
                    </view>
                </view>
            </view>

            <!---flex布局flex布局结束-->
            <ActionBtn v-if="info" v-model:state="info.state" v-model:aid="aidRef"
                v-model:freeengineeringprojects_id="info.freeengineeringprojects_id"
                v-model:freesystempointlocation_id="info.aid" />
        </view>
    </page-body>
</template>

<script setup lang="ts">
import { GetSystempointlocationInfo } from '@/api/home';
import type { IGetSystempointlocationInfoRes } from '@/api/home/type';
import { EventBusKey } from '@/constant';
import usePageMethod from '@/hooks/usePageMethod';
import { onLoad } from '@dcloudio/uni-app';
import { ref, watchEffect } from 'vue';
import ActionBtn from './c-cpns/action-btn/index.vue';
import BaseInfo from './c-cpns/base-info/index.vue';
import CompletionDetails from './c-cpns/completion-details/index.vue';
import feedBackDetail from './c-cpns/feedback-details/index.vue';
import PunishmentDetails from './c-cpns/punishment-details/index.vue';
import ReworkDetails from './c-cpns/rework-details/index.vue';

onLoad(async (options: any) => {
    const { aid } = options
    if (aid) aidRef.value = aid
    initFun()
})

watchEffect((onCleanup) => {
    uni.$emit(EventBusKey.POINT_DETAIL, () => {
        initFun()
        CompletionDetailsEl.value.pagingListToggle()
        ReworkDetailsEl.value.pagingListToggle()
        feedBackDetailEl.value.pagingListToggle()
        PunishmentDetailsEl.value.pagingListToggle()
    })
    onCleanup(() => uni.$off(EventBusKey.POINT_DETAIL))
})

const { handleJumpDiy, StatusBarRpx } = usePageMethod
const aidRef = ref('')
const info = ref<IGetSystempointlocationInfoRes>()
const BaseInfoEl = ref()
const CompletionDetailsEl = ref()
const ReworkDetailsEl = ref()
const feedBackDetailEl = ref()
const PunishmentDetailsEl = ref()

async function initFun() {
    const { data } = await GetSystempointlocationInfo({ aid: aidRef.value })
    info.value = data
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

.dingdanxq_flex_0 {
    background: #fff;
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background-size: 100% auto !important;
}

.dingdanxq_fd0_0_c1_c0 {
    font-size: 36rpx;
    font-weight: 700;
    color: #333333;
    line-height: 50rpx;
}

.dingdanxq_fd0_0_c0_c0 {
    font-size: 36rpx;
    color: #333;
}

.dingdanxq_fd0_0_c0 {
    width: 120rpx;
}

.dingdanxq_fd0_0 {
    padding: 0rpx 32rpx 0rpx 32rpx;
}

.dingdanxq_fd1_0_c0_c4_c1_c1 {
    color: #101010;
    font-size: 32rpx;
    font-weight: 400;
    line-height: 56rpx;
    text-align: right;
    font-style: normal;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}




.dingdanxq_fd1_0_c0_c2_c1_c1 {
    color: #101010;
    font-size: 32rpx;
    font-weight: 400;
    line-height: 56rpx;
    text-align: right;
    font-style: normal;
}


.dingdanxq_fd1_0_c0_c2 {
    background: #FFFFFF;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    padding: 32rpx 24rpx 0rpx 24rpx;
    margin: 0rpx 0rpx 24rpx 0rpx;
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

.dingdanxq_fd1_0_c0 {
    padding: 24rpx 24rpx 0rpx 24rpx;
}

.dingdanxq_fd1_0 {
    padding: 0rpx 0rpx 40rpx 0rpx;
}
</style>