<template>
    <view class="flex flex-wrap align-start benben-position-layout flex dingdanxq_flex_2"
        :style="{ height: state === '5' || state === '7' ? 0 : (168 + bottomSafeAreaRpx) + 'rpx', paddingBottom: bottomSafeAreaRpx + 'rpx', }">
        <view class='flex flex-direction flex-wrap align-stretch flex-sub dingdanxq_fd2_0'>
            <view class='flex flex-wrap align-center'>
                <button v-if="state === '1'" class='dingdanxq_fd2_0_c0_c0' @tap.stop="handleJumpDiy"
                    data-type="navigateTo" :data-url="`/pages/gdlb/xuanzgr/xuanzgr?aid=${aid}`">立即分配</button>
                <button v-if="state === '2' || state === '3'" class='dingdanxq_fd2_0_c0_c0' @tap.stop="handleJumpDiy"
                    data-type="navigateTo" :data-url="`/pages/gdlb/xuanzgr/xuanzgr`">重新分配</button>
                <button v-if="state === '4' && whether_to_rectify_or_not.size > 0" class='dingdanxq_fd2_0_c0_c0'
                    @tap.stop="setFeedbackrecordFunc" data-type="navigateTo"
                    :data-url="`/pages/gdlb/xtbzfp/xtbzfp`">已整改</button>
            </view>
            <!-- <view class='flex flex-wrap align-center justify-between'
                >
                <button class='dingdanxq_fd2_0_c1_c0' @tap.stop="handleJumpDiy" data-type="navigateTo"
                    :data-url="`/pages/gdlb/bujubsg/bujubsg?${params}`">要求返工</button>
                <button class='dingdanxq_fd2_0_c1_c1' @tap.stop="handleJumpDiy" data-type="navigateTo"
                    :data-url="`/pages/gdlb/wangbeiz/wangbeiz?${params}`">确认完工</button>
            </view> -->
            <view class='flex flex-wrap align-center justify-between'
                v-if="state === '4' && whether_to_rectify_or_not.size <= 0">
                <button class='dingdanxq_fd2_0_c2_c0' @tap.stop="handleJumpDiy" data-type="navigateTo"
                    :data-url="`/pages/gdlb/bujubsg/bujubsg?${params}`">要求返工</button>
                <button class='dingdanxq_fd2_0_c2_c1' @tap.stop="handleJumpDiy" data-type="navigateTo"
                    :data-url="`/pages/gdlb/gongxcf/gongxcf?${params}`">工序处罚</button>
                <button class='dingdanxq_fd2_0_c2_c2' @tap.stop="handleJumpDiy" data-type="navigateTo"
                    :data-url="`/pages/gdlb/wangbeiz/wangbeiz?${params}`">确认完工</button>
            </view>
            <view class='flex flex-wrap align-center justify-between' v-if="state === '6'">
                <button class='dingdanxq_fd2_0_c2_c0' @tap.stop="postfeedbackFunc()" data-type="back"
                    data-url="1">撤销处罚</button>
                <button class='dingdanxq_fd2_0_c2_c1' @tap.stop="handleJumpDiy" data-type="navigateTo"
                    :data-url="`/pages/gdlb/gongxcf/gongxcf?${params}`">再次处罚</button>
                <button class='dingdanxq_fd2_0_c2_c2' @tap.stop="handleJumpDiy" data-type="navigateTo"
                    :data-url="`/pages/gdlb/wangbeiz/wangbeiz?${params}`">确认完工</button>
            </view>
            <!-- <view class='flex flex-wrap align-center justify-between' v-if="state === '6'">
                <button class='dingdanxq_fd2_0_c1_c0' @tap.stop="handleJumpDiy" data-type="navigateTo"
                    :data-url="`/pages/gdlb/xtbzfp/xtbzfp`">撤销处罚</button>
                <button class='dingdanxq_fd2_0_c1_c1' @tap.stop="handleJumpDiy" data-type="navigateTo"
                    :data-url="`/pages/gdlb/wangbeiz/wangbeiz?${params}`">确认完工</button>
            </view> -->
        </view>

    </view>
    <view v-if="state !== '5' && state !== '7'" :style="{ height: (168 + bottomSafeAreaRpx) + 'rpx' }">
    </view>
</template>

<script setup lang="ts">
import { DelPunishmentrecords, SetFeedbackrecord } from '@/api/home';
import { EventBusKey, HttpCode } from '@/constant';
import usePageMethod from '@/hooks/usePageMethod';
import { useWorkerStore } from '@/store/model/worker';
import Message from '@/utils/message';
import { useDebounceFn } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

interface IProps {
    state: string,
    aid: string | number
    freeengineeringprojects_id: string | number
    freesystempointlocation_id: string | number
}

const props = defineProps<IProps>()
const workerStore = useWorkerStore()
const { whether_to_rectify_or_not } = storeToRefs(workerStore)
const { bottomSafeAreaRpx, handleJumpDiy } = usePageMethod
const params = computed(() => `freeengineeringprojects_id=${props.freeengineeringprojects_id}&freesystempointlocation_id=${props.freesystempointlocation_id}`)

function postfeedbackFunc() {
    Message.info('撤销中...')
    useDebounceFn(async () => {
        const post = {
            aid: props.freesystempointlocation_id
        }
        const { code, msg } = await DelPunishmentrecords(post)
        Message.info(msg)
        if (code !== HttpCode.DATA_SUCCESS_CODE) return
        uni.$emit(EventBusKey.WORK_ORDER_DETAILS)
        setTimeout(() => uni.navigateBack(), 350)
    }, 350)()
}

function setFeedbackrecordFunc() {
    Message.info('整改中...')
    useDebounceFn(async () => {
        const post = {
            aid: workerStore.whether_to_rectify_or_not?.keys()?.next()?.value
        }
        const { code, msg } = await SetFeedbackrecord(post)
        Message.info(msg)
        if (code !== HttpCode.DATA_SUCCESS_CODE) return
        uni.$emit(EventBusKey.WORK_ORDER_DETAILS)
        workerStore.whether_to_rectify_or_not.clear()
        setTimeout(() => uni.navigateBack(), 350)
    }, 350)()
}
</script>

<style scoped lang="scss">
.dingdanxq_flex_2 {
    background: rgba(248, 248, 248, 1);
    width: 750rpx;
    overflow: hidden;
    z-index: 10;
    bottom: calc(0rpx + var(--window-bottom));
    bottom: 0;
    background-size: 100% auto;
}

.dingdanxq_fd2_0_c2_c2 {
    background: #3090FF;
    border-radius: 44rpx 44rpx 44rpx 44rpx;
    width: 192rpx;
    line-height: 88rpx;
    font-size: 32rpx;
    color: #fff;
    height: 88rpx;
}

.dingdanxq_fd2_0_c2_c1 {
    background: rgba(48, 144, 255, 0.2);
    border-radius: 44rpx 44rpx 44rpx 44rpx;
    width: 274rpx;
    line-height: 88rpx;
    font-size: 32rpx;
    color: rgba(48, 144, 255, 1);
    height: 88rpx;
}

.dingdanxq_fd2_0_c2_c0 {
    border: 2px solid #3090FF;
    background: rgba(255, 255, 255, 1);
    border-radius: 44rpx 44rpx 44rpx 44rpx;
    width: 192rpx;
    line-height: 88rpx;
    font-size: 32rpx;
    color: rgba(48, 144, 255, 1);
    height: 88rpx;
}

.dingdanxq_fd2_0_c1_c1 {
    background: #3090FF;
    border-radius: 44rpx 44rpx 44rpx 44rpx;
    width: 329rpx;
    line-height: 88rpx;
    font-size: 32rpx;
    color: #fff;
    height: 88rpx;
}

.dingdanxq_fd2_0_c1_c0 {
    border: 2px solid #3090FF;
    background: rgba(255, 255, 255, 1);
    border-radius: 44rpx 44rpx 44rpx 44rpx;
    width: 329rpx;
    line-height: 88rpx;
    font-size: 32rpx;
    color: rgba(48, 144, 255, 1);
    height: 88rpx;
}

.dingdanxq_fd2_0_c0_c0 {
    background: #3090FF;
    border-radius: 44rpx 44rpx 44rpx 44rpx;
    width: 702rpx;
    line-height: 88rpx;
    font-size: 32rpx;
    color: #fff;
    height: 88rpx;
}

.dingdanxq_fd2_0 {
    padding: 40rpx 24rpx 0rpx 24rpx;
}
</style>