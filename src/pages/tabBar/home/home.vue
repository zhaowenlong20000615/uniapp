<template>
    <page-body :loading="!countInfo">
        <movable-area style="height: 100vh;width: 100vw;">
            <movable-view class="publish_box" :x="109000" :y="500" direction="all" @tap.stop="handleJumpDiy"
                data-type="navigateTo" :data-url="`/pages/gdlb/faburizhi/faburizhi?tabs=${tabs}`">
                <image class='home_fd1_1' mode="aspectFit" :src='STATIC_URL + "35.png"'>
                </image>
            </movable-view>
            <view class="page">
                <view class="flex benben-position-layout flex flex-wrap align-center home_flex_0"
                    :style="{ height: (88 + StatusBarRpx) + 'rpx', paddingTop: StatusBarRpx + 'rpx', }">
                    <view class='flex flex-wrap align-center justify-between flex-sub home_fd0_0'>
                        <view class='flex flex-wrap align-center home_fd0_0_c0'>
                        </view>
                        <view class='flex flex-wrap align-stretch justify-center'>
                            <text class='home_fd0_0_c1_c0'>康海安全工程管理</text>
                        </view>
                        <view class='flex flex-wrap align-center justify-end home_fd0_0_c0'>
                        </view>
                    </view>

                </view>
                <view :style="{ height: (88 + StatusBarRpx) + 'rpx' }"></view>
                <!---flex布局flex布局开始-->
                <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout home_flex_1">
                    <view class='flex flex-direction flex-wrap align-stretch'>
                        <view class='flex flex-direction flex-wrap align-stretch home_fd1_0_c0'>
                            <DataStatistics v-if="countInfo" v-model:itemData="countInfo" />
                            <DataCard v-if="countInfo" v-model:itemData="countInfo" />
                        </view>
                        <view class='flex flex-direction flex-wrap align-stretch home_fd1_0_c1'>
                            <view>
                                <benben-flex-tabs class-name='home_benbenTabsfd1_0_c1_c0' v-model="tabs"
                                    ref="benben_tabsfd1_0_c1_c0" select-mark="benben_tabsfd1_0_c1_c0"
                                    key="benben_tabsfd1_0_c1_c0" :open-title-type='false' :open-sticky='true' :top='0'
                                    :is-show-content='false' :scrollspy='false' v-model:tabs-info="tabsInfofd1_0_c1_c0">

                                    <scroll-view @scroll="tabsInfofd1_0_c1_c0.scrollX = $event.detail.scrollLeft"
                                        id="benben_tabsfd1_0_c1_c0" class="benben-tabs" style="width:750rpx"
                                        :scroll-x="true" :scroll-left="tabsInfofd1_0_c1_c0.moveX"
                                        scroll-with-animation="all .3s ease">
                                        <view class="benben-tabs-content" id="benben_tabsfd1_0_c1_c0-content">
                                            <view id="benben_tabsfd1_0_c1_c0-title"
                                                class="benben-tabs-title flex align-center flex ">
                                                <view
                                                    :class="{ 'checkTitlefd1_0_c1_c0': tabs == '1', 'flex flex-wrap align-center home_titlefd1_0_c1_c0_c3': true }"
                                                    @tap="tabs = '1'; requestFun()"
                                                    :id="`benben_tabsfd1_0_c1_c0-title-item-${'1'}`">

                                                    <text style="white-space: nowrap;">管理协调</text>

                                                </view>
                                                <view
                                                    :class="{ 'checkTitlefd1_0_c1_c0': tabs == '2', 'flex flex-wrap align-center home_titlefd1_0_c1_c0_c4': true }"
                                                    @tap="tabs = '2'; requestFun();"
                                                    :id="`benben_tabsfd1_0_c1_c0-title-item-${'2'}`">

                                                    <text style="white-space: nowrap;">技术协调</text>

                                                </view>
                                                <view
                                                    :class="{ 'checkTitlefd1_0_c1_c0': tabs == '3', 'flex flex-wrap align-center home_titlefd1_0_c1_c0_c4': true }"
                                                    @tap="tabs = '3'; requestFun()"
                                                    :id="`benben_tabsfd1_0_c1_c0-title-item-${'3'}`">

                                                    <text style="white-space: nowrap;">返回不具备施工</text>

                                                </view>
                                                <view
                                                    :class="{ 'checkTitlefd1_0_c1_c0': tabs == '4', 'flex flex-wrap align-center home_titlefd1_0_c1_c0_c4': true }"
                                                    @tap="tabs = '4'; requestFun()"
                                                    :id="`benben_tabsfd1_0_c1_c0-title-item-${'4'}`">

                                                    <text style="white-space: nowrap;">小批量</text>

                                                </view>
                                            </view>
                                            <view
                                                :style="{ left: tabsInfofd1_0_c1_c0.lineleft, maxWidth: tabsInfofd1_0_c1_c0.lineWidth, }"
                                                id="benben_tabsfd1_0_c1_c0-line"
                                                class="benben-tabs-line flex benben-flex-tabs-line home_linefd1_0_c1_c0">
                                            </view>
                                        </view>
                                    </scroll-view>

                                </benben-flex-tabs>

                            </view>
                            <view class='flex flex-direction flex-wrap align-stretch'>
                                <view v-if="tabs == '1'">
                                    <view class='flex flex-direction flex-wrap align-stretch home_fd1_0_c1_c1_c0'
                                        v-for="item in listData" :key="item.aid">
                                        <view class='flex flex-wrap align-center home_fd1_0_c1_c1_c0_c0'>
                                            <text class='home_fd1_0_c1_c1_c0_c0_c0'>项目名称</text>
                                            <text
                                                class='home_fd1_0_c1_c1_c0_c0_c1'>{{ item.freeengineeringprojects_entry_name }}</text>
                                        </view>
                                        <view class='flex flex-wrap align-center home_fd1_0_c1_c1_c0_c1_c0_c0'>
                                            <text class='home_fd1_0_c1_c1_c0_c2_c0_c0'>系统名称</text>
                                            <text class='home_fd1_0_c1_c1_c0_c2_c0_c1'
                                                style="line-height: 0;">{{ item.freesystem_system_name }}</text>
                                        </view>
                                        <view
                                            class='flex flex-direction flex-wrap align-stretch home_fd1_0_c1_c1_c0_c1'>
                                            <view v-for="item1 in item.dianwei" :key="item1.aid"
                                                class='flex flex-direction flex-wrap align-stretch home_fd1_0_c1_c1_c0_c1_c0'>
                                                <view class='flex flex-wrap align-center home_fd1_0_c1_c1_c0_c1_c0_c0'>
                                                    <text class='home_fd1_0_c1_c1_c0_c1_c0_c0_c0'>点位名称</text>
                                                    <text
                                                        class='home_fd1_0_c1_c1_c0_c1_c0_c0_c1'>{{ item1.freesystempointlocation_system_point_location }}</text>
                                                </view>
                                                <view class='flex flex-wrap align-center'>
                                                    <text class='home_fd1_0_c1_c1_c0_c1_c0_c0_c0'>工序名称</text>
                                                    <text
                                                        class='home_fd1_0_c1_c1_c0_c1_c0_c0_c1'>{{ item1.freeprocesssteps_process_steps }}</text>
                                                </view>
                                            </view>

                                        </view>
                                        <view class='flex flex-direction flex-wrap align-stretch'>
                                            <view class='flex flex-wrap align-start home_fd1_0_c1_c1_c0_c1_c0_c0'>
                                                <text class='home_fd1_0_c1_c1_c0_c2_c0_c0'>协调内容</text>
                                                <text
                                                    class='home_fd1_0_c1_c1_c0_c2_c0_c1'>{{ item.coordination_content }}</text>
                                            </view>
                                            <view class='flex flex-wrap align-start home_fd1_0_c1_c1_c0_c1_c0_c0'>
                                                <text class='home_fd1_0_c1_c1_c0_c2_c0_c0'>协调结果</text>
                                                <text
                                                    class='home_fd1_0_c1_c1_c0_c2_c0_c1'>{{ item.coordination_results }}</text>
                                            </view>
                                            <view class='flex flex-direction flex-wrap align-stretch'>
                                                <view
                                                    class='flex flex-wrap align-center justify-between home_fd1_0_c1_c1_c0_c1_c0_c0'>
                                                    <view class='flex flex-wrap align-center'>
                                                        <text class='home_fd1_0_c1_c1_c0_c2_c2_c0_c0_c0'>协调人员</text>
                                                        <text
                                                            class='home_fd1_0_c1_c1_c0_c2_c2_c0_c0_c1'>{{ item.coordination_personnel_name }}</text>
                                                    </view>
                                                    <view class='flex flex-wrap align-center'>
                                                        <text class='home_fd1_0_c1_c1_c0_c2_c2_c0_c0_c0'>发布人</text>
                                                        <text
                                                            class='home_fd1_0_c1_c1_c0_c2_c2_c0_c0_c1'>{{ item.publisher_name }}</text>
                                                    </view>
                                                </view>
                                                <view class='flex flex-wrap align-center home_fd1_0_c1_c1_c0_c2_c2_c1'>
                                                    <view class='flex flex-wrap align-center'>
                                                        <text class='home_fd1_0_c1_c1_c0_c2_c2_c0_c0_c0'>发布时间</text>
                                                        <text
                                                            class='home_fd1_0_c1_c1_c0_c2_c2_c0_c0_c1'>{{ item.create_time }}</text>
                                                    </view>
                                                </view>
                                            </view>
                                        </view>
                                    </view>
                                </view>
                                <view v-if="tabs == '2'">
                                    <view class='flex flex-direction flex-wrap align-stretch home_fd1_0_c1_c1_c1'
                                        v-for="item in listData" :key="item.aid">
                                        <view class='flex flex-direction flex-wrap align-stretch'>
                                            <view class='flex flex-wrap align-start home_fd1_0_c1_c1_c0_c1_c0_c0'>
                                                <text class='home_fd1_0_c1_c1_c0_c2_c0_c0'>协调内容</text>
                                                <text
                                                    class='home_fd1_0_c1_c1_c0_c2_c0_c1'>{{ item.coordination_content }}</text>
                                            </view>
                                            <view class='flex flex-direction flex-wrap align-stretch'>
                                                <view
                                                    class='flex flex-wrap align-center justify-between home_fd1_0_c1_c1_c0_c1_c0_c0'>
                                                    <view class='flex flex-wrap align-center'>
                                                        <text class='home_fd1_0_c1_c1_c0_c2_c2_c0_c0_c0'>发布人</text>
                                                        <text
                                                            class='home_fd1_0_c1_c1_c0_c2_c2_c0_c0_c1'>{{ item.publisher_name }}</text>
                                                    </view>
                                                </view>
                                                <view class='flex flex-wrap align-center home_fd1_0_c1_c1_c0_c2_c2_c1'>
                                                    <view class='flex flex-wrap align-center'>
                                                        <text class='home_fd1_0_c1_c1_c0_c2_c2_c0_c0_c0'>发布时间</text>
                                                        <text
                                                            class='home_fd1_0_c1_c1_c0_c2_c2_c0_c0_c1'>{{ item.create_time }}</text>
                                                    </view>
                                                </view>
                                            </view>
                                        </view>
                                    </view>
                                </view>
                                <view v-if="tabs == '3'">
                                    <view v-for=" item in listData" :key="item.aid"
                                        class='flex flex-direction flex-wrap align-stretch home_fd1_0_c1_c1_c1'>
                                        <view class='flex flex-wrap align-center home_fd1_0_c1_c1_c0_c1_c0_c0'>
                                            <view class='flex flex-wrap align-center'>
                                                <text class='home_fd1_0_c1_c1_c0_c2_c2_c0_c0_c0'>项目名称</text>
                                                <text
                                                    class='home_fd1_0_c1_c1_c0_c2_c2_c0_c0_c1'>{{ item.freeengineeringprojects_entry_name }}</text>
                                            </view>
                                        </view>
                                        <view class='flex flex-wrap align-center home_fd1_0_c1_c1_c0_c1_c0_c0'>
                                            <view class='flex flex-wrap align-center'>
                                                <text class='home_fd1_0_c1_c1_c0_c2_c2_c0_c0_c0'>系统名称</text>
                                                <text
                                                    class='home_fd1_0_c1_c1_c0_c2_c2_c0_c0_c1'>{{ item.freesystem_system_name }}</text>
                                            </view>
                                        </view>
                                        <view class='flex flex-wrap align-center home_fd1_0_c1_c1_c0_c1_c0_c0'>
                                            <view class='flex flex-wrap align-center'>
                                                <text class='home_fd1_0_c1_c1_c0_c2_c2_c0_c0_c0'>点位名称</text>
                                                <text
                                                    class='home_fd1_0_c1_c1_c0_c2_c2_c0_c0_c1'>{{ item.freesystempointlocation_system_point_location }}</text>
                                            </view>
                                        </view>
                                        <view class='flex flex-wrap align-center home_fd1_0_c1_c1_c0_c1_c0_c0'>
                                            <view class='flex flex-wrap align-center'>
                                                <text class='home_fd1_0_c1_c1_c0_c2_c2_c0_c0_c0'>结果内容</text>
                                                <text
                                                    class='home_fd1_0_c1_c1_c0_c2_c2_c0_c0_c1'>{{ item.result_content }}</text>
                                            </view>
                                        </view>
                                        <view class='flex flex-wrap align-center home_fd1_0_c1_c1_c0_c1_c0_c0'>
                                            <view class='flex flex-wrap align-center'>
                                                <text class='home_fd1_0_c1_c1_c2_c3_c0_c0'>发布人</text>
                                                <text
                                                    class='home_fd1_0_c1_c1_c0_c2_c2_c0_c0_c1'>{{ item.publisher_name }}</text>
                                            </view>
                                        </view>
                                        <view class='flex flex-wrap align-center home_fd1_0_c1_c1_c0_c2_c2_c1'>
                                            <view class='flex flex-wrap align-center'>
                                                <text class='home_fd1_0_c1_c1_c0_c2_c2_c0_c0_c0'>发布时间</text>
                                                <text
                                                    class='home_fd1_0_c1_c1_c0_c2_c2_c0_c0_c1'>{{ item.create_time }}</text>
                                            </view>
                                        </view>
                                    </view>
                                </view>
                                <view v-if="tabs == '4'">
                                    <view class='flex flex-direction flex-wrap align-stretch home_fd1_0_c1_c1_c1'
                                        v-for="item in listData" :key="item.aid">
                                        <view class='flex flex-direction flex-wrap align-stretch'>
                                            <view class='flex flex-wrap align-start home_fd1_0_c1_c1_c0_c1_c0_c0'>
                                                <text class='home_fd1_0_c1_c1_c0_c2_c0_c0'>具体内容</text>
                                                <text class='home_fd1_0_c1_c1_c0_c2_c0_c1'>{{ item.content }}</text>
                                            </view>
                                            <view class='flex flex-direction flex-wrap align-stretch'>
                                                <view
                                                    class='flex flex-wrap align-center justify-between home_fd1_0_c1_c1_c0_c1_c0_c0'>
                                                    <view class='flex flex-wrap align-center'>
                                                        <text class='home_fd1_0_c1_c1_c0_c2_c2_c0_c0_c0'>发布人</text>
                                                        <text
                                                            class='home_fd1_0_c1_c1_c0_c2_c2_c0_c0_c1'>{{ item.publisher_name }}</text>
                                                    </view>
                                                </view>
                                                <view class='flex flex-wrap align-center home_fd1_0_c1_c1_c0_c2_c2_c1'>
                                                    <view class='flex flex-wrap align-center'>
                                                        <text class='home_fd1_0_c1_c1_c0_c2_c2_c0_c0_c0'>发布时间</text>
                                                        <text
                                                            class='home_fd1_0_c1_c1_c0_c2_c2_c0_c0_c1'>{{ item.create_time }}</text>
                                                    </view>
                                                </view>
                                            </view>
                                        </view>
                                    </view>
                                </view>
                                <fu-empty style="background-color: #F8F8F8;" :pagingListLoadedAll="pagingListLoadedAll"
                                    :pagingListNoListData="pagingListNoListData" :listDataLength="listDataLength"
                                    :isLoadInit="isLoadInit"></fu-empty>
                            </view>


                        </view>
                    </view>
                </view>
                <!---flex布局flex布局结束-->
            </view>
        </movable-area>

    </page-body>
</template>
<script setup lang="ts">
import { GetManagementassistancedaily, GetRwcc, GetSmalatchconstruction, GetTechnicalcoordinationdaily, TongjiProjectsystemworkorder } from '@/api/home';
import usePageMethod from '@/hooks/usePageMethod';
import { usePagingList } from '@/hooks/usePagingList';
import { onPullDownRefresh } from '@dcloudio/uni-app';
import { ref } from 'vue';
import DataCard from './c-cpns/data-card/index.vue';
import DataStatistics from './c-cpns/data-statistics/index.vue';

onPullDownRefresh(() => initFun())

const { StatusBarRpx, handleJumpDiy, STATIC_URL } = usePageMethod
const tabsInfofd1_0_c1_c0 = ref({ lineleft: '', lineWidth: '', moveX: 0, scrollX: 0, PageScrollX: 0 })
const tabs = ref('1')
const countInfo = ref()

const { listData, pagingListLoadedAll, pagingListNoListData, listDataLength, isLoadInit, pagingListToggle, setMinixPagingListsApi } = usePagingList({ minixPagingListsApi: GetManagementassistancedaily })

function requestFun() {
    switch (tabs.value) {
        case '1':
            setMinixPagingListsApi?.(GetManagementassistancedaily)
            break
        case '2':
            setMinixPagingListsApi?.(GetTechnicalcoordinationdaily)
            break
        case '3':
            setMinixPagingListsApi?.(GetRwcc)
            break
        case '4':
            setMinixPagingListsApi?.(GetSmalatchconstruction)
            break
        default:
            setMinixPagingListsApi?.(GetManagementassistancedaily)
    }
    pagingListToggle()
}

async function initFun() {
    const { data } = await TongjiProjectsystemworkorder()
    countInfo.value = data
}
initFun()

</script>

<style lang="scss" scoped>
.page {
    width: 100vw;
    overflow-x: hidden;
    min-height: calc(100vh - var(--window-bottom));
    background: url(image-path('20.png')) no-repeat;
    background-size: 100% auto;
}

.home_flex_0 {
    background: url(image-path('20.png')) no-repeat;
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background-size: 100% auto !important;
}

.home_fd0_0_c1_c0 {
    font-size: 36rpx;
    font-weight: 700;
    color: #FFFFFF;
    line-height: 48rpx;
    text-align: center;
    font-style: normal;
}

.home_fd0_0_c0 {
    width: 120rpx;
}

.home_fd0_0 {
    padding: 0rpx 32rpx 0rpx 32rpx;
}

.home_flex_1 {
    padding: 0rpx 0rpx 0rpx 0rpx;
    position: relative;
}

.home_fd1_1 {
    width: 96rpx;
    height: 96rpx;
    border-radius: 96rpx;
    /* position: fixed; */
    /* bottom: calc(178rpx + var(--window-bottom)); */
    /* right: 40rpx; */
}

.home_fd1_0_c1_c1_c2_c3_c0_c0 {
    color: #999999;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 48rpx;
    text-align: left;
    font-style: normal;
    margin: 0rpx 52rpx 0rpx 0rpx;
}

.home_fd1_0_c1_c1_c1 {
    border-bottom: 12px solid rgba(248, 248, 248, 1);
    padding: 36rpx 24rpx 0rpx 24rpx;
}

.home_fd1_0_c1_c1_c0_c2_c2_c1 {
    margin: 0rpx 0rpx 32rpx 0rpx;
}

.home_fd1_0_c1_c1_c0_c2_c2_c0_c0_c1 {
    color: #333333;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 48rpx;
    text-align: left;
    font-style: normal;
}

.home_fd1_0_c1_c1_c0_c2_c2_c0_c0_c0 {
    color: #999999;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 48rpx;
    text-align: left;
    font-style: normal;
    margin: 0rpx 24rpx 0rpx 0rpx;
}

.home_fd1_0_c1_c1_c0_c2_c0_c1 {
    color: #333333;
    font-size: 28rpx;
    font-weight: 400;
    text-align: left;
    font-style: normal;
    line-height: 48rpx;
}

.home_fd1_0_c1_c1_c0_c2_c0_c0 {
    color: #999999;
    font-size: 28rpx;
    font-weight: 400;
    text-align: left;
    font-style: normal;
    margin: 0rpx 24rpx 0rpx 0rpx;
}

.home_fd1_0_c1_c1_c0_c1_c0_c0_c1 {
    color: #101010;
    font-size: 28rpx;
    font-weight: 400;
    text-align: center;
    font-style: normal;
}

.home_fd1_0_c1_c1_c0_c1_c0_c0_c0 {
    color: #999999;
    font-size: 28rpx;
    font-weight: 400;
    text-align: center;
    font-style: normal;
    margin: 0rpx 30rpx 0rpx 0rpx;
}

.home_fd1_0_c1_c1_c0_c1_c0_c0 {
    margin: 0rpx 0rpx 24rpx 0rpx;
}

.home_fd1_0_c1_c1_c0_c1_c0 {
    background: #FFFFFF;
    margin: 0rpx 0rpx 24rpx 0rpx;
    border-radius: 12rpx 12rpx 12rpx 12rpx;
    padding: 24rpx;
}

.home_fd1_0_c1_c1_c0_c1 {
    background: #F8F8FA;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    padding: 32rpx 24rpx 0rpx 24rpx;
    margin: 0rpx 0rpx 24rpx 0rpx;
}

.home_fd1_0_c1_c1_c0_c0_c1 {
    color: #101010;
    font-size: 32rpx;
    font-weight: 700;
    line-height: 48rpx;
}

.home_fd1_0_c1_c1_c0_c0_c0 {
    color: #101010;
    font-size: 32rpx;
    font-weight: 700;
    line-height: 48rpx;
    margin: 0rpx 16rpx 0rpx 0rpx;
}

.home_fd1_0_c1_c1_c0_c0 {
    margin: 36rpx 0rpx 24rpx 0rpx;
}

.home_fd1_0_c1_c1_c0 {
    border-bottom: 12px solid rgba(248, 248, 248, 1);
    padding: 0rpx 24rpx 0rpx 24rpx;
}

.home_titlefd1_0_c1_c0_c4 {
    margin: 0rpx 48rpx 0rpx 0rpx;
}

.home_titlefd1_0_c1_c0_c3 {
    margin: 0rpx 48rpx 0rpx 40rpx;
}

.home_linefd1_0_c1_c0 {
    background: #3090FF;
    width: 40rpx;
    height: 6rpx;
    top: 80rpx;
    background-size: 100% auto !important;
    border-radius: 4rpx 4rpx 4rpx 4rpx;
}

.checkTitlefd1_0_c1_c0 {
    font-weight: 700 !important;
    font-size: 32rpx !important;
    color: #101010 !important;
    background-color: rgba(255, 255, 255, 1) !important;
}

::v-deep .home_benbenTabsfd1_0_c1_c0 {
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

.home_fd1_0_c1 {
    background: rgba(255, 255, 255, 1);
    background-size: 100% auto;
}


.home_fd1_0_c0_c0_c2_c1_c1_c0_c0 {
    background: rgba(231, 231, 231, 1);
    border-radius: 4rpx 4rpx 4rpx 4rpx;
    width: 22rpx;
    height: 22rpx;
}

.home_fd1_0_c0_c0_c2_c1_c1 {
    background: #F8F8FA;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    width: 274rpx;
    padding: 16rpx 0rpx 0rpx 20rpx;
}

.home_fd1_0_c0_c0_c2_c1_c0_c1_c0 {
    color: #101010;
    font-size: 38rpx;
    font-weight: 700;
    text-align: center;
    font-style: normal;
}

.home_fd1_0_c0_c0_c2_c1_c0_c1 {
    padding: 0rpx 0rpx 0rpx 34rpx;
    margin: 8rpx 0rpx 0rpx 0rpx;
}

.home_fd1_0_c0_c0_c2_c1_c0_c0_c1 {
    color: #333333;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 48rpx;
    text-align: center;
    font-style: normal;
    margin: 0rpx 0rpx 0rpx 12rpx;
}

.home_fd1_0_c0_c0_c2_c1_c0_c0_c0 {
    background: #3997FF;
    border-radius: 4rpx 4rpx 4rpx 4rpx;
    width: 22rpx;
    height: 22rpx;
}

.home_fd1_0_c0_c0_c2_c1_c0 {
    background: #F8F8FA;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    width: 274rpx;
    margin: 0rpx 0rpx 16rpx 0rpx;
    padding: 16rpx 0rpx 0rpx 20rpx;
}

.home_fd1_0_c0_c0_c2_c0 {
    width: 244rpx;
    height: 244rpx;
    position: relative;

    .chartsview {
        display: block;
    }
}

.home_fd1_0_c0_c0_c2 {
    padding: 0rpx 27rpx 0rpx 27rpx;
}

.home_fd1_0_c0_c0_c1_c2 {
    background: url(image-path('31.png')) no-repeat;
    width: 208rpx;
    background-size: 100% auto;
    padding: 20rpx;
}

.home_fd1_0_c0_c0_c1_c1 {
    background: url(image-path('30.png')) no-repeat;
    width: 208rpx;
    background-size: 100% auto;
    padding: 20rpx;
}

.home_fd1_0_c0_c0_c1_c0_c1 {
    color: #101010;
    font-size: 40rpx;
    font-weight: 700;
    line-height: 42rpx;
    text-align: left;
    font-style: normal;
}

.home_fd1_0_c0_c0_c1_c0_c0 {
    margin: 0rpx 0rpx 7rpx 0rpx;
    color: #6E767D;
    font-size: 26rpx;
    font-weight: 400;
    line-height: 48rpx;
}

.home_fd1_0_c0_c0_c1_c0 {
    background: url(image-path('29.png')) no-repeat;
    width: 208rpx;
    background-size: 100% auto;
    padding: 20rpx;
}

.home_fd1_0_c0_c0_c1 {
    margin: 24rpx 0rpx 40rpx 0rpx;
}

.home_fd1_0_c0_c0_c0 {
    color: #101010;
    font-size: 34rpx;
    font-weight: 700;
    line-height: 42rpx;
    text-align: left;
    font-style: normal;
}

.home_fd1_0_c0_c0 {
    background: #FFFFFF;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    padding: 32rpx 24rpx 40rpx 24rpx;
    margin: 24rpx 0rpx 24rpx 0rpx;
}

.home_fd1_0_c0 {
    padding: 0rpx 24rpx 0rpx 24rpx;
}

.publish_box {
    width: 100rpx;
    height: 100rpx;
    z-index: 99;
    position: fixed;


}
</style>