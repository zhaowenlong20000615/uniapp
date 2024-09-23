<template>
    <page-body>
        <view class="page">
            <view class="flex align-stretch benben-position-layout flex agreements_flex_0"
                :style="{ height: (88 + StatusBarRpx) + 'rpx', paddingTop: StatusBarRpx + 'rpx', }">
                <view class='flex align-center justify-between flex-sub agreements_fd0_0'>
                    <view class='flex align-center agreements_fd0_0_c0' @tap.stop="handleJumpDiy" data-type="back"
                        data-url="1">
                        <text class='fu-iconfont2  agreements_fd0_0_c0_c0'>&#xE794;</text>
                    </view>
                    <view class='flex align-center'>
                        <text class='agreements_fd0_0_c1_c0'>{{ dataMessage.name }}</text>
                    </view>
                    <view class='flex align-center agreements_fd0_0_c0'>
                    </view>
                </view>

            </view>
            <view :style="{ height: (88 + StatusBarRpx) + 'rpx' }"></view>
            <view class="ben_fu-jyf-parser_1">
                <mp-html :content="dataMessage.content | richTextFormat" />
            </view>


        </view>
    </page-body>
</template>
<script>

export default {
    components: {},


    data() {
        return { "dataMessage": { "aid": "", "name": "", "thumb_img": "", "content": "", "introduce": "" } };
    },
    computed: {

    },
    watch: {},
    onLoad(options) {
        this.queryEssayFunc()
    },
    onUnload() {

    },
    onReady() {

    },
    onShow() {

    },
    onHide() {

    },
    onResize() {

    },
    onPullDownRefresh() {

    },
    onReachBottom(e) {

    },
    onPageScroll(e) {

    },
    methods: {
        //系统文章--获取系统单页内容
        async queryEssayFunc() {
            //请求方法
            //数据验证

            let datadataMessage = await this.$api.get(global.apiUrls.post641568f1b6f87, {
                column_id: '1'
            });

            if (datadataMessage.data.code != 1) {
                this.$message.info(datadataMessage.data.msg);
                return
            }
            let infodataMessage = datadataMessage.data;
            this.dataMessage = infodataMessage.data

        }
    }
};
</script>
<style lang="scss" scoped>
.page {
    width: 100vw;
    overflow-x: hidden;
    min-height: calc(100vh - var(--window-bottom));
    background: #fff;
    background-size: 100% auto;
}

.agreements_flex_0 {
    border-bottom: 1px solid #eee;
    background: #fff;
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background-size: 100% auto !important;
}

.agreements_fd0_0_c1_c0 {
    font-size: 36rpx;
    font-weight: 500;
    color: #333333;
    text-align: center;
    font-style: normal;
}

.agreements_fd0_0_c0_c0 {
    font-size: 32rpx;
    font-weight: 500;
    color: #333;
}

.agreements_fd0_0_c0 {
    width: 180rpx;
}

.agreements_fd0_0 {
    padding: 0rpx 32rpx 0rpx 32rpx;
    line-height: 88rpx;
}

.ben_fu-jyf-parser_1 {
    background-color: #fff;
    padding-left: 32rpx;
    padding-right: 32rpx;
    padding-top: 32rpx;
    padding-bottom: 32rpx;

}
</style>