/**
 * gamePlay的hud界面
 * 第一次10秒，以后30秒
 */
var GamePlayHudPanel = /** @class */ (function () {
    //GamePlay.OnInit
    function GamePlayHudPanel(gamePlay, rootLayer) {
        this.gamePlay = gamePlay;
        this.rootLayer = rootLayer;
        //- 0和5的偏移为了适配腾讯自己的bug
        this.uiInfoArr = [
            ["0 highCardLayer", "layer", 0, 0, 540, 120, "l", 0, "t", 0],
            ["1 coin_img", "img", 0, 0, 540, 120, "r", -10, "t", 90, "ui/ui_common/img_coin.png"],
            ["2 coin tf", "tf", 0, 0, 540, 120, 370, 90, 110, 40, "bf_24", "right"],
            //  ["3 pauseBtn", "btn", 0, 0, 540, 120, "c", 0, "t", 10, "gameworld/ui_btn_pause.png"],
            // ["5 shareBtn", "btn", 0, -10, 540, 80, "l", 10, "b", 0, "gameworld/btn_share.png"],
            ["3 rank", "btn9", 0, -10, 540, 80, "l", 10, "t", 200, "gameworld/share_btn_bg.png", 80, 80, 20, "gameworld/btn_share.png"],
            ["4 resumeBtn", "btn", 0, 10, 540, -20, "c", 0, "m", 0, "gameworld/ui_btn_resume.png"],
        ];
        this.targetST = new SafeTimer();
        //-
        this.InitUI();
        this.rootLayer.visible = false;
    }
    GamePlayHudPanel.prototype.InitUI = function () {
        //事件处理函数
        this.eventConfigArr = [
            //   [3, this, this.OnClickPause],
            [3, this, this.OnClickInvite],
            [4, this, this.OnClickResume],
        ];
        //生成ui
        this.sprArr = UIMaker.MakeUI(this.uiInfoArr, this.rootLayer);
        //事件处理
        UIMaker.AddEventListeners(this.eventConfigArr, this.sprArr);
        this.coinTf = this.sprArr[2];
        //暂停
        //   this.pauseBtn = this.sprArr[3];
        //点击屏幕继续
        this.resumeBtn = this.sprArr[4];
        this.resumeBtn.visible = false;
        //---------------高分处理
        // let highCardFg = GameUtils.CreateSprite("res/ui_odc/img_high_card_fg.png", 1);
        // highCardFg.pivotX = 0;
        // highCardFg.pivotY = 0;
        // this.sprArr[0].addChild(highCardFg);
        this.targetSC = new WXSCSprite(Laya.stage.width, 120);
        this.targetSC.y = Laya.stage.height - 120;
        ; //Laya.stage.height-120;
        this.sprArr[0].addChild(this.targetSC);
    };
    //gamePlayPage.OnShow()
    GamePlayHudPanel.prototype.Show = function () {
        this.rootLayer.visible = true;
        this.coinTf.changeText(GameData.inst.coin.toString());
        //   this.pauseBtn.visible = true;
        //   this.resumeBtn.visible = false;
        WXPlatform.inst.ODC_InitHudData();
        this.targetSC.Start(0.3, 4);
        this.targetST.Start(10); //10秒更新一下目标
    };
    GamePlayHudPanel.prototype.Hide = function () {
        this.rootLayer.visible = false;
        this.targetSC.Clear();
        this.targetST.Clear();
    };
    GamePlayHudPanel.prototype.Update = function () {
        //-
        if (this.targetST.IsOK()) {
            this.targetST.Start(30); //10秒检查一下
            WXPlatform.inst.ODC_UpdateHud(); //更新目标
        }
        //-
        this.targetSC.Update();
        //-
        if (Laya.timer.currFrame % 60 == 0) {
            this.coinTf.changeText(GameData.inst.coin.toString());
        }
    };
    GamePlayHudPanel.prototype.RefreshCoin = function () {
        //TODO 此处可能有性能问题
        this.coinTf.changeText(GameData.inst.coin.toString());
    };
    //---点了暂停按钮---
    GamePlayHudPanel.prototype.ShowPause = function () {
        //  this.pauseBtn.visible = false;
        this.resumeBtn.visible = true;
    };
    GamePlayHudPanel.prototype.OnClickPause = function () {
        //   console.log("OnClickPause");
        //    Main.inst.Pause();
        //   this.ShowPause();
    };
    //--点了继续按钮--
    GamePlayHudPanel.prototype.OnClickResume = function () {
        //   console.log("OnClickResume");
        Main.inst.Resume();
        //   this.pauseBtn.visible = true;
        this.resumeBtn.visible = false;
    };
    //-
    GamePlayHudPanel.prototype.OnClickInvite = function () {
        console.log("OnClientInvite");
        WXPlatform.inst.Share("游戏内按钮分享", "res/share1.jpg", "from=100");
    };
    return GamePlayHudPanel;
}());
//# sourceMappingURL=GamePlayHudPanel.js.map