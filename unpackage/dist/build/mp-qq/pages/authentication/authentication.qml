<view><view class="co-logo"><image class="logo" src="../../static/logo.png" mode></image></view><view class="co-tip"><view class="tip">登录南华大学教务在线</view></view><view class="co-co-input"><view class="co-input"><input class="input" type="number" maxlength="11" placeholder="学号" placeholder-class="username-placeholder" data-event-opts="{{[['input',[['onUserNameInput',['$event']]]]]}}" bindinput="__e"/></view><view class="co-input"><input class="input" type="text" password="true" placeholder="密码" placeholder-class="username-placeholder" data-event-opts="{{[['input',[['onPasswordInput',['$event']]]]]}}" bindinput="__e"/></view></view><view class="co-login"><button class="login-button" open-type="getUserInfo" data-event-opts="{{[['getuserinfo',[['onLogin',['$event']]]]]}}" bindgetuserinfo="__e"></button></view></view>