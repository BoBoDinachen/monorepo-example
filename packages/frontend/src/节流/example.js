function throttle(fn,delay){
  let last = 0; // 上次触发的时间
  return function(...args){
    const now = Date.now()
    if (now - last > delay) {
      last = now
      fn.apply(this,args)
    }
  }
}
function task(){
  console.log("run task");
}
const throttleTask = throttle(task,1000)
