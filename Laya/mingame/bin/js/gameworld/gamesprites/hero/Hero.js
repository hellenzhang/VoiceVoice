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
 *
 */
var Hero = /** @class */ (function (_super) {
    __extends(Hero, _super);
    function Hero() {
        var _this = _super.call(this) || this;
        _this.m_gravity = 2;
        //滞空时间越长，增长越快
        _this.m_addGravity = 0;
        _this.m_hight = 175;
        _this.m_width = 100;
        _this.m_gravityAddSpeed = 0.1;
        //外部可以获取这个状态
        _this.m_isJumping = false;
        //外部输入控制的y的能量值
        _this.m_inputJumpPower = 0;
        //-
        _this.isTouchDown = false;
        _this.touchStartMouseX = 0;
        _this.touchStartHeroX = 0;
        GameWorld.inst.heroLayer.addChild(_this.spr);
        //this.DrawDebugHitRect();
        _this.x = GameWorld.inst.stageW / 2;
        _this.y = GameWorld.inst.stageH * 0.8;
        _this.isActive = true;
        //-鼠标输入
        Laya.stage.on(Laya.Event.MOUSE_DOWN, _this, _this.OnMouseDown);
        Laya.stage.on(Laya.Event.MOUSE_UP, _this, _this.OnMouseUp);
        return _this;
    }
    //gamePlay.StartGamePlay()和gamePlay.ReviveHero()
    //needResetBulletLevel 复活的时候，不能重置level,要对玩家划算
    Hero.prototype.Startup = function (needResetBulletLevel) {
        //-数值
        //-内部变量
        this.isTouchDown = false;
        //-外显
        this.ChangeAvatar(0);
        //-位置
        this.x = GameWorld.inst.stageW / 2;
        this.spr.x = this.x; //复活的时候，位置在正确位置，因为复活有个暂停
        this.y = GameWorld.inst.m_mapManager.GetGroundHeight(this.x);
        // this.x=0;
        // this.y=0;
        // this.spr.y=
        // Laya.DebugPanel.init();
        //-！！
        this.isActive = true;
    };
    Hero.prototype.Reset = function () {
        this.x = GameWorld.inst.stageW / 2;
        this.spr.x = this.x; //复活的时候，位置在正确位置，因为复活有个暂停
        this.y = GameWorld.inst.m_mapManager.GetGroundHeight(this.x);
        this.isActive = true;
    };
    //被gamePlay.KillHero()调用
    Hero.prototype.Die = function () {
        GameData.inst.isHeroDie = true;
        this.isActive = false;
    };
    Hero.prototype.Update = function () {
        //判断是否处于高空
        var t_currenty = GameWorld.inst.m_mapManager.GetGroundHeight(this.x);
        //需要下落啊
        if (this.y < t_currenty) {
            if (this.m_inputJumpPower == 0) {
                this.m_addGravity += this.m_gravityAddSpeed;
                if (this.m_addGravity >= 2 * this.m_gravity) {
                    this.m_addGravity = 2 * this.m_gravity;
                }
            }
            else {
                //如果等于0就重力缓冲就去掉
                this.m_addGravity = 0;
            }
            this.y += this.m_gravity + this.m_addGravity;
            //  console.log("  m_addGravity:"+this.m_addGravity+"   "+this.y);
            //不能比地面还低啊
            if (this.y >= t_currenty) {
                this.y = t_currenty;
                this.m_isJumping = false;
            }
            //获取屋顶的高度
            var t_roofHeight = GameWorld.inst.m_mapManager.GetRoofHeight(this.x);
            // if (t_roofHeight=-1) {
            //     t_roofHeight=this.m_hight;
            // }
            //不能把屋顶穿破了啊--允许一帧的误差,
            if ((this.y - this.m_hight <= t_roofHeight) && (this.y + this.m_inputJumpPower + this.m_gravity - this.m_hight >= t_roofHeight)) {
                this.y = t_roofHeight + this.m_hight;
            }
        }
        else {
            this.m_addGravity = 0;
        }
    };
    /**
     * 外部输入移动控制
     */
    Hero.prototype.OnInputMove = function (p_x, p_y) {
        this.x += p_x;
        //如果小于做大跳跃次数是允许继续加油的
        this.m_inputJumpPower = p_y;
        if (p_y > 0) {
            this.y -= (p_y + this.m_gravity);
            this.m_isJumping = true;
        }
    };
    //private touchStartH
    Hero.prototype.OnMouseDown = function () {
        var wx = Laya.Browser.window.wx;
        if (!wx) {
            GameWorld.inst.m_gameInput.GetAudioResult(4000);
        }
    };
    Hero.prototype.OnMouseUp = function () {
        var wx = Laya.Browser.window.wx;
        if (!wx) {
            GameWorld.inst.m_gameInput.GetAudioResult(400);
        }
        console.log("OnMouseUp");
    };
    return Hero;
}(Actor));
//# sourceMappingURL=Hero.js.map