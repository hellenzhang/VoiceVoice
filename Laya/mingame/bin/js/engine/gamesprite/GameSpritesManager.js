/**
 * 精灵管理器，只管理一类类型（比如怪，鸟，子弹），一次创建不再销毁
 * 超轻量的对象池，怪，hero弹，怪子弹都从这里来，只添加不销毁，一律update，无效就标志成isActive=false,可以被下次回收使用
 *40个以内是安全的，太大了之后，自行分析之
 *注意，启用前调用startup,不用了要调用clear
 */
var GameSpritesManager = /** @class */ (function () {
    function GameSpritesManager() {
        //碰撞检测也会用到
        this.isActive = false;
        this.gameSpritesArr = null;
        this.gameSpritesArr = new Array();
        //因为泛型new不出T来，暂时不处理晦涩语法问题，手动写在子类里即可
    }
    GameSpritesManager.prototype.AddToPool = function (gameSprite) {
        this.gameSpritesArr.push(gameSprite);
    };
    GameSpritesManager.prototype.Startup = function () {
        this.isActive = true;
    };
    GameSpritesManager.prototype.GetFree = function () {
        for (var index = 0; index < this.gameSpritesArr.length; index++) {
            var bb = this.gameSpritesArr[index];
            if (bb.isActive == false) {
                return bb;
            }
        }
        // console.error("GameSpritesPool.GetFree，对象池已满！");
        return null;
    };
    GameSpritesManager.prototype.Update = function () {
        if (!this.isActive) {
            return;
        }
        for (var index = 0; index < this.gameSpritesArr.length; index++) {
            var ss = this.gameSpritesArr[index];
            if (ss != null) {
                if (ss.isActive) {
                    ss.Update();
                }
            }
        }
    };
    GameSpritesManager.prototype.Render = function () {
        if (!this.isActive) {
            return;
        }
        for (var index = 0; index < this.gameSpritesArr.length; index++) {
            var ss = this.gameSpritesArr[index];
            if (ss != null) {
                if (ss.isActive) {
                    ss.Render();
                }
            }
        }
    };
    //游戏结束要清理下GameWorld,Active都设置为false,清理世界
    GameSpritesManager.prototype.Clear = function () {
        this.isActive = false;
        for (var index = 0; index < this.gameSpritesArr.length; index++) {
            var ss = this.gameSpritesArr[index];
            if (ss != null) {
                ss.isActive = false;
            }
        }
    };
    //获取当前活跃数量
    GameSpritesManager.prototype.GetActiveGameSpritesCount = function () {
        var count = 0;
        for (var index = 0; index < this.gameSpritesArr.length; index++) {
            var bb = this.gameSpritesArr[index];
            if (bb.isActive) {
                count++;
            }
        }
        return count;
    };
    return GameSpritesManager;
}());
//# sourceMappingURL=GameSpritesManager.js.map