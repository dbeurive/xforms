// Initialize the module if we are running under node.
if ('undefined' !== typeof process) {
    module.exports = {};
    // Nothing to do.
}

var XRand = {

	integer: function(inMin, inMax) {
		return Math.round(Math.random() * (inMax - inMin) + inMin);
	},

	arrayOfIntegers: function(inMin, inMax, inCountMin, inOptCountMax, inOptDistinct) {
		var list  = [];
		var count = null;

		if ("undefined" === typeof inOptCountMax) {
			inOptCountMax = inCountMin;
		}

		if ("undefined" === typeof inOptDistinct) {
			inOptDistinct = false;
		}

		if (inCountMin > inOptCountMax) {
			throw "Invalid parameters \"inCountMin=" + inCountMin + "\" and \"inOptCountMax=" + inOptCountMax + "\" (the former if greater than the later).";
		}

		if (inCountMin != inOptCountMax) {
			count = this.integer(inCountMin, inOptCountMax);
		} else {
			count = inCountMin;
		}

		while (list.length < count) {
			var v = randInteger(min, max);
			if (inOptDistinct) {
				if (list.indexOf(v) == -1) {
					list.push(v);
				}
			}
		}
		return list;
	}
};




XRand.integer();

