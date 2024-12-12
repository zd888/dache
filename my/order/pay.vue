<template>
	<view class="u-skeleton">
		<view class="headtop"></view>
		<view class="content">
			<view class="stte u-skeleton-fillet">
				<view class="" v-if="order.indentState==0">待支付</view>
				<view class="" v-if="order.indentState==1">待接单</view>
				<view class="" v-if="order.indentState==2">已接单</view>
				<view class="" v-if="order.indentState==3">进行中</view>
				<view class="" v-if="order.indentState==4">已完成</view>
				<view class="" v-if="order.indentState==5">已取消</view>
				<view class="text-lg" v-if="order.indentState==1">正在寻找车主，请等待...</view>
				<view class="text-lg" v-if="order.indentState==2">司机已接单，正在赶往当前地点</view>
				<!-- <view class="text-lg" v-if="order.indentState==2">已有车主接单，支付后完成订单</view> -->
			</view>
			<view class="boxa u-skeleton-fillet">
				<view>
					<view class="addbox bgs margin-lr margin-bottom">
						<view class="add_cont">
							<view class="green"></view>
							<view class="add_tit">{{order.shipAddress}}</view>
						</view>
						<view class="margin-tb-xs">
							<!-- <image src="../static/order_zjt.png" style="width: 46rpx;height: 13rpx;"></image> -->
							<image src="../../static/image/order_jt.png" style="width: 6rpx;height: 24rpx;"></image>
						</view>
						<view class="add_cont">
							<view class="orgin"></view>
							<view class="add_tit">{{order.deliveryAddress}}</view>
						</view>
					</view>
					<!-- <view class="flex align-center justify-end padding-lr">
						<view class="flex align-center">2人乘车</view>
						<view>5月25日 10:20-10:50出发</view>
					</view> -->
				</view>
				<view class="flex align-center justify-between margin-lr"
					v-if="order.indentState!=0&&order.indentState!=1&&order.indentState!=5">
					<view>
						<view class="text-38 text-bold">{{order.licenseNumber}}</view>
						<view class="text-bold margin-top-xs">{{order.carColor}}·{{order.brand}}</view>
						<view class="margin-tb-sm flex align-center" style="color: #999999;font-size: 26rpx;">
							<view>{{order.riderNickName}}</view>
							<view class="margin-lr-sm" style="width: 1rpx;height: 20rpx;background: #A0A0A0;">
							</view>
							<view>接单{{order.completeCount}}次</view>
						</view>
					</view>
					<view>
						<image src="../static/che.png" style="width: 250rpx;height: 111rpx;"></image>
					</view>
				</view>
				<view class="margin-tb-sm" style="width: 100%;height:1rpx;background: #F2F2F2;"></view>
				<view class="flex align-center justify-end margin-lr">
					<!-- <view class="btns" v-if="order.indentState==0" @click="bindorderOff()">取消行程</view> -->
					<!-- <view class="btns">修改行程</view> -->
					<!-- <view class="btn">去支付</view> -->


					<view class="btns" v-if="order.indentState==0||order.indentState==1" @click="bindorderOff()">取消订单</view>
					<!-- <view class="btn2">抵达起点</view> -->
					<!-- <view class="btn margin-left" v-if="order.indentState!=3" @click="backindex()">再来一单</view> -->
					<view class="btn " v-if="order.indentState==0" @click="orderpay()">立即支付</view>

					<view class="btn margin-left" v-if="order.indentState == 4 &&!order.evaluateMessage"
						@click="bindcomment()">去评价</view>
					<view class="btn margin-left" v-if="order.indentState==4" @click="bindtousu()">去投诉</view>
				</view>

			</view>
			<view class="box flex align-center justify-between u-skeleton-fillet">
				<view class="text-lg text-bold">费用合计</view>
				<view class="text-38 text-bold" style="color: #FF4B36;">￥{{order.indentMoney}}</view>
			</view>
			<view class="box u-skeleton-fillet" v-if="order.indentState==4&&order.evaluateMessage">
				<view class="titls margin-bottom-sm">评价</view>
				<!-- <view class="" v-if="order.evaluate==0">满意</view>
						<view class="" v-if="order.evaluate==1">不满意</view> -->
				<view class="margin-top-xs">{{order.evaluateMessage}}</view>
			</view>
			<!-- <view class="chezhu">联系车主接单</view> -->

			<!-- <view class="boxa">
				<view class="margin-lr flex align-center">
					<image src="../../static/image/logo.png" style="width: 90rpx;height: 90rpx;border-radius: 50%;">
					</image>
					<view class="margin-left-sm flex align-center justify-between" style="width: 80%;">
						<view>
							<view class="flex align-center">
								<view class="text-bold">今天09:45</view>
								<view class="margin-left-xs" style="color: #03A859;">99%顺路</view>
							</view>
							<view class="margin-top-xs flex align-center" style="color: #999999;font-size: 26rpx;">
								<view>好先生</view>
								<view class="margin-lr-sm" style="width: 1rpx;height: 20rpx;background: #A0A0A0;">
								</view>
								<view>接单15次</view>
							</view>
						</view>

					</view>
				</view>
				<view class="margin-tb-sm" style="width: 100%;height:1rpx;background: #F2F2F2;"></view>
				<view class="flex align-center justify-between margin-lr margin-top">
					<view class="add_cont">
						<view class="green"></view>
						<view class="">西安·朗臣大厦</view>
					</view>
					<view style="color: #999999;">3.5km</view>
				</view>
				<view class="flex align-center justify-between margin">
					<view class="add_cont">
						<view class="green"></view>
						<view class="">西安·朗臣大厦</view>
					</view>
					<view style="color: #999999;">3.5km</view>
				</view>
				<view class="add_cont margin-lr">
					<image src="../static/pinyou.png" style="width: 24rpx;height: 30rpx;"></image>
					<view class="margin-left-xs">暂无拼友</view>
				</view>

				<view class="margin-tb-sm" style="width: 100%;height:1rpx;background: #F2F2F2;"></view>

				<view class="flex align-center justify-between margin-lr">
					<view style="color: #999999;">正在寻找顺路乘客...</view>
					<view class="btnphone">联系车主</view>
				</view>
			</view> -->

			<view class="box u-skeleton-fillet" style="color: #1C1C1C;">
				<view class="titls">出行信息</view>
				<view class="flex align-center justify-between margin-top">
					<view class="text-gray">出发地点</view>
					<view class="flex align-end justify-between"
						@click="openMap(order.shipAddressLatitude,order.shipAddressLongitude,order.shipAddress)">
						<view class="text-cut" style="margin-top:15rpx;width: 450rpx;text-align: right;">
							<text v-if="order.shipProvince!='北京市'&&order.shipProvince!='天津市'&&order.shipProvince!='上海市'&&order.shipProvince!='重庆市'">{{order.shipProvince}}</text>
							{{order.shipCity}}{{order.shipDistrict}}{{order.shipAddress}}
						</view>
						<image src="../../static/my/add.png" style="width: 25rpx;height: 30rpx;margin-left: 5rpx;">
						</image>
					</view>
				</view>
				<view class="flex align-center justify-between " :class="order.riderPhones?'margin-tb-xl':'margin-top'">
					<view class="text-gray">送达地点</view>
					<view class="flex align-end justify-between"
						@click="openMap(order.deliveryAddressLatitude,order.deliveryAddressLongitude,order.deliveryAddress)">
						<view class="text-cut" style="margin-top:15rpx;width: 450rpx;text-align: right;">
							
							<text v-if="order.deliveryProvince!='北京市'&&order.deliveryProvince!='天津市'&&order.deliveryProvince!='上海市'&&order.deliveryProvince!='重庆市'">{{order.deliveryProvince}}</text>
							{{order.deliveryCity}}{{order.deliveryDistrict}}{{order.deliveryAddress}}
						</view>
						<image src="../../static/my/add.png" style="width: 25rpx;height: 30rpx;margin-left: 5rpx;">
						</image>
					</view>
				</view>
				<!-- <view class="flex align-center justify-between margin-tb-xl">
					<view class="text-gray">预约时间</view>
					<view>2021-06-11 15:58:11</view>
				</view>
				<view class="flex align-center justify-between margin-tb-xl">
					<view class="text-gray">预订人数</view>
					<view>2人</view>
				</view> -->
				<view class="flex align-center justify-between " :class="order.remarks?'margin-tb-xl':''"
					v-if="order.indentState!=0&&order.riderPhones">
					<view class="text-gray">联系方式</view>
					<view @click="bindPhone" style="margin-top:15rpx;">{{order.riderPhones}}
						<image src="../static/phones.png" style="width: 25rpx;height: 32rpx;margin-left: 10rpx;">
						</image>
					</view>
				</view>
				<view class="margin-tb" v-if="order.remarks">
					<view>备注</view>
					<view class="margin-top-xs">{{order.remarks}}</view>
				</view>
			</view>

			<view class="box u-skeleton-fillet" style="color: #1C1C1C;" v-if="content">
				<view class="titls">下单说明</view>
				<view v-html="content" class="margin-top-sm"></view>
			</view>

			<view class="box u-skeleton-fillet" style="color: #1C1C1C;">
				<view class="titls">订单信息</view>
				<view v-if="order.moneyJson">
					<view class="flex align-center justify-between margin-tb" v-if="order.moneyJson.distance">
						<view class="text-gray">总公里数</view>
						<view>{{order.moneyJson.distance}}km</view>
					</view>
					<view class="flex align-center justify-between margin-tb" v-if="order.moneyJson.kilometer">
						<view class="text-gray">基础公里数</view>
						<view>{{order.moneyJson.kilometer}}km</view>
					</view>
					<view class="flex align-center justify-between margin-tb" v-if="order.moneyJson.initMoney">
						<view class="text-gray">基础起步价</view>
						<view>￥{{order.moneyJson.initMoney}}</view>
					</view>
					<view class="flex align-center justify-between margin-tb" v-if="order.moneyJson.metre">
						<view class="text-gray">超出部分公里数</view>
						<view>{{order.moneyJson.metre}}km</view>
					</view>
					<view class="flex align-center justify-between margin-tb" v-if="order.moneyJson.unitOverMoney">
						<view class="text-gray">超出部分每公里价格</view>
						<view>￥{{order.moneyJson.unitOverMoney}}</view>
					</view>
					<view class="flex align-center justify-between margin-tb" v-if="order.moneyJson.otherMoney">
						<view class="text-gray">超出部分收费总金额</view>
						<view>￥{{order.moneyJson.otherMoney}}</view>
					</view>
					<view class="flex align-center justify-between margin-tb" v-if="order.moneyJson.durationAllMoney">
						<view class="text-gray">总时长费</view>
						<view>￥{{order.moneyJson.durationAllMoney}}</view>
					</view>
					<view class="flex align-center justify-between margin-tb" v-if="order.couponMoney">
						<view class="text-gray">优惠劵</view>
						<view>-￥{{order.couponMoney}}</view>
					</view>
				</view>
				<view class="flex align-center justify-between margin-top">
					<view class="text-gray">订单号码</view>
					<view @click.stop="copyClick(order.indentNumber)">{{order.indentNumber}}
						<image src="../static/copy.png" style="width:28rpx;height: 28rpx;"></image>
					</view>
				</view>
				<view class="flex align-center justify-between margin-top">
					<view class="text-gray">下单时间</view>
					<view>{{order.createTime}}</view>
				</view>
				<view class="flex align-center justify-between margin-top" v-if="order.indentState==4">
					<view class="text-gray">支付方式</view>
					<view v-if="order.modeOfPayment==1">微信支付</view>
					<view v-if="order.modeOfPayment==2">支付宝支付</view>
					<view v-if="order.modeOfPayment==0">余额支付</view>
				</view>
			</view>

		</view>

		<u-popup v-model="showpay" mode="bottom">
			<view class="popup_pay">
				<view class=" margin-top padding-lr radius">
					<view style="padding: 0 20upx;margin-top: 36rpx;">
						<view
							style="display: flex;height: 100upx;align-items: center;padding: 20upx 0;justify-content: center;"
							v-for="(item,index) in openLists" :key='index'>
							<image :src="item.image" style="width: 55upx;height: 55upx;border-radius: 50upx;">
							</image>
							<view style="font-size: 30upx;margin-left: 20upx;width: 70%;">
								{{item.name}}
							</view>
							<radio-group name="openWay" style="margin-left: 45rpx;" @tap='selectWay(item)'>
								<label class="tui-radio">
									<radio color="#3699FF" :checked="openWay == item.id ? true : false" />
								</label>
							</radio-group>
						</view>
					</view>
				</view>
				<view class="pay_btns" @click="pay()">确认支付</view>
			</view>
		</u-popup>

		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF" style="height: 100vh;"></u-skeleton>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading: true, // 是否显示骨架屏组件
				indentNumber: '',
				order: [],
				showpay: false,
				openWay: 1,
				openLists: [],
				creditScore: 0,
				AllcreditScore: 0,
				content: ''
			}
		},
		onLoad(option) {
			if (option.indentNumber) {
				this.indentNumber = option.indentNumber
				this.getDetail()
			}

			// #ifdef MP-WEIXIN
			this.openLists = [{
				id: 1,
				image: '../../static/image/icon_weixin.png',
				name: '微信'
			}, {
				id: 3,
				image: '../../static/image/jinbi.png',
				name: '余额'
			}]
			// #endif
			// #ifdef H5
			let ua = navigator.userAgent.toLowerCase();
			if (ua.indexOf('micromessenger') !== -1) {
				//公众号是否自动登录  419
				this.$Request.get('/app/common/type/419').then(res => {
					if (res.data && res.data.value && res.data.value == '是') {
						this.openLists = [{
							id: 2,
							image: '../../static/image/zhifubao.png',
							name: '支付宝'
						}, {
							id: 1,
							image: '../../static/image/icon_weixin.png',
							name: '微信'
						}, {
							id: 3,
							image: '../../static/image/jinbi.png',
							name: '余额'
						}];
						this.openWay = 3;
					} else {
						this.openLists = [{
							id: 2,
							image: '../../static/image/zhifubao.png',
							name: '支付宝'
						}, {
							id: 3,
							image: '../../static/image/jinbi.png',
							name: '余额'
						}];
						this.openWay = 3;
					}
				})
			} else {
				this.openLists = [{
					id: 2,
					image: '../../static/image/zhifubao.png',
					name: '支付宝'
				}, {
					id: 3,
					image: '../../static/image/jinbi.png',
					name: '余额'
				}];
				this.openWay = 3;
			}
			// #endif
			// #ifdef APP-PLUS
			this.openLists = [{
					id: 1,
					image: '../../static/image/icon_weixin.png',
					name: '微信'
				},
				{
					id: 2,
					image: '../../static/image/zhifubao.png',
					name: '支付宝'
				}, {
					id: 3,
					image: '../../static/image/jinbi.png',
					name: '余额'
				}
			]
			this.openWay = 1
			// #endif
			let that = this
			that.$Request.getT('/app/common/type/364').then(res => { // 每次取消扣除的信用分数量 364
				if (res.code == 0) {
					if (res.data && res.data.value) {
						that.creditScore = res.data.value
					}
				}
			})
			that.$Request.getT('/app/common/type/365').then(res => { // 低于多少不能接单和下单 365
				if (res.code == 0) {
					if (res.data && res.data.value) {
						that.AllcreditScore = res.data.value
					}
				}
			})
			that.$Request.getT('/app/common/type/369').then(res => { // 下单说明
				if (res.code == 0) {
					if (res.data && res.data.value) {
						that.content = res.data.value
					}
				}
			})
		},
		onShow() {

		},
		methods: {
			copyClick(copy) {
				uni.setClipboardData({
					data: copy,
					success: function(res) {
						uni.getClipboardData({
							success: function(res) {
								uni.showToast({
									title: "复制成功",
									icon: 'none',
								});
							},
						});
					},
				});
			},
			// 一键导航
			openMap(latitude, longitude, name) {
				uni.openLocation({
					latitude: latitude - 0, //要去的纬度-地址       
					longitude: longitude - 0, //要去的经度-地址
					name: name, //地址名称
					address: name, //详细地址名称
					success: function() {
						console.log('导航成功');
					},
					fail: function(error) {
						console.log(error)
					}
				});
			},
			goriderMap() { //查看司机位置
				uni.navigateTo({
					url: '/my/order/orderMap?indentNumber=' + this.order.indentNumber
				})
			},
			// 去评价
			bindcomment(e) {
				uni.navigateTo({
					url: '/my/order/comments?indentNumber=' + this.order.indentNumber + '&riderUserId=' + this
						.order.riderUserId
				})
			},
			bindtousu(e) { //投诉
				uni.navigateTo({
					url: '/my/order/complaint?indentNumber=' + this.order.indentNumber + '&riderUserId=' + this
						.order.riderUserId
				})
			},
			selectWay: function(item) {
				this.openWay = item.id;
			},
			orderpay() {
				this.showpay = true
			},
			bindPhone() {
				uni.makePhoneCall({
					phoneNumber: this.order.riderPhone //仅为示例
				});
			},
			getDetail() {
				let data = {
					indentNumber: this.indentNumber
				}
				this.$Request.getT('/app/indent/userIndentMessage', data).then(res => {
					if (res.code === 0) {
						this.order = res.data
						console.log(this.order,'========')
						if (this.order.moneyJson) {
							let moneyJson = JSON.parse(this.order.moneyJson)
							this.order.moneyJson = moneyJson
						}

						if (this.order.riderPhone) {
							let mobile = this.order.riderPhone
							this.order.riderPhones = mobile.substring(0, 3) + "****" + mobile.substring(7)
						}
					}
					uni.hideLoading()
					this.loading = false
				});
			},
			backindex() {
				uni.navigateTo({
					url: '/pages/index/index'
				})
			},
			// 取消订单
			bindorderOff() {
				let content = ''
				if (this.order.indentState == 2) {
					content = '师傅接单后5分钟内可取消，取消订单将会扣除信用分' + this.creditScore + '分,信用分低于' + this.AllcreditScore +
						'分无法下单，是否取消？'
				} else {
					content = '确定取消订单？'
				}
				uni.showModal({
					title: '温馨提示',
					content: content,
					showCancel: true,
					cancelText: '取消',
					confirmText: '确认',
					success: res => {
						if (res.confirm) {
							this.$Request.postT('/app/indent/userCancelIndent?indentNumber=' + this
									.indentNumber)
								.then(res => {
									if (res.code == 0) {
										uni.showToast({
											title: '订单取消成功'
										});
										this.getDetail()
									} else {
										uni.hideLoading();
										uni.showModal({
											showCancel: false,
											title: '订单失败',
											content: res.msg
										});
									}
								});
						}
					}
				});
			},
			pay() {
				if (this.openWay == 0) {
					this.$queue.showToast('请选择支付方式!')
					return;
				}
				if (this.openWay == 1) {
					console.log('微信')
					// #ifdef APP-PLUS
					// 微信APP支付 根据订单id获取支付信息
					let data = {
						indentId: this.order.indentId
					}
					this.$Request.postT("/app/wxPay/payAppOrder", data).then(res => {
						// console.log(JSON.stringify(res), '微信支付信息')
						this.isCheckPay(res.code, 'wxpay', JSON.stringify(res.data));
					});
					// #endif
					// #ifdef MP-WEIXIN
					let that = this
					let data = {
						indentId: that.order.indentId
					}
					that.$Request.postT("/app/wxPay/wxPayJsApiOrder", data).then(res => {
						if (res.code == 0) {
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: res.data.timestamp,
								nonceStr: res.data.noncestr,
								package: res.data.package,
								signType: res.data.signType,
								paySign: res.data.sign,
								success: function(res) {
									console.log(res)
									uni.hideLoading();
									uni.showToast({
										title: '实名认证提交成功',
										icon: 'none'
									});
									setTimeout(function() {
										uni.navigateBack(1)
									}, 1000)
								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
									uni.hideLoading();
									that.$queue.showToast('支付失败');
								}
							});
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					});
					// #endif

					// #ifdef H5
					// 微信h5支付 根据订单id获取支付信息
					let ua = navigator.userAgent.toLowerCase();
					if (ua.indexOf('micromessenger') !== -1) { //微信里打开
						let data = {
							indentId: this.order.indentId
						}
						this.$Request.postT('/app/wxPay/wxPayMpOrder', data).then(res => {
							if (res.code == 0) {
								console.log()
								this.callPay(res.data);
							} else {
								uni.showToast({
									icon: 'none',
									title: '支付失败!'
								});
							}
						});
					}
					// #endif
				} else if (this.openWay == 2) {
					// APP支付宝支付
					// #ifdef H5
					// this.form.payType = 5
					let data = {
						indentId: this.order.indentId
					}
					this.$Request.postT('/app/aliPay/payH5Order', data).then(
						res => {
							if (res.code == 0) {
								const div = document.createElement('div')
								div.innerHTML = res.data //此处form就是后台返回接收到的数据
								document.body.appendChild(div)
								document.forms[0].submit()
							} else {
								uni.showToast({
									icon: 'none',
									title: '支付失败!'
								});
							}
						});
					// #endif

					// #ifdef APP
					// this.form.payType = 4
					let data = {
						indentId: this.order.indentId
					}
					this.$Request.postT("/app/aliPay/payAppOrder", data).then(res => {
						console.log(JSON.stringify(res), '支付宝支付信息')
						this.isCheckPay(res.code, 'alipay', res.data)
					});
					// #endif
				} else if (this.openWay == 3) {
					this.showpay = false
					uni.showModal({
						title: '温馨提示',
						content: '确定使用余额支付？',
						showCancel: true,
						cancelText: '取消',
						confirmText: '确认',
						success: res => {
							if (res.confirm) {
								uni.showLoading({
									title: '支付中...'
								})
								this.$Request.postT('/app/userMoney/moneyPayIndent?indentId=' + this
										.order.indentId)
									.then(res => {
										if (res.code == 0) {
											uni.showToast({
												title: '订单支付成功'
											});
											setTimeout(function() {
												uni.navigateBack()
											}, 1000)

										} else {
											uni.hideLoading();
											uni.showModal({
												showCancel: false,
												title: '提示',
												content: res.msg
											});
										}
									});
							}
						}
					});

				}
			},
			callPay: function(response) {
				if (typeof WeixinJSBridge === "undefined") {
					if (document.addEventListener) {
						document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(response), false);
					} else if (document.attachEvent) {
						document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady(response));
						document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady(response));
					}
				} else {
					this.onBridgeReady(response);
				}
			},
			onBridgeReady: function(response) {
				let that = this;
				// if (!response.package) {
				// 	return;
				// }
				console.log(response, 111111)
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', {
						"appId": response.appid, //公众号名称，由商户传入
						"timeStamp": response.timestamp, //时间戳，自1970年以来的秒数
						"nonceStr": response.noncestr, //随机串
						"package": response.package,
						"signType": response.signType, //微信签名方式：
						"paySign": response.sign //微信签名
					},
					function(res) {
						console.log(res, '/*-/*-/*-')
						if (res.err_msg === "get_brand_wcpay_request:ok") {
							// 使用以上方式判断前端返回,微信团队郑重提示：
							//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
							uni.showLoading({
								title: '支付成功'
							});
							setTimeout(function() {
								uni.hideLoading();
								uni.navigateBack()
							}, 1000);
						} else {
							uni.hideLoading();
						}
						WeixinJSBridge.log(response.err_msg);
					}
				);
			},
			isCheckPay(status, name, order) {
				if (status == 0) {
					this.setPayment(name, order);
				} else {
					uni.hideLoading();
					uni.showToast({
						title: '支付信息有误',
						icon: 'none'
					});
				}
			},
			setPayment(name, order) {
				console.log(name, '*-*-*', order)
				uni.requestPayment({
					provider: name,
					orderInfo: order, //微信、支付宝订单数据
					success: function(res) {
						console.log(res)
						uni.hideLoading();
						uni.showLoading({
							title: '支付成功'
						});
						setTimeout(function() {
							uni.navigateBack()
						}, 1000);
					},
					fail: function(err) {
						console.log(err)
						uni.hideLoading();
					},
					complete() {
						uni.hideLoading();
					}
				});
			},
		}
	}
</script>

<style lang="less">
	page {
		background: #F5F5F5;
	}

	.headtop {
		width: 100%;
		height: 325rpx;
		background: linear-gradient(to bottom, #06C484 5%, #F5F5F5 90%);
		position: fixed;
		/* #ifdef H5 */
		top: 90rpx;
		/* #endif */
		/* #ifndef H5 */
		top: 0;
		/* #endif */
		z-index: 1;
	}

	.content {
		position: relative;
		z-index: 99;
	}


	.stte {
		font-size: 38rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		padding: 40rpx 0 10rpx 40rpx;
	}

	.boxa {
		background: #FFFFFF;
		border-radius: 24rpx;
		margin: 30rpx;
		padding: 30rpx 0;
	}

	.box {
		background: #FFFFFF;
		border-radius: 24rpx;
		padding: 30rpx;
		margin: 30rpx;

	}

	.titls {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
	}

	.bb {
		width: 110rpx;
		height: 38rpx;
		// background: #49A5FF;
		// opacity: 0.32;
		background-color: rgba(159, 248, 196, 0.3);
		border-radius: 4rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #06C484;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 10rpx;
	}

	.addbox {
		// display: flex;
		// align-items: center;
		// justify-content: space-between;
		padding: 0 30rpx;
		// height: 110rpx;
		border-radius: 16rpx;
		background: #F1FFFC;
		border: 1rpx solid #06C484;
		padding: 30rpx;
	}

	.add_cont {
		display: flex;
		align-items: center;
	}

	.add_tit {
		width: 550rpx;
		font-size: 31rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #1A1A1A;
	}


	.green {
		width: 16rpx;
		height: 16rpx;
		background: #1FC657;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.orgin {
		width: 16rpx;
		height: 16rpx;
		background: #FBAC04;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.btn {
		width: 150rpx;
		height: 58rpx;
		background: #F1FFFC;
		border: 1rpx solid #03A859;
		border-radius: 29rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #03A859;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.btns {
		width: 150rpx;
		height: 58rpx;
		border: 1rpx solid #CCCCCC;
		border-radius: 29rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 20rpx;
	}

	.chezhu {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		margin: 0 30rpx;
	}

	.btnphone {
		width: 150rpx;
		height: 58rpx;
		background: #03A859;
		border-radius: 29rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}

	/* 支付弹框 */
	.popup_pay {
		width: 100%;
	}

	.pay_btns {
		width: 90%;
		margin: 0 auto 40rpx;
		text-align: center;
		background: #06C484;
		height: 80rpx;
		border-radius: 16rpx;
		color: #ffffff;
		line-height: 80rpx;
		margin-top: 20rpx;
	}
</style>