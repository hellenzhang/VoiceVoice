import Stage = Laya.stage;
class MapManager {
    constructor(p_container:any) {
      this.InitSecenData();
      this.t_container=p_container;
    //   Laya.stage.addChild(p_container);
    }
    //记录当前所有的地图信息
    private m_allSceneDataArry:Array<SceneData>=new Array<SceneData>();

    //当前场景的数据信息
    private m_currentSecenData: SceneData;

    //当前所有地表
    private m_goundArry: Array<OneGournd> = new Array<OneGournd>();


    private t_bg: Laya.Sprite;

    private t_container: Laya.Sprite;// = new Laya.Sprite()

    private InitSecenData()
    {
        var  t_temp= Laya.loader.getRes("res/meta/all_map.json");
        for (var index = 0; index < t_temp["all"].length; index++) {
            var t_item= t_temp["all"][index];
            var t_oneScene=new SceneData(t_item);
            this.m_allSceneDataArry.push(t_oneScene);
        }

    }
    private GetSceneById(p_id:number):SceneData {
        for (var index = 0; index < this.m_allSceneDataArry.length; index++) {
            var element = this.m_allSceneDataArry[index];
            if(element.m_id==p_id)
            {
                return element;
            }
        }
        return null;
    }
    //创建地图信息
    public InitMap(p_secenId: number) {
       // Laya.DebugPanel.init();
        this.m_currentSecenData = this.GetSceneById(p_secenId);      
        
        //填充背景
      //  this.t_bg = new Laya.Sprite();
      //  this.t_bg.loadImage("res/bg00.png", 0, 0, GameWorld.inst.stageW, GameWorld.inst.stageH, Laya.Handler.create(this, this.LoadRes));
        // t_bg.size(Laya.stage.width,Laya.stage.height);
     

      this.LoadRes();

    }
    private LoadRes() {
       // this.t_container.addChild(this.t_bg);
       // Laya.stage.addChild(this.t_bg);
        //Laya.timer.frameLoop(1,this,this.LoopTest)
       // Laya.loader.load("comp/block0.png", Laya.Handler.create(this, this.StartFillMap));
        this.CreatGround(this.m_currentSecenData);
    }
    public Reset()
    {
          for (let index = 0; index < this.m_goundArry.length; index++) {
            var element = this.m_goundArry[index];
            element.Reset();
        }
    }

    //根据数据常见地貌
    private CreatGround(p_sceneData: SceneData) {
        for (let index = 0; index < p_sceneData.m_groundArry.length; index++) {
            var element = p_sceneData.m_groundArry[index];
            //创建地貌
            var t_tempGround=new OneGournd();
            t_tempGround.StartUp(element,this.t_container);
            this.m_goundArry.push(t_tempGround);
        }
    }

    //驱动移动
    public UpdateMove(p_movex:number,p_movey:number)
    {
        //1.移动所有地表
        for (let index = 0; index < this.m_goundArry.length; index++) {
            var element = this.m_goundArry[index];
            element.UpdateMove(p_movex,p_movey);
            element.CanRemove();
        }
    }
    //根据角色的位置获取高度信息
    public GetGroundHeight(p_x: number): number {
        var t_height=Laya.stage.height;
        //获取当前地图的高度信息
        for (let index = 0; index < this.m_goundArry.length; index++) {
            var element = this.m_goundArry[index];
            var t_result=element.GetGroundHeight(p_x);
            if(t_result!=-1&&t_result<t_height)
            {
                t_height=t_result;
            }
        }
        return t_height;
    }
        //根据角色的位置获取房顶信息
    public GetRoofHeight(p_x: number): number {
        //获取当前地图的高度信息
        for (let index = 0; index < this.m_goundArry.length; index++) {
            var element = this.m_goundArry[index];
            var t_result=element.GetRoofHeight(p_x);
            if(t_result!=-1)
            {
                return t_result;
            }
        }
        return 0;
    }
    //检测碰撞信息
    public CheckHit(p_x:number,p_y:number,p_height:number):boolean
    {
        if(p_y>=Laya.stage.height)
        {
            return true;
        }
         for (let index = 0; index < this.m_goundArry.length; index++) {
            var element = this.m_goundArry[index];
            var t_result=element.CheckIsHit(p_x,p_y,p_height);
            if(t_result)
            {
                return true;
            }         
        }
        return false;
    }
}