/**
 * 蚕蛹饿汉池模式
 * 
 * 一个粒子，极坐标
 * 
 * 用法
 * 先设置各个参数
 * 然后调用Start(dur)
 * 定时时间到，就是自动isActive=false了
 * 
 * polarAngel
 * polarSpeed
 * polarAcc
 * 
 * scale
 * scaleSpeed
 * scaleAcc
 * 
 * alpha
 * alphaSpeed
 * alphaAcc
 * 
 * lifeTimeSec
 */
class Spark {

    //-读取用
    public isActive: boolean = false;

    private x: number = 0;
    private y: number = 0;
    public initX: number = 0;
    public initY: number = 0;
    public polarLength: number = 0;

    public polarSpeed: number = 0;
    public polarAcc: number = 0;

    public polarAngel: number = 0;

    //模拟飞机爆炸的惯性，击中后不是原地爆炸，而是随之移动
    public speedAppendY: number = 0;

    //缩放是秒速
    public scale: number = 1;
    public scaleSpeed: number = 0;
    public scaleAcc: number = 0;

    public alpha: number = 1;
    public alphaSpeed: number = 0;

    public rotation: number = 0;
    public rotationSpeed: number = 0;

    // public isDeactiveAtPolarSpeed0

    private delayTime: number = 0;

    private safeTimer: SafeTimer = null;

    private delayTimer: SafeTimer = null;

    constructor(public spr: Laya.Sprite) {
        this.safeTimer = new SafeTimer();
        this.delayTimer = new SafeTimer();
        this.SetActive(false);
    }

    //!!注意这个要在设置完参数后再调用，为了防闪烁，这个会update一下
    //启动播放的时候要把时间传进去
    public Start(lifeTimeSec: number, delayTime: number = 0) {
        this.safeTimer.Start(lifeTimeSec);
        this.SetActive(true);

        //-如果设置了延迟，则隐藏-
        this.delayTime = delayTime;
        if (this.delayTime > 0) {
            this.spr.visible = false;
            this.delayTimer.Start(this.delayTime);
        }

        this.Update();//先更新下位置，防止闪烁
    }

    public Update() {
        if (!this.isActive) {
            return;
        }

        //延迟处理
        if (this.delayTime > 0) {
            if (this.delayTimer.IsOK()) {
                this.delayTime = 0;
                this.spr.visible = true;
            } else {
                return;
            }
        }

        if (this.safeTimer.IsOK()) {
            this.SetActive(false);
            // return;
        } else {
            let delta: number = GameWorld.inst.deltaTimeSec;
            //位置

            this.polarSpeed += this.polarAcc * delta;
            this.polarLength += this.polarSpeed * delta;

            GameUtils.PolarToCart_PointTemp(this.polarLength, this.polarAngel);
            this.x = this.initX + Laya.Point.TEMP.x;

            this.initY += +this.speedAppendY * delta;

            this.y = this.initY + Laya.Point.TEMP.y;

            //缩放,
            this.scaleSpeed += this.scaleAcc * delta;
            this.scale += this.scaleSpeed * delta;
            if (this.scale < 0) {
                this.scale = 0;
               
            }

            //
            this.rotation += this.rotationSpeed * delta;

            //
            this.alpha += this.alphaSpeed * delta;
            this.alpha = GameUtils.Clamp(this.alpha, 0, 1);

            //----------spr------------
            if (this.spr) {
                this.spr.x = this.x;
                this.spr.y = this.y;

                this.spr.scale(this.scale, this.scale);

                this.spr.alpha = this.alpha;

                this.spr.rotation = this.rotation;
            }

            //--------出边界检查--------
            if(GameUtils.IsOutOfStageBounds(this.x,this.y)){
                this.SetActive(false);
            }
        }

    }

    public SetActive(b: boolean) {
        this.isActive = b;
        this.spr.visible = b;
        if (b == false) {
            this.Reset();
        }
    }

    //active=false要重设置
    private Reset() {
        this.x = 0;
        this.y = 0;
        this.initX = 0;
        this.initY = 0;
        this.polarLength = 0;

        this.polarSpeed = 0;
        this.polarAcc = 0;

        this.polarAngel = 0;

        //缩放是秒速
        this.scale = 1;
        this.scaleSpeed = 0;
        this.scaleAcc = 0;

        this.alpha = 1;
        this.alphaSpeed = 0;


        this.rotation = 0;
        this.rotationSpeed = 0;
    }
}