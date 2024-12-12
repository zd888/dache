<template>
	<view class="count_down">
		<text style="color: #346EF6;">{{minutes1}}</text>
		<text style="color: #346EF6;">{{minutes}}</text>
		<text style="color: #346EF6;">:</text>
		<text style="color: #346EF6;">{{second1}}</text>
		<text style="color: #346EF6;">{{second}}</text>
	</view>
</template>

<script>
	export default {
		name: "timer",
		props: {
			auto: {
				type: Boolean,
				default: true
			}
		},
		watch: {
			Number: function(val) {
				this.countDown1 = this.Number
				this.countDown(this.Number)
				this.$emit('timing', this.Number)
			}
		},
		created() {
			if (this.auto) {
				this.interval = setInterval(() => {
					this.Number++
				}, 1000)
			}

		},
		data() {
			return {
				Number: 0,
				minutes: 0,
				minutes1: 0,
				second: 0,
				second1: 0,
				countDown1: 0,
				interval: null
			};
		},
		methods: {
			reset() {
				clearInterval(this.interval)
				this.Number = 0
				this.minutes = 0
				this.minutes1 = 0
				this.second = 0
				this.second1 = 0
				this.countDown1 = 0
				this.interval = setInterval(() => {
					this.Number++
				}, 1000)
			},
			start() {
				this.interval = setInterval(() => {
					this.Number++
				}, 1000)
			},
			clear() {
				clearInterval(this.interval)
			},
			countDown(countDown) {
				if (countDown > 59) {
					let d = parseInt(countDown / 60)
					let minute = d.toString().split('')
					if (minute.length == 1) {
						this.minutes = minute[0]
						this.minutes1 = 0
					} else {
						this.minutes1 = minute[0]
						this.minutes = minute[1]
					}

					let dd = countDown % 60
					let numbers = dd.toString().split('')
					if (numbers.length == 1) {
						this.second1 = 0
						this.second = numbers[0]
					} else {
						this.second1 = numbers[0]
						this.second = numbers[1]
					}
				} else {
					this.minutes = 0
					this.minutes1 = 0
					let numbers = countDown.toString().split('')
					if (numbers.length == 1) {
						this.second = numbers[0]
						this.second1 = 0
					} else {
						this.second1 = numbers[0]
						this.second = numbers[1]
					}

				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.count_down {
		display: flex;
		align-items: center;
		// margin-bottom: 60rpx;
		justify-content: center;
		margin-left: 5rpx;
		/* #ifdef APP */
		flex-direction: row;
		/* #endif */


		text {
			display: block;

			margin-right: 6rpx;
			font-size: 30rpx;
			// font-weight: bold;
		}

		.maohao {
			padding: 0 10rpx;
			font-size: 30rpx;
			font-weight: bold;
		}
	}
</style>