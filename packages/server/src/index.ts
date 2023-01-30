import { EventEmitter } from "events";
import { createServer } from "net";

const server = createServer()

server.listen(8080,'localhost',()=>{
  console.log("服务已打开：",server.address());
})
server.on('connection',(socket)=>{
  socket.on('data',(msg)=>{
    console.log(msg.toString());
  })
  socket.write("Hello,I'm is server.")
})
