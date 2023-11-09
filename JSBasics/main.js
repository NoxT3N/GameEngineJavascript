let condition = true

if(condition){
    console.log("Condition is true")
}
else if(!condition){
    console.log("Condition is false")
}

for(let i = 0; i<5; i++){
    console.log(i)
}

let j = 0;
while(j<5){
    console.log(j);
    j++;
}

function greet(name){
    console.log("Hello"+name)
}

greet("Alice");

let fruits = ["Apple","Banana","Mango"];
console.log(fruits[0]);

let person = {
    firstname: "John",
    lastname: "Doe",
    age:30,
};

console.log(person.age);

var varVariable = "I'm var variable";
let letVariable = "I'm a let variable";
const constVariable = "I'm a const variable";

console.log(varVariable);
console.log(letVariable);
console.log(constVariable);

class Car{
    constructor(brand,model){
        this.brand = brand;
        this.model = model;
    }

    displayCar(){
        return this.brand+" "+this.model;
    }
}

let myCar = new Car("Toyota", "Corolla");
console.log(myCar.displayCar());

class Model extends Car{
    constructor(brand,mode,year){
        super(brand,model);
        this.year = year;
    }
    displayModel(){
        return this.displayCar()+"-"+this.year;
    }
}
let myModel = new Model("Toyota","Corolla","2023");
console.log(myModel.displayModel());

const arr = [1,2,3,4];
const squares = arr.map((x)=>x*x);

let nameGirl = "Alice";
console.log(`Hello ,${nameGirl}!`);

//import {hello} from "./myModule.js";
//console.log(hello());

