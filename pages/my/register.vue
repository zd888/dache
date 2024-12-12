<template>
	<!-- #ifndef MP-WEIXIN -->
	<view class="register">
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view style="padding-top: 172upx;margin-left: 36upx;">
			<view style="color: #333333;font-size: 44upx;">手机快捷登录</view>
			<view style="color: #999999;font-size: 24upx;margin-top: 20upx;">未注册的手机号将自动创建账号</view>
		</view>
		<view style="margin-left: 26upx;margin-top: 104upx;">
			<wInput v-model="phoneData" type="number" maxlength="11" placeholder="请输入手机号"></wInput>
			<!-- <wInput v-model="passData" type="number" maxlength="6" placeholder="请输入密码"></wInput> -->
			<wInput v-model="verCode" type="number" maxlength="6" placeholder="请输入验证码" isShowCode ref="runCode"
				@setCode="sendMsg()"></wInput>
			<wInput v-show="show" v-model="invitation" placeholder="请填写邀请码(选填)"></wInput>
			<!-- <wInput v-show="show" v-model="invitation" isShowGet ref="setNumberCode" @setNumberCode="isShowGet()"
				placeholder="请填写邀请码"></wInput> -->
		</view>

		<view class="footer" style=" margin-right: 72px;">
			<image v-if="showAgree" @tap="isShowAgree"
				src="https://api.shengqianxiong.com.cn/img/20201112/669aa8946cfb4ebdb459d57193c0ebca.png"
				style="width: 36upx;height: 36upx;"></image>
			<image v-else @tap="isShowAgree"
				src="https://api.shengqianxiong.com.cn/img/20201112/1e9102fc891f4d86a13c7b2ba6921cba.png"
				style="width: 36upx;height: 36upx;"></image>
			<text style="margin-left: 10upx;margin-right: 0;font-size: 28upx;">同意</text>
			<navigator style="font-size: 28upx;" url="/my/setting/mimi" open-type="navigate">《隐私政策》</navigator>和
			<navigator style="font-size: 28upx;" url="/my/setting/xieyi" open-type="navigate">《用户服务协议》</navigator>
		</view>
		<wButton text="登 录" :rotate="isRotate" @click.native="startReg()"></wButton>
		<!-- <view style="width: 100%;text-align: center;margin-top: 20px;" @click="bindpasslogin()">密码登录</view> -->
		<!-- #ifdef APP-PLUS -->
		<view
			style="width: 100%;text-align: center;margin-bottom: 150rpx;color: #FF7F00;position: fixed;zoom: 1;bottom: 0;z-index: 500;"
			v-if="weixinLogin">
			<image
				src="https://api.shengqianxiong.com.cn/file/uploadPath/2021/10/08/af3e4ad488fc429f1d78254b7ec09e39.png"
				style="width: 90rpx;height: 90rpx;" @click="weixinLo">
			</image>
		</view>
		<!-- #endif -->
	</view>
	<!-- #endif -->


	<!-- #ifdef MP-WEIXIN -->
	<view v-if="isCanUse">
		<view>
			<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
			<view class='headers'>
				<image src='../../static/image/logo.png'></image>
			</view>
			<view class='content'>
				<view>申请获取以下权限</view>
				<text>获得你的公开信息(昵称，头像、地区等)</text>
			</view>

			<button v-show="weixinPhone" style="background: #03A859;color: #FFFFFF;" class="bottom"
				open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
				授权手机号
			</button>
			<button v-show="!weixinPhone" style="background: #03A859;color: #FFFFFF;" class='bottom'
				bindtap="getUserProfile" @tap="wxGetUserInfo">
				授权登录
			</button>
			<view class="footer" style="font-size: 32upx;">
				<text @tap="isShowAgree" class="cuIcon" :class="showAgree?'cuIcon-radiobox':'cuIcon-round'"
					style="font-size: 34rpx;">同意
				</text>
				<!-- 协议地址 -->
				<navigator url="/my/setting/mimi" open-type="navigate" style="font-size: 32upx;">《隐私政策》</navigator>和
				<navigator url="/my/setting/xieyi" open-type="navigate" style="font-size: 32upx;">《用户服务协议》
				</navigator>
			</view>
		</view>
	</view>
	<!-- #endif -->
</template>

<script>
	var _this;
	import wInput from '@/components/watch-login/watch-input.vue' //input
	import wButton from '@/components/watch-login/watch-button.vue' //button

	export default {
		data() {
			return {
				platform: "app",
				phoneData: '', // 用户/电话
				passData: '', //密码
				isCanUse: true, //默认为true
				verCode: "", //验证码
				weixinLogin: false,
				showAgree: false, //协议是否选择
				isRotate: false, //是否加载旋转
				invitation: '',
				invitations: '',
				isEnable: '否',
				show: false,
				sysphone: '',
				userType: 1,
				weixinPhone: false,
				nickName: '',
				avatarUrl: ''
			}
		},
		components: {
			wInput,
			wButton,
		},
		onLoad(d) {
			let a = this.$queue.getData("isEnable")
			if (a) {
				this.isEnable = a;
			}
			
			let relation = this.$queue.getData("inviterCode");
			if (relation) {
				this.invitation = relation;
				this.show = false;
			}
			

			//微信登录开启
			// this.$Request.getT('/common/type/53').then(res => {
			// 	if (res.status == 0) {
			// 		if (res.data && res.data.value && res.data.value == '是') {
			// 			this.weixinLogin = true;
			// 		}
			// 	}
			// });
		},
		mounted() {
			_this = this;
		},
		methods: {
			bindpasslogin() {
				console.log('111111')
				uni.navigateTo({
					url: './passlogin'
				})
			},
			weixinLo() {
				let that = this;
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						that.$queue.showLoading('正在登录中...');
						console.error(loginRes.authResult);
						that.$queue.setData('weixinToken', loginRes.authResult.access_token);
						that.$queue.setData('unionid', loginRes.authResult.unionid);
						that.$queue.setData('weixinOpenid', loginRes.authResult.openid);
						that.$Request
							.postJson('/appLogin/loginApp', {
								token: loginRes.authResult.access_token,
								unionid: loginRes.authResult.unionid,
								openid: loginRes.authResult.openid
							})
							.then(res => {
								console.log(JSON.stringify(res))
								if (res.status === 0) {
									that.$queue.setData("token", res.data.uuid);
									that.$queue.setData("userId", res.data.userId);
									that.getUserInfo(res.data.userId, res.data.uuid);
								} else {
									uni.hideLoading();
									uni.navigateTo({
										url: '../public/wxmobile'
									});
								}
							});


					}
				});
			},
			getUserProfile: function(e) {
				wx.getUserProfile({
					desc: '业务需要',
					success: res => {
						//拿到信息处理业务
						console.log(JSON.stringify(res))
					}
				})
			},
			//第一授权获取用户信息===》按钮触发
			wxGetUserInfo() {
				let _this = this;
				if (this.showAgree == false) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '请先同意《协议》'
					});
					return false;
				}

				wx.getUserProfile({
					desc: '业务需要',
					success: infoRes => {
						console.log("infoRes.encryptedData__________:" + infoRes.encryptedData)
						let nickName = infoRes.userInfo.nickName; //昵称
						let avatarUrl = infoRes.userInfo.avatarUrl; //头像
						_this.nickName = nickName
						_this.avatarUrl = avatarUrl

						try {
							_this.login(nickName, avatarUrl);
						} catch (e) {}
					},
					fail(res) {}
				})
			}, //登录

			getWeixinInfo(nickName, avatarUrl) {
				uni.showLoading({
					title: '登录中...'
				});
				var invitation = '';
				let that = this;
				let token = this.$queue.getData('token');
				if (!token) {
					console.log(that.phone)
					that.$Request.postJson("/app/Login/insertWxUser", {
						nickName: that.nickName,
						avatar: that.avatarUrl,
						openId: that.$queue.getData("openid"),
						phone: that.phone,
						inviterCode:that.invitation
					}).then(res => {
						if (res.code === 0) {
							uni.hideLoading();
							that.$queue.setData('token', res.token);
							that.$queue.setData('userId', res.user.userId);
							that.$queue.setData("avatar", res.user.avatar ? res.user.avatar : '/static/logo.png');
							that.$queue.setData("nickName", res.user.nickName);
							that.$queue.setData("invitationCode", res.user.invitationCode);
							that.$queue.setData("inviterCode", res.user.inviterCode);
							that.$queue.setData("sex", res.user.sex);
							that.$queue.setData("phone", res.user.phone);
							that.$queue.setData("platform", res.user.platform);

							that.$queue.setData("zhiFuBao", res.user.zhiFuBao);
							that.$queue.setData("zhiFuBaoName", res.user.zhiFuBaoName);

							that.$queue.setData("checkCertification", res.user.checkCertification);
							uni.navigateBack();
						} else {
							uni.hideLoading();
							uni.showModal({
								showCancel: false,
								title: '登录失败',
								content: res.msg,
							});
						}
					});
				} else {
					that.$Request.getT('/app/userinfo/findUserInfoById').then(res => {
						console.log(res)
						if (res.code == 0) {
							this.$queue.setData("image_url", res.data.avatar ? res.data.avatar :
								'../../static/image/logo.png');
							this.$queue.setData("userId", res.data.userId);
							this.$queue.setData("status", res.data.status);
							this.$queue.setData("nickName", res.data.nickName ? res.data.nickName : res
								.data.phone);
							// uni.switchTab({
							// 	url: '/pages/my/my'
							// });
							this.$queue.setData("newUserFlag", res.data.newUserFlag);

							uni.navigateBack()
						}
					});
				}
			},
			login(nickName, avatarUrl) {
				let that = this;
				uni.showLoading({
					title: '登录中...'
				});
				// 1.wx获取登录用户code
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						let code = loginRes.code;
						let data = {
							code: code
						};
						console.log(loginRes.code)
						that.$Request.getT("/app/Login/wxLogin", data).then(res => {
							console.log(res)
							if (res.code === 0) {

								that.$queue.setData('openid', res.data.open_id);
								that.$queue.setData('unionid', res.data.unionid);
								that.sessionkey = res.data.session_key;
								that.flag = res.data.flag;
								console.log(res.data.unionid, res.data.session_key);
								uni.hideLoading();
								//非第一次授权获取用户信息
								//获取用户信息后向调用信息更新方法
								that.$queue.setData("sessionkey", res.data.session_key);

								var invitation = that.$queue.getData('inviterCode');
								if (invitation) {
									that.invitation = invitation;
								} else {
									that.invitation = that.$queue.getInvitation();
								}
								if (res.data.isPhone == 2) {
									that.weixinPhone = true
								} else {
									that.getWeixinInfo(nickName, avatarUrl);
								}

							}
						});
					},
				});
			},
			//小程序微信登录后获取手机号
			getPhoneNumber: function(e) {
				console.log(e);
				if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
					console.log('用户拒绝提供手机号');
				} else {
					console.log('用户同意提供手机号');
					this.setPhoneByInsert(e.detail.encryptedData, e.detail.iv);
				}
			},
			//小程序微信登录后获取手机号
			setPhoneByInsert(decryptData, iv) {
				this.$queue.showLoading('登录中...');

				let data = {
					decryptData: decryptData,
					key: this.sessionkey,
					iv: iv
				};
				this.$Request.postJson('/app/Login/selectPhone', data).then(res => {
					if (res.code === 0) {
						uni.hideLoading();
						this.phone = res.data.phoneNumber;
						this.getWeixinInfo(this.sendDataList);
					} else {
						uni.hideLoading();
						this.$queue.showToast(res.msg);
					}
				});
			},
			navBack() {
				uni.navigateBack();
			},
			isShowGet() {
				this.show = true;
				this.invitation = this.$queue.getInvitation()
			},
			sendMsg() {
				const {
					phoneData
				} = this;
				if (!phoneData) {
					this.$queue.showToast("请输入手机号");
				} else if (phoneData.length !== 11) {
					this.$queue.showToast("请输入正确的手机号");
				} else {
					this.$queue.showLoading("正在发送验证码...");
					// let data={
					// 	phone:phoneData,
					// 	login:'login',
					// 	userType:1
					// }
					this.$Request.getT("/app/Login/sendMsg/" + phoneData + "/login").then(res => {
						console.log(res)
						if (res.code == 0) {
							if (res.msg === 'register') {
								this.show = true;
							}
							this.sending = true;
							this.$queue.showToast('验证码发送成功请注意查收');
							this.$refs.runCode.$emit('runCode');
							uni.hideLoading();
						} else {
							uni.hideLoading();
							uni.showModal({
								showCancel: false,
								title: '短信发送失败',
								content: res.msg ? res.msg : '请一分钟后再获取验证码',
							});
						}
					});
				}
			},
			isShowAgree() {
				//是否选择协议
				_this.showAgree = !_this.showAgree;
			},
			startReg() {
				var that = this
				uni.getSystemInfo({
					success: function(res) {
						console.log(res.model);
						if (res.model == 'iPhone') {
							that.sysphone = 2
						} else if (res.model != 'iPhone') {
							that.sysphone = 1
						}
					}
				});
				//注册
				if (that.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (that.showAgree == false) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '请先同意《协议》'
					});
					return false;
				}
				if (that.phoneData.length != 11) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '手机号不正确'
					});
					return false;
				}
				// if (that.passData.length < 5) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		position: 'bottom',
				// 		title: '密码不能低于六位'
				// 	});
				// 	return false;
				// }
				if (that.verCode == 6) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '验证码不正确'
					});
					return false;
				}
				that.isRotate = true;
				console.log('验证码', that.verCode, )
				// #ifdef H5
				this.platform = 'H5'
				// #endif
				// #ifdef APP
				this.platform = 'APP'
				// #endif
				var openid = this.$queue.getData("openid") ? this.$queue.getData("openid") : '';
				var inviterCode = that.$queue.getData("inviterCode") ? that.$queue.getData("inviterCode") : '';
				that.$Request.postJson("/app/Login/registerCode?password=" + that.passData + '&phone=' + that.phoneData +
					'&msg=' + that.verCode + '&platform=' + that.platform +
					'&userType=' + that.userType + '&sysphone=' + that.sysphone + '&openId=' + openid +
					'&inviterCode=' + that.invitation).then(res => {
					console.log(res)
					if (res.code == 0) {
						console.log(res.token)
						this.$queue.setData("token", res.token);
						this.$queue.setData("userId", res.user.userId);
						this.$queue.setData("mobile", res.user.phone);
						// this.getUserInfo(res.user.userId, res.token);
						uni.redirectTo({
							url: '/pages/my/my'
						});
						return false;
					} else {
						that.isRotate = false;
						uni.hideLoading();
						uni.showModal({
							showCancel: false,
							title: '登录失败',
							content: res.msg,
						});
					}
				});
			},
			getUserInfo(userId, token) {
				this.$Request.getT("/user/" + userId).then(res => {
					if (res.status === 0) {
						this.$queue.setData("image_url", res.data.image_url ? res.data.image_url :
							'/static/img/logo.jpg');
						this.$queue.setData("relation_id", res.data.relationId);
						this.$queue.setData("relation", res.data.invitation);
						this.$queue.setData("grade", res.data.grade);
						this.$queue.setData('pddpid', res.data.pdd);
						this.$queue.setData('jdpid', res.data.jd);
						this.$queue.setData("isInvitation", res.data.isInvitation);
						this.$queue.setData("nickName", res.data.nickName ? res.data.nickName : res
							.data.phone);
						this.$queue.setData("gender", parseInt(res.data.gender));
						let href = this.$queue.getData("href");
						if (href) {
							uni.navigateBack();
							this.$queue.remove("href");
						} else {
							uni.redirectTo({
								url: '/pages/my/my'
							});
						}
					} else {
						uni.showModal({
							showCancel: false,
							title: '登录失败',
							content: res.msg,
						});
						this.$queue.logout();
					}
					_this.isRotate = false
				});
			}
		}
	}
</script>

<style lang='scss'>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");

	page {
		background-color: #fff;
	}

	.headers {

		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}

	.headers image {
		border-radius: 100upx;
		width: 200rpx;
		height: 200rpx;
	}


	.back-btn {
		position: absolute;
		left: 20px;
		z-index: 9999;
		/* padding-top: var(--status-bar-height); */
		top: 20px;
		font-size: 20px;
		opacity: 0.8;
		color: #333333;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.bottom {
		line-height: 80upx;
		border-radius: 80upx;
		margin: 70rpx 50rpx;
		height: 80upx;
		font-size: 35rpx;
	}
</style>