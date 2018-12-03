using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

public class OtherClass
{
}

public class Bullet
{

    //碰撞的宽度
    public List<int> hit_rect;
    //子弹类型--类型不同，0.减速。1.定身。2.击退。
    public int m_bulletType;
    //子弹的伤害值
    public double m_hurt;
    //子弹的发射需要的能量
    public double m_sendPower;
    //文件路径
    public string m_path;
    //飞行速度
    public double m_speed;
    //效果数值
    public double m_effectValue;
    //死亡方式  1.碰到死亡 2.穿透
    public int m_dieType;
    //穿透的次数
    public int m_biteTimes;
}