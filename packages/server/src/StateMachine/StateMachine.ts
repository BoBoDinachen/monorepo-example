interface IState{
  name: string,
  onEnter?:()=>void
  onUpdate?:(dt:number)=>void
  onExit?:()=>void
}
let idCount = 0
// 有限状态机的管理
export default class StateMachine{

  private id = (++idCount).toString()
  private context?:object

  // 需要维护的状态集合
  private states = new Map<string,IState>()
  // 当前的状态
  private currentState?: IState
  // 当前状态是否正在改变
  private isChangingState = false
  private changeStateQueue:Array<string> = []

  constructor(context?:object,id?:string){
    this.id = id ?? this.id
    this.context = context
  }

  addState(name:string,config?:{ onEnter?: () => void, onUpdate?: (dt: number) => void, onExit?: () => void }){
    // add a new state
    const context = this.context
    this.states.set(name,{
      name,
      onEnter: config?.onEnter?.bind(context),
      onUpdate: config?.onUpdate?.bind(context),
      onExit: config?.onExit?.bind(context)
    })
    // 这里返回this，主要是为了其它地方添加状态时，可以方便的链式调用addState
    return this
  }

  setState(name:string){
    // switch to State called 'name'
    if (!this.states.has(name)) {
      console.warn(`Tried to change to unknown state: ${name}`)
      return
    }
    if (this.isCurrentState(name)) {
      return
    }
    if (this.isChangingState) {
      this.changeStateQueue.push(name)
      return
    }
    this.isChangingState = true
    console.log(`[StateMachine (${this.id})] change from ${this.currentState?.name ?? 'none'} to ${name}`)
    if (this.currentState && this.currentState.onExit) {
      this.currentState.onExit()
    }
    // 赋值给当前的状态
    this.currentState = this.states.get(name)!
    if (this.currentState.onEnter) {
      this.currentState.onEnter()
    }
    this.isChangingState = false
  }

  // 即时更新状态，从changeStateQueue队列从排队取出并更新
  update(dt:number){
    // update current state if exists
    if (this.changeStateQueue.length > 0) {
     this.setState(this.changeStateQueue.shift())
     return 
    }
    if (this.currentState && this.currentState.onUpdate) {
      this.currentState.onUpdate(dt) // 调用状态中的update函数，传入dt
    }
  }

  // 判断传入参数是否为当前状态name
  isCurrentState(name){
    if (!this.currentState) {
      return false
    }
    return this.currentState.name === name
  }
}