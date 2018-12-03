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
    constructor() {

    }
    /**
     * 地形初始化
     */
    public Init(t_id:number,t_groundPath: string, t_posx: number, t_posy: number, t_width: number, t_height: number,t_groundType)  {
        
       // console.log("$$$$$$$$$$:"+t_id,t_groundPath,t_posx,t_posy,t_width,t_height);
        this.m_id = t_id;
        this.m_groundPath = t_groundPath;
        this.m_posx = t_posx;
        this.m_posy = t_posy;
        this.m_width = t_width;
        this.m_height = t_height;
        this.m_groundType=t_groundType;
    }
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
