<template>
    <page-body>
        <view class="page">
            <view class="flex benben-position-layout flex flex-wrap align-center paihb_flex_0"
                :style="{ height: (88 + StatusBarRpx) + 'rpx', paddingTop: StatusBarRpx + 'rpx', }">
                <view class='flex flex-wrap align-center justify-between flex-sub paihb_fd0_0'>
                    <view class='flex flex-wrap align-center paihb_fd0_0_c0' @tap.stop="handleJumpDiy" data-type="back"
                        data-url="1">
                        <text class='fu-iconfont2  paihb_fd0_0_c0_c0'>&#xE794;</text>
                    </view>
                    <view class='flex flex-wrap align-stretch justify-center'>
                        <text class='paihb_fd0_0_c1_c0'>排行榜</text>
                    </view>
                    <view class='flex flex-wrap align-center justify-end paihb_fd0_0_c0'>
                    </view>
                </view>

            </view>
            <view :style="{ height: (88 + StatusBarRpx) + 'rpx' }"></view>
            <!---flex布局flex布局开始-->
            <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout">
                <view class='flex flex-direction flex-wrap align-stretch'>
                    <view class='flex flex-wrap align-center'>
                        <view>
                            <benben-flex-tabs class-name='paihb_benbenTabsfd1_0_c0_c0' v-model="tabs"
                                ref="benben_tabsfd1_0_c0_c0" select-mark="benben_tabsfd1_0_c0_c0"
                                key="benben_tabsfd1_0_c0_c0" :open-title-type='false' :open-sticky='true' :top='0'
                                :is-show-content='false' :scrollspy='false' v-model:tabs-info="tabsInfofd1_0_c0_c0">

                                <scroll-view @scroll="tabsInfofd1_0_c0_c0.scrollX = $event.detail.scrollLeft"
                                    id="benben_tabsfd1_0_c0_c0" class="benben-tabs" style="width:750rpx"
                                    :scroll-x="true" :scroll-left="tabsInfofd1_0_c0_c0.moveX"
                                    scroll-with-animation="all .3s ease">
                                    <view class="benben-tabs-content" id="benben_tabsfd1_0_c0_c0-content">
                                        <view id="benben_tabsfd1_0_c0_c0-title"
                                            class="benben-tabs-title flex flex align-center justify-around">
                                            <view
                                                :class="{ 'checkTitlefd1_0_c0_c0': tabs == '1', 'flex flex-wrap align-center': true }"
                                                @tap="tabs = '1'" :id="`benben_tabsfd1_0_c0_c0-title-item-${'1'}`">

                                                <text>处罚排行榜</text>

                                            </view>
                                            <view
                                                :class="{ 'checkTitlefd1_0_c0_c0': tabs == '2', 'flex flex-wrap align-center': true }"
                                                @tap="tabs = '2'" :id="`benben_tabsfd1_0_c0_c0-title-item-${'2'}`">

                                                <text>违法制度排行榜</text>

                                            </view>
                                            <view
                                                :class="{ 'checkTitlefd1_0_c0_c0': tabs == '3', 'flex flex-wrap align-center': true }"
                                                @tap="tabs = '3';" :id="`benben_tabsfd1_0_c0_c0-title-item-${'3'}`">

                                                <text>完成工单排行榜</text>

                                            </view>
                                        </view>
                                        <view
                                            :style="{ left: tabsInfofd1_0_c0_c0.lineleft, maxWidth: tabsInfofd1_0_c0_c0.lineWidth, }"
                                            id="benben_tabsfd1_0_c0_c0-line"
                                            class="benben-tabs-line flex benben-flex-tabs-line paihb_linefd1_0_c0_c0">
                                        </view>
                                    </view>
                                </scroll-view>

                            </benben-flex-tabs>

                        </view>
                    </view>
                    <view class='flex flex-direction flex-wrap align-stretch paihb_fd1_0_c1'
                        :style="{ paddingBottom: bottomSafeAreaRpx + 100 + 'rpx' }">
                        <view class='flex flex-wrap align-center justify-between paihb_fd1_0_c1_c0'
                            v-for="(item, index) in listData">
                            <view class='flex flex-wrap align-center'>
                                <image class='paihb_fd1_0_c1_c0_c0_c0' v-if="index === 0" mode="aspectFit"
                                    :src='STATIC_URL + "3.png"'>
                                </image>
                                <image class='paihb_fd1_0_c1_c0_c0_c0' v-else-if="index === 1" mode="aspectFit"
                                    :src='STATIC_URL + "4.png"'>
                                </image>
                                <image class='paihb_fd1_0_c1_c0_c0_c0' v-else-if="index === 2" mode="aspectFit"
                                    :src='STATIC_URL + "5.png"'>
                                </image>
                                <text v-else class='paihb_fd1_0_c1_c3_c0_c0'>{{ index + 1 }}</text>
                                <text class='paihb_fd1_0_c1_c0_c0_c1'>{{ item.nickname }}</text>
                            </view>
                            <view class='flex flex-wrap align-center'>
                                <text class='paihb_fd1_0_c1_c0_c1_c0_1' v-if="tabs === '3'">完成{{ item.num }}单</text>
                                <text class='paihb_fd1_0_c1_c0_c1_c0' v-else>处罚{{ item.num }}次</text>
                            </view>
                        </view>
                        <fu-empty style="background-color: #F8F8F8;" :pagingListLoadedAll="pagingListLoadedAll"
                            :pagingListNoListData="pagingListNoListData" :listDataLength="listDataLength"
                            :isLoadInit="isLoadInit"></fu-empty>
                    </view>

                    <view class='flex flex-wrap align-center justify-center fixed-box'
                        :style="{ paddingBottom: bottomSafeAreaRpx + 100 + 'rpx' }">
                        <button class='paihb_fd1_0_c2_c0' @tap.stop="handleJumpDiy" data-type="navigateTo"
                            :data-url="`/pages/phb/chufabhbxq/chufabhbxq?tabs=${tabs}`">查看榜单</button>
                    </view>
                </view>
            </view>
            <!---flex布局flex布局结束-->
        </view>
    </page-body>
</template>
<script setup lang="ts">
import { CufaMemberuser, GetMemberuser, WeifaMemberuser } from '@/api/ranking';
import usePageMethod from '@/hooks/usePageMethod';
import { usePagingList } from '@/hooks/usePagingList';
import { ref, watch } from 'vue';

const { StatusBarRpx, handleJumpDiy, STATIC_URL, bottomSafeAreaRpx } = usePageMethod
const tabsInfofd1_0_c0_c0 = ref({ lineleft: '', lineWidth: '', moveX: 0, scrollX: 0, PageScrollX: 0 })
const tabs = ref('1')
const minixPagingListsApi = ref(CufaMemberuser)
const { listData, pagingListLoadedAll, pagingListNoListData, listDataLength, isLoadInit, pagingListToggle } = usePagingList({ minixPagingListsApi, pagingListPostData })

function pagingListPostData() {
    return {
        type: ''
    }
}

watch(() => tabs.value, () => {
    switch (tabs.value) {
        case '1':
            minixPagingListsApi.value = CufaMemberuser
            break
        case '2':
            minixPagingListsApi.value = WeifaMemberuser
            break
        case '3':
            minixPagingListsApi.value = GetMemberuser
            break
        default:
            minixPagingListsApi.value = CufaMemberuser
    }
    pagingListToggle()
})

</script>

<style lang="scss" scoped>
.page {
    width: 100vw;
    overflow-x: hidden;
    min-height: calc(100vh - var(--window-bottom));
    background: #F8F8F8;
    background-size: 100% auto;
}

.paihb_flex_0 {
    background: #fff;
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background-size: 100% auto !important;
}

.paihb_fd0_0_c1_c0 {
    font-size: 36rpx;
    font-weight: 700;
    color: #333333;
    line-height: 50rpx;
}

.paihb_fd0_0_c0_c0 {
    font-size: 36rpx;
    color: #333;
}

.paihb_fd0_0_c0 {
    width: 120rpx;
}

.paihb_fd0_0 {
    padding: 0rpx 32rpx 0rpx 32rpx;
}

.paihb_fd1_0_c2_c0 {
    background: #3090FF;
    border-radius: 44rpx 44rpx 44rpx 44rpx;
    width: 702rpx;
    line-height: 87rpx;
    font-size: 32rpx;
    color: #fff;
    height: 87rpx;
    font-weight: 400;
}

.paihb_fd1_0_c1_c3_c1 {
    border-bottom: 1px solid #eee;
    padding: 34rpx 0rpx 34rpx 0rpx;
}

.paihb_fd1_0_c1_c3_c0_c0 {
    color: #333333;
    font-size: 36rpx;
    font-weight: 700;
    text-align: left;
    font-style: normal;
    margin: 0rpx 24rpx 0rpx 0rpx;
}

.paihb_fd1_0_c1_c3 {
    padding: 0rpx 33rpx 0rpx 24rpx;
}

.paihb_fd1_0_c1_c2 {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 10%, #FFF1F1 100%);
    padding: 32rpx 33rpx 32rpx 24rpx;
    background-size: 100% auto;
}

.paihb_fd1_0_c1_c1 {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FDF1FF 100%);
    ;
    padding: 32rpx 33rpx 32rpx 24rpx;
    background-size: 100% auto;
}

.paihb_fd1_0_c1_c0_c1_c0_1 {
    color: rgba(1, 206, 161, 1);
    font-size: 32rpx;
    font-weight: 400;
    text-align: left;
    font-style: normal;
}

.paihb_fd1_0_c1_c0_c1_c0 {
    color: #FF4040;
    font-size: 32rpx;
    font-weight: 400;
    text-align: left;
    font-style: normal;
}

.paihb_fd1_0_c1_c0_c0_c1 {
    color: #333333;
    font-size: 32rpx;
    font-weight: 500;
    text-align: left;
    font-style: normal;
}

.paihb_fd1_0_c1_c0_c0_c0 {
    width: 104rpx;
    height: 62rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    margin: 0rpx 40rpx 0rpx 0rpx;
}

.paihb_fd1_0_c1_c0 {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 10%, #FFF1F1 100%);
    padding: 32rpx 33rpx 32rpx 24rpx;
    background-size: 100% auto;
}

.paihb_fd1_0_c1 {
    padding: 24rpx 24rpx 40rpx 24rpx;
}

.paihb_linefd1_0_c0_c0 {
    background: #3090FF;
    width: 40rpx;
    height: 6rpx;
    top: 80rpx;
    background-size: 100% auto !important;
    border-radius: 4rpx 4rpx 4rpx 4rpx;
}

.checkTitlefd1_0_c0_c0 {
    font-weight: 700 !important;
    font-size: 32rpx !important;
    color: #101010 !important;
    background-color: rgba(255, 255, 255, 1) !important;
}

::v-deep .paihb_benbenTabsfd1_0_c0_c0 {
    background: #fff;
    width: 750rpx;
    height: 90rpx;
    white-space: nowrap;
    text-align: center;
    font-size: 30rpx;
    font-weight: 400;
    font-style: normal;
    color: #81848F;
}

.fixed-box {
    bottom: 0;
    top: unset
}
</style>