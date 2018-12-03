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
 * 内部持有多个body,每次startup的时候，决定哪个显示
 * TODO 切换场景时的释放bodyAnimDict机制还没做
 */
var Mob = /** @class */ (function (_super) {
    __extends(Mob, _super);
    function Mob() {
        var _this = _super.call(this) || this;
        GameWorld.inst.mobsLayer.addChild(_this.spr);
        //
        _this.InitHPBar("gameworld/mob_hpbar_bg.png", "gameworld/mob_hpbar_bar.png", 4, 1, 50 + 12);
        _this.isActive = false;
        return _this;
    }
    //
    Mob.prototype.Startup = function (metaID, x, speed) {
        //-
        this.ChangeAvatar(metaID);
        //-
        this.x = x;
        this.y = -200; //错落有致的飞来
        this.speedY = speed;
        //-
        this.HP = this.MAX_HP = this.meta.json.hp;
        //-
        this.isActive = true; //刷新visible
    };
    Mob.prototype.Update = function () {
        _super.prototype.Move.call(this);
        if (Laya.timer.currFrame % 8 == 0) {
            GameWorld.inst.dustsMgr.EmitBirdDust(this.x, this.y);
        }
        if (this.IsOutOfBottomBoundary()) {
            //注意这里要hero数据
            if (!GameData.inst.isHeroDie) {
                GameData.inst.coin++;
            }
            this.isActive = false; //释放
        }
    };
    return Mob;
}(Actor));
//# sourceMappingURL=Mob.js.map