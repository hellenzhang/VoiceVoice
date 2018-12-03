/**
 * 吃金币的飞字，注意不要动（因为屏幕里动的东西太多了已经）
 */
class Flytip {

    public tf: Laya.Text = null;

    private safeTimer: SafeTimer = null;

    constructor() {
        //-
        this.tf = new Laya.Text();
        
        this.tf.font = "bf_24";
        this.tf.width = 50;
        this.tf.height = 24;

        this.tf.pivotX = this.tf.width / 2;
        this.tf.pivotY = this.tf.height / 2;

        GameWorld.inst.flytipsLayer.addChild(this.tf);

        //-
        this.safeTimer = new SafeTimer();
    }

    public Update() {
        if (this.tf.visible) {
            if (this.safeTimer.IsOK()) {
                this.tf.visible = false;
            }
        }
    }

    public Show(txt: string, durSec: number, x: number, y: number) {
        this.tf.visible = true;
        this.tf.text = txt;
        this.tf.x = x;
        this.tf.y = y;
        this.safeTimer.Start(durSec);
    }
}