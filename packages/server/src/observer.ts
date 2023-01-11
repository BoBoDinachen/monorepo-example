/**
 *Vue响应式系统也是分为发布者和订阅者，
订阅者很简单-Watcher收集所有的数据依赖 并 接收指令触发视图re-render，
重点在发布者-Observer+Dep：
Observer只是为了实现对响应式数据的代理/拦截，可以看做把对数据的访问路径最终“收敛”到了一个私人服务通道，
这个“私人服务通道”就是为了Dep；
Dep借助这个通道的getter进行addsub（需要入参是当前的副作用函数activeEffectFn），
触发时间在初次render时，在getter函数中就dep.addsub（target，key），
作者只是简化了拿到target和key之后存储组件全局当前activeEffectFn的过程；
setter函数中的工作就简单了，触发dep.notify()，只需要轮询调用target和key对应的activeEffectFns ---> activeEffectFn.update()，
就实现了通知变化给Watcher；Watcher会重新读取更新后的数据依赖拿到最新值，然后更新到view页面
 */

// 观察者 observer方法遍历并包装对象属性，拦截 set get操作
function observe(target: unknown) {
  if (target && typeof target == "object") {
    Object.keys(target).forEach((key) => {
      defineReactive(target, key, target[key]);
    });
  }
}
// 拦截目标对象上属性的set get操作
function defineReactive(target: unknown, key: string, val: unknown) {
  // 属性可能为object 则递归调用observe
  const dep = new Dep();
  observe(val);
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: false,
    get: function () {
      // 订阅
      return val;
    },
    set: function (value) {
      console.log(`属性值发生了变化${val}=>${value}`);
      // 通知订阅者
      dep.notify();
    },
  });
}

// 订阅者
class Dep {
  subs: Array<any>;
  constructor() {
    this.subs = [];
  }

  // 增加订阅者
  addSub(sub) {
    this.subs.push(sub);
  }

  // 通知所有订阅者
  notify() {
    this.subs.forEach((sub) => {
      sub.update();
    });
  }
}

export { observe };
