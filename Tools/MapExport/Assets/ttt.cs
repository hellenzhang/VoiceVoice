using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ttt : MonoBehaviour {

	// Use this for initialization
	void Start () {
        RectTransform t_rt = GetComponent<RectTransform>();
		Debug.LogError("----:"+transform.localPosition+"  "+ t_rt.rect+"  "+t_rt.anchoredPosition);
	}
	
	// Update is called once per frame
	void Update () {
		
	}
}
