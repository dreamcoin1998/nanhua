<template>
	<view>
		<!-- 顶部栏 -->
		<view class="top">
			<view class="naviBar">
				<text class="naviBarText">课程表</text>
			</view>
		</view>
		<!-- 日期 -->
		<view class="co-weekday">
			<view class="weekdays" v-for="day in days">
				<text class="weekday" :style="day.isToday? 'font-size: 30rpx; color: #78acff; font-weight: 700': ''">{{day.weekday}}</text>
				<text class="date">{{day.dates}}号</text>
			</view>
		</view>
		<!-- 侧边栏——课时时间 -->
		<view class="co-left">
			<view class="class-time" v-for="classTime in classTimes">
				<text class="nth-class">{{classTime.nthClass}}</text>
				<text class="time">{{classTime.time}}</text>
			</view>
		</view>
		<!-- 课程 -->
		<!-- 星期一 -->
		<view class="monday">
			<text class="class"></text>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	import cookies from '../../vendor/weapp-cookie/dist/weapp-cookie'
	export default {
		data() {
			return {
				days: [{
					weekday: "周日",
					dates: '',
					isToday: false
				},{
					weekday: "周一",
					dates: '',
					isToday: false
				},{
					weekday: '周二',
					dates: '',
					isToday: false
				},{
					weekday: '周三',
					dates: '',
					isToday: false
				},{
					weekday: '周四',
					dates: '',
					isToday: false
				},{
					weekday: '周五',
					dates: '',
					isToday: false
				},{
					weekday: '周六',
					dates: '',
					isToday: false
				}],
				classTimes: [{
					nthClass: "1",
					time: "8:20"
				},{
					nthClass: "2",
					time: "9:15"
				},{
					nthClass: "3",
					time: "10:20"
				},{
					nthClass: "4",
					time: "11:15"
				},{
					nthClass: "5",
					time: "14:30"
				},{
					nthClass: "6",
					time: "15:25"
				},{
					nthClass: "7",
					time: "16:30"
				},{
					nthClass: "8",
					time: "17:25"
				},{
					nthClass: "9",
					time: "19:30"
				},{
					nthClass: "10",
					time: "20:25"
				}]
			}
		},
		onLoad() {
			// 渲染星期几和日期
			var that = this
			var date = new Date();
			var weekday = new Date().getDay() // 距离周日有几天
			var strDate = date.getDate() // 当前日期
			strDate = strDate - weekday // 本周日日期
			for(var t=0; t < 7; t++){
				that.days[t].dates = strDate
				strDate++
			}
			that.days[weekday].isToday = true
			// console.log(Boolean(uni.getStorageSync('timeTable')))
			// 获取课表缓存
			var timeTable = uni.getStorageSync('timeTable')
			if(timeTable){
				// 解析渲染课表
				console.log(JSON.parse(timeTable))
			}else{
				// 课表不存在
				uni.showModal({
					title: "尚未导入课表",
					content: "是否现在导入课表",
					success(res) {
						uni.showLoading({
							title: '导入中'
						})
						if(res.confirm){
							// 如果尚未登陆
							if(!app.globalData.userInfo){
								uni.hideLoading()
								uni.showToast({
									icon: "none",
									title: "您尚未授权登录",
									duration: 2000
								})
							}else{
								uni.requestWithCookie({
									url: app.globalData.host + app.globalData.apiVersion + "api/timetable/" + "?TimeName=2019-2020-1&openid=" + app.globalData.userInfo.openid,
									success: function(e){
										console.log('信息：', e)
										if(e.statusCode==200 && e.data.code==0){
											if(e.data.data){
												// 解析课表
												
												// 存入缓存
												var data = JSON.stringify(e.data.data)
												console.log(data)
												uni.setStorageSync('timeTable', data)
												uni.hideLoading()
												uni.showToast({
													title: "导入成功"
												})
											}else{
												uni.hideLoading()
												uni.showToast({
													title: "导入失败"
												})
											}
										}
									}
								})
							}
						}
					}
				})
			}
		},
		methods: {

		}
	}
</script>

<style>
.co-left{
	display: inline-block;
	width: 75rpx;
	/* height: 100rpx; */
}
.class-time{
	height: 100rpx;
	text-align: center;
	position: relative;
}
.nth-class{
	display: block;
	line-height: 100rpx;
	font-size: 36rpx;
}
.time{
	display: block;
	width: 100%;
	margin: 0 auto;
	position: absolute;
	font-size: 22rpx;
	top: 70rpx;
}
.co-weekday{
	margin-left: 75rpx;
	height: 75rpx;
	width: 675rpx;
	border-bottom: #78acff;
	border-bottom-style: solid;
	border-bottom-width: 1.5rpx;
}
.weekdays{
	display: inline-block;
	width: calc(100% / 7);
	height: 75rpx;
	text-align: center;
}
.weekday{
	display: block;
	font-size: 24rpx;
	line-height: calc(75rpx * 0.65);
}
.date{
	display: block;
	font-size: 20rpx;
	line-height: calc(75rpx * 0.35);
}
.top{
	width: 100%;
	height: 152rpx;
	background-color: #78acff;
	text-align: center;
	position: relative;
}
.naviBar{
	position: absolute;
	top: 82rpx;
	width: 100%;
	height: 70rpx;
}
.naviBarText{
	font-size: 35rpx;
	color: #FFFFFF;
	line-height: 70rpx;
}
</style>
