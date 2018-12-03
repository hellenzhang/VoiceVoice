/**
 * 吃金币的飞字，注意不要动（因为屏幕里动的东西太多了已经）
 */
var Flytip = /** @class */ (function () {
    function Flytip() {
        this.tf = null;
        this.safeTimer = null;
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
    Flytip.prototype.Update = function () {
        if (this.tf.visible) {
            if (this.safeTimer.IsOK()) {
                this.tf.visible = false;
            }
        }
    };
    Flytip.prototype.Show = function (txt, durSec, x, y) {
        this.tf.visible = true;
        this.tf.text = txt;
        this.tf.x = x;
        this.tf.y = y;
        this.safeTimer.Start(durSec);
    };
    return Flytip;
}());
//# sourceMappingURL=Flytip.js.map