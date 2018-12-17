/**
 * 
 * 根据配置文件生成UI
 *   private uiInfoArr: Array<Array<any>> = [
*
*        ["0 title", "img", 0, 0, 540, 960, "c", 0, "t", 100, "res/img_cover0.png"],
*       ["1 start", "btn9", 0, 0, 540, 960, "c", 0, "t", 520, "ui/ui_common/img_btn0_bg.png", 220, 80, 20, "ui/ui_gamemenu/btn_startplay.png"],
*      ["2 rank", "btn9", 0, 0, 540, 960, "c", 0, "t", 620, "ui/ui_common/img_btn0_bg.png", 220, 80, 20, "ui/ui_gamemenu/btn_rank.png"],
*       ["3 coin", "coin_btn", 0, 0, 540, 960, "c", 0, "t", 720],
*
*      ["4 ver", "tf", 0, 0, 540, 960, 20, 460, 200, 24, "bf_24", "left"],
*
*  ];
 * 
 * 注意Panel分两种，固定尺寸的，直接设置高度；可变高度的，用自动布局
 * name:方便配表查看的
 * type:string  [btn,tf,img,prefab]
 * layout_x:number   UIMaker.LEFT,RIGHT,CENTER "l","r","c","f"(注意f就是自由设置，直接spr.x=box_x+x)
 * layout_y:number   UIMacker.TOP,BOTTOM,MIDDLE,"t","b","m"
 * 
 * box_rec :box_x,box_y,box_width,box_height  注意x,y是rect左上角
 * 注意，box的坐标是相对于stage的
 * ！！注意，如果box_width是负值，则用stageW,stageH减去其值，则是结果。这是为动态box而设计，非常重要
 * !!注意，如果box_x是负数，表示此box的右边，距离stage右边的距离，box_y为负同理
 * 
 * tf和prefab时,xy是tf的左上角坐标
 * btn和img时，xy是spr的中心相对于锚点的坐标
 * 
 * url是图片地址，比如“ui/ok_btn.png”
 * 
 * layer就是个空的占位符layer
 * 
 * 根据配表生成UI
 * [
 * 
 * 如果type是img或btn,x,y是图片center相对于layout锚点的位置
 * [name,type,box_rect,layout_x,layout_y,x,y,url]
 * 
 * 如果type是tf
 * [name,type,box_rect,x,y,w,h,font,align]
 * 
 * 如果type是layer(自定义组件）,x,y是layer位置,这个是个占位符，容器
 * [name,type,box_rect,layout_x,layout_y,x,y]
 * 

 * * 如果type是btn9或者img9,w,h是图片的大小
 * 注意最后的fgUrl是可选的，有则居中对齐这个img
 * 注意img和btn目前区别是是否mouseEnable,rightOffsetX可选，如果没有则默认居中，有则正常处理
 * [name,type,box_rect,layout_x,layout_y,x,y,bgImg9Url,W,H,9gridSize,fgUrl,rightOffestX]
 * 
 * ]
 * 
 *type: coin_btn
 * [name,type,box_rect,layout_x,layout_y,x,y,
 * 
 * !!注意不使用九宫格图片字是有原因的
 */
class UIMaker {

    //返回sprArr便于查询
    public static MakeUI(infoArr: Array<Array<any>>, parent: Laya.Sprite) {
        let sprArr = new Array<Laya.Sprite>();
        for (let i = 0; i < infoArr.length; i++) {
            let info = infoArr[i];//一条ui信息

            let name = info[0];
            let type = info[1];
            let box_x = info[2];
            let box_y = info[3];
            let box_width = info[4];
            let box_height = info[5];
            let x: number = 0;
            let y: number = 0;

            switch (type) {
                 case "coin_btn":
                   let layout_x0 = info[6];
                    x = info[7];
                    let layout_y0 = info[8];
                    y = info[9];

                 let coinBtn=new CoinButton();
                    UIMaker.BoxLayout(coinBtn, box_x, box_y, box_width, box_height, layout_x0, layout_y0, x, y);
                 parent.addChild(coinBtn);
                 sprArr.push(coinBtn);
                 break;
                case "tf":
                    x = info[6];
                    y = info[7];
                    let w = info[8];
                    let h = info[9];
                    let font: string = info[10];
                    let align: string = info[11];
                    let tf = UIUtils.CreateSimpleTextField(font, 0, 0, w, h, parent);
                    UIMaker.BoxLayout_Tf(tf, box_x, box_y, box_width, box_height, x, y);
                    tf.align = align;
                    tf.name = name;
                    parent.addChild(tf);
                    sprArr.push(tf);
                    break;


                case "btn":
                case "img":
                case "btn9"://9宫格按钮
                case "layer":
                case "img9"://9宫格图片
               // case "btn9_tf"://9宫格图片
               // case "img9_tf"://9宫格图片

                    let layout_x = info[6];
                    x = info[7];
                    let layout_y = info[8];
                    y = info[9];

                    let spr: Laya.Sprite;
                    if (type == "layer") {
                        spr = new Laya.Sprite();
                    } else if (type == "img9" || type == "btn9"){// || type == "btn9_tf" || type == "img9_tf") {

                        let WW: number = info[11];
                        let HH: number = info[12];
                       
                        spr = new Image9Grid(info[10], WW, HH, info[13]);
                        spr.width=WW;
                        spr.height=HH;
                        spr.pivotX = WW / 2;
                        spr.pivotY = HH / 2;

                        spr.addChild(spr);

                          //-前景图片可能有，也可能没有，有前景图片的是面板字用
                          if(info[14]){
                                let icon=GameUtils.CreateSprite(info[14],1);
                                spr.addChild(icon);
                                icon.mouseEnabled=true;
                                icon.x=WW/2;
                                icon.y=HH/2;
                                if(info[15]){
                                    icon.x=WW-info[15]-icon.width/2;
                                }

                                 if (type == "btn9") {
                                icon.mouseEnabled = true;
                            }
                          }

                        if (type == "btn9") {
                            spr.mouseEnabled = true;
                        }

                    } else {//btn,img
                        let url = info[10];
                        spr = GameUtils.CreateSprite(url, 1);
                    }

                    UIMaker.BoxLayout(spr, box_x, box_y, box_width, box_height, layout_x, layout_y, x, y);

                    parent.addChild(spr);
                    sprArr.push(spr);
                    break;
                default:
                    console.log("无此UI类型，请检查配表", i, info);
                    break;
            }
        }
        return sprArr;
    }

    //注册事件
    /** 
     * [sprIdx:number,caller:any,func:Function]
     */
    public static AddEventListeners(eventArr: Array<Array<any>>, sprArr: Array<Laya.Sprite>) {
        for (let i: number = 0; i < eventArr.length; i++) {
            let info = eventArr[i];
            let spr = sprArr[info[0]];
            if (info.length==3) {
                  spr.on(Laya.Event.CLICK, info[1], info[2]);
            }
            else
            {
                  spr.on(info[3], info[1], info[2]);
            }
          
        }
    }
   // [ 0, 10, 540, -20, "c", 0, "m", 0, "gameworld/ui_btn_resume.png"],
    //注意，这里spr的锚点是图片中心
    private static BoxLayout(spr: Laya.Sprite, bx: number, by: number, bw: number, bh: number, lx: string, ly: string, x: number, y: number) {

        // console.log("BoxL",spr.width,spr.height);
        //如果bw,bh小于0，则用stageW,stageH减去此值，这是为动态box而做
        if (bw < 0) {
            bw = Laya.stage.width + bw;
        }
        if (bh < 0) {
            bh = Laya.stage.height + bh;
        }

        if (bx < 0) {
            bx = Laya.stage.width - bw + bx;
        }
        if (by < 0) {
            by = Laya.stage.height - bh + by;
        }

        switch (lx) {
            case "l":
                spr.x = bx + x + spr.width / 2;
                break;
            case "r":
                spr.x = bx + bw + x - spr.width / 2;
                break;
            case "c":
                spr.x = bx + bw / 2;
                break;
            case "f":
                spr.x = bx + x;
                break;
        }

        switch (ly) {
            case "t":
                spr.y = by + y + spr.height / 2;
                break;
            case "b":
                spr.y = by + bh + y - spr.height / 2;
                break;
            case "m":
                spr.y = by + bh / 2;
                break;
            case "f":
                spr.y = by + y;
                break;
        }
    }

    //tf专用布局
    //注意，这里spr的锚点是图片中心
    private static BoxLayout_Tf(spr: Laya.Sprite, bx: number, by: number, bw: number, bh: number, x: number, y: number) {
        //如果bw,bh小于0，则用stageW,stageH减去此值，这是为动态box而做
        if (bw < 0) {
            bw = Laya.stage.width + bw;
        }
        if (bh < 0) {
            bh = Laya.stage.height + bh;
        }

        if (bx < 0) {
            bx = Laya.stage.width - bw + bx;
        }
        if (by < 0) {
            by = Laya.stage.height - bh + by;
        }

        spr.x = bx + x;
        spr.y = by + y;
    }
}