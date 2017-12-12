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
				var who = that;
				core.addListen(node,touchStart,function(e){
					var me = who;
					var point = e.targetTouches[0];
					me.initX = point.pageX;
					me.initY = point.pageY;
					me.currentNode = node;
					core.addListen(me.currentNode,touchMove,function(e){
						var my = me;
						var delDOM = core.$q('.del',my.currentNode)[0];
						var point = e.targetTouches[0];
						my.moveX = point.pageX;
						var diffX = my.moveX - my.initX;
						core.addTransition(delDOM,300);
						if(diffX<0){
							core.setTranslateX(delDOM,diffX);
						}						
					});
					
					core.addListen(me.currentNode,touchEnd,function(e){
						var my = me;
						var point = e.changedTouches[0];
						var endX = point.pageX;
						var distanceX = endX - my.initX;
						var delDOM = core.$q('.del',my.currentNode)[0];
						
						if(distanceX<0){
							if(Math.abs(distanceX)>my.range/2){
								core.setTranslateX(delDOM,-my.range);	
							}else{
								core.setTranslateX(delDOM,0);	
							}
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



















