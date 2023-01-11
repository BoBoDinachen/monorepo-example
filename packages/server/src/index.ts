import { observe } from "./observer";
import { Hero } from "./StateMachine/Hero";
interface IEventItem {
  cb: Function;
  ctx: unknown;
}
class EventMitter {
  map: Map<string, Array<IEventItem>> = new Map();
  // 注册监听事件
  on(name: string, cb: Function, ctx: unknown) {
    if (this.map.has(name)) {
      this.map.get(name).push({ cb, ctx });
    } else {
      this.map.set(name, [{ cb, ctx }]);
    }
  }
  // 触发事件
  emit(name: string, data: unknown) {
    const events = this.map.get(name).slice();
    if (!this.map.has(name) || !events?.length) {
      return;
    }
    events?.forEach((event) => {
      const { cb, ctx } = event;
      cb.call(ctx, data);
      console.log("触发事件", this.map);
    });
  }
  // 移除某个事件回调队列里的指定回调函数
  off(name: string, cb: Function, ctx: unknown) {
    const evetns = this.map.get(name);
    if (!this.map.has(name) || !evetns.length) {
      return;
    }
    const index = evetns.findIndex((item)=>item.cb === cb && item.ctx === ctx);
    index !== -1 && evetns.splice(index, 1);
  }

  // 单次注册监听事件,当回调执行完成之后，自动移除
  once(name:string,cb,ctx){
    const wrapper = (...args)=>{
      cb(...args)
      this.off(name,wrapper,ctx)
    }
    this.on(name,wrapper,this)
  }
}

const hero = new Hero()

