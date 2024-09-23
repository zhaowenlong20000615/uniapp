const animation = uni.requireNativePlugin('animation')
const dom = uni.requireNativePlugin('dom')
import unirefresh from '../tsp-load/tsp-refresh-n.nvue'
import videoMenu from '../tsp-menu/tsp-menu-n.nvue'
/*
 lodData 上拉加载回调
 refreshData 下拉加载回调
 */

export default {
	components: {
		unirefresh,
		videoMenu
	},
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
		/* 剩余多少个视频触发上拉加载 */
		surplusNum: {
			type: Number,
			default: 0 //0默认是最后一个
		},
		/* tabBar栏 0系统tabBar栏 1自定义tabBar栏 */
		tabBarShow: {
			type: Number,
			default: 0
		},
		/* 自定义tabBar的高度 */
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
	},
	data() {
		return {
			videoStyle: {},
			screenWidth: 0, //屏幕的宽度
			screenHeight: 0, //屏幕的高度
			vodHeight: 0, //视频部分高度
			videoNewUrl: null, //下一个视频的地址
			currentIndex: null,
			vodIndex: 0, // 当前播放视频下标
			contentShow: false,
			autoplayVideo: true, // 初始加载完成是否自动播放
			vodList: [
				/* {
				  vid:'myVideo'+ 0,
				  vodUrl:"https://outin-9cc4a7aedd2a11eaabb800163e1a65b6.oss-cn-shanghai.aliyuncs.com/customerTrans/43121ec9955a1ce95146d379f15ea9bd/566eafe2-17b52f0f17b-0007-0f29-cc2-eb217.mp4",
				  coverImg:'../image/cover1.jpg', //视频封面
				  coverShow:true, //是否显示视频封面
				  vodPaly:true, //是否播放、暂停视频
				  object_fit:'contain', //视频的显示类型
				  pauseShow:false, //是否显示暂停图标
				  loadingShow:false, //是否显示loading加载动画
				  fabulousShow:false,//是否点赞
				  followShow:-1, //关注特效
				  followReally:false, //是否关注
				  sliderShow:true, //是否显示进度条
				  rotateImgShow:true, //是否显示旋转头像
				} */
			],
			timeout: null, //滑动视频防抖
			bufferTime: null, //缓冲视频显示加载动画防抖
			sliderProgress: 0, //进度条滑动层宽度
			sliderTime: 0, //显示滑动进度条时变化的时间
			videoTime: 0, //视频时长 时间
			endTime: 0, //滑动进度条最终的时间
			sliderDrag: false, //是否在拖动进度
			brightSlider: false, //是否显示光亮的进度条
			sliderEndTime: null, //滑动结束隐藏光亮进度条时间延迟
			startPlayVod: false, //是否滑动结束播放下一个视频
			bufferShow: false, //显示loading加载进度的条件
			playOpen: false, //视频播放失败，是否重播视频的条件
			errNum: 0,
			failTime: null, //视频播放失败，重播视频的时间
			repeatTime: null, //延时防抖
			preloadTime: null, //延时防抖
			shakePlay: false, //是否有遗漏的视频播放
			rotateAnti: false, //防抖旋转头像
			touchClientY: 0, //触碰的坐标
			moveClientY: 0, //移动的坐标
			moveOpacity: false, //是否透明
			speedHide: false, //滑动时隐藏进度条
			appoint: true, //初始隐藏视频和右侧头像栏
			changeVod: false, //是否正在切换视频
			changeIndex: 0,
			changeTime: null
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
			this.vodHeight = deviceInfo.screenHeight - deviceInfo.statusBarHeight - this.tabBarHeight;
		} else {
			this.videoStyle.height = deviceInfo.windowHeight - deviceInfo.statusBarHeight + "px";
			this.vodHeight = deviceInfo.windowHeight - deviceInfo.statusBarHeight;
		}
		console.log('initVod', this.initVod);
	},
	watch: {
		vodIndex(newIndex, oldIndex) {
			if (!this.contentShow) {
				return;
			}
			this.resetData();
			if (oldIndex >= 0 && !this.appoint) {
				this.vodList[oldIndex].coverOpacity = this.vodList[oldIndex].coverShow ? true : false;
				this.vodList[oldIndex].vodPaly = false;
				this.vodList[oldIndex].pauseShow = false;
				this.vodList[oldIndex].loadingShow = false;
				uni.createVideoContext("myVideo" + oldIndex, this).pause();
			}
			this.$nextTick(() => {
				this.changeVod = false;
				if (this.autoplayVideo) {
					this.autoplayVideo = true;
					this.swiperVod(newIndex);
				}
			});
		}
	},
	methods: {
		black() {
			uni.navigateBack({
				delta: 1
			})
		},

		/* 滚动监听 */
		scrolls(ev) {
			let index = Math.round(Math.abs(ev.contentOffset.y) / this.vodHeight);
			this.changeIndex = index;
			this.timeout = setTimeout(() => {
				this.currentIndex = index;
				this.shakePlay = true;
				this.speedHide = false;
				if (this.startPlayVod && index != this.vodIndex) {
					this.vodIndex = index;
				}
			}, 100);
		},
		/* 初始加载视频 */
		initVod(dataList, index) {
			let playIndex = index ? index : 0;
			dataList.filter((item, _index) => {
				item.vid = "myVideo" + _index;
				item.vodPaly = _index == playIndex ? true : false;
				item.pauseShow = false;
				item.loadingShow = false;
				item.coverOpacity = item.coverShow ? true : false;
			});
			this.vodList = dataList;
			this.contentShow = dataList.length > 0 ? true : false;
			this.vodIndex = playIndex;
			// TOLOOK
			setTimeout(() => {
				if (playIndex > 0) {
					let _0x53ca7c = this.$refs["myVideo" + playIndex][0];
					dom.scrollToElement(_0x53ca7c, {
						offset: 0,
						animated: false
					});
				}
				// TOLOOK
				setTimeout(() => {
					this.appoint = false;
					if (this.autoplayVideo) {
						this.swiperVod(this.vodIndex);
					} else {
						this.vodList[this.vodIndex].vodPaly = false;
						this.vodList[this.vodIndex].pauseShow = true;
					}
				}, 200);
			}, 100);
		},
		/* 上拉加载回调 */
		lodData() {
			this.$emit('lodData')
		},
		/* 下拉刷新回调 */
		refreshData() {
			this.$emit('refreshData')
		},
		/* 到底加载方法 */
		lodingData(dataList) {
			let num = this.vodList.length;
			dataList.filter((item, index) => {
				item.vid = "myVideo" + (num + index);
				item.vodPaly = false;
				item.pauseShow = false;
				item.loadingShow = false;
				item.coverOpacity = item.coverShow ? true : false;
			});
			this.vodList = this.vodList.concat(dataList);
		},
		/* 重新加载 */
		refreshSquare(dataList, index) {
			let playIndex = index ? index : 0;
			this.vodList = [];
			this.resetData();
			this.$refs.refresh.closeRefresh();
			this.$refs.listBox.resetLoadmore();
			// TOLOOK
			setTimeout(() => {
				this.initVod(dataList, playIndex);
			}, 50);
		},
		/* onShow显示播放视频 */
		showPlay() {
			if (this.vodIndex != null && this.contentShow) {
				this.videoPlay(this.vodIndex);
			}
		},
		/* onHide隐藏暂停视频 */
		hidePause() {
			if (this.vodIndex != null && this.contentShow) {
				this.videoPause(this.vodIndex);
			}
			this.brightSlider = false; //隐藏光亮的进度条
		},
		/* 重置状态数据 */
		resetData() {
			this.sliderProgress = 0;
			this.sliderTime = 0;
			this.videoTime = 0;
			this.endTime = 0;
			this.bufferShow = false;
			this.sliderDrag = false;
			this.brightSlider = false;
			this.sliderEndTime = null;
		},
		/* 点击暂停、播放视频 */
		playSpot(index) {
			if (this.vodList[index].vodPaly) { //暂停
				this.videoPause(index)
				this.vodList[index].pauseShow = true; //显示暂停图标
			} else { //播放
				this.videoPlay(index)
				this.vodList[index].pauseShow = false; //关闭暂停图标
			}
		},
		/* 播放视频 */
		videoPlay(index) {
			this.vodList[index].vodPaly = true;
			this.vodList[index].pauseShow = false;
			this.brightSlider = false;
			uni.createVideoContext("myVideo" + index, this).play();
		},
		/* 暂停视频 */
		videoPause(index) {
			clearTimeout(this.sliderEndTime);
			this.vodList[index].vodPaly = false;
			if (this.vodIndex == index && this.vodList[index].sliderShow) {
				this.brightSlider = true;
			}
			uni.createVideoContext("myVideo" + index, this).pause();
		},
		/* 播放视频 */
		swiperVod(newIndex) {
			clearInterval(this.failTime);
			clearInterval(this.repeatTime);
			// TOLOOK
			// TOLOOK
			setTimeout(() => {
				clearTimeout(this.checkTime);
			}, 100);
			if (uni.createVideoContext("myVideo" + newIndex, this)) {
				uni.createVideoContext("myVideo" + newIndex, this).pause();
				this.shakePlay = false;
				this.vodList[newIndex].vodPaly = true;
				this.videoPlay(newIndex);
			}
			if (this.vodList[newIndex + 1] && Math.abs(newIndex + 1 - newIndex) <= 1) {
				uni.createVideoContext("myVideo" + (newIndex + 1), this).play();
			}
			this.rotateAnti = false;
		},
		/* 当开始/继续播放时 */
		startPlay(index) {
			if (this.vodIndex == index) {
				this.playOpen = false;
				this.errNum = 0;
				clearInterval(this.failTime);
				clearInterval(this.repeatTime);
				if (this.vodList[this.vodIndex].rotateImgShow && !this.rotateAnti) {
					this.$refs["menuRef" + this.vodIndex + ""][0].rotateAvatar();
				}
			}
		},
		/* 视频出现缓冲 */
		bufferVod(index) {
			if (this.vodList.length > 0 && index == this.vodIndex && !this.bufferShow && this.videoTime > 0) {
				this.playOpen = true;
				this.scheduleLoad();
			}
		},
		/* 视频播放失败 */
		errVod(err, index) {
			if (this.vodList.length > 0 && index == this.vodIndex && !this.bufferShow) {
				this.playOpen = true;
				this.errNum = 1;
				this.scheduleLoad();
			}
		},
		/* 播放进度变化时触发 */
		timeupdateVod(ev, index) {
			if (this.vodIndex != index) {
				return false;
			}
			this.vodList[index].coverOpacity = false;
			if (!this.sliderDrag) {
				this.videoTime = ev.detail.duration;
				this.sliderTime = ev.detail.currentTime;
				this.sliderProgress = ev.detail.currentTime / ev.detail.duration * this.screenWidth;
			}
			if (this.vodList.length > 0) {
				this.bufferShow = false;
				this.vodList[index].loadingShow = false;
				clearTimeout(this.bufferTime);
				clearInterval(this.failTime);
				clearInterval(this.repeatTime);
				this.playOpen = false;
				this.errNum = 0;
			}
			if (this.vodList[index + 1] && Math.abs(index + 1 - index) <= 1) {
				uni.createVideoContext("myVideo" + (index + 1), this).seek(0);
				uni.createVideoContext("myVideo" + (index + 1), this).pause();
			}
			this.rotateAnti = true;
		},
		/* 显示进度加载动画 */
		scheduleLoad() {
			if (!this.bufferShow) {
				this.bufferShow = true;
				this.bufferTime = setTimeout(() => {
					this.vodList[this.vodIndex].loadingShow = true;
					setTimeout(() => {
						this.loadingSliderShow();
					}, 100);
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
			if (this.playOpen) {
				this.playOpen = false;
				if (this.errNum == 1) {
					uni.createVideoContext("myVideo" + this.vodIndex, this).stop();
				}
				this.failTime = setTimeout(() => {
					this.videoPlay(this.vodIndex);
					this.playOpen = true;
				}, 1000);
			}
		},
		/* 视频播放结束 */
		endedVod(index) {
			if (this.vodIndex == index && this.nextPlay) {
				this.vodIndex += 1;
				let el = this.$refs["myVideo" + this.vodIndex + ""][0];
				dom.scrollToElement(el, {
					offset: 0,
					animated: true
				});
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
			event.stopPropagation()
			// #ifndef APP-NVUE
			let objclientX = event.changedTouches[0].clientX
			// #endif
			// #ifdef APP-NVUE
			let objclientX = event.changedTouches[0].screenX
			// #endif
			if (objclientX >= 0 && objclientX <= this.screenWidth - 2) {
				clearTimeout(this.sliderEndTime);
				this.sliderDrag = true;
				this.brightSlider = true;
				this.sliderProgress = objclientX;
				let num = this.sliderProgress / (this.screenWidth - 2);
				this.sliderTime = num * this.videoTime;
				this.endTime = num * this.videoTime;
			}
		},
		/* 进度条滑动结束 */
		touchendSlider(event) {
			event.stopPropagation();
			this.sliderDrag = false;
			let videoCtx = uni.createVideoContext("myVideo" + this.vodIndex, this);
			videoCtx.seek(this.endTime);
			videoCtx.play();
			this.vodList[this.vodIndex].vodPaly = true;
			this.vodList[this.vodIndex].pauseShow = false;
			this.sliderEndTime = setTimeout(() => {
				this.brightSlider = false;
			}, 2000);
		},
		/* 视频是否播放遗漏 */
		vodViewStart() {
			clearTimeout(this.checkTime);
			this.checkTime = setTimeout(() => {
				if (this.shakePlay) {
					this.moveOpacity = false;
					this.vodIndex = this.currentIndex;
				}
			}, 500);
		},
		/* 上下滑动的坐标 */
		vodViewMove(ev) {
			// #ifndef APP-NVUE
			this.moveClientY = ev.changedTouches[0].clientY - this.touchClientY
			// #endif
			// #ifdef APP-NVUE
			this.moveClientY = ev.changedTouches[0].screenY - this.touchClientY
			// #endif
			/* 是否透明进度条 */
			if (this.moveClientY > 0 || this.moveClientY < 0) {
				this.moveOpacity = true
			} else {
				this.moveOpacity = false
			}
			this.startPlayVod = false;
		},
		/* 滑动结束的坐标 */
		vodViewEnd(ev) {
			this.startPlayVod = true;
			this.moveOpacity = false;
			this.vodViewStart();
			if (!this.changeTime) {
				this.changeTime = setTimeout(() => {
					this.changeVod = this.changeIndex != this.vodIndex ? true : false;
					this.changeTime = null;
				}, 300);
			}
		},
		/* loading进度加载动画 */
		loadingSliderShow() {
			let testEl = this.$refs.loadSlider;
			animation.transition(testEl, {
				styles: {
					transform: 'scale(0.4)',
					opacity: "0.9"
				},
				duration: 10, //ms
				timingFunction: 'linear',
				delay: 0 //ms
			}, () => {
				this.loadingSliderHide();
			})
		},
		loadingSliderHide() {
			let testEl = this.$refs.loadSlider;
			animation.transition(testEl, {
				styles: {
					transform: 'scale(1)',
					opacity: "0.1"
				},
				duration: 400, //ms
				timingFunction: 'linear',
				delay: 0 //ms
			}, () => {
				this.loadingSliderShow();
			})
		},
		jumpBtn(type, index) {
			this.$emit('handleMenu', {
				type: type,
				index: index,
				data: this.vodList[index]
			})
		},
		//更新视频数据
		updateData(index, keyName, data) {
			this.$set(this.vodList[index], keyName, data)
		}
	},
}