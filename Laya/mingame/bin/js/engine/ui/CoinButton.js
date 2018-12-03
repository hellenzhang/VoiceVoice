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
 * 金币图标按钮,方便快捷使用，规定背景图片和TF
 */
var CoinButton = /** @class */ (function (_super) {
    __extends(CoinButton, _super);
    function CoinButton() {
        var _this = _super.call(this) || this;
        var gap = CoinButton.GAP; //图标距左边界的位置
        var bgUrl = CoinButton.BG_URL;
        var iconUrl = CoinButton.COIN_ICON_URL;
        var WW = CoinButton.WIDTH;
        var HH = CoinButton.HEIGHT;
        var bgImg = new Image9Grid(bgUrl, WW, HH, 20);
        bgImg.width = WW;
        bgImg.height = HH;
        bgImg.pivotX = WW / 2;
        bgImg.pivotY = HH / 2;
        //-前景图片可能有，也可能没有，有前景图片的是面板字用
        var iconImg = GameUtils.CreateSprite(iconUrl, 1);
        iconImg.x = WW / 2;
        iconImg.y = HH / 2;
        iconImg.x = WW - iconImg.width / 2 - gap;
        bgImg.addChild(iconImg);
        _this.tf = UIUtils.CreateSimpleTextField(CoinButton.FONT, gap, 0, WW - gap * 2 - gap - iconImg.width, HH, bgImg);
        _this.tf.align = "center";
        _this.tf.valign = "middle";
        _this.tf.changeText("000");
        bgImg.addChild(_this.tf);
        //-
        iconImg.mouseEnabled = true;
        bgImg.mouseEnabled = true;
        _this.tf.mouseEnabled = true;
        _this.addChild(bgImg);
        _this.width = CoinButton.WIDTH;
        _this.height = CoinButton.HEIGHT;
        return _this;
    }
    CoinButton.prototype.SetLabel = function (t) {
        this.tf.changeText(t);
    };
    CoinButton.GAP = 20;
    CoinButton.FONT = "bf_36";
    CoinButton.WIDTH = 220;
    CoinButton.HEIGHT = 80;
    CoinButton.BG_URL = "ui/ui_common/img_btn0_bg.png";
    CoinButton.COIN_ICON_URL = "ui/ui_common/img_coin.png";
    return CoinButton;
}(Laya.Sprite));
//# sourceMappingURL=CoinButton.js.map