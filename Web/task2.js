
var arr = new Array(2, "4", 3, 1, "6", 8, 5);
function sortFunction(funcComp = function(a, b) { return a - b;}) {
	function swapByIndex(arr, i, j) {
		var tmp = arr[i];
		arr[i] = arr[j];
		arr[j] = tmp;
	}
	function partition(arr, p, q, funcComp) {
		var pivot = arr[q];
		var i = p;		// the wall
		for(var j = p; j < q; j++){
			if(funcComp(arr[j], pivot) < 0){
				swapByIndex(arr, i++, j);
			}
		}
		swapByIndex(arr, i, q);
		return i;
	}
	function qs(arr, p, q, funcComp) {
		if(p >= q) return;
		var x = partition(arr, p, q, funcComp);
		qs(arr, p, x - 1, funcComp);
		qs(arr, x + 1, q, funcComp);
	}
	qs(this, 0, this.length-1, funcComp);
	return this;
}
// Object.defineProperty(arr, 'sortoand', { 
// 	value: sortFunction
// });
Array.prototype.sortoand = sortFunction;


arr.sortoand();
// arr.sort();
console.log(arr);
