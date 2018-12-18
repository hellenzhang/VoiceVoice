/**
 * 工具类
 */
var GameUtils = /** @class */ (function () {
    function GameUtils() {
    }
    // //检查一下，防止重复设置
    // public static SetFilter(spr:Laya.Sprite,filters:Array<Laya.Filter>){
    // 	if(spr.filters!=filters){
    // 		spr.filters=filters;
    // 	}
    // }
    //创建并添加图层
    GameUtils.AddLayer = function (parent) {
        var layer = new Laya.Sprite();
        parent.addChild(layer);
        return layer;
    };
    //!目前只处理0到180度，角度以外的没考虑
    //提取a到b的角度,注意atan返回的-90到90 各个象限真实值自己搞
    GameUtils.GetAngle = function (startX, startY, endX, endY) {
        var dx = endX - startX;
        var dy = endY - startY;
        if (dx == 0) {
            if (dy > 0) {
                return 90;
            }
            else {
                return -90;
            }
        }
        else {
            var a = Laya.Utils.toAngle(Math.atan(dy / dx));
            if (dx < 0 && dy > 0) {
                a += 180;
            }
            if (dx < 0 && dy < 0) {
                a -= 180;
            }
            return a;
        }
    };
    //-hittet
    GameUtils.GetDistance2 = function (x0, y0, x1, y1) {
        var dx = x0 - x1;
        var dy = y0 - y1;
        var dist = dx * dx + dy * dy;
        return dist;
    };
    //两点的距离是否小于某半径
    GameUtils.IsInRadius = function (x0, y0, x1, y1, r) {
        var d1 = GameUtils.GetDistance2(x0, y0, x1, y1);
        var d2 = r * r;
        return d1 <= d2;
    };
    /**
     * 在一个概率数组里，摇号，返回的是索引
     * 比如[30,20,50],则以概率返回索引，0，1，
     * !!注意为了简化使用和安全性，当概率都没命中时，返回0
     */
    GameUtils.RandomRateArr = function (rateArr) {
        var start = 1;
        var r = GameUtils.RandomInt(1, 100);
        for (var index = 0; index < rateArr.length; index++) {
            var end = rateArr[index] + start;
            if (r >= start && r < end) {
                return index;
            }
            start = end;
        }
        return 0;
    };
    /**
     * 是否是此概率
     *
     */
    GameUtils.IsRateOK = function (rate) {
        var r = GameUtils.Random(1, 100);
        return r < rate;
    };
    //千分比概率
    GameUtils.IsRateOK1000 = function (rate) {
        var r = GameUtils.RandomInt(1, 1000);
        return r <= rate;
    };
    //a,b两个数组，a是概率，b是值，按a的概率返回b的内容
    //a:["apple","banana","orange"],b:[10,40,50],按b的概率返回app,banan或者orange
    GameUtils.GetRandomResult = function (a, b) {
        var idx = GameUtils.RandomRateArr(b);
        return a[idx];
    };
    //专为粒子用的，注意鸟不要这样用
    GameUtils.IsOutOfStageBounds = function (x, y) {
        var W = GameWorld.inst.stageW;
        var H = GameWorld.inst.stageH;
        if (x < 0 || x > W || y < 0 || y > H) {
            return true;
        }
        return false;
    };
    //[min,max]
    GameUtils.Clamp = function (v, min, max) {
        if (v < min) {
            v = min;
        }
        if (v > max) {
            v = max;
        }
        return v;
    };
    //左右滚值[min,max],不出超过一倍(max-min+1)
    GameUtils.Scroll = function (v, min, max) {
        var count = max - min + 1;
        if (v < min) {
            v = v + count;
        }
        if (v > max) {
            v = v - count;
        }
        return v;
    };
    GameUtils.SafeDivide = function (a, b) {
        if (b == 0) {
            return 0;
        }
        else {
            return a / b;
        }
    };
    //返回[min,max],int
    GameUtils.RandomInt = function (min, max) {
        max += 1;
        return Math.floor(min + Math.random() * (max - min));
    };
    //返回[min,max)
    GameUtils.Random = function (min, max) {
        //max+=1;
        return min + Math.random() * (max - min);
    };
    //在扇形内随机生成一点(-160,-20)
    GameUtils.RandomInSector_PointTemp = function (fromRadius, toRadius, fromAngle, toAngle) {
        GameUtils.PolarToCart_PointTemp(GameUtils.Random(fromRadius, toRadius), GameUtils.Random(fromAngle, toAngle));
    };
    //在圆内随机生成一点(-160,-20)
    GameUtils.RandomInCircle_PointTemp = function (radius) {
        GameUtils.PolarToCart_PointTemp(GameUtils.Random(0, radius), GameUtils.Random(0, 360));
    };
    //-以固定速度向目标移动
    GameUtils.MoveTowards = function (x, target, speed) {
        var deltaTimeSec = GameWorld.inst.deltaTimeSec;
        if (target - x > 0) {
            x += Math.abs(speed) * deltaTimeSec;
            if (x > target) {
                x = target;
            }
        }
        else if (target - x < 0) {
            x -= Math.abs(speed) * deltaTimeSec;
            if (x < target) {
                x = target;
            }
        }
        return x;
    };
    // //-弹簧系数移动到目标,springFactor,需要大于1，数字越小，移动越快
    // //返回x的新值
    // public static MoveTowardsSpring(x: number, target: number, springFactor: number = 3): number {
    // 	let deltaTimeSec: number = GameWorld.inst.deltaTimeSec;
    // 	let dist = target - x;
    // 	if (GameUtils.FloatEqual(dist, 0, 0.01)) {
    // 		return target;
    // 	}
    // 	let speed = dist / springFactor;
    // 	x += speed * deltaTimeSec;
    // 	return x;
    // }
    // //浮点相等判断,threhod是判断极限
    // public static FloatEqual(a: number, b: number, threhod: number): boolean {
    // 	return Math.abs(a - b) < threhod;
    // }
    //！！注意返回值存储在Point.TEMP里，为了减少gc
    GameUtils.PolarToCart_PointTemp = function (length, angle) {
        var rad = Laya.Utils.toRadian(angle);
        //console.log("PolarToCart",angle,rad);
        Laya.Point.TEMP.x = Math.cos(rad) * length;
        Laya.Point.TEMP.y = Math.sin(rad) * length;
    };
    //由左半部分的图片，合成出右半部分;最终图片由两片拼接出，居中
    //实验发现有条线
    GameUtils.CreateMirrorSprite = function (url) {
        var spr = new Laya.Sprite();
        var aa = GameUtils.CreateSprite(url, 1);
        aa.pivotX = aa.width;
        var bb = GameUtils.CreateSprite(url, 1);
        bb.pivotX = bb.width;
        //aa.x=-aa.width/2;
        //bb.x=aa.width/2-1;
        aa.x = 0;
        bb.x = 0;
        bb.scaleX = -1;
        spr.addChild(aa);
        spr.addChild(bb);
        return spr;
    };
    //工具函数，创建spr,要求资源要先加载进来，通过loader.getRes来做
    GameUtils.CreateSprite = function (url, scale) {
        var spr = new Laya.Sprite();
        spr.scaleX = spr.scaleY = scale;
        var texture = Laya.loader.getRes(url);
        spr.graphics.drawTexture(texture);
        spr.pivotX = texture.width / 2;
        spr.pivotY = texture.height / 2;
        spr.width = texture.width;
        spr.height = texture.height;
        return spr;
    };
    GameUtils.SimpleCreateSprite = function (url) {
        var spr = new Laya.Sprite();
        var texture = Laya.loader.getRes(url);
        spr.graphics.drawTexture(texture);
        spr.width = texture.width;
        spr.height = texture.height;
        return spr;
    };
    GameUtils.GetOrderTime = function (p_date) {
        p_date.setHours(0);
        p_date.setMinutes(0);
        p_date.setSeconds(0);
        p_date.setMilliseconds(0);
        return p_date.getTime();
    };
    GameUtils.CompareTime = function (p_date, p_originTime, p_totalTime) {
        var t_dateTime = p_date.getTime();
        return t_dateTime - p_originTime < p_totalTime;
    };
    return GameUtils;
}());
//# sourceMappingURL=GameUtils.js.map