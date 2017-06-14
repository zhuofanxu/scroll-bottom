/**
 * @author zhuofanxu
 * @module Scroll
 * Scroll 模块提供添加和移除浏览器滚动条触底事件监听，兼容amd、cmd、全局引用 js插件式写法 
 */
; (function () {
    /**
     * 包含浏览器滚动事件相关变量的对象
    */
    var config = {
        scrollTop: 0,
        lastScrollTop: 0,
        scrollDirection: 'no',
        handling: true,
        delayTime: 300,
        distance: 100,
        scrollEventHandler: function() {}
    }

    // some functions used by module itself
    
    /**
     * 扩展目标对象属性
     * @param {object} source 源对象
     * @param {object} target 被扩展的目标对象
     */
    function _extend(source, target) {
        for (var i in source) {
            if (source.hasOwnProperty(i) && !target.hasOwnProperty(i)) {
                target[i] = source[i];
            }
        }
        return target;
    }
   
    /**
     * 获取文档可视区域高度
     */
    function _getClientHeight() {
        var clientHeight = 0;
        if (document.body.clientHeight && document.documentElement.clientHeight) {
            clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
        } else {
            clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
        }
        return clientHeight;
    }
    /**
     * 获取文档完整高度
     */
    function _getDocumentHeight() {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    }
    /**
     * 获取滚动条当前位置
     */
    function _getScrollTop() {
        return document.documentElement.scrollTop || document.body.scrollTop;
    }
    
    // constructor
    function Scroll() { }

    // static method

    /**
     * 添加浏览器滚动到底部事件监听器 通过监听window scroll事件实现
     * @param {function} handler 事件触发时的回调函数
     */
    Scroll.addScrollToBottomEventLisener = function (handler) {
        // 可选配置参数
        if(typeof arguments[1] === 'object') {
            config.handling = typeof arguments[1].handling === 'boolean' ? arguments[1].handling : config.handling;
            config.distance = arguments[1].distance || config.distance;
            config.delayTime = arguments[1].delayTime || config.delayTime;
        }
        // 浏览器滚动事件处理函数定义
        config.scrollEventHandler = function (evt) {
            config.scrollTop = _getScrollTop();
            setTimeout(function() {
                if(config.handling) {
                    // 如果handler函数正在处理，则忽略触底事件
                    return;
                }
                if(config.scrollTop > config.lastScrollTop) {
                    config.scrollDirection = 'down';
                } else if(config.scrollTop < config.lastScrollTop) {
                    config.scrollDirection = 'up';
                }
                var offset = _getDocumentHeight() - config.scrollTop - _getClientHeight();
                
                if(config.scrollDirection === 'down' && offset <= config.distance) {
                    config.handling = true;
                    // 调用滚动触底处理函数 由addScrollToBottomEventLisener使用用者传入
                    handler();
                }
                // console.log(offset);
                // console.log(config.scrollDirection, config.scrollTop, config.lastScrollTop);
                // 更新lastScrollTop
                config.lastScrollTop = config.scrollTop;
            }, config.delayTime);
        };
        // window onload 事件后再添加事件监听
        if (window.addEventListener) {
            window.addEventListener("load", loadEventHandler, false);
        } else if (window.attachEvent) {
            window.attachEvent("onload", loadEventHandler);
        } else if (window.onload) {
            window.onload = loadEventHandler;
        }
        function loadEventHandler(evt) {
            config.scrollTop = _getScrollTop();
            config.lastScrollTop = config.scrollTop;
            console.log(config.scrollTop, config.scrollDirection);
            window.addEventListener('scroll', config.scrollEventHandler);
        }
    }
    /**
     * 移除浏览器滚动到底部事件监听器
     * @param {function} handler 事件处理函数
     */
    Scroll.removeScrollToBottomEventLisener = function () {
        window.removeEventListener('scroll', config.scrollEventHandler);
    }
    /**
     * 浏览器滑动触底事件处理完毕
     */
    Scroll.scrollBottomHanleDone = function () {
        config.handling = false;
    }
    
    // module export
    var exportModule = Scroll, moduleName = 'Scroll';
    // for cmd module
    if (typeof module !== 'undefined' && typeof exports === 'object' && define.cmd) {
        module.exports = exportModule;
    }
    // for amd module
    else if (typeof define === 'function' && define.amd) {
        define(function () { return exportModule; });
    }
    // for global refrence
    else {
        this[moduleName] = exportModule;
    }
}).call(typeof window !== 'undefined' ? window : global);
