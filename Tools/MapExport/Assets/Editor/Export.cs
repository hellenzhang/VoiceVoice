using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using LitJson;
using UnityEngine;
using UnityEditor;
using UnityEngine.UI;

public class Export : Editor {
    [MenuItem("Export/MapJson")]
    public static void SaveJson()
    {
        string testJsonFilePath = "E:/Engine/H5/client/VoiceVoice/Laya/mingame/bin/res/meta/all_map.json";
        //找到当前路径
        FileInfo file = new FileInfo(testJsonFilePath);
        //判断有没有文件，有则打开文件，，没有创建后打开文件
        StreamWriter sw = file.CreateText();
        //获取数据
        //ToJson接口将你的列表类传进去，，并自动转换为string类型
        string json = JsonMapper.ToJson(GetMapData());
        //将转换好的字符串存进文件，
        sw.WriteLine(json);
        //注意释放资源
        sw.Close();
        sw.Dispose();

        //替换

    }
    static string m_textKeyHead="m_textKeyHead";
    private static int m_textKeyIndex = 0;
    static MapData GetMapData()
    {
        m_textKeyIndex = 0;
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
            m_textKeyIndex++;
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
                Text t_text = t_rectTrans.gameObject.GetComponentInChildren<Text>();
                if (t_text != null)
                {
                    t_ground.m_text = t_text.text;
                    t_ground.m_textKey = m_textKeyHead+ m_textKeyIndex;
                    t_ground.m_fontSize = t_text.fontSize;
                    t_ground.m_textColor = "#" + ColorUtility.ToHtmlStringRGB(t_text.color);
                    t_ground.m_upLength = Math.Round(t_text.rectTransform.localPosition.x, 0);
                    t_ground.m_leftLength = Math.Round(t_text.rectTransform.localPosition.y, 0);
                }

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
                Text t_text = t_rectTrans.gameObject.GetComponentInChildren<Text>();
                if (t_text!=null)
                {
                    t_ground.m_text = t_text.text;
                    t_ground.m_textKey = m_textKeyHead + m_textKeyIndex;
                    t_ground.m_fontSize = t_text.fontSize;
                    t_ground.m_textColor = "#" + ColorUtility.ToHtmlStringRGB(t_text.color);
                    t_ground.m_upLength = Math.Round(t_text.rectTransform.localPosition.x, 0);
                    t_ground.m_leftLength = Math.Round(t_text.rectTransform.localPosition.y, 0);
                }
              
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
                Text t_text = t_rectTrans.gameObject.GetComponentInChildren<Text>();
                if (t_text != null)
                {
                    t_ground.m_text = t_text.text;
                    t_ground.m_textKey = m_textKeyHead + m_textKeyIndex;
                    t_ground.m_fontSize = t_text.fontSize;
                    t_ground.m_textColor = "#" + ColorUtility.ToHtmlStringRGB(t_text.color);
                    t_ground.m_upLength = Math.Round(t_text.rectTransform.localPosition.x, 0);
                    t_ground.m_leftLength = Math.Round(t_text.rectTransform.localPosition.y, 0);
                }
                t_scene.arry.Add(t_ground);
            }
        }
        return t_data;
    }
}
