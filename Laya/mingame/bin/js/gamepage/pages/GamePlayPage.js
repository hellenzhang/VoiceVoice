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
 * GamePlay对应虚幻的GameMode,相当于乐队指挥，GameWorld是乐队，接受GampPlay命令，反馈事件给GamePlay处理
 */
/**
 * 加载资源和配表的界面
 */
var GamePlayPage = /** @class */ (function (_super) {
    __extends(GamePlayPage, _super);
    function GamePlayPage() {
        var _this = _super.call(this, GamePlayPage.ID) || this;
        _this.gameOverST = null;
        _this.gameOverST = new SafeTimer();
        return _this;
    }
    GamePlayPage.prototype.OnInit = function () {
        //-层级-
        var gameWorldLayer = GameUtils.AddLayer(this.rootUI);
        var hudLayer = GameUtils.AddLayer(this.rootUI);
        var t_backOrContinueLayer = GameUtils.AddLayer(this.rootUI);
        //-初始化panel-
        this.hudPanel = new GamePlayHudPanel(this, hudLayer);
        //-返回还是继续
        this.m_backOrContinuePanel = new BackOrContinuePanel(this, t_backOrContinueLayer);
        //var t_test=new TestPanel(this, hudLayer);
        //-初始化GameWorld-
        GameWorld.inst.Initialize(gameWorldLayer, this);
        //-
    };
    GamePlayPage.prototype.OnShow = function (data) {
        this.gameOverST.Clear();
        //-引擎--启动游戏--地图数据初始化
        GameWorld.inst.Start();
        //-UI
        this.hudPanel.Show();
    };
    GamePlayPage.prototype.OnUpdate = function () {
        // this.blockSpr.x+=GameWorld.inst.deltaTimeSec*100;
        // GameWorld.inst.mobsMgr.Refresh();
        // //-GameWorld
        GameWorld.inst.OnMainLoop();
        // //UI更新，ui的计时器，放在最后
        this.hudPanel.Update();
        this.m_backOrContinuePanel.Update();
        if (this.gameOverST.IsOK()) {
            //    GameData.inst.RefreshCoin();
            //    WXPlatform.inst.SaveScore(GameData.inst.highCoinSD.value);
            //    GamePagesManager.inst.SwitchPage(GameMenuPage.ID,null);
            //-----重置
            // GameWorld.inst.Reset();
        }
    };
    GamePlayPage.prototype.OnHide = function () {
        //1.停止输入
        // GameWorld.inst.Clear();
        this.hudPanel.Hide();
    };
    /**
     * OnPause
     */
    GamePlayPage.prototype.OnPause = function () {
        GameWorld.inst.OnPause();
        this.hudPanel.ShowPause();
    };
    /**
     * OnResume
     */
    GamePlayPage.prototype.OnResume = function () {
        GameWorld.inst.OnResume();
    };
    //==========================碰撞事件处理============================
    GamePlayPage.prototype.OnMobHitHero = function (m) {
        // console.log("Main.OnMobHitHero");
        this.KillHero(m);
        // this.KillMob(m);
    };
    GamePlayPage.prototype.KillMob = function (m) {
        //-
        // m.isActive = false;
        // //-爆炸
        // GameWorld.inst.smokesMgr.ShowMobSmokeBlast(m.x, m.y);
        // GameWorld.inst.frogSparksMgr.ShowMobFrogBlast(m.x, m.y, 0.4);
        // //-音效
        // GameAudio.inst.KillMob();
    };
    GamePlayPage.prototype.KillHero = function (killerSpr) {
        //     //爆炸特效
        //     //音效
        //     GameAudio.inst.KillHero();
        //     //-
        GameWorld.inst.GameOver();
        //显示提示
        this.m_backOrContinuePanel.Show();
        //    //-
        //     this.gameOverST.Start(4);
    };
    GamePlayPage.ID = "gamePlayPage";
    return GamePlayPage;
}(GamePage));
//# sourceMappingURL=GamePlayPage.js.map