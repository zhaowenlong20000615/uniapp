<template>
    <view class='flex flex-direction flex-wrap align-stretch'>
        <view class='flex flex-wrap align-center justify-between faburizhi_fd2_0_c0'
            @tap.stop="projectListVisiblefPicker = true">
            <view class='flex flex-wrap align-center'>
                <text class='faburizhi_fd2_0_c4_c0_c0'>*</text>
                <text class='faburizhi_fd2_0_c0_c0'>项目名称</text>
            </view>
            <view class='flex flex-wrap align-center'>
                <benben-input class='faburizhi_fd2_0_c0_c1_c0' type="text" :placeholder="`请选择`" confirm-type="done"
                    :maxlength="-1" :adjust-position='true' :disabled='true'
                    placeholder-style="color:#999;font-size:28rpx" v-model="clientInfo.freeengineeringprojects_name" />
                <image class='faburizhi_fd2_0_c0_c1_c1' mode="aspectFit" :src='STATIC_URL + "37.png"'>
                </image>
            </view>
        </view>
        <view class='flex flex-wrap align-center justify-between faburizhi_fd2_0_c0'
            @tap.stop="systemListtVisiblefPicker = true">
            <view class='flex flex-wrap align-center'>
                <text class='faburizhi_fd2_0_c4_c0_c0'>*</text>
                <text class='faburizhi_fd2_0_c0_c0'>系统名称</text>
            </view>
            <view class='flex flex-wrap align-center'>
                <benben-input class='faburizhi_fd2_0_c0_c1_c0' type="text" :placeholder="`请选择`" confirm-type="done"
                    :maxlength="-1" :adjust-position='true' :disabled='true'
                    placeholder-style="color:#999;font-size:28rpx" v-model="clientInfo.freesystem_name" />
                <image class='faburizhi_fd2_0_c0_c1_c1' mode="aspectFit" :src='STATIC_URL + "37.png"'>
                </image>
            </view>
        </view>
        <view class='flex flex-wrap align-center justify-between faburizhi_fd2_0_c0'
            @tap.stop=" pointListVisiblefPicker = true">
            <view class='flex flex-wrap align-center'>
                <text class='faburizhi_fd2_0_c4_c0_c0'>*</text>
                <text class='faburizhi_fd2_0_c0_c0'>点位名称</text>
            </view>
            <view class='flex flex-wrap align-center'>
                <benben-input class='faburizhi_fd2_0_c0_c1_c0' type="text" :placeholder="`请选择`" confirm-type="done"
                    :maxlength="-1" :adjust-position='true' :disabled='true'
                    placeholder-style="color:#999;font-size:28rpx" v-model="clientInfo.freesystempointlocation_name" />
                <image class='faburizhi_fd2_0_c0_c1_c1' mode="aspectFit" :src='STATIC_URL + "37.png"'>
                </image>
            </view>
        </view>
        <view class='flex flex-wrap align-center justify-between faburizhi_fd2_0_c0'>
            <view class='flex flex-wrap align-center'>
                <text class='faburizhi_fd2_0_c4_c0_c0'>*</text>
                <text class='faburizhi_fd2_0_c0_c0'>结果内容</text>
            </view>

            <view class='flex flex-wrap align-center'>
                <benben-input class='faburizhi_fd2_0_c4_c1_c0' type="text" :placeholder="`请输入`" confirm-type="done"
                    :maxlength="-1" :adjust-position='true' placeholder-style="color:#999;font-size:28rpx"
                    v-model="clientInfo.result_content" />
            </view>
        </view>
    </view>

    <benben-picker v-if="projectList.length > 0" ref="projectListRefPicker" v-model:visible="projectListVisiblefPicker"
        v-model:label="clientInfo.freeengineeringprojects_name" v-model:value='clientInfo.freeengineeringprojects_id'
        :options='projectList' mode='selector' :mask-show='true' :timeout='true' :picker-height='88' default-type='aid'
        :default-props='{ "label": "entry_name", "value": "aid" }'>
        <template #picker-header>
            <view class='flex flex-wrap align-center justify-between myInfo_picker2_0'>
                <text class='myInfo_picker2_0_c0' @tap="projectListRefPicker.cancel()">取消</text>
                <text class='myInfo_picker2_0_c1'>选择项目名称</text>
                <text class='myInfo_picker2_0_c2' @tap="projectListRefPicker.pickerConfirm()">确定</text>
            </view>
        </template>
    </benben-picker>

    <benben-picker v-if="systemList.length > 0" ref="systemListtRefPicker" v-model:visible="systemListtVisiblefPicker"
        v-model:label="clientInfo.freesystem_name" v-model:value='clientInfo.freesystem_id' :options='systemList'
        mode='selector' :mask-show='true' :timeout='true' :picker-height='88' default-type='aid'
        :default-props='{ "label": "system_name", "value": "aid" }'>
        <template #picker-header>
            <view class='flex flex-wrap align-center justify-between myInfo_picker2_0'>
                <text class='myInfo_picker2_0_c0' @tap="systemListtRefPicker.cancel()">取消</text>
                <text class='myInfo_picker2_0_c1'>选择系统名称</text>
                <text class='myInfo_picker2_0_c2' @tap="systemListtRefPicker.pickerConfirm()">确定</text>
            </view>
        </template>
    </benben-picker>

    <benben-picker v-if="pointList.length > 0" ref="pointListRefPicker" v-model:visible="pointListVisiblefPicker"
        v-model:label="clientInfo.freesystempointlocation_name" v-model:value='clientInfo.freesystempointlocation_id'
        :options='pointList' mode='selector' :mask-show='true' :timeout='true' :picker-height='88' default-type='aid'
        :default-props='{ "label": "system_point_location", "value": "aid" }'>
        <template #picker-header>
            <view class='flex flex-wrap align-center justify-between myInfo_picker2_0'>
                <text class='myInfo_picker2_0_c0' @tap="pointListRefPicker.cancel()">取消</text>
                <text class='myInfo_picker2_0_c1'>选择点位名称</text>
                <text class='myInfo_picker2_0_c2' @tap="pointListRefPicker.pickerConfirm()">确定</text>
            </view>
        </template>
    </benben-picker>
</template>

<script setup lang="ts">
import { AddRwcc, GetEngineeringprojectsList, GetSystemList, GetSystempointlocation } from '@/api/home';
import type { IGetEngineeringprojectsListRes, IGetSystemListRes, IGetSystempointlocationResData } from '@/api/home/type';
import { EventBusKey, HttpCode } from '@/constant';
import usePageMethod from '@/hooks/usePageMethod';
import Message from '@/utils/message';
import { validate } from '@/utils/validate';
import { useDebounceFn } from '@vueuse/core';
import { ref, watchEffect } from 'vue';

const { STATIC_URL } = usePageMethod
const clientInfo = ref({
    result_content: '',
    freeengineeringprojects_id: '',
    freeengineeringprojects_name: '',
    freesystem_id: '',
    freesystem_name: '',
    freesystempointlocation_id: '',
    freesystempointlocation_name: '',
})
const projectList = ref<IGetEngineeringprojectsListRes[]>([])
const projectListVisiblefPicker = ref(false)
const projectListRefPicker = ref()

const systemList = ref<IGetSystemListRes[]>([])
const systemListtVisiblefPicker = ref(false)
const systemListtRefPicker = ref()

const pointList = ref<IGetSystempointlocationResData[]>([])
const pointListVisiblefPicker = ref(false)
const pointListRefPicker = ref()

defineExpose({ releaseHandle })

const { data: data1 } = await GetEngineeringprojectsList()
projectList.value = data1

GetSystemList().then(({ data }) => {
    systemList.value = data
})



watchEffect(async () => {
    if (!clientInfo.value.freesystem_id) return
    const { data: { data } } = await GetSystempointlocation({ freesystem_id: clientInfo.value.freesystem_id, })
    pointList.value = data
})

function releaseHandle() {
    if (!validate(clientInfo.value.freeengineeringprojects_name, 'require')) {
        Message.info('项目名称不能为空');
        return false;
    }
    if (!validate(clientInfo.value.freesystem_name, 'require')) {
        Message.info('系统名称不能为空');
        return false;
    }
    if (!validate(clientInfo.value.freesystempointlocation_id, 'require')) {
        Message.info('点位名称不能为空');
        return false;
    }
    if (!validate(clientInfo.value.result_content, 'require')) {
        Message.info('结果内容不能为空');
        return false;
    }

    Message.loading('发布中...')
    useDebounceFn(async () => {
        const { code, msg } = await AddRwcc({ ...clientInfo.value })
        Message.info(msg)
        if (code !== HttpCode.DATA_SUCCESS_CODE) return
        uni.$emit(EventBusKey.REFRESH)
        setTimeout(() => uni.navigateBack(), 300)
    })()
}
</script>

<style lang="scss" scoped>
.faburizhi_fd2_0_c0_c1_c1 {
    width: 24rpx;
    height: 24rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
}

.faburizhi_fd2_0_c0_c1_c0 {
    text-align: right;
    margin: 0rpx 18rpx 0rpx 0rpx;
}

.faburizhi_fd2_0_c0_c0 {
    color: #333333;
    font-size: 32rpx;
    font-weight: 400;
    line-height: 48rpx;
    text-align: left;
    font-style: normal;
}

.faburizhi_fd2_0_c0 {
    background: #FFFFFF;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    padding: 32rpx 24rpx 32rpx 24rpx;
    margin: 0rpx 024rpx 24rpx 24rpx;
}

.faburizhi_fd2_0_c4_c1_c0 {
    text-align: right;
    margin: 0rpx 0rpx 0rpx 0rpx;
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

.faburizhi_fd2_0_c4_c0_c0 {
    color: rgba(255, 0, 0, 1);
    font-size: 32rpx;
    font-weight: 400;
    line-height: 48rpx;
    text-align: left;
    font-style: normal;
}
</style>