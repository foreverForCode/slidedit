
/**
 *   name:slidedit for mobile
 *   author:jorden
 *   date:2017-12-11 
 */

;(function(window,factory){
	if(typeof define === "function" && define.amd){
		define(factory);
	}else if(typeof module === "object" && typeof module.exports === "object"){
		module.exports = factory();
	}else{
		window.slidedit = factory();
	}
})(this,function(){
	var liDOMS = null;
	var touchStart = 'touchstart',touchMove = 'touchmove',touchEnd = 'touchend';
	
	var Slidedit = function(opts){

		var defaultOpts = {
			mainCeil:'.lines',
			collectCeil:'.collect',
			delCeil:'.del'
		};

		this.opts = core.extend(defaultOpts,opts||{});

		this.bindData();
	};

	Slidedit.prototype = {

		bindData:function(){
			var that = this,opts = that.opts;
			that.mainDOM = core.$q(that.opts.mainCeil)[0];
			that.allLi = that.mainDOM.children;
			that.initX = 0;
			that.initY = 0;
			that.moveX = 0;
			that.moveY = 0;
			that.range = core.$q(opts.delCeil,that.mainDOM)[0].offsetWidth;
			that.init();
		},
		init:function(){
			var that = this;
			[].slice.call(that.allLi,0).forEach(function(node){
				
				core.addListen(node,touchStart,function(e){
					var me = that;
					var point = e.targetTouches[0];
					me.initX = point.pageX;
					me.initY = point.pageY;
					core.addListen(node,touchMove,function(e){
						var my = me;
						var movePoint = e.targetTouches[0];
						var delDOM = node.querySelectorAll(my.opts.delCeil)[0];
						core.addTransition(delDOM,300);
						my.moveX = movePoint.pageX;
						var diff = my.moveX - my.initX;
						var diffY = my.moveY - my.initY;
						if(Math.abs(diffY)>Math.abs(diff)) return;
						if(diff<0){
							core.setTranslateX(delDOM,diff);
						}
					});
					core.addListen(node,touchEnd,function(e){
						console.log(node,'is currentline');
						var my = me;
						var endPoint = e.changedTouches[0];
						var endX = endPoint.pageX;
						var endY = endPoint.pageY;
						var endDiff = endX - my.initX;
						var endDiffY = endY - my.initY;
						if(Math.abs(endDiffY) > Math.abs(endDiff)) return;
						var delDOM = node.querySelectorAll(my.opts.delCeil)[0];
						if(endDiff<0){
							if(Math.abs(endDiff)>my.range/2){
								core.setTranslateX(delDOM,-my.range);
							}else{
								core.setTranslateX(delDOM,0);
							}	
						}else{
							core.setTranslateX(delDOM,0);
						}
						
					});
				});
			});
		}
	};

	var slidedit = function(options){
		return new Slidedit(options);
	};

	return slidedit;
});



















