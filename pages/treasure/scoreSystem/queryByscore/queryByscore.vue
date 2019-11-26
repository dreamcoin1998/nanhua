<template>
	<view>
		<login-module :loginTitle="loginTitle" :btnText="checkResult">
		</login-module>
	</view>
</template>

<script>
	import loginModule from '../../../template/loginModule.vue';
	import app from '../../../../App.vue';
	export default {
		data() {
			return {
				loginTitle: '课程给分查询'
			}
		},
		methods: {
			
		},
		onLoad(e) {
			let userInfo = app.globalData.userInfo;
			if(userInfo == null){
				uni.showModal({
					title:'没有权限',
					content: '您还未完成身份认证，请前往个人中心绑定',
					success() {
						uni.navigateBack();
					}
				});
			}
		}
	}
</script>

<style>

</style>
