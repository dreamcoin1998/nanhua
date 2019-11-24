<template>
	<view>
		<!-- 顶部栏 -->
		<view class="top">
			<text class="naviBarText">课程表</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
.top{
	width: 100%;
	height: 152rpx;
	background-color: #78acff;
}
.naviBarText{
	font-size: 30rpx;
}
</style>
