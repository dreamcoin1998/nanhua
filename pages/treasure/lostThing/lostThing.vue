<template>
	<view>
		<view class="lost_navigate">
			<view class="report_lost">报失</view>
			<view class="report_find">招领</view>
			<button size="mini" @click="lostPublish">发布</button>
		</view>
		<lost-thing :lostName="lostName" :lostOwner="lostOwner" :lostTime="lostTime"></lost-thing>
	</view>
</template>

<script>
	import lostThing from '../../template/lostThingModal.vue'
	export default {
		data() {
			return {
				lostName: 'ipad11 dmlksa',
				lostOwner: '郑浩',
				lostTime: '11月12号',
			}
		},
		methods: {
			lostPublish(){
				uni.navigateTo({
					url: 'lostPublish/lostPublish'
				})
			}
		},
		components:{
			lostThing
		}
	}
</script>

<style>
.lost_navigate{
	background: #78ACFF;
	display: flex;
	color:white;
}
</style>
