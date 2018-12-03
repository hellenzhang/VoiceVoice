/**
 * 加载资源和配表的界面
 */
class GameLoadingPage extends GamePage {

    static ID: string = "gameLoadingPage";

    //必须两个都ok,才能跳转
    private isLoadOK = false;
    private isLoginOK = false;

    constructor() {
        super(GameLoadingPage.ID);
    }

    public OnShow(data: any) {

        this.isLoadOK = false;
        this.isLoginOK = false;
        //
        this.Login();

        //
        this.StartLoadFonts();

    }

    public OnHide() {
        // Laya.stage.bgColor="#222222";
        //-
        // if (this.loadingTf) {
        //     this.loadingTf.destroy();
        //     this.loadingTf = null;
        // }
    }

    //登陆和加载都完毕，则可以跳转
    private CheckComplete() {
        if (this.isLoadOK && this.isLoginOK) {
            console.log("GameLoding.ChekcComplete");
            //--切换界面
            GamePagesManager.inst.SwitchPage(GameMenuPage.ID, null);
        }
    }

    private Login() {
        //
        WXPlatform.inst.Login(Laya.Handler.create(this, this.OnLoginOK));
    }

    private OnLoginOK(isOK: boolean) {
        console.log("GameLoadingPage.onLoginOK", isOK);

        //-登陆成功后，预取排行榜等数据
        WXPlatform.inst.ODC_SetUserInfo();

        this.isLoginOK = true;

        this.CheckComplete();
    }

    //-
     //--bf加载
    private fontIdx: number = 0;


    private StartLoadFonts() {
        console.log("StartLoadFonts");
         this.startTime = Laya.Browser.now();
        this.fontIdx = 0;
        this.LoadFont();
    }

    private OnFontsAllLoadOK() {
        console.log("OnFontsAllLoadOK");
        console.log("字体加载完毕", Laya.Browser.now() - this.startTime);

        this.StartLoadImages();
    }

    private LoadFont() {
        let info = FONT_INFO_ARR[this.fontIdx];
        var bmFont: Laya.BitmapFont = new Laya.BitmapFont();
        bmFont.loadFont(info.url, Laya.Handler.create(this, this.OnFontLoaded, [bmFont, info.name]));
    }

    private OnFontLoaded(bmFont: Laya.BitmapFont, bfName: string) {
        console.log("一个字体加载完毕", bfName);
        bmFont.letterSpacing = 2;
        Laya.Text.registerBitmapFont(bfName, bmFont);

        //-
        this.fontIdx++;
        if (this.fontIdx == FONT_INFO_ARR.length) {
            this.OnFontsAllLoadOK();
        } else {
            this.LoadFont();
        }
    }
    //------img,meta
    private startTime: number = 0;
    private StartLoadImages() {
        this.startTime = Laya.Browser.now();
        let urls =
            Laya.loader.load(RES_URL_ARR, Laya.Handler.create(this, this.OnLoadImagesOK), null);
    }
    //--
    private OnLoadImagesOK() {
        console.log("图片加载完毕", Laya.Browser.now() - this.startTime);
       
        this.StartLoadMetas();
    }


    //--
    private StartLoadMetas() {

         this.startTime = Laya.Browser.now();
         
         AvatarMeta.Parse(Laya.loader.getRes("res/meta/plane_meta.json"));

        //-
        this.OnMetasLoadOK();
    }

    private OnMetasLoadOK() {

        console.log("配表加载完毕", Laya.Browser.now() - this.startTime);
       this.startTime = Laya.Browser.now();

        this.isLoadOK = true;
        this.CheckComplete();

        //-----------这个放在之后是有讲究的，尽快进入游戏
        //
        this.PreloadAnim();

    }

    //---------动画预加载，防止卡顿，提前缓存
    private animArr: Array<Laya.Animation>;

    private PreloadAnim() {
        console.log("PreloadAnim");

        this.startTime = Laya.Browser.now();

        this.animArr = new Array<Laya.Animation>();
        ANIM_URL_ARR.forEach(ee => {
            let aa = new Laya.Animation();
            aa.loadAnimation(ee);
        });
        console.log("动画解析", Laya.Browser.now() - this.startTime);
        console.log(Laya.stage.width,Laya.stage.height);
    }

    //----------
    private OnLoadProgress(p: number) {
        console.log("进度", p);
    }
}