<script setup lang="ts">
import { onHide, onLaunch, onShow } from "@dcloudio/uni-app";
import { useSystemStore } from "./store/model/system";

const sysStore = useSystemStore()

onLaunch(() => {
  console.log("App Launch");
  sysStore.initApp()
})
onShow(() => {
  console.log("App Show");
})

onHide(() => {
  console.log("App Hide")
})
</script>
<style lang="scss">
/* #ifndef APP-PLUS-NVUE */
@import './style/icon.css';
@import './style/main.css';
@import './style/animation.css';
@import './style/iconfont.css';
@import './style/common.scss';
@import './style/diyStyle.scss';
/* #endif */
</style>
