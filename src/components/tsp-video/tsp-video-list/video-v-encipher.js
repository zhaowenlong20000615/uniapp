/*
 lodData 上拉加载回调
 refreshData 下拉加载回调
 */
export default {
  props: {
    isTabbar: {
      type: Boolean,
      default: false,
    },
    /* 是否开启下拉刷新 */
    loadOpen: {
      type: Boolean,
      default: true
    },
    /* tabBar栏 0系统tabBar栏 1自定义tabBar栏 */
    tabBarShow: {
      type: Number,
      default: 0
    },
    /* 自定义底部栏的高度 */
    tabBarHeight: {
      type: Number,
      default: 50
    },
    /* 进度条离底部的距离 px*/
    speedBottom: {
      type: Number,
      default: 0
    },
    /* 初始加载完成是否自动播放 */
    autoplay: {
      type: Boolean,
      default: true
    },
    /* 是否循环播放 */
    loopPlay: {
      type: Boolean,
      default: true
    },
    /* 是否开启自动播放 */
    nextPlay: {
      type: Boolean,
      default: false
    },
    /* 视频总数量，有值才能滑动加载到最后一个视频 */
    totalvod: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      videoStyle: {},
      screenWidth: 0, //屏幕的宽度
      screenHeight: 0, //屏幕的高度
      videoCtx: null,
      vodIndex: 0, // 当前视频下标
      vodCurIndex: 0, //当前播放视频对象下标
      currentIndex: 0, //定位播放的下标
      contentShow: false,
      loadShow: false,
      autoplayVideo: true, // 初始加载完成是否自动播放
      //当前播放的视频数组
      vodList: [
        /* {
          vodUrl:"https://outin-9cc4a7aedd2a11eaabb800163e1a65b6.oss-cn-shanghai.aliyuncs.com/customerTrans/43121ec9955a1ce95146d379f15ea9bd/566eafe2-17b52f0f17b-0007-0f29-cc2-eb217.mp4",
          coverImg:'../image/cover1.jpg', //视频封面
          coverShow:false, //是否显示视频封面，vue 小程序端不播放会显示视频，可以不用显示封面，App不播放不会显示视频，就需要封面了
          vodPaly:true, //是否播放、暂停视频
          vodShow:true, //是否显示视频
          object_fit:'contain', //视频的显示类型
          pauseShow:false, //是否显示暂停图标
          loadingShow:false, //是否显示loading加载动画
          fabulousShow:false,//是否点赞
          followReally:false, //是否关注
          collectNum:0, //收藏数量
          isCollect:false, //是否收藏
          sliderShow:true, //是否显示进度条
          rotateImgShow:true, //是否显示旋转头像
        } */
      ],
      totalPlayList: [],
      finalList: [],
      changeIndex: 0, //current 下标
      beforeVodInfo: {}, //当前播放视频对象

      circular: true,
      durationNum: 300,
      showShade: false, //显示遮罩swiper
      openSpot: false,
      shadeNum: 0,
      bufferTime: null, //缓冲视频显示加载动画防抖
      sliderProgress: 0, //进度条滑动层宽度
      sliderTime: 0, //显示滑动进度条时变化的时间
      videoTime: 0, //视频时长 时间
      endTime: 0, //滑动进度条最终的时间
      sliderDrag: false, //是否在拖动进度
      brightSlider: false, //是否显示光亮的进度条
      sliderEndTime: null, //滑动结束隐藏光亮进度条时间延迟
      bufferNum: null, //显示loading加载进度的时间条件
      bufferShow: false, //显示loading加载进度的条件
      playOpen: false, //视频播放失败，是否重播视频的条件
      failTime: null, //视频播放失败，重播视频的时间
      repeatTime: null,
      palyCartoon: false, //是否播放旋转头像
      shakePlay: false, //是否有防抖视频播放
      touchClientY: 0, //触碰的坐标
      moveClientY: 0, //移动的坐标
      moveOpacity: false, //是否透明
      refreshShow: false, //是否显示下拉刷新
      refreshOpacity: 0, //下拉刷新的透明度
      refreshclientY: 0, //下拉刷新的坐标
      refreshOpen: false, //下拉刷新的触发条件
      errNum: 0,
      playErrTime: null,
      interceptIndex: [],
      loadTime: null,
      beginLoad: 0,
      loadStart: false
    }
  },
  created() {
    this.autoplayVideo = this.autoplay;
    const deviceInfo = uni.getSystemInfoSync();
    this.videoStyle.statusBarHeight = deviceInfo.statusBarHeight + "px";
    this.videoStyle.width = deviceInfo.screenWidth + "px";
    this.screenWidth = deviceInfo.screenWidth;
    this.screenHeight = deviceInfo.screenHeight;
    if (this.tabBarShow == 1) {
      this.videoStyle.height = deviceInfo.screenHeight - deviceInfo.statusBarHeight - this.tabBarHeight + "px";
    } else {
      this.videoStyle.height = deviceInfo.windowHeight - deviceInfo.statusBarHeight + "px";
    }
  },
  watch: {
    vodCurIndex(newIndex, oldIndex) {
      if (oldIndex >= 0) {
        this.vodList.filter((item, index) => {
          if (oldIndex == item.videoIndex) {
            item.coverOpacity = item.coverShow ? true : false;
            item.vodPaly = false;
            item.pauseShow = false;
            item.loadingShow = false;
            uni.createVideoContext("myVideo" + index, this).pause();
          }
        });
      }
    }
  },
  methods: {
    jumpBtn(type) {
      this.$emit('handle-menu', { type: type, index: this.vodCurIndex, data: this.totalPlayList[this.vodCurIndex] })
    },
    black() {
      uni.navigateBack({ delta: 1 })
    },
    //更新视频数据
    updateData(index, keyName, data) {
      this.$set(this.totalPlayList[index], keyName, data)
      let videoInfo = this.vodList.find(item => item.videoIndex == index)
      if (videoInfo) this.$set(videoInfo, keyName, data)

    },
    /* 初始加载视频 */
    initVod(dataList, index) {
      if (index) {
        this.durationNum = 0;
      }
      let playIndex = index ? index : 0;
      dataList.filter((item, index) => {
        item.videoIndex = index;
        item.vodPaly = index == playIndex ? true : false;
        item.pauseShow = false;
        item.loadingShow = false;
        item.coverOpacity = item.coverShow ? true : false;
      });
      dataList.sort((a, b) => a.videoIndex - b.videoIndex);
      this.totalPlayList = dataList;
      this.contentShow = dataList.length > 0 ? true : false;
      this.loadShow = dataList.length > 0 ? true : false;
      this.vodCurIndex = playIndex;
      let currentNum = 0;
      this.vodList = [{}, {}, {}];
      // TOLOOK
      // TOLOOK
      setTimeout(() => {
        let totalPlayListLength = this.totalPlayList.length;
        let totalPlayListRemainder = totalPlayListLength % 3;
        let _0xa0b8aa = playIndex - 1 < 0 ? 0 : playIndex - 1;
        let _0x497f19 = playIndex + 2;
        let _0x161a78 = totalPlayListLength - totalPlayListRemainder;
        if (playIndex == 0 || playIndex + 1 >= _0x161a78) {
          this.circular = false;
          let _0x333767 = [];
          if (playIndex == 0) {
            _0x333767 = JSON.parse(JSON.stringify(this.totalPlayList.slice(_0xa0b8aa, playIndex + 3)));
          } else {
            _0x333767 = JSON.parse(JSON.stringify(this.totalPlayList.slice(_0x161a78 - 3, _0x161a78)));
          }
          this.setSliceList(_0x333767);
          if (playIndex != 0) {
            let _0x25dbd5 = JSON.parse(JSON.stringify(this.totalPlayList.slice(_0x161a78, totalPlayListLength)));
            _0x25dbd5.filter(_0x2ba176 => {
              this.vodList.push(_0x2ba176);
            });
            if (this.totalPlayList.length >= this.totalvod) {
              this.loadShow = false;
            }
          }
        } else {
          this.circular = true;
          let _0x14fc01 = JSON.parse(JSON.stringify(this.totalPlayList.slice(_0xa0b8aa, _0x497f19)));
          this.setSliceList(_0x14fc01);
        }
        this.getVodInfo();
        this.vodList.filter((_0x27784e, _0x44811e) => {
          if (this.vodCurIndex == _0x27784e.videoIndex) {
            currentNum = _0x44811e;
          }
        });
        if (this.vodCurIndex + 1 >= this.totalPlayList.length - this.totalPlayList.length % 3) {
          this.loadStart = true;
          clearTimeout(this.loadTime);
          this.loadTime = // TOLOOK
            // TOLOOK
            setTimeout(() => {
              this.beginLoad = this.totalPlayList.length;
              this.$emit("lodData");
            }, 300);
        }
        if (playIndex > 0) {
          this.currentIndex = currentNum;
        }
        this.changeIndex = currentNum;
        this.vodIndex = currentNum;
      }, 100);
      // TOLOOK
      // TOLOOK
      setTimeout(() => {
        this.durationNum = 300;
        if (this.autoplayVideo) {
          this.swiperPlay(currentNum);
        } else {
          this.beforeVodInfo.vodPaly = false;
          this.beforeVodInfo.pauseShow = true;
        }
      }, 200);
    },
    /* 赋值截取的数据 */
    setSliceList(resData) {
      resData.filter(item => {
        if (item.videoIndex % 3 == 0) {
          this.vodList[0] = item;
        } else if (item.videoIndex % 3 == 1) {
          this.vodList[1] = item;
        } else if (item.videoIndex % 3 == 2) {
          this.vodList[2] = item;
        }
      });
    },
    /* 到底加载方法 */
    lodingData(dataList) {
      let num = this.totalPlayList.length;
      dataList.filter((item, index) => {
        item.videoIndex = num + index;
        item.vodPaly = false;
        item.pauseShow = false;
        item.loadingShow = false;
        item.coverOpacity = item.coverShow ? true : false;
      });
      this.totalPlayList = this.totalPlayList.concat(dataList);
      this.$nextTick(() => {
        this.getVodSliceList();
        // TOLOOK
        // TOLOOK
        setTimeout(() => {
          this.setSliceList(this.finalList);
          let _0x2c56c8 = this.totalvod - this.totalvod % 3;
          if (this.vodCurIndex != 0 && this.vodList.length == 3 && this.vodCurIndex + 1 >= _0x2c56c8 && this.totalvod > 0) {
            let _0x5ba639 = this.totalPlayList.slice(this.vodCurIndex + 1, this.totalPlayList.length);
            _0x5ba639.filter(_0x4ce9c8 => {
              this.vodList.push(_0x4ce9c8);
            });
          }
          this.beginLoad = this.totalPlayList.length;
          this.$nextTick(() => {
            this.circular = true;
          });
        }, 100);
      });
    },
    /* 重新加载 */
    refreshSquare(dataList, index) {
      let playIndex = index ? index : 0;
      this.resetData();
      this.refreshShow = false;
      this.refreshOpen = false;
      this.vodList = [];
      this.totalPlayList = [];
      setTimeout(() => {
        this.initVod(dataList, playIndex);
        uni.showToast({
          title: "刷新成功",
          icon: "none"
        });
      }, 50);
    },
    /* onShow播放视频 */
    showPlay() {
      if (this.vodIndex != null && this.contentShow && !this.beforeVodInfo.vodPaly) {
        this.videoPlay(this.vodIndex);
      }
    },
    /* onHide暂停视频 */
    hidePause() {
      if (this.vodIndex != null && this.contentShow && this.beforeVodInfo.vodPaly) {
        this.videoPause(this.vodIndex);
      }
      this.brightSlider = false; //隐藏光亮的进度条
    },
    /* 点击暂停、播放视频 */
    playSpot(index) {
      if (this.beforeVodInfo.vodPaly) { //暂停
        this.videoPause(index)
        this.beforeVodInfo.pauseShow = true; //显示暂停图标
      } else { //播放
        this.videoPlay(index)
        this.beforeVodInfo.pauseShow = false; //关闭暂停图标
      }
    },
    /* 播放视频 */
    videoPlay(index) {
      // console.log('播放视频myVideo============>' + index)
      this.openSpot = true;
      this.getVodInfo();
      this.showShade = false;
      this.beforeVodInfo.vodPaly = true;
      this.beforeVodInfo.pauseShow = false;
      this.brightSlider = false;
      this.loadStart = false;
      this.$nextTick(() => {
        this.moveOpacity = false;
        uni.createVideoContext("myVideo" + index, this).play();
      });
    },
    videoPause(index) {
      // console.log('暂停视频myVideo============>' + index)
      this.getVodInfo();
      clearTimeout(this.sliderEndTime);
      this.beforeVodInfo.vodPaly = false;
      if (this.vodIndex == index && this.beforeVodInfo.sliderShow) {
        this.brightSlider = true;
      }
      this.$nextTick(() => {
        uni.createVideoContext("myVideo" + index, this).pause();
      });
    },
    changeSwiper(ev) {
      let curIndex = ev.detail.current;
      let videoIndex = this.vodList[curIndex].videoIndex;
      this.moveOpacity = true;
      this.shadeNum++;
      this.openSpot = false;
      this.autoplayVideo = true;
      let vodTotal = this.totalPlayList.length % 3;
      if ((videoIndex == 0 || videoIndex + 1 == this.totalPlayList.length - vodTotal) && this.shadeNum > 1) {
        this.showShade = true;
      }
      this.changeIndex = curIndex;
      this.vodCurIndex = videoIndex;
      this.getVodSliceList();
      this.getVodInfo();
    },
    /* 要播放视频的下标 */
    swiperVod(ev) {
      let curIndex = ev.detail.current;
      if (this.openSpot) {
        return;
      }
      this.resetData();
      this.moveOpacity = false;
      this.shadeNum = 0;
      this.showShade = false;
      this.setSliceList(this.finalList);
      let endNum = this.totalPlayList.length - this.totalPlayList.length % 3;
      if (this.vodCurIndex == 0 || this.vodCurIndex + 1 >= endNum) {
        this.circular = false;
        let appendNum = this.totalvod - this.totalvod % 3;
        if (this.vodCurIndex != 0 && this.vodList.length == 3 && this.vodCurIndex + 1 >= appendNum && this.totalvod > 0) {
          let arrList = this.totalPlayList.slice(this.vodCurIndex + 1, this.totalPlayList.length);
          arrList.filter(_0x141943 => {
            this.vodList.push(_0x141943);
          });
        }
      } else {
        let loadNum = this.beginLoad - this.beginLoad % 3;
        if (this.beginLoad > 0 && this.vodCurIndex + 1 >= loadNum && this.vodCurIndex + 1 <= this.beginLoad) { } else {
          if (this.vodList.length > 3) {
            this.vodList.length = 3;
          }
          this.beginLoad = 0;
        }
        this.$nextTick(() => {
          this.circular = true;
        });
      }
      if (this.totalvod > 0) {
        this.loadShow = this.totalPlayList.length >= this.totalvod ? false : true;
      }
      this.vodIndex = this.changeIndex;
      this.swiperPlay(this.vodIndex);
      if (this.vodCurIndex + 1 >= this.totalPlayList.length - this.totalPlayList.length % 3 && !this.loadStart) {
        clearTimeout(this.loadTime);
        this.loadTime = setTimeout(() => {
          this.$emit("lodData");
        }, 300);
      }
    },
    /* 获取当前视频播放对象 */
    getVodInfo() {
      this.vodList.filter(item => {
        if (this.vodCurIndex == item.videoIndex) {
          this.beforeVodInfo = item
        }
      })
    },
    /* 截取要播放的视频列表 */
    getVodSliceList() {
      let videoIndex = this.vodList[this.changeIndex].videoIndex;
      let starIdx = videoIndex - 1 < 0 ? 0 : videoIndex - 1;
      let endIdx = videoIndex + 2;
      let resultList = JSON.parse(JSON.stringify(this.totalPlayList.slice(starIdx, endIdx)));
      resultList.filter(item => {
        if (item.videoIndex % 3 == 0) {
          this.vodList[0].videoIndex = item.videoIndex;
        } else if (item.videoIndex % 3 == 1) {
          this.vodList[1].videoIndex = item.videoIndex;
        } else if (item.videoIndex % 3 == 2) {
          this.vodList[2].videoIndex = item.videoIndex;
        }
      });
      this.finalList = resultList;
    },
    /* swiper播放视频 */
    swiperPlay(newIndex, oldIndex) {
      this.playOpen = false;
      clearInterval(this.failTime);
      clearInterval(this.repeatTime);
      if (uni.createVideoContext("myVideo" + newIndex, this)) {
        this.shakePlay = false;
        this.beforeVodInfo.vodPaly = true;
        this.videoPlay(newIndex);
      }
    },
    /* 当开始/继续播放时 */
    startPlay(index) {
      if (this.vodIndex == index) {
        this.beforeVodInfo.coverOpacity = false;
        this.playOpen = false;
        this.errNum = 0;
        if (this.beforeVodInfo.rotateImgShow) {
          this.palyCartoon = true;
        }
        clearInterval(this.failTime);
        clearInterval(this.repeatTime);
      }
    },
    /* 视频出现缓冲 */
    bufferVod(index) {
      // console.log('缓冲视频================》'+index)
      if (this.vodList.length > 0 && this.changeIndex == this.vodIndex && !this.bufferShow && this.beforeVodInfo.vodPaly) {
        this.playOpen = true;
        this.scheduleLoad();
      }
    },
    /* 视频播放失败 */
    errVod(index) {
      clearTimeout(this.playErrTime);
      this.playErrTime = setTimeout(() => {
        if (this.vodList.length > 0 && this.changeIndex == this.vodIndex && !this.bufferShow && this.beforeVodInfo.vodPaly) {
          this.playOpen = true;
          this.palyCartoon = false;
          this.errNum = 1;
          this.scheduleLoad();
        }
      }, 300);
    },
    /* 播放进度变化时触发 */
    timeupdateVod(ev, index) {
      if (this.vodIndex != index) {
        return false;
      }
      if (!this.sliderDrag) {
        this.videoTime = ev.detail.duration;
        this.sliderTime = ev.detail.currentTime;
        this.sliderProgress = ev.detail.currentTime / ev.detail.duration * this.screenWidth;
      }
      if (this.vodList.length > 0) {
        this.bufferNum = ev.detail.currentTime;
        this.bufferShow = false;
        this.beforeVodInfo.loadingShow = false;
        this.errNum = 1;
        clearTimeout(this.bufferTime);
        clearInterval(this.failTime);
        clearInterval(this.repeatTime);
      }
    },
    /* 显示进度加载动画 */
    scheduleLoad() {
      if (!this.bufferShow) {
        this.bufferShow = true;
        this.bufferTime = setTimeout(() => {
          this.beforeVodInfo.loadingShow = true;
          if (this.playOpen) {
            this.repeatTime = setInterval(() => {
              this.vodLoad();
            }, 500);
          }
        }, 1500);
      }
    },
    /* 重新播放视频 */
    vodLoad() {
      /* 视频播放失败，重新播放视频 */
      if (!this.bufferShow) {
        this.bufferShow = true;
        this.bufferTime = setTimeout(() => {
          this.beforeVodInfo.loadingShow = true;
          if (this.playOpen) {
            this.repeatTime = setInterval(() => {
              this.vodLoad();
            }, 500);
          }
        }, 1500);
      }
    },
    /* 视频播放结束 */
    endedVod(index) {
      // console.log('视频播放结束'+index)
      if (this.vodIndex == index && this.nextPlay) {
        if (this.vodIndex < 2) {
          this.vodIndex += 1;
        } else {
          this.vodIndex = 0;
        }
        this.currentIndex = this.vodIndex;
      }
    },
    // 根据秒获取时间
    formatSeconds(a) {
      var hh = parseInt(a / 3600);
      var mm = parseInt((a - hh * 3600) / 60);
      if (mm < 10) mm = "0" + mm;
      var ss = parseInt((a - hh * 3600) % 60);
      if (ss < 10) ss = "0" + ss;
      if (hh < 10) hh = hh == 0 ? '' : `0${hh}:`;
      var length = hh + mm + ":" + ss;
      if (a >= 0) {
        return length;
      } else {
        return "00:00";
      }
    },
    /* 进度条滑动 */
    touchmoveSlider(event) {
      // #ifndef APP-NVUE
      let objclientX = event.changedTouches[0].clientX
      // #endif

      // #ifdef APP-NVUE
      let objclientX = event.changedTouches[0].screenX;
      // #endif
      this.sliderDrag = true;
      if (objclientX >= 0 && objclientX <= this.screenWidth - 2) {
        if (this.sliderEndTime != null) {
          clearTimeout(this.sliderEndTime);
        }
        this.brightSlider = true;
        this.sliderProgress = objclientX;
        let num = this.sliderProgress / (this.screenWidth - 2);
        this.sliderTime = num * this.videoTime;
        this.endTime = num * this.videoTime;
      }
    },
    /* 进度条滑动结束 */
    touchendSlider() {
      this.sliderDrag = false;
      let videoCtx = uni.createVideoContext("myVideo" + this.vodIndex, this);
      videoCtx.seek(this.endTime);
      videoCtx.play();
      this.beforeVodInfo.vodPaly = true;
      this.beforeVodInfo.pauseShow = false;
      this.sliderEndTime = setTimeout(() => {
        this.brightSlider = false;
      }, 2000);
    },
    /* 触碰的坐标 */
    vodViewStart(e) {
      // #ifndef APP-NVUE
      this.touchClientY = e.changedTouches[0].clientY
      // #endif
      // #ifdef APP-NVUE
      this.touchClientY = e.changedTouches[0].screenY
      // #endif
    },
    /* 上下滑动的坐标 */
    vodViewMove(e) {
      // #ifndef APP-NVUE
      this.moveClientY = e.changedTouches[0].clientY - this.touchClientY
      // #endif
      // #ifdef APP-NVUE
      this.moveClientY = e.changedTouches[0].screenY - this.touchClientY
      // #endif
      /* 是否透明进度条 */
      if (this.moveClientY > 0 || this.moveClientY < 0) {
        this.moveOpacity = true;
      } else {
        this.moveOpacity = false;
      }
      if (this.loadOpen && this.vodCurIndex == 0 && !this.refreshOpen) {
        if (this.moveClientY > 10) {
          this.refreshShow = true;
          if (this.moveClientY > 10 && this.moveClientY <= 60 && this.refreshShow) {
            this.refreshOpacity = this.moveClientY / 60;
            this.refreshclientY = this.moveClientY / 2;
          }
        } else {
          this.refreshShow = false;
        }
      }
    },
    /* 滑动结束的坐标 */
    vodViewEnd(e) {
      // #ifndef APP-NVUE
      this.moveClientY = e.changedTouches[0].clientY - this.touchClientY
      // #endif
      // #ifdef APP-NVUE
      this.moveClientY = e.changedTouches[0].screenY - this.touchClientY
      // #endif
      this.moveOpacity = false;
      if (this.loadOpen) {
        if (this.vodCurIndex == 0 && this.refreshShow) {
          if (this.moveClientY > 1 && this.moveClientY < 60 && !this.refreshOpen) {
            this.refreshOpacity = 0;
            this.refreshclientY = 0;
            setTimeout(() => {
              this.refreshShow = false;
            }, 300);
          } else {
            if (this.refreshOpen) {
              return;
            }
            this.refreshOpen = true;
            this.$emit("refreshData");
          }
        }
      }
    },
    /* 重置状态数据 */
    resetData() {
      this.sliderProgress = 0;
      this.sliderTime = 0;
      this.videoTime = 0;
      this.endTime = 0;
      this.bufferNum = null;
      this.bufferShow = false;
      this.sliderDrag = false;
      this.brightSlider = false;
      this.sliderEndTime = null;
    },
    /* 点赞关注操作 */
    handleInfo(obj) {
      this.totalPlayList.filter((item, index) => {
        if (item.videoIndex == obj.videoIndex) {
          this.$set(this.totalPlayList, index, obj)
        }
      })
      this.vodList.filter((item, index) => {
        if (item.videoIndex == obj.videoIndex) {
          this.$set(this.vodList, index, obj)
        }
      })
    }
  }
}
