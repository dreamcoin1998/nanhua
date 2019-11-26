<template>
	<view>
		<!-- 顶部栏 -->
		<view class="top">
			<uni-drawer :visible="drawer" @close="closeDrawer">
			    <view class="welcome">
			        <view class="uni-title">欢迎使用在南华小程序</view>
			    </view>
				<view class="nth-week">
					<text>展示第几周课表</text>
					<uni-number-box class='number' @change="changeWeek" :min="1" :max="25" :value="week"></uni-number-box>
				</view>
				<view class="co-inputTimaTable">
					<button type="primary" class="inputTimetable" @click="inputTimeTable">导入课表</button>
				</view>
			</uni-drawer>
			<view class="naviBar">
				<view class="drawer" @click="displayDrewer">
					<text class="drawer-text">第{{week}}周 &gt;</text>
				</view>
				<text class="naviBarText">课程表</text>
			</view>
		</view>
		<!-- 日期 -->
		<view class="co-weekday">
			<view class="weekdays" v-for="day in days" :style="day.isToday? 'background-color: #FFFFFF;' : ''">
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
				<!-- <view class="class" :style="kc ? 'background: linear-gradient(#F88536, #F8C336);' : ''"> -->
				<view class="class" :style="{background: kc? background(index) : ''}">
					{{kc}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNumberBox from "../../components/uni-number-box/uni-number-box.vue"
	import uniDrawer from "../../components/uni-drawer/uni-drawer.vue"
	const app = getApp()
	import cookies from '../../vendor/weapp-cookie/dist/weapp-cookie'
	export default {
		components: {
			uniDrawer,
			uniNumberBox
		},
		data() {
			return {
				colorArrays: [ "#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
				background: function (index){
					var that = this
					return 	that.colorArrays[parseInt(Math.random()*8)%index]
				},
				drawer: false,
				week: "0",
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
				kcs: []
			}
		},
		onLoad() {
			var that = this
			// 取出缓存本周日的日期
			var Sunday = uni.getStorageSync('SundayDate')
			// 取出缓存第几周
			var week = uni.getStorageSync('nthWeek')
			if(week && Sunday){
				var sunday = new Date(Sunday)
				var today = new Date()
				var difValue = (today - sunday) / (1000 * 60 * 60 * 24)
				// 设置第几周
				if(difValue < 7){
					that.week = week
				}else{
					var delta = parseInt(difValue / 7)
					if(delta > 25){
						delta = 25
					}
					that.week = (parseInt(week) + delta).toString()
				}
				var strDate = today.getDate()
				var weekday = new Date().getDay() // 距离周日有几天
				// 渲染星期几和日期
				var todayTime = today.getTime()
				var targetSunday = new Date(todayTime - (1000 * 60 * 60 * 24 * weekday))
				var targetTime = targetSunday.getTime()
				// strDate = strDate - weekday // 本周日日期
				for(var t=0; t < 7; t++){
					var tgSunday = new Date(targetTime + (1000 * 60 * 60 * 24 * t))
					that.days[t].dates = tgSunday.getDate()
					strDate++
				}
				that.days[weekday].isToday = true
				// console.log(Boolean(uni.getStorageSync('timeTable')))
				// 获取课表缓存
				var timeTable = uni.getStorageSync('timeTable')
				if(timeTable){
					// 解析渲染课表
					// console.log(JSON.parse(timeTable))
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
								that.inputTimeTable()
							}
						}
					})
				}
			}
		},
		methods: {
			// 导入课表
			inputTimeTable(){
				if(uni.getStorageSync('timeTable')){
					uni.showToast({
						title: '已导入',
						icon: "none"
					})
				}else{
					var that = this
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
								// console.log('信息：', e)
								if(e.statusCode==200 && e.data.code==0){
									if(e.data.data){
										// 解析课表
										var kcs = that.jiexiTimeTable(e.data.data)
										that.kcs = kcs
										// 存入缓存
										var data = JSON.stringify(e.data.data)
										// console.log(data)
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
			},
			// 切换周数
			changeWeek(e){
				// 取出缓存本周日的日期
				var Sunday = uni.getStorageSync('SundayDate')
				// 取出缓存第几周
				var week = uni.getStorageSync('nthWeek')
				var timeTable = uni.getStorageSync('timeTable')
				if(timeTable){
					uni.showLoading({
						title: '切换中'
					})
					var parseTimeTable = JSON.parse(timeTable)
					console.log(parseTimeTable)
					var that = this
					that.week = e.toString()
					var kcs = that.jiexiTimeTable(parseTimeTable)
					that.kcs = kcs
					// 渲染日期
					var delta = e - week
					var weekdaySet = new Date(Sunday)
					var targetTime = parseInt(weekdaySet.getTime() + (1000 * 60 * 60 * 24 * 7 * delta))
					// var targetSunday = new Date(targetTime)
					// var strDate = targetSunday.getDate()
					for(var t=0; t < 7; t++){
						var targetSunday = new Date(targetTime + (1000 * 60 * 60 * 24 * t))
						that.days[t].dates = targetSunday.getDate()
					}
					uni.hideLoading()
				}
			},
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
						var weekList = classes[0][3].split(' ')
						for(var h = 0; h < weekList.length; h++){
							if(this.week == weekList[h]){
								data[weekday[0]] = classes[0]
								weekTimeClass.push(data)
							}
						}
					}
					let dt = {}
					dt[classTime[0]] = weekTimeClass
					resolve.push(dt)
				}
				// console.log(resolve)
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
					// console.log(kc)
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
				// console.log(kcs)
				return kcs
			},
			// 显示抽屉
			displayDrewer(){
				var that = this
				that.drawer = true
			},
			// 关闭抽屉
			closeDrawer(){
				var that = this
				that.drawer = false
			}
		}
	}
</script>

<style>
.co-inputTimaTable{
	position: relative;
}
.number{
	position: absolute;
	left: 100rpx; 
	top: 50rpx;
}
.inputTimetable{
	position: absolute;
	width: 260rpx;
	top: 130rpx;
	left: 100rpx;
}
.nth-week{
	position: relative;
	margin-top: 40rpx;
	font-size: 32rpx;
	line-height: 50rpx;
}
.welcome{
	padding:30rpx; 
	background-color: #78acff; 
	margin-top: 100rpx; 
	width: 100%; 
	/* border-radius: 0 25% 25% 0; */
	color: #FFFFFF;
}
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
	opacity: 0.8;
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
	border-radius: 20rpx;
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
	/* border-bottom: #78acff; */
	/* border-bottom-style: solid; */
	/* border-bottom-width: 1.5rpx; */
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
