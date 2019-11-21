const key = "cookie"

// 获取cookie
function getSessionIDFromResponse(res) {
  var cookie = res.header['Set-Cookie']
  console.log('get cookie from response: ', cookie)
  return cookie
}

// 设置缓存
function setCookieToStorage(cookie) {
  try {
    console.log(cookie)
    uni.setStorageSync(key, cookie)
  } catch (e) {
    console.log(e)
  }
}

// 从缓存中获取数据
function getCookieFromStorage() {
  var value = uni.getStorageSync(key)
  console.log(value)
  return value
}


module.exports = {
  setCookieToStorage: setCookieToStorage,
  getCookieFromStorage: getCookieFromStorage,
  getSessionIDFromResponse: getSessionIDFromResponse
}