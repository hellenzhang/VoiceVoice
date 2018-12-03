/**
 *
 * ！！注意这个构造函数，创建的时候就加到gameWorld里去了
 *
 * 精灵，内持有Laya.Sprite的引用
 *
 * 没有对象池，一次性创建所有不再销毁，然后foreach update,只有激活的会被update
 *
 * 坐标系，top left 00,rotation顺时针
 * ---------> (x)
 * |
 * |
 * |
 * v (y)
 *
 * ！！注意，给number赋上默认值，是极其必要的，否则默认是NaN，导致各种古怪问题
 *
 * 内置状态机
 *
 * --特别注意--
 * ！！OnStateEvent这个不建议用，增加复杂度，有事就直接state里处理，涉及到公共的函数，放GameSprite里
 */
var GameSprite = /** @class */ (function () {
    //
    function GameSprite() {
        //-move
        this.x = 0;
        this.y = 0;
        this.speedX = 0;
        this.speedY = 0;
        //-注意这个关联了visilbe ,new Sprite的时候注意
        this._isActive = true; //是否激活，激活的才会update
        //public确实需要
        //矩形碰撞，因为这样可以描述长方形（比如人体），圆形描述的不够精准
        this.hitRectWidth = 64;
        this.hitRectHeight = 64;
        this.hitRectCenterX = 0;
        this.hitRectCenterY = 0;
        this.enableHitTest = true;
        this.HP = 0;
        this.MAX_HP = 0;
        //============================状态机==============================
        //-状态机，只有Boss用，
        this.stateArr = null;
        this.currState = null;
    }
    //-UPDATE,逻辑更新
    GameSprite.prototype.Update = function () { };
    //内部调用把GameSprite的值赋值给sprite,这个不用继承，由GameWorld调用
    GameSprite.prototype.Render = function () {
        if (this.isActive == false) {
            return;
        }
        if (this.spr == null) {
            return;
        }
        this.spr.x = this.x;
        this.spr.y = this.y;
    };
    Object.defineProperty(GameSprite.prototype, "isActive", {
        get: function () {
            return this._isActive;
        },
        set: function (b) {
            if (this._isActive != b) {
                if (b) {
                    this.OnActive();
                }
                else {
                    this.OnDeactive();
                }
            }
            this._isActive = b;
            if (this.spr) {
                this.spr.visible = b;
            }
        },
        enumerable: true,
        configurable: true
    });
    GameSprite.prototype.OnActive = function () {
    };
    //注意一般构造函数里会调用一次，因为构造函数里有this.isActive=false
    GameSprite.prototype.OnDeactive = function () {
    };
    //===========================移动系函数=============================
    //-移动，怪，子弹都用这个，Hero和Boss不用
    GameSprite.prototype.Move = function () {
        var deltaSec = GameWorld.inst.deltaTimeSec;
        //move bullet
        this.y += this.speedY * deltaSec;
        this.x += this.speedX * deltaSec;
    };
    GameSprite.prototype.IsOutOfBottomBoundary = function () {
        if (this.y - this.hitRectHeight > GameWorld.inst.stageH) {
            return true;
        }
        return false;
    };
    GameSprite.prototype.IsOutOfTopBoundary = function () {
        if (this.y + this.hitRectHeight < 0) {
            return true;
        }
        return false;
    };
    //瞄准目标，设置飞向目标的速度
    GameSprite.prototype.SetSpeedForMoveToTarget = function (speed, targetX, targetY) {
        var angle = GameUtils.GetAngle(this.x, this.y, targetX, targetY);
        GameUtils.PolarToCart_PointTemp(speed, angle);
        var rad = Laya.Utils.toRadian(angle);
        //console.log("PolarToCart", angle, rad);
        this.speedX = Laya.Point.TEMP.x;
        this.speedY = Laya.Point.TEMP.y;
    };
    //如果撞墙则反弹
    GameSprite.prototype.BoundBounceSpeedX = function () {
        var W2 = this.hitRectWidth / 2;
        if (this.x < W2) {
            this.speedX = Math.abs(this.speedX);
        }
        if (this.x > GameWorld.inst.stageW - W2) {
            this.speedX = -Math.abs(this.speedX);
        }
    };
    //如果撞墙则速度为0，掉落物这么弄
    GameSprite.prototype.BoundZeroSpeedX = function () {
        var W2 = this.hitRectWidth / 2;
        if (this.x < W2) {
            this.x = W2;
            this.speedX = 0;
        }
        if (this.x > GameWorld.inst.stageW - W2) {
            this.x = GameWorld.inst.stageW - W2;
            this.speedX = 0;
        }
    };
    //===========================碰撞检测系函数=============================
    GameSprite.prototype.HitTest = function (target) {
        if (!this.enableHitTest || !target.enableHitTest) {
            return false;
        }
        if (!this.isActive || !target.isActive) {
            return false;
        }
        var wOK = Math.abs((this.x + this.hitRectCenterX) - (target.x + target.hitRectCenterX)) <= (this.hitRectWidth + target.hitRectWidth) / 2;
        var hOK = Math.abs((this.y + this.hitRectCenterY) - (target.y + target.hitRectCenterY)) <= (this.hitRectHeight + target.hitRectHeight) / 2;
        return wOK && hOK;
    };
    GameSprite.prototype.AddState = function (s) {
        if (this.stateArr == null) {
            this.stateArr = new Array();
        }
        if (this.GetState(s.id) == null) {
            this.stateArr.push(s);
        }
        else {
            //console.error("已有此状态");
        }
    };
    GameSprite.prototype.UpdateState = function () {
        if (this.currState) {
            this.currState.OnUpdate();
        }
    };
    GameSprite.prototype.SwitchState = function (id, data) {
        // console.log("SwtichState", id, Laya.timer.currTimer);
        if (this.currState) {
            this.currState.OnExit();
        }
        var s = this.GetState(id);
        if (s) {
            this.currState = s;
            this.currState.OnEnter(data);
        }
        else {
            // console.error("无此状态");
        }
    };
    GameSprite.prototype.GetState = function (id) {
        if (this.stateArr) {
            for (var index = 0; index < this.stateArr.length; index++) {
                var e = this.stateArr[index];
                if (e.id == id) {
                    return e;
                }
            }
        }
        return null;
    };
    GameSprite.prototype.IsCurrStateID = function (id) {
        if (this.currState) {
            return this.currState.id == id;
        }
        return false;
    };
    //注意 bar的xy要额外设置
    GameSprite.prototype.InitHPBar = function (bgUrl, barUrl, barOffsetX, barOffsetY, hpBarY) {
        this.hpBar = new Laya.Sprite();
        var hpBar_bg = GameUtils.CreateSprite(bgUrl, 1);
        this.hpBar_bar = GameUtils.CreateSprite(barUrl, 1);
        hpBar_bg.pivotX = 0;
        this.hpBar_bar.pivotX = 0;
        this.hpBar_bar.x = barOffsetX;
        this.hpBar_bar.y = barOffsetY;
        this.hpBar.addChild(hpBar_bg);
        this.hpBar.addChild(this.hpBar_bar);
        this.hpBar.width = hpBar_bg.width;
        this.hpBar.height = hpBar_bg.height;
        this.hpBar.pivotX = this.hpBar.width / 2;
        this.hpBar.x = 0;
        this.hpBar.y = hpBarY;
        this.spr.addChild(this.hpBar);
        this.hpBar.visible = false;
    };
    GameSprite.prototype.ChangeHP = function (v) {
        this.HP += v;
        this.HP = GameUtils.Clamp(this.HP, 0, this.MAX_HP);
        this.hpBar.visible = true;
        this.hpBar_bar.scaleX = GameUtils.SafeDivide(this.HP, this.MAX_HP);
    };
    GameSprite.prototype.GetHpPercent = function () {
        var percent = GameUtils.SafeDivide(this.HP, this.MAX_HP);
        return percent;
    };
    return GameSprite;
}());
//# sourceMappingURL=GameSprite.js.map