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
 * 忍者龙剑坛无敌火
 * 火朝向下方
 */
var GhostFireSprite = /** @class */ (function (_super) {
    __extends(GhostFireSprite, _super);
    function GhostFireSprite(url, scale, count, radius) {
        var _this = _super.call(this) || this;
        _this.fireArr = new Array(count);
        for (var i = 0; i < count; i++) {
            var cc = GameUtils.CreateSprite(url, scale);
            _this.addChild(cc);
            _this.fireArr[i] = cc;
        }
        //设置好半径，会去重置
        _this.radius = radius;
        return _this;
    }
    Object.defineProperty(GhostFireSprite.prototype, "radius", {
        get: function () {
            return this._radius;
        },
        set: function (v) {
            this._radius = v;
            this.Refresh();
        },
        enumerable: true,
        configurable: true
    });
    GhostFireSprite.prototype.Refresh = function () {
        //更新半径
        var count = this.fireArr.length;
        var seg = 360 / count;
        for (var i = 0; i < count; i++) {
            var cc = this.fireArr[i];
            var angle = i * seg;
            GameUtils.PolarToCart_PointTemp(this._radius, angle);
            cc.x = Laya.Point.TEMP.x;
            cc.y = Laya.Point.TEMP.y;
            cc.rotation = angle;
        }
    };
    return GhostFireSprite;
}(Laya.Sprite));
//# sourceMappingURL=GhostFireSprite.js.map