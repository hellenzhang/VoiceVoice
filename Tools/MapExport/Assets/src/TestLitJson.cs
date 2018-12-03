using UnityEngine;
using UnityEditor;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using LitJson;

public class TestJsContext
{
    public class JsTable
    {
        public string TestMember1 = string.Empty;
    }
    public class JsListElem
    {
        public int Key = 0;
        public string Val = string.Empty;
    }
    public string TestString = string.Empty;
    public TestJsContext.JsTable TestTable = new TestJsContext.JsTable();
    public List<TestJsContext.JsListElem> TestList = new List<TestJsContext.JsListElem>();
}

public class TestLitJson : MonoBehaviour
{
    private static TestJsContext customObj;
    [MenuItem("GameTools/Json/Test/LoadTestJson")]
    public static void MenuEventHandler_LoadTestJson()
    {
        string testJsonFilePath = Application.dataPath + "/test_litjson.json";
        string jsonContext = System.IO.File.ReadAllText(testJsonFilePath);
        customObj = JsonMapper.ToObject<TestJsContext>(jsonContext);
        if (null != jsonContext)
        {
            Debug.Log(string.Format("TestString:{0}", customObj.TestString));
            Debug.Log(string.Format("TestTable.TestMember1:{0}", customObj.TestTable.TestMember1));
            for (int i = 1; i < customObj.TestList.Count; ++i)
            {
                Debug.Log(string.Format("TestList[{0}]:{1},{2}", i, customObj.TestList[i].Key, customObj.TestList[i].Val));
            }
        }
        else
        {
            Debug.Log("jsonContext is null");
        }
    }
    [MenuItem("GameTools/Json/Test/SaveTestJson")]
    public static void SaveJson()
    {
        string testJsonFilePath = Application.dataPath + "/sv_litjson.json";
        //找到当前路径
        FileInfo file = new FileInfo(testJsonFilePath);
        //判断有没有文件，有则打开文件，，没有创建后打开文件
        StreamWriter sw = file.CreateText();
        //ToJson接口将你的列表类传进去，，并自动转换为string类型
        string json = JsonMapper.ToJson(customObj);
        //将转换好的字符串存进文件，
        sw.WriteLine(json);
        //注意释放资源
        sw.Close();
        sw.Dispose();
    }
}
