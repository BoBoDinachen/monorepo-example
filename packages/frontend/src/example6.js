class SingleDog{
  show(){
    console.log('我是一个单例对象');
  }
}

SingleDog.getInstance = (function(){
  let instance = null;
  return function(){
    if (!instance) {
      instance = new SingleDog()
    }
    console.log('233');
    return instance
  }
})()

const s1 = SingleDog.getInstance();
const s2 = SingleDog.getInstance();

console.log(s1 === s2);
