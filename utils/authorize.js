/*
用户授权模块
*/

// 判断用户是否授权
function isAuthorize(){
	uni.getSetting({
		success(res) {
			console.log(res.authSetting['scope.userInfo'])
			if(res.authSetting['scope.userInfo']){
				return true
			}else{
				return false
			}
		}
	})
}

// 用户登录：将前端获取到的信息请求服务端
// 封装成同步请求
function Login(app){
	return new Promise((resolve, reject) => {
		uni.login({
			success(res){
				uni.request({
					url: app.globalData.host + app.globalData.apiVersion + "auth/qq_login",
					method: "POST",
					data: {
						code: res.code,
						userInfo: app.globalData.userInfo
					},
					success(result){
						resolve(result);
					},
					fail: (err) => {
						reject('err')
					}
				})
			}
		})
	})
}

// 获取用户信息
function getUserInfo(){
	uni.getUserInfo({
		success(e) {
			console.log(e.userInfo)
			return e.userInfo
		}
	})
}

module.exports = {
	isAuthorize: isAuthorize,
	getUserInfo: getUserInfo,
	login: Login
}