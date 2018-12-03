/**
 * GamePlay对应虚幻的GameMode,相当于乐队指挥，GameWorld是乐队，接受GampPlay命令，反馈事件给GamePlay处理
 */
/**
 * 加载资源和配表的界面
 */
class GamePlayPage extends GamePage implements IGameWorldHitEventProcessor {

    static ID: string = "gamePlayPage";

    //--panel--
    //mainUI
    public hudPanel: GamePlayHudPanel;
    //返回或者继续
    public m_backOrContinuePanel: BackOrContinuePanel;

    private gameOverST: SafeTimer = null;



    constructor() {
        super(GamePlayPage.ID);

        this.gameOverST = new SafeTimer();
    }

    public OnInit() {
                //-层级-
        let gameWorldLayer = GameUtils.AddLayer(this.rootUI);
        let hudLayer = GameUtils.AddLayer(this.rootUI);
        let t_backOrContinueLayer=GameUtils.AddLayer(this.rootUI);
        //-初始化panel-
        this.hudPanel = new GamePlayHudPanel(this, hudLayer);
        //-返回还是继续
        this.m_backOrContinuePanel=new BackOrContinuePanel(this, t_backOrContinueLayer);
       //var t_test=new TestPanel(this, hudLayer);
        //-初始化GameWorld-
        GameWorld.inst.Initialize(gameWorldLayer, <IGameWorldHitEventProcessor>this);


        

  //-


    }
   
    public OnShow(data: any) {
        this.gameOverST.Clear();


        //-引擎--启动游戏--地图数据初始化
        GameWorld.inst.Start();
       
        //-UI
        this.hudPanel.Show();

    }

    public OnUpdate() {

        // this.blockSpr.x+=GameWorld.inst.deltaTimeSec*100;

        // GameWorld.inst.mobsMgr.Refresh();
        // //-GameWorld
         GameWorld.inst.OnMainLoop();

        // //UI更新，ui的计时器，放在最后
         this.hudPanel.Update();
        this.m_backOrContinuePanel.Update();
        if(this.gameOverST.IsOK()){
        //    GameData.inst.RefreshCoin();
        //    WXPlatform.inst.SaveScore(GameData.inst.highCoinSD.value);
        //    GamePagesManager.inst.SwitchPage(GameMenuPage.ID,null);
        //-----重置
       // GameWorld.inst.Reset();
        }
    }

    public OnHide() {
        //1.停止输入
         
        // GameWorld.inst.Clear();
         this.hudPanel.Hide();
    }
    /**
     * OnPause
     */
    public OnPause() {
        GameWorld.inst.OnPause();
        this.hudPanel.ShowPause();
    }
    /**
     * OnResume
     */
    public OnResume() {
         GameWorld.inst.OnResume();
    }
    //==========================碰撞事件处理============================
    public OnMobHitHero(m: Mob) {
        // console.log("Main.OnMobHitHero");
         this.KillHero(m);
        // this.KillMob(m);
    }

    private KillMob(m: Mob) {
        //-
        // m.isActive = false;

        // //-爆炸
        // GameWorld.inst.smokesMgr.ShowMobSmokeBlast(m.x, m.y);
        // GameWorld.inst.frogSparksMgr.ShowMobFrogBlast(m.x, m.y, 0.4);
        // //-音效
        // GameAudio.inst.KillMob();

    }

    private KillHero(killerSpr: GameSprite) {

        //     //爆炸特效
           
        //     //音效
        //     GameAudio.inst.KillHero();

        //     //-
            GameWorld.inst.GameOver();
           
          
            //显示提示
            this.m_backOrContinuePanel.Show();
        //    //-
       //     this.gameOverST.Start(4);
    }



}