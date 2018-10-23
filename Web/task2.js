// Array.orest = function(str) {
// 	console.log(str);
// }
var arr = new Array(2, "4", 3, 1, "6", 8, 5);
function sortFunction(funcComp = function(a, b) { return a - b;}) {
	function partition(arr, p, q, funcComp) {
		var pivot = arr[q];
		var i = p;		// the wall
		for(var j = p; j < q; j++){
			if(funcComp(arr[j], pivot) < 0){
				var tmp = arr[i];
				arr[i] = arr[j];
				arr[j] = tmp;
				i++;
			}
		}
		var element = arr[i];
		arr[i] = arr[q];
		arr[q] = element;
		return i;
	}
	function qs(arr, p, q, funcComp) {
		if(p >= q) return;
		var x = partition(arr, p, q, funcComp);
		console.log("x = " + x);
		console.log(arr);
		qs(arr, p, x - 1, funcComp);
		qs(arr, x + 1, q, funcComp);
	}
	qs(this, 0, this.length-1, funcComp);
	return this;
}
Object.defineProperty(arr, 'sortand', { 
	value: sortFunction
});



arr.sortand();
// arr.sort();
console.log(arr);
