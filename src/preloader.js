/*
 * judge type function
 * @param object
 * @param string type
 */
const judgeType = (obj, type) => {
	return Object.prototype.toString.call(obj) === "[object " + type + "]"; 
};
/*
 * pre loading image
 * @param img list
 * @param the max time of loading
 * @param handle function
 */	
function loadImage (images, timeout, fn) {
	if (Object.prototype.toString.call(timeout) === "[object Function]") {
		fn = timeout;
		timeout = 5000;		
	}
	return new Promise((resolve, reject) => {
		var key, 
			count = 0,
			timer = null,
			success = true;
		var handle = (val, i) => {
			if (judgeType(val, "String")) {
				val = {
					src: val
				};
				val.img = new Image();
				count++;
				key = i
				load(val, i);
			} 
		};
		if (judgeType(images, "Array")) {
			images.forEach(handle);
		} else {
			for (key in images) {
				if (images.hasOwnProperty(key))
					handle(images[key], key);
			}
		}
		if (!count && key) {
			resolve();
		} else if (timeout) {
			timer = setTimeout(() => {
				reject();
			}, timeout);
		}
		// load the image
		function load (item, index) {
			var img  = item.img,
				done = () => {
					img.onload = img.onerror = null;
					if (!--count && success)
						resolve();
					else
						reject();
				};
			img.onload = () => {
				success = success && true;
				fn && fn(img.src, index);
				done();
			};
			img.onerror = () => {
				success = false;
				done();
			};
			img.src = item.src;
		}
	});
}
export default loadImage;