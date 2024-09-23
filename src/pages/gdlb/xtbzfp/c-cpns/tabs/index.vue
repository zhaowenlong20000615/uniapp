<template>
    <view class='flex flex-wrap align-center'>
        <view>
            <benben-flex-tabs class-name='xtbzfp_benbenTabsfd1_0_c1_c0' v-model="tabs" ref="benben_tabsfd1_0_c1_c0"
                select-mark="benben_tabsfd1_0_c1_c0" key="benben_tabsfd1_0_c1_c0" :open-title-type='false'
                :open-sticky='true' :top='0' :is-show-content='false' :scrollspy='false'
                v-model:tabs-info="tabsInfofd1_0_c1_c0">

                <scroll-view @scroll="tabsInfofd1_0_c1_c0.scrollX = $event.detail.scrollLeft"
                    id="benben_tabsfd1_0_c1_c0" class="benben-tabs" style="width:750rpx" :scroll-x="true"
                    :scroll-left="tabsInfofd1_0_c1_c0.moveX" scroll-with-animation="all .3s ease">
                    <view class="benben-tabs-content" id="benben_tabsfd1_0_c1_c0-content">
                        <view id="benben_tabsfd1_0_c1_c0-title" class="benben-tabs-title flex align-center flex ">
                            <view
                                :class="{ 'checkTitlefd1_0_c1_c0': tabs == '0', 'flex flex-wrap align-center xtbzfp_titlefd1_0_c1_c0_c3': true }"
                                @tap="tabsClick('0')" :id="`benben_tabsfd1_0_c1_c0-title-item-${'0'}`">

                                <text>全部</text>

                            </view>
                            <view
                                :class="{ 'checkTitlefd1_0_c1_c0': tabs == '1', 'flex flex-wrap align-center xtbzfp_titlefd1_0_c1_c0_c4': true }"
                                @tap="tabsClick('1')" :id="`benben_tabsfd1_0_c1_c0-title-item-${'1'}`">

                                <text>未分配</text>

                            </view>
                            <view
                                :class="{ 'checkTitlefd1_0_c1_c0': tabs == '2', 'flex flex-wrap align-center xtbzfp_titlefd1_0_c1_c0_c4': true }"
                                @tap="tabsClick('2')" :id="`benben_tabsfd1_0_c1_c0-title-item-${'2'}`">

                                <text>待确认</text>

                            </view>
                            <view
                                :class="{ 'checkTitlefd1_0_c1_c0': tabs == '3', 'flex flex-wrap align-center xtbzfp_titlefd1_0_c1_c0_c4': true }"
                                @tap="tabsClick('3')" :id="`benben_tabsfd1_0_c1_c0-title-item-${'3'}`">

                                <text>进行中</text>

                            </view>
                            <view
                                :class="{ 'checkTitlefd1_0_c1_c0': tabs == '4', 'flex flex-wrap align-center xtbzfp_titlefd1_0_c1_c0_c4': true }"
                                @tap="tabsClick('4')" :id="`benben_tabsfd1_0_c1_c0-title-item-${'4'}`">

                                <text>待审核</text>

                            </view>
                            <view
                                :class="{ 'checkTitlefd1_0_c1_c0': tabs == '5', 'flex flex-wrap align-center xtbzfp_titlefd1_0_c1_c0_c4': true }"
                                @tap="tabsClick('5')" :id="`benben_tabsfd1_0_c1_c0-title-item-${'5'}`">

                                <text>返工中</text>

                            </view>
                            <view
                                :class="{ 'checkTitlefd1_0_c1_c0': tabs == '6', 'flex flex-wrap align-center xtbzfp_titlefd1_0_c1_c0_c4': true }"
                                @tap="tabsClick('6')" :id="`benben_tabsfd1_0_c1_c0-title-item-${'6'}`">

                                <text>处罚中</text>

                            </view>

                            <view
                                :class="{ 'checkTitlefd1_0_c1_c0': tabs == '7', 'flex flex-wrap align-center xtbzfp_titlefd1_0_c1_c0_c4': true }"
                                @tap="tabsClick('7')" :id="`benben_tabsfd1_0_c1_c0-title-item-${'7'}`">

                                <text>已完成</text>

                            </view>
                        </view>
                        <view :style="{ left: tabsInfofd1_0_c1_c0.lineleft, maxWidth: tabsInfofd1_0_c1_c0.lineWidth, }"
                            id="benben_tabsfd1_0_c1_c0-line"
                            class="benben-tabs-line flex benben-flex-tabs-line xtbzfp_linefd1_0_c1_c0">
                        </view>
                    </view>
                </scroll-view>

            </benben-flex-tabs>

        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface IProps {
    modelValue: string
}
interface IEmits {
    (e: 'update:modelValue', value: string): void
    (e: 'change'): void
}

defineProps<IProps>()
const emits = defineEmits<IEmits>()

const tabs = ref('0')
const tabsInfofd1_0_c1_c0 = ref({ lineleft: '', lineWidth: '', moveX: 0, scrollX: 0, PageScrollX: 0 })

function tabsClick(index: string) {
    tabs.value = index
    emits('update:modelValue', index)
    emits('change')
}

</script>

<style scoped lang="scss">
::v-deep .xtbzfp_benbenTabsfd1_0_c1_c0 {
    width: 750rpx;
    height: 90rpx;
    white-space: nowrap;
    text-align: center;
    font-size: 30rpx;
    font-weight: 400;
    font-style: normal;
    color: #81848F;
}

.xtbzfp_titlefd1_0_c1_c0_c4 {
    margin: 0rpx 50rpx 0rpx 0rpx;

    >uni-text {
        white-space: nowrap;
    }
}

.xtbzfp_titlefd1_0_c1_c0_c3 {
    margin: 0rpx 50rpx 0rpx 24rpx;

    >uni-text {
        white-space: nowrap;
    }
}

.checkTitlefd1_0_c1_c0 {
    font-weight: 700 !important;
    font-size: 32rpx !important;
    color: #101010 !important;
    background-color: #FBFAF6 !important;
}

.xtbzfp_linefd1_0_c1_c0 {
    background: #3090FF;
    width: 40rpx;
    height: 6rpx;
    top: 80rpx;
    background-size: 100% auto !important;
    border-radius: 4rpx 4rpx 4rpx 4rpx;
}
</style>