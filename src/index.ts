interface Human {
    name:string,
    gender:string,
    age:number
}

const person:Human = {
    name:"myeongil",
    gender:"male",
    age:26
}

const hello = (person:Human) : string=>{
    return `Hi ${person.name}, Info : { age : ${person.age} / gender : ${person.gender} }`
}

console.log(hello(person))

export{}