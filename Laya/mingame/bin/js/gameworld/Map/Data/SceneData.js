//**场景数据，这里先做一个场景 */
var SceneData = /** @class */ (function () {
    function SceneData(p_data) {
        this.m_groundArry = new Array();
        this.m_id = p_data["m_id"];
        for (var index = 0; index < p_data["arry"].length; index++) {
            var element = p_data["arry"][index];
            var t_tempdata = new OnePieceData();
            t_tempdata.Init(element.m_id, element.m_groundPath, element.m_posx, element.m_posy, element.m_width, element.m_height, element.groundType, element["m_textArry"]);
            this.m_groundArry.push(t_tempdata);
        }
        // this.m_groundArry=new Array<OnePieceData>();
        // //设置场景长度
        // this.m_lenth = Laya.stage.width * 9;
        // //获取场景的组合信息
        // for (var index = 0; index < 9; index++) {
        //     //创建一个片元信息
        //     var t_tempdata = new OnePieceData();
        //     this.m_groundArry.push(t_tempdata);
        // }
        // //为每一个片段赋值---这个将来可以走配表的
        // this.m_groundArry[0].Init(1, "res/block0.png", 0, Laya.stage.height, 500, 200);
        // this.m_groundArry[1].Init(2, "res/block0.png", 700, Laya.stage.height, 300, 200);
        // this.m_groundArry[2].Init(3, "res/block0.png", 1100, Laya.stage.height, 300, 200);
        // this.m_groundArry[3].Init(4, "res/block0.png", 1500, Laya.stage.height, 300, 200);
        // this.m_groundArry[4].Init(5, "res/block0.png", 2000, Laya.stage.height, 300, 200);
        // this.m_groundArry[5].Init(5, "res/block0.png", 2500, Laya.stage.height, 300, 200);
        // this.m_groundArry[6].Init(5, "res/block0.png", 3000, Laya.stage.height, 200, 200);
        // this.m_groundArry[7].Init(5, "res/block0.png", 3300, Laya.stage.height, 200, 200);
        // this.m_groundArry[8].Init(5, "res/block0.png", 3600, Laya.stage.height, 300, 200); 
    }
    return SceneData;
}());
//# sourceMappingURL=SceneData.js.map