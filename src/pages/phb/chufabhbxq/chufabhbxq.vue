<template>
    <page-body>
        <view class="page">
            <view class="flex benben-position-layout flex flex-wrap align-center chufabhbxq_flex_0"
                :style="{ height: (126 + StatusBarRpx) + 'rpx', paddingTop: StatusBarRpx + 'rpx', }">
                <view class='flex flex-wrap align-start justify-between flex-sub chufabhbxq_fd0_0'>
                    <view class='flex flex-wrap align-center chufabhbxq_fd0_0_c0' @tap.stop="handleJumpDiy"
                        data-type="back" data-url="1">
                        <text class='fu-iconfont2  chufabhbxq_fd0_0_c0_c0'>&#xE794;</text>
                    </view>
                    <view class='flex flex-wrap align-stretch justify-center'>
                        <benben-select-diy ref="showSelectPopup1716461361701"
                            class-name='flex flex chufabhbxq_fd0_0_c1_c0' v-model:items="select_type" v-model="typeRef"
                            default-type="value" default-label="name" :allow-cancel='false' type="radio"
                            :disabled='false'>
                            <template v-for='(item, key0) in select_type'>
                                <view v-if="item.isSelected" class='flex justify-center flex chufabhbxq_fd0_0_c1_c0_c0'
                                    :key="key0" @tap="showSelectPopup1716461361701.tapHandle(key0)">
                                    <text class='chufabhbxq_fd0_0_c1_c0_c0_c0'>{{ item.name }}</text>
                                </view>
                                <view v-else class='flex justify-center flex chufabhbxq_fd0_0_c1_c0_c1'
                                    @tap="showSelectPopup1716461361701.tapHandle(key0)">
                                    <text class='chufabhbxq_fd0_0_c1_c0_c1_c0'>{{ item.name }}</text>
                                </view>
                            </template></benben-select-diy>
                    </view>
                    <view class='flex flex-wrap align-center justify-end chufabhbxq_fd0_0_c0'>
                    </view>
                </view>

            </view>
            <view :style="{ height: (126 + StatusBarRpx) + 'rpx' }"></view>
            <!---flex布局flex布局开始-->
            <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout">
                <view class='flex flex-direction flex-wrap align-stretch chufabhbxq_fd1_0'>
                    <view class='flex flex-wrap align-center justify-between chufabhbxq_fd1_0_c0'
                        v-for="item in listData" :key="item.aid">
                        <view class='flex flex-wrap align-center'>
                            <image class='chufabhbxq_fd1_0_c0_c0_c0' mode="aspectFit" :src='STATIC_URL + "24.png"'>
                            </image>
                            <view class='flex flex-direction flex-wrap align-stretch'>
                                <text class='chufabhbxq_fd1_0_c0_c0_c1_c0'>{{ item.nickname }}</text>
                                <view class='flex flex-wrap align-center'>
                                    <text class='chufabhbxq_fd1_0_c0_c0_c1_c1_c0'>入职时间：</text>
                                    <text class='chufabhbxq_fd1_0_c0_c0_c1_c1_c0'>1998-08-08</text>
                                </view>
                            </view>
                        </view>
                        <view class='flex flex-wrap align-center'>
                            <text class='chufabhbxq_fd1_0_c0_c1_c0_1' v-if="tabsRef === '3'">完成{{ item.num }}单</text>
                            <text class='chufabhbxq_fd1_0_c0_c1_c0' v-else>处罚{{ item.num }}次</text>
                        </view>
                    </view>
                    <fu-empty style="background-color: #fff;margin-top: 50rpx;"
                        :pagingListLoadedAll="pagingListLoadedAll" :pagingListNoListData="pagingListNoListData"
                        :listDataLength="listDataLength" :isLoadInit="isLoadInit"></fu-empty>
                </view>
                <!---flex布局flex布局结束-->
            </view>

        </view>
    </page-body>
</template>
<script setup lang="ts">
import { CufaMemberuser, GetMemberuser, WeifaMemberuser } from '@/api/ranking';
import usePageMethod from '@/hooks/usePageMethod';
import { usePagingList } from '@/hooks/usePagingList';
import { onLoad } from '@dcloudio/uni-app';
import { computed, ref, watch } from 'vue';

onLoad((options: any) => {
    const { tabs } = options
    if (tabs) tabsRef.value = tabs
    pagingListToggle()
})

const { StatusBarRpx, handleJumpDiy, STATIC_URL } = usePageMethod
const showSelectPopup1716461361701 = ref()
const typeRef = ref('1')
const tabsRef = ref('1')
const select_type = ref([
    { name: '今日', value: '1', image: '', isSelected: false },
    { name: '本周', value: '2', image: '', isSelected: false },
    { name: '本月', value: '3', image: '', isSelected: false }
])
const minixPagingListsApi = computed(() => tabsRef.value === '1' ? CufaMemberuser : tabsRef.value === '2' ? WeifaMemberuser : GetMemberuser)
const { listData, pagingListLoadedAll, pagingListNoListData, listDataLength, isLoadInit, pagingListToggle } = usePagingList({ minixPagingListsApi, pagingListPostData, allowOnloadGetList: false })

function pagingListPostData() {
    return {
        type: typeRef.value
    }
}

watch(() => typeRef.value, () => pagingListToggle())

</script>
<style lang="scss" scoped>
.page {
    width: 100vw;
    overflow-x: hidden;
    min-height: calc(100vh - var(--window-bottom));
    background: url(image-path('26.png')) no-repeat, #fff;
    background-size: 100% auto;
}

.chufabhbxq_flex_0 {
    background: url(image-path('26.png')) no-repeat;
    width: 750rpx;
    height: 126rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background-size: 100% auto !important;
}

.chufabhbxq_fd0_0_c1_c0_c1_c0 {
    color: rgba(211, 211, 211, 1);
    font-size: 32rpx;
    font-weight: 500;
    line-height: 70rpx;
    text-align: left;
    font-style: normal;
}

.chufabhbxq_fd0_0_c1_c0_c1 {
    border: 1px solid rgba(242, 242, 242, 0.2);
    background: #535371;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    width: 170rpx;
    height: 70rpx;
    box-shadow: 0rpx 3 6rpx 1rpx rgba(0, 0, 0, 0.1);
}

.chufabhbxq_fd0_0_c1_c0_c0_c0 {
    color: #FFFFFF;
    font-size: 32rpx;
    font-weight: 500;
    line-height: 70rpx;
    text-align: left;
    font-style: normal;
}

.chufabhbxq_fd0_0_c1_c0_c0 {
    background: rgba(255, 255, 255, 0.16);
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    width: 170rpx;
    height: 70rpx;
}

::v-deep .chufabhbxq_fd0_0_c1_c0 {
    border-radius: 24rpx;
}

.chufabhbxq_fd0_0_c0_c0 {
    font-size: 36rpx;
    color: rgba(255, 255, 255, 1);
}

.chufabhbxq_fd0_0_c0 {
    width: 50rpx;
}

.chufabhbxq_fd0_0 {
    padding: 30rpx 32rpx 0rpx 32rpx;
}

.chufabhbxq_fd1_0_c0_c1_c0_1 {
    color: rgba(1, 206, 161, 1);
    font-size: 28rpx;
    font-weight: 400;
    text-align: left;
    font-style: normal;
}

.chufabhbxq_fd1_0_c0_c1_c0 {
    color: #FF4040;
    font-size: 28rpx;
    font-weight: 400;
    text-align: left;
    font-style: normal;
}

.chufabhbxq_fd1_0_c0_c0_c1_c1_c0 {
    color: #999999;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 56rpx;
    text-align: left;
    font-style: normal;
}

.chufabhbxq_fd1_0_c0_c0_c1_c0 {
    color: #101010;
    font-size: 32rpx;
    font-weight: 700;
    line-height: 56rpx;
    text-align: left;
    font-style: normal;
    margin: 0rpx 0rpx 6rpx 0rpx;
}

.chufabhbxq_fd1_0_c0_c0_c0 {
    width: 96rpx;
    height: 96rpx;
    border-radius: 96rpx;
    margin: 0rpx 24rpx 0rpx 0rpx;
}

.chufabhbxq_fd1_0_c0 {
    border-bottom: 1px solid #eee;
    padding: 32rpx 0rpx 32rpx 0rpx;
}

.chufabhbxq_fd1_0 {
    background: #FFFFFF;
    border-radius: 40rpx 40rpx 0rpx 0rpx;
    padding: 0rpx 24rpx 0rpx 24rpx;
    min-height: 1257rpx;
    margin: 32rpx 0rpx 0rpx 0rpx;
}
</style>