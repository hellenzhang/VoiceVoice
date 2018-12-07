class OnePieceData {
    public m_id: number;
    public m_groundPath: string;
    public m_posx: number;
    public m_posy: number;
    public m_width: number;
    public m_height: number;
    //0表示
    public m_groundType:GroundTypeEnum;
    public m_text:string=`玉哥哥帅玉哥哥帅`;
    public m_textArry:Array<GroundTextData>=new Array<GroundTextData>();
    constructor() {

    }
    /**
     * 地形初始化
     */
    public Init(t_id:number,t_groundPath: string, t_posx: number, t_posy: number, t_width: number, t_height: number,t_groundType,t_textArry:any)  {
        
       // console.log("$$$$$$$$$$:"+t_id,t_groundPath,t_posx,t_posy,t_width,t_height);
        this.m_id = t_id;
        this.m_groundPath = t_groundPath;
        this.m_posx = t_posx;
        this.m_posy = t_posy;
        this.m_width = t_width;
        this.m_height = t_height;
        this.m_groundType=t_groundType;
        for (var index = 0; index < t_textArry.length; index++) {
            var element = t_textArry[index];
            var t_gtd=new GroundTextData(element.m_text,element.m_textColor,element.m_fontSize,element.m_upLength,element.m_leftLength);
            this.m_textArry.push(t_gtd);
        }
    }
}
class GroundTextData{
    constructor(p_text: string, p_textColor: string,p_fontSize: number,p_upLength: number,p_leftLength: number)
    {
        
        this.m_text = p_text;
        this.m_textColor = p_textColor;
        this.m_fontSize = p_fontSize;
        this.m_upLength = p_upLength;
        this.m_leftLength = p_leftLength;
    }
     //字体内容
    public  m_text: string;
    //字体颜色
    public  m_textColor: string;
    //字体
    public  m_fontSize: number;
    //上边距
    public  m_upLength: number;
    //左边距
    public  m_leftLength: number;
}
enum GroundTypeEnum
{
    //地板
    Floor,
    //屋顶
    Roof,
    //火石，碰到就死--火石锚点与屋顶一致，在左上
    FireStone,
}
