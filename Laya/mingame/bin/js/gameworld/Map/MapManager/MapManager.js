var Stage = Laya.stage;
var MapManager = /** @class */ (function () {
    function MapManager(p_container) {
        //记录当前所有的地图信息
        this.m_allSceneDataArry = new Array();
        //当前所有地表
        this.m_goundArry = new Array();
        this.InitSecenData();
        this.t_container = p_container;
        //   Laya.stage.addChild(p_container);
    }
    MapManager.prototype.InitSecenData = function () {
        var t_temp = Laya.loader.getRes("res/meta/all_map.json");
        for (var index = 0; index < t_temp["all"].length; index++) {
            var t_item = t_temp["all"][index];
            var t_oneScene = new SceneData(t_item);
            this.m_allSceneDataArry.push(t_oneScene);
        }
    };
    MapManager.prototype.GetSceneById = function (p_id) {
        for (var index = 0; index < this.m_allSceneDataArry.length; index++) {
            var element = this.m_allSceneDataArry[index];
            if (element.m_id == p_id) {
                return element;
            }
        }
        return null;
    };
    //创建地图信息
    MapManager.prototype.InitMap = function (p_secenId) {
        // Laya.DebugPanel.init();
        this.m_currentSecenData = this.GetSceneById(p_secenId);
        //填充背景
        //  this.t_bg = new Laya.Sprite();
        //  this.t_bg.loadImage("res/bg00.png", 0, 0, GameWorld.inst.stageW, GameWorld.inst.stageH, Laya.Handler.create(this, this.LoadRes));
        // t_bg.size(Laya.stage.width,Laya.stage.height);
        this.LoadRes();
    };
    MapManager.prototype.LoadRes = function () {
        // this.t_container.addChild(this.t_bg);
        // Laya.stage.addChild(this.t_bg);
        //Laya.timer.frameLoop(1,this,this.LoopTest)
        // Laya.loader.load("comp/block0.png", Laya.Handler.create(this, this.StartFillMap));
        this.CreatGround(this.m_currentSecenData);
    };
    MapManager.prototype.Reset = function () {
        for (var index = 0; index < this.m_goundArry.length; index++) {
            var element = this.m_goundArry[index];
            element.Reset();
        }
    };
    //根据数据常见地貌
    MapManager.prototype.CreatGround = function (p_sceneData) {
        for (var index = 0; index < p_sceneData.m_groundArry.length; index++) {
            var element = p_sceneData.m_groundArry[index];
            //创建地貌
            var t_tempGround = new OneGournd();
            t_tempGround.StartUp(element, this.t_container);
            this.m_goundArry.push(t_tempGround);
        }
    };
    //驱动移动
    MapManager.prototype.UpdateMove = function (p_movex, p_movey) {
        //1.移动所有地表
        for (var index = 0; index < this.m_goundArry.length; index++) {
            var element = this.m_goundArry[index];
            element.UpdateMove(p_movex, p_movey);
            element.CanRemove();
        }
    };
    //根据角色的位置获取高度信息
    MapManager.prototype.GetGroundHeight = function (p_x) {
        var t_height = Laya.stage.height;
        //获取当前地图的高度信息
        for (var index = 0; index < this.m_goundArry.length; index++) {
            var element = this.m_goundArry[index];
            var t_result = element.GetGroundHeight(p_x);
            if (t_result != -1 && t_result < t_height) {
                t_height = t_result;
            }
        }
        return t_height;
    };
    //根据角色的位置获取房顶信息
    MapManager.prototype.GetRoofHeight = function (p_x) {
        //获取当前地图的高度信息
        for (var index = 0; index < this.m_goundArry.length; index++) {
            var element = this.m_goundArry[index];
            var t_result = element.GetRoofHeight(p_x);
            if (t_result != -1) {
                return t_result;
            }
        }
        return 0;
    };
    //检测碰撞信息
    MapManager.prototype.CheckHit = function (p_x, p_y, p_height) {
        if (p_y >= Laya.stage.height) {
            return true;
        }
        for (var index = 0; index < this.m_goundArry.length; index++) {
            var element = this.m_goundArry[index];
            var t_result = element.CheckIsHit(p_x, p_y, p_height);
            if (t_result) {
                return true;
            }
        }
        return false;
    };
    return MapManager;
}());
//# sourceMappingURL=MapManager.js.map