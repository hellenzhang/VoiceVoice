/**
 * 爆炸特效
 * 
 * 怪，hero，boss都用这个，
 * 有新类型需要new 新的实例
 * 
 * Update
 * Clear
 */

class SmokeSparksManager extends SparksManager {

    //要加载的资源的地址，maxSparkCount是最大数量,resScale是资源地址
    constructor(private sparkUrl: string, private maxSparkCount: number, private rootLayer: Laya.Sprite, private resScale: number = 0) {
        super();
        this.Initialize();
    }

    //被构造函数调用
    protected Initialize() {
        for (let i = 0; i < this.maxSparkCount; i++) {//MAX_SMOKE_COUNT
            let spr = GameUtils.CreateSprite(this.sparkUrl, this.resScale);
            let sp = new Spark(spr);
            this.rootLayer.addChild(sp.spr);
            sp.SetActive(false);
            this.sparkArr.push(sp);
        }
    }

    public ShowSmokeBlast(count: number, x: number, y: number, durSec: number, speedAppendY: number) {

        for (let i = 0; i < count; i++) {
            let sp = this.GetFree();

            if (sp) {

                sp.initX = x;
                sp.initY = y;
                sp.polarSpeed = GameUtils.Random(60, 120);

                sp.scale = GameUtils.Random(0.8, 1.2);
                sp.scaleSpeed = -1.5;
                sp.scaleAcc = -1.5;
              
                sp.polarAngel = GameUtils.Random(0, 359);
                sp.rotation = GameUtils.Random(0, 359);

                sp.speedAppendY = speedAppendY;
               
                sp.Start(durSec);
            }
        }
    }

    public ShowMobSmokeBlast(x: number, y: number) {
        let MOB_SPEED_Y: number = 384;// 纯粹烟雾用的
        this.ShowSmokeBlast(GameUtils.Random(5, 7), x + GameUtils.Random(-32, 32), y + GameUtils.Random(-32, 32), 0.4, MOB_SPEED_Y / 2);
    }

    public ShowHeroSmokeBlast() {
        let x = GameWorld.inst.hero.x;
        let y = GameWorld.inst.hero.y;

        for (let i = 0; i < 18; i++) {
            let sp = this.GetFree();

            if (sp) {

                sp.initX = x + GameUtils.Random(-25, 25)
                sp.initY = y + GameUtils.Random(-40, 40)
                sp.polarSpeed = GameUtils.Random(80, 130);

                sp.scale = GameUtils.Random(0.6, 1.2);
                sp.scaleSpeed = -1.5;
                sp.scaleAcc = -1.5;

                sp.polarAngel = GameUtils.Random(0, 359);
                sp.rotation = GameUtils.Random(0, 359);

                sp.speedAppendY = 0;;

                sp.Start(0.6);
            }
        }
    }


    //-FC忍者蛙式的爆炸-
    public ShowFrogBlast(x: number, y: number, count: number, speed: number, acc: number, durSec: number, delaySec: number, scale: number) {

        for (let i = 0; i < count; i++) {
            let sp = this.GetFree();

            if (sp) {

                sp.initX = x;
                sp.initY = y;
                sp.polarSpeed = speed;
                sp.polarAcc = acc;
                sp.scale = scale*this.resScale;

                sp.polarAngel = i * 360 / count;

                sp.Start(durSec, delaySec);
            }
        }
    }

    //--FC忍者蛙式的爆炸,怪--
    public ShowMobFrogBlast(x: number, y: number, durSec: number) {
        this.ShowFrogBlast(x, y, 8, 800, -800, 0.4, 0, 1);
    }

    //--FC忍者蛙式的爆炸，Hero--
    public ShowHeroFrogBlast() {

        let x = GameWorld.inst.hero.x;
        let y = GameWorld.inst.hero.y;

        this.ShowFrogBlast(x, y, 16, 400, -100, 2.5, 0, 1.5);
        this.ShowFrogBlast(x, y, 16, 350, -100, 2.5, 0, 1.5);
    }

    //---------导弹的火焰拖尾------------
    public EmitBirdDust(x: number, y: number) {

        let sp = this.GetFree();

        if (sp) {

            sp.initX = x + GameUtils.Random(-24, 24);
            sp.initY = y - 100;
            sp.polarSpeed = 0;

            sp.scale = GameUtils.Random(0.7, 1.4);
            sp.scaleSpeed = -1;
            sp.scaleAcc = -0.8;
             sp.alpha=1;
             sp.alphaSpeed=-1;
           
            sp.polarAngel = 0;
            sp.rotation = GameUtils.Random(0, 359);

            sp.speedAppendY = GameUtils.Random(-100, -150);// speedAppendY;
          
            sp.Start(0.6);
        }
    }
}