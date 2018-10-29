
var a = 6;

//console.log(a);


var car = Object();

car.name = "bmw";
car.price = 100;

var show = function(obj)
{
	for(prop in obj)
	{
		if(typeof obj[prop] != "function")
			console.log(prop + ": " + obj[prop]);
	}
};

show(car);
var count = 0;
for(prop in car){
	count++;
}
console.log("Properties: ", count);

function ln(){
	console.log("-------------------------------------");
}
ln();
var person = Object({
	name:"Orest"
})

person.age = 20;
person.func = function(){
	with(car){
		var info = /*this.*/name + " costs " + price + " pounds";
		console.log(info);
	}

}
show(person);
person.func(); 

console.log("Properties: ", Object.keys(person).length);

ln();

var banana = "banana";
var fruits = new Array("apple", banana, "orange");
var fruitsSimilar = [fruits[0], banana, "orange"];

for(var i = 0; i < 3; i++)
{
	console.log(fruits[i] + " *** " + fruitsSimilar[i]);
}

console.log(fruits.index);


function getSum(){
  var result = 0;
  return function(){
    for(var i = 0; i < arguments.length; ++i)
      if(typeof arguments[i] == "number")
        result += arguments[i];
    return result;
  };
};

var counter = (function(){
  var count = 0;
  return function(num) {
    count = num !== undefined ? num : count;
    return count++;
  }
}());


function Say(str) {
  if(typeof str != "string") throw new Error("parametr isn't 'string' type");
  console.log(str);
}

try{
  Say(123);
} catch(e){
  console.log(e.message);
}

user = {
  name: "Orest",
  surname: "Andriichuk",
  birthday: new Date(1997, 11, 22),
  show: function() {
    for(var prop in this){
      if(typeof this[prop] !== "function")
        console.log(prop + ": " + this[prop]);
    }
  }
}
user.show();

function print(prop){
  console.log(this[prop].toString().toUpperCase());
}
function infoByPropertyType(typeOfProp) {
  for(prop in this) {
    if(typeof this[prop] == typeOfProp)
      console.log(prop + ": " + this[prop]);
  }
}

print.call(user, "birthday");
infoByPropertyType.call(user, "object");