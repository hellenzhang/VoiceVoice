/**
 * 封装微信shareCanves的sprite
 * 
 * !!注意这里操作极其昂贵
 *  this.graphics.drawTexture(this.scTexture);
 */
class WXSCSprite extends Laya.Sprite {
    //sharedCanvas,没有wx对象情况下，此值为0
    private scTexture: Laya.Texture;
    private safeTimer: SafeTimer;
    private gapSec: number = 1;
    //gapSec是间隔时间
    constructor(w: number, h: number) {
        super();

        let wx = Laya.Browser.window.wx;
        if (wx) {
            let sc = Laya.Browser.window.sharedCanvas;
            //w,h极其重要
            sc.width = w;
            sc.height = h;
            this.scTexture = new Laya.Texture(sc);//textuer在这里固定了尺寸
            
        }
        this.safeTimer = new SafeTimer();
    }

    private times: number = 0;
    public Start(delay: number, times: number) {
        //this.visible=true;
        this.gapSec = delay;
        this.times = times;
        // this.graphics.clear();
        this.safeTimer.Start(this.gapSec);
    }
    public Clear() {
        this.safeTimer.Clear();
        this.graphics.clear();
        //this.visible=false;
    }

    public Update() {
        if (this.scTexture && this.safeTimer.IsOK()) {

             console.log("!!!! WXSCSprite",this.gapSec,this.scTexture.width,this.scTexture.height);

            this.graphics.clear();
            this.graphics.drawTexture(this.scTexture);
            // this.gapSec*=2;
            this.times--;
            if (this.times > 0) {
                this.safeTimer.Start(this.gapSec);
            } else {
                this.safeTimer.Clear();
            }
        }

    }

}