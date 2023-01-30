function debounce(fn,delay){
  let timer = null
  return function(...args){
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(()=>{
      fn.apply(this,args)
    },delay)
  }
}
// 测试
function task(e){
  console.log('run task',e);
}
const debounceTask = debounce(task,1000)
