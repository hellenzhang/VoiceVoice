/**
 * 粒子特效的父类
 * 这个要播放的是动画，需要动画播放完毕后再播放这个
 * 
 * 初始化添加放到业务逻辑去做
 * 
 * TODO 这里有些浪费，没有isActive来识别Update,没发现是瓶颈，不要处理
 */
abstract class SparksManager {

    protected sparkArr: Array<Spark> = null;
    
    constructor() {
        this.sparkArr = new Array<Spark>();
    }

    //构建容器
    protected abstract Initialize();

    protected GetFree(): Spark {
        for (let index = 0; index < this.sparkArr.length; index++) {
            let bb = this.sparkArr[index];
            if (bb.isActive== false) {
                return bb;
            }
        }
       // console.error("SparksManager.GetFree，对象池已满！");
        return null;
    }

    public Update() {
        // if(!this.isActive){
        //     return;
        // }
        for (let index = 0; index < this.sparkArr.length; index++) {
            let ss = this.sparkArr[index];
            if (ss != null) {
                if (ss.isActive) {
                    ss.Update();
                }
            }
        }
    }

    //游戏结束要清理下GameWorld,Active都设置为false,清理世界
    public Clear() {
        for (let index = 0; index < this.sparkArr.length; index++) {
            let ss = this.sparkArr[index];
            if (ss != null) {
                ss.SetActive(false);
            }
        }
    }
}