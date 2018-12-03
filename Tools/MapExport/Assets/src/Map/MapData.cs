using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

public class MapData
{
   public List<OneScene> all=new List<OneScene>();
}

public class OneScene
{
    public int m_id=0;
    public List<OneGround> arry = new List<OneGround>();
}

public class OneGround
{
    public int m_id;
    public string m_groundPath;
    public double m_posx;
    public double m_posy;
    public double m_width;
    public double m_height;
    public int groundType;
    //字体内容
    public string m_text;
    //字体内容
    public string m_textKey;
    //字体颜色
    public string m_textColor;
    //字体
    public double m_fontSize;
    //上边距
    public double m_upLength;
    //左边距
    public double m_leftLength;
}
