const hello = (name:string, age:number, gender?:string) : string=>{
    return `Hi ${name}, Info : { age : ${age} / gender : ${gender} }`
}

console.log(hello("myeongil", 26, "male"))

export{}