<script>
	import Vue from 'vue';
	export default {
		onLaunch: function() {
			

		},
		onShow: function() {
	

		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	@import '@/static/css/colorui-main.css';
	@import '@/static/css/colorui-icon.css';
</style>