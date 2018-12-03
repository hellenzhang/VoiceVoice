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
 * 可以变色的sprite
 */
var ColoredSprite = /** @class */ (function (_super) {
    __extends(ColoredSprite, _super);
    // //testSpr是为了减少gc
    // private filterArr: Array<Laya.Filter> = null;
    // private filter: Laya.ColorFilter = null;
    // private colorMatrix: number[] =
    // [
    //     1, 0, 0, 0, 0,  //R
    //     0, 1, 0, 0, 0, //G
    //     0, 0, 1, 0, 0,  //B
    //     0, 0, 0, 1, 0, //A
    // ];
    function ColoredSprite() {
        return _super.call(this) || this;
    }
    ColoredSprite.prototype.SetRedFactor = function (redFactor, otherFactor) {
        // this.colorMatrix[0] = redFactor;
        // this.colorMatrix[6] = otherFactor;
        // this.colorMatrix[12] = otherFactor;
        // this.filter = new Laya.ColorFilter(this.colorMatrix);
        // this.filterArr = [this.filter];
        // this.filters = this.filterArr;
    };
    return ColoredSprite;
}(Laya.Sprite));
//# sourceMappingURL=ColoredSprite.js.map