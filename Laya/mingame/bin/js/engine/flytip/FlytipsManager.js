/**
 * 飞字管理器
 */
var FlytipsManager = /** @class */ (function () {
    function FlytipsManager(maxFlyTipCount) {
        this.flytipsArr = null;
        this.flytipsArr = new Array();
        for (var index = 0; index < maxFlyTipCount; index++) {
            var f = new Flytip();
            this.AddToPool(f);
        }
    }
    FlytipsManager.prototype.Show = function (text, durSec, x, y) {
        var f = this.GetFree();
        if (f) {
            f.Show(text, durSec, x, y);
        }
        else {
            //console.log("flytip对象池已满");
        }
    };
    FlytipsManager.prototype.AddToPool = function (f) {
        f.tf.visible = false; //可用
        this.flytipsArr.push(f);
    };
    FlytipsManager.prototype.GetFree = function () {
        for (var index = 0; index < this.flytipsArr.length; index++) {
            var bb = this.flytipsArr[index];
            if (bb.tf.visible == false) {
                return bb;
            }
        }
        // console.error("FlytipMgr.GetFree，对象池已满！");
        return null;
    };
    FlytipsManager.prototype.Update = function () {
        for (var index = 0; index < this.flytipsArr.length; index++) {
            var ss = this.flytipsArr[index];
            if (ss.tf.visible) {
                ss.Update();
            }
        }
    };
    //游戏结束要清理下GameWorld,Active都设置为false,清理世界
    FlytipsManager.prototype.Clear = function () {
        for (var index = 0; index < this.flytipsArr.length; index++) {
            var ss = this.flytipsArr[index];
            ss.tf.visible = false;
        }
    };
    return FlytipsManager;
}());
//# sourceMappingURL=FlytipsManager.js.map