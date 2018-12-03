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
 * 9宫格的按钮，量不大，不用使用复杂优化
 * AutoBitmap来自laya.ui.js
 */
var Image9Grid = /** @class */ (function (_super) {
    __extends(Image9Grid, _super);
    //a是九宫格上下左右四个边距的距离
    function Image9Grid(url, W, H, a) {
        var _this = _super.call(this) || this;
        _this.url = url;
        _this.graphics = _this._bitmap = new Laya.AutoBitmap();
        _this._bitmap.source = Laya.loader.getRes(url);
        _this._bitmap.width = W;
        _this._bitmap.height = H;
        _this._bitmap.sizeGrid = [a, a, a, a, 0];
        //鼠标点击用
        _this.width = W;
        _this.height = H;
        return _this;
    }
    return Image9Grid;
}(Laya.Sprite));
//# sourceMappingURL=Image9Grid.js.map