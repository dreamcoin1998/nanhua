<script>
	import Authorization from "utils/authorize.js"
	export default {
		globalData: {
			userInfo: null,
			host: "http://127.0.0.1:8000/",
			apiVersion: "v1.0/"
		},
		onLaunch: function() {
			console.log('App Launch')	
			var that = this
			// console.log(that.$options.globalData)
			that.$options.getUserInfoByAuthorize()
		},
		// 如果globalData里面的userInfo不存在，用户授权，获取用户信息
		getUserInfoByAuthorize(){
			var that = this
			// 全局数据没有userInfo
			if(!that.globalData.userInfo){
				// 如果用户已授权
				if(Authorization.isAuthorize()){
					// 获取用户信息存储到userInfo
					that.globalData.userInfo = Authorization.getUserInfo()
				}
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	body {
		background-color: #f1f1f1;
		font-size: 28upx;
		color: #333333;
		font-family: Helvetica Neue, Helvetica, sans-serif;
	}
	view,
	scroll-view,
	swiper,
	button,
	input,
	textarea,
	label,
	navigator,
	image {
		box-sizing: border-box;
	}
	image {
		max-width: 100%;
		display: inline-block;
		position: relative;
		z-index: 0;
	}
	image.loading::before {
		content: "";
		background-color: #f5f5f5;
		display: block;
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: -2;
	}
	image.loading::after {
		content: "\e7f1";
		font-family: "cuIcon";
		position: absolute;
		top: 0;
		left: 0;
		width: 32upx;
		height: 32upx;
		line-height: 32upx;
		right: 0;
		bottom: 0;
		z-index: -1;
		font-size: 32upx;
		margin: auto;
		color: #ccc;
		-webkit-animation: cuIcon-spin 2s infinite linear;
		animation: cuIcon-spin 2s infinite linear;
		display: block;
	}
</style>