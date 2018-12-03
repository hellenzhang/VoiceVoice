/**
 *GamePage的游戏流程，云，清怪，boss,hero死亡~
 */
 class GamePagePhase {

   //内置计时器
    protected safeTimer:SafeTimer;

    constructor(public id: string, public gamePage: GamePage) {
      
        this.safeTimer=new SafeTimer();
    }
    public  OnEnter(data: any){}


    public  OnUpdate(){}


    public  OnExit(){}

}