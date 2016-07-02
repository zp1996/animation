/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/Users/apple/zp/LearnES2015/node_modules/react-hot-loader/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/Users/apple/zp/LearnES2015/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	"use strict";

	var _animation = __webpack_require__(2);

	var _animation2 = _interopRequireDefault(_animation);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// write 具体的代码
	window.Animation = function () {
		return new _animation2.default();
	};

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/Users/apple/zp/LearnES2015/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "main.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/Users/apple/zp/LearnES2015/node_modules/react-hot-loader/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/Users/apple/zp/LearnES2015/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * lsgogroup's animation library
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author zp
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


	var _preloader = __webpack_require__(3);

	var _preloader2 = _interopRequireDefault(_preloader);

	var _timeline = __webpack_require__(4);

	var _timeline2 = _interopRequireDefault(_timeline);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var STATE_INITIAL = 0,
	    STATE_START = 1,
	    STATE_STOP = 2,
	    TASK_SYNC = 0,
	    TASK_ASYNC = 1;

	var Animation = function () {
	  function Animation() {
	    _classCallCheck(this, Animation);

	    this.taskQueue = []; // task queue
	    this.index = 0; // current index
	    this.state = STATE_INITIAL; // current status
	    this.timeline = new _timeline2.default(); // control the async task
	  }
	  /*
	  	 * pre loading image
	  	 * @param {Array or Object} imglist
	  	 * @param {Function} every image success's callback function
	  	 * @param {Function} all is success's callback function
	  	 * @param {Boolean} is a async task
	  	 */


	  _createClass(Animation, [{
	    key: "loadImage",
	    value: function loadImage(imgList, callback, reject) {
	      reject = reject || function () {};
	      callback = callback || function () {};
	      var taskFun = function taskFun(next) {
	        (0, _preloader2.default)(imgList, function (src, i) {
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

	  }, {
	    key: "changePosition",
	    value: function changePosition(ele, pos, imgUrl) {
	      var _this = this;

	      var len = pos.length,
	          taskFn,
	          type;
	      if (len) {
	        taskFn = function taskFn(next, time) {
	          if (imgUrl) ele.style.background = "url(" + imgUrl + ")";
	          var index = Math.min(time / _this.interval | 0, len - 1);
	          ele.style.backgroundPosition = pos[index];
	          if (index === len - 1) {
	            next();
	          }
	        };
	        type = TASK_ASYNC;
	      } else {
	        taskFn = function taskFn(cb) {
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

	  }, {
	    key: "changeSrc",
	    value: function changeSrc(ele, imgList) {}
	    /*
	     * carry out the function every frame
	     * @param {Function}
	     */

	  }, {
	    key: "enterFrame",
	    value: function enterFrame(fn) {
	      var type = arguments.length <= 1 || arguments[1] === undefined ? TASK_ASYNC : arguments[1];

	      return this.add(fn, type);
	    }
	    /*
	     * start tasks
	     * @param {int} interval
	     */

	  }, {
	    key: "start",
	    value: function start(interval) {
	      if (this.state === STATE_START) return this;
	      if (this.taskQueue.length === 0) return this;
	      this.state = STATE_START;
	      this.interval = interval;
	      this.runTask();
	      return this;
	    }
	    /*
	     * repeat carry out a task 
	     * @param {int} times
	     */

	  }, {
	    key: "repeat",
	    value: function repeat(times) {
	      var _this2 = this;

	      var taskFun = function taskFun() {
	        if (times === void 0) {
	          _this2.index--;
	          _this2.runTask();
	          return void 0;
	        }
	        if (times) {
	          times--;
	          // go back
	          _this2.index--;
	          _this2.runTask();
	        } else {
	          _this2.next(_this2.taskQueue[_this2.index]);
	        }
	      };
	      return this.add(taskFun, TASK_SYNC);
	    }
	    /*
	     * loop carry out a task
	     * @param {int} times
	     */

	  }, {
	    key: "repeatForever",
	    value: function repeatForever() {
	      return this.repeat();
	    }
	    /*
	     * wait some times between two task
	     * @param {int} time
	     */

	  }, {
	    key: "wait",
	    value: function wait(time) {
	      if (this.taskQueue && this.taskQueue.length > 0) {
	        this.taskQueue[this.taskQueue.length - 1].wait = time;
	      }
	      return this;
	    }
	    /*
	     * stop current task
	     */

	  }, {
	    key: "pause",
	    value: function pause() {
	      if (this.state !== STATE_START) return this;
	      this.timeline.stop();
	      this.state = STATE_STOP;
	      return this;
	    }
	    /*
	     * restart current task
	     */

	  }, {
	    key: "restart",
	    value: function restart() {
	      if (this.state !== STATE_STOP) return this;
	      this.timeline.restart();
	      this.state = STATE_START;
	      return this;
	    }
	    /*
	     * task is over, and clean the mermory
	     */

	  }, {
	    key: "dispose",
	    value: function dispose() {
	      if (this.state === STATE_INITIAL) return this;
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

	  }, {
	    key: "then",
	    value: function then(cb) {
	      var taskFun = function taskFun(next) {
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

	  }, {
	    key: "add",
	    value: function add(taskFn, type) {
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

	  }, {
	    key: "runTask",
	    value: function runTask() {
	      if (!this.taskQueue || this.state !== STATE_START) return void 0;
	      if (this.index === this.taskQueue.length) {
	        this.dispose();
	        return void 0;
	      }
	      var task = this.taskQueue[this.index];
	      if (task.type === TASK_SYNC) this.syncTask(task);else this.asyncTask(task);
	    }
	    /*
	     * implement sync task
	     * @param {Object} task object
	     */

	  }, {
	    key: "syncTask",
	    value: function syncTask(task) {
	      var _this3 = this;

	      var next = function next() {
	        _this3.next(task);
	      };
	      task.taskFn(next);
	    }
	    /*
	     * implement async task
	     * @param {Object} task object
	     */

	  }, {
	    key: "asyncTask",
	    value: function asyncTask(task) {
	      var _self = this;
	      var enterframe = function enterframe(time) {
	        var taskFn = task.taskFn;
	        var next = function next() {
	          _self.timeline.stop();
	          _self.next(task);
	        };
	        taskFn(next, time);
	      };
	      this.timeline.onEnterFrame = enterframe;
	      this.timeline.start(this.interval);
	    }
	    /*
	     * move to next task
	     * @param {Object} task object
	     */

	  }, {
	    key: "next",
	    value: function next(task) {
	      var _this4 = this;

	      this.index++;
	      task.wait ? setTimeout(function () {
	        _this4.runTask();
	      }, task.wait) : this.runTask();
	    }
	  }]);

	  return Animation;
	}();

	exports.default = Animation;

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/Users/apple/zp/LearnES2015/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "animation.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/Users/apple/zp/LearnES2015/node_modules/react-hot-loader/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/Users/apple/zp/LearnES2015/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/*
	 * judge type function
	 * @param object
	 * @param string type
	 */
	var judgeType = function judgeType(obj, type) {
		return Object.prototype.toString.call(obj) === "[object " + type + "]";
	};
	/*
	 * pre loading image
	 * @param img list
	 * @param the max time of loading
	 * @param handle function
	 */
	function loadImage(images, timeout, fn) {
		if (Object.prototype.toString.call(timeout) === "[object Function]") {
			fn = timeout;
			timeout = 5000;
		}
		return new Promise(function (resolve, reject) {
			var key,
			    count = 0,
			    timer = null,
			    success = true;
			var handle = function handle(val, i) {
				if (judgeType(val, "String")) {
					val = {
						src: val
					};
					val.img = new Image();
					count++;
					key = i;
					load(val, i);
				}
			};
			if (judgeType(images, "Array")) {
				images.forEach(handle);
			} else {
				for (key in images) {
					if (images.hasOwnProperty(key)) handle(images[key], key);
				}
			}
			if (!count && key) {
				resolve();
			} else if (timeout) {
				timer = setTimeout(function () {
					reject();
				}, timeout);
			}
			// load the image
			function load(item, index) {
				var img = item.img,
				    done = function done() {
					img.onload = img.onerror = null;
					if (! --count && success) resolve();else reject();
				};
				img.onload = function () {
					success = success && true;
					fn && fn(img.src, index);
					done();
				};
				img.onerror = function () {
					success = false;
					done();
				};
				img.src = item.src;
			}
		});
	}
	exports.default = loadImage;

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/Users/apple/zp/LearnES2015/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "preloader.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/Users/apple/zp/LearnES2015/node_modules/react-hot-loader/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/Users/apple/zp/LearnES2015/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DEFAULT_INTERVAL = 1000 / 60,
	    STATE_INITIAL = 0,
	    STATE_START = 1,
	    STATE_STOP = 2;

	var Timeline = function () {
		function Timeline() {
			_classCallCheck(this, Timeline);

			this.animationHandler = null;
			this.state = STATE_INITIAL;
		}

		_createClass(Timeline, [{
			key: "onEnterFrame",
			value: function onEnterFrame(time) {}
			/*
	   * start animation
	   * @param {int} the interval time
	   */

		}, {
			key: "start",
			value: function start(interval) {
				if (this.state === STATE_START) return;
				this.state = STATE_START;
				this.interval = interval || DEFAULT_INTERVAL;
				startTimeline(this, +new Date());
			}
			/*
	   * restart animation
	   */

		}, {
			key: "restart",
			value: function restart() {
				if (this.state === STATE_START) return void 0;
				if (!this.dur || !this.interval) return void 0;
				this.state = STATE_START;
				startTimeline(this, +new Date() - this.dur);
			}
			/*
	   * stop animation
	   */

		}, {
			key: "stop",
			value: function stop() {
				if (this.state !== STATE_START) return void 0;
				this.state = STATE_STOP;
				// 形成无缝动画,防止动画出现偏差,将动画时间固定住
				this.dur = +new Date() - this.startTime;
				cancelAnimationFrame(this.animationHandler);
			}
		}]);

		return Timeline;
	}();
	/*
	 * start timeline 
	 * @param the instance of Timeline
	 * @param the start time
	 */


	exports.default = Timeline;
	function startTimeline(timeline, startTime) {
		var lastTick = +new Date();
		timeline.startTime = startTime;
		(function nextTick() {
			var now = +new Date();
			timeline.animationHandler = requestAnimationFrame(nextTick);
			if (now - lastTick >= timeline.interval) {
				timeline.onEnterFrame(now - startTime);
				lastTick = now;
			}
		})();
	}
	// get the suitable way
	var requestAnimationFrame = function (w) {
		return w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.mozRequestAnimationFrame || w.oRequestAnimationFrame || function (callback) {
			setTimeout(callback, callback.interval || DEFAULT_INTERVAL);
		};
	}(window);
	var cancelAnimationFrame = function (w) {
		return w.cancelAnimationFrame || w.webkitCancelAnimationFrame || w.mozCancelAnimationFrame || w.oCancelAnimationFrame || function (id) {
			clearTimeout(id);
		};
	}(window);

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/Users/apple/zp/LearnES2015/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "timeline.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }
/******/ ]);