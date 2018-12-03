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
 * 刷怪管理器
 * 怪管理器，没有池，就20个，每个都会update
 * 调用完构造函数，要调用一下levelup,以便设置正确的子弹
 */
var MobsManager = /** @class */ (function (_super) {
    __extends(MobsManager, _super);
    function MobsManager() {
        var _this = _super.call(this) || this;
        //生怪的间隔
        _this.safeTimer = null;
        _this.safeTimer2 = null;
        _this.scaleSTimer = null;
        _this.timeScale = 1;
        _this.speedScale = 1;
        _this.SCALE_GAP_SEC = 5; //5秒难度递减
        for (var index = 0; index < MAX_MOB_COUNT; index++) {
            var mob = new Mob();
            _this.AddToPool(mob);
        }
        _this.safeTimer = new SafeTimer();
        _this.safeTimer2 = new SafeTimer();
        _this.scaleSTimer = new SafeTimer();
        return _this;
    }
    MobsManager.prototype.Startup = function () {
        this.isActive = true;
        this.safeTimer.Start(GameUtils.Random(2, 5));
        this.safeTimer2.Start(GameUtils.Random(2, 5));
        this.scaleSTimer.Start(this.SCALE_GAP_SEC); //5秒难度递增
    };
    //  只要调用就会刷怪，在PhaseClearMobWaves.ts.OnUpdate()里调用
    MobsManager.prototype.Refresh = function () {
        if (!this.isActive) {
            return;
        }
        //-生怪逻辑
        if (this.safeTimer.IsOK()) {
            this.safeTimer.Start(GameUtils.Random(2, 5) * this.timeScale);
            var mob = this.CreateMob(100, GameUtils.RandomInt(0, 4), GameUtils.Random(400, 800) * this.speedScale);
        }
        if (this.safeTimer2.IsOK()) {
            this.safeTimer2.Start(GameUtils.Random(2, 5) * this.timeScale);
            var mob = this.CreateMob(100, GameUtils.RandomInt(0, 4), GameUtils.Random(400, 800) * this.speedScale);
        }
        if (this.scaleSTimer.IsOK()) {
            this.scaleSTimer.Start(this.SCALE_GAP_SEC);
            this.timeScale -= 0.01;
            if (this.timeScale < 0.4) {
                this.timeScale = 0.4;
            }
            this.speedScale += 0.01;
            if (this.speedScale > 2) {
                this.speedScale = 2;
            }
        }
    };
    //
    MobsManager.prototype.CreateMob = function (planeMetaID, idx, speed) {
        var bb = this.GetFree();
        if (bb) {
            var seg = GameWorld.inst.stageW / 5;
            var x = seg / 2 + idx * seg;
            //
            bb.Startup(planeMetaID, x, speed);
        }
        else {
            // console.log("生成怪失败！！");
        }
        return bb;
    };
    return MobsManager;
}(GameSpritesManager));
//# sourceMappingURL=MobsManager.js.map