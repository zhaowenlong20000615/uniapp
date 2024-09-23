<template>
    <page-body>
        <view class="page">
            <view
                class="flex flex-direction flex-wrap align-stretch justify-center benben-position-layout flex system_flex_0"
                :style="{ height: (88 + StatusBarRpx) + 'rpx', paddingTop: StatusBarRpx + 'rpx', }">
                <view class='flex flex-wrap align-stretch justify-between system_fd0_0'>
                    <view class='flex flex-wrap align-center system_fd0_0_c0' @tap.stop="handleJumpDiy" data-type="back"
                        data-url="1">
                        <text class='fu-iconfont2  system_fd0_0_c0_c0'>&#xe794;</text>
                    </view>
                    <view class='flex flex-wrap align-center'>
                        <text class='system_fd0_0_c1_c0'>设置</text>
                    </view>
                    <view class='flex align-center justify-end system_fd0_0_c2'>
                    </view>
                </view>

            </view>
            <view :style="{ height: (88 + StatusBarRpx) + 'rpx' }"></view>
            <!---基本设置flex布局开始-->
            <view class="flex flex-direction flex-wrap align-stretch system_flex_1">
                <view class='flex flex-direction flex-wrap align-stretch system_fd1_0'>
                    <view class='flex flex-wrap align-center justify-between system_fd1_0_c0' @tap.stop="handleJumpDiy"
                        data-type="navigateTo" :data-url="`/pages/my/changePwd/changePwd`">
                        <text class='system_fd1_0_c0_c0'>修改密码</text>
                        <text class='fu-iconfont2  system_fd1_0_c0_c1'>&#xE7F2;</text>
                    </view>
                </view>
                <view class='flex flex-wrap align-center system_fd1_1'>
                </view>
                <view class='flex flex-direction flex-wrap align-stretch system_fd1_0'>
                    <view class='flex flex-wrap align-center justify-between system_fd1_0_c0' @tap.stop="handleJumpDiy"
                        data-type="navigateTo" :data-url="`/pages/my/changeBingDingPhone/changeBingDingPhone`">
                        <text class='system_fd1_0_c0_c0'>更换手机号</text>
                        <text class='fu-iconfont2  system_fd1_0_c0_c1'>&#xE7F2;</text>
                    </view>
                </view>
                <view class='flex flex-wrap align-center system_fd1_1'>
                </view>
                <view class='flex flex-direction flex-wrap align-stretch system_fd1_0'>
                    <view class='flex flex-wrap align-center system_fd1_4_c0' @tap.stop="popupShow1679541357000 = true">
                        <text class='system_fd1_0_c0_c0'>清除缓存</text>
                        <text class='system_fd1_4_c0_c1'>{{ appRubbishCacheSize }}</text>
                        <text class='fu-iconfont2  system_fd1_0_c0_c1'>&#xE7F2;</text>
                    </view>
                    <view class='flex flex-wrap align-center system_fd1_0_c0' @tap.stop="update.checkAppUpdate()">
                        <text class='system_fd1_0_c0_c0'>检查更新</text>
                        <text class='system_fd1_4_c0_c1'>{{ appVersion }}</text>
                        <text class='fu-iconfont2  system_fd1_0_c0_c1'>&#xE7F2;</text>
                    </view>
                </view>
            </view>

            <!---基本设置flex布局结束-->
            <benben-popup v-model="popupShow1650940432200" :mask="true" :mask-close-able="true" mode='center'>
                <!---退出登录flex布局开始-->
                <view class="flex flex-direction flex-wrap align-center system_flex_2"
                    @tap.stop="popupShow1650940432200 = true">
                    <text class='system_fd2_0'>提示</text>
                    <text class='system_fd2_1'>确定退出当前账号？</text>
                    <view class='flex align-center system_fd2_2'>
                        <button class='system_fd2_2_c0' @tap.stop="popupShow1650940432200 = false"
                            open-type="contact">取消</button>
                        <button class='system_fd2_2_c1' @tap.stop="logOutFunc()" open-type="contact">确定</button>
                    </view>
                </view>

                <!---退出登录flex布局结束-->

            </benben-popup>
            <view class="flex flex-wrap align-center justify-center benben-position-layout flex system_flex_3"
                @tap.stop="popupShow1650940432200 = true"
                :style="{ height: (110 + bottomSafeAreaRpx) + 'rpx', paddingBottom: bottomSafeAreaRpx + 'rpx', }">
                <button class='system_fd3_0'>退出登录</button>

            </view>
            <view :style="{ height: (110 + bottomSafeAreaRpx) + 'rpx' }"></view>
            <benben-popup v-model="popupShow1679541357000" :mask="true" :mask-close-able="true" mode='center'>
                <!---清除缓存flex布局开始-->
                <view class="flex flex-direction flex-wrap align-center system_flex_4"
                    @tap.stop="popupShow1679541357000 = true">
                    <text class='system_fd4_0'>提示</text>
                    <text class='system_fd4_1'>确定要清除本地缓存？</text>
                    <view class='flex align-center system_fd4_2'>
                        <button class='system_fd4_2_c0' @tap.stop="popupShow1679541357000 = false">取消</button>
                        <button class='system_fd4_2_c1' @tap.stop="cleanUpFunc()">确定</button>
                    </view>
                </view>

                <!---清除缓存flex布局结束-->

            </benben-popup>
            <app-update ref="update"></app-update>

        </view>
    </page-body>
</template>
<script setup lang="ts">
import usePageMethod from '@/hooks/usePageMethod';
import { useSystemStore } from '@/store/model/system';
import { useUserStore } from '@/store/model/user';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const systemStore = useSystemStore()
const userStore = useUserStore()
const popupShow1679541357000 = ref(false)
const popupShow1650940432200 = ref(false)
const update = ref()

const { appVersion, appRubbishCacheSize } = storeToRefs(systemStore)
const { StatusBarRpx, STATIC_URL, handleJumpDiy, bottomSafeAreaRpx } = usePageMethod

function logOutFunc() {
    userStore.logout()
}

function cleanUpFunc() {
    systemStore.appClearCache()
    popupShow1679541357000.value = false
}
</script>
<style lang="scss" scoped>
.page {
    width: 100vw;
    overflow-x: hidden;
    min-height: calc(100vh - var(--window-bottom));
    background: rgba(248, 248, 248, 1);
    background-size: 100% auto;
}

.system_flex_0 {
    border-bottom: 1px solid #eee;
    background: #fff;
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background-size: 100% auto !important;
}

.system_fd0_0_c2 {
    padding: 0rpx 0rpx 0rpx 0rpx;
    width: 100rpx;
}

.system_fd0_0_c1_c0 {
    font-size: 36rpx;
    font-weight: 500;
    color: var(--benbenFontColor0);
}

.system_fd0_0_c0_c0 {
    font-size: 36rpx;
    font-weight: 400;
    color: #333;
}

.system_fd0_0_c0 {
    width: 100rpx;
}

.system_fd0_0 {
    padding: 0rpx 32rpx 0rpx 32rpx;
    line-height: 88rpx;
}

.system_flex_1 {
    font-size: 32rpx;
    padding: 0rpx 0rpx 0rpx 0rpx;
}

.system_fd1_4_c0_c1 {
    font-size: 28rpx;
    color: rgba(102, 102, 102, 1);
    margin: 0rpx 24rpx 0rpx auto;
}

.system_fd1_4_c0 {
    border-bottom: 1px solid #eee;
    padding: 32rpx 0rpx 32rpx 0rpx;
}

.system_fd1_1 {
    background: rgba(248, 248, 248, 1);
    height: 20rpx;
    background-size: 100% auto !important;
}

.system_fd1_0_c0_c1 {
    font-size: 26rpx;
    color: rgba(191, 191, 191, 1);
}

.system_fd1_0_c0_c0 {
    font-size: 32rpx;
    color: var(--benbenFontColor0);
}

.system_fd1_0_c0 {
    padding: 32rpx 0rpx 32rpx 0rpx;
}

.system_fd1_0 {
    background: #fff;
    padding: 0rpx 32rpx 0rpx 32rpx;
    background-size: 100% auto !important;
}

.system_flex_2 {
    background: #fff;
    width: 540rpx;
    border-radius: 32rpx;
}

.system_fd2_2_c1 {
    border-top: 1px solid #eee;
    border-left: 1px solid #eee;
    background: #fff;
    line-height: 110rpx;
    border-radius: 0rpx 0rpx 16rpx 0rpx;
    font-size: 34rpx;
    color: rgba(48, 144, 255, 1);
    width: 268rpx;
}

.system_fd2_2_c0 {
    border-top: 1px solid #eee;
    background: #fff;
    line-height: 110rpx;
    border-radius: 0rpx 0rpx 0rpx 16rpx;
    font-size: 34rpx;
    color: rgba(153, 153, 153, 1);
    width: 268rpx;
}

.system_fd2_2 {
    margin: 37rpx 0rpx 0rpx 0rpx;
}

.system_fd2_1 {
    line-height: 44rpx;
    font-size: 32rpx;
    font-weight: 500;
    color: #333333;
}

.system_fd2_0 {
    font-size: 36rpx;
    font-weight: 800;
    line-height: 44rpx;
    color: #333333;
    margin: 40rpx 0rpx 32rpx 0rpx;
}

.system_flex_3 {
    background: #FFFFFF;
    width: 750rpx;
    height: 110rpx;
    overflow: hidden;
    z-index: 10;
    bottom: 0;
    bottom: calc(0rpx + var(--window-bottom));
    bottom: 0;
    background-size: 100% auto !important;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
}

.system_fd3_0 {
    border: 2px solid var(--benbenbdColor0);
    background: #FFFFFF;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    font-size: 32rpx;
    color: rgba(48, 144, 255, 1);
    width: 750rpx;
    height: 110rpx;
    line-height: 88rpx;
}

.system_flex_4 {
    background: #fff;
    width: 540rpx;
    border-radius: 32rpx;
}

.system_fd4_2_c1 {
    border-top: 1px solid #eee;
    border-left: 1px solid #eee;
    background: #fff;
    line-height: 110rpx;
    border-radius: 0rpx 0rpx 16rpx 0rpx;
    font-size: 34rpx;
    color: rgba(48, 144, 255, 1);
    width: 268rpx;
}

.system_fd4_2_c0 {
    border-top: 1px solid #eee;
    background: #fff;
    line-height: 110rpx;
    border-radius: 0rpx 0rpx 0rpx 16rpx;
    font-size: 34rpx;
    color: rgba(153, 153, 153, 1);
    /* padding: 0rpx 103rpx 0rpx 103rpx; */
    width: 268rpx;
}

.system_fd4_2 {
    margin: 37rpx 0rpx 0rpx 0rpx;
}

.system_fd4_1 {
    line-height: 44rpx;
    font-size: 32rpx;
    font-weight: 500;
    color: #333333;
}

.system_fd4_0 {
    font-size: 36rpx;
    font-weight: 800;
    line-height: 44rpx;
    color: #333333;
    margin: 40rpx 0rpx 32rpx 0rpx;
}
</style>