/**
 * 爆炸特效
 *
 * 怪，hero，boss都用这个，
 * 有新类型需要new 新的实例
 *
 * Update
 * Clear
 */
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
var SmokeSparksManager = /** @class */ (function (_super) {
    __extends(SmokeSparksManager, _super);
    //要加载的资源的地址，maxSparkCount是最大数量,resScale是资源地址
    function SmokeSparksManager(sparkUrl, maxSparkCount, rootLayer, resScale) {
        if (resScale === void 0) { resScale = 0; }
        var _this = _super.call(this) || this;
        _this.sparkUrl = sparkUrl;
        _this.maxSparkCount = maxSparkCount;
        _this.rootLayer = rootLayer;
        _this.resScale = resScale;
        _this.Initialize();
        return _this;
    }
    //被构造函数调用
    SmokeSparksManager.prototype.Initialize = function () {
        for (var i = 0; i < this.maxSparkCount; i++) { //MAX_SMOKE_COUNT
            var spr = GameUtils.CreateSprite(this.sparkUrl, this.resScale);
            var sp = new Spark(spr);
            this.rootLayer.addChild(sp.spr);
            sp.SetActive(false);
            this.sparkArr.push(sp);
        }
    };
    SmokeSparksManager.prototype.ShowSmokeBlast = function (count, x, y, durSec, speedAppendY) {
        for (var i = 0; i < count; i++) {
            var sp = this.GetFree();
            if (sp) {
                sp.initX = x;
                sp.initY = y;
                sp.polarSpeed = GameUtils.Random(60, 120);
                sp.scale = GameUtils.Random(0.8, 1.2);
                sp.scaleSpeed = -1.5;
                sp.scaleAcc = -1.5;
                sp.polarAngel = GameUtils.Random(0, 359);
                sp.rotation = GameUtils.Random(0, 359);
                sp.speedAppendY = speedAppendY;
                sp.Start(durSec);
            }
        }
    };
    SmokeSparksManager.prototype.ShowMobSmokeBlast = function (x, y) {
        var MOB_SPEED_Y = 384; // 纯粹烟雾用的
        this.ShowSmokeBlast(GameUtils.Random(5, 7), x + GameUtils.Random(-32, 32), y + GameUtils.Random(-32, 32), 0.4, MOB_SPEED_Y / 2);
    };
    SmokeSparksManager.prototype.ShowHeroSmokeBlast = function () {
        var x = GameWorld.inst.hero.x;
        var y = GameWorld.inst.hero.y;
        for (var i = 0; i < 18; i++) {
            var sp = this.GetFree();
            if (sp) {
                sp.initX = x + GameUtils.Random(-25, 25);
                sp.initY = y + GameUtils.Random(-40, 40);
                sp.polarSpeed = GameUtils.Random(80, 130);
                sp.scale = GameUtils.Random(0.6, 1.2);
                sp.scaleSpeed = -1.5;
                sp.scaleAcc = -1.5;
                sp.polarAngel = GameUtils.Random(0, 359);
                sp.rotation = GameUtils.Random(0, 359);
                sp.speedAppendY = 0;
                ;
                sp.Start(0.6);
            }
        }
    };
    //-FC忍者蛙式的爆炸-
    SmokeSparksManager.prototype.ShowFrogBlast = function (x, y, count, speed, acc, durSec, delaySec, scale) {
        for (var i = 0; i < count; i++) {
            var sp = this.GetFree();
            if (sp) {
                sp.initX = x;
                sp.initY = y;
                sp.polarSpeed = speed;
                sp.polarAcc = acc;
                sp.scale = scale * this.resScale;
                sp.polarAngel = i * 360 / count;
                sp.Start(durSec, delaySec);
            }
        }
    };
    //--FC忍者蛙式的爆炸,怪--
    SmokeSparksManager.prototype.ShowMobFrogBlast = function (x, y, durSec) {
        this.ShowFrogBlast(x, y, 8, 800, -800, 0.4, 0, 1);
    };
    //--FC忍者蛙式的爆炸，Hero--
    SmokeSparksManager.prototype.ShowHeroFrogBlast = function () {
        var x = GameWorld.inst.hero.x;
        var y = GameWorld.inst.hero.y;
        this.ShowFrogBlast(x, y, 16, 400, -100, 2.5, 0, 1.5);
        this.ShowFrogBlast(x, y, 16, 350, -100, 2.5, 0, 1.5);
    };
    //---------导弹的火焰拖尾------------
    SmokeSparksManager.prototype.EmitBirdDust = function (x, y) {
        var sp = this.GetFree();
        if (sp) {
            sp.initX = x + GameUtils.Random(-24, 24);
            sp.initY = y - 100;
            sp.polarSpeed = 0;
            sp.scale = GameUtils.Random(0.7, 1.4);
            sp.scaleSpeed = -1;
            sp.scaleAcc = -0.8;
            sp.alpha = 1;
            sp.alphaSpeed = -1;
            sp.polarAngel = 0;
            sp.rotation = GameUtils.Random(0, 359);
            sp.speedAppendY = GameUtils.Random(-100, -150); // speedAppendY;
            sp.Start(0.6);
        }
    };
    return SmokeSparksManager;
}(SparksManager));
//# sourceMappingURL=SmokeSparksManager.js.map