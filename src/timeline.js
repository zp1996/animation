const DEFAULT_INTERVAL = 1000 / 60,
	STATE_INITIAL = 0,
	STATE_START = 1,
	STATE_STOP = 2;
export default class Timeline {
	constructor () {
		this.animationHandler = null;
		this.state = STATE_INITIAL;
	}
	onEnterFrame (time) {}
	/*
	 * start animation
	 * @param {int} the interval time
	 */
	start (interval) {
		if (this.state === STATE_START)
			return;
		this.state = STATE_START;
		this.interval = interval || DEFAULT_INTERVAL;
		startTimeline(this, +new Date());
	}
	/*
	 * restart animation
	 */
	restart () {
		if (this.state === STATE_START)
			return void 0;
		if (!this.dur || !this.interval) 
			return void 0;
		this.state = STATE_START;
		startTimeline(this, +new Date() - this.dur);
	}
	/*
	 * stop animation
	 */
	stop () {
		if (this.state !== STATE_START) 
			return void 0;
		this.state = STATE_STOP;
		// 形成无缝动画,防止动画出现偏差,将动画时间固定住
		this.dur = +new Date() - this.startTime;
		cancelAnimationFrame(this.animationHandler);
	}
}
/*
 * start timeline 
 * @param the instance of Timeline
 * @param the start time
 */
function startTimeline (timeline, startTime) {
	var lastTick = +new Date();
	timeline.startTime = startTime;
	(function nextTick () {
		var now = +new Date();
		timeline.animationHandler = requestAnimationFrame(nextTick);
		if (now - lastTick >= timeline.interval) {
			timeline.onEnterFrame(now - startTime);
			lastTick = now;
		}
	})();
}
// get the suitable way
var requestAnimationFrame = (function (w) {
	return w.requestAnimationFrame ||
		   w.webkitRequestAnimationFrame ||
		   w.mozRequestAnimationFrame ||
		   w.oRequestAnimationFrame ||
		   ((callback) => {
		   		setTimeout(callback, callback.interval || DEFAULT_INTERVAL); 
		   });
})(window);
var cancelAnimationFrame = (function (w) {
	return w.cancelAnimationFrame ||
	   w.webkitCancelAnimationFrame ||
	   w.mozCancelAnimationFrame ||
	   w.oCancelAnimationFrame ||
	   ((id) => {
	   		clearTimeout(id);
	   });
})(window);