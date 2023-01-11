class SingleDog{
  // 实例对象
  static instance = null
  constructor(){
  }
  show(){
    console.log('我是一个单例对象');
  }
  static getInstance(){
    // 判断实例是否存在
    if (!SingleDog.instance) {
      SingleDog.instance = new SingleDog();
    }
    // 如果已经存在，则直接返回
    return SingleDog.instance
  }
}

const s1 = SingleDog.getInstance();
const s2 = SingleDog.getInstance();

console.log(s1 === s2);