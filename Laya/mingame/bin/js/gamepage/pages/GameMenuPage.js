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
 * 游戏封面菜单
 */
var GameMenuPage = /** @class */ (function (_super) {
    __extends(GameMenuPage, _super);
    function GameMenuPage() {
        var _this = _super.call(this, GameMenuPage.ID) || this;
        //==================panel布局================
        _this.uiInfoArr = [
            ["0 title", "img", 0, 0, 540, 960, "c", 0, "t", 100, "res/img_cover0.png"],
            ["1 start", "btn9", 0, 0, 540, 960, "c", 0, "t", 520, "ui/ui_common/img_btn0_bg.png", 220, 80, 20, "ui/ui_gamemenu/btn_startplay.png"],
            ["2 rank", "btn9", 0, 0, 540, 960, "c", 0, "t", 620, "ui/ui_common/img_btn0_bg.png", 220, 80, 20, "ui/ui_gamemenu/btn_rank.png"],
            ["3 coin", "coin_btn", 0, 0, 540, 960, "c", 0, "t", 720],
            ["4 ver", "tf", 0, 0, 540, 960, 20, 460, 200, 24, "bf_24", "left"],
        ];
        return _this;
    }
    GameMenuPage.prototype.OnInit = function () {
        //穿件gameClub按钮
        WXPlatform.inst.CreateGameClubButton();
        //事件处理函数
        this.eventConfigArr = [
            [1, this, this.OnClickStartBtn],
            [2, this, this.OnClickRankBtn],
            [3, this, this.OnClickCoinBtn],
        ];
        //生成ui
        this.sprArr = UIMaker.MakeUI(this.uiInfoArr, this.rootUI);
        //事件处理
        UIMaker.AddEventListeners(this.eventConfigArr, this.sprArr);
        this.verTf = this.sprArr[4];
        this.verTf.changeText(GAME_VER);
        //laya版本号
        var layaTf = UIUtils.CreateSimpleTextField("bf_24", 0, 0, 300, 30, this.rootUI);
        layaTf.align = "right";
        layaTf.changeText("Powered by LayaAir Engine    ");
        layaTf.x = Laya.stage.width - layaTf.textWidth - 20;
        layaTf.y = Laya.stage.height - layaTf.textHeight - 20;
        //-
        this.heroBtn = this.sprArr[1];
        this.rankBtn = this.sprArr[2];
        this.coinBtn = this.sprArr[3];
        // console.log("wh",layaTf.textWidth,layaTf.textHeight);
        //-视频广告初始化
        WXPlatform.inst.InitVideoAD();
    };
    GameMenuPage.prototype.OnShow = function (data) {
        WXPlatform.inst.ShowGameClubButton();
        //金币按钮字
        this.coinBtn.SetLabel(GameData.inst.totalCoinSD.value.toString());
    };
    //  public OnUpdate() {
    //  }
    GameMenuPage.prototype.OnHide = function () {
        WXPlatform.inst.HideGameClubButton();
    };
    //-----------事件处理----------
    GameMenuPage.prototype.OnClickStartBtn = function () {
        //console.log("oncllickstartbtn");
        GamePagesManager.inst.SwitchPage(GamePlayPage.ID, null);
    };
    GameMenuPage.prototype.OnClickRankBtn = function () {
        //console.log("oncllickrankbtn");
        GamePagesManager.inst.SwitchPage(GameRankPage.ID, true);
    };
    GameMenuPage.prototype.OnClickCoinBtn = function () {
        var a = Laya.LocalStorage.getItem("YUCeshi");
        if (a) {
            this.coinBtn.SetLabel(a);
        }
        else {
            this.coinBtn.SetLabel("NO");
        }
        Laya.LocalStorage.setItem("YUCeshi", "zhende you ha");
        console.log("花钱发分享");
        GameData.inst.totalCoinSD.value = 0;
        GameData.inst.highCoinSD.value = 0;
        GameData.inst.SaveMoney();
        //   this.coinBtn.SetLabel("no money");
        //   WXPlatform.inst.StartRecord();
        //  this.DrawAudio([200,100,0,0,50,60,40,50,8,0,600]);
        WXPlatform.inst.Share("花钱发分享", "res/share1.jpg", "from=coin");
    };
    GameMenuPage.prototype.ShwoTest = function (p_string) {
        this.verTf.changeText(p_string);
    };
    GameMenuPage.prototype.DrawAudio = function (data) {
        if (this.testVideo == null) {
            this.testVideo = new Laya.Sprite();
            Laya.stage.addChild(this.testVideo);
        }
        //   this.testVideo.graphics.drawLine(10, 58, 146, 58, "#ff0000", 3);
        this.testVideo.graphics.clear();
        for (var index = 0; index < data.length; index++) {
            var element = data[index];
            this.testVideo.graphics.drawLine(index, 600, index, 600 - element, "#ff0000", 1);
        }
    };
    GameMenuPage.ID = "GameMenuPage";
    return GameMenuPage;
}(GamePage));
//# sourceMappingURL=GameMenuPage.js.map