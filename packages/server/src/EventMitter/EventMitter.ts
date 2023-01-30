import { EventEmitter } from "events";

const emitter = new EventEmitter()

emitter.on('hello',(msg)=>{
  console.log(msg);
})


let data = {
  name:"BoBo",
  age: 22
}
emitter.emit('hello',data)