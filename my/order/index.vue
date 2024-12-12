<template>
	<view>
		<!-- #ifndef MP-WEIXIN  -->
		<view class="page-body">
			<view class="page-section page-section-gap">
				<map id="map" style="width: 100%; height: 100vh;" :latitude="latitude" :longitude="longitude"
					:markers="covers" :show-location="true">
					<cover-view style="position: fixed;top: 345px;right: 30px;" @click="onToGetLocation()">
						<!-- <cover-image class="img-map1" src="../../static/image/dw.png">
						</cover-image> -->
					</cover-view>
				</map>
			</view>
		</view>

		<!-- #endif -->

		<!-- #ifdef MP-WEIXIN -->
		<view class="page-body">
			<view class="page-section page-section-gap">
				<map id="map" style="width: 100%; height: 100vh;" :latitude="latitude" :longitude="longitude"
					:markers="covers" :show-location="true" :customCallout="customCallout">
					<cover-view style="position: fixed;bottom: 430rpx;right: 60rpx;" @click="onToGetLocation()">
						<!-- <cover-image class="img-map1" src="../../static/image/dw.png">
						</cover-image> -->
					</cover-view>
				</map>
			</view>
		</view>
		<!-- #endif -->

		<!-- <cover-view class="controls-title">
			<cover-view class="controls-box">
				<view class="tit">打车车型</view>
				<view class="flex margin-tb" v-for="(item,index) in list" :key="index">
					<image src="../../static/image/logo.png" style="width: 70rpx;height: 70rpx;border-radius: 50rpx;"></image>
					<view class="flex align-center justify-between margin-left-sm" style="width: 89%;">
						<view>
							<view>阳光出行</view>
							<view class="text-sm text-gray margin-top-xs">车辆消毒 隐私保护</view>
						</view>
						<view class="flex align-center">
							<view class="pre">预估<text>72</text>元</view>
							<view>
								<u-radio-group v-model="value">
									<u-radio shape="circle" active-color="#03A859"></u-radio>
								</u-radio-group>
							</view>
						</view>
					</view>
				</view>
			</cover-view>
			<cover-view class="controls-bott">
				<view class="price">
					预估<text>72~88</text>元起
				</view>
				<view class="btn">立即呼叫</view>
			</cover-view>
		</cover-view> -->
		<cover-view class="controls-title" style="background: #FFFFFF;">
			<cover-view class=" flex align-start justify-between" style="padding: 40rpx 30rpx 40rpx;">
				<cover-view>
					<cover-view class="text-bold" style="font-size: 40rpx;">正在为您全力呼叫车辆</cover-view>
					<cover-view class="text-lg margin-top-xs">已等待<text style="color: #346EF6;">00:02</text></cover-view>
				</cover-view>
				<cover-view class="qxdj" @click="qxshow = true">取消打车</cover-view>
			</cover-view>
		</cover-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: '',
				longitude: '',
				iconPath: '../../static/image/qi.png',
				covers: [{
					latitude: '',
					longitude: '',
					iconPath: '../../static/image/qi.png',
					width: 32,
					height: 44,
					callout: { //自定义标记点上方的气泡窗口 点击有效
						content: '当前附近骑手', //文本
						color: '#ffffff', //文字颜色
						fontSize: 10, //文本大小
						padding: 10, //附近留白
						borderRadius: 50, //边框圆角
						bgColor: '#00c16f', //背景颜色
						display: 'ALWAYS', //常显
					},
				}],

				show: true,
				list: [{
					id: 1
				}, {
					id: 2
				}, {
					id: 2
				}]
			}
		},
		onLoad() {

			let that = this

			uni.getLocation({
				type: 'gcj02',
				geocode: true, //设置该参数为true可直接获取经纬度及城市信息
				success: function(res) {
					console.log(res, '地理位置')
					that.latitude = res.latitude
					that.longitude = res.longitude
					uni.setStorageSync('latitude', res.latitude)
					uni.setStorageSync('longitude', res.longitude)

					// #ifdef APP-PLUS
					that.city = res.address.city
					uni.setStorageSync('city', res.address.city)


					// #endif

					// #ifdef H5

					that.selectCity(that.longitude, that.latitude);
					// #endif

					// #ifdef MP-WEIXIN

					uni.request({
						url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + that.latitude +
							',' + that
							.longitude + '&key=TMWBZ-MZJ3O-QR2WO-SDQZY-HRNWO-3ABYP',
						success(re) {
							if (re.statusCode === 200) {
								let citydata = re.data.result.address_component.city
								console.log("获取城市名称成功", citydata)
								that.city = citydata ? citydata : '未知'
								uni.setStorageSync('city', citydata)
								that.getAdd(that.longitude, that.latitude)
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
		},
		onShow() {

		},
		methods: {
			selectCity(longitude, latitude) {
				this.$Request.getT('/app/Login/selectCity?lat=' + latitude + '&lng=' + longitude).then(res => {
					if (res.code === 0) {
						this.city = res.data.city
						uni.setStorageSync('city', this.city)
						this.covers[0].latitude = latitude
						this.covers[0].longitude = longitude
						this.covers[0].callout.content = res.data.district
						// this.getAdd(longitude, latitude)

					}
				});
			},
		}
	}
</script>

<style lang="less">
	.controls-title {
		width: 100%;
		background: #FFFFFF;
		box-shadow: 0rpx -12rpx 40rpx 0rpx rgba(192, 220, 245, 0.6);
		position: fixed;
		bottom: 0rpx;
		border-radius: 26upx 26upx 0 0;

		/* #ifdef MP-WEIXIN */
		// height: 685rpx;
		margin-bottom: 0rpx;
		padding-bottom: 0rpx;
		/* #endif */
		/* #ifndef MP-WEIXIN */
		// margin-bottom: 60rpx;
		// padding-bottom: 40rpx;
		// height: 724rpx;
		/* #endif */

		.controls-box {
			padding: 25rpx 0rpx 30rpx 30rpx;

			.tit {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 800;
				color: #333333;
			}

			.pre {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #030303;
				margin-right: 20rpx;

				text {
					font-size: 40rpx;
					font-weight: bold;
				}
			}

		}

		.controls-bott {
			height: 150rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 7rpx 40rpx 0rpx rgba(209, 209, 209, 0.75);
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx;

			.price {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #030303;

				text {
					font-size: 40rpx;
					font-weight: 800;
				}
			}

			.btn {
				width: 269rpx;
				height: 90rpx;
				background: #03A859;
				border-radius: 45rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 800;
				color: #FFFFFF;
			}
		}
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
</style>