/**
 * 金币不足的提示，游戏内提示。40号大字
 */
class GameAlert {
    //-单例
    private static _inst: GameAlert;
    public static get inst() {
        if (GameAlert._inst == null) {
            GameAlert._inst = new GameAlert();
        }
        return GameAlert._inst;
    }

    constructor() {
        this.safeTimer = new SafeTimer();
    }

    private safeTimer: SafeTimer;

    private rootLayer: Laya.Sprite;//容器

    private alertSpr: Laya.Sprite;
    private needCoinTip: Laya.Sprite;

    public Init(alertLayer: Laya.Sprite) {
        this.rootLayer = alertLayer;
    }

    //生成面板
    private CreatePanel() {
        let gap = 40;
        this.alertSpr = new Laya.Sprite();
        let bg = new Image9Grid("ui/ui_common/img_alert_bg.png", Laya.stage.width - gap * 2, 200, 20);
        this.needCoinTip = GameUtils.CreateSprite("ui/ui_common/img_tip_needcoin.png", 1);
        bg.pivotX = bg.width / 2;
        bg.pivotY = bg.height / 2;

        this.alertSpr.addChild(bg);
        this.alertSpr.addChild(this.needCoinTip);

        this.Hide();

        //按钮不可点
        this.alertSpr.on(Laya.Event.CLICK, this, () => { });

        //-
        this.rootLayer.addChild(this.alertSpr);

        //-
        this.alertSpr.x=Laya.stage.width/2;
        this.alertSpr.y=Laya.stage.height/2;
    }

    public Show(durSec: number) {
        if(!this.alertSpr){
            this.CreatePanel();
        }
        this.safeTimer.Start(durSec);
        this.alertSpr.visible = true;
    }

    public Update() {
        if (this.safeTimer.IsOK()) {
            this.Hide();
        }
    }

    public Hide() {
        this.alertSpr.visible = false;
    }
}