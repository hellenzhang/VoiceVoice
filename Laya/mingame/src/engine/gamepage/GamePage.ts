/**
 * 游戏的一个页面，2D持有VIEW,gamePlay持有view和gameWorld
 * 
 * 
 * 注意，这个内部还有一个状态机，持有GamePagePhase,表示游戏page内的流程，比如gamePlay的云，清怪，boss战等
 */
 class GamePage {

    public rootUI: Laya.Sprite;

    public _isInited = false;//在GamePagesManager.switchPage的page.onShow之气，如果没调用过，会调用

    constructor(public pageID: string) {
        this.rootUI = new Laya.Sprite();

    }

    //在第一次onShow之前调用
    public  OnInit(){}

    public  OnShow(data: any){}

    public  OnHide(){}

    public  OnUpdate(){}

   
    //---------------GamePagePhase的实现-------------
    //-状态机，只有Boss用，
    private phaseArr: Array<GamePagePhase> = null;

    protected currPhase: GamePagePhase = null;

    public AddPhase(s: GamePagePhase) {

        if (this.phaseArr == null) {
            this.phaseArr = new Array<GamePagePhase>();
        }

        if (this.GetPhase(s.id) == null) {
            this.phaseArr.push(s);
        } else {
           // console.error("已有此状态");
        }
    }

    public UpdatePhase() {
        if (this.currPhase) {
            this.currPhase.OnUpdate();
        }
    }

    public SwitchPhase(id: string, data: any) {
       // console.log("SwitchPhase", id, Laya.timer.currTimer);
        if (this.currPhase) {
            this.currPhase.OnExit();
        }
        let s = this.GetPhase(id);
        if (s) {
            this.currPhase = s;
            this.currPhase.OnEnter(data);
        } else {
            //console.error("无此状态");
        }
    }

    public GetPhase(id: string): GamePagePhase {
        if (this.phaseArr) {
            for (let index = 0; index < this.phaseArr.length; index++) {
                let e = this.phaseArr[index];

                if (e.id == id) {
                    return e;
                }

            }
        }
        return null;
    }

    public IsCurrPahseID(id:string):boolean{
        if(this.currPhase){
            return this.currPhase.id==id;
        }
        return false;
    }
}