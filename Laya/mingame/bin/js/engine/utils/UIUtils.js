/**
 * UI相关的工具函数
 */
var UIUtils = /** @class */ (function () {
    function UIUtils() {
    }
    //centerOffsetX是中心偏移
    //如果rightOffsetX有值,则执行右边距偏移，否则居中
    UIUtils.AddIconToButton = function (btn, iconUrl, rightOffsetX) {
        var icon = GameUtils.CreateSprite(iconUrl, 1);
        btn.addChild(icon);
        icon.mouseEnabled = true;
        icon.x = btn.width / 2;
        icon.y = btn.height / 2;
        if (rightOffsetX) {
            icon.x = btn.width - rightOffsetX - icon.width / 2;
        }
    };
    // // //预热
    // private static grayFilterArr:Array<Laya.Filter>;
    // //testSpr是为了减少gc
    // public static PrewarmGrayFilter(testSpr:Laya.Sprite):void{
    //   //  颜色滤镜矩阵,灰色
    //     var colorMatrix:any = 
    //         [
    //             0.3086, 0.6094, 0.0820, 0, 0,  //R
    //             0.3086, 0.6094, 0.0820, 0, 0, //G
    //             0.3086, 0.6094, 0.0820, 0, 0,  //B
    //             0, 0, 0, 1, 0, //A
    //         ];
    //     //创建灰色颜色滤镜
    //     let grayFilter = new Laya.ColorFilter(colorMatrix);
    // 	UIUtils.grayFilterArr=[grayFilter];
    //     //在坐标460,50位置创建一个位图
    //    // var img:Laya.Sprite =new Laya.Sprite(); 
    //     //添加灰色颜色滤镜效果
    //     testSpr.filters = UIUtils.grayFilterArr;
    // }
    // //预热
    // public static blackFilterArr:Array<Laya.Filter>;
    // //testSpr是为了减少gc
    // public static PrewarmBlackFilter(testSpr:Laya.Sprite):void{
    //   //  颜色滤镜矩阵,灰色
    //     var colorMatrix:any = 
    //         [
    //             0, 0, 0, 0, 0,  //R
    //             0, 0, 0, 0, 0, //G
    //             0, 0, 0, 0, 0,  //B
    //             0, 0, 0, 1, 0, //A
    //         ];
    //     //创建灰色颜色滤镜
    //    UIUtils.blackFilterArr= [new Laya.ColorFilter(colorMatrix)];
    //     //在坐标460,50位置创建一个位图
    //    // var img:Laya.Sprite =new Laya.Sprite(); 
    //     //添加灰色颜色滤镜效果
    //     testSpr.filters = UIUtils.blackFilterArr;
    // }
    // //发红光
    // public static glowFilterArr:Array<Laya.Filter>;
    // //testSpr是为了减少gc
    // public static PrewarmGlowFilter(testSpr:Laya.Sprite):void{
    //     //创建灰色颜色滤镜
    //    UIUtils.glowFilterArr= [new Laya.GlowFilter("#aa0000",4,0,0)];
    //     //在坐标460,50位置创建一个位图
    //    // var img:Laya.Sprite =new Laya.Sprite(); 
    //     //添加灰色颜色滤镜效果
    //     testSpr.filters = UIUtils.glowFilterArr;
    // }
    // //testSpr是为了减少gc
    // public static redFilterArr:Array<Laya.Filter>;
    // public static PrewarmRedFilter(testSpr:Laya.Sprite):void{
    //   //  颜色滤镜矩阵,灰色
    //     var colorMatrix:any = 
    //         [
    //             1, 0, 0, 0, 0,  //R
    //             0, 0.5, 0, 0, 0, //G
    //             0, 0, 0.5, 0, 0,  //B
    //             0, 0, 0, 1, 0, //A
    //         ];
    //     //创建灰色颜色滤镜
    //     UIUtils.redFilterArr= [new Laya.ColorFilter(colorMatrix)];
    //     //添加灰色颜色滤镜效果
    //     testSpr.filters = UIUtils.redFilterArr;
    // }
    //设置是否变灰，可能有性能问题
    UIUtils.SetGray = function (spr, b) {
        if (b) {
            //spr.filters=UIUtils.grayFilterArr;
            spr.visible = false;
        }
        else {
            //spr.filters=null;
            spr.visible = true;
        }
    };
    //
    UIUtils.CreateBlockBG = function (url) {
        var blockBG = GameUtils.CreateSprite(url, 1);
        blockBG.pivotX = 0;
        blockBG.pivotY = 0;
        UIUtils.SetSize(blockBG, Laya.stage.width, Laya.stage.height);
        return blockBG;
    };
    //设置spr到指定尺寸
    UIUtils.SetSize = function (spr, width, height) {
        var scalex = width / spr.width;
        var scaley = height / spr.height;
        spr.scale(scalex, scaley);
    };
    // /**
    //  * w.h是原始图片的尺寸
    //  */
    // public static CenterPivot(spr: Laya.Sprite, w: number, h: number) {
    // 	spr.pivotX = w >> 1;
    // 	spr.pivotY = h >> 1;
    // }
    UIUtils.CreateSimpleTextField = function (fontName, x, y, w, h, parent) {
        var t = new Laya.Text();
        t.x = x;
        t.y = y;
        t.width = w;
        t.height = h;
        t.font = fontName;
        t.text = "8";
        parent.addChild(t);
        //t.bgColor="#ff0000";
        return t;
    };
    //创建简单的BTN
    UIUtils.CreateSimpleBtn = function (url, caller, fun) {
        var bb = GameUtils.CreateSprite(url, 1);
        //bb.width*=hotAreaScale;
        //bb.height*=hotAreaScale;
        bb.on(Laya.Event.CLICK, caller, fun);
        return bb;
    };
    return UIUtils;
}());
//# sourceMappingURL=UIUtils.js.map