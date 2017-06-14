# scroll-bottom
Scroll 模块提供添加和移除浏览器滚动条触底事件监听，兼容amd、cmd、全局引用
## Api
* addScrollToBottomEventLisener
* removeScrollToBottomEventLisener
## usage
```typescript
// 添加事件监听
Scroll.addScrollToBottomEventLisener(handler: function, options?: object)；
// 移除事件监听
Scroll.removeScrollToBottomEventLisener();
```
## options 
可选配置参数
```typescript
options: {
  //是否有列表数据正在处理中，取决于你的列表首页是通过什么方式加载的，如果是后端模板生成则设为false。默认为true
  handling: bollean,
  // 触发事件时滚动条与底部的距离，默认为100
  distance: number,
  // 探测触底事件的延迟时间，相对于window.scroll事件而言，默认为300(ms)
  delayTime: number
}
```
