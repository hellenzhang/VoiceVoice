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
 * 封装微信shareCanves的sprite
 *
 * !!注意这里操作极其昂贵
 *  this.graphics.drawTexture(this.scTexture);
 */
var WXSCSprite = /** @class */ (function (_super) {
    __extends(WXSCSprite, _super);
    //gapSec是间隔时间
    function WXSCSprite(w, h) {
        var _this = _super.call(this) || this;
        _this.gapSec = 1;
        _this.times = 0;
        var wx = Laya.Browser.window.wx;
        if (wx) {
            var sc = Laya.Browser.window.sharedCanvas;
            //w,h极其重要
            sc.width = w;
            sc.height = h;
            _this.scTexture = new Laya.Texture(sc); //textuer在这里固定了尺寸
        }
        _this.safeTimer = new SafeTimer();
        return _this;
    }
    WXSCSprite.prototype.Start = function (delay, times) {
        //this.visible=true;
        this.gapSec = delay;
        this.times = times;
        // this.graphics.clear();
        this.safeTimer.Start(this.gapSec);
    };
    WXSCSprite.prototype.Clear = function () {
        this.safeTimer.Clear();
        this.graphics.clear();
        //this.visible=false;
    };
    WXSCSprite.prototype.Update = function () {
        if (this.scTexture && this.safeTimer.IsOK()) {
            console.log("!!!! WXSCSprite", this.gapSec, this.scTexture.width, this.scTexture.height);
            this.graphics.clear();
            this.graphics.drawTexture(this.scTexture);
            // this.gapSec*=2;
            this.times--;
            if (this.times > 0) {
                this.safeTimer.Start(this.gapSec);
            }
            else {
                this.safeTimer.Clear();
            }
        }
    };
    return WXSCSprite;
}(Laya.Sprite));
//# sourceMappingURL=WXSCSprite.js.map