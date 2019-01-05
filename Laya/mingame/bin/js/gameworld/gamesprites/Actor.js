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
 * hero,mob,boss,ghost,slime的父类
 * 描述信息，动画，碰撞信息，机炮位置
 */
var Actor = /** @class */ (function (_super) {
    __extends(Actor, _super);
    function Actor() {
        var _this = _super.call(this) || this;
        //key是aniUrl,<string,Laya.Animation>
        _this.bodyAnimDict = null;
        //public是因为boss的state要用这个播放动画
        _this.bodyAnim = null;
        _this.metaID = -1;
        _this.meta = null;
        //改变外显
        _this.currAniUrl = null;
        _this.spr = new Laya.Sprite();
        _this.bodyLayer = new Laya.Sprite();
        _this.spr.addChild(_this.bodyLayer);
        _this.bodyAnimDict = new Laya.Dictionary();
        return _this;
    }
    Actor.prototype.ChangeAvatar = function (metaID) {
        if (this.metaID == metaID) {
            return;
        }
        this.metaID = metaID;
        this.meta = AvatarMeta.GetMeta(metaID);
        //avatar
        this.DoChangeAvatar(this.meta.json.anim_url);
        //-碰撞区域
        this.DoChangeHitRect();
    };
    Actor.prototype.DoChangeHitRect = function () {
        //碰撞区域
        this.hitRectCenterX = this.meta.json.hit_rect[0];
        this.hitRectCenterY = this.meta.json.hit_rect[1];
        this.hitRectWidth = this.meta.json.hit_rect[2];
        this.hitRectHeight = this.meta.json.hit_rect[3];
    };
    Actor.prototype.DoChangeAvatar = function (aniUrl) {
        if (this.currAniUrl == aniUrl) {
            return;
        }
        this.currAniUrl = aniUrl;
        if (this.bodyAnim) {
            this.bodyLayer.removeChild(this.bodyAnim);
            this.bodyAnim = null;
        }
        this.bodyAnim = this.bodyAnimDict.get(aniUrl);
        if (!this.bodyAnim) {
            this.bodyAnim = new Laya.Animation();
            this.bodyAnim.loadAnimation(aniUrl);
            // this.bodyAnim.pivotX=10;
            // this.bodyAnim.pivotY=100;
            // Laya.DebugPanel.init();
            this.bodyAnimDict.set(aniUrl, this.bodyAnim);
        }
        this.bodyLayer.addChild(this.bodyAnim);
        this.bodyAnim.play();
    };
    return Actor;
}(GameSprite));
//# sourceMappingURL=Actor.js.map