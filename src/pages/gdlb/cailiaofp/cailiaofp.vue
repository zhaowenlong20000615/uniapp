<template>
    <page-body>
        <movable-area style="height: 100vh;width: 100vw;">
            <movable-view class="publish_box" :x="109000" :y="500" direction="all" @tap.stop="handleJumpDiy"
                data-type="navigateTo" :data-url="`/pages/gdlb/cailiaofpTwo/cailiaofpTwo?aidArr=${aidArr}`">
                <image :src='STATIC_URL + "35.png"' mode="widthFix"></image>
            </movable-view>
            <view class="page">
                <view class="flex benben-position-layout flex flex-wrap align-center cailiaofp_flex_0"
                    :style="{ height: (88 + StatusBarRpx) + 'rpx', paddingTop: StatusBarRpx + 'rpx', }">
                    <view class='flex flex-wrap align-center justify-between flex-sub cailiaofp_fd0_0'>
                        <view class='flex flex-wrap align-center cailiaofp_fd0_0_c0' @tap.stop="handleJumpDiy"
                            data-type="back" data-url="1">
                            <text class='fu-iconfont2  cailiaofp_fd0_0_c0_c0'>&#xE794;</text>
                        </view>
                        <view class='flex flex-wrap align-stretch justify-center'>
                            <text class='cailiaofp_fd0_0_c1_c0'>材料分配</text>
                        </view>
                        <view class='flex flex-wrap align-center justify-end cailiaofp_fd0_0_c0'>
                            <text class='cailiaofp_fd0_0_c0_c0'></text>
                        </view>
                    </view>

                </view>
                <view :style="{ height: (88 + StatusBarRpx) + 'rpx' }"></view>
                <!---flex布局flex布局开始-->
                <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout">
                    <view class='flex flex-direction flex-wrap align-stretch cailiaofp_fd1_0'>
                        <view v-for="item in listData" :key="item.aid"
                            class='flex flex-direction flex-wrap align-stretch cailiaofp_fd1_0_c1'>
                            <view class='flex flex-wrap align-center justify-between cailiaofp_fd1_0_c1_c0'>
                                <text class='cailiaofp_fd1_0_c1_c0_c0'>材料名称</text>
                                <text class='cailiaofp_fd1_0_c1_c0_c1'>{{ item.material_science }}</text>
                            </view>
                            <view class='flex flex-wrap align-center justify-between cailiaofp_fd1_0_c1_c0'>
                                <text class='cailiaofp_fd1_0_c1_c0_c0'>区域名称</text>
                                <text class='cailiaofp_fd1_0_c1_c0_c1'>{{ item.freewarehousearea_region }}</text>
                            </view>
                            <view class='flex flex-wrap align-center justify-between cailiaofp_fd1_0_c1_c2'>
                                <text class='cailiaofp_fd1_0_c1_c0_c0'>领取数量</text>
                                <benben-input class='cailiaofp_fd1_0_c1_c2_c1' type="text" :placeholder="`请输入`"
                                    confirm-type="done" :maxlength="8" :adjust-position='true'
                                    placeholder-style="color:#999;font-size:32rpx" v-model="item.quantity_received" />
                            </view>
                        </view>
                    </view>
                </view>
                <fu-empty :pagingListLoadedAll="true" :pagingListNoListData="true" :listDataLength="listData.length"
                    :isLoadInit="true"></fu-empty>
                <!---flex布局flex布局结束-->
                <view class="flex flex-wrap align-start justify-center benben-position-layout flex cailiaofp_flex_2"
                    :style="{ height: (128 + bottomSafeAreaRpx) + 'rpx', paddingBottom: bottomSafeAreaRpx + 'rpx', }">
                    <view class='flex flex-wrap align-center justify-between flex-sub cailiaofp_fd2_0'>
                        <button class='cailiaofp_fd2_0_c0' @tap.stop="handleJumpDiy" data-type="back"
                            data-url="1">上一步</button>
                        <button class='cailiaofp_fd2_0_c1' @tap.stop="sureHandle()" data-type="navigateTo"
                            :data-url="`/pages/gdlb/xtbzfp/xtbzfp`">确认</button>
                    </view>

                </view>
                <view :style="{ height: (128 + bottomSafeAreaRpx) + 'rpx' }"></view>
            </view>
        </movable-area>
    </page-body>
</template>
<script setup lang="ts">
import { SetSystempointlocationZhuxiu } from '@/api/home';
import type { IGetMaterialinformationRes } from '@/api/home/type';
import { EventBusKey, HttpCode } from '@/constant';
import usePageMethod from '@/hooks/usePageMethod';
import { useWorkerStore } from '@/store/model/worker';
import Message from '@/utils/message';
import { onLoad } from '@dcloudio/uni-app';
import { useDebounceFn } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed, ref, watchEffect } from 'vue';

onLoad((options: any) => {
    const { aid } = options
    if (aid) aidRef.value = aid
})

watchEffect((onCleanup) => {
    uni.$on(EventBusKey.CHOOSE_MATERIAL, (data: IGetMaterialinformationRes[]) => { listData.value = data })

    onCleanup(() => {
        uni.$off(EventBusKey.CHOOSE_MATERIAL)
    })
})

const workerStore = useWorkerStore()

const { chooseWorkerData } = storeToRefs(workerStore)
const { StatusBarRpx, bottomSafeAreaRpx, STATIC_URL, handleJumpDiy } = usePageMethod
const listData = ref<IGetMaterialinformationRes[]>([])
const aidRef = ref('')

const aidArr = computed(() => JSON.stringify(listData.value.map(item => item.aid)))

function sureHandle() {
    if (listData.value.length <= 0) return Message.info('请选择材料！')
    if (listData.value.filter(item => !item.quantity_received).length > 0) return Message.info('请完善材料领取数量！')

    Message.info('确认中...')
    useDebounceFn(async () => {
        const major = chooseWorkerData.value.filter(item => item.major).map(item => item.major).join(',')
        const secondary_repair = chooseWorkerData.value.filter(item => item.secondary_repair).map(item => item.secondary_repair).join(',')
        const cailiao = listData.value.map(item => ({ freematerialinformation_id: item.aid, quantity_received: item.quantity_received }))
        const post = {
            aid: aidRef.value,
            major,
            secondary_repair,
            cailiao,
        }
        const { code, msg } = await SetSystempointlocationZhuxiu(post)
        Message.info(msg)
        if (code !== HttpCode.DATA_SUCCESS_CODE) return
        uni.$emit(EventBusKey.WORK_ORDER_DETAILS)
        setTimeout(() => uni.navigateBack({ delta: 3 }), 350)
    }, 350)()
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

.cailiaofp_flex_0 {
    background: #fff;
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background-size: 100% auto !important;
}

.cailiaofp_fd0_0_c1_c0 {
    font-size: 36rpx;
    font-weight: 700;
    color: #333333;
    line-height: 50rpx;
}

.cailiaofp_fd0_0_c0_c0 {
    font-size: 36rpx;
    color: #333;
}

.cailiaofp_fd0_0_c0 {
    width: 120rpx;
}

.cailiaofp_fd0_0 {
    padding: 0rpx 32rpx 0rpx 32rpx;
}

.cailiaofp_fd1_0_c1_c2_c1 {
    text-align: right;
}

.cailiaofp_fd1_0_c1_c2 {
    padding: 32rpx 0rpx 32rpx 0rpx;
}

.cailiaofp_fd1_0_c1_c0_c1 {
    color: #101010;
    font-size: 32rpx;
    font-weight: 400;
    text-align: left;
    font-style: normal;
}

.cailiaofp_fd1_0_c1_c0_c0 {
    color: #666666;
    font-size: 32rpx;
    font-weight: 400;
    text-align: left;
    font-style: normal;
}

.cailiaofp_fd1_0_c1_c0 {
    border-bottom: 1px solid #eee;
    padding: 32rpx 0rpx 32rpx 0rpx;
}

.cailiaofp_fd1_0_c1 {
    background: #FFFFFF;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    padding: 0rpx 24rpx 0rpx 24rpx;
    margin: 0rpx 0rpx 24rpx 0rpx;
}

.cailiaofp_fd1_0_c0_c1 {
    width: 48rpx;
    height: 48rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
}

.cailiaofp_fd1_0_c0_c0_c2 {
    background: rgba(48, 144, 255, 1);
    border-radius: 34rpx 34rpx 34rpx 34rpx;
    width: 120rpx;
    line-height: 64rpx;
    font-size: 24rpx;
    color: #fff;
    height: 64rpx;
    margin: 0rpx 0rpx 0rpx auto;
}

.cailiaofp_fd1_0_c0_c0_c1 {
    color: var(--benbenFontColor0);
    font-size: 28rpx;
    font-weight: 500;
}

.cailiaofp_fd1_0_c0_c0_c0 {
    width: 32rpx;
    height: 32rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    margin: 0rpx 16rpx 0rpx 32rpx;
}

.cailiaofp_fd1_0_c0_c0 {
    border: 1px solid rgba(48, 144, 255, 1);
    background: rgba(255, 255, 255, 1);
    height: 72rpx;
    border-radius: 34rpx 34rpx 34rpx 34rpx;
    margin: 0rpx 28rpx 0rpx 0rpx;
}

.cailiaofp_fd1_0_c0 {
    padding: 24rpx 24rpx 6rpx;
    background-color: #F8F8F8;
    z-index: 9899;
}

.cailiaofp_fd1_0 {
    padding: 24rpx 24rpx 0rpx 24rpx;
}

.cailiaofp_flex_2 {
    background: #F8F8F8;
    width: 750rpx;
    height: 128rpx;
    overflow: hidden;
    z-index: 10;
    bottom: calc(0rpx + var(--window-bottom));
    bottom: 0;
    background-size: 100% auto;
}

.cailiaofp_fd2_0_c1 {
    background: #3090FF;
    border-radius: 44rpx 44rpx 44rpx 44rpx;
    width: 329rpx;
    line-height: 88rpx;
    font-size: 32rpx;
    color: #fff;
    height: 88rpx;
}

.cailiaofp_fd2_0_c0 {
    border: 2px solid #3090FF;
    background: rgba(255, 255, 255, 1);
    border-radius: 44rpx 44rpx 44rpx 44rpx;
    width: 329rpx;
    line-height: 88rpx;
    font-size: 32rpx;
    color: rgba(48, 144, 255, 1);
    height: 88rpx;
}

.cailiaofp_fd2_0 {
    padding: 0rpx 24rpx 0rpx 24rpx;
}

.cailiaofp_flex_3 {
    background: #fff;
    width: 556rpx;
    padding: 48rpx 0rpx 0rpx 0rpx;
    background-size: 100% auto !important;
    height: 100%;
    position: relative;
}

.cailiaofp_fd3_2_c0_c1 {
    background: #3090FF;
    border-radius: 0rpx 36rpx 36rpx 0rpx;
    font-size: 32rpx;
    color: #FFFFFF;
    width: 246rpx;
    height: 72rpx;
    line-height: 72rpx;
    font-weight: 400;
    font-style: normal;
}

.cailiaofp_fd3_2_c0_c0 {
    background: #EEEEEE;
    border-radius: 36rpx 0rpx 0rpx 36rpx;
    font-size: 32rpx;
    color: #333333;
    width: 246rpx;
    height: 72rpx;
    line-height: 72rpx;
    font-weight: 400;
    font-style: normal;
}

.cailiaofp_fd3_2_c0 {
    padding: 76rpx 0rpx 0rpx 0rpx;
}

.cailiaofp_fd3_2 {
    margin: 0rpx 0rpx 0rpx 24rpx;
}

.cailiaofp_fd3_1_c1_c0_c1_c0 {
    color: #333333;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 64rpx;
    text-align: center;
    font-style: normal;
}

.cailiaofp_fd3_1_c1_c0_c1 {
    background: #F8F8F8;
    margin: 0rpx 12rpx 24rpx 12rpx;
    border-radius: 8rpx 8rpx 8rpx 8rpx;
    height: 64rpx;
    padding: 0rpx 30rpx 0rpx 30rpx;
}

.cailiaofp_fd3_1_c1_c0_c0_c0 {
    color: #FFFFFF;
    font-size: 28rpx;
    font-weight: 400;
    text-align: center;
    font-style: normal;
    line-height: 64rpx;
}

.cailiaofp_fd3_1_c1_c0_c0 {
    background: #3090FF;
    border-radius: 8rpx 8rpx 8rpx 8rpx;
    height: 64rpx;
    margin: 0rpx 12rpx 24rpx 12rpx;
    padding: 0rpx 30rpx 0rpx 30rpx;
}

.cailiaofp_fd3_1_c1 {
    padding: 0rpx 12rpx 0rpx 12rpx;
}

.cailiaofp_fd3_1_c0 {
    color: #333333;
    font-size: 28rpx;
    font-weight: 700;
    text-align: left;
    font-style: normal;
    margin: 0rpx 24rpx 20rpx 24rpx;
}

.cailiaofp_fd3_0_c1 {
    width: 32rpx;
    height: 32rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
}

.cailiaofp_fd3_0_c0 {
    color: #333333;
    font-size: 32rpx;
    font-weight: 700;
    text-align: left;
    font-style: normal;
}

.cailiaofp_fd3_0 {
    margin: 0rpx 24rpx 40rpx 24rpx;
}

.publish_box {
    width: 100rpx;
    height: 100rpx;
    z-index: 99;
    position: fixed;

    image {
        width: 100rpx;
        height: 100rpx;
    }
}
</style>