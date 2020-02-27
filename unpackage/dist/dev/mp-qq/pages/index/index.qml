<view><view class="top"><uni-drawer vue-id="1" visible="{{drawer}}" data-event-opts="{{[['^close',[['closeDrawer']]]]}}" bind:close="__e" bind:__l="__l" vue-slots="{{['default']}}"><view class="welcome"><view class="uni-title">欢迎使用在南华小程序</view></view><view class="nth-week"><text>展示第几周课表</text><uni-number-box class="number" vue-id="{{('2')+','+('1')}}" min="{{1}}" max="{{25}}" value="{{week}}" data-event-opts="{{[['^change',[['changeWeek']]]]}}" bind:change="__e" bind:__l="__l"></uni-number-box></view><view class="co-inputTimaTable"><button class="inputTimetable" type="primary" data-event-opts="{{[['tap',[['inputTimeTable',['$event']]]]]}}" bindtap="__e">导入课表</button></view><view class="co-inputTimaTable"><button class="inputTimetable" style="top:260rpx;" type="primary" data-event-opts="{{[['tap',[['reInputTimetable',['$event']]]]]}}" bindtap="__e">重新导入</button></view></uni-drawer><view class="naviBar"><view data-event-opts="{{[['tap',[['displayDrewer',['$event']]]]]}}" class="drawer" bindtap="__e"><text class="drawer-text">{{"第"+week+"周 >"}}</text></view><text class="naviBarText">课程表</text></view></view><view class="co-weekday"><block wx:for="{{days}}" wx:for-item="day" wx:for-index="__i0__"><view class="weekdays" style="{{(day.isToday?'background-color: #FFFFFF;':'')}}"><text class="weekday" style="{{(day.isToday?'font-size: 30rpx; color: #78acff; font-weight: 700':'')}}">{{day.weekday}}</text><text class="date">{{day.dates+"号"}}</text></view></block></view><view class="co-left"><block wx:for="{{classTimes}}" wx:for-item="classTime" wx:for-index="__i1__"><view class="class-time"><text class="nth-class">{{classTime.nthClass}}</text><text class="time">{{classTime.time}}</text></view></block></view><view class="co-classes"><block wx:for="{{$root.l0}}" wx:for-item="kc" wx:for-index="index" wx:key="index"><view class="co-class"><view class="class" style="{{'background:'+(kc.$orig?kc.m0:'')+';'}}">{{''+kc.$orig+''}}</view></view></block></view></view>