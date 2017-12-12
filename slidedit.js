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
			mainCeil:'.lines'
		};

		this.opts = core.extend(defaultOpts,opts||{});

		this.bindData();
	};

	Slidedit.prototype = {

		bindData:function(){
			var that = this;
			that.mainDOM = core.$q(that.opts.mainCeil)[0];
			that.allLi = that.mainDOM.children;
			that.initX = 0;
			that.initY = 0;
			that.moveX = 0;
			that.moveY = 0;
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
					console.log(node,me);
					core.addListen(node,touchMove,function(e){
						var my = me;
						console.log(node);
						node.classList.add('on');
						var collectDOM = core.$q('.on .collect',my.mainDOM)[0];
						var delDOM = core.$q('.on .del',my.mainDOM)[0];
						var range = collectDOM.offsetWidth;
						console.log(range);
						var onCollect = function(val){
							return val>0 && val<range/4;
						};
						var ondel = function(val){
							return val>-range/4 && val<0;
						};
						
						var point = e.targetTouches[0];
						my.moveX = point.pageX;
						my.moveY = point.pageY;
						var diffY = my.moveY - my.initY;
						var diffX = my.moveX - my.initX;
						core.addTransition(delDOM,300);
						if(Math.abs(diffX)>Math.abs(diffY)){
							e.preventDefault();

							if(diffX>0){
								console.log("right");
							}else{
								console.log('left');
								core.setTranslateX(delDOM,diffX);
								if(diffX>-range/2){
									core.setTranslateX(delDOM,0);
								}else{
									core.setTranslateX(delDOM,-150);
								}
							}
							core.setTranslateX(delDOM,diffX);
						}else{
							return false;
						};
						return false;
					});
					core.addListen(node,touchEnd,function(e){
						node.classList.remove("on");
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



















