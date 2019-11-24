/*
用户授权模块
*/

// 判断用户是否授权
function isAuthorize(){
	return new Promise((resolve, reject) => {
		uni.getSetting({
			success(res) {
				console.log(res.authSetting['scope.userInfo'])
				if(res.authSetting['scope.userInfo']){
					console.log("已授权")
					resolve(res.authSetting['scope.userInfo'])
				}else{
					resolve(0)
				}
			}
		})
	})
}

// 用户登录：将前端获取到的信息请求服务端
// 封装成同步请求
function Login(app, userInfo){
	return new Promise((resolve, reject) => {
		// console.log(app.globalData.userInfo)
		uni.login({
			success(res){
				uni.request({
					url: app.globalData.host + app.globalData.apiVersion + "auth/qq_login",
					method: "POST",
					data: {
						code: res.code,
						userInfo: userInfo
					},
					success(result){
						resolve(result);
					},
					fail: (err) => {
						reject(false)
					}
				})
			}
		})
	})
}

// 获取用户信息
function getUserInfo(){
	return new Promise((resolve, reject) => {
		uni.getUserInfo({
			success(e) {
				console.log(e.userInfo)
				resolve(e.userInfo)
			}
		})
	})
}

// 从服务端获取用户信息
function getUserInfoFromServer(app){
	return new Promise((resolve, reject) => {
		uni.requestWithCookie({
			url: app.globalData.host + app.globalData.apiVersion + 'auth/yonghu_info/',
			success(res){
				console.log(res)
				if(res.statusCode == 200){
					resolve(res.data.results[0])
				}
			}
		})
	})
}

module.exports = {
	isAuthorize: isAuthorize,
	getUserInfo: getUserInfo,
	login: Login,
	getUserInfoFromServer: getUserInfoFromServer
}