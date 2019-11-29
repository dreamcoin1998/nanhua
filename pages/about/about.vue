<template>
	<!-- main部分 -->
	<view class="main">
		<!-- 标题部分 -->
		<view class="co-title">
			<text class="title">关于在南华</text>
		</view>
		<!-- 内容部分 -->
		<view class="co-content">
			<text class="content">“在南华”小程序是一款由南华大学学生团队开发，专注于服务南华大学学生的QQ小程序，基于南华大学教务在线，南华大学官网，生活789等南华大学学子常用的平台开发而成。</text>
		</view>
		<view class="co-content">
			<text class="content">小程序使用前需要进行南华大学教务在线认证，用户的账号和密码信息都做过了安全的传输和处理，请放心使用。</text>
		</view>
		<view class="co-content">
			<text class="content">团队由南华大学资源环境与安全工程学院和机械工程学院大三学生组成，由于即将到来的提前的一个月考试和课程设计原因，目前仅提供查课表功能，未来还将提供查成绩，校园二手交易，校园代办平台，校园新鲜事等丰富的功能。</text>
		</view>
		<view class="co-content" style="text-align: center;">
			<text class="content" style="color: red; font-size: 32rpx; font-weight: 700;">敬请期待！</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.co-content{
	margin-top: 30rpx;
	width: 100%;
}
.content{
	font-size: 30rpx;
}
.main{
	margin: 30rpx 5% 0 5%;
	background-color: #FFFFFF;
	border-radius: 20.25rpx;
}
.co-title{
	width: 100%;
	height: 80rpx;
	text-align: center;
}
.title{
	width: 100%;
	line-height: 80rpx;
	font-size: 35rpx;
	font-weight: 700;
}
</style>
