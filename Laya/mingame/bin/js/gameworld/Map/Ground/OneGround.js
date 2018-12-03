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
var OneGournd = /** @class */ (function (_super) {
    __extends(OneGournd, _super);
    function OneGournd() {
        var _this = _super.call(this) || this;
        _this.m_isLoaded = false;
        _this.m_isRomove = false;
        _this.m_text = new Laya.Text;
        //未加载时，临时记录的变量
        _this.m_tempPosx = 0;
        _this.m_tempPosy = 0;
        return _this;
    }
    OneGournd.prototype.StartUp = function (p_data, p_container) {
        this.m_container = p_container;
        this.m_data = p_data;
        this.m_tempPosx = this.m_data.m_posx;
        this.m_tempPosy = this.m_data.m_posy;
        // [name,type,box_rect,layout_x,layout_y,x,y,bgImg9Url,W,H,9gridSize,fgUrl,rightOffestX]
        var uiInfoArr = [["0 start", "img9", 0, 0, 540, 960, "c", 0, "t", 520, this.m_data.m_groundPath, this.m_data.m_width, this.m_data.m_height, 20]];
        var sprArr = UIMaker.MakeUI(uiInfoArr, this);
        this.m_isLoaded = true;
        this.m_image = sprArr[0];
        switch (this.m_data.m_groundType) {
            case GroundTypeEnum.Floor:
                this.m_image.pivotX = 0;
                this.m_image.pivotY = this.m_data.m_height;
                // this.pivotX = 0;
                //  this.pivotY = this.m_data.m_height;
                this.m_text.text = this.m_data.m_text;
                this.m_text.pos(this.m_data.m_posx + 20, this.m_data.m_posy - this.m_data.m_height + 20);
                break;
            case GroundTypeEnum.Roof:
                this.m_image.pivotX = 0;
                this.m_image.pivotY = 0;
                break;
            case GroundTypeEnum.FireStone:
                // console.log("KKKKKKKKKKKKKKKKKKKKKKKK");
                this.m_image.pivotX = 0;
                this.m_image.pivotY = 0;
                break;
            default:
                break;
        }
        this.m_image.pos(this.m_data.m_posx, this.m_data.m_posy);
        this.addChild(this.m_image);
        this.m_text.color = "ff0000";
        this.m_text.fontSize = 50;
        //  console.log(this.m_data.m_posx+"   "+this.m_data.m_posy+"  "+this.m_data.m_groundType);
        // this.m_image=this.loadImage(this.m_data.m_groundPath, this.m_data.m_posx, this.m_data.m_posy, this.m_data.m_width, this.m_data.m_height, Laya.Handler.create(this, () => {
        //     this.m_isLoaded = true;
        //     switch (this.m_data.m_groundType) {
        //         case GroundTypeEnum.Floor:
        //             this.pivotX = 0;
        //             this.pivotY = this.m_data.m_height;
        //              this.m_text.text=this.m_data.m_text;
        //             this.m_text.pos(this.m_data.m_posx,this.m_data.m_posy);
        //             break;
        //         case GroundTypeEnum.Roof:
        //             // console.log("KKKKKKKKKKKKKKKKKKKKKKKK");
        //             this.pivotX = 0;
        //             this.pivotY = 0;
        //             break;
        //         case GroundTypeEnum.FireStone:
        //             // console.log("KKKKKKKKKKKKKKKKKKKKKKKK");
        //             this.pivotX = 0;
        //             this.pivotY = 0;
        //             break;
        //         default:
        //             break;
        //     }
        //    this.addChild(this.m_image);
        //     this.m_text.color="#ff0000";
        //     this.m_text.fontSize=50;
        //     this.addChild(this.m_text);
        // }));
        this.m_container.addChild(this);
        this.visible = false;
        this.isShow();
    };
    OneGournd.prototype.Reset = function () {
        // console.log("=====:"+this.x,this.m_tempPosx,this.m_data.m_posx);
        this.x -= (this.m_tempPosx - this.m_data.m_posx);
        this.y -= (this.m_tempPosy - this.m_data.m_posy);
        this.m_tempPosx = this.m_data.m_posx;
        this.m_tempPosy = this.m_data.m_posy;
        //this.x=this.m_tempPosx;
        //this.y= this.m_tempPosy;
        //console.log("**********:"+this.x);
        this.visible = false;
        this.m_isRomove = false;
        this.isShow();
        //   Laya.DebugPanel.init();
    };
    //是否应该被显示
    OneGournd.prototype.isShow = function () {
        //看看是否还在屏幕中显示--左边界大于0都是不用显示
        if (this.m_tempPosx - this.pivotX > Laya.stage.width) {
            this.visible = false;
            return false;
        }
        if (!this.visible) {
            this.addChild(this.m_text);
        }
        this.visible = true;
        return true;
    };
    //获取高度信息
    OneGournd.prototype.GetGroundHeight = function (p_movex) {
        if (this.visible && !this.m_isRomove && (this.m_data.m_groundType == GroundTypeEnum.Floor) && this.m_tempPosx <= p_movex && (this.m_tempPosx + this.m_data.m_width) >= p_movex) {
            return this.m_tempPosy - this.m_data.m_height;
        }
        return -1;
    };
    /**
     * GetRoofHeight获取屋顶的高度
     * //获取高度首先是不能碰撞啊，因位头顶上的碰到死不了
     */
    OneGournd.prototype.GetRoofHeight = function (p_movex) {
        if (this.visible && !this.m_isRomove && (this.m_data.m_groundType == GroundTypeEnum.Roof) && this.m_tempPosx <= p_movex && (this.m_tempPosx + this.m_data.m_width) >= p_movex) {
            //  console.log("==========:"+this.m_data.m_height);
            return this.m_data.m_height + this.m_tempPosy;
        }
        return -1;
    };
    //检测是否碰撞两测
    OneGournd.prototype.CheckIsHit = function (p_x, p_y, p_height) {
        switch (this.m_data.m_groundType) {
            case GroundTypeEnum.Floor:
                //除了上表面碰到就死，
                if (this.visible && !this.m_isRomove && this.m_tempPosx <= p_x && (this.m_tempPosx + this.m_data.m_width) >= p_x
                    && this.m_tempPosy + p_height >= p_y && (this.m_tempPosy - this.m_data.m_height < p_y)) {
                    //  console.log("=======-------------:"+this.m_data.m_id,this.m_data.m_height,this.m_tempPosy,p_y);
                    return true;
                }
                break;
            case GroundTypeEnum.Roof:
                if (this.visible && !this.m_isRomove && this.m_tempPosx <= p_x && (this.m_tempPosx + this.m_data.m_width) >= p_x
                    && (this.m_tempPosy <= p_y || this.m_tempPosy <= p_y - p_height) && (this.m_tempPosy + this.m_data.m_height > p_y || this.m_tempPosy + this.m_data.m_height > p_y - p_height)) {
                    //  console.log("=======:"+this.m_data.m_id);
                    return true;
                }
                break;
            case GroundTypeEnum.FireStone:
                if (this.visible && !this.m_isRomove && this.m_tempPosx <= p_x && (this.m_tempPosx + this.m_data.m_width) >= p_x) {
                    //分在上还是在下,相等就不算了
                    if (this.m_tempPosy > p_y) {
                        if (this.m_tempPosy >= p_y && (this.m_tempPosy - this.m_data.m_height < p_y)) {
                            return true;
                        }
                    }
                    else if (this.m_tempPosy < p_y) {
                        //判断距离
                        if ((this.m_tempPosy <= p_y || this.m_tempPosy <= p_y - p_height) && (this.m_tempPosy + this.m_data.m_height > p_y || this.m_tempPosy + this.m_data.m_height > p_y - p_height)) {
                            return true;
                        }
                    }
                }
                break;
            default:
                break;
        }
        return false;
    };
    OneGournd.prototype.UpdateMove = function (p_movex, p_movey) {
        // console.log("======:"+p_movex+"  "+this.m_image.x+"  "+this.m_image.y+"   "+this.m_data.m_id);
        if (this.m_isRomove) {
            return;
        }
        if (this.m_isLoaded) {
            this.x -= p_movex;
            this.m_tempPosx -= p_movex;
            //  this.m_text.x-=p_movex;
            this.isShow();
        }
        else {
            //  console.log("+++++:"+this.x+"   "+this.m_data.m_id);
            this.m_tempPosx -= p_movex;
        }
    };
    //是否可以销毁，注意他与是否被显示是有区别的,是否可以销毁，由管理器去处理
    OneGournd.prototype.CanRemove = function () {
        if (this.m_isRomove) {
            return;
        }
        if (!this.m_isLoaded) {
            if (this.m_tempPosx < 0) {
                this.m_isRomove = true;
            }
            this.m_isRomove = false;
        }
        if (this.m_tempPosx + this.m_data.m_width - this.pivotX < 0) {
            //   console.log("----:"+this.x+"   "+this.m_data.m_width+"  "+this.m_data.m_id);
            this.removeChild(this.m_text);
            this.visible = false;
            this.m_isRomove = true;
        }
    };
    return OneGournd;
}(Laya.Sprite));
//# sourceMappingURL=OneGround.js.map