/**
 * 精灵状态机的状态
 */
 class GameSpriteState {

    //快捷指针方便操作
    protected spr: Laya.Sprite;

   //内置计时器
    protected safeTimer:SafeTimer;

    //protected gameSpr: GameSprite 用法很好，不要动
    constructor(public id: string, protected gameSpr: GameSprite) {
        this.spr = gameSpr.spr;
        this.safeTimer=new SafeTimer();
    }

     public  OnEnter(data: any){}

     public  OnUpdate(){}

     public  OnExit(){}

}