<template>
	<view>
		<view class="head">
			<view class="flex align-center justify-between padding-lr">
				<view class="flex align-center justify-center" @tap="binduser()">
					<image :src="image_url" style="width: 100rpx;height: 100rpx;border-radius: 100rpx;"></image>
					<view class="text-lg text-bold margin-left-sm">{{ mobile ? mobile : '登录' }}</view>
				</view>
			</view>

			<view class="margin-lr-xl flex align-center justify-between margin-top-xl padding-bottom">
				<view class="bb " @click="goNav('/my/wallet/index')">
					<view class="num">{{money?money:'0'}}</view>
					<view class="tit">余额</view>
				</view>
				<view class="bb" @click="goNav('/my/youhui/index')">
					<view class="num">{{couponCount?couponCount:'0'}}</view>
					<view class="tit">优惠券</view>
				</view>
				<view class="bb" @click="goNav('/my/setting/xyf')">
					<view class="num">{{creditScore?creditScore:'0'}}</view>
					<view class="tit">信用分</view>
				</view>
			</view>
		</view>
		<!-- 列表 -->
		<view class="margin  padding-tb bg-white " style="border-radius: 24rpx;">
			<view class="flex justify-between align-center padding-lr-sm">
				<view class="text-lg text-bold text-black">我的订单</view>
				<view class="flex text-gray" @click="goSwt(0)">
					<u-icon name="arrow-right" width='11rpx' height='18rpx' color="#1A1A1A"></u-icon>
				</view>
			</view>
			<view class="margin-tb" style="width: 100%;height: 1rpx;background: #E6E6E6;"></view>
			<view class="flex justify-around">
				<view class="text-center" @click="goSwt(1)" style="position: relative;">
					<image src="../../static/image/my/order4.png" style="width: 52rpx;height: 52rpx;" mode=""></image>
					<view class="text-sm">待支付</view>
					<view class="weinumber" v-if="order&&order.indentWait">{{order.indentWait}}</view>
				</view>
				<view class="text-center" @click="goSwt(2)" style="position: relative;">
					<image src="../../static/image/my/order1.png" style="width: 52rpx;height: 52rpx;" mode=""></image>
					<view class="text-sm">待接单</view>
					<view class="weinumber" v-if="order&&order.indentAccept">{{order.indentAccept}}</view>
				</view>
				<view class="text-center" @click="goSwt(3)" style="position: relative;">
					<image src="../../static/image/my/order2.png" style="width: 52rpx;height: 52rpx;" mode=""></image>
					<view class="text-sm">已接单</view>
					<view class="weinumber" v-if="order&&order.indentProgress">{{order.indentProgress}}</view>
				</view>
				<view class="text-center" @click="goSwt(4)" style="position: relative;">
					<image src="../../static/image/my/order3.png" style="width: 52rpx;height: 52rpx;" mode=""></image>
					<view class="text-sm">进行中</view>
					<view class="weinumber" v-if="order&&order.indentWaitPay">{{order.indentWaitPay}}</view>
				</view>
				<view class="text-center" @click="goSwt(5)">
					<image src="../../static/image/my/order5.png" style="width: 52rpx;height: 52rpx;" mode=""></image>
					<view class="text-sm">已完成</view>
				</view>
			</view>
		</view>

		<view class="margin  padding-tb bg-white " style="border-radius: 24rpx;">
			<view class="flex justify-between align-center padding-lr-sm">
				<view class="text-lg text-bold text-black">推荐工具</view>
			</view>
			<view class="flex flex-wrap margin-top-sm">
				<view class="text-center margin-tb-sm" style="width: 25%;" @click="changekefu">
					<image src="../../static/image/my/kefu.png" style="width: 46rpx;height:46rpx;" mode=""></image>
					<view class="text-sm">客服中心</view>
				</view>

				<view class="text-center margin-tb-sm" style="width: 25%;"
					@click="divideScale!=null && divideScale!=0?goNav('/pageA/extension/team'):goNav('/pageA/extension/extension')">
					<image src="../../static/image/my/fx.png" style="width: 46rpx;height: 46rpx;" mode=""></image>
					<view class="text-sm">我的团队</view>
				</view>

				<view class="text-center margin-tb-sm" style="width: 25%;" @click="goRider()">
					<image src="../../static/image/my/ruzhu.png" style="width: 46rpx;height: 46rpx;" mode=""></image>
					<view class="text-sm">司机入驻</view>
				</view>
				<view class="text-center margin-tb-sm" style="width: 25%;" @click="goNav('/pages/my/invitationUser')">
					<image src="../../static/image/my/share.png" style="width: 46rpx;height:46rpx;" mode=""></image>
					<view class="text-sm  ">分享好友</view>
				</view>
				<!-- <view class="text-center margin-tb-sm" style="width: 25%;" @click="goNav('/my/setting/myTousu')"
					v-if="xcxSelect!='否'">
					<image src="../../static/image/my/tousu.png" style="width: 50rpx;height:48rpx;" mode=""></image>
					<view class="text-sm">我的投诉</view>
				</view> -->
				<view class="text-center margin-tb-sm" style="width: 25%;" @click="goNav('/my/setting/myTousu')"
					v-if="xcxSelect!='否'">
					<image src="../../static/image/my/team.png" style="width: 46rpx;height: 46rpx;" mode=""></image>
					<view class="text-sm">我的投诉</view>
				</view>

				<view class="text-center margin-tb-sm" style="width: 25%;" @click="goNav('/my/help/trainingList')">
					<image src="../../static/image/my/yijian.png" style="width: 46rpx;height: 46rpx;" mode=""></image>
					<view class="text-sm">帮助中心</view>
				</view>

				<view class="text-center margin-tb-sm" style="width: 25%;" @click="goNav('/my/feedback/feedback')">
					<image src="../../static/image/my/help.png" style="width: 46rpx;height: 46rpx;" mode=""></image>
					<view class="text-sm">意见反馈</view>
				</view>

				<view class="text-center margin-tb-sm" style="width: 25%;" @click="goNav('/pageA/invoice/invoice')"
					v-if="xcxSelect!='否'">
					<image src="../../static/image/my/team.png" style="width: 46rpx;height: 46rpx;" mode=""></image>
					<view class="text-sm">开具发票</view>
				</view>
				<view class="text-center margin-tb-sm" style="width: 25%;" @click="goNav('/my/setting/jinji')">
					<image src="../../static/image/my/jg.png" style="width: 46rpx;height: 46rpx;" mode=""></image>
					<view class="text-sm">紧急报警</view>
				</view>
				<view class="text-center margin-tb-sm" style="width: 25%;" @click="goNav('/my/setting/index')">
					<image src="../../static/image/my/set.png" style="width: 46rpx;height: 46rpx;" mode=""></image>
					<view class="text-sm">系统设置</view>
				</view>
				<!-- <view class="text-center margin-tb-sm" style="width: 25%;" @click="goNav('/pageA/address/address')">
					<image src="../../static/image/my/9.png" style="width: 55rpx;height: 55rpx;" mode=""></image>
					<view class="text-sm">地址管理</view>
				</view> -->
			</view>
		</view>

		<view class="margin" v-if="divideScale==0" @click="goNav(bgurl)">
			<image :src="bgImg" mode="scaleToFill" style="width:100%;height:246upx;"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				divideScale: '',
				image_url: '../../static/image/logo.png',
				mobile: '',
				checkCertification: -1,
				arr: [],
				showModal: true,
				xcxSelect: '是',

				tuiguang: '',
				tuiguangImg: '',
				appID: '',
				bgImg: '',
				bgurl: '',

				timer: '',
				isLogin: false,
				money: 0, //余额
				couponCount: 0, //优惠劵
				creditScore: 0, //信用分
				order: [], //订单角标
			}
		},
		onLoad() {
			this.xcxSelect = uni.getStorageSync('xcxSelect')
			this.$Request.getT('/app/common/type/248').then(res => { //跑腿师傅端微信小程序APPID 248
				if (res.code === 0) {
					this.appID = res.data.value;
				}
			});
			this.$Request.getT('/app/common/type/22').then(res => { //师傅端域名配置  22
				if (res.code === 0 && res.data && res.data.value) {
					this.url = res.data.value;
				}
			});
			// this.$Request.getT('/app/common/type/310').then(res => { // 我的页面活动图片 310
			// 	if (res.code === 0 && res.data) {
			// 		this.bgImg = res.data.value;
			// 	}
			// });
			// this.$Request.getT('/app/common/type/311').then(res => { // 我的页面活动跳转地址 311
			// 	if (res.code === 0 && res.data) {
			// 		this.bgurl = res.data.value;
			// 	}
			// });
			this.getZiZhi()


		},
		onHide() {
			clearInterval(this.timer)
		},
		onShow() {

			let token = this.$queue.getData("token");
			if (token) {
				this.isLogin = true
				this.getUserInfo();
				this.ordernumber() //订单角标
			} else {
				this.image_url = '../../static/image/logo.png';
				this.mobile = '';
				this.isLogin = false
				this.couponCount = 0
				this.money = 0

				this.order = []
				this.checkCertification = 0
				this.creditScore = 0
			}
		},
		onShareAppMessage(res) { //发送给朋友
			return {
				title: this.tuiguang,
				path: '/pages/index/index',
				imageUrl: this.tuiguangImg,
			}
		},
		onShareTimeline(res) { //分享到朋友圈
			return {
				title: this.tuiguang,
				path: '/pages/index/index',
				imageUrl: this.tuiguangImg,
			}
		},
		methods: {
			//联系客服
			changekefu() {
				let kefu = this.$queue.getData('kefu'); // 用户端联系方式 1 手机号 2企业微信
				let kefuPhone = this.$queue.getData('kefuPhone');
				if (kefu == 1) {
					uni.makePhoneCall({
						phoneNumber: kefuPhone //仅为示例
					});
				} else if (kefu == 2) {
					// #ifdef MP-WEIXIN
					let that = this
					try {
						wx.openCustomerServiceChat({
							extInfo: {
								url: that.$queue.getData('kefuUrl')
							},
							corpId: that.$queue.getData('kefuAppId'),
							success(res) {},
							fail(res) {
								console.error(res)
							}
						})
					} catch (error) {
						console.error("catchcatch" + error)
						uni.showToast({
							title: '请更新至微信最新版本'
						});
					}
					// #endif
					// #ifndef MP-WEIXIN
					let url = this.$queue.getData('kefuUrl');
					if (url.indexOf('/pages/') !== -1 || url.indexOf('/pageA/') !== -1 || url.indexOf('/my/') !== -1) {
						uni.navigateTo({
							url
						});
					} else {
						//#ifndef H5
						uni.navigateTo({
							url: '/pages/index/webView?url=' + url
						});
						//#endif
						//#ifdef H5
						window.location.href = url;
						//#endif
					}
					// #endif
				} else if (kefu == 3) {
					uni.navigateTo({
						url: '/my/kefu/index'
					});
				}
			},
			ordernumber() { //订单角标
				this.$Request.getT('/app/indent/getOrderSubscript').then(res => {
					if (res.code === 0) {
						this.order = res.data
					}
					uni.hideLoading()
				});
			},

			// 分享文案和图片
			getZiZhi() {
				this.$Request.getT('/app/common/type/276').then(res => {
					if (res.code === 0) {
						this.tuiguang = res.data.value;
					}
				});
				this.$Request.getT('/app/common/type/277').then(res => {
					if (res.code === 0) {
						this.tuiguangImg = res.data.value;
					}
				});
			},
			goSwt(e) {
				uni.setStorageSync('current', e)
				setTimeout(function() {
					uni.navigateTo({
						url: '/pages/order/order',
					})
				}, 10)
			},
			goRider() { //司机入驻
				let that = this
				let token = that.$queue.getData("token");
				if (token) {
					// #ifdef MP-WEIXIN
					uni.navigateToMiniProgram({
						appId: that.appID,
						path: '/pages/index/index',
						extraData: {
							'data1': 'test'
						},
						success(res) {
							// 打开成功
							console.log("打开成功")
						}
					})
					// #endif
					// #ifdef H5
					window.location.href = that.url;
					// #endif
					// #ifdef APP
					plus.runtime.openURL(that.url);
					// #endif
				} else {
					that.bindlogin();
				}
			},
			goNav(url) {

				let token = this.$queue.getData("token");
				if (token) {
					uni.navigateTo({
						url: url
					})
				} else {
					this.bindlogin();
				}
			},
			getUserInfo() {
				this.$Request.getT('/app/userinfo/findUserInfoById').then(res => {
					console.log(res)
					if (res.code == 0) {
						if (parseInt(res.data.checkCertification)) {
							this.checkCertification = parseInt(res.data.checkCertification)
						} else {
							this.checkCertification = -1;
						}
						this.couponCount = res.data.couponCount
						this.money = res.data.money
						this.creditScore = res.data.score
						this.$queue.setData("userId", res.data.userId);
						this.$queue.setData("invitationCode", res.data.invitationCode ? res.data.invitationCode :
							'0');
						this.$queue.setData("status", res.data.status);
						this.$queue.setData("nickName", res.data.nickName ? res.data.nickName : res
							.data.userName);
						this.image_url = res.data.avatar ? res.data.avatar : '../../static/image/logo.png';
						this.$queue.setData("image_url", this.image_url);
						this.mobile = res.data.nickName ? res.data.nickName : res.data.userName
						this.divideScale = res.data.divideScale
					}
				});
			},
			bindlogin() {
				let token = this.$queue.getData("token");
				if (!token) {
					uni.navigateTo({
						url: './register'
					})
				}
			},
			bindapprove() {
				let token = this.$queue.getData("token");
				if (token) {
					uni.navigateTo({
						url: '/pages/my/approve/approve'
					})
				} else {
					this.bindlogin();
				}
			},
			binduser() {
				let token = this.$queue.getData('token');
				if (!token) {
					this.bindlogin();
					return;
				}
				uni.navigateTo({
					url: '/pages/my/userinfo'
				});

			},

		}
	}
</script>

<style lang="less">
	.btn {
		font-size: 28upx;
		/* width: 95%; */
		text-align: center;
		background: #FFFFFF;
		margin-top: 6rpx;
	}

	.head {
		background: #ffffff;
		padding-bottom: 5rpx;
		padding-left: 10rpx;
	}



	.head_image image {
		width: 90rpx;
		height: 90rpx;
	}

	.head_name {
		flex: 4;
		position: relative;
	}

	.name {
		position: absolute;
		top: 75rpx;
		font-size: 32rpx;
		font-weight: bold;
	}

	.approve {
		position: absolute;
		top: 100rpx;
		font-size: 24rpx;
		color: #999999;
	}

	/* 列表 */
	.use_list {
		width: 100%;
		background: #ffffff;
		margin-top: 20rpx;
	}

	.list_box {
		width: 90%;
		margin: 0 auto;
		display: flex;
		height: 110rpx;
	}

	.box_left {
		flex: 1;
		display: flex;
		justify-content: left;
		align-items: center;
	}

	.box_right {
		flex: 1;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		color: #808080;
	}

	.use_name {
		margin-left: 30rpx;
		font-size: 32rpx;
	}

	.use_image image {
		width: 50rpx;
		height: 50rpx;
	}

	.weinumber {
		width: 30upx;
		height: 30upx;
		background: red;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		border-radius: 35upx;
		position: absolute;
		top: 0upx;
		right: -10upx;
		z-index: 99;
	}

	.vip {
		margin: 30rpx 30rpx 30rpx;
		height: 110rpx;
		background: linear-gradient(95deg, #428985 0%, #255C59 99%);
		border-radius: 22rpx;
		padding: 0 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #AAE5E5;
	}

	.tabbox {
		display: flex;
		justify-content: space-between;
		padding: 0rpx 30rpx 40rpx;

		.leftbox {
			width: 333rpx;
			height: 170rpx;
			background: rgba(151, 251, 168, 0.3);
			border-radius: 24rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #03A859;
			position: relative;
			padding: 30rpx 30rpx;

			.tit {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #03A859;
				margin-top: 17rpx;
			}

			.image {
				position: absolute;
				bottom: 9rpx;
				right: 0;
				z-index: 9;
			}
		}

		.rightbox {
			width: 333rpx;
			height: 170rpx;
			background: #FFEDEB;
			border-radius: 24rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #FF6956;
			position: relative;
			padding: 30rpx 30rpx;

			.tit {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FF6956;
				margin-top: 17rpx;
			}

			.image {
				position: absolute;
				bottom: 37rpx;
				right: 14rpx;
				z-index: 9;
			}
		}
	}

	.bb {
		text-align: center;

		.num {
			font-size: 38rpx;
			font-family: DINPro;
			font-weight: bold;
			color: #333333;
		}

		.tit {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
		}
	}
</style>