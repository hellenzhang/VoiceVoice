/**
 * 
 * ！！注意这个构造函数，创建的时候就加到gameWorld里去了
 * 
 * 精灵，内持有Laya.Sprite的引用
 * 
 * 没有对象池，一次性创建所有不再销毁，然后foreach update,只有激活的会被update
 * 
 * 坐标系，top left 00,rotation顺时针
 * ---------> (x)
 * |
 * |
 * |
 * v (y)
 * 
 * ！！注意，给number赋上默认值，是极其必要的，否则默认是NaN，导致各种古怪问题
 * 
 * 内置状态机
 * 
 * --特别注意--
 * ！！OnStateEvent这个不建议用，增加复杂度，有事就直接state里处理，涉及到公共的函数，放GameSprite里
 */

 class GameSprite {

    //-move
    public x: number = 0;
    public y: number = 0;

    public speedX: number = 0;
    public speedY: number = 0;

    //-注意这个关联了visilbe ,new Sprite的时候注意
    protected _isActive: boolean = true;//是否激活，激活的才会update

    //public确实需要
    //矩形碰撞，因为这样可以描述长方形（比如人体），圆形描述的不够精准
    public hitRectWidth: number = 64;
    public hitRectHeight: number = 64;
    public hitRectCenterX: number = 0;
    public hitRectCenterY: number = 0;

    public enableHitTest: boolean = true;

    //-持有的视图对象，未来可以在白鹭和laya间切换
    public spr: Laya.Sprite;

    public HP: number = 0;
    public MAX_HP: number = 0;

    //
    constructor() { }

    //-UPDATE,逻辑更新
    public  Update(){}


    //内部调用把GameSprite的值赋值给sprite,这个不用继承，由GameWorld调用
    public Render() {
        if (this.isActive == false) {
            return;
        }
        if (this.spr == null) {
            return;
        }

        this.spr.x = this.x;
        this.spr.y = this.y;
    }

    public get isActive() {
        return this._isActive;
    }

    public set isActive(b: boolean) {

        if(this._isActive!=b){
            if(b){
                this.OnActive();
            }else{
                this.OnDeactive();
            }
        }

        this._isActive = b;
        if (this.spr) {
            this.spr.visible = b;
        }
    }

    protected OnActive(){

    }

      //注意一般构造函数里会调用一次，因为构造函数里有this.isActive=false
    protected OnDeactive(){

    }

    //===========================移动系函数=============================
    //-移动，怪，子弹都用这个，Hero和Boss不用
    protected Move() {
        let deltaSec: number = GameWorld.inst.deltaTimeSec;

        //move bullet
        this.y += this.speedY * deltaSec;
        this.x += this.speedX * deltaSec;
    }

    protected IsOutOfBottomBoundary():boolean{
        if(this.y-this.hitRectHeight>GameWorld.inst.stageH){
            return true;
        }
        return false;
    }

     protected IsOutOfTopBoundary():boolean{
        if(this.y+this.hitRectHeight<0){
            return true;
        }
        return false;
    }
    

    //瞄准目标，设置飞向目标的速度
    public  SetSpeedForMoveToTarget(speed:number,targetX:number,targetY:number){
      
        let  angle = GameUtils.GetAngle(this.x, this.y,targetX,targetY);
        
        GameUtils.PolarToCart_PointTemp(speed, angle);

        let rad: number = Laya.Utils.toRadian(angle);
        //console.log("PolarToCart", angle, rad);

        this.speedX = Laya.Point.TEMP.x;
        this.speedY = Laya.Point.TEMP.y;
    }

    //如果撞墙则反弹
    protected BoundBounceSpeedX() {
        let W2=this.hitRectWidth/2;
        if (this.x < W2) {
            this.speedX = Math.abs(this.speedX);
        }
        if (this.x > GameWorld.inst.stageW-W2) {
            this.speedX = -Math.abs(this.speedX);
        }
    }

    //如果撞墙则速度为0，掉落物这么弄
    protected BoundZeroSpeedX() {
        let W2=this.hitRectWidth/2;
        if (this.x < W2) {
            this.x=W2;
            this.speedX = 0;
        }
        if (this.x > GameWorld.inst.stageW-W2) {
            this.x=GameWorld.inst.stageW-W2;
            this.speedX = 0;
        }
    }

    //===========================碰撞检测系函数=============================

    public HitTest(target: GameSprite): boolean {

        if (!this.enableHitTest || !target.enableHitTest) {
            return false;
        }

        if (!this.isActive || !target.isActive) {
            return false;
        }

        let wOK = Math.abs((this.x + this.hitRectCenterX) - (target.x + target.hitRectCenterX)) <= (this.hitRectWidth + target.hitRectWidth) / 2;
        let hOK = Math.abs((this.y + this.hitRectCenterY) - (target.y + target.hitRectCenterY)) <= (this.hitRectHeight + target.hitRectHeight) / 2;

        return wOK && hOK;
    }

    //============================状态机==============================
    //-状态机，只有Boss用，
    private stateArr: Array<GameSpriteState> = null;

    private currState: GameSpriteState = null;

    public AddState(s: GameSpriteState) {

        if (this.stateArr == null) {
            this.stateArr = new Array<GameSpriteState>();
        }

        if (this.GetState(s.id) == null) {
            this.stateArr.push(s);
        } else {
            //console.error("已有此状态");
        }
    }

    public UpdateState() {
        if (this.currState) {
            this.currState.OnUpdate();
        }
    }

    public SwitchState(id: string, data: any) {
       // console.log("SwtichState", id, Laya.timer.currTimer);
        if (this.currState) {
            this.currState.OnExit();
        }
        let s = this.GetState(id);
        if (s) {
            this.currState = s;
            this.currState.OnEnter(data);
        } else {
           // console.error("无此状态");
        }
    }

    public GetState(id: string): GameSpriteState {
        if (this.stateArr) {
            for (let index = 0; index < this.stateArr.length; index++) {
                let e = this.stateArr[index];

                if (e.id == id) {
                    return e;
                }

            }
        }
        return null;
    }

    public IsCurrStateID(id: string): boolean {
        if (this.currState) {
            return this.currState.id == id;
        }
        return false;
    }


    //=============================血条处理=============================
    //整个血条对象
    protected hpBar: Laya.Sprite;
    //血条的内部条
    private hpBar_bar: Laya.Sprite;

    //注意 bar的xy要额外设置
    protected InitHPBar(bgUrl: string, barUrl: string, barOffsetX: number, barOffsetY: number, hpBarY: number) {
        this.hpBar = new Laya.Sprite();
        let hpBar_bg = GameUtils.CreateSprite(bgUrl, 1);
        this.hpBar_bar = GameUtils.CreateSprite(barUrl, 1);

        hpBar_bg.pivotX = 0;
        this.hpBar_bar.pivotX = 0;
        this.hpBar_bar.x = barOffsetX;
        this.hpBar_bar.y = barOffsetY;

        this.hpBar.addChild(hpBar_bg);
        this.hpBar.addChild(this.hpBar_bar);

        this.hpBar.width = hpBar_bg.width;
        this.hpBar.height = hpBar_bg.height;
        this.hpBar.pivotX = this.hpBar.width / 2;
        this.hpBar.x = 0;
        this.hpBar.y = hpBarY;

        this.spr.addChild(this.hpBar);

        this.hpBar.visible = false;
    }

    public ChangeHP(v: number) {
        this.HP += v;
        this.HP = GameUtils.Clamp(this.HP, 0, this.MAX_HP);
        this.hpBar.visible = true;
        this.hpBar_bar.scaleX = GameUtils.SafeDivide(this.HP, this.MAX_HP);
    }

    public GetHpPercent():number{
         let percent=GameUtils.SafeDivide(this.HP,this.MAX_HP);
         return percent;
    }

}