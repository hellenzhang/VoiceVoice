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
 * 加载资源和配表的界面
 */
var GameLoadingPage = /** @class */ (function (_super) {
    __extends(GameLoadingPage, _super);
    function GameLoadingPage() {
        var _this = _super.call(this, GameLoadingPage.ID) || this;
        //必须两个都ok,才能跳转
        _this.isLoadOK = false;
        _this.isLoginOK = false;
        //-
        //--bf加载
        _this.fontIdx = 0;
        //------img,meta
        _this.startTime = 0;
        return _this;
    }
    GameLoadingPage.prototype.OnShow = function (data) {
        this.isLoadOK = false;
        this.isLoginOK = false;
        //
        this.Login();
        //
        this.StartLoadFonts();
    };
    GameLoadingPage.prototype.OnHide = function () {
        // Laya.stage.bgColor="#222222";
        //-
        // if (this.loadingTf) {
        //     this.loadingTf.destroy();
        //     this.loadingTf = null;
        // }
    };
    //登陆和加载都完毕，则可以跳转
    GameLoadingPage.prototype.CheckComplete = function () {
        if (this.isLoadOK && this.isLoginOK) {
            console.log("GameLoding.ChekcComplete");
            //--切换界面
            GamePagesManager.inst.SwitchPage(GameMenuPage.ID, null);
        }
    };
    GameLoadingPage.prototype.Login = function () {
        //
        WXPlatform.inst.Login(Laya.Handler.create(this, this.OnLoginOK));
    };
    GameLoadingPage.prototype.OnLoginOK = function (isOK) {
        console.log("GameLoadingPage.onLoginOK", isOK);
        //-登陆成功后，预取排行榜等数据
        WXPlatform.inst.ODC_SetUserInfo();
        this.isLoginOK = true;
        this.CheckComplete();
    };
    GameLoadingPage.prototype.StartLoadFonts = function () {
        console.log("StartLoadFonts");
        this.startTime = Laya.Browser.now();
        this.fontIdx = 0;
        this.LoadFont();
    };
    GameLoadingPage.prototype.OnFontsAllLoadOK = function () {
        console.log("OnFontsAllLoadOK");
        console.log("字体加载完毕", Laya.Browser.now() - this.startTime);
        this.StartLoadImages();
    };
    GameLoadingPage.prototype.LoadFont = function () {
        var info = FONT_INFO_ARR[this.fontIdx];
        var bmFont = new Laya.BitmapFont();
        bmFont.loadFont(info.url, Laya.Handler.create(this, this.OnFontLoaded, [bmFont, info.name]));
    };
    GameLoadingPage.prototype.OnFontLoaded = function (bmFont, bfName) {
        console.log("一个字体加载完毕", bfName);
        bmFont.letterSpacing = 2;
        Laya.Text.registerBitmapFont(bfName, bmFont);
        //-
        this.fontIdx++;
        if (this.fontIdx == FONT_INFO_ARR.length) {
            this.OnFontsAllLoadOK();
        }
        else {
            this.LoadFont();
        }
    };
    GameLoadingPage.prototype.StartLoadImages = function () {
        this.startTime = Laya.Browser.now();
        var urls = Laya.loader.load(RES_URL_ARR, Laya.Handler.create(this, this.OnLoadImagesOK), null);
    };
    //--
    GameLoadingPage.prototype.OnLoadImagesOK = function () {
        console.log("图片加载完毕", Laya.Browser.now() - this.startTime);
        this.StartLoadMetas();
    };
    //--
    GameLoadingPage.prototype.StartLoadMetas = function () {
        this.startTime = Laya.Browser.now();
        AvatarMeta.Parse(Laya.loader.getRes("res/meta/plane_meta.json"));
        //-
        this.OnMetasLoadOK();
    };
    GameLoadingPage.prototype.OnMetasLoadOK = function () {
        console.log("配表加载完毕", Laya.Browser.now() - this.startTime);
        this.startTime = Laya.Browser.now();
        this.isLoadOK = true;
        this.CheckComplete();
        //-----------这个放在之后是有讲究的，尽快进入游戏
        //
        this.PreloadAnim();
    };
    GameLoadingPage.prototype.PreloadAnim = function () {
        console.log("PreloadAnim");
        this.startTime = Laya.Browser.now();
        this.animArr = new Array();
        ANIM_URL_ARR.forEach(function (ee) {
            var aa = new Laya.Animation();
            aa.loadAnimation(ee);
        });
        console.log("动画解析", Laya.Browser.now() - this.startTime);
        console.log(Laya.stage.width, Laya.stage.height);
    };
    //----------
    GameLoadingPage.prototype.OnLoadProgress = function (p) {
        console.log("进度", p);
    };
    GameLoadingPage.ID = "gameLoadingPage";
    return GameLoadingPage;
}(GamePage));
//# sourceMappingURL=GameLoadingPage.js.map