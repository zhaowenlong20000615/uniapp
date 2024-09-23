<template>
    <page-body>
        <view class="page">
            <view
                class="flex flex-direction flex-wrap align-stretch justify-center benben-position-layout flex bujubsg_flex_0"
                :style="{ height: (88 + StatusBarRpx) + 'rpx', paddingTop: StatusBarRpx + 'rpx', }">
                <view class='flex flex-wrap align-stretch justify-between bujubsg_fd0_0'>
                    <view class='flex flex-wrap align-center bujubsg_fd0_0_c0' @tap.stop="handleJumpDiy"
                        data-type="back" data-url="1">
                        <text class='fu-iconfont2  bujubsg_fd0_0_c0_c0'>&#xe794;</text>
                    </view>
                    <view class='flex flex-wrap align-center'>
                        <text class='bujubsg_fd0_0_c1_c0'>要求返工</text>
                    </view>
                    <view class='flex align-center justify-end bujubsg_fd0_0_c2'>
                    </view>
                </view>

            </view>
            <view :style="{ height: (88 + StatusBarRpx) + 'rpx' }"></view>
            <!---意见反馈表单flex布局开始-->
            <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout">
                <view class='flex flex-direction align-stretch bujubsg_fd1_0'>
                    <text class='bujubsg_fd1_0_c0'>返工备注</text>
                    <view class='flex flex-direction flex-wrap align-stretch'>
                        <view class='flex flex-wrap bujubsg_fd1_0_c1_c0'>
                            <benben-textarea class='flex bujubsg_input_fd1_0_c1_c0' confirm-type="done"
                                :placeholder="'请输入您的备注'" :maxlength="300" placeholder-style="color:#999;font-size:28rpx"
                                v-model="rework_remarks" />
                        </view>
                    </view>
                    <view class='flex flex-wrap align-center bujubsg_fd1_0_c2'>
                        <text class='bujubsg_fd1_0_c2_c0'>*</text>
                        <text class='bujubsg_fd1_0_c2_c1'>现场节点</text>
                    </view>
                    <view class='flex flex-direction flex-wrap align-stretch'>
                        <benben-images-upload ref="benbenImagesUploadfd1_0_c3_c0" v-model:img-list="imageList"
                            v-model:img-ids="on_site_nodes" :maxlength="6">
                            <template #content="{ num, maxlength, isShow, imgList }">
                                <view class="flex flex-wrap align-start flex bujubsg_fd1_0_c3_c0">

                                    <view v-for="(image, index) in imgList" :key="index"
                                        class='flex position-relative bujubsg_fd1_0_c3_c00'>
                                        <text class='fu-iconfont2 position-absolute bujubsg_fd1_0_c3_c000'
                                            @tap.stop="benbenImagesUploadfd1_0_c3_c0.delImage(index)">&#xE8E7;</text>
                                        <image class='bujubsg_fd1_0_c3_c001'
                                            @tap.stop="benbenImagesUploadfd1_0_c3_c0.previewImage(index)"
                                            mode="aspectFit" :src='image'></image>
                                    </view>

                                    <image class='bujubsg_fd1_0_c3_c01'
                                        @tap.stop="benbenImagesUploadfd1_0_c3_c0.manyChooseImage()" v-if="isShow"
                                        mode="aspectFit" :src='STATIC_URL + "28.png"'></image>

                                </view>
                            </template>
                        </benben-images-upload>
                    </view>
                </view>
                <button class='flex-sub bujubsg_fd1_1' @tap.stop="postfeedbackFunc()" open-type="contact">确认返工</button>
            </view>

            <!---意见反馈表单flex布局结束-->


        </view>
    </page-body>
</template>

<script setup lang="ts">
import { AddReworkrecords } from '@/api/home';
import { EventBusKey, HttpCode } from '@/constant';
import usePageMethod from '@/hooks/usePageMethod';
import Message from '@/utils/message';
import { onLoad } from '@dcloudio/uni-app';
import { useDebounceFn } from '@vueuse/core';
import { ref } from 'vue';

onLoad((options: any) => {
    const { freeengineeringprojects_id, freesystempointlocation_id, freecompletionrecord_id } = options
    if (freeengineeringprojects_id) freeengineeringprojects_idRef.value = freeengineeringprojects_id
    if (freesystempointlocation_id) freesystempointlocation_idRef.value = freesystempointlocation_id
    if (freecompletionrecord_id) freecompletionrecord_idRef.value = freecompletionrecord_id
})

const { StatusBarRpx, handleJumpDiy, STATIC_URL } = usePageMethod
const benbenImagesUploadfd1_0_c3_c0 = ref()
const rework_remarks = ref('')
const on_site_nodes = ref('')
const imageList = ref<string[]>([])
const freeengineeringprojects_idRef = ref('')
const freesystempointlocation_idRef = ref('')
const freecompletionrecord_idRef = ref('1')

function postfeedbackFunc() {
    if (imageList.value.length <= 0) return Message.info('请上传现场节点！')
    Message.info('返工中...')
    useDebounceFn(async () => {
        const post = {
            rework_remarks: rework_remarks.value,
            on_site_nodes: on_site_nodes.value,
            freeengineeringprojects_id: freeengineeringprojects_idRef.value,
            freesystempointlocation_id: freesystempointlocation_idRef.value,
            freecompletionrecord_id: freecompletionrecord_idRef.value,
        }
        const { code, msg } = await AddReworkrecords(post)
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

.bujubsg_flex_0 {
    border-bottom: 1px solid #eee;
    background: #fff;
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background-size: 100% auto !important;
}

.bujubsg_fd0_0_c2 {
    padding: 0rpx 0rpx 0rpx 0rpx;
    width: 200rpx;
}

.bujubsg_fd0_0_c1_c0 {
    font-size: 36rpx;
    font-weight: 700;
    color: var(--benbenFontColor0);
    line-height: 50rpx;
}

.bujubsg_fd0_0_c0_c0 {
    font-size: 36rpx;
    font-weight: 400;
    color: #333;
}

.bujubsg_fd0_0_c0 {
    width: 200rpx;
}

.bujubsg_fd0_0 {
    padding: 0rpx 32rpx 0rpx 32rpx;
    line-height: 88rpx;
}

.bujubsg_fd1_1 {
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

.bujubsg_fd1_0_c3_c01 {
    width: 200rpx;
    height: 200rpx;
    margin: 0rpx 24rpx 24rpx 0rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
}

.bujubsg_fd1_0_c3_c001 {
    width: 200rpx;
    height: 200rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
}

.bujubsg_fd1_0_c3_c000 {
    top: 0rpx;
    right: 0rpx;
    z-index: 10;
    color: #ff5536;
}

.bujubsg_fd1_0_c3_c00 {
    margin: 0rpx 24rpx 24rpx 0rpx;
}

.bujubsg_fd1_0_c3_c0 {
    padding: 24rpx 0rpx 0rpx 24rpx;
}

.bujubsg_fd1_0_c2_c1 {
    font-size: 32rpx;
    font-weight: 700;
    color: #101010;
}

.bujubsg_fd1_0_c2_c0 {
    font-size: 32rpx;
    font-weight: 700;
    color: rgba(255, 0, 0, 1);
    line-height: rpx;
}

.bujubsg_fd1_0_c2 {
    margin: 40rpx 0rpx 24rpx 32rpx;
}

.bujubsg_input_fd1_0_c1_c0 {
    width: 100%;
    height: 150rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: rgba(248, 248, 250, 1);
}

.bujubsg_fd1_0_c1_c0 {
    background: rgba(248, 248, 250, 1);
    width: 686rpx;
    border-radius: 10rpx 10rpx 10rpx 10rpx;
    margin: 0rpx 0rpx 0rpx 32rpx;
    padding: 24rpx 24rpx 24rpx 24rpx;
    background-size: 100% auto;
}

.bujubsg_fd1_0_c0 {
    font-size: 32rpx;
    font-weight: 700;
    color: #101010;
    margin: 24rpx 32rpx 20rpx 32rpx;
}

.bujubsg_fd1_0 {
    border-bottom: 10px solid rgba(248, 249, 252, 1);
    background: rgba(255, 255, 255, 1);
    background-size: 100% auto !important;
    padding: 0rpx 0rpx 48rpx 0rpx;
    margin: 0rpx 0rpx 180rpx 0rpx;
}
</style>