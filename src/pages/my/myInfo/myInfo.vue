<template>
    <page-body>
        <view class="page">
            <view
                class="flex flex-direction flex-wrap align-stretch justify-center benben-position-layout flex myInfo_flex_0"
                :style="{ height: (88 + StatusBarRpx) + 'rpx', paddingTop: StatusBarRpx + 'rpx', }">
                <view class='flex flex-wrap align-stretch justify-between myInfo_fd0_0'>
                    <view class='flex flex-wrap align-center myInfo_fd0_0_c0' @tap.stop="handleJumpDiy" data-type="back"
                        data-url="1">
                        <image class='myInfo_fd0_0_c0_c0' mode="aspectFit" :src='STATIC_URL + "59.png"'></image>
                    </view>
                    <view class='flex flex-wrap align-center'>
                        <text class='myInfo_fd0_0_c1_c0'>我的资料</text>
                    </view>
                    <view class='flex align-center justify-end myInfo_fd0_0_c2'>
                    </view>
                </view>

            </view>
            <view :style="{ height: (88 + StatusBarRpx) + 'rpx' }"></view>
            <!---我的资料flex布局开始-->
            <view class="flex flex-direction flex-wrap align-stretch">
                <view class='flex flex-direction align-stretch myInfo_fd1_0'>
                    <view class='flex flex-wrap align-center myInfo_fd1_0_c0'>
                        <text class='myInfo_fd1_0_c0_c0'>头像</text>
                        <benben-image-upload v-model:path="clientInfo.avatar" v-model:img-id="clientInfo.avatar"
                            :is-cropping="true" :is-show-clean="false"
                            class="upload position-relative myInfo_fd1_0_c0_c1">

                            <image class=" myInfo_fd1_0_c0_c1_image" mode="aspectFit"
                                :src="clientInfo.avatar || STATIC_URL + '60.png'"></image>
                        </benben-image-upload>
                    </view>
                    <view class='flex flex-wrap align-center justify-between myInfo_fd1_0_c1'
                        @tap.stop="pickerDiy1656985489961 = true">
                        <text class='myInfo_fd1_0_c0_c0'>性别</text>
                        <benben-input class='flex-sub myInfo_fd1_0_c1_c1' type="text" :placeholder="`请选择性别`"
                            confirm-type="done" :maxlength="-1" :disabled='true'
                            placeholder-style="color:rgba(102, 102, 102, 1);font-size:32rpx" v-model="sexName" />
                        <image class='myInfo_fd1_0_c1_c2' mode="aspectFit" :src='STATIC_URL + "37.png"'></image>
                    </view>
                </view>
                <view class='flex flex-wrap align-center justify-center myInfo_fd1_1'>
                    <button class='myInfo_fd1_1_c0' @tap.stop="editUserFunc()">保存</button>
                </view>
            </view>

            <!---我的资料flex布局结束-->
            <!--选择生日开始 -->
            <benben-picker ref="benbenWritePickerCodepicker2" v-model:visible="pickerDiy1656986153485"
                :value.sync='clientInfo.birthday' mode='date' :picker-height='88' :current='true' :mask-show='true'
                fields='day' :timeout='true' start-year='1990-01-01' end-year='现在'>
                <template #picker-header>
                    <view class='flex flex-wrap align-center justify-between myInfo_picker2_0'>
                        <text class='myInfo_picker2_0_c0' @tap="benbenWritePickerCodepicker2.cancel()">取消</text>
                        <text class='myInfo_picker2_0_c1'>选择日期</text>
                        <text class='myInfo_picker2_0_c2' @tap="benbenWritePickerCodepicker2.pickerConfirm()">确定</text>
                    </view>
                </template>
            </benben-picker>
            <!--选择生日结束 -->
            <!--选择性别开始 -->
            <benben-picker ref="benbenWritePickerCodepicker3" v-model:visible="pickerDiy1656985489961"
                v-model:value='clientInfo.sex' :options='SexType' mode='selector' :mask-show='true' :timeout='true'
                :picker-height='88' default-type='value' :default-props='{ "label": "name", "value": "value" }'>
                <template #picker-header>
                    <view class='flex flex-wrap align-center justify-between myInfo_picker3_0'>
                        <text class='myInfo_picker3_0_c0' @tap="benbenWritePickerCodepicker3.cancel()">取消</text>
                        <text class='myInfo_picker3_0_c1'>请选择性别</text>
                        <text class='myInfo_picker3_0_c2' @tap="benbenWritePickerCodepicker3.pickerConfirm()">确定</text>
                    </view>
                </template>
            </benben-picker>
            <!--选择性别结束 -->


        </view>
    </page-body>
</template>
<script setup lang="ts">
import { EditUserInfo } from '@/api/user';
import { HttpCode } from '@/constant';
import { SexType } from '@/constant/mock';
import usePageMethod from '@/hooks/usePageMethod';
import { useUserStore } from '@/store/model/user';
import Message from '@/utils/message';
import { useDebounceFn } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const { StatusBarRpx, handleJumpDiy, STATIC_URL } = usePageMethod
const pickerDiy1656985489961 = ref(false)
const pickerDiy1656986153485 = ref(false)
const benbenWritePickerCodepicker2 = ref()
const benbenWritePickerCodepicker3 = ref()
const clientInfo = ref({
    avatar: '',
    nickname: userInfo.value?.nickname!,
    sex: 0,
    birthday: '',
})
clientInfo.value.avatar = userInfo.value?.avatar!
clientInfo.value.sex = userInfo.value?.sex!
const sexName = computed(() => SexType.find(item => item.value === (clientInfo.value.sex))?.name)

function editUserFunc() {
    Message.loading('提交中...')
    useDebounceFn(async () => {
        const { code, msg } = await EditUserInfo({ ...clientInfo.value })
        Message.info(msg)
        if (code !== HttpCode.DATA_SUCCESS_CODE) return
        userStore.asyncUpdateUserInfo()
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

.myInfo_flex_0 {
    background: #fff;
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background-size: 100% auto !important;
}

.myInfo_fd0_0_c2 {
    padding: 0rpx 0rpx 0rpx 0rpx;
    width: 100rpx;
}

.myInfo_fd0_0_c1_c0 {
    font-size: 36rpx;
    font-weight: 700;
    color: #101010;
    text-align: center;
    font-style: normal;
}

.myInfo_fd0_0_c0_c0 {
    width: 18rpx;
    height: 32rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
}

.myInfo_fd0_0_c0 {
    width: 100rpx;
}

.myInfo_fd0_0 {
    padding: 0rpx 32rpx 0rpx 32rpx;
    line-height: 88rpx;
}

.myInfo_fd1_1_c0 {
    background: #3090FF;
    border-radius: 44rpx 44rpx 44rpx 44rpx;
    font-size: 32rpx;
    color: #fff;
    width: 702rpx;
    height: 88rpx;
    line-height: 88rpx;
}

.myInfo_fd1_1 {
    position: fixed;
    left: 0rpx;
    bottom: calc(40rpx + var(--window-bottom));
    width: 750rpx;
}

.myInfo_fd1_0_c1_c2 {
    width: 20rpx;
    height: 28rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    margin: 0rpx 0rpx 0rpx 24rpx;
}

.myInfo_fd1_0_c1_c1 {
    font-size: 32rpx;
    font-weight: 400;
    line-height: 32rpx;
    text-align: right;
    color: rgba(102, 102, 102, 1);
}

.myInfo_fd1_0_c1 {
    border-bottom: 1px solid #eee;
    padding: 32rpx 0rpx 32rpx 0rpx;
}

.myInfo_fd1_0_c0_c1_image {
    width: 88rpx;
    height: 88rpx;
    border-radius: 50rpx 50rpx 50rpx 50rpx;
}

.myInfo_fd1_0_c0_c1 {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50rpx 50rpx 50rpx 50rpx;
    margin: 0rpx 0rpx 0rpx auto;
}

.myInfo_fd1_0_c0_c0 {
    font-size: 32rpx;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
}

.myInfo_fd1_0_c0 {
    border-bottom: 1px solid #eee;
    line-height: 148rpx;
}

.myInfo_fd1_0 {
    background: rgba(255, 255, 255, 1);
    padding: 0rpx 32rpx 0rpx 32rpx;
    background-size: 100% auto !important;
}

.myInfo_picker2_0_c2 {
    color: var(--benbenFontColor5);
    line-height: 40rpx;
    font-size: 32rpx;
    font-weight: 500;
}

.myInfo_picker2_0_c1 {
    font-size: 32rpx;
    font-weight: 400;
    color: #333333;
}

.myInfo_picker2_0_c0 {
    line-height: 40rpx;
    font-size: 32rpx;
    font-weight: 500;
    color: var(--benbenFontColor1);
}

.myInfo_picker2_0 {
    border-bottom: 1px solid #eee;
    background: #fff;
    padding: 0rpx 32rpx 0rpx 32rpx;
    line-height: 88rpx;
    border-radius: 25rpx 25rpx 0rpx 0rpx;
    background-size: 100% auto !important;
}

.myInfo_picker3_0_c2 {
    color: rgba(48, 144, 255, 1);
    line-height: 40rpx;
    font-size: 32rpx;
    font-weight: 500;
}

.myInfo_picker3_0_c1 {
    font-size: 32rpx;
    font-weight: 400;
    color: #333333;
}

.myInfo_picker3_0_c0 {
    line-height: 40rpx;
    font-size: 32rpx;
    font-weight: 500;
    color: #BFBFBF;
}

.myInfo_picker3_0 {
    border-bottom: 1px solid #eee;
    background: #fff;
    padding: 0rpx 32rpx 0rpx 32rpx;
    line-height: 88rpx;
    border-radius: 25rpx 25rpx 0rpx 0rpx;
    background-size: 100% auto !important;
}
</style>