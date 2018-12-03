/**
 * 游戏的一个页面，2D持有VIEW,gamePlay持有view和gameWorld
 *
 *
 * 注意，这个内部还有一个状态机，持有GamePagePhase,表示游戏page内的流程，比如gamePlay的云，清怪，boss战等
 */
var GamePage = /** @class */ (function () {
    function GamePage(pageID) {
        this.pageID = pageID;
        this._isInited = false; //在GamePagesManager.switchPage的page.onShow之气，如果没调用过，会调用
        //---------------GamePagePhase的实现-------------
        //-状态机，只有Boss用，
        this.phaseArr = null;
        this.currPhase = null;
        this.rootUI = new Laya.Sprite();
    }
    //在第一次onShow之前调用
    GamePage.prototype.OnInit = function () { };
    GamePage.prototype.OnShow = function (data) { };
    GamePage.prototype.OnHide = function () { };
    GamePage.prototype.OnUpdate = function () { };
    GamePage.prototype.AddPhase = function (s) {
        if (this.phaseArr == null) {
            this.phaseArr = new Array();
        }
        if (this.GetPhase(s.id) == null) {
            this.phaseArr.push(s);
        }
        else {
            // console.error("已有此状态");
        }
    };
    GamePage.prototype.UpdatePhase = function () {
        if (this.currPhase) {
            this.currPhase.OnUpdate();
        }
    };
    GamePage.prototype.SwitchPhase = function (id, data) {
        // console.log("SwitchPhase", id, Laya.timer.currTimer);
        if (this.currPhase) {
            this.currPhase.OnExit();
        }
        var s = this.GetPhase(id);
        if (s) {
            this.currPhase = s;
            this.currPhase.OnEnter(data);
        }
        else {
            //console.error("无此状态");
        }
    };
    GamePage.prototype.GetPhase = function (id) {
        if (this.phaseArr) {
            for (var index = 0; index < this.phaseArr.length; index++) {
                var e = this.phaseArr[index];
                if (e.id == id) {
                    return e;
                }
            }
        }
        return null;
    };
    GamePage.prototype.IsCurrPahseID = function (id) {
        if (this.currPhase) {
            return this.currPhase.id == id;
        }
        return false;
    };
    return GamePage;
}());
//# sourceMappingURL=GamePage.js.map