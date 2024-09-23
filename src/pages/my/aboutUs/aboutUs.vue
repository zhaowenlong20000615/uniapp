<template>
    <page-body >
        <view class="page" >
    <view class="flex flex-direction flex-wrap align-stretch justify-center benben-position-layout flex aboutUs_flex_0"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-stretch justify-between aboutUs_fd0_0'      >
            <view   class='flex flex-wrap align-center aboutUs_fd0_0_c0'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  aboutUs_fd0_0_c0_c0'  >&#xe794;</text>
</view>
    <view   class='flex flex-wrap align-center'      >
        <text class='aboutUs_fd0_0_c1_c0'  >关于我们</text>
</view>
    <view   class='flex align-center justify-end aboutUs_fd0_0_c2'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---版本flex布局开始-->
 <view class="flex flex-direction flex-wrap align-center"    >
        <image class='aboutUs_fd1_0'  mode="aspectFit"  :src='STATIC_URL+"1.png"'></image>
    <view   class='flex flex-wrap align-center aboutUs_fd1_1'      >
        <text class='aboutUs_fd1_1_c0'  >{{appVersion}}</text>
</view>
<text class='aboutUs_fd1_2'  >{{systemsInfo}}</text>
<text class='aboutUs_fd1_3'  >{{systemsInfo}}</text>
</view>
        
<!---版本flex布局结束-->
    
    
        </view>
    </page-body>
</template>
<script>
    import {validate} from '@/utils/validate'
    
    export default {
        components:{},
        
        
        data(){
			return {"isShowLoading":false,"systemsInfo":""};
		},
		computed:{
                          appVersion() {
      // 获取版本号
      return this.$store.state.appVersion
    }
		},
		watch:{},
		onLoad(options){
            this.getBaseFunc()
		},
        onUnload() {
                
        },
		onReady(){
            
		},
		onShow(){
                        this.$store.dispatch('getAppVersion') // 更新版本号
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
                            //获取底部文字
                 getBaseFunc(){
                    this.isShowLoading = true;
        this.$api.post(global.apiUrls.post64534cbb2c352, {
          code: 'web_site_copyright',
        }).then(res => {
          this.isShowLoading = false;
          if (res.data.code == 1) {
            this.systemsInfo = res.data.data;
          }
        }).catch(err => {
          this.isShowLoading = false;
        });
        
       
        
         
                },
                //获取底部文字
                async getMessageFunc(){
                        //请求方法
    //数据验证
    
  let data64534cbb2c352 = await this.$api.get(global.apiUrls.post64534cbb2c352, {
    code:'web_site_copyright'
  });
  
  if (data64534cbb2c352.data.code != 1) {
    this.$message.info(data64534cbb2c352.data.msg);
    return
  } 
  let info64534cbb2c352 = data64534cbb2c352.data;
  
  
                }
		}
    };
</script> 
<style lang="scss" scoped>
           .page{
            width: 100vw;
            overflow-x: hidden;
            min-height: calc(100vh - var(--window-bottom));
            background:#fff;background-size: 100% auto;
        }
    .aboutUs_flex_0{
        border-bottom:1px solid #eee;background:#fff;width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background-size:100% auto !important;
    }
    .aboutUs_fd0_0_c2{
        padding:0rpx 0rpx 0rpx 0rpx;width:100rpx;
    }
    .aboutUs_fd0_0_c1_c0{
        font-size:36rpx;font-weight:500;color:var(--benbenFontColor0);line-height:50rpx;
    }
    .aboutUs_fd0_0_c0_c0{
        font-size:36rpx;font-weight:400;color:#333;
    }
    .aboutUs_fd0_0_c0{
        width:100rpx;
    }
    .aboutUs_fd0_0{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
    }
    .aboutUs_fd1_3{
        color:#999999;font-size:24rpx;font-weight:400;position:fixed;bottom:calc(56rpx + var(--window-bottom));text-align:center;font-style:normal;
    }
    .aboutUs_fd1_2{
        color:#999999;font-size:24rpx;font-weight:400;position:fixed;bottom:calc(105rpx + var(--window-bottom));text-align:center;font-style:normal;
    }
    .aboutUs_fd1_1_c0{
        font-weight:400;color:#333333;font-size:28rpx;margin:0rpx 0rpx 0rpx 0rpx;text-align:left;font-style:normal;
    }
    .aboutUs_fd1_1{
        margin:30rpx 0rpx 0rpx 0rpx;
    }
    .aboutUs_fd1_0{
        width:180rpx;height:180rpx;border-radius:36rpx 36rpx 36rpx 36rpx;margin:80rpx 0rpx 0rpx 0rpx;
    }
</style>