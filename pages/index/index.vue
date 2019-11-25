<template>
	<view>
		<!-- 顶部栏 -->
		<view class="top">
			<uni-drawer :visible="drawer" @close="closeDrawer">
			    <view style="padding:30rpx;">
			        <view class="uni-title">抽屉式导航</view>
			    </view>
			</uni-drawer>
			
			<view class="naviBar">
				<view class="drawer" @click="displayDrewer">
					<text class="drawer-text">第14周 &gt;</text>
				</view>
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
		<view class="co-classes">
			<view class="co-class" v-for="(kc, index) in kcs">
				<view class="class" :style="kc ? 'background: linear-gradient(#F88536, #F8C336);' : ''">
					{{kc}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniDrawer from "../../components/uni-drawer/uni-drawer.vue"
	const app = getApp()
	import cookies from '../../vendor/weapp-cookie/dist/weapp-cookie'
	export default {
		components: {uniDrawer},
		data() {
			return {
				drawer: false,
				week: "14",
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
				}],
				weeks: 13,
				kcs: []
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
				var parseTimeTable = JSON.parse(timeTable)
				var kcs = that.jiexiTimeTable(parseTimeTable)
				that.kcs = kcs
			}else{
				// 课表不存在
				uni.showModal({
					title: "尚未导入课表",
					content: "是否现在导入课表",
					success(res) {
						if(res.confirm){
							uni.showLoading({
								title: '导入中'
							})
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
												var kcs = that.jiexiTimeTable(e.data.data)
												that.kcs = kcs
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
			// 解析课表
			jiexiTimeTable(parseTimeTable){
				var classes = []
				var resolve = []
				for(var index = 0; index < parseTimeTable.length; index++){
					let timeClass = parseTimeTable[index]
					let classTime = Object.keys(timeClass)
					let someClasses = Object.values(timeClass)
					let weekTimeClass = []
					for(var id = 0; id < someClasses[0].length; id++){
						let data = {}
						let weekday = Object.keys(someClasses[0][id])
						let classes = Object.values(someClasses[0][id])
						if(classes[0][3].search('14') != -1){
							data[weekday[0]] = classes[0]
							weekTimeClass.push(data)
						}
					}
					let dt = {}
					dt[classTime[0]] = weekTimeClass
					resolve.push(dt)
				}
				console.log(resolve)
				var kcs = []
				var w = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
				for(var x = 0; x < resolve.length; x++){
					var cles = Object.values(resolve[x])[0]
					// console.log(cles)
					var weeks = []
					var kc = []
					for(var e = 0; e < cles.length; e++){
						var kecheng = Object.values(cles[e])[0]
						kc.push(kecheng)
						var week = Object.keys(cles[e])[0]
						weeks.push(week)
					}
					console.log(kc)
					// console.log(weeks)
					for(var t = 0; t < 7; t++){
						var txt = ''
						for(var y = 0; y < kc.length; y++){
							if(weeks[y]==w[t]){
								txt += kc[y][0] + '\n@' + kc[y][4]
							}
						}
						kcs.push(txt)
					}
				}
				console.log(kcs)
				return kcs
			},
			displayDrewer(){
				var that = this
				that.drawer = true
			},
			closeDrawer(){
				var that = this
				that.drawer = false
			}
		}
	}
</script>

<style>
.drawer{
	height: 60rpx;
	width: 150rpx;
	border-radius: 0 30rpx 30rpx 0;
	background-color: #333333;
	position: absolute;
	left: 0;
	/* top: 15rpx; */
}
.drawer-text{
	line-height: 60rpx;
	margin: 0 auto;
	color: #FFFFFF;
}
.co-classes{
	display: inline-block;
	width: 675rpx;
	/* height: 440rpx; */
	float: right;
	/* position: relative; */
	/* background-color: #333333; */
}
.co-class{
	display: inline-block;
	width: calc(100% / 7);
	height: 230rpx;
	/* position: absolute; */
	/* background-color: #39B54A; */
	position: relative;
}
.class{
	position: absolute;
	display: inline-block;
	width: 95%;
	height: 220rpx;
	margin: 0 auto;
	/* 渐变色 */
	/* background: linear-gradient(#F88536, #F8C336); */
	text-align: center;
	color: #FFFFFF;
	/* font-weight: 700; */
	font-size: 25rpx;
	border-radius: 5%;
}
.co-left{
	display: inline-block;
	width: 75rpx;
	/* height: 100rpx; */
}
.class-time{
	height: 115rpx;
	text-align: center;
	position: relative;
}
.nth-class{
	display: block;
	line-height: 115rpx;
	font-size: 36rpx;
}
.time{
	display: block;
	width: 100%;
	margin: 0 auto;
	position: absolute;
	font-size: 22rpx;
	top: 80rpx;
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
	/* background-color: #39B54A; */
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
