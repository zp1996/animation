/*
 * lsgogroup's animation library
 * @author zp
 */
import LoadImage from "./preloader";
import Timeline from "./timeline";

const STATE_INITIAL = 0,
	STATE_START = 1,
	STATE_STOP = 2,
	TASK_SYNC = 0,
	TASK_ASYNC = 1;
export default class Animation {
	constructor () {
		this.taskQueue = [];		 	// task queue
		this.index = 0;              	// current index
		this.state = STATE_INITIAL;  	// current status
		this.timeline = new Timeline(); // control the async task 
	}
	/*
 	 * pre loading image
 	 * @param {Array or Object} imglist
 	 * @param {Function} every image success's callback function
 	 * @param {Function} all is success's callback function
 	 * @param {Boolean} is a async task
 	 */
	loadImage (imgList, callback, reject) {
		reject = reject || function () {};
		callback = callback || function () {};
		var taskFun = (next) => {
			LoadImage(imgList, (src, i) => {
				callback(src, i);
			}).then(next, reject);
		};
		return this.add(taskFun, TASK_SYNC);
	}
	/*
 	 * change ele's background-position
 	 * @param {HTML Element} dom element
 	 * @param {Array} postion array
 	 * @param {string} img's url
 	 */
 	changePosition (ele, pos, imgUrl) {
 		var len = pos.length, taskFn, type;
 		if (len) {
 			taskFn = (next, time) => {
 				if (imgUrl) 
 					ele.style.background = "url(" + imgUrl + ")";
 				var index = Math.min(time / this.interval | 0, len - 1);
 				ele.style.backgroundPosition = pos[index];
 				if (index === len - 1) {
 					next();
 				}
 			};
 			type = TASK_ASYNC;
 		} else {
 			taskFn = (cb) => {
 				cb && cb();
 			};
 			type = TASK_SYNC;
 		}
 		return this.add(taskFn, type);
 	}
 	/*
 	 * change ele's background-image url
 	 * @param {HTML Element} dom element
 	 * @param {Array or Object} img url array
 	 */
 	 changeSrc (ele, imgList) {

 	 }
 	/*
 	 * carry out the function every frame
 	 * @param {Function}
 	 */
 	enterFrame (fn, type = TASK_ASYNC) {
 		return this.add(fn, type);
 	}
 	/*
 	 * start tasks
 	 * @param {int} interval
 	 */
 	start (interval) {
 		if (this.state === STATE_START) 
 			return this;
 		if (this.taskQueue.length === 0)
 			return this;
 		this.state = STATE_START;
 		this.interval = interval;
 		this.runTask();
 		return this;
 	}
 	/*
 	 * repeat carry out a task 
 	 * @param {int} times
 	 */
 	repeat (times) {
 		var taskFun = () => {
 			if (times === void 0) {
 				this.index--;
 				this.runTask();
 				return void 0;
 			}
 			if (times) {
 				times--;
 				// go back
 				this.index--;
 				this.runTask();
 			} else {
 				this.next(this.taskQueue[this.index]);
 			}
 		};
 		return this.add(taskFun, TASK_SYNC);
 	}
 	/*
 	 * loop carry out a task
 	 * @param {int} times
 	 */
 	repeatForever () {
 		return this.repeat();
 	}
 	/*
 	 * wait some times between two task
 	 * @param {int} time
 	 */
 	wait (time) {
 		if (this.taskQueue && this.taskQueue.length > 0) {
 			this.taskQueue[this.taskQueue.length - 1].wait = time;
 		}
 		return this;
 	}
 	/*
 	 * stop current task
 	 */
 	pause () {
 		if (this.state !== STATE_START)
 			return this;
 		this.timeline.stop();
 		this.state = STATE_STOP;
 		return this;
 	}
 	/*
 	 * restart current task
 	 */
 	restart () {
 		if (this.state !== STATE_STOP)
 			return this;
 		this.timeline.restart();
 		this.state = STATE_START;
 		return this;
 	}
 	/*
 	 * task is over, and clean the mermory
 	 */
 	dispose () {
 		if (this.state === STATE_INITIAL)
 			return this;
		this.state = STATE_INITIAL;
		this.taskQueue = null;
		this.timeline.stop();
		this.timeline = null;
		return this;
 	}
 	/*
 	 * add a clean task into taskQueue
 	 * @param {Function} task function
 	 */
 	then (cb) {
 		var taskFun = (next) => {
 			cb();
 			next();
 		};
 		return this.add(taskFun, TASK_SYNC);
 	}
 	/*
 	 * add a task into taskQueue
 	 * @param {Function} task function
 	 * @param {int} task type
 	 */
 	add (taskFn, type) {
 		this.taskQueue.push({
 			taskFn: taskFn,
 			type: type
 		});
 		return this;
 	}
 	/*
 	 * implement task
 	 * @param {Function} task function
 	 * @param {int} task type
 	 */
 	runTask () {
 		if (!this.taskQueue || this.state !== STATE_START)
 			return void 0;
 		if (this.index === this.taskQueue.length) {
 			this.dispose();
 			return void 0;
 		}
 		var task = this.taskQueue[this.index];
 		if (task.type === TASK_SYNC)
 			this.syncTask(task);
 		else 
 			this.asyncTask(task);
 	}
 	/*
 	 * implement sync task
 	 * @param {Object} task object
 	 */
 	syncTask (task) {
 		var next = () => {
 			this.next(task);
 		};
 		task.taskFn(next);
 	}
 	/*
 	 * implement async task
 	 * @param {Object} task object
 	 */
 	asyncTask (task) {
 		var _self = this;
 		var enterframe = (time) => {
 			var taskFn = task.taskFn;
 			var next = () => {
 				_self.timeline.stop();
 				_self.next(task);
 			}
 			taskFn(next, time);
 		};
 		this.timeline.onEnterFrame = enterframe;
 		this.timeline.start(this.interval);
 	}
 	/*
 	 * move to next task
 	 * @param {Object} task object
 	 */
 	next (task) {
 		this.index++;
 		task.wait ? setTimeout(() => {
 			this.runTask();
 		}, task.wait) : this.runTask();
 	}
}