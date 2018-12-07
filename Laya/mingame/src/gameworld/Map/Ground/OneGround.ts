class OneGournd extends Laya.Sprite {

    private m_data: OnePieceData;

    private m_isLoaded = false;

    private m_isRomove = false;

    private m_container: Laya.Sprite;
    private m_textArry:Array< Laya.Text> = new Array< Laya.Text>();

    private m_image: Laya.Sprite;
    //未加载时，临时记录的变量
    private m_tempPosx = 0;
    private m_tempPosy = 0;
    constructor() {
        super();
    }
    public StartUp(p_data: OnePieceData, p_container: Laya.Sprite)  {
        this.m_container = p_container;
        this.m_data = p_data;
        this.m_tempPosx = this.m_data.m_posx;
        this.m_tempPosy = this.m_data.m_posy;
          // [name,type,box_rect,layout_x,layout_y,x,y,bgImg9Url,W,H,9gridSize,fgUrl,rightOffestX]
       var uiInfoArr: Array<Array<any>> = [["0 start", "img9", 0, 0, 540, 960, "c", 0, "t", 520,this.m_data.m_groundPath, this.m_data.m_width, this.m_data.m_height, 16]];
       var sprArr = UIMaker.MakeUI(uiInfoArr, this);
       this.m_isLoaded=true;
       this.m_image=sprArr[0];
      
       switch (this.m_data.m_groundType) {
                case GroundTypeEnum.Floor:
                this.m_image.pivotX = 0;
                 this.m_image.pivotY = this.m_data.m_height;
                   // this.pivotX = 0;
                  //  this.pivotY = this.m_data.m_height;
                   for (var index = 0; index < this.m_data.m_textArry.length; index++) {
                       var element = this.m_data.m_textArry[index];
                        var t_text=new Laya.Text;
                        t_text.text=element.m_text;
                        t_text.color=element.m_textColor;
                        t_text.fontSize=element.m_fontSize;
                        t_text.pos(this.m_data.m_posx+element.m_leftLength,this.m_data.m_posy-element.m_upLength-this.m_data.m_height);
                        this.m_textArry.push(t_text);
                   }
                   

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

        this.m_container.addChild(this);
        this.visible = false;
        this.isShow();
    }

    public Reset()  {
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
    }
    //是否应该被显示
    private isShow(): boolean  {
        //看看是否还在屏幕中显示--左边界大于0都是不用显示
        if (this.m_tempPosx - this.pivotX > Laya.stage.width)  {
            this.visible = false;
            return false;
        }
        if (!this.visible) {
            for (var index = 0; index < this.m_textArry.length; index++) {
                var element = this.m_textArry[index];
                console.log(element.text);
                 this.addChild(element);
            }
           
        }
        this.visible = true;
        return true;
    }
    //获取高度信息
    public GetGroundHeight(p_movex: number): number  {
        if (this.visible && !this.m_isRomove && (this.m_data.m_groundType == GroundTypeEnum.Floor) && this.m_tempPosx <= p_movex && (this.m_tempPosx + this.m_data.m_width) >= p_movex)  {
            return this.m_tempPosy - this.m_data.m_height;
        }
        return -1;
    }
    /**
     * GetRoofHeight获取屋顶的高度
     * //获取高度首先是不能碰撞啊，因位头顶上的碰到死不了
     */
    public GetRoofHeight(p_movex: number):number {
         if (this.visible && !this.m_isRomove && (this.m_data.m_groundType == GroundTypeEnum.Roof) && this.m_tempPosx <= p_movex && (this.m_tempPosx + this.m_data.m_width) >= p_movex)  {
          //  console.log("==========:"+this.m_data.m_height);
           
            return this.m_data.m_height+this.m_tempPosy;
        }
        return -1;
    }
    //检测是否碰撞两测
    public CheckIsHit(p_x: number, p_y: number,p_height:number): boolean  {
        switch (this.m_data.m_groundType) {
            case GroundTypeEnum.Floor:
                //除了上表面碰到就死，
                if (this.visible && !this.m_isRomove && this.m_tempPosx <= p_x && (this.m_tempPosx + this.m_data.m_width) >= p_x
                    && this.m_tempPosy+p_height >= p_y && (this.m_tempPosy - this.m_data.m_height< p_y)) {
                      //  console.log("=======-------------:"+this.m_data.m_id,this.m_data.m_height,this.m_tempPosy,p_y);
                    return true;
                }
                break;
            case GroundTypeEnum.Roof:
                if (this.visible && !this.m_isRomove && this.m_tempPosx <= p_x && (this.m_tempPosx + this.m_data.m_width) >= p_x
                    && (this.m_tempPosy <= p_y||this.m_tempPosy <= p_y-p_height )&& (this.m_tempPosy + this.m_data.m_height > p_y||this.m_tempPosy + this.m_data.m_height > p_y-p_height)) {
                  //  console.log("=======:"+this.m_data.m_id);
                    return true;
                }
                break;
            case GroundTypeEnum.FireStone:
                 if (this.visible && !this.m_isRomove && this.m_tempPosx <= p_x && (this.m_tempPosx + this.m_data.m_width) >= p_x ) {
                     //分在上还是在下,相等就不算了
                     if(this.m_tempPosy>p_y)
                     {
                         if (this.m_tempPosy >= p_y && (this.m_tempPosy - this.m_data.m_height < p_y)) {
                             return true;
                         }
                        
                     }
                     else if(this.m_tempPosy<p_y)
                     {
                          //判断距离
                         if ( (this.m_tempPosy <= p_y||this.m_tempPosy <= p_y-p_height )&& (this.m_tempPosy + this.m_data.m_height > p_y||this.m_tempPosy + this.m_data.m_height > p_y-p_height)) {
                             return true;
                         }
                     }
                }
                break;
            default:
                break;
        }

        return false;
    }
    public UpdateMove(p_movex: number, p_movey: number)  {
       // console.log("======:"+p_movex+"  "+this.m_image.x+"  "+this.m_image.y+"   "+this.m_data.m_id);
        if (this.m_isRomove)  {
            return;
        }
        if (this.m_isLoaded)  {
            this.x -= p_movex;
            this.m_tempPosx -= p_movex;
          //  this.m_text.x-=p_movex;
           
            this.isShow();
        }
        else  {
            //  console.log("+++++:"+this.x+"   "+this.m_data.m_id);
            this.m_tempPosx -= p_movex;
        }

    }
    //是否可以销毁，注意他与是否被显示是有区别的,是否可以销毁，由管理器去处理
    public CanRemove()  {
        if (this.m_isRomove)  {
            return;
        }
        if (!this.m_isLoaded)  {
            if (this.m_tempPosx < 0)  {
                this.m_isRomove = true;
            }
            this.m_isRomove = false;
        }
        if (this.m_tempPosx + this.m_data.m_width - this.pivotX < 0)  {
            //   console.log("----:"+this.x+"   "+this.m_data.m_width+"  "+this.m_data.m_id);
              this.removeChild(this.m_text);
            this.visible = false;
            this.m_isRomove = true;
        }
    }
}