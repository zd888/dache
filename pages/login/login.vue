<template>
	<view class="login">
		<view class="login_type">
			<view class="type_name">登录体验更多功能</view>
			<view class="type_tit">未注册过的请先申请注册账号</view>
		</view>
		<!-- 登录 -->
		<view class="login_input">
			<view class="numbers">
				<u-input v-model="numbers" :type="type" :clearable="clearable" placeholder="请输入手机号" />
			</view>
			<view class="password">
				<u-input v-model="password" :type="pass" :clearable="clearable" placeholder="请输入密码" />
			</view>
			<view class="submit" >
				登录
			</view>
			<view class="submit_bottom">
				<view class="bottom_left">忘记密码</view>
				<view class="bottom_right" @click="bindriderlogin">注册账号</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				numbers: '',
				password: '',
				type: 'number',
				pass: 'number',
				clearable: false
			}
		},
		methods: {
			bindriderlogin() {
				uni.navigateTo({
					url: '/pages/login/running_rider/running_rider'
				})
			},
			
		}
	}
</script>

<style>
	.login {
		width: 100%;
	}

	.login_type {
		width: 90%;
		margin: 0 auto;
		margin-top: 50rpx;
		margin-bottom: 135rpx;
	}

	.type_name {
		font-size: 38rpx;
		font-weight: bold;
		letter-spacing: 2rpx;
	}

	.type_tit {
		color: #999999;
		font-size: 21rpx;
		margin-top: 10rpx;
	}

	/* 登录 */
	.login_input {
		width: 80%;
		margin: 0 auto;
	}

	.numbers {
		height: 120rpx;
	}

	.u-input__input {
		border-bottom: 1rpx solid #E6E6E6 !important;
	}

	.submit {
		width: 100%;
		height: 90rpx;
		background: #FF7F00;
		color: white;
		text-align: center;
		line-height: 90rpx;
		border-radius: 20rpx;
		margin-top: 75rpx;
	}

	.submit_bottom {
		display: flex;
		height: 70rpx;
	}

	.bottom_left {
		flex: 1;
		color: #999999;
		font-size: 31rpx;
		display: flex;
		justify-content: left;
		align-items: center;
	}

	.bottom_right {
		flex: 1;
		color: #FF7F00;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
</style>
