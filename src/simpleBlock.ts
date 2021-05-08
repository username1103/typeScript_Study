import * as CryptoJS from "crypto-js"

class Block {
  static validateStructure = (aBlock:Block) : boolean => 
    typeof aBlock.index === "number" && 
    typeof aBlock.hash ==="string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.data === "string" &&
    typeof aBlock.timestamp === "number"

  public index:number
  public hash:string
  public previousHash:string
  public data:string
  public timestamp:number

  constructor(index:number, hash:string, previouseHash:string, data:string, timestamp:number){
    this.index = index
    this.hash = hash
    this.previousHash = previouseHash
    this.data = data
    this.timestamp = timestamp
  }

  /**
   * getBlockInfo
   */
  public getBlockInfo():string {
    return `BlockInfo : { index : ${this.index}, hash : ${this.hash}, previousHash : ${this.previousHash}, data : ${this.data}, timestamp : ${this.timestamp} }`    
  }
}

let blockChain : Block[] = []

const calculateHash = (index:number,previousHash:string, data:string, timestamp:number):string => CryptoJS.SHA256(index + previousHash + data + timestamp).toString()
const getBlockChain = ():Block[] => blockChain
const getLastestBlock = ():Block=> blockChain[blockChain.length - 1]
const getNewTimeStamp = ():number => Math.round(new Date().getTime() / 1000)

const createInitBlock = (initData:string):Block=>{
  const newTimeStamp = getNewTimeStamp()
  const initBlock = new Block(0, calculateHash(0,"",initData,newTimeStamp),"",initData,newTimeStamp)
  addInitBlock(initBlock)
  return new Block(0, calculateHash(0,"",initData,newTimeStamp),"",initData,newTimeStamp)
}
const createNewBlock = (data:string):Block=>{
  const previousHash = getLastestBlock().hash
  const newIndex = getBlockChain().length
  const newTimeStamp = getNewTimeStamp()
  const hash = calculateHash(newIndex, previousHash, data, newTimeStamp)
  const newBlock = new Block(newIndex, hash, previousHash, data, newTimeStamp)

  addBlock(newBlock)
  return newBlock
}

const getHash4Block = (aBlock : Block): string => calculateHash(aBlock.index, aBlock.previousHash, aBlock.data, aBlock.timestamp)

const isBlockValid = (candidateBlock:Block, previousBlock:Block):boolean=>{
  if(!Block.validateStructure(candidateBlock)){
    return false
  } else if(previousBlock.index + 1 !== candidateBlock.index){
    return false
  } else if(previousBlock.hash !== candidateBlock.previousHash){
    return false
  } else if(candidateBlock.hash !== getHash4Block(candidateBlock)){
    return false
  } else {
    return true
  }
}

const addBlock = (candidateBlock:Block):void =>{
  if(isBlockValid(candidateBlock, getLastestBlock())){
    getBlockChain().push(candidateBlock)
    console.log(`Add Block : ${candidateBlock.getBlockInfo()}`)
  }
}

const addInitBlock = (initBlock:Block):void=>{
  getBlockChain().push(initBlock)
  console.log(`Add InitBlock : ${initBlock.getBlockInfo()}`)
}

console.log(`***** simpleBlock.ts *****`)
createInitBlock("It is InitBlock")
createNewBlock("First Block")
createNewBlock("Second Block")
createNewBlock("Third Block")

console.log(getBlockChain())

export{createInitBlock, createNewBlock, blockChain}