/**
 * 刷怪管理器
 * 怪管理器，没有池，就20个，每个都会update
 * 调用完构造函数，要调用一下levelup,以便设置正确的子弹
 */
class MobsManager extends GameSpritesManager<Mob>{

    //生怪的间隔
    private safeTimer: SafeTimer = null;
     private safeTimer2: SafeTimer = null;

     private scaleSTimer:SafeTimer=null;

     private timeScale:number=1;
     private speedScale:number=1;

     private SCALE_GAP_SEC=5;//5秒难度递减

    constructor() {
        super();

        for (let index = 0; index < MAX_MOB_COUNT; index++) {
            let mob = new Mob();
            this.AddToPool(mob);
        }

        this.safeTimer = new SafeTimer();
          this.safeTimer2 = new SafeTimer();

          this.scaleSTimer=new SafeTimer();
    }

    public Startup() {
        this.isActive = true;
         this.safeTimer.Start(GameUtils.Random(2,5));
          this.safeTimer2.Start(GameUtils.Random(2,5));

          this.scaleSTimer.Start(this.SCALE_GAP_SEC);//5秒难度递增
    }

    //  只要调用就会刷怪，在PhaseClearMobWaves.ts.OnUpdate()里调用
    public Refresh() {
        if (!this.isActive) {
            return;
        }
        //-生怪逻辑
        if (this.safeTimer.IsOK()) {
            this.safeTimer.Start(GameUtils.Random(2,5)*this.timeScale);
            let mob = this.CreateMob(100, GameUtils.RandomInt(0,4), GameUtils.Random(400,800)*this.speedScale);
        }

        if (this.safeTimer2.IsOK()) {
            this.safeTimer2.Start(GameUtils.Random(2,5)*this.timeScale);
            let mob = this.CreateMob(100, GameUtils.RandomInt(0,4), GameUtils.Random(400,800)*this.speedScale);
        }

        if(this.scaleSTimer.IsOK()){

            this.scaleSTimer.Start(this.SCALE_GAP_SEC);

            this.timeScale-=0.01;
            if(this.timeScale<0.4){
                this.timeScale=0.4;
            }

             this.speedScale+=0.01;
            if(this.speedScale>2){
                this.speedScale=2;
            }
        }
    }

    //
    private CreateMob(planeMetaID: number, idx: number, speed: number): Mob {

        let bb = this.GetFree();
        if (bb) {

            let seg = GameWorld.inst.stageW / 5;
            let x = seg / 2 + idx * seg;

            //
            bb.Startup(planeMetaID, x, speed);

        } else {
            // console.log("生成怪失败！！");
        }
        return bb;
    }
}