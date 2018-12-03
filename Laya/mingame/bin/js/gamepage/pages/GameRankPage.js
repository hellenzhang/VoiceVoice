var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 游戏排行榜界面
 */
var GameRankPage = /** @class */ (function (_super) {
    __extends(GameRankPage, _super);
    function GameRankPage() {
        var _this = _super.call(this, GameRankPage.ID) || this;
        //==================panel布局================
        _this.uiInfoArr = [
            // ["0 back_btn", "btn", 20, 90, 500, 80, "l", 0, "m", 0, "ui/ui_common/btn_back.png"],
            // ["1 title", "img", 20, 90, 500, 80, "c", 0, "m", 0, "ui/ui_gamerank/img_rankpage_title.png"],
            // ["2 close_btn", "btn", 20, 90, 500, 80, "r", 0, "m", 0, "ui/ui_common/btn_close.png"],
            ["0 back_btn", "btn9", 20, 90, 500, 80, "l", 0, "m", 0, "ui/ui_common/img_btn0_bg.png", 80, 80, 20, "ui/ui_common/btn_close.png"],
            ["1 title", "img9", 20, 90, 500, 80, "c", 0, "m", 0, "ui/ui_common/img_panel_bg.png", 320, 80, 20, "ui/ui_gamerank/img_rankpage_title.png"],
            ["2 close_btn", "btn9", 20, 90, 500, 80, "r", 0, "m", 0, "ui/ui_common/img_btn0_bg.png", 80, 80, 20, "ui/ui_common/btn_close.png"],
            //["rank_layer", "layer", 20, 160, 500,640, "l", 0, "t", 0],
            ["3 invite_btn", "btn9", 20, -30, 500, 120, "l", 0, "t", 0, "ui/ui_common/btn_pink.png", 500, 120, 20, "ui/ui_gamerank/btn_invite.png"],
            ["4 totlal coin icon", "img", 0, 0, 540, 90, "l", 20, "m", 0, "ui/ui_common/img_coin.png"],
            ["5 total coin", "tf", 0, 0, 540, 90, 80, 25, 200, 40, "bf_36", "left"],
            ["6,rankPanelLayer", "layer", 0, 0, 540, 960, "l", 20 + 60, "t", 190],
            ["7,left_btn", "btn", 0, 0, 540, 960, "l", 20, "m", 0, "ui/ui_common/btn_left.png"],
            ["8,right_btn", "btn", 0, 0, 540, 960, "r", -20, "m", 0, "ui/ui_common/btn_left.png"],
        ];
        //--翻页用--，默认-1，表示默认页面
        _this.currPageIdx = -1;
        return _this;
    }
    GameRankPage.prototype.OnInit = function () {
        //事件处理函数
        this.eventConfigArr = [
            [0, this, this.OnClickBack],
            [2, this, this.OnClickBack],
            [3, this, this.OnClickInvite],
            [7, this, this.OnClickLeft],
            [8, this, this.OnClickRight]
        ];
        //生成ui
        this.sprArr = UIMaker.MakeUI(this.uiInfoArr, this.rootUI);
        //右上角关闭按钮要隐藏，否则容易让人误点关闭了游戏。
        this.sprArr[2].visible = false;
        this.sprArr[8].scaleX = -1;
        //事件处理
        UIMaker.AddEventListeners(this.eventConfigArr, this.sprArr);
        //-----
        // WXPlatform.inst.RequestClear(500,600);
        this.rankPane = new RankPane();
        this.sprArr[6].addChild(this.rankPane);
        this.totlaCoinTf = this.sprArr[5];
    };
    //true表示先把分数存一下，然后再get,这样提取数据比较准确
    GameRankPage.prototype.OnShow = function (data) {
        this.currPageIdx = -1;
        this.rankPane.Show(data);
        this.rankPane.TurnPage(this.currPageIdx);
        //-
        this.totlaCoinTf.changeText(GameData.inst.totalCoinSD.value.toString());
    };
    GameRankPage.prototype.OnUpdate = function () {
        this.rankPane.Update();
    };
    // public OnHide() {
    // }
    //-----------事件处理----------
    GameRankPage.prototype.OnClickBack = function () {
        //console.log("OnClickOKBtn");
        GamePagesManager.inst.SwitchPage(GameMenuPage.ID, null);
    };
    GameRankPage.prototype.OnClickInvite = function () {
        WXPlatform.inst.Share("路见不平一声吼，十万主播的动情推荐，请你也来吼一吼！", "res/share1.jpg", "from=rank");
    };
    GameRankPage.prototype.OnClickLeft = function () {
        this.currPageIdx--;
        if (this.currPageIdx < -1) {
            this.currPageIdx = -1;
        }
        this.rankPane.TurnPage(this.currPageIdx);
    };
    GameRankPage.prototype.OnClickRight = function () {
        this.currPageIdx++;
        this.rankPane.TurnPage(this.currPageIdx);
    };
    GameRankPage.ID = "gameRankPage";
    return GameRankPage;
}(GamePage));
//# sourceMappingURL=GameRankPage.js.map