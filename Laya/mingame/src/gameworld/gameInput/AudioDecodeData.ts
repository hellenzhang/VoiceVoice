class AudioDecodeData {
    //等级
    public m_level=0;
    //音量
    public m_power=100;
    //行走系数
    public m_runCoffe=1;
    //跳跃系数
    public m_jumpCoffe=1;
    constructor(p_level:number,p_power:number,p_runCoffe:number,p_jumpCoffe:number) {
        this.m_level=p_level;
        this.m_power=p_power;
        this.m_runCoffe=p_runCoffe;
        this.m_jumpCoffe=p_jumpCoffe;
    }
}