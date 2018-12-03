/**
 * 金币不足的提示，游戏内提示。40号大字
 */
var GameAlert = /** @class */ (function () {
    function GameAlert() {
        this.safeTimer = new SafeTimer();
    }
    Object.defineProperty(GameAlert, "inst", {
        get: function () {
            if (GameAlert._inst == null) {
                GameAlert._inst = new GameAlert();
            }
            return GameAlert._inst;
        },
        enumerable: true,
        configurable: true
    });
    GameAlert.prototype.Init = function (alertLayer) {
        this.rootLayer = alertLayer;
    };
    //生成面板
    GameAlert.prototype.CreatePanel = function () {
        var gap = 40;
        this.alertSpr = new Laya.Sprite();
        var bg = new Image9Grid("ui/ui_common/img_alert_bg.png", Laya.stage.width - gap * 2, 200, 20);
        this.needCoinTip = GameUtils.CreateSprite("ui/ui_common/img_tip_needcoin.png", 1);
        bg.pivotX = bg.width / 2;
        bg.pivotY = bg.height / 2;
        this.alertSpr.addChild(bg);
        this.alertSpr.addChild(this.needCoinTip);
        this.Hide();
        //按钮不可点
        this.alertSpr.on(Laya.Event.CLICK, this, function () { });
        //-
        this.rootLayer.addChild(this.alertSpr);
        //-
        this.alertSpr.x = Laya.stage.width / 2;
        this.alertSpr.y = Laya.stage.height / 2;
    };
    GameAlert.prototype.Show = function (durSec) {
        if (!this.alertSpr) {
            this.CreatePanel();
        }
        this.safeTimer.Start(durSec);
        this.alertSpr.visible = true;
    };
    GameAlert.prototype.Update = function () {
        if (this.safeTimer.IsOK()) {
            this.Hide();
        }
    };
    GameAlert.prototype.Hide = function () {
        this.alertSpr.visible = false;
    };
    return GameAlert;
}());
//# sourceMappingURL=GameAlert.js.map