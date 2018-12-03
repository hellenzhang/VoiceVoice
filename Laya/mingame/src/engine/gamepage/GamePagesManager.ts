/**
 * 管理各个Pages切换的管理器，跟GameWorld并存的全局高阶类
 * 注意使用前要Iniitialize一下
 */
class GamePagesManager{

     //-单例
    private static _inst: GamePagesManager;
    public static get inst() {
        if (GamePagesManager._inst == null) {
            GamePagesManager._inst = new GamePagesManager();
        }
        return GamePagesManager._inst;
    }
     //------------------状态机的实现-------------
    //-<pageID:string,GamePage>
    private pageDict: Laya.Dictionary = null;

    private currPage: GamePage = null;

    //放各个pagesLayer的容器
    public rootLayer:Laya.Sprite=null;

    constructor(){
         //-容器
        this.rootLayer = new Laya.Sprite();
        Laya.stage.addChild(this.rootLayer);
    }

    public AddPage(s: GamePage) {

        if (this.pageDict == null) {
            this.pageDict = new Laya.Dictionary();
        }

        if (this.GetPage(s.pageID) == null) {
            this.pageDict.set(s.pageID,s);
        } else {
            //console.error("已有此page");
        }
    }

    public UpdatePage() {
        if (this.currPage) {
            this.currPage.OnUpdate();
        }
    }

    public SwitchPage(id: string, data: any) {
        //console.log("SwtichPage", id, Laya.timer.currTimer);
        if (this.currPage) {
            this.currPage.OnHide();
            this.rootLayer.removeChild(this.currPage.rootUI);
        }
        let s = this.GetPage(id);
        if (s) {
            this.currPage = s;

            if(this.currPage._isInited==false){
                this.currPage._isInited=true;
                this.currPage.OnInit();
            }

             this.rootLayer.addChild(this.currPage.rootUI);
            this.currPage.OnShow(data);
        } else {
           // console.error("无此状态");
        }
    }

    public GetPage(id: string): GamePage {
        return this.pageDict.get(id);
       
    }

    public IsCurrPage(id:string):boolean{
        if(this.currPage){
            return this.currPage.pageID==id;
        }
        return false;
    }

}