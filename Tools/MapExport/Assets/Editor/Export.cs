using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;
using LitJson;
using UnityEngine;
using UnityEditor;
using UnityEngine.UI;

public class Export : Editor {
    [MenuItem("Export/TTMapJson")]
    public static void test()
    {
        string hh = "TT456464846468486,TT45,";
        Debug.LogError(Regex.Unescape("sdasad\u7389\u54E5\u54E5\u5E05\u7389\u54E5\u54E5\u5E05"));
    }
  
    [MenuItem("Export/MapJson")]
    public static void SaveJson()
    {
        string testJsonFilePath = "E:/Engine/H5/client/VoiceVoice/Laya/mingame/bin/res/meta/all_map.json";
        if (File.Exists(testJsonFilePath))
        {
            File.Delete(testJsonFilePath);
        }
        //找到当前路径
        FileInfo file = new FileInfo(testJsonFilePath);
       
        //判断有没有文件，有则打开文件，，没有创建后打开文件
        StreamWriter sw = file.CreateText();
        //获取数据
        //ToJson接口将你的列表类传进去，，并自动转换为string类型
        MapData t_mapData = GetMapData();
        string json = JsonMapper.ToJson(t_mapData);
       // string  t_json= Regex.Unescape(json);
        ////由于存在Json中文存储乱码的问题，这里要把他替换掉
        //string[] t_jsonArry = json.Split(',');
        //string t_head = "\"m_text\":";
        //for (int i = 0; i < t_jsonArry.Length; i++)
        //{
        //    if (t_jsonArry[i].StartsWith(t_head))
        //    {
        //        string t_mid=GetValue(t_jsonArry[i], t_head+"\"","\"");
        //        string t_china= Regex.Unescape(t_mid);
        //    }
        //}
        sw.WriteLine(json);
        //注意释放资源
        sw.Close();
        sw.Dispose();


    }
    public static string GetValue(string str, string s, string e)
    {
        Regex rg = new Regex("(?<=(" + s + "))[.\\s\\S]*?(?=(" + e + "))", RegexOptions.Multiline | RegexOptions.Singleline);
        return rg.Match(str).Value;
    }
    static MapData GetMapData()
    {
        MapData t_data=new MapData();
      
        OneScene t_scene=new OneScene();
        t_data.all.Add(t_scene);
        GameObject t_g=GameObject.Find("Edit_Map");
        int t_floorIndex = 0;
        int t_roofIndex = 0;
        //找到地板
        Transform t_floor = GameObject.Find("Floor_Container").transform;
        //设置地板
        Transform[] t_allFloorArry = t_floor.GetComponentsInChildren<Transform>();
        for (int i = 0; i < t_allFloorArry.Length; i++)
        {
            RectTransform t_rectTrans= t_allFloorArry[i] as RectTransform;
            if (t_rectTrans.name.Contains("Data_floor"))
            {
                OneGround t_ground=new OneGround();
                t_ground.m_id = t_floorIndex++;
                t_ground.groundType = 0;
                t_ground.m_groundPath = "res/block0.png";
                t_ground.m_posx = Math.Round(t_rectTrans.localPosition.x, 0);
                t_ground.m_posy = Math.Round(960 - t_rectTrans.localPosition.y, 0);
                t_ground.m_width = Math.Round(t_rectTrans.rect.width, 0);
                t_ground.m_height = Math.Round(t_rectTrans.rect.height, 0);
                //查找文本--
                GetTextData(t_rectTrans,t_ground);
                t_scene.arry.Add(t_ground);
            }
        }
        //设置房顶
        Transform t_roof = GameObject.Find("Roof_Container").transform;
        Transform[] t_allRoofArry = t_roof.GetComponentsInChildren<Transform>();
        for (int i = 0; i < t_allRoofArry.Length; i++)
        {
            RectTransform t_rectTrans = t_allRoofArry[i] as RectTransform;
            if (t_rectTrans.name.Contains("Data_roof"))
            {
                OneGround t_ground = new OneGround();
                t_ground.m_id = t_floorIndex++;
                t_ground.groundType = 1;
                t_ground.m_groundPath = "res/block0.png";
                t_ground.m_posx = Math.Round(t_rectTrans.localPosition.x, 0);
                t_ground.m_posy = Math.Round(-t_rectTrans.localPosition.y, 0);
                t_ground.m_width = Math.Round(t_rectTrans.rect.width, 0);
                t_ground.m_height = Math.Round(t_rectTrans.rect.height, 0);
                GetTextData(t_rectTrans, t_ground);
                t_scene.arry.Add(t_ground);
            }
        }
        //设置火石
        Transform t_fireStone = GameObject.Find("FireStone_Container").transform;
        Transform[] t_allFireStoneArry = t_fireStone.GetComponentsInChildren<Transform>();
        for (int i = 0; i < t_allFireStoneArry.Length; i++)
        {
            RectTransform t_rectTrans = t_allFireStoneArry[i] as RectTransform;
            if (t_rectTrans.name.Contains("Data_fireStone"))
            {
                OneGround t_ground = new OneGround();
                t_ground.m_id = t_floorIndex++;
                t_ground.groundType = 2;
                t_ground.m_groundPath = "res/block1.png";
                t_ground.m_posx = Math.Round(t_rectTrans.localPosition.x, 0);
                t_ground.m_posy = Math.Round(-t_rectTrans.localPosition.y, 0);
                t_ground.m_width = Math.Round(t_rectTrans.rect.width, 0);
                t_ground.m_height = Math.Round(t_rectTrans.rect.height, 0);
                GetTextData(t_rectTrans, t_ground);
                t_scene.arry.Add(t_ground);
            }
        }
        return t_data;
    }

    static void GetTextData(Transform p_parent, OneGround p_ground)
    {
        Text[] t_textArry = p_parent.gameObject.GetComponentsInChildren<Text>();
        if (t_textArry != null)
        {
            for (int j = 0; j < t_textArry.Length; j++)
            {
                Text t_text = t_textArry[j];
                TextData t_td = new TextData();
                t_td.m_text = t_text.text;
                t_td.m_fontSize = t_text.fontSize;
                t_td.m_textColor = "#" + ColorUtility.ToHtmlStringRGB(t_text.color);
                t_td.m_leftLength = Math.Round(t_text.rectTransform.anchoredPosition.x, 0);
                t_td.m_upLength = Math.Round(t_text.rectTransform.anchoredPosition.y, 0);              
                p_ground.m_textArry.Add(t_td);
            }

        }
    }
}
