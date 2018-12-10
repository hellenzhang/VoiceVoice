/**
 * gamePlay的hud界面
 * 第一次10秒，以后30秒
 */
class GamePlayHudPanel {

    private coinTf: Laya.Text;
  //  private pauseBtn: Laya.Sprite;
    private resumeBtn: Laya.Sprite;//点击屏幕继续游戏
      
      
    //左上做高分的人的信息
    private targetSC: WXSCSprite;

    private targetST: SafeTimer;//定期更新目标榜

    //- 0和5的偏移为了适配腾讯自己的bug
    private uiInfoArr: Array<Array<any>> = [
        ["0 highCardLayer", "layer", 0, 0, 540, 120, "l", 0, "t", 0],
        ["1 coin_img", "img", 0, 0, 540, 120, "r", -10, "t", 90, "ui/ui_common/img_coin.png"],
        ["2 coin tf", "tf", 0, 0, 540, 120, 370, 90, 110, 40, "bf_24", "right"],

      //  ["3 pauseBtn", "btn", 0, 0, 540, 120, "c", 0, "t", 10, "gameworld/ui_btn_pause.png"],
   
        // ["5 shareBtn", "btn", 0, -10, 540, 80, "l", 10, "b", 0, "gameworld/btn_share.png"],

        ["3 rank", "btn9", 0, -10, 540, 80, "l", 10, "t", 200, "gameworld/share_btn_bg.png", 80, 80, 20, "gameworld/btn_share.png"],
        ["4 resumeBtn", "btn", 0, 10, 540, -20, "c", 0, "m", 0, "gameworld/ui_btn_resume.png"],
    ];

    //持有spr,减少gc清理内容
    private sprArr: Array<Laya.Sprite>;
    //事件配表，运行时生成
    private eventConfigArr: Array<Array<any>>;

    //GamePlay.OnInit
    constructor(private gamePlay: GamePlayPage, private rootLayer: Laya.Sprite) {

        this.targetST = new SafeTimer();

        //-
        this.InitUI();
          this.rootLayer.visible = false;
    }

    private InitUI() {

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

        this.coinTf = this.sprArr[2] as Laya.Text;

        //暂停
     //   this.pauseBtn = this.sprArr[3];
        //点击屏幕继续
        this.resumeBtn = this.sprArr[4];
        this.resumeBtn.visible=false;
        //---------------高分处理
        // let highCardFg = GameUtils.CreateSprite("res/ui_odc/img_high_card_fg.png", 1);
        // highCardFg.pivotX = 0;
        // highCardFg.pivotY = 0;
        // this.sprArr[0].addChild(highCardFg);

        this.targetSC = new WXSCSprite(Laya.stage.width, 55);
        this.targetSC.y=Laya.stage.height-55;;//Laya.stage.height-120;
        this.sprArr[0].addChild(this.targetSC);

    }

    //gamePlayPage.OnShow()
    public Show() {
        this.rootLayer.visible = true;

        this.coinTf.changeText(GameData.inst.coin.toString());

     //   this.pauseBtn.visible = true;
     //   this.resumeBtn.visible = false;

        WXPlatform.inst.ODC_InitHudData();
        this.targetSC.Start(0.3,4);
        this.targetST.Start(10);//10秒更新一下目标
    }

    public Hide() {
        this.rootLayer.visible = false;
        this.targetSC.Clear();
        this.targetST.Clear();
    }
    

    public Update() {
        //-
        if (this.targetST.IsOK()) {
            this.targetST.Start(30);//10秒检查一下
            WXPlatform.inst.ODC_UpdateHud();//更新目标
        }

        //-
        this.targetSC.Update();

        //-
        if(Laya.timer.currFrame%60==0){
             this.coinTf.changeText(GameData.inst.coin.toString());
        }
    }


    public RefreshCoin() {
        //TODO 此处可能有性能问题
        this.coinTf.changeText(GameData.inst.coin.toString());
    }

    //---点了暂停按钮---
    public ShowPause() {
      //  this.pauseBtn.visible = false;
        this.resumeBtn.visible = true;
    }

    private OnClickPause() {
     //   console.log("OnClickPause");


    //    Main.inst.Pause();

     //   this.ShowPause();
    }

    //--点了继续按钮--
    private OnClickResume() {
     //   console.log("OnClickResume");
          Main.inst.Resume();
     //   this.pauseBtn.visible = true;
          this.resumeBtn.visible = false;
    }

    //-
    private OnClickInvite(){
        console.log("OnClientInvite");
        WXPlatform.inst.Share("游戏内按钮分享","res/share1.jpg","from=100");
    }
}