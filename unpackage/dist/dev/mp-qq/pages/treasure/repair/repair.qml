<view class="sWhole_box"><block wx:for="{{repairThing}}" wx:for-item="item" wx:for-index="index"><view class="score_container"><text class="score_text">{{item}}</text><input type="text" placeholder="{{placeholder[index]}}" data-event-opts="{{[['input',[['inputNum',['$event']]]]]}}" value="{{stuNum}}" bindinput="__e"/></view></block><button data-event-opts="{{[['tap',[['login',['$event']]]]]}}" class="btn_type" bindtap="__e">报修</button></view>