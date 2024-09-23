<template>
    <page-body>
        <view class="page">
            <view
                class="flex flex-direction flex-wrap align-stretch justify-center benben-position-layout flex feedBack_flex_0"
                :style="{ height: (88 + StatusBarRpx) + 'rpx', paddingTop: StatusBarRpx + 'rpx', }">
                <view class='flex flex-wrap align-stretch justify-between feedBack_fd0_0'>
                    <view class='flex flex-wrap align-center feedBack_fd0_0_c0' @tap.stop="handleJumpDiy"
                        data-type="back" data-url="1">
                        <text class='fu-iconfont2  feedBack_fd0_0_c0_c0'>&#xe794;</text>
                    </view>
                    <view class='flex flex-wrap align-center'>
                        <text class='feedBack_fd0_0_c1_c0'>我要反馈</text>
                    </view>
                    <view class='flex align-center justify-end feedBack_fd0_0_c2' @tap.stop="handleJumpDiy"
                        data-type="navigateTo" :data-url="`/pages/my/feedBackDetail/feedBackDetail`">
                        <text class='feedBack_fd0_0_c2_c0'>反馈记录</text>
                    </view>
                </view>

            </view>
            <view :style="{ height: (88 + StatusBarRpx) + 'rpx' }"></view>
            <!---意见反馈表单flex布局开始-->
            <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout">
                <view class='flex flex-direction align-stretch feedBack_fd1_0'>
                    <view class='flex flex-wrap align-center feedBack_fd1_0_c0'>
                        <text class='feedBack_fd1_0_c0_c0'>反馈类型</text>
                    </view>
                    <view class='flex flex-direction flex-wrap align-stretch feedBack_fd1_0_c1'>
                        <benben-select-diy ref="showSelectPopup1689675271268"
                            class-name='flex flex-wrap align-center flex' v-model:items="changeType"
                            v-model="clineInfo.freefeedbacktypeFeedback_type_1_id" default-type="aid"
                            default-label="name" :allow-cancel='false' type="radio" :disabled='false'>
                            <template v-for='(item, key0) in changeType'>
                                <view v-if="item.isSelected"
                                    class='flex align-center justify-center flex feedBack_fd1_0_c1_c0_c0'
                                    @tap="showSelectPopup1689675271268.tapHandle(key0)">
                                    <text class='flex-sub feedBack_fd1_0_c1_c0_c0_c0'>{{ item.feedback_type }}</text>
                                </view>
                                <view v-else class='flex align-center justify-center flex feedBack_fd1_0_c1_c0_c1'
                                    @tap="showSelectPopup1689675271268.tapHandle(key0)">
                                    <text class='flex-sub feedBack_fd1_0_c1_c0_c1_c0'>{{ item.feedback_type }}</text>
                                </view>
                            </template></benben-select-diy>
                    </view>
                    <text class='feedBack_fd1_0_c2'>反馈内容</text>
                    <view class='flex flex-direction flex-wrap align-stretch feedBack_fd1_0_c3'>
                        <view class='flex flex-wrap feedBack_fd1_0_c3_c0'>
                            <benben-textarea class='flex feedBack_input_fd1_0_c3_c0' confirm-type="done"
                                :placeholder="'问题描述的越详细，有助于我们更快的解决问题'" :maxlength="300"
                                placeholder-style="color:#999;font-size:28rpx"
                                v-model="clineInfo.problem_description" />

                        </view>
                    </view>
                    <view class='flex flex-direction flex-wrap align-stretch'>
                        <benben-images-upload ref="benbenImagesUploadfd1_0_c4_c0" v-model:img-list="imageList"
                            v-model:img-ids="clineInfo.feedback_image" :is-show-tips='true' :maxlength="6">
                            <template #content="{ num, maxlength, isShow, imgList }">
                                <view class="flex flex-wrap align-start flex feedBack_fd1_0_c4_c0">

                                    <view v-for="(image, index) in imgList" :key="index"
                                        class='flex position-relative feedBack_fd1_0_c4_c00'>
                                        <text class='fu-iconfont2 position-absolute feedBack_fd1_0_c4_c000'
                                            @tap.stop="benbenImagesUploadfd1_0_c4_c0.delImage(index)">&#xE8E7;</text>
                                        <image class='feedBack_fd1_0_c4_c001'
                                            @tap.stop="benbenImagesUploadfd1_0_c4_c0.previewImage(index)"
                                            mode="aspectFit" :src='image'></image>
                                    </view>

                                    <image class='feedBack_fd1_0_c4_c01'
                                        @tap.stop="benbenImagesUploadfd1_0_c4_c0.manyChooseImage()" v-if="isShow"
                                        mode="aspectFit" :src='STATIC_URL + "28.png"'></image>
                                    <text class='image_upload_tips feedBack_fd1_0_c4_c02'>请上传应用截图，最多上传6张</text>
                                </view>
                            </template>
                        </benben-images-upload>
                    </view>
                </view>
                <button class='flex-sub feedBack_fd1_1' @tap.stop="postfeedbackFunc()" open-type="contact">提交</button>
            </view>

            <!---意见反馈表单flex布局结束-->


        </view>
    </page-body>
</template>
<script setup lang="ts">
import { AddFeedback, GetFeedbacktype } from '@/api/system';
import type { IAddFeedbackReq, IGetFeedbacktypeRes } from '@/api/system/type';
import { HttpCode } from '@/constant';
import usePageMethod from '@/hooks/usePageMethod';
import Message from '@/utils/message';
import { validate } from '@/utils/validate';
import { useDebounceFn } from '@vueuse/core';
import { ref } from 'vue';

const { StatusBarRpx, handleJumpDiy, STATIC_URL } = usePageMethod
const changeType = ref<IGetFeedbacktypeRes[]>([])
const showSelectPopup1689675271268 = ref()
const imageList = ref<string[]>([])
const benbenImagesUploadfd1_0_c4_c0 = ref()
const clineInfo = ref<IAddFeedbackReq>({
    freefeedbacktypeFeedback_type_1_id: '',
    problem_description: '',
    contact_information: '',
    feedback_image: '',
})

GetFeedbacktype().then(({ data }) => {
    changeType.value = data
    clineInfo.value.freefeedbacktypeFeedback_type_1_id = changeType.value.at(0)?.aid!
})


function postfeedbackFunc() {
    if (!validate(clineInfo.value.freefeedbacktypeFeedback_type_1_id, 'require')) {
        Message.info('请选择反馈类型');
        return false;
    }
    if (!validate(clineInfo.value.problem_description, 'require')) {
        Message.info('请输入问题描述');
        return false;
    }
    Message.loading('提交中...')
    useDebounceFn(async () => {
        const { code, msg } = await AddFeedback({ ...clineInfo.value })
        Message.info(msg)
        if (code !== HttpCode.DATA_SUCCESS_CODE) return
        setTimeout(() => uni.navigateBack(), 350)
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

.feedBack_flex_0 {
    border-bottom: 1px solid #eee;
    background: #fff;
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background-size: 100% auto !important;
}

.feedBack_fd0_0_c2_c0 {
    font-size: 32rpx;
    font-weight: 500;
    color: #999999;
    text-align: right;
    font-style: normal;
}

.feedBack_fd0_0_c2 {
    padding: 0rpx 0rpx 0rpx 0rpx;
    width: 200rpx;
}

.feedBack_fd0_0_c1_c0 {
    font-size: 36rpx;
    font-weight: 500;
    color: var(--benbenFontColor0);
    line-height: 50rpx;
}

.feedBack_fd0_0_c0_c0 {
    font-size: 36rpx;
    font-weight: 400;
    color: #333;
}

.feedBack_fd0_0_c0 {
    width: 200rpx;
}

.feedBack_fd0_0 {
    padding: 0rpx 32rpx 0rpx 32rpx;
    line-height: 88rpx;
}

.feedBack_fd1_1 {
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

.feedBack_fd1_0_c4_c02 {
    font-size: 24rpx;
    color: var(--benbenFontColor2);
    font-weight: 400;
    width: 100%;
}

.feedBack_fd1_0_c4_c01 {
    width: 160rpx;
    height: 160rpx;
    margin: 0rpx 24rpx 24rpx 0rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
}

.feedBack_fd1_0_c4_c001 {
    width: 160rpx;
    height: 160rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
}

.feedBack_fd1_0_c4_c000 {
    top: 0rpx;
    right: 0rpx;
    z-index: 10;
    color: #ff5536;
}

.feedBack_fd1_0_c4_c00 {
    margin: 0rpx 24rpx 24rpx 0rpx;
}

.feedBack_fd1_0_c4_c0 {
    padding: 24rpx 0rpx 0rpx 24rpx;
}

.feedBack_input_fd1_0_c3_c0 {
    width: 100%;
    height: 166rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
}

.feedBack_fd1_0_c3_c0 {
    width: 686rpx;
    border-radius: 10rpx 10rpx 10rpx 10rpx;
    margin: 0rpx 0rpx 0rpx 32rpx;
    padding: 0rpx 0rpx 24rpx 0rpx;
}

.feedBack_fd1_0_c3 {
    margin: 0rpx 0rpx 32rpx 0rpx;
}

.feedBack_fd1_0_c2 {
    font-size: 32rpx;
    font-weight: 500;
    color: var(--benbenFontColor0);
    line-height: 109rpx;
    margin: 0rpx 32rpx 0rpx 32rpx;
}

.feedBack_fd1_0_c1_c0_c1_c0 {
    font-size: 28rpx;
    font-weight: 400;
    color: #999999;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-align: center;
    font-style: normal;
}

.feedBack_fd1_0_c1_c0_c1 {
    border: 1px solid #BFBFBF;
    background: #FFFFFF;
    margin: 16rpx 16rpx 16rpx 16rpx;
    height: 64rpx;
    border-radius: 8rpx 8rpx 8rpx 8rpx;
    width: 206rpx;
    padding: 0rpx 10rpx 0rpx 10rpx;
}

.feedBack_fd1_0_c1_c0_c0_c0 {
    font-size: 28rpx;
    font-weight: 400;
    color: #3090FF;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-align: center;
    font-style: normal;
}

.feedBack_fd1_0_c1_c0_c0 {
    border: 1px solid #3090FF;
    background: rgba(48, 144, 255, 0.1);
    margin: 16rpx 16rpx 16rpx 16rpx;
    height: 64rpx;
    border-radius: 8rpx 8rpx 8rpx 8rpx;
    width: 206rpx;
    padding: 0rpx 10rpx 0rpx 10rpx;
}

.feedBack_fd1_0_c1 {
    border-bottom: 10px solid rgba(246, 247, 248, 1);
    padding: 0rpx 16rpx 16rpx 16rpx;
}

.feedBack_fd1_0_c0_c0 {
    font-size: 32rpx;
    font-weight: 500;
    color: var(--benbenFontColor0);
    margin: 0rpx 32rpx 0rpx 32rpx;
}

.feedBack_fd1_0_c0 {
    padding: 32rpx 0rpx 12rpx 0rpx;
}

.feedBack_fd1_0 {
    border-bottom: 10px solid rgba(248, 249, 252, 1);
    background: rgba(255, 255, 255, 1);
    background-size: 100% auto !important;
    padding: 0rpx 0rpx 48rpx 0rpx;
    margin: 0rpx 0rpx 180rpx 0rpx;
}
</style>