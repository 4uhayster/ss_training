


function OArray(){
	var count = 0;
	this.length = -1;
	this.array = [];
	// if(typeof arguments[0] == "OArray"){
	// 	this.array = arguments[0].array;
	// 	this.length = arguments[0].length;
	// }
	// else if(typeof arguments[0] == "object"){
	// 	for(elem in object){
	// 		this.array[count] = elem;
	// 		count++;
	// 	}
	// }
	// else{
	// 	for(elem in arguments){
	// 		this.array[count] = arguments[count];
	// 		count++;
	// 	}
	// }
	// this.length = count
	this.array = arguments;
	this.length = arguments.length;
	
	this.print = function(){
		for(elem in this.array)
			console.log(this.array[elem]);
	}
	this.forEach = function(func, arg){
		var len = this.length;

		if(typeof func != "function")
			throw new TypeError();
		var thisObject = 0;
		for(var i = 0; i < len; i++){
			func.call(thisObject, this.array[i], i, this, arg);
		}
		return this;
	}
	this.indexOf = function(elem){
		var index = -1;
		for(var i = 0; i < this.length; i++){
			if(this.array[i] == elem)
				return i;
		}
		return index;
	}
	this.lastIndexOf = function(elem){
		for(var i = this.length; i >= 0; i--){
			if(this.array[i] == elem)
				return i;
		}
		return -1; // element is not present
	}
	this.map = function(func){
		var new_obj = this;

		if(typeof func != "function")
			throw new TypeError();
		var thisObject = arguments[1];
		for(var i = 0; i < this.length; ++i){
			if(i in this.array)
				new_obj.array[i] = func.call(thisObject, this.array[i], i, this);
		}
		return new_obj;
	}
	this.pop = function(){		// Removes the last element from an array and returns that
		var element = this.array[this.length-1];
		delete this.array[this.length-1];
		--this.length;
		return element;
	}
	this.push = function(){
		var last = this.length;
		for(elem in arguments)
			this.array[last++] = arguments[elem];
		return this.length = last;
	}
	this.reverse = function(){
		var oarray = this;
		for(var l = 0, r = this.length; l < r; ++l, --r){
			var element = oarray.array[l];
			oarray.array[l] = oarray.array[r];
			oarray.array[r] = element;
		}
		return oarray;
	}
	this.shift = function(){	// removes the first element from an array// and returns that element
		if(this.length <= 0)
			throw Error("An array is empty");
		var res = this.array[0];
		delete this.array[0];
		for(var i = 1; i < this.length; ++i){
			this.array[i-1] = this.array[i];
		}
		--this.length;
		delete this.array[this.length];
		return res;
	}
	this.slice = function(begin = 0){
		var result = new OArray();
		var end = arguments[1];
		var index = 0; // iterator for result.array	
		if(begin < -this.length && begin >= this.length)
			throw Error("Incorrect 'begin' argument");
		if(typeof end == "undefined") { // from begin to .length and begin is less then .length
			if(begin < 0)
				begin = this.length + begin;
			for(var i = begin; i <= this.length; ++i)
				result.array[index++] = this.array[i];
		}
		else {
			if(begin < 0){
				begin = this.length + begin;
				if(end <= begin){
					for(var i = begin; i < this.length; ++i)
						result.array[index++] = this.array[i];
					for(var i = 0; i < end; ++i)
						result.array[index++] = this.array[i];
				}
				else{
					for(var i = begin; i < end; ++i)
						result.array[index++] = this.array[i];
				}
			}
			else{
				for(var i = begin; i < end; ++i)
					result.array[index++] = this.array[i];
			}

		}
		result.length = index;
		return result;
	}
	this.some = function(func) {

		if(typeof func != "function")
			throw new TypeError();

		var thisObject = arguments[1];
		for(var i = 0; i < this.length; ++i){
			if(i in this.array && func.call(thisObject, this.array[i], i, this)){
				return true;
			}
		}
		return false;
	}
	this.splice = function(index, howMany) {
		var newOArray = new OArray();
		var inew = 0;
		for(var i = 0; i < index; ++i)
			newOArray.array[inew++] = this.array[i];
		for(var i = 2; i < arguments.length; i++){
			if(typeof arguments[i] == "string"){
				newOArray.array[inew++] = arguments[i];
			}
		}
		var j = index;
		while(howMany){
			j++;
			--howMany;
		}
		while(j < this.length){
			newOArray.array[inew++] = this.array[j++];
		}
		newOArray.length = inew;
		return newOArray;
	}
	this.toString = function() {
		var string = "";
		for(var i = 0; i < this.length-1; ++i)
			string += this.array[i] + ",";
		string += this.array[this.length-1];
		return string; 
	}
	this.unshift = function() { // add element(s) to the front without removing old elements
		var obj = new OArray();
		var inew = 0;
		for(var i = 0; i < arguments.length; ++i)
			obj.array[inew++] = arguments[i];
		for(var i = 0; i < this.length; ++i)
			obj.array[inew++] = this.array[i];
		this.array = obj.array;
		return this.length = inew;
	}
	this.concat = function() {
		var j = this.length;
		for(var i = 0; i < arguments.length; ++i){
			for(el in arguments[i]){
				this.array[j++] = arguments[i][el];
			}
		}
		return this.length = j;
	}

};
function multiply(element, index, OArray, numb = 1){
	OArray.array[index] *= numb;
}

function addStr(element, index, OArray, Str = ""){
	OArray.array[index] += Str;
}
function pow(element, index, OArray){
	var count = element;
	var res = 1;
	while(count > 0){
		res *= element;
		count--;
	}
	return res;
}

function isMatch(element, index, OArray){
	var pattern = /(^|\b)talking(\b|$)/gm;
	if(typeof element == "string")
		return element.match(pattern) != null;
	return false;
}

// var string = "Orest is going to do the first task";
// isMatch(string);
var tosome = new OArray("Orest hi", "is talking", "going to do", "the first task");
console.log ( tosome.some(isMatch) );


var toslice = new OArray(3, 4, 7, 4, 5, 6, 9);
(toslice.slice(3, 5)).print();

var tosplice = new OArray("orange", "mango", "bannana", "sugar", "tea");
var arrayStr = new OArray();
(arrayStr = tosplice.splice(2, 2, "apple", "milk")).print();
var str = arrayStr.toString();
console.log("arrayStr: " + str);

console.log(arrayStr.unshift("cola", "burger", "coffee"));
arrayStr.print();


tosome.concat([2, 4, 5], ["Orest", "Andrew"], [2, 1, 1, 0]);
tosome.print();
// console.log("array: ");
// var array = new OArray("Orest", "Vlad", "Igor");
// array.print();
// console.log("array (array after subString adding): ");
// array.forEach(addStr, " worker");
// array.print();


// var array3 = new OArray(2, 3, 4);
// console.log("array3: ");
// array3.print();
// array3.forEach(multiply, 10);
// console.log("array3 after multiplication: ");
// array3.print();


// (new OArray("abc", "ddd")).forEach(addStr, "qwer").print();

// var arr = new OArray(7, 4, 5, 5, 5, 7, 3, 2);

// console.log(arr.indexOf(5));
// console.log(arr.lastIndexOf(5));


// (new OArray(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)).map(pow).print();

// console.log(arr.pop());
// arr.push("wd", "qowid", "qqq");
// //console.log(arr.shift());
// console.log(arr.shift());
// console.log("---------------");
// arr.print();





















function getSum(){
  var result = 0;
  return function(){
    for(var i = 0; i < arguments.length; ++i)
      if(typeof arguments[i] == "number")
        result += arguments[i];
    return result;
  };
};














