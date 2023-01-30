import { EventEmitter } from "events";
import {createConnection} from "net";

const client = createConnection({
  port:8080,
  host:'127.0.0.1'
},()=>{
  console.log("已建立连接：",client.address());
})

client.on('data',(msg)=>{
  console.log(msg.toString());
})

client.write("Hello,I'm is client")