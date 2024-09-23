<template>
    <page-body>
        <view class="page">
            <view class="flex benben-position-layout flex flex-wrap align-center cailiaofp_flex_0"
                :style="{ height: (88 + StatusBarRpx) + 'rpx', paddingTop: StatusBarRpx + 'rpx', }">
                <view class='flex flex-wrap align-center justify-between flex-sub cailiaofp_fd0_0'>
                    <view class='flex flex-wrap align-center cailiaofp_fd0_0_c0' @tap.stop="handleJumpDiy"
                        data-type="back" data-url="1">
                        <text class='fu-iconfont2  cailiaofp_fd0_0_c0_c0'>&#xE794;</text>
                    </view>
                    <view class='flex flex-wrap align-stretch justify-center'>
                        <text class='cailiaofp_fd0_0_c1_c0'>选择材料</text>
                    </view>
                    <view class='flex flex-wrap align-center justify-end cailiaofp_fd0_0_c0'>
                    </view>
                </view>

            </view>
            <view :style="{ height: (88 + StatusBarRpx) + 'rpx' }"></view>
            <!---flex布局flex布局开始-->
            <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout">
                <view class='flex flex-direction flex-wrap align-stretch cailiaofp_fd1_0'>
                    <view style="height: 150rpx;"></view>
                    <view class='flex flex-wrap align-center cailiaofp_fd1_0_c0 fixed-box'
                        :style="{ top: (88 + StatusBarRpx) + 'rpx' }">
                        <view class='flex flex-wrap align-center flex-sub cailiaofp_fd1_0_c0_c0'>
                            <image class='cailiaofp_fd1_0_c0_c0_c0' mode="aspectFit" :src='STATIC_URL + "58.png"'>
                            </image>
                            <benben-input class='cailiaofp_fd1_0_c0_c0_c1' type="text" :placeholder="`搜索名称`"
                                confirm-type="done" :maxlength="-1"
                                placeholder-style="color:rgba(153, 153, 153, 1);font-size:28rpx"
                                @confirm="pagingListToggle()" v-model="material_scienceRef" />
                            <button class='cailiaofp_fd1_0_c0_c0_c2' @tap.stop="pagingListToggle()">搜索</button>
                        </view>
                        <image class='cailiaofp_fd1_0_c0_c1' mode="aspectFit" :src='STATIC_URL + "38.png"'
                            @tap.stop="popupShow1716631941110 = true"></image>
                    </view>
                    <view v-for="item in listData" :key="item.aid" @tap.stop="item.isSelected = !item.isSelected"
                        class='flex align-center cailiaofp_fd1_0_c1'>
                        <view class="flex-sub">
                            <view class='flex flex-wrap align-center  cailiaofp_fd1_0_c1_c0'>
                                <text class='cailiaofp_fd1_0_c1_c0_c0'>材料名称：</text>
                                <text class='cailiaofp_fd1_0_c1_c0_c1'>{{ item.material_science }}</text>
                            </view>
                            <view class='flex flex-wrap align-center  cailiaofp_fd1_0_c1_c0'>
                                <text class='cailiaofp_fd1_0_c1_c0_c0'>区域名称：</text>
                                <text class='cailiaofp_fd1_0_c1_c0_c1'>{{ item.freewarehousearea_region }}</text>
                            </view>
                        </view>
                        <view style="margin-left: 20rpx;">
                            <image v-if="item.isSelected" class='xuanzgr_fd1_0_c1_c2_c0_c0_c0_c0' mode="aspectFit"
                                :src='STATIC_URL + "2.png"'></image>
                            <image v-else class='xuanzgr_fd1_0_c1_c2_c0_c0_c0_c0' mode="aspectFit"
                                :src='STATIC_URL + "23.png"'></image>
                        </view>
                    </view>
                    <fu-empty :pagingListLoadedAll="pagingListLoadedAll" :pagingListNoListData="pagingListNoListData"
                        :listDataLength="listDataLength" :isLoadInit="isLoadInit"></fu-empty>
                </view>
            </view>

            <!---flex布局flex布局结束-->
            <view class="flex flex-wrap align-start justify-center benben-position-layout flex cailiaofp_flex_2"
                :style="{ height: (128 + bottomSafeAreaRpx) + 'rpx', paddingBottom: bottomSafeAreaRpx + 'rpx', }">
                <view class='flex flex-wrap align-center justify-between flex-sub cailiaofp_fd2_0'>
                    <button class='cailiaofp_fd2_0_c1' @tap.stop="chooseHandle()" data-type="navigateTo"
                        :data-url="`/pages/gdlb/xtbzfp/xtbzfp`">确定</button>
                </view>

            </view>
            <view :style="{ height: (128 + bottomSafeAreaRpx) + 'rpx' }"></view>
            <benben-popup v-model="popupShow1716631941110" :mask="true" :mask-close-able="false" mode='right'
                :z-index='999'>
                <!---筛选弹窗flex布局开始-->
                <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout cailiaofp_flex_3">
                    <view class='flex flex-wrap align-center justify-between cailiaofp_fd3_0'>
                        <text class='cailiaofp_fd3_0_c0'>筛选</text>
                        <image @tap.stop="popupShow1716631941110 = false" class='cailiaofp_fd3_0_c1' mode="aspectFit"
                            :src='STATIC_URL + "39.png"'></image>
                    </view>
                    <view class='flex flex-direction flex-wrap align-stretch'>
                        <text class='cailiaofp_fd3_1_c0'>区域名称</text>
                        <view class='flex flex-wrap align-center cailiaofp_fd3_1_c1'>
                            <benben-select-diy ref="showSelectPopup1716632085691" class-name='flex flex-wrap flex'
                                v-model:items="select_type" v-model="freewarehousearea_idRef" default-type="aid"
                                default-label="region" :allow-cancel='false' type="radio" :disabled='false'>
                                <template v-for='(item, key0) in select_type'>
                                    <view v-if="item.isSelected" class='flex flex cailiaofp_fd3_1_c1_c0_c0'
                                        @tap="showSelectPopup1716632085691.tapHandle(key0)">
                                        <text class='cailiaofp_fd3_1_c1_c0_c0_c0'>{{ item.region }}</text>
                                    </view>
                                    <view v-else class='flex flex cailiaofp_fd3_1_c1_c0_c1'
                                        @tap="showSelectPopup1716632085691.tapHandle(key0)">
                                        <text class='cailiaofp_fd3_1_c1_c0_c1_c0'>{{ item.region }}</text>
                                    </view>
                                </template></benben-select-diy>
                        </view>
                    </view>
                    <view class='flex flex-direction flex-wrap align-stretch cailiaofp_fd3_2'>
                        <view class='flex flex-wrap align-center justify-between cailiaofp_fd3_2_c0'>
                            <button class='cailiaofp_fd3_2_c0_c0' @tap.stop="freewarehousearea_idRef = ''">重置</button>
                            <button class='cailiaofp_fd3_2_c0_c1'
                                @tap.stop="pagingListToggle(); popupShow1716631941110 = false">确定</button>
                        </view>
                    </view>
                </view>

                <!---筛选弹窗flex布局结束-->

            </benben-popup>


        </view>
    </page-body>
</template>
<script setup lang="ts">
import { GetMaterialinformation, GetWarehousearea } from '@/api/home';
import type { IGetMaterialinformationReq, IGetMaterialinformationRes, IGetWarehouseareaRes } from '@/api/home/type';
import { EventBusKey } from '@/constant';
import usePageMethod from '@/hooks/usePageMethod';
import { usePagingList } from '@/hooks/usePagingList';
import Message from '@/utils/message';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';

onLoad((options: any) => {
    const { aidArr } = options
    if (aidArr) aidArrRef.value = JSON.parse(aidArr)
})

const aidArrRef = ref<number[]>([])
const material_scienceRef = ref('')
const freewarehousearea_idRef = ref('')
const popupShow1716631941110 = ref(false)
const select_type = ref<IGetWarehouseareaRes[]>([])
const showSelectPopup1716632085691 = ref()
const { StatusBarRpx, bottomSafeAreaRpx, STATIC_URL, handleJumpDiy } = usePageMethod
const { listData, pagingListLoadedAll, pagingListNoListData, listDataLength, isLoadInit, pagingListToggle } = usePagingList<IGetMaterialinformationRes[], IGetMaterialinformationReq>({ minixPagingListsApi: GetMaterialinformation, pagingListPostData, formatDataFn })

function formatDataFn() {
    listData.value = listData.value.map(item => ({ ...item, isSelected: aidArrRef.value.findIndex((item1) => item1 === item.aid) > -1 }))
}

function pagingListPostData() {
    return {
        material_science: material_scienceRef.value,
        freewarehousearea_id: freewarehousearea_idRef.value
    }
}

GetWarehousearea().then(({ data }) => {
    select_type.value = data.map(item => ({ ...item, isSelected: false }))
})

function chooseHandle() {
    const arr = listData.value.filter(item => item.isSelected)
    if (arr.length <= 0) return Message.info('请选择材料！')
    uni.$emit(EventBusKey.CHOOSE_MATERIAL, arr)
    setTimeout(() => uni.navigateBack(), 300)
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
    /* border-bottom: 1px solid #eee; */
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
    z-index: 1;
}

.cailiaofp_fd1_0 {
    padding: 0rpx 24rpx 0rpx 24rpx;
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
    width: 98%;
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

.xuanzgr_fd1_0_c1_c2_c0_c0_c0_c0 {
    width: 42rpx;
    height: 42rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    margin: 0rpx 16rpx 0rpx 0rpx;
}
</style>