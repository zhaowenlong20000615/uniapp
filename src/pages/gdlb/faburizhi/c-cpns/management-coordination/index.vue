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
        <view v-for="(item, index) in clientInfo.info">
            <view class='faburizhi_fd2_0_c2' v-if="index === clientInfo.info.length - 1" @tap.stop="addFunc()">
                新增</view>
            <uni-swipe-action>
                <!-- 基础用法 -->
                <uni-swipe-action-item key="1">
                    <template v-slot:right>
                        <view class="slot-button flex align-center" style="margin-right: 30rpx;"
                            @tap.stop="clientInfo.info.length > 1 ? clientInfo.info.splice(index, 1) : null">
                            <image style="width: 84rpx;" :src='STATIC_URL + "61.png"' mode="widthFix" />
                        </view>
                    </template>
                    <view class='flex flex-direction flex-wrap align-stretch faburizhi_fd2_0_c3'>
                        <view class='flex flex-wrap align-center justify-between faburizhi_fd2_0_c1_c0'
                            @tap.stop="currentIndex = index; pointListVisiblefPicker = true">
                            <text class='faburizhi_fd2_0_c0_c0'>点位名称</text>
                            <view class='flex flex-wrap align-center'>
                                <benben-input class='faburizhi_fd2_0_c0_c1_c0' type="text" :placeholder="`请选择`"
                                    confirm-type="done" :maxlength="-1" :adjust-position='true' :disabled='true'
                                    placeholder-style="color:#999;font-size:28rpx"
                                    v-model="item.freesystempointlocation_name" />
                                <image class='faburizhi_fd2_0_c0_c1_c1' mode="aspectFit" :src='STATIC_URL + "37.png"'>
                                </image>
                            </view>
                        </view>
                        <view class='flex flex-wrap align-center justify-between faburizhi_fd2_0_c1_c1'
                            @tap.stop="currentIndex = index; processListVisiblefPicker = true">
                            <text class='faburizhi_fd2_0_c0_c0'>工序名称</text>
                            <view class='flex flex-wrap align-center'>
                                <benben-input class='faburizhi_fd2_0_c0_c1_c0' type="text" :placeholder="`请选择(可多选)`"
                                    confirm-type="done" :maxlength="-1" :adjust-position='true' :disabled='true'
                                    placeholder-style="color:#999;font-size:28rpx"
                                    v-model="item.freeprocesssteps_name" />
                                <image class='faburizhi_fd2_0_c0_c1_c1' mode="aspectFit" :src='STATIC_URL + "37.png"'>
                                </image>
                            </view>
                        </view>
                    </view>
                </uni-swipe-action-item>
            </uni-swipe-action>
        </view>

        <view class='flex flex-wrap align-center justify-between faburizhi_fd2_0_c0'>
            <view class='flex flex-wrap align-center'>
                <text class='faburizhi_fd2_0_c4_c0_c0'>*</text>
                <text class='faburizhi_fd2_0_c0_c0'>协调内容</text>
            </view>
            <view class='flex flex-wrap align-center'>
                <benben-input class='faburizhi_fd2_0_c4_c1_c0' type="text" :placeholder="`请输入`" confirm-type="done"
                    :maxlength="-1" :adjust-position='true' placeholder-style="color:#999;font-size:28rpx"
                    v-model="clientInfo.coordination_content" />
            </view>
        </view>
        <view class='flex flex-wrap align-center justify-between faburizhi_fd2_0_c0'>
            <view class='flex flex-wrap align-center'>
                <text class='faburizhi_fd2_0_c4_c0_c0'>*</text>
                <text class='faburizhi_fd2_0_c0_c0'>协调结果</text>
            </view>
            <view class='flex flex-wrap align-center'>
                <benben-input class='faburizhi_fd2_0_c4_c1_c0' type="text" :placeholder="`请输入`" confirm-type="done"
                    :maxlength="-1" :adjust-position='true' placeholder-style="color:#999;font-size:28rpx"
                    v-model="clientInfo.coordination_results" />
            </view>
        </view>
        <view class='flex flex-wrap align-center justify-between faburizhi_fd2_0_c0'
            @tap.stop="collaboratorListVisiblefPicker = true">
            <text class='faburizhi_fd2_0_c0_c0'>协调人员</text>
            <view class='flex flex-wrap align-center'>
                <benben-input class='faburizhi_fd2_0_c0_c1_c0' type="text" :placeholder="`请选择`" confirm-type="done"
                    :maxlength="-1" :adjust-position='true' :disabled='true'
                    placeholder-style="color:#999;font-size:28rpx" v-model="clientInfo.coordination_personnel_name" />
                <image class='faburizhi_fd2_0_c0_c1_c1' mode="aspectFit" :src='STATIC_URL + "37.png"'>
                </image>
            </view>
        </view>
    </view>

    <benben-picker ref="projectListRefPicker" v-model:visible="projectListVisiblefPicker"
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

    <benben-picker ref="systemListtRefPicker" v-model:visible="systemListtVisiblefPicker"
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

    <benben-picker ref="pointListRefPicker" v-model:visible="pointListVisiblefPicker" :options='pointList'
        mode='selector' :mask-show='true' :timeout='true' :picker-height='88' default-type='aid'
        :default-props='{ "label": "system_point_location", "value": "aid" }' @change="pointChangeHandle">
        <template #picker-header>
            <view class='flex flex-wrap align-center justify-between myInfo_picker2_0'>
                <text class='myInfo_picker2_0_c0' @tap="pointListRefPicker.cancel()">取消</text>
                <text class='myInfo_picker2_0_c1'>选择点位名称</text>
                <text class='myInfo_picker2_0_c2' @tap="pointListRefPicker.pickerConfirm()">确定</text>
            </view>
        </template>
    </benben-picker>

    <benben-picker ref="processListRefPicker" v-model:visible="processListVisiblefPicker" :options='processList'
        mode='selector' :mask-show='true' :timeout='true' :picker-height='88' default-type='aid'
        :default-props='{ "label": "process_steps", "value": "aid" }' @change="processChangeHandle">
        <template #picker-header>
            <view class='flex flex-wrap align-center justify-between myInfo_picker2_0'>
                <text class='myInfo_picker2_0_c0' @tap="processListRefPicker.cancel()">取消</text>
                <text class='myInfo_picker2_0_c1'>选择工序名称</text>
                <text class='myInfo_picker2_0_c2' @tap="processListRefPicker.pickerConfirm()">确定</text>
            </view>
        </template>
    </benben-picker>

    <benben-picker ref="collaboratorListRefPicker" v-model:visible="collaboratorListVisiblefPicker"
        v-model:label="clientInfo.coordination_personnel_name" v-model:value='clientInfo.coordination_personnel'
        :options='collaboratorList' mode='selector' :mask-show='true' :timeout='true' :picker-height='88'
        default-type='aid' :default-props='{ "label": "nickname", "value": "aid" }'>
        <template #picker-header>
            <view class='flex flex-wrap align-center justify-between myInfo_picker2_0'>
                <text class='myInfo_picker2_0_c0' @tap="collaboratorListRefPicker.cancel()">取消</text>
                <text class='myInfo_picker2_0_c1'>选择协作人</text>
                <text class='myInfo_picker2_0_c2' @tap="collaboratorListRefPicker.pickerConfirm()">确定</text>
            </view>
        </template>
    </benben-picker>
</template>

<script setup lang="ts">
import { AddManagementassistancedaily, GetEngineeringprojectsList, GetMemberuserXiezhu, GetProcesssteps, GetSystemList, GetSystempointlocation } from '@/api/home';
import type { IGetEngineeringprojectsListRes, IGetMemberuserXiezhuRes, IGetProcessstepsResDatum, IGetSystemListRes, IGetSystempointlocationResData } from '@/api/home/type';
import { EventBusKey, HttpCode } from '@/constant';
import usePageMethod from '@/hooks/usePageMethod';
import Message from '@/utils/message';
import { validate } from '@/utils/validate';
import { useDebounceFn } from '@vueuse/core';
import { ref, watchEffect } from 'vue';

const clientInfo = ref({
    coordination_content: '',
    coordination_results: '',
    coordination_personnel: '',
    coordination_personnel_name: '',
    freeengineeringprojects_id: '',
    freeengineeringprojects_name: '',
    freesystem_id: '',
    freesystem_name: '',
    info: [{ freesystempointlocation_id: '', freesystempointlocation_name: '', freeprocesssteps_id: '', freeprocesssteps_name: '', id: 0 }]
})
const { STATIC_URL } = usePageMethod
const currentIndex = ref(-1)
const projectList = ref<IGetEngineeringprojectsListRes[]>([])
const projectListVisiblefPicker = ref(false)
const projectListRefPicker = ref()

const systemList = ref<IGetSystemListRes[]>([])
const systemListtVisiblefPicker = ref(false)
const systemListtRefPicker = ref()

const pointList = ref<IGetSystempointlocationResData[]>([])
const pointListVisiblefPicker = ref(false)
const pointListRefPicker = ref()

const processList = ref<IGetProcessstepsResDatum[]>([])
const processListVisiblefPicker = ref(false)
const processListRefPicker = ref()

const collaboratorList = ref<IGetMemberuserXiezhuRes[]>([])
const collaboratorListVisiblefPicker = ref(false)
const collaboratorListRefPicker = ref()

defineExpose({ releaseHandle })

function addFunc() {
    clientInfo.value.info.push({ freesystempointlocation_id: '', freesystempointlocation_name: '', freeprocesssteps_id: '', freeprocesssteps_name: '', id: Math.random() })
}

GetEngineeringprojectsList().then(({ data }) => {
    projectList.value = data
})

GetSystemList().then(({ data }) => {
    systemList.value = data
})


GetMemberuserXiezhu().then(({ data }) => {
    collaboratorList.value = data
})

watchEffect(async () => {
    if (!clientInfo.value.freesystem_id) return
    const { data: { data } } = await GetSystempointlocation({ freesystem_id: clientInfo.value.freesystem_id, })
    pointList.value = data
})

function pointChangeHandle(e: any) {
    clientInfo.value.info[currentIndex.value].freesystempointlocation_name = e.obj.system_point_location
    clientInfo.value.info[currentIndex.value].freesystempointlocation_id = e.obj.aid
    getProcessList()
}

function processChangeHandle(e: any) {
    clientInfo.value.info[currentIndex.value].freeprocesssteps_name = e.obj.process_steps
    clientInfo.value.info[currentIndex.value].freeprocesssteps_id = e.obj.aid
}


async function getProcessList() {
    const { data: { data } } = await GetProcesssteps({ freesystempointlocation_id: clientInfo.value.info[currentIndex.value].freesystempointlocation_id })
    processList.value = data
}

function releaseHandle() {
    if (!validate(clientInfo.value.freeengineeringprojects_name, 'require')) {
        Message.info('项目名称不能为空');
        return false;
    }
    if (!validate(clientInfo.value.freesystem_name, 'require')) {
        Message.info('系统名称不能为空');
        return false;
    }
    if (!validate(clientInfo.value.coordination_content, 'require')) {
        Message.info('协调内容不能为空');
        return false;
    }
    if (!validate(clientInfo.value.coordination_results, 'require')) {
        Message.info('协调结果不能为空');
        return false;
    }

    Message.loading('发布中...')
    useDebounceFn(async () => {
        const { code, msg } = await AddManagementassistancedaily({ ...clientInfo.value })
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

.faburizhi_fd2_0_c2 {
    color: #3090FF;
    font-size: 32rpx;
    font-weight: 500;
    text-align: right;
    font-style: normal;
    margin: 20rpx 24rpx 24rpx 0rpx;
}

.faburizhi_fd2_0_c3 {
    background: #FFFFFF;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    margin: 0rpx 24rpx 24rpx 24rpx;
    padding: 0rpx 24rpx 0rpx 24rpx;
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

.faburizhi_fd2_0_c1_c1 {
    background: #FFFFFF;
    padding: 32rpx 0rpx 32rpx 0rpx;
    border-radius: 16rpx;
}

.faburizhi_fd2_0_c4_c0_c0 {
    color: rgba(255, 0, 0, 1);
    font-size: 32rpx;
    font-weight: 400;
    line-height: 48rpx;
    text-align: left;
    font-style: normal;
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
</style>