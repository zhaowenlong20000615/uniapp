<template>
    <page-body>
        <view class="page">
            <view class="flex align-stretch benben-position-layout flex orderMessages_flex_0"
                :style="{ height: (88 + StatusBarRpx) + 'rpx', paddingTop: StatusBarRpx + 'rpx', }">
                <view class='flex align-center justify-between flex-sub orderMessages_fd0_0'>
                    <view class='flex align-center orderMessages_fd0_0_c0' @tap.stop="handleJumpDiy" data-type="back"
                        data-url="1">
                        <text class='fu-iconfont2  orderMessages_fd0_0_c0_c0'>&#xE794;</text>
                    </view>
                    <view class='flex align-center'>
                        <text class='orderMessages_fd0_0_c1_c0'>平台消息</text>
                    </view>
                    <view class='flex align-center orderMessages_fd0_0_c0'>
                    </view>
                </view>

            </view>
            <view :style="{ height: (88 + StatusBarRpx) + 'rpx' }"></view>
            <!---订单消息flex布局开始-->
            <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout">
                <view class='flex flex-wrap align-center'>
                    <view>
                        <benben-flex-tabs class-name='orderMessages_benbenTabsfd1_0_c0' v-model="tabs"
                            ref="benben_tabsfd1_0_c0" select-mark="benben_tabsfd1_0_c0" key="benben_tabsfd1_0_c0"
                            :open-title-type='false' :open-sticky='true' :top='0' :is-show-content='false'
                            :scrollspy='false' v-model:tabs-info="tabsInfofd1_0_c0">

                            <scroll-view @scroll="tabsInfofd1_0_c0.scrollX = $event.detail.scrollLeft"
                                id="benben_tabsfd1_0_c0" class="benben-tabs" style="width:750rpx" :scroll-x="true"
                                :scroll-left="tabsInfofd1_0_c0.moveX" scroll-with-animation="all .3s ease">
                                <view class="benben-tabs-content" id="benben_tabsfd1_0_c0-content">
                                    <view id="benben_tabsfd1_0_c0-title"
                                        class="benben-tabs-title flex flex align-center justify-around">
                                        <view
                                            :class="{ 'checkTitlefd1_0_c0': tabs == '1', 'flex flex-wrap align-center orderMessages_titlefd1_0_c0_c3': true }"
                                            @tap="tabs = '1'" :id="`benben_tabsfd1_0_c0-title-item-${'1'}`">

                                            <text>制度违反</text>



                                            <benben-message-num class='orderMessages_titleItemfd1_0_c0_c3_c1' size='24'
                                                color='#fff' background-color='red'>
                                            </benben-message-num>

                                        </view>
                                        <view
                                            :class="{ 'checkTitlefd1_0_c0': tabs == '2', 'flex flex-wrap align-center orderMessages_titlefd1_0_c0_c3': true }"
                                            @tap="tabs = '2'" :id="`benben_tabsfd1_0_c0-title-item-${'2'}`">

                                            <text>学习消息</text>

                                            <benben-message-num class='orderMessages_titleItemfd1_0_c0_c3_c1' size='24'
                                                color='#fff' background-color='red'>
                                            </benben-message-num>

                                        </view>
                                        <view
                                            :class="{ 'checkTitlefd1_0_c0': tabs == '3', 'flex flex-wrap align-center orderMessages_titlefd1_0_c0_c3': true }"
                                            @tap="tabs = '3'" :id="`benben_tabsfd1_0_c0-title-item-${'3'}`">

                                            <text>任务消息</text>

                                            <benben-message-num class='orderMessages_titleItemfd1_0_c0_c3_c1' size='24'
                                                color='#fff' background-color='red'>
                                            </benben-message-num>

                                        </view>
                                    </view>
                                    <view
                                        :style="{ left: tabsInfofd1_0_c0.lineleft, maxWidth: tabsInfofd1_0_c0.lineWidth, }"
                                        id="benben_tabsfd1_0_c0-line"
                                        class="benben-tabs-line flex benben-flex-tabs-line orderMessages_linefd1_0_c0">
                                    </view>
                                </view>
                            </scroll-view>

                        </benben-flex-tabs>

                    </view>
                </view>
                <template v-for='(item, key0) in listData' :key="item.aid">
                    <view class='flex flex-direction flex-wrap align-stretch orderMessages_fd1_1'
                        @tap.stop="navigatorHandle(item)" data-type="navigateTo"
                        :data-url="`/pages/message/newDetail/newDetail?aid=${item.aid}&tabs=${tabs}`">
                        <view class='flex flex-wrap align-center justify-between orderMessages_fd1_1_c0'>
                            <text
                                class='orderMessages_fd1_1_c0_c0'>{{ item.freelistofinstitutions_institutional_regulations || item.freelearningandtraininglist_title || item.type_name }}</text>
                            <text class='orderMessages_fd1_1_c0_c1'>{{ item.create_time }}</text>
                        </view>
                        <view class='flex flex-wrap align-center'>
                            <text class='orderMessages_fd1_1_c1_c0'>{{ item.content }}</text>
                        </view>
                    </view>
                </template>
                <fu-empty :pagingListLoadedAll="pagingListLoadedAll" :pagingListNoListData="pagingListNoListData"
                    :listDataLength="listDataLength" :isLoadInit="isLoadInit"></fu-empty>

            </view>

            <!---订单消息flex布局结束-->


        </view>
    </page-body>
</template>
<script setup lang="ts">
import { GetLatpr, GetSystempushrecords, GetTaskmessage } from '@/api/message';
import usePageMethod from '@/hooks/usePageMethod';
import { usePagingList } from '@/hooks/usePagingList';
import { ref, watch } from 'vue';

const { StatusBarRpx, handleJumpDiy } = usePageMethod
const tabsInfofd1_0_c0 = ref({ lineleft: '', lineWidth: '', moveX: 0, scrollX: 0, PageScrollX: 0 })
const tabs = ref('1')
const minixPagingListsApi = ref(GetSystempushrecords)
const { listData, pagingListLoadedAll, pagingListNoListData, listDataLength, isLoadInit, pagingListToggle } = usePagingList({ minixPagingListsApi, pagingListPostData })

function pagingListPostData() {
    return {
        type: ''
    }
}

watch(() => tabs.value, () => {
    switch (tabs.value) {
        case '1':
            minixPagingListsApi.value = GetSystempushrecords
            break
        case '2':
            minixPagingListsApi.value = GetLatpr
            break
        case '3':
            minixPagingListsApi.value = GetTaskmessage
            break
        default:
            minixPagingListsApi.value = GetSystempushrecords
    }
    pagingListToggle()
})

function navigatorHandle(item: any) {
    if (tabs.value === '3') {
        switch (item.type) {
            case '1':
                uni.navigateTo({ url: `/pages/gdlb/xtbzfp/xtbzfp?aid=${item.aid}` })
                break
            case '2':
                uni.navigateTo({ url: `/pages/gdlb/dingdanxq/dingdanxq?aid=${item.aid}` })
                break
            default:
        }
    } else {
        uni.navigateTo({ url: `/pages/message/newDetail/newDetail?aid=${item.aid}&tabs=${tabs.value}` })
    }
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

.orderMessages_flex_0 {
    background: #fff;
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background-size: 100% auto !important;
}

.orderMessages_fd0_0_c1_c0 {
    font-size: 36rpx;
    font-weight: 700;
    color: #101010;
    text-align: center;
    font-style: normal;
}

.orderMessages_fd0_0_c0_c0 {
    font-size: 32rpx;
    font-weight: 500;
    color: #333;
}

.orderMessages_fd0_0_c0 {
    width: 180rpx;
}

.orderMessages_fd0_0 {
    padding: 0rpx 32rpx 0rpx 32rpx;
    line-height: 88rpx;
}

.orderMessages_fd1_1_c1_c0 {
    font-size: 28rpx;
    font-weight: 400;
    color: #666666;
    line-height: 46rpx;
    text-align: left;
    font-style: normal;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}

.orderMessages_fd1_1_c0_c1 {
    font-size: 24rpx;
    font-weight: 400;
    color: #999999;
    line-height: 56rpx;
    text-align: right;
    font-style: normal;
}

.orderMessages_fd1_1_c0_c0 {
    font-size: 34rpx;
    font-weight: 500;
    color: #333333;
    text-align: left;
    font-style: normal;
    line-height: 56rpx;
}

.orderMessages_fd1_1_c0 {
    margin: 24rpx 0rpx 24rpx 0rpx;
}

.orderMessages_fd1_1 {
    background: #fff;
    background-size: 100% auto !important;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    padding: 0rpx 24rpx 32rpx 24rpx;
    margin: 24rpx 24rpx 0rpx 24rpx;
}

.orderMessages_titleItemfd1_0_c0_c3_c1 {
    position: absolute;
    right: -15rpx;
    top: -15rpx;
}

.orderMessages_titlefd1_0_c0_c3 {
    position: relative;
}

.orderMessages_linefd1_0_c0 {
    background: #3090FF;
    width: 40rpx;
    height: 6rpx;
    top: 80rpx;
    background-size: 100% auto !important;
    border-radius: 4rpx 4rpx 4rpx 4rpx;
}

.checkTitlefd1_0_c0 {
    font-weight: 700 !important;
    font-size: 32rpx !important;
    color: #101010 !important;
    background-color: rgba(255, 255, 255, 1) !important;
}

::v-deep .orderMessages_benbenTabsfd1_0_c0 {
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
</style>