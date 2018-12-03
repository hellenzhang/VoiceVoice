/**
 * 管理各个Pages切换的管理器，跟GameWorld并存的全局高阶类
 * 注意使用前要Iniitialize一下
 */
var GamePagesManager = /** @class */ (function () {
    function GamePagesManager() {
        //------------------状态机的实现-------------
        //-<pageID:string,GamePage>
        this.pageDict = null;
        this.currPage = null;
        //放各个pagesLayer的容器
        this.rootLayer = null;
        //-容器
        this.rootLayer = new Laya.Sprite();
        Laya.stage.addChild(this.rootLayer);
    }
    Object.defineProperty(GamePagesManager, "inst", {
        get: function () {
            if (GamePagesManager._inst == null) {
                GamePagesManager._inst = new GamePagesManager();
            }
            return GamePagesManager._inst;
        },
        enumerable: true,
        configurable: true
    });
    GamePagesManager.prototype.AddPage = function (s) {
        if (this.pageDict == null) {
            this.pageDict = new Laya.Dictionary();
        }
        if (this.GetPage(s.pageID) == null) {
            this.pageDict.set(s.pageID, s);
        }
        else {
            //console.error("已有此page");
        }
    };
    GamePagesManager.prototype.UpdatePage = function () {
        if (this.currPage) {
            this.currPage.OnUpdate();
        }
    };
    GamePagesManager.prototype.SwitchPage = function (id, data) {
        //console.log("SwtichPage", id, Laya.timer.currTimer);
        if (this.currPage) {
            this.currPage.OnHide();
            this.rootLayer.removeChild(this.currPage.rootUI);
        }
        var s = this.GetPage(id);
        if (s) {
            this.currPage = s;
            if (this.currPage._isInited == false) {
                this.currPage._isInited = true;
                this.currPage.OnInit();
            }
            this.rootLayer.addChild(this.currPage.rootUI);
            this.currPage.OnShow(data);
        }
        else {
            // console.error("无此状态");
        }
    };
    GamePagesManager.prototype.GetPage = function (id) {
        return this.pageDict.get(id);
    };
    GamePagesManager.prototype.IsCurrPage = function (id) {
        if (this.currPage) {
            return this.currPage.pageID == id;
        }
        return false;
    };
    return GamePagesManager;
}());
//# sourceMappingURL=GamePagesManager.js.map