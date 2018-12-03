/**
 * gamePlay的hud界面
 * 第一次10秒，以后30秒
 */
class BackOrContinuePanel {

    //- 0和5的偏移为了适配腾讯自己的bug
    private uiInfoArr: Array<Array<any>> = [
        //-- * * 如果type是btn9或者img9,w,h是图片的大小
        // 注意最后的fgUrl是可选的，有则居中对齐这个img
        // 注意img和btn目前区别是是否mouseEnable,rightOffsetX可选，如果没有则默认居中，有则正常处理
        // [name,type,box_rect,layout_x,layout_y,x,y,bgImg9Url,W,H,9gridSize,fgUrl,rightOffestX]
        ["0 start", "btn9", 0, 0, 540, 960, "c", 0, "t", 520, "ui/ui_common/img_btn0_bg.png", 220, 80, 20],
        ["1 rank", "btn9", 0, 0, 540, 960, "c", 0, "t", 620, "ui/ui_common/img_btn0_bg.png", 220, 80, 20],
        // [name,type,box_rect,x,y,w,h,font,align]
        ["2 coin tf", "tf", 0, 0, 540, 120, 210, 540, 110, 40, "bf_36", "center"],
        ["3 coin tf", "tf", 0, 0, 540, 120, 210, 640, 110, 40, "bf_36", "center"],
    ];

    //持有spr,减少gc清理内容
    private sprArr: Array<Laya.Sprite>;
    private m_continuetxt: Laya.Text;//点击屏幕继续游戏
    private m_returntxt: Laya.Text;
    //事件配表，运行时生成
    private eventConfigArr: Array<Array<any>>;

    //GamePlay.OnInit
    constructor(private gamePlay: GamePlayPage, private rootLayer: Laya.Sprite) {


        //-
        this.InitUI();
        this.rootLayer.visible = false;
    }

    private InitUI() {

        //事件处理函数
        this.eventConfigArr = [
            [0, this, this.OnClickContinue],
            [1, this, this.OnClickBack],
        ];

        //生成ui
        this.sprArr = UIMaker.MakeUI(this.uiInfoArr, this.rootLayer);
        //处理字体
    
        //事件处理
        UIMaker.AddEventListeners(this.eventConfigArr, this.sprArr);
        this.m_continuetxt = this.sprArr[2] as Laya.Text;
        this.m_continuetxt.changeText("Continue");
        this.m_returntxt = this.sprArr[3] as Laya.Text;
        this.m_returntxt.changeText("Back");
    }
    public OnClickContinue() {
        //继续
        GameWorld.inst.Reset();
        this.Hide();
    }
    public OnClickBack() {
        GameWorld.inst.GameExit();
        this.Hide();
    }
    public Show() {
        this.rootLayer.visible = true;

    }

    public Hide() {
        this.rootLayer.visible = false;
    }


    public Update() {
      //
    }
}