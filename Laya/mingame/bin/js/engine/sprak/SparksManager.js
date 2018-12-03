/**
 * 粒子特效的父类
 * 这个要播放的是动画，需要动画播放完毕后再播放这个
 *
 * 初始化添加放到业务逻辑去做
 *
 * TODO 这里有些浪费，没有isActive来识别Update,没发现是瓶颈，不要处理
 */
var SparksManager = /** @class */ (function () {
    function SparksManager() {
        this.sparkArr = null;
        this.sparkArr = new Array();
    }
    SparksManager.prototype.GetFree = function () {
        for (var index = 0; index < this.sparkArr.length; index++) {
            var bb = this.sparkArr[index];
            if (bb.isActive == false) {
                return bb;
            }
        }
        // console.error("SparksManager.GetFree，对象池已满！");
        return null;
    };
    SparksManager.prototype.Update = function () {
        // if(!this.isActive){
        //     return;
        // }
        for (var index = 0; index < this.sparkArr.length; index++) {
            var ss = this.sparkArr[index];
            if (ss != null) {
                if (ss.isActive) {
                    ss.Update();
                }
            }
        }
    };
    //游戏结束要清理下GameWorld,Active都设置为false,清理世界
    SparksManager.prototype.Clear = function () {
        for (var index = 0; index < this.sparkArr.length; index++) {
            var ss = this.sparkArr[index];
            if (ss != null) {
                ss.SetActive(false);
            }
        }
    };
    return SparksManager;
}());
//# sourceMappingURL=SparksManager.js.map