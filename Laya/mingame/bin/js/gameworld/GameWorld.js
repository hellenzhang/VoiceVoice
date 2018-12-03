/**
 *
 * 注意，GameWorld是各个精灵的容器，类比于管弦乐的各个演奏者。GamePlay为Controller,总控各个manager协调工作
 * 请类比虚幻GameWorld,GameMode
 *
 * 单例，类比于虚幻world
 * GameWorld.Inst.Initialize()
 * GameWorld.inst.eventProcessor=GamePlay
 * GameWorld.Start();//注意调用这个才启动
 *
 * ！！注意，各个gameSprite都存在GameSpritesManager里，这里的mobsController,heroBulletsConrller是高层业务逻辑，类比于虚幻的playerController
 */
var GameWorld = /** @class */ (function () {
    //--初始化
    function GameWorld() {
        //-----------------------------------------------
        //
        this.isRunning = false;
        //--Time,Input
        this.deltaTimeSec = 0;
    }
    Object.defineProperty(GameWorld, "inst", {
        get: function () {
            if (GameWorld._inst == null) {
                GameWorld._inst = new GameWorld();
            }
            return GameWorld._inst;
        },
        enumerable: true,
        configurable: true
    });
    //注意rootLayer要由外部传过来
    GameWorld.prototype.Initialize = function (rootLayer, eventProcessor) {
        this.rootLayer = rootLayer;
        this.eventProcessor = eventProcessor;
        this.InitGlobal();
        this.InitLayers();
        this.InitMap();
        this.InitGameSprites();
        this.InitGameInput();
        this.InitSparks();
    };
    GameWorld.prototype.InitGlobal = function () {
        //-Time input
        this.deltaTimeSec = 0;
        //-
        this.stageW = Laya.stage.width;
        this.stageH = Laya.stage.height;
    };
    //图层
    GameWorld.prototype.InitLayers = function () {
        this.mapLayer = GameUtils.AddLayer(this.rootLayer);
        //-背景 未来背景上要加怪
        this.heroLayer = GameUtils.AddLayer(this.rootLayer);
        this.mobsLayer = GameUtils.AddLayer(this.rootLayer);
        //黑白烟雾都在这里
        this.smokesLayer = GameUtils.AddLayer(this.rootLayer);
        //-飞字
        this.flytipsLayer = GameUtils.AddLayer(this.rootLayer);
    };
    GameWorld.prototype.InitMap = function () {
        //     //1.启动动图
        this.m_mapManager = new MapManager(this.mapLayer);
        //加载地图
        GameWorld.inst.m_mapManager.InitMap(0);
        this.mapLayer.visible = false;
    };
    GameWorld.prototype.InitGameSprites = function () {
        //-
        this.hero = new Hero();
        //-hero启动--
        GameWorld.inst.hero.Startup(true);
        this.heroLayer.visible = false;
        //-
        this.mobsMgr = new MobsManager();
    };
    //粒子
    GameWorld.prototype.InitSparks = function () {
        //-
        this.smokesMgr = new SmokeSparksManager("gameworld/dust.png", 30, this.smokesLayer, 1);
        this.dustsMgr = new SmokeSparksManager("gameworld/dust_02.png", 20, this.smokesLayer, 1);
        this.frogSparksMgr = new SmokeSparksManager("gameworld/par.png", 50, this.smokesLayer, 0.5);
        //-
        this.flytipsMgr = new FlytipsManager(10);
    };
    GameWorld.prototype.InitGameInput = function () {
        this.m_gameInput = new GameInput(this, this.UpdateMove);
    };
    GameWorld.prototype.UpdateMove = function (p_movex, p_movey) {
        //判断是移动英雄还是移动地图
        GameData.inst.coin += p_movex;
        // 移动地图
        this.m_mapManager.UpdateMove(p_movex, p_movey);
        GameWorld.inst.hero.OnInputMove(0, p_movey);
        //移动头像
        WXPlatform.inst.ODC_RankInGame(p_movex);
    };
    //启动执行
    GameWorld.prototype.Start = function () {
        GameWorld.inst.m_mapManager.Reset();
        GameWorld.inst.hero.Reset();
        //数据重新处理
        GameData.inst.StartGamePlay();
        //输入控制启动
        GameWorld.inst.m_gameInput.StartUp();
        this.mapLayer.visible = true;
        this.heroLayer.visible = true;
        this.isRunning = true;
        this.rootLayer.visible = true;
        this.hero.isActive = true;
        GameData.inst.isHeroDie = false;
    };
    /**
 * OnPause
 */
    GameWorld.prototype.OnPause = function () {
        if (this.m_gameInput != null) {
            //1.输入暂停--输入暂停就会是
            this.m_gameInput.Pause();
        }
    };
    /**
     * OnResume
     */
    GameWorld.prototype.OnResume = function () {
        if (this.m_gameInput != null) {
            //1.输入暂停--输入暂停就会是
            this.m_gameInput.Resume();
        }
    };
    /**
     * 游戏结束
     */
    GameWorld.prototype.GameOver = function () {
        GameWorld.inst.smokesMgr.ShowHeroSmokeBlast();
        GameWorld.inst.frogSparksMgr.ShowHeroFrogBlast();
        GameWorld.inst.hero.Die();
        //保存数据
        GameData.inst.RefreshCoin();
        WXPlatform.inst.SaveScore(GameData.inst.highCoinSD.value);
        GameWorld.inst.m_gameInput.Stop();
    };
    //退出
    GameWorld.prototype.GameExit = function () {
        //切换页面
        GamePagesManager.inst.SwitchPage(GameMenuPage.ID, null);
        GameWorld.inst.m_gameInput.Stop();
        //清空排行数据
        WXPlatform.inst.ODC_RankInGameExit();
    };
    GameWorld.prototype.OnAudioBack = function (p_data) {
        this.m_gameInput.GetAudioResult(p_data);
    };
    //停止
    GameWorld.prototype.Clear = function () {
        this.isRunning = false;
        this.rootLayer.visible = false;
        this.hero.isActive = false;
        this.mobsMgr.Clear();
        //-
        this.smokesMgr.Clear();
        this.dustsMgr.Clear();
        this.frogSparksMgr.Clear();
        //-
        this.flytipsMgr.Clear();
    };
    GameWorld.prototype.Reset = function () {
        WXPlatform.inst.ODC_RankInGameReset(GameData.inst.highCoinSD.value);
        this.Start();
        //this.m_mapManager.Reset();
        //this.hero.Reset();
    };
    GameWorld.prototype.OnMainLoop = function () {
        if (this.isRunning == false) {
            return;
        }
        //--
        this.deltaTimeSec = Laya.timer.delta * 0.001;
        this.m_gameInput.SendInput();
        //-逻辑更新
        this.DoUpdateGameSprites();
        //-特效等飞字
        this.DoUpdateSparks();
        //-碰撞检测
        this.DoMobsHitTest();
        //-渲染
        this.DoRenderGameSprites();
    };
    GameWorld.prototype.DoUpdateSparks = function () {
        this.smokesMgr.Update();
        this.dustsMgr.Update();
        this.frogSparksMgr.Update();
        this.flytipsMgr.Update();
    };
    GameWorld.prototype.DoUpdateGameSprites = function () {
        this.hero.Update();
        this.mobsMgr.Update();
    };
    GameWorld.prototype.DoRenderGameSprites = function () {
        this.hero.Render();
        this.mobsMgr.Render();
    };
    //mob撞玩家
    GameWorld.prototype.DoMobsHitTest = function () {
        if (this.hero.isActive) {
            var t_result = this.m_mapManager.CheckHit(this.hero.x, this.hero.y, this.hero.m_hight);
            //失败了
            if (t_result || this.hero.y < 80) {
                this.eventProcessor.OnMobHitHero(1);
            }
        }
    };
    return GameWorld;
}());
//# sourceMappingURL=GameWorld.js.map