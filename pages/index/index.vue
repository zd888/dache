<template>
	<view>
		<view class="">
			<!-- 顶部导航栏 -->
			<view class="headTop">
				<view class="flex align-center headbox" v-if="isDw&&!ordershow&&!driverShow">
					<view @click="goMy()">
						<image :src="image_url" style="width:55rpx;height: 55rpx;border-radius: 55rpx;"></image>
					</view>
					<view class="flex align-center margin-left-sm" @click="openMap()">
						<view>{{city}}</view>
						<image src="../../static/image/right.png" style="width: 14rpx;height: 22rpx;margin-left: 8rpx;">
						</image>
					</view>
				</view>
				<view v-else @click="openFest()">
					<image src="../../static/image/icon_back.png" style="width:60rpx;height: 60rpx;margin-left: 8rpx;">
					</image>
				</view>
			</view>

			<view class="page-body">
				<view class="page-section page-section-gap">
					<map id="map" style="width: 100%; "
						:style="driverShow?'height: 85vh':(ordershow&&haveorder.length==0?'height:60vh':(ordershow&&haveorder.length!=0?'height:53vh':(popupshow?'height:68vh':(popupshow&&haveorder.length!=0?'height:80vh':'height:68vh'))))"
						:latitude="latitude" :longitude="longitude" :markers="covers" :show-location="true"
						:polyline="polyline">
					</map>
				</view>
			</view>

			<view class="controls-title"
				:style="driverShow?'height: 15vh':(ordershow&&haveorder.length==0?'height:40vh':(ordershow&&haveorder.length!=0?'height:47vh':(popupshow?'height:32vh':(popupshow&&haveorder.length!=0?'height:20vh':'height:32vh'))))">
				<view :style="haveorder.length!=0?'height:30rpx':''"></view>
				<view class="orderb" v-if="haveorder.length!=0&&!driverShow" @click="goOrerDer()">
					<view>您当前有一个正在进行的订单</view>
					<view class="flex align-center">
						<view class="text-sm">立即查看</view>
						<image src="../../static/image/go.png" style="width: 14rpx;height: 24rpx;margin-left: 5rpx;">
						</image>
					</view>
				</view>

				<view class="controls-box" v-if="popupshow">
					<view class="addbox " :class="tabIndex==0?'bg':''" @click="changeAdd(1)">
						<view class="add_cont">
							<view class="green"></view>
							<view class="" v-if="addlist.length==0">正在获取上车点...</view>
							<view class="add_tit" v-else>
								<view class="flex align-center">
									从<view class="text-cut" style="color: #346EF6;max-width: 470rpx;">
										{{addlist.address}}
									</view>出发
								</view>
								<view class="text-sm" style="color: #999999;font-weight: 500;margin-top: 5rpx;"
									v-if="riderNumber">
									附近有{{riderNumber}}个司机
								</view>
							</view>
						</view>
						<view>
							<image src="../../static/image/go.png" style="width: 16rpx;height: 25rpx;">
							</image>
						</view>
					</view>

					<view class="addbox " :class="tabIndex==1?'bg':''" @click="changeAdd(2)">
						<view class="add_cont">
							<view class="orgin"></view>
							<view class="add_tit" v-if="addlists.length==0">您要去哪儿</view>
							<view class="add_tit" v-else>{{addlists.address}}</view>
						</view>
						<view>
							<image src="../../static/image/go.png" style="width: 16rpx;height: 25rpx;">
							</image>
						</view>
					</view>

					<view class="margin-lr flex align-center justify-between flex-wrap padding-bottom">
						<view v-for="(item,index) in bannerList" :key="index"
							:style="bannerList.length>=3?'margin-bottom:20rpx;':''">
							<image :src="item.imageUrl" style="width: 331rpx;border-radius: 8upx;height: 133upx;"
								@click="goWeb(item.url)" mode="scaleToFill"></image>
						</view>
					</view>
				</view>
				<view v-if="ordershow">
					<view class="controls-box">
						<view class="padding ">
							<view class="text-lg text-bold text-center">您好，预估里程时长{{basicPrice.duration}}分钟</view>
							<view class="text-center text-lg margin-top">预估
								<text class="text-bold" style="font-size: 48rpx;">{{basicPrice.allMoney}}</text>元
							</view>

							<view class="flex align-center justify-between " style="width: 50%;margin: 0 auto;">
								<view class="flex align-center justify-center margin-top" @click="openmingxi">
									<view class="text-sm" style="color: #999999;">查看明细</view>
									<image src="../../static/image/go.png"
										style="width: 10rpx;height: 15rpx;margin-left: 8rpx;">
									</image>
								</view>
								<view class="flex align-center justify-center margin-top" @click="openRemk">
									<view class="text-sm" style="color: #999999;">备注</view>
									<image src="../../static/image/go.png"
										style="width: 14rpx;height: 21rpx;margin-left: 8rpx;">
									</image>
								</view>
							</view>
						</view>
					</view>

					<view class="flex align-center justify-center margin-lr margin-top-xs" @click="openYouhui">
						{{-couponName?-couponName:'使用优惠劵'}}
						<image src="../../static/image/right.png" style="width: 14rpx;height: 24rpx;margin-left: 5rpx;">
						</image>
					</view>

					<view class="flex align-center justify-center padding-top">
						<view class="flex align-center " style="font-size: 26upx;">
							<image v-if="showAgree" @tap="isShowAgree"
								src="https://api.shengqianxiong.com.cn/img/20201112/669aa8946cfb4ebdb459d57193c0ebca.png"
								style="width: 32upx;height: 32upx;"></image>
							<image v-else @tap="isShowAgree"
								src="https://api.shengqianxiong.com.cn/img/20201112/1e9102fc891f4d86a13c7b2ba6921cba.png"
								style="width: 32upx;height: 32upx;"></image>
							<view class="margin-left-xs">我已阅读并同意<text style="color: #03A859;"
									@click="goWeb('/my/setting/sijixieyi')">《打车服务协议》</text></view>
						</view>
					</view>
					<view class="btn" @click="payorder()">立即呼叫</view>
				</view>

				<view class="controls-title" style="background: #FFFFFF;" v-if="driverShow">
					<view class=" flex align-start justify-between" style="padding: 40rpx 30rpx 40rpx;">
						<view>
							<view class="text-bold" style="font-size: 40rpx;">正在为您全力寻找司机</view>
							<view class="text-lg flex align-center margin-top-xs">已等待
								<smh-timer ref="timer" @timing="timing" :auto="true"></smh-timer>
							</view>
						</view>
						<view class="qxdj" @click="qxshow = true">取消打车</view>
					</view>
				</view>
			</view>



		</view>
		<!-- 新人红包弹框 -->
		<u-popup v-model="HBShow" mode="center" border-radius="14" width="480rpx" :closeable="true"
			bgColor="rgba(0,0,0,0)">
			<view class=" text-center">
				<image src="../../static/image/hb_bg.png" mode="widthFix" class="hb_img" @click="takemoney()"></image>
			</view>
		</u-popup>

		<!-- 当前正在进行弹框 -->
		<u-popup v-model="hoveorderShow" mode="center" border-radius="14" width="480rpx" :closeable="true"
			bgColor="rgba(0,0,0,0)">
			<view class=" text-center">
				<image src="../../static/image/hoveorderbg.png" class="hoveorderimg" mode="widthFix"
					@click="goOrerDer()"></image>
			</view>
		</u-popup>

		<u-popup v-model="dfkshow" mode="center" border-radius="14" width="480rpx" :closeable="true"
			bgColor="rgba(0,0,0,0)">
			<view class=" text-center">
				<image src="https://dache.xianmxkj.com/file/uploadPath/2024/01/15/95e4106d5ce608a1ec642736bf3d3a4f.png"
					class="hoveorderimg" mode="widthFix" @click="gofikkuan()"></image>
			</view>
		</u-popup>
		<!-- 	<u-popup v-model="dfkshow" mode="center" border-radius="14" width="560rpx" :closeable="true" bgColor="#FFFFFF">
			<view class="padding text-center">
				<image src="../../static/image/qxdj.png" style="width: 406rpx;height: 181rpx;"></image>
				<view class="margin-top" style="font-size: 34rpx;font-weight: bold;">
					<view style="font-size: 32rpx;font-weight: bold;">您有待付款订单</view>
					<view>请先去完成付款</view>
				</view>
				<view class="czbtn" @click="gofikkuan">去付款</view>
			</view>
		</u-popup> -->

		<u-popup v-model="qxshow" mode="center" border-radius="14" width="580rpx" :closeable="true" bgColor="#FFFFFF">
			<view class="padding text-center">
				<image src="../../static/image/qxdj.png" style="width: 406rpx;height: 181rpx;"></image>
				<view class="margin-top-sm" style="font-size: 34rpx;font-weight: bold;">
					取消后重新呼叫可能会耽
					误您的出行时间，是否要取消？
				</view>
				<view class="flex justify-between margin-top-60">
					<view class="btns" @click="qxshow=false">暂不取消</view>
					<view class="btnss" @click="bindorderOff">确认取消</view>
				</view>
			</view>
		</u-popup>

		<u-popup v-model=" moneyShow" mode="center" width="520rpx" border-radius="24" :closeable="true"
			bgColor="#FFFFFF">
			<view class="padding-tb">
				<view class="text-lg text-bold text-center ">价格明细</view>
				<view class="margin-top">
					<view class="margin-bottom-xs" style="padding-left: 70rpx;">总费用：￥{{basicPrice.allMoney}}</view>
					<view style="width: 100%;height: 1rpx;background: #b5b7ba;margin:20rpx 0;"></view>
					<view class="margin-bottom-xs" style="padding-left: 70rpx;">总公里数：{{basicPrice.distance}}km</view>
					<view style="width: 100%;height: 1rpx;background: #b5b7ba;margin:20rpx 0;"></view>
					<view class="margin-bottom-xs" style="padding-left: 70rpx;">基础公里数：{{basicPrice.kilometer}}km</view>
					<view style="width: 100%;height: 1rpx;background: #b5b7ba;margin:20rpx 0;"></view>
					<view class="margin-bottom-xs" style="padding-left: 70rpx;">基础起步价：￥{{basicPrice.initMoney}}</view>
					<view style="width: 100%;height: 1rpx;background: #b5b7ba;margin:20rpx 0;"></view>
					<view class="margin-bottom-xs" style="padding-left: 70rpx;">超出部分公里数：{{basicPrice.metre}}km</view>
					<view style="width: 100%;height: 1rpx;background: #b5b7ba;margin:20rpx 0;"></view>
					<view class="margin-bottom-xs" style="padding-left: 70rpx;">超出部分每公里价格：￥{{basicPrice.unitOverMoney}}
					</view>
					<view style="width: 100%;height: 1rpx;background: #b5b7ba;margin:20rpx 0;"></view>
					<view class="margin-bottom-xs" style="padding-left: 70rpx;">超出部分收费总金额：￥{{basicPrice.otherMoney}}
					</view>
					<view style="width: 100%;height: 1rpx;background: #b5b7ba;margin:20rpx 0;"></view>
					<view class="margin-bottom-xs" style="padding-left: 70rpx;" v-if="basicPrice.isNight==1">当前是夜间时段
					</view>
					<view style="width: 100%;height: 1rpx;background: #b5b7ba;margin:20rpx 0;"
						v-if="basicPrice.isNight==1"></view>
					<view class="margin-bottom-xs" style="padding-left: 70rpx;" v-if="basicPrice.isBeforeDawn==1">
						当前是凌晨时段 </view>
					<view style="width: 100%;height: 1rpx;background: #b5b7ba;margin: 20rpx 0;"
						v-if="basicPrice.isBeforeDawn==1"></view>
					<view class="margin-bottom-xs" style="padding-left: 70rpx;">预估总时长费：￥{{basicPrice.durationAllMoney}}
					</view>
					<view style="width: 100%;height: 1rpx;background: #b5b7ba;margin:20rpx 0;"></view>
					<view style="padding-left: 70rpx;">每分钟时长费：￥{{basicPrice.durationMoney}}</view>
				</view>

			</view>
		</u-popup>
		<!-- 优惠劵弹框 -->
		<u-popup v-model="youhuiShow" mode="bottom" border-radius="14" height="650rpx" :closeable="true">
			<view style="padding: 30rpx 30rpx 50rpx 30rpx;background: #F5F8FC;">
				<view class="text-lg text-bold text-center">优惠劵</view>
				<view class="flex align-center justify-end">
					<view class="deteJuan" @click="deteYouhuj">不使用优惠劵</view>
				</view>
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper"
					@scrolltolower="lower" @scroll="scroll">
					<view class="money_box" v-for="(item,index) in youhuiList" :key="index">
						<view class="box_tit">
							<view class="money_name">{{item.couponName}}</view>
							<view class="money_price"><text>￥</text>{{item.money}}</view>
						</view>
						<view class="money_data" v-if="item.expirationTime">有效期至{{item.expirationTime}}
						</view>
						<view class="money_data" v-else>永久有效</view>
						<view class="money_line">
							<u-line direction="row" color="#E6E6E6" border-style="dashed" />
						</view>
						<view class="box_bottom">
							<view class="money_use">满{{item.minMoney}}元可使用</view>
							<view class="money_btn">
								<view class="lj_use" @click="useryouhui(item)">
									立即使用
								</view>
							</view>
						</view>
					</view>
				</scroll-view>

			</view>
		</u-popup>
		<!-- 备注弹框 -->
		<u-popup v-model="remkShow" mode="bottom" border-radius="14" :closeable="true">
			<view style="padding: 30rpx 30rpx 50rpx 30rpx;">
				<view class="text-lg text-bold text-center">备注</view>
				<view class="margin-top-xl" style="background: #F5F8FC;padding: 20rpx 25rpx;border-radius: 24rpx;">
					<u-input v-model="remarks" type="textarea" maxlength="100" placeholder="请输入备注(备注车型或者要求驾照,100字以内)"
						height="240" />
				</view>
				<view class="remkbtn" @click="remkShow = false">确定</view>
			</view>
		</u-popup>

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
							<radio-group name="openWay" style="margin-left: 45rpx;" @tap='selectWay(item.id )'>
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
	</view>
</template>

<script>
	// 引入SDK核心类，地图组件
	import QQMapWX from '@/components/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js'
	export default {
		data() {
			return {
				image_url: "../../static/image/logo.png",
				is_focus: false,
				remarks: '', //需求备注
				HBShow: false,
				modelDet: {},
				bannerList: [],

				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: '',
				longitude: '',
				qqmapsdk: {}, // 腾讯地图小程序的SDK
				covers: [], // 地图上面的标记点
				to: { // 目的地坐标
					latitude: '',
					longitude: '',
				},
				polyline: [], //路线
				polylines: '',

				tabIndex: 1,
				addlist: [], //出发地址
				addressId: '',
				addlists: [], //目的地
				addressIds: "",
				riderNumber: '',
				// 用户红包
				newUserFlag: 2,
				token: '',
				tuiguang: '',
				tuiguangImg: '',
				arr: [],
				showModal1: true,
				invitationCode: '',

				city: '',
				showAgree: false, //协议是否选择
				payshow: false,
				qxshow: false,

				driverShow: false,
				timer: '',
				hoveorderShow: false, //正在进行订单
				isFist: true, //首次进来获取正在进行订单
				moneyShow: false, //价格明细弹框
				basicPrice: [], //基础价格
				popupshow: true, //首页底部
				ordershow: false, //下单底部
				isDw: true,
				youhuiList: [], //优惠劵
				couponName: '',
				couponId: '',
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				remkShow: false, //备注弹框
				remarks: '',


				youhuiShow: false, //优惠劵弹框
				haveorder: [], //正在进行订单

				showpay: false,
				openWay: 1,
				openLists: [],
				indentId: '',
				dfkshow: false,
				dfkOrder: []
			}
		},
		onLoad(e) {
			let that = this
			// #ifdef MP-WEIXIN
			if (e.scene) {
				const scene = decodeURIComponent(e.scene);
				that.$queue.setData('inviterCode', scene.split(',')[0]);
			}
			// #endif

			// 获取邀请码保存到本地
			if (e.invitation) {
				that.$queue.setData('inviterCode', e.invitation);
			}
			that.$Request.getT('/app/common/type/128').then(res => {
				if (res.code == 0 && res.data && res.data.value) {
					that.key = res.data.value
					// 实例化API核心类
					that.qqmapsdk = new QQMapWX({
						key: that.key // 自己申请的key值
					})
				}
			});

			uni.getLocation({
				type: 'gcj02',
				geocode: true, //设置该参数为true可直接获取经纬度及城市信息
				success: function(res) {
					console.log(res, '地理位置')
					that.latitude = res.latitude
					that.longitude = res.longitude
					uni.setStorageSync('latitude', res.latitude)
					uni.setStorageSync('longitude', res.longitude)
					that.getAdd(that.longitude, that.latitude)
					// #ifdef APP-PLUS
					that.city = res.address.city
					uni.setStorageSync('city', res.address.city)
					that.selectCity(that.longitude, that.latitude);
					// #endif

					// #ifdef H5
					that.selectCity(that.longitude, that.latitude);
					// #endif

					// #ifdef MP-WEIXIN
					let add
					uni.request({
						url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + that.latitude +
							',' + that.longitude + '&key=' + that.key,
						success(re) {
							if (re.statusCode === 200) {
								if (re.data.status == 121) {
									that.selectCity(that.longitude, that.latitude);
								} else {
									let citydata = re.data.result.address_component.city
									console.log("获取城市名称成功", citydata)
									that.city = citydata ? citydata : '未知'
									uni.setStorageSync('city', citydata)
									add = {
										// address: res.data.province + res.data.city + res.data.district, //地址
										address: re.data.result.address_reference.landmark_l2
											.title,
										lng: that.longitude, //地址经度
										lat: that.latitude, //地址维度
										addressId: '',
										addressDefault: '',
										province:re.data.result.address_component.province, //出发-省
										city:re.data.result.address_component.city, //出发-市
										county:re.data.result.address_component.district, //出发-区
									}
									that.addlist = add
									that.covers = [{
										id: 1,
										latitude: that.latitude,
										longitude: that.longitude,
										iconPath: '../../static/image/qi.png',
										width: 32,
										height: 44,
										callout: { //自定义标记点上方的气泡窗口 点击有效
											content: re.data.result.address_reference
												.landmark_l2
												.title, //文本
											color: '#FFFFFF', //文字颜色
											fontSize: 12, //文本大小
											padding: 10, //附近留白
											borderRadius: 36, //边框圆角
											bgColor: '#03A859', //背景颜色
											display: 'ALWAYS', //常显
											boxShadow: 'none !important',

										},
									}]
								}
							} else {
								console.log("获取信息失败，请重试！")
							}
						}
					});
					// #endif
				},
				fail: function() {
					console.log('获取地址失败')
				}
			})

			// #ifdef MP-WEIXIN
			that.openLists = [{
				id: 1,
				image: '../../static/image/icon_weixin.png',
				name: '微信'
			}, {
				id: 3,
				image: '../../static/image/jinbi.png',
				name: '余额'
			}]
			that.openWay = 1
			// #endif
			// #ifdef H5
			let ua = navigator.userAgent.toLowerCase();
			if (ua.indexOf('micromessenger') !== -1) {
				//公众号是否自动登录  419
				that.$Request.get('/app/common/type/419').then(res => {
					if (res.data && res.data.value && res.data.value == '是') {
						that.openLists = [{
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
						that.openWay = 3;
					} else {
						that.openLists = [{
							id: 2,
							image: '../../static/image/zhifubao.png',
							name: '支付宝'
						}, {
							id: 3,
							image: '../../static/image/jinbi.png',
							name: '余额'
						}];
						that.openWay = 3;
					}
				})
			} else {
				that.openLists = [{
					id: 2,
					image: '../../static/image/zhifubao.png',
					name: '支付宝'
				}, {
					id: 3,
					image: '../../static/image/jinbi.png',
					name: '余额'
				}];
				that.openWay = 3;
			}
			// #endif
			// #ifdef APP-PLUS
			that.openLists = [{
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
			that.openWay = 1
			// #endif
		},
		onShow() {
			this.getBannerList()
			this.getZiZhi() //获取分享文案  图片
			this.token = uni.getStorageSync('token')
			if (this.token) {
				this.gethaveOrder() //获取正在进行订
				this.orderList() //获取待付款订单
				
				console.log('2222222')
				this.timer = setInterval(() => {
					this.gethaveOrder() //获取正在进行订单
				}, 10000);

				this.getUserInfo()
				if (this.isFist) {
					this.isFist = false
					this.gethaveOrders()
				}

				if (uni.getStorageSync('addressId')) {
					this.addressId = uni.getStorageSync('addressId')
					this.getcfd()
				}
				if (uni.getStorageSync('addressIds')) {
					this.addressIds = uni.getStorageSync('addressIds')
					this.getzd()
				}

				if (uni.getStorageSync('addlist')) {
					this.addlist = uni.getStorageSync('addlist')
					uni.removeStorageSync('addlist')
					if (this.addlist && this.addlists) {
						this.orderPay()
					}

				}
				if (uni.getStorageSync('addlists')) {
					this.addlists = uni.getStorageSync('addlists')
					uni.removeStorageSync('addlists')
					if (this.addlist && this.addlists) {
						this.orderPay()
					}
				}

				if (uni.getStorageSync('daijiao')) {
					this.daijiao = uni.getStorageSync('daijiao')
				}

				this.$Request.getT('/app/common/type/307').then(res => { //用户端订单状态通知 307
					if (res.code == 0) {
						if (res.data && res.data.value) {
							this.arr.push(res.data.value)
						}
					}
				})
				if (this.showModal1) {
					// #ifdef MP-WEIXIN
					this.openMsg()
					// #endif
				}
			} else {
				clearInterval(this.timer)
			}
		},
		onReady() {
			this.map = uni.createMapContext("map", this)
		},
		onShareAppMessage(res) { //发送给朋友
			return {
				title: this.tuiguang,
				path: '/pages/index/index?invitation=' + this.invitationCode,
				imageUrl: this.tuiguangImg,
			}
		},
		onShareTimeline(res) { //分享到朋友圈
			return {
				title: this.tuiguang,
				path: '/pages/index/index?invitation=' + this.invitationCode,
				imageUrl: this.tuiguangImg,
			}
		},
		methods: {
			gofikkuan() {
				uni.setStorageSync('current', 1)
				this.dfkshow = false
				uni.navigateTo({
					url: '/pages/order/order'
				})
			},
			// 订单获取
			orderList() {
				this.$Request.getT('/app/indent/findUserIndent?page=1&limit=5&indentState=0').then(res => {
					if (res.code === 0) {
						this.dfkOrder = res.data.records
						if (this.dfkOrder.length != 0) {
							this.dfkshow = true
						}
					}
				});
			},
			// 获取轮播图
			getBannerList() {
				this.$Request.getT("/app/banner/selectBannerList?classify=1&state=1").then(res => {
					if (res.code == 0) {
						this.bannerList = res.data
					}
				});
			},
			//清空优惠劵
			deteYouhuj() {
				this.couponId = ''
				this.couponName = ''
				this.youhuiShow = false
			},
			//使用优惠劵
			useryouhui(item) {
				this.couponId = item.id
				this.couponName = item.money
				this.youhuiShow = false
			},
			// 跳转正在进行订单详情
			goOrerDer() {
				uni.navigateTo({
					url: '/my/order/pay?indentNumber=' + this.haveorder.indentNumber
				})
				this.hoveorderShow = false
			},
			timing(second) {
				//实时返回计时时间
				// console.log(second)
			},
			reset() {
				//重置计时器
				this.$refs.timer.reset()
			},
			start() {
				//手动开启计时器
				this.$refs.timer.start()
			},
			clear() {
				//停止计时器
				this.$refs.timer.clear()
			},
			openYouhui() {
				if (this.youhuiList.length == 0) {
					uni.showToast({
						title: '当前暂无可使用的优惠劵',
						icon: 'none'
					})
					return
				}
				this.youhuiShow = true
			},
			openRemk() {
				this.remkShow = true
			},
			openFest() { //返回首页下单

				this.addlists = []
				this.covers = []
				this.polyline = []
				this.ordershow = false
				this.popupshow = true
				this.driverShow = false
				this.selectCity(this.longitude, this.latitude);
				this.orderList() //获取待付款订单
				this.gethaveOrder()
			},
			openMap() {
				let that = this
				uni.chooseLocation({
					success: function(res) {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
						that.latitude = res.latitude
						that.longitude = res.longitude
						that.selectCity(that.longitude, that.latitude);
					}
				});
			},
			goMy() {
				uni.navigateTo({
					url: '/pages/my/my'
				})
			},
			openmingxi() { //查看价格明细
				this.moneyShow = true
			},
			changeAdd(index) {
				if (this.token) {
					// this.tabIndex = index
					uni.navigateTo({
						url: '/my/address/index?index=' + index
					})
					this.hoveorderShow = false
				} else {
					uni.navigateTo({
						url: '/pages/my/register'
					})
				}

			},
			isShowAgree() {
				//是否选择协议
				this.showAgree = !this.showAgree;
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
			goWeb(url) {
				if (this.token) {
					// this.tabIndex = index
					// #ifdef MP-WEIXIN
					if (uni.getStorageSync('sendMsg')) {
						uni.requestSubscribeMessage({
							tmplIds: this.arr,
							success(re) {
								var datas = JSON.stringify(re);
								if (datas.indexOf("accept") != -1) {
									console.log(re)
								}
							},
							fail: (res) => {
								console.log(res)
							}
						})
					}
					// #endif
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
				} else {
					uni.navigateTo({
						url: '/pages/my/register'
					})
				}
			},
			// 查询是否有正在进行的订单
			gethaveOrders() {
				this.$Request.getT('/app/indent/getMyHaveOrder').then(res => {
					if (res.code == 0 && res.data) {
						this.haveorder = res.data
						this.hoveorderShow = true
					} else {
						this.haveorder = []
					}
				});
			},
			gethaveOrder() {
				this.$Request.getT('/app/indent/getMyHaveOrder').then(res => {
					if (res.code == 0 && res.data) {
						this.haveorder = res.data
						// console.log('查询订单', this.haveorder && this.haveorder.riderUserId && this.driverShow)
						if (this.haveorder && this.haveorder.riderUserId && this.driverShow) {
							uni.navigateTo({
								url: '/my/order/pay?indentNumber=' + this.haveorder.indentNumber
							})
							clearInterval(this.timer)
							this.openFest()
						}
					} else {
						this.haveorder = []
					}
				});
			},
			selectCity(longitude, latitude) {
				let data
				this.$Request.getT('/app/Login/selectCity?lat=' + latitude + '&lng=' + longitude).then(res => {
					if (res.code === 0) {
						this.city = res.data.city
						uni.setStorageSync('city', res.data.city)
						this.covers = [{
							id: 1,
							latitude: latitude,
							longitude: longitude,
							iconPath: '../../static/image/qi.png',
							width: 32,
							height: 44,
							callout: { //自定义标记点上方的气泡窗口 点击有效
								content: res.data.address, //文本
								color: '#FFFFFF', //文字颜色
								fontSize: 10, //文本大小
								padding: 10, //附近留白
								borderRadius: 36, //边框圆角
								bgColor: '#03A859', //背景颜色
								display: 'ALWAYS', //常显
								boxShadow: 'none !important',
							},
						}]
						data = {
							address: res.data.address,
							lng: longitude, //地址经度
							lat: latitude, //地址维度
							addressId: '',
							addressDefault: '',
							province: res.data.province,
							city: res.data.city,
							county: res.data.district,
						}
						this.addlist = data

					}
				});
			},
			// 查询附近司机
			getAdd(lng, lat) {
				this.$Request.getT('/app/indent/findVicinityRider?lng=' + lng + '&lat=' + lat).then(res => {
					if (res.code == 0) {
						this.riderNumber = res.data.count
					}
				});
			},
			//获取出发地
			getcfd() {
				this.$Request.getT('/app/address/getAddressInfo?addressId=' + this.addressId).then(res => {
					if (res.code == 0 && res.data) {
						this.addlist = res.data
						this.getAdd(res.data.lng, res.data.lat)
						uni.removeStorageSync('addressId')
						// uni.getStorageSync('addressId')
					} else {
						this.addlist = []
					}
				});
			},
			//获取目的地
			getzd() {
				this.$Request.getT('/app/address/getAddressInfo?addressId=' + this.addressIds).then(res => {
					if (res.code == 0 && res.data) {
						this.addlists = res.data

						this.to.latitude = res.data.lat
						this.to.longitude = res.data.lng
						// console.log(this.addlist,'cccccccccccccc')
						// return
						this.covers = [{
							id: 1,
							latitude: this.addlist.lat,
							longitude: this.addlist.lng,
							iconPath: '../../static/image/qi.png',
							width: 32,
							height: 44,
							callout: { //自定义标记点上方的气泡窗口 点击有效
								content: this.addlist.address, //文本
								color: '#FFFFFF', //文字颜色
								fontSize: 10, //文本大小
								padding: 10, //附近留白
								borderRadius: 36, //边框圆角
								bgColor: '#03A859', //背景颜色
								display: 'ALWAYS', //常显
								boxShadow: 'none !important',
							},
						}, {
							id: 2,
							latitude: res.data.lat,
							longitude: res.data.lng,
							iconPath: '../../static/image/zd.png',
							width: 32,
							height: 44,
							callout: { //自定义标记点上方的气泡窗口 点击有效
								content: res.data.address, //文本
								color: '#03A859', //文字颜色
								fontSize: 10, //文本大小
								padding: 10, //附近留白
								borderRadius: 36, //边框圆角
								bgColor: '#FFFFFF', //背景颜色
								display: 'ALWAYS', //常显
								boxShadow: 'none !important',
							},
						}]
						uni.removeStorageSync('addressIds')
						this.orderPay()

					} else {
						this.addlists = []
					}
				});
			},
			// 计算基础价格
			orderPay() {
				let data = {
					goLng: this.addlist.lng,
					goLat: this.addlist.lat,
					toLng: this.addlists.lng,
					toLat: this.addlists.lat,
					redPacketId: '',
				}
				this.$Request.getT('/app/indent/basicsMoney', data).then(res => {
					if (res.code == 0 && res.data) {
						this.couponId = ''
						this.couponName = ''
						this.basicPrice = res.data
						this.polylines = res.data.polyline
						this.gethaveOrder()
						this.popupshow = false
						this.ordershow = true
						this.getyouhui() //获取优惠劵
						this.routePlanning()

					} else {
						uni.showToast({
							title: '服务器打瞌睡了~',
							icon: 'none',
							duration: 2000
						})
					}
				});
			},
			//下单
			payorder() {
				if (!this.showAgree) {
					uni.showToast({
						title: '请同意打车服务协议',
						icon: 'none'
					})
					return
				}

				let data = {
					indentType: 1,
					shipAddress: this.addlist.address,
					shipAddressLongitude: this.addlist.lng,
					shipAddressLatitude: this.addlist.lat,
					deliveryAddress: this.addlists.address,
					deliveryAddressLongitude: this.addlists.lng,
					deliveryAddressLatitude: this.addlists.lat,

					shipProvince: this.addlist.province, //出发-省
					shipCity: this.addlist.city, //出发-市
					shipDistrict: this.addlist.county, //出发-区
					deliveryProvince: this.addlists.province, //目的-省
					deliveryCity: this.addlists.city, //目的-市
					deliveryDistrict: this.addlists.county, //目的-区

					remarks: '',
					couponId: this.couponId,
					itemCodeFlag: 1,
					// payUser: this.payUser,
					type: '',
					remarks: this.remarks
				}
				this.$Request.postJson('/app/indent/addIndent', data).then(res => {
					if (res.code == 0) {
						this.indentId = res.data.indentId
						this.showpay = true

					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 1500
						})
					}
				});
			},
			// 步行路线规划
			routePlanning() {
				let that = this
				that.qqmapsdk.direction({
					mode: 'driving', // 驾车
					from: { // 起始位置(当前位置)坐标
						latitude: that.latitude,
						longitude: that.longitude
					},
					to: that.to, // 目的地位置坐标
					success(res) {
						// console.log(res, '=======')
						var coors = JSON.parse(that.polylines)
						// console.log(coors,'11111111111111')
						// var coors = res.result.routes[0].polyline
						// console.log(coors2,'11111111111111')
						var pl = [] // 点串数组
						// 坐标解压(返回的点串坐标，通过前向差分进行压缩)
						var kr = 1000000
						for (var i = 2; i < coors.length; i++) {
							coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr
						}
						// 将解压后的坐标放入点串数组pl中
						for (var i = 0; i < coors.length; i += 2) {
							pl.push({
								latitude: coors[i],
								longitude: coors[i + 1]
							})
						}
						// 设置polyline属性，将路线显示出来，将解压坐标第一个数据作为起点
						that.polyline = [{
							points: pl,
							color: '#03A859',
							width: 4
						}]
					}
				})
			},
			// 获取用户信息
			getUserInfo() {
				this.$Request.getT('/app/userinfo/findUserInfoById').then(res => {
					console.log(res)
					if (res.code == 0 && res.data) {
						this.image_url = res.data.avatar ? res.data.avatar : '../../static/image/logo.png';
						if (res.data.newUserFlag) {
							this.newUserFlag = res.data.newUserFlag
							console.log(this.newUserFlag)
							if (this.newUserFlag == 1) {
								this.HBShow = true
							} else {
								this.HBShow = false
							}
						}

					}
				});
			},
			getyouhui() { //获取优惠劵
				// let indentType = this.classifyLsit[this.current].id
				let data = {
					indentType: 1,
					indentMoney: this.basicPrice.allMoney
				}
				this.$Request.getT('/app/couponUser/getMyOrderCouponList', data).then(res => {
					if (res.code === 0) {
						this.youhuiList = res.data.records
					} else {
						uni.showToast({
							title: res.msg,
							icon: "none"
						})
					}
				});
			},
			// 红包
			takemoney() {
				this.$Request.getT('/app/userinfo/newUserCoupon').then(res => {
					console.log(res)
					if (res.code === 0) {
						this.HBShow = false
						this.getUserInfo()
						setTimeout(function() {
							uni.navigateTo({
								url: '/pages/my/hongbao/hongbao'
							})
						}, 100)
					} else {
						uni.showToast({
							title: res.msg,
							icon: "none"
						})
						this.newUserFlag = ''
					}
				});
			},
			// 取消订单
			bindorderOff() {
				let data = {
					indentNumber: this.haveorder.indentNumber
				}
				this.$Request.postT('/app/indent/userCancelIndent', data).then(res => {
					if (res.code == 0) {
						uni.showToast({
							title: '订单取消成功'
						});
						this.qxshow = false
						this.driverShow = false

						this.openFest()
					} else {
						uni.hideLoading();
						uni.showModal({
							showCancel: false,
							title: '订单失败',
							content: res.msg
						});
					}
				});
			},
			selectWay(id) {
				this.openWay = id
			},
			pay() {
				if (this.openWay == 0) {
					this.$queue.showToast('请选择支付方式!')
					return;
				}
				this.showpay = false
				if (this.openWay == 1) {
					console.log('微信')
					// #ifdef APP-PLUS
					// 微信APP支付 根据订单id获取支付信息
					let data = {
						indentId: this.indentId
					}
					this.$Request.postT("/app/wxPay/payAppOrder", data).then(res => {
						// console.log(JSON.stringify(res), '微信支付信息')
						this.isCheckPay(res.code, 'wxpay', JSON.stringify(res.data));
					});
					// #endif
					// #ifdef MP-WEIXIN
					let that = this
					let data = {
						indentId: that.indentId
					}
					that.$Request.postT("/app/wxPay/wxPayJsApiOrder", data).then(res => {
						if (res.code == 0) {
							that.couponId = ''
							that.couponName = ''
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
										title: '订单支付成功',
										icon: 'none'
									});
									that.ordershow = false
									that.driverShow = true
									that.isShowAgree = false
									that.gethaveOrder()
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
							indentId: this.indentId
						}
						this.$Request.postT('/app/wxPay/wxPayMpOrder', data).then(res => {
							if (res.code == 0) {
								this.couponId = ''
								this.couponName = ''
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
						indentId: this.indentId
					}
					this.$Request.postT('/app/aliPay/payH5Order', data).then(
						res => {
							if (res.code == 0) {
								this.couponId = ''
								this.couponName = ''
								const div = document.createElement('div')
								div.innerHTML = res.data //此处form就是后台返回接收到的数据
								document.body.appendChild(div)
								document.forms[0].submit()
							} else {
								this.dfkshow = true
								uni.showToast({
									icon: 'none',
									title: '支付失败!'
								});
							}
							// setInterval(() => {
							// 	//请求订单查询接口,这块的逻辑就是如果返回数据为‘已支付’就清除定时器，然后跳转结果页面
							// 	this.orderList();
							// }, 3000);

						});
					// #endif

					// #ifdef APP
					// this.form.payType = 4
					let data = {
						indentId: this.indentId
					}
					this.$Request.postT("/app/aliPay/payAppOrder", data).then(res => {
						this.couponId = ''
						this.couponName = ''
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
								this.$Request.postT('/app/userMoney/moneyPayIndent?indentId=' + this.indentId)
									.then(res => {
										if (res.code == 0) {
											this.couponId = ''
											this.couponName = ''
											uni.showToast({
												title: '订单支付成功'
											});
											this.ordershow = false
											this.driverShow = true
											this.isShowAgree = false
											this.gethaveOrder()

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
							that.ordershow = false
							that.driverShow = true
							that.isShowAgree = false
							that.gethaveOrder()
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
				let that = this;
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
						that.ordershow = false
						that.driverShow = true
						that.isShowAgree = false
						that.gethaveOrder()
						// setTimeout(function() {
						// 	uni.navigateBack()
						// }, 1000);
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
			// 开启订阅消息
			openMsg() {
				console.log('订阅消息')
				var that = this
				uni.getSetting({
					withSubscriptions: true, //是否获取用户订阅消息的订阅状态，默认false不返回
					success(ret) {
						console.log(ret.subscriptionsSetting, '------------------')
						// if (ret.subscriptionsSetting.itemSettings && Object.keys(ret.subscriptionsSetting.itemSettings).length == 2) {
						if (ret.subscriptionsSetting.itemSettings) {
							uni.setStorageSync('sendMsg', true)
							uni.openSetting({ // 打开设置页 
								success(rea) {
									console.log(rea.authSetting)
								}
							});
						} else { // 用户没有点击“总是保持以上，不再询问”则每次都会调起订阅消息
							console.log(99999)
							uni.setStorageSync('sendMsg', false)
							uni.showModal({
								title: '提示',
								content: '为了更好的体验,请绑定消息推送',
								confirmText: '确定',
								cancelText: '取消',
								success: function(res) {
									if (res.confirm) {
										console.log(that.arr)
										wx.requestSubscribeMessage({
											tmplIds: that.arr,
											success(re) {
												console.log(JSON.stringify(re),
													'++++++++++++++')
												var datas = JSON.stringify(re);
												if (datas.indexOf("accept") != -1) {
													console.log(re)
													// uni.setStorageSync('sendMsg', true)
												}
											},
											fail: (res) => {
												console.log(res)
											}
										})
										// uni.setStorageSync('sendMsg', true)
										console.log('确认')
										that.showModal1 = false
									} else if (res.cancel) {
										console.log('取消')
										// uni.setStorageSync('sendMsg', false)
										that.showModal1 = true
									}
								}
							})
						}
					}
				})
			},
		}
	}
</script>

<style lang="less">
	page {
		// background: #FFFFFF;
		background: #F2F5FF;
	}

	.content {
		width: 100%;
		// position: fixed;
		// top: 0upx;
		// left: 0upx;
		// right: 0upx;
		// bottom: 0upx;

	}

	.controls-title {
		width: 100%;
		// height: 55vh;
		background: #FFFFFF;
		// box-shadow: 0px -12px 40px 0px rgba(192, 220, 245, 0.6);
		border-radius: 40rpx 40rpx 0rpx 0rpx;
		/* #ifdef MP-WEIXIN */
		padding-bottom: 20rpx;
		/* #endif */

	}

	.orderb {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #f2f6f9;
		margin: 0rpx 30rpx 0 30rpx;
		border-radius: 24rpx;
		padding: 30rpx;
	}

	.controls-box {
		background: #FFFFFF;
		// margin: 60upx 30rpx 20rpx;
		border-radius: 32upx 32upx 0 0;
		padding: 30rpx 0;
	}

	/* tab选项卡 */
	.controls-tabs {
		/* width: 100%; */
		// height: 90rpx;
		display: flex;
		font-size: 28rpx;
		overflow-x: auto;
		// justify-content: space-between;
		align-items: center;
		// margin-top: 10rpx;
		// padding: 0 30rpx;
		background: #F2F5FF;

	}

	.atabs_ds {
		text-align: center;
		// height:90rpx;
		flex: 1;
		padding: 20rpx 0;
	}

	.btna {
		background: #03A859;
		width: 40rpx;
		height: 6rpx;
		/* margin: 9rpx 10rpx 10rpx 29rpx; */
		margin: 5rpx auto;
		border-radius: 55rpx;

	}

	.active {
		// height: 90rpx;
		background: #FFFFFF;
		border-radius: 32upx 32upx 0 0;
	}

	.addbox {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 0 30rpx 30rpx 30rpx;
		padding: 0 30rpx;
		height: 110rpx;
		border-radius: 16rpx;
	}

	.add_cont {
		display: flex;
		align-items: center;
	}

	.add_tit {
		font-size: 31rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
	}

	.bg {
		background: #F2FFF9;
		border: 1rpx solid #03A859;
		border-radius: 16rpx;
	}

	.bgs {
		background: #F5F8FF;

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

	/* 红包样式 */
	.hongbao {
		width: 100%;
		/* height: 100px; */
		/* background: #03A859; */
		position: fixed;
		top: 24%;
		/* bottom: 50%; */
		left: 0rpx;
		right: 0rpx;
		/* display: none; */
	}

	.hb_img {
		width: 100%;
		height: 435rpx;
	}

	.hb_btn {
		width: 60%;
		height: 72rpx;
		position: absolute;
		top: 315rpx;
		left: 80rpx;
	}

	.img-map1 {
		width: 80rpx;
		height: 80rpx;
	}

	.headTop {
		// background: #FFFFFF;


		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 99;
		/* #ifndef H5 */
		padding: 100rpx 20rpx 25rpx;
		/* #endif */
		/* #ifdef H5 */
		padding: 40rpx 20rpx 25rpx;
		/* #endif */
		display: inline-flex;
		align-items: center;

	}

	.headbox {
		background-color: #FFFFFF;
		border-radius: 50rpx;
		padding: 10rpx 20rpx;
	}

	.line {
		width: 1rpx;
		height: 63rpx;
		background: #E6E6E6;
	}

	.btn {
		width: 686rpx;
		height: 98rpx;
		margin: 0 auto;
		background: #03A859;
		border-radius: 16rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 40rpx auto;
	}

	.czbtn {
		width: 480rpx;
		height: 80rpx;
		background: #03A859;
		border-radius: 40rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 50rpx;
	}

	.qxdj {
		width: 180rpx;
		height: 70rpx;
		border: 2rpx solid #CCCCCC;
		border-radius: 16rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #666666;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.btns {
		width: 250rpx;
		height: 80rpx;
		border: 2rpx solid #999999;
		border-radius: 40rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #999999;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.btnss {
		width: 250rpx;
		height: 80rpx;
		background: #03A859;
		border-radius: 40rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.remkbtn {
		width: 100%;
		height: 80rpx;
		background: #03A859;
		border-radius: 40rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 80rpx;
		margin-top: 40rpx;
	}

	//优惠劵
	.scroll-Y {
		height: 580rpx;
	}

	.money_box {
		// height: 300rpx;
		// line-height: 300rpx;
		// text-align: center;
		// font-size: 36rpx;
		width: 100%;
		margin: 0 auto;
		background: #ffffff;
		border-radius: 14upx;
		height: 220rpx;
		margin-bottom: 20upx;
		margin-top: 20rpx;
	}

	.box_tit {
		width: 90%;
		margin: 0 auto;
		height: 80upx;
		display: flex;
	}

	.money_name {
		flex: 1;
		display: flex;
		justify-content: left;
		align-items: center;
		font-size: 27rpx;
		font-weight: bold;
		letter-spacing: 2upx;
	}

	.money_price {
		flex: 1;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 48upx;
		font-weight: bold;
		color: red;

		text {
			font-size: 30rpx;
		}
	}

	.money_data {
		color: #999999;
		font-size: 24rpx;
		width: 90%;
		margin: 0 auto;
		margin-top: -8upx;
	}

	.u-line {
		width: 90% !important;
		border-bottom-width: 6upx !important;
		margin: 0 auto !important;
		margin-top: 22upx !important;
		margin-bottom: 22upx !important;
	}

	.box_bottom {
		width: 90%;
		margin: 0 auto;
		display: flex;
		height: 40upx;
	}

	.money_use {
		flex: 1;
		color: #999999;
		font-size: 24rpx;
		display: flex;
		justify-content: left;
		align-items: center;
	}

	.lj_use {
		width: 150rpx;
		border: 2rpx solid #FF130A;
		color: #FF130A;
		text-align: center;
		line-height: 48rpx;
		border-radius: 40rpx;
		font-size: 23rpx;
	}

	.deteJuan {
		width: 190rpx;
		border: 2rpx solid #FF130A;
		color: #FF130A;
		text-align: center;
		line-height: 48rpx;
		border-radius: 40rpx;
		font-size: 23rpx;
		margin: 20rpx 0;
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