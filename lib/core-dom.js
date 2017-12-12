
/**
 *   author : jorden
 *   作用：常用的参数库总结
 */

;(function (window,factory){
	if(typeof define === "function" && define.amd){
		define(factory);
	}else if(typeof module === "object" && typeof module.exports === "object"){
		module.exports = factory();
	}else{
		window.core = factory();
	}
})(this,function(){
	var tostr = Object.prototype.toString;
    // 常用的类型判断
	var utility = {
		isString:function(a){
			return tostr.call(a) ==='[object String]';
		},
		isNumber:function(b){
			return tostr.call(b) === '[object Number]';
		},
		isArray:function(c){
			return tostr.call(c) === '[object Array]';
		},
		isDate:function(d){
			return tostr.call(d) === '[object Date]';
		},
		isFunction:function(e){
			return tostr.call(e) === '[object Function]';
		}
		
	};
	// Dom 查找
	var $q = function(select,context){
		context = utility.isString(context) || document;
		try{
			utility.isString(select);
			return context.querySelectorAll(select);
		}catch(err){
			console.log("select or context not a string type");
		};
		return false;
	};
	var addListen = function(dom,type,fn){
		if(!dom) return false;
		return dom.addEventListener(type,fn,false);
	};
	var removeListen = function(dom,type,fn){
		if(!dom) return false;
		return dom.removeEventListener(type,fn,false);
	};
	var extend = function(source,options){
		return Object.assign(source,options);
	};

	// 针对移动端
	// 添加过渡函数
    var addTransition =  function (dom, speed) {
        dom.style.transition = "all +" + speed + "+ms";
        dom.style.webkitTransition = "all " + speed + "ms"; /*做兼容*/
    };
    // 移除过渡函数
    var removeTransition = function (dom) {
        dom.style.transition = "none";
        dom.style.webkitTransition = "none"; /*做兼容*/
    };
    // 移动函数
    var setTranslateX = function (dom, translatex) {
        dom.style.transform = "translateX(" + translatex + "px)";
        dom.style.webkitTransition = "translateX(" + translatex + "px)";
    };


	return {
		utility:utility,
		$q:$q,
		addListen:addListen,
		removeListen:removeListen,
		extend:extend,
		addTransition:addTransition,
		removeTransition:removeTransition,
		setTranslateX:setTranslateX
		
	};
});










