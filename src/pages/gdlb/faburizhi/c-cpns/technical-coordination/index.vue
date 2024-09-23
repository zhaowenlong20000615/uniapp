<template>
    <view class='flex flex-direction flex-wrap align-stretch'>
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
    </view>
</template>

<script setup lang="ts">
import { AddTechnicalcoordinationdaily } from '@/api/home';
import { EventBusKey, HttpCode } from '@/constant';
import Message from '@/utils/message';
import { validate } from '@/utils/validate';
import { useDebounceFn } from '@vueuse/core';
import { ref } from 'vue';

const clientInfo = ref({
    coordination_content: '',
})

defineExpose({ releaseHandle })

function releaseHandle() {

    if (!validate(clientInfo.value.coordination_content, 'require')) {
        Message.info('协调内容不能为空');
        return false;
    }

    Message.loading('发布中...')
    useDebounceFn(async () => {
        const { code, msg } = await AddTechnicalcoordinationdaily({ ...clientInfo.value })
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
</style>