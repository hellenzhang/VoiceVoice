/**
 * 飞字管理器
 */
class FlytipsManager {

    private flytipsArr: Array<Flytip> = null;

    constructor(maxFlyTipCount:number) {
        this.flytipsArr = new Array<Flytip>();

        for (let index = 0; index < maxFlyTipCount; index++) {
            let f = new Flytip();
            this.AddToPool(f);
        }
    }

    public Show(text:string,durSec:number,x:number,y:number){
        let f=this.GetFree();
        if(f){
            f.Show(text,durSec,x,y)
        }else{
            //console.log("flytip对象池已满");
        }
    }

    private AddToPool(f: Flytip) {
        f.tf.visible = false;//可用
        this.flytipsArr.push(f);
    }


    private GetFree(): Flytip {
        for (let index = 0; index < this.flytipsArr.length; index++) {
            let bb = this.flytipsArr[index];
            if (bb.tf.visible == false) {
                return bb;
            }
        }
       // console.error("FlytipMgr.GetFree，对象池已满！");
        return null;
    }

    public Update() {

        for (let index = 0; index < this.flytipsArr.length; index++) {
            let ss = this.flytipsArr[index];

            if (ss.tf.visible) {
                ss.Update();
            }

        }
    }

    //游戏结束要清理下GameWorld,Active都设置为false,清理世界
    public Clear() {
        for (let index = 0; index < this.flytipsArr.length; index++) {
            let ss = this.flytipsArr[index];
            ss.tf.visible = false;
        }
    }
}