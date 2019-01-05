/**
 * gamePlay的hud界面
 * 第一次10秒，以后30秒
 */
var GamePlayHudPanel = /** @class */ (function () {
    //GamePlay.OnInit
    function GamePlayHudPanel(gamePlay, rootLayer) {
        this.gamePlay = gamePlay;
        this.rootLayer = rootLayer;
        //能量显示
        this.m_energyShow = new Laya.Text();
        //- 0和5的偏移为了适配腾讯自己的bug
        this.uiInfoArr = [
            ["0 highCardLayer", "layer", 0, 0, 540, 120, "l", 0, "t", 0],
            ["1 coin_img", "img", 0, 0, 540, 120, "r", -10, "t", 90, "ui/ui_common/img_coin.png"],
            ["2 coin tf", "tf", 0, 0, 540, 120, 370, 90, 110, 40, "bf_24", "right"],
            ["3 shareBtn", "btn9", 0, -10, 540, 80, "l", 10, "b", 0, "gameworld/share_btn_bg.png", 80, 80, 20, "gameworld/btn_share.png"],
            ["4 resumeBtn", "btn", 0, 10, 540, -20, "c", 0, "m", 0, "gameworld/ui_btn_resume.png"],
            ["5 addSpeedBtn", "btn", 0, 500, 540, 80, "l", 10, "m", 0, "ui/ui_common/addSpeed.png", 80, 80, 20],
            ["6 cdmask", "btn", 0, 500, 540, 80, "l", 10, "m", 0, "ui/ui_common/cdmask.png", 80, 80, 20],
        ];
        this.targetST = new SafeTimer();
        //-
        this.InitUI();
        this.rootLayer.visible = false;
    }
    GamePlayHudPanel.prototype.InitUI = function () {
        //事件处理函数
        this.eventConfigArr = [
            [4, this, this.OnClickResume],
            [5, this, this.OnPressAddSpeed, Laya.Event.MOUSE_OVER],
            [5, this, this.OnReleaseAddSpeed, Laya.Event.MOUSE_OUT],
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
        this.targetSC = new WXSCSprite(Laya.stage.width, 55);
        this.targetSC.y = Laya.stage.height - 55;
        ; //Laya.stage.height-120;
        this.sprArr[0].addChild(this.targetSC);
        //绑定位置
        // this.sprArr[5].addChild(this.m_energyShow); 
        this.rootLayer.addChild(this.m_energyShow);
        this.m_energyShow.pos(this.sprArr[5].x - this.sprArr[5].width / 2, this.sprArr[5].y - this.sprArr[5].height / 2 - 30); //this.sprArr[5].height/2+10
        // console.log("77777777778888888888888:",this.sprArr[5].x,this.sprArr[5].y-this.sprArr[5].height-30);
        this.m_energyShow.font = "bf_24";
        this.m_energyShow.fontSize = 50;
    };
    //gamePlayPage.OnShow()
    GamePlayHudPanel.prototype.Show = function () {
        this.rootLayer.visible = true;
        this.coinTf.changeText(GameData.inst.coin.toString());
        GameWorld.inst.m_gameInput.m_addSpeedInput.SetUI(this.sprArr[5], this.sprArr[6]);
        WXPlatform.inst.ODC_InitHudData();
        this.targetSC.Start(0.3, 4);
        this.targetST.Start(10); //10秒更新一下目标
        //
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
        //显示能量
        // console.log("========"+GameData.inst.speedPower+"  "+GameData.inst.speedPower.toFixed(1));
        this.m_energyShow.text = GameData.inst.speedPower.toFixed(1) + "/" + GameData.inst.maxPower;
        // //图标显示
        // if ( GameWorld.inst.m_gameInput.m_addSpeedInput.CheckCanAddSpeed()) {
        //     this.sprArr[5].visible=true;
        //     this.sprArr[6].visible=false;
        // }
        // else
        // {
        //     this.sprArr[5].visible=false;
        //     this.sprArr[6].visible=true;
        // }
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
    //点击加速
    GamePlayHudPanel.prototype.OnPressAddSpeed = function () {
        GameWorld.inst.m_gameInput.m_addSpeedInput.PressSpeedButton();
        var t_imge = this.sprArr[5];
    };
    //释放加速
    GamePlayHudPanel.prototype.OnReleaseAddSpeed = function () {
        GameWorld.inst.m_gameInput.m_addSpeedInput.ReleaseSpeedButton();
    };
    //-
    GamePlayHudPanel.prototype.OnClickInvite = function () {
        console.log("OnClientInvite");
        WXPlatform.inst.Share("游戏内按钮分享", "res/share1.jpg", "from=100");
    };
    return GamePlayHudPanel;
}());
//# sourceMappingURL=GamePlayHudPanel.js.map