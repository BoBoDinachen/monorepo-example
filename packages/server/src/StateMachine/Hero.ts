import StateMachine from "./StateMachine";

export class Hero {
  private stateMachine: StateMachine;

  constructor() {
    this.stateMachine = new StateMachine(this, "Hero");
    this.stateMachine
      .addState("Idle")
      .addState("Move", {
        onEnter: this.onMoveEnter,
        onUpdate: this.onMoveUpdate,
      })
      .addState("Attack", {
        onEnter: this.onAttackEnter,
        onExit: this.onAttackExit,
      });
    this.stateMachine.setState('Move')
  }

  update(dt:number){
    this.stateMachine.update(dt)
  }
  private onMoveEnter(){
    // logic for entering move state
    console.log('move enter');
  }
  private onMoveUpdate(dt: number){
    // logic for moving on each update tick
    console.log('move update');
  }
  private onAttackEnter(){
    // logic for attacking
  }
  private onAttackExit(){
    // logic for when leaving the attack state
  }
}
