class Human{
    // public은 어디서든 접근 가능. private은 클래스 외부에서는 호출 불가.
    public name:string
    public age:number
    public gender:string

    // 생성자로 클래스가 생성될때 실행됨
    constructor(name:string, age:number, gender:string){
        this.name= name
        this.age= age
        this.gender = gender
    }   
}

const person = new Human("myeongil", 26, "male")

const hello = (person:Human) : string=>{
    return `Hi ${person.name}, Info : { age : ${person.age} / gender : ${person.gender} }`
}

console.log(hello(person))

export{}