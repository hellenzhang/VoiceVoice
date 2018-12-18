/**
 * 游戏封面菜单
 */
class GameMenuPage extends GamePage {

    static ID: string = "GameMenuPage";

    //==================panel布局================
    private uiInfoArr: Array<Array<any>> = [

        ["0 title", "img", 0, 0, 540, 960, "c", 0, "t", 100, "res/img_cover0.png"],
        ["1 start", "btn9", 0, 0, 540, 960, "c", 0, "t", 520, "ui/ui_common/img_btn0_bg.png", 220, 80, 20, "ui/ui_gamemenu/btn_startplay.png"],
        ["2 rank", "btn9", 0, 0, 540, 960, "c", 0, "t", 620, "ui/ui_common/img_btn0_bg.png", 220, 80, 20, "ui/ui_gamemenu/btn_rank.png"],
         ["3 coin", "coin_btn", 0, 0, 540, 960, "c", 0, "t", 720],

        ["4 ver", "tf", 0, 0, 540, 960, 20, 460, 200, 24, "bf_24", "left"],

    ];

    //持有spr,减少gc清理内容
    private sprArr: Array<Laya.Sprite>;
    //事件配表，运行时生成
    private eventConfigArr: Array<Array<any>>;

    private verTf: Laya.Text;

    private rankBtn: Laya.Sprite;
    private heroBtn: Laya.Sprite;
    private coinBtn:CoinButton;

    constructor() {
        super(GameMenuPage.ID);
    }

    public OnInit() {
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


        this.verTf = (this.sprArr[4] as Laya.Text);
        this.verTf.changeText(GAME_VER);

        //laya版本号
        let layaTf = UIUtils.CreateSimpleTextField("bf_24", 0, 0, 300, 30, this.rootUI);

        layaTf.align = "right";
        layaTf.changeText("Powered by LayaAir Engine    ");
        layaTf.x = Laya.stage.width - layaTf.textWidth - 20;
        layaTf.y = Laya.stage.height - layaTf.textHeight - 20;



        //-
        this.heroBtn = this.sprArr[1];
        this.rankBtn = this.sprArr[2];
        this.coinBtn=this.sprArr[3] as CoinButton;

        // console.log("wh",layaTf.textWidth,layaTf.textHeight);

        //-视频广告初始化
        WXPlatform.inst.InitVideoAD();
    }

    public OnShow(data: any) {

        WXPlatform.inst.ShowGameClubButton();

        //金币按钮字
        this.coinBtn.SetLabel(GameData.inst.totalCoinSD.value.toString());
    }

    //  public OnUpdate() {

    //  }

    public OnHide() {
        WXPlatform.inst.HideGameClubButton();
    }

    //-----------事件处理----------
    private OnClickStartBtn() {
        //console.log("oncllickstartbtn");
        GamePagesManager.inst.SwitchPage(GamePlayPage.ID, null);
    }

    private OnClickRankBtn() {
        //console.log("oncllickrankbtn");
        GamePagesManager.inst.SwitchPage(GameRankPage.ID, true);
    }

     private OnClickCoinBtn() {
       
         WXPlatform.inst.Share("花钱发分享","res/share1.jpg","from=coin");
    }
    public  ShwoTest(p_string:string)
    {
        this.verTf.changeText(p_string);
    }

    testVideo: Laya.Sprite;
    public DrawAudio(data:any)
    {
        if (this.testVideo==null) {
            this.testVideo=new Laya.Sprite();   
            Laya.stage.addChild(this.testVideo);        
        }
      //   this.testVideo.graphics.drawLine(10, 58, 146, 58, "#ff0000", 3);
       this.testVideo.graphics.clear();
        for (var index = 0; index < data.length; index++) {

            var element = data[index];            
            this.testVideo.graphics.drawLine(index,600,index,600-element,"#ff0000",1);
            
        }
    }

}