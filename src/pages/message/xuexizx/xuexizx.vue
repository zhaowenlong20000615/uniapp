<template>
    <page-body >
        <view class="page" >
    <view class="flex benben-position-layout flex flex-wrap align-center xuexizx_flex_0"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-center justify-between flex-sub xuexizx_fd0_0'      >
            <view   class='flex flex-wrap align-center xuexizx_fd0_0_c0'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  xuexizx_fd0_0_c0_c0'    >&#xE794;</text>
</view>
    <view   class='flex flex-wrap align-stretch justify-center'      >
        <text class='xuexizx_fd0_0_c1_c0'  >学习消息</text>
</view>
    <view   class='flex flex-wrap align-center justify-end xuexizx_fd0_0_c0'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---flex布局flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout xuexizx_flex_1"    >
            <view   class='flex flex-wrap align-center xuexizx_fd1_0'      >
        <text class='xuexizx_fd1_0_c0'  >您有新的学习内容请前往个人中心查看并学习</text>
</view>
</view>
        
<!---flex布局flex布局结束-->
    
    
        </view>
    </page-body>
</template>
<script>
    
    
    export default {
        components:{},
        
        
        data(){
			return {};
		},
		computed:{
            
		},
		watch:{},
		onLoad(options){
            
		},
        onUnload() {
                
        },
		onReady(){
            
		},
		onShow(){
            
		},
		onHide(){
            
		},
		onResize(){
            
		},
		onPullDownRefresh(){
            
		},
		onReachBottom(e){
            
		},
		onPageScroll(e){
            
		},
		methods:{
            
		}
    };
</script> 
<style lang="scss" scoped>
           .page{
            width: 100vw;
            overflow-x: hidden;
            min-height: calc(100vh - var(--window-bottom));
            background:#F8F8F8;background-size: 100% auto;
        }
    .xuexizx_flex_0{
        background:#fff;width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background-size:100% auto !important;
    }
    .xuexizx_fd0_0_c1_c0{
        font-size:36rpx;font-weight:700;color:#333333;line-height:50rpx;
    }
    .xuexizx_fd0_0_c0_c0{
        font-size:36rpx;color:#333;
    }
    .xuexizx_fd0_0_c0{
        width:120rpx;
    }
    .xuexizx_fd0_0{
        padding:0rpx 32rpx 0rpx 32rpx;
    }
    .xuexizx_flex_1{
        padding:24rpx 24rpx 0rpx 24rpx;
    }
    .xuexizx_fd1_0_c0{
        color:#333333;font-size:28rpx;font-weight:400;text-align:left;font-style:normal;
    }
    .xuexizx_fd1_0{
        background:#FFFFFF;border-radius:16rpx 16rpx 16rpx 16rpx;width:702rpx;height:104rpx;padding:32rpx 0rpx 32rpx 24rpx;
    }
</style>