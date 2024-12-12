<template>
	<view>
		<view class="hedtop">
			<view class="cs">
				{{city}}
				<image src="../static/up.png" style="width:20rpx;height: 17rpx;margin-left: 5rpx;"></image>
			</view>
			<view class="seach">
				<u-search :disabled="true" placeholder="搜索地址" shape="square" :clearabled="false" :animation="true"
					bg-color="#F5F5F5" height="75" @click="openMap"></u-search>
			</view>
		</view>


		<view class="addlist">
			<view class="box" v-for="(item,index) in addlist" :key="index" @click="changetan(index,item)">
				<view class="" style="width: 85%;">
					<view class="flex">
						<image src="../static/addre.png" style="width:35rpx;height:35rpx;margin-right: 5rpx;"></image>
						<view class="text-lg " style="width: 480rpx;">{{item.address}}</view>
					</view>
				</view>
				<view class="flex justify-end">
					<view class="btns" @click.stop='setadd(item)'>
						保存</view>
				</view>
			</view>
			<view class="box" v-for="(item,index) in list" :key="index" :class="listIndex==index?'active':''"
				@click="changetan(index,item)">
				<view class="" style="width: 85%;">
					<view class="flex">
						<image src="../static/addre.png" style="width:35rpx;height:35rpx;margin-right: 5rpx;"></image>
						<view class="text-lg " style="width: 480rpx;">{{item.address}}</view>
					</view>
				</view>
				<view class="flex justify-end">
					<view class="btnsa" @click.stop='deleteAddressList(item)'>
						删除</view>
					<!-- <view style="font-size: 30upx;color: #999999;margin-left: 40rpx; "
						@click.stop='goAddress(item.addressId)'>编辑</view> -->
				</view>
			</view>

			<empty v-if="list.length==0&&addlist.length==0"></empty>
		</view>


		<view class="tabber">
			<!-- <view class="btn" @click="goadd()">添加地址</view> -->
			<view class="btn" @click="openMap()">添加地址</view>
		</view>
	</view>
</template>

<script>
	import empty from '@/components/empty.vue'
	export default {
		components: {
			empty
		},
		data() {
			return {
				city: '',
				keyword: '',
				page: 1,
				limit: 10,
				list: [],
				listIndex: '-1',
				index: 0,
				cityaddress: '',
				detailaddress: '',
				latitude: '',
				longitude: '',
				province: '',
				city: '',
				county: '',
				addlist: []
			}
		},
		onLoad(option) {
			if (option.index) {
				this.index = option.index
			}

		},
		onShow() {
			this.city = uni.getStorageSync('city')
			this.getAddlist()
		},
		methods: {
			deleteAddressList(e) {
				let that = this
				uni.showModal({
					title: '温馨提示',
					content: '您确定要删除此地址信息吗?',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确认',
					success: res => {
						if (res.confirm) {
							that.$Request.postT('/app/address/deleteAddress?addressId=' + e.addressId).then(
								res => {
									if (res.code == 0) {
										that.$queue.showToast("删除成功！");
										that.page = 1
										that.getAddlist();
									} else {
										that.$queue.showToast(res.msg);
									}
								});
						}
					}
				});
			},
			goAddress(addressId) {
				uni.navigateTo({
					url: '/my/address/add?addressId=' + addressId
				})
			},
			goadd() {
				uni.navigateTo({
					url: '/my/address/add'
				})
			},
			openMap() { //打开地图选择位置
				let that = this
				uni.chooseLocation({
					success: function(res) {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
						that.detailaddress = res.name
						that.latitude = res.latitude
						that.longitude = res.longitude
						that.shengcheng(res.longitude, res.latitude)
						// let data = {
						// 	address: res.name, //地址
						// 	addressDetail: res.address,
						// 	addressLongitude: res.longitude, //地址经度
						// 	addressLatitude: res.latitude, //地址维度
						// 	addressId: '',
						// 	addressDefault: '',
						// }
						// that.$Request.postJson('/app/indent/addUserAddress', data).then(res => {
						// 	if (res.code === 0) {
						// 		that.getAddlist()
						// 	}
						// });
					}
				});

			},
			shengcheng(longitude, latitude) {
				this.$Request.get('/app/Login/selectCity?lat=' + latitude + '&lng=' + longitude).then(res => {
					if (res.code === 0) {
						this.province = res.data.province
						this.city = res.data.city
						this.county = res.data.district
						this.cityaddress = res.data.province + res.data.city + res.data.district
						let userId = this.$queue.getData('userId');
						let data = {
							userName: '',
							userPhone: '',
							address: this.detailaddress,
							lat: this.latitude,
							lng: this.longitude,
							province: this.province,
							city: this.city,
							county: this.county,
							userId: userId,
							addressId: '',
							isDefault: '',
							addressId: ''
						}

						this.addlist.push(data)
						console.log(this.addlist)
					}
				});

			},
			setadd() {
				let that = this
				uni.showModal({
					title: '温馨提示',
					content: '您确定要保存此地址信息吗?',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确认',
					success: res => {
						if (res.confirm) {
							let userId = this.$queue.getData('userId');
							let data = {
								userName: '',
								userPhone: '',
								address: this.detailaddress,
								lat: this.latitude,
								lng: this.longitude,
								province: this.province,
								city: this.city,
								county: this.county,
								userId: userId,
								addressId: '',
								isDefault: '0',
								addressId: ''
							}
							this.$Request.postT('/app/address/saveAddress', data).then(res => {
								if (res.code == 0) {
									uni.hideLoading()
									this.$queue.showToast("保存成功!");
									this.page = 1
									this.getAddlist()
									this.addlist = []
								} else {
									uni.hideLoading()
									this.$queue.showToast(res.msg);
								}
							});
						}
					}
				});
			},
			getAddlist() {
				let data = {
					page: this.page,
					limit: this.limit
				}
				this.$Request.getT('/app/address/getAddressList', data).then(res => {
					if (res.code === 0) {
						if (this.page == 1) {
							this.list = res.data.records;
						} else {
							this.list = [...this.list, ...res.data.records]
						}
					}
				});

			},
			changetan(index, item) {
				if (this.index == 1) {
					if (item.addressId) {
						uni.setStorageSync('addressId', item.addressId)
					} else {
						uni.setStorageSync('addlist', item)
					}
					// this.listIndex = index
					uni.navigateBack()
				} else if (this.index == 2) {
					if (item.addressId) {
						uni.setStorageSync('addressIds', item.addressId)
					} else {
						uni.setStorageSync('addlists', item)
					}
					// this.listIndex = index
					uni.navigateBack()
				}

			}
		},
		onReachBottom: function() {
			this.page = this.page + 1;
			this.getAddlist();
		},
		onPullDownRefresh: function() {
			this.page = 1;
			this.getAddlist();
		}

	}
</script>

<style lang="less">
	page {
		background: #FFFFFF;
	}

	.hedtop {
		display: flex;
		align-items: center;
		padding: 0 30rpx;
		position: fixed;
		/* #ifdef H5 */
		top: 85rpx;
		/* #endif */
		/* #ifndef H5 */
		top: 0rpx;
		/* #endif */
		left: 0;
		right: 0;
		z-index: 99;
		background: #FFFFFF;

		.cs {
			width: 20%;
		}

		.seach {
			width: 80%;
		}
	}

	.addlist {

		/* #ifdef H5 */
		margin-top: 120rpx;
		/* #endif */
		/* #ifndef H5 */
		margin-top: 120rpx;

		/* #endif */
		.box {
			// width: 100%;
			margin: 20rpx 30rpx;
			background: #F7F7F7;
			border-radius: 18rpx;
			padding: 30rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.add {
				// font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #7c7c7c;
				margin-top: 10rpx;
			}
		}

		.active {
			border: 2rpx solid #45AEFF;
			border-radius: 8rpx;
			background: #FFFFFF;
		}
	}

	.tabber {
		position: fixed;
		bottom: 0rpx;
		left: 0;
		right: 0;
		background: #FFFFFF;
	}

	.btn {
		background: #02B595;
		border-radius: 24rpx;
		margin: 32rpx;
		padding: 20rpx 0;
		text-align: center;
		color: #FFFFFF;
	}

	.btns {
		font-size: 26upx;
		color: #FFFFFF;
		background: #02B595;
		height: 50rpx;
		line-height: 50rpx;
		padding: 0rpx 20rpx;
		border-radius: 24rpx;
		letter-spacing: 2rpx;
	}
	.btnsa{
		font-size: 26upx;
		color: #FFFFFF;
		background: #adadad;
		height: 50rpx;
		line-height: 50rpx;
		padding: 0rpx 20rpx;
		border-radius: 24rpx;
		letter-spacing: 2rpx;
	}
</style>