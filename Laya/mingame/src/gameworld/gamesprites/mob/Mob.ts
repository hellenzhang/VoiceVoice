/**
 * 内部持有多个body,每次startup的时候，决定哪个显示
 * TODO 切换场景时的释放bodyAnimDict机制还没做
 */
class Mob extends Actor {

    constructor() {
        super();

       GameWorld.inst.mobsLayer.addChild(this.spr);

        //
        this.InitHPBar("gameworld/mob_hpbar_bg.png","gameworld/mob_hpbar_bar.png",4,1,50+12);
     
         this.isActive = false;
    }

    //
    public Startup(metaID:number,x: number,speed:number) {

         //-
        this.ChangeAvatar(metaID);

        //-
        this.x = x;
        this.y = -200;//错落有致的飞来
        this.speedY=speed;
        
        //-
        this.HP=this.MAX_HP=this.meta.json.hp;

        //-
        this.isActive = true;//刷新visible

    }

    public Update() {
      
        super.Move();

        if(Laya.timer.currFrame%8==0){
            GameWorld.inst.dustsMgr.EmitBirdDust(this.x,this.y);
        }

        if(this.IsOutOfBottomBoundary()){

            //注意这里要hero数据
            if(!GameData.inst.isHeroDie){
                  GameData.inst.coin++;
            }

            this.isActive=false;//释放

        }
    }
  
}
