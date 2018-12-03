/**
 * gamePlay的hud界面
 * 第一次10秒，以后30秒
 */
var TestPanel = /** @class */ (function () {
    //GamePlay.OnInit
    function TestPanel(gamePlay, rootLayer) {
        this.gamePlay = gamePlay;
        this.rootLayer = rootLayer;
        //- 0和5的偏移为了适配腾讯自己的bug
        this.uiInfoArr = [
            //-- * * 如果type是btn9或者img9,w,h是图片的大小
            // 注意最后的fgUrl是可选的，有则居中对齐这个img
            // 注意img和btn目前区别是是否mouseEnable,rightOffsetX可选，如果没有则默认居中，有则正常处理
            // [name,type,box_rect,layout_x,layout_y,x,y,bgImg9Url,W,H,9gridSize,fgUrl,rightOffestX]
            ["0 pauseBtn+", "btn", 0, 0, 540, 120, "l", 0, "t", 20, "gameworld/ui_btn_pause.png"],
            ["1 pauseBtn-", "btn", 0, 0, 540, 120, "l", 0, "t", 110, "gameworld/ui_btn_pause.png"],
            ["2 resumeBtn+", "btn", 0, 0, 540, 120, "l", 0, "t", 200, "gameworld/ui_btn_pause.png"],
            ["3 resumeBtn-", "btn", 0, 0, 540, 120, "l", 0, "t", 290, "gameworld/ui_btn_pause.png"],
        ];
        this.m_textInfo = new Laya.Text();
        //-
        this.InitUI();
    }
    TestPanel.prototype.InitUI = function () {
        //事件处理函数
        this.eventConfigArr = [
            [0, this, this.OnClickRunAdd],
            [1, this, this.OnClickRunRelease],
            [2, this, this.OnClickJumpAdd],
            [3, this, this.OnClickJumpRelease],
        ];
        //生成ui
        this.sprArr = UIMaker.MakeUI(this.uiInfoArr, this.rootLayer);
        //事件处理
        UIMaker.AddEventListeners(this.eventConfigArr, this.sprArr);
        Laya.stage.addChild(this.m_textInfo);
    };
    TestPanel.prototype.OnClickRunAdd = function () {
        GameWorld.inst.m_gameInput.m_runConstCoff += 0.5;
        this.ShowInfo();
    };
    TestPanel.prototype.OnClickRunRelease = function () {
        GameWorld.inst.m_gameInput.m_runConstCoff -= 0.5;
        if (GameWorld.inst.m_gameInput.m_runConstCoff <= 0) {
            GameWorld.inst.m_gameInput.m_runConstCoff = 0;
        }
        this.ShowInfo();
    };
    TestPanel.prototype.OnClickJumpAdd = function () {
        GameWorld.inst.m_gameInput.m_jumpConstCoff += 0.5;
        this.ShowInfo();
    };
    TestPanel.prototype.OnClickJumpRelease = function () {
        GameWorld.inst.m_gameInput.m_jumpConstCoff -= 0.5;
        if (GameWorld.inst.m_gameInput.m_jumpConstCoff <= 0) {
            GameWorld.inst.m_gameInput.m_jumpConstCoff = 0;
        }
        this.ShowInfo();
    };
    TestPanel.prototype.ShowInfo = function () {
        this.m_textInfo.x = 300;
        this.m_textInfo.color = "#00ff00";
        this.m_textInfo.text = GameWorld.inst.m_gameInput.m_runConstCoff + "  " + GameWorld.inst.m_gameInput.m_jumpConstCoff;
    };
    //gamePlayPage.OnShow()
    TestPanel.prototype.Show = function () {
        this.rootLayer.visible = true;
    };
    TestPanel.prototype.Hide = function () {
        this.rootLayer.visible = false;
    };
    TestPanel.prototype.Update = function () {
    };
    return TestPanel;
}());
//# sourceMappingURL=TestPanel.js.map