<template>
    <page-body>
        <view class="page">
            <view
                class="flex flex-direction flex-wrap align-stretch justify-center benben-position-layout flex gongxcf_flex_0"
                :style="{ height: (88 + StatusBarRpx) + 'rpx', paddingTop: StatusBarRpx + 'rpx', }">
                <view class='flex flex-wrap align-stretch justify-between gongxcf_fd0_0'>
                    <view class='flex flex-wrap align-center gongxcf_fd0_0_c0' @tap.stop="handleJumpDiy"
                        data-type="back" data-url="1">
                        <text class='fu-iconfont2  gongxcf_fd0_0_c0_c0'>&#xe794;</text>
                    </view>
                    <view class='flex flex-wrap align-center'>
                        <text class='gongxcf_fd0_0_c1_c0'>工序处罚</text>
                    </view>
                    <view class='flex align-center justify-end gongxcf_fd0_0_c2'>
                    </view>
                </view>

            </view>
            <view :style="{ height: (88 + StatusBarRpx) + 'rpx' }"></view>
            <!---意见反馈表单flex布局开始-->
            <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout">
                <view class='flex flex-direction align-stretch gongxcf_fd1_0'>
                    <text class='gongxcf_fd1_0_c0'>处罚备注</text>
                    <view class='flex flex-direction flex-wrap align-stretch gongxcf_fd1_0_c1'>
                        <view class='flex flex-wrap gongxcf_fd1_0_c1_c0'>
                            <benben-textarea class='flex gongxcf_input_fd1_0_c1_c0' confirm-type="done"
                                :placeholder="'请输入您的备注'" :maxlength="300" placeholder-style="color:#999;font-size:28rpx"
                                v-model="punishment_remarks" />

                        </view>
                    </view>
                    <view class='flex flex-wrap align-center justify-between gongxcf_fd1_0_c2'>
                        <text class='gongxcf_fd1_0_c2_c0'>处罚天数</text>
                        <view class='flex flex-wrap align-center'>
                            <benben-input class='sousuo_fd1_0_c0_c1' type="text" :placeholder="`请输入处罚天数`"
                                confirm-type="done" :maxlength="5"
                                placeholder-style="color:rgba(153, 153, 153, 1);font-size:28rpx"
                                v-model="penalty_days" />
                            <!-- <image class='gongxcf_fd1_0_c2_c1_c1' mode="aspectFit" :src='STATIC_URL + "36.png"'></image> -->
                        </view>
                    </view>
                </view>
                <button class='flex-sub gongxcf_fd1_1' @tap.stop="postfeedbackFunc()" open-type="contact">确认</button>
            </view>

            <!---意见反馈表单flex布局结束-->


        </view>
    </page-body>
</template>
<script setup lang="ts">
import { AddPunishmentrecords } from '@/api/home';
import { EventBusKey, HttpCode } from '@/constant';
import usePageMethod from '@/hooks/usePageMethod';
import Message from '@/utils/message';
import { validate } from '@/utils/validate';
import { onLoad } from '@dcloudio/uni-app';
import { useDebounceFn } from '@vueuse/core';
import { ref } from 'vue';

onLoad((options: any) => {
    const { freeengineeringprojects_id, freesystempointlocation_id, freecompletionrecord_id } = options
    if (freeengineeringprojects_id) freeengineeringprojects_idRef.value = freeengineeringprojects_id
    if (freesystempointlocation_id) freesystempointlocation_idRef.value = freesystempointlocation_id
})

const { StatusBarRpx, STATIC_URL, handleJumpDiy } = usePageMethod
const punishment_remarks = ref('')
const penalty_days = ref('')
const freeengineeringprojects_idRef = ref('')
const freesystempointlocation_idRef = ref('')

function postfeedbackFunc() {
    if (!validate(penalty_days.value, 'require')) return Message.info('请输入处罚天数！')
    Message.info('确认中...')
    useDebounceFn(async () => {
        const post = {
            punishment_remarks: punishment_remarks.value,
            penalty_days: penalty_days.value,
            freeengineeringprojects_id: freeengineeringprojects_idRef.value,
            freesystempointlocation_id: freesystempointlocation_idRef.value,
        }
        const { code, msg } = await AddPunishmentrecords(post)
        Message.info(msg)
        if (code !== HttpCode.DATA_SUCCESS_CODE) return
        uni.$emit(EventBusKey.WORK_ORDER_DETAILS)
        setTimeout(() => uni.navigateBack({ delta: 2 }), 350)
    }, 350)()
}
</script>
<style lang="scss" scoped>
.page {
    width: 100vw;
    overflow-x: hidden;
    min-height: calc(100vh - var(--window-bottom));
    background: rgba(255, 255, 255, 1);
    background-size: 100% auto;
}

.gongxcf_flex_0 {
    border-bottom: 1px solid #eee;
    background: #fff;
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background-size: 100% auto !important;
}

.gongxcf_fd0_0_c2 {
    padding: 0rpx 0rpx 0rpx 0rpx;
    width: 200rpx;
}

.gongxcf_fd0_0_c1_c0 {
    font-size: 36rpx;
    font-weight: 700;
    color: var(--benbenFontColor0);
    line-height: 50rpx;
}

.gongxcf_fd0_0_c0_c0 {
    font-size: 36rpx;
    font-weight: 400;
    color: #333;
}

.gongxcf_fd0_0_c0 {
    width: 200rpx;
}

.gongxcf_fd0_0 {
    padding: 0rpx 32rpx 0rpx 32rpx;
    line-height: 88rpx;
}

.gongxcf_fd1_1 {
    background: #3090FF;
    border-radius: 44rpx 44rpx 44rpx 44rpx;
    font-size: 32rpx;
    color: var(--benbenFontColor3);
    height: 88rpx;
    line-height: 88rpx;
    width: 700rpx;
    position: fixed;
    left: 24rpx;
    bottom: calc(40rpx + var(--window-bottom));
}

.gongxcf_fd1_0_c2_c1_c1 {
    width: 24rpx;
    height: 24rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
}

.gongxcf_fd1_0_c2_c1_c0 {
    color: #101010;
    font-size: 32rpx;
    font-weight: 400;
    line-height: 48rpx;
    text-align: right;
    font-style: normal;
    margin: 0rpx 16rpx 0rpx 0rpx;
}

.gongxcf_fd1_0_c2_c0 {
    color: #333333;
    font-size: 32rpx;
    font-weight: 400;
    line-height: 48rpx;
    text-align: left;
    font-style: normal;
}

.gongxcf_fd1_0_c2 {
    border-bottom: 1px solid #eee;
    margin: 0rpx 24rpx 0rpx 24rpx;
    padding: 0rpx 0rpx 40rpx 0rpx;
}

.gongxcf_input_fd1_0_c1_c0 {
    width: 100%;
    height: 152rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: rgba(248, 248, 250, 1);
}

.gongxcf_fd1_0_c1_c0 {
    background: rgba(248, 248, 250, 1);
    width: 686rpx;
    border-radius: 10rpx 10rpx 10rpx 10rpx;
    margin: 0rpx 0rpx 0rpx 32rpx;
    padding: 24rpx 24rpx 24rpx 24rpx;
    background-size: 100% auto;
}

.gongxcf_fd1_0_c1 {
    padding: 0rpx 0rpx 32rpx 0rpx;
}

.gongxcf_fd1_0_c0 {
    font-size: 32rpx;
    font-weight: 700;
    color: #101010;
    margin: 24rpx 32rpx 20rpx 32rpx;
}

.gongxcf_fd1_0 {
    background: rgba(255, 255, 255, 1);
    background-size: 100% auto !important;
    padding: 0rpx 0rpx 0rpx 0rpx;
    margin: 0rpx 0rpx 180rpx 0rpx;
}

.sousuo_fd1_0_c0_c1 {
    color: var(--benbenFontColor0);
    font-size: 28rpx;
    font-weight: 500;
    text-align: right;
}
</style>