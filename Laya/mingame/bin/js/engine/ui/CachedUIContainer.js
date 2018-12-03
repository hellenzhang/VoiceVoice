/**
 * 高级用法，新手可以不用
 * 缓存容器，防止被gc收走用的
 * 多个ui频繁切换，比如主机商店左右翻页
 * type :spr anim
 */
var CachedUIContainer = /** @class */ (function () {
    function CachedUIContainer(type, parent) {
        this.type = type;
        this.parent = parent;
        //改变外显
        //key是aniUrl,<string,Laya.Animation>
        this.sprDict = null;
        //public是因为boss的state要用这个播放动画
        this.currSpr = null;
        this.currUrl = null;
        this.sprDict = new Laya.Dictionary();
    }
    CachedUIContainer.prototype.Change = function (url) {
        if (this.currUrl == url) {
            return;
        }
        this.currUrl = url;
        if (this.currSpr) {
            this.parent.removeChild(this.currSpr);
            this.currSpr = null;
        }
        this.currSpr = this.sprDict.get(url);
        if (!this.currSpr) {
            switch (this.type) {
                case "spr":
                    this.currSpr = GameUtils.CreateSprite(this.currUrl, 1);
                    break;
                case "anim":
                    var a = new Laya.Animation();
                    a.loadAnimation(url);
                    this.currSpr = a;
                    a.play();
                    break;
            }
            this.sprDict.set(url, this.currSpr);
        }
        this.parent.addChild(this.currSpr);
        //this.currSpr.play();
    };
    return CachedUIContainer;
}());
//# sourceMappingURL=CachedUIContainer.js.map