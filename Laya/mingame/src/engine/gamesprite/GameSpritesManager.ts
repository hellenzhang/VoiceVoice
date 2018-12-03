/**
 * 精灵管理器，只管理一类类型（比如怪，鸟，子弹），一次创建不再销毁
 * 超轻量的对象池，怪，hero弹，怪子弹都从这里来，只添加不销毁，一律update，无效就标志成isActive=false,可以被下次回收使用
 *40个以内是安全的，太大了之后，自行分析之
 *注意，启用前调用startup,不用了要调用clear
 */
class GameSpritesManager<T extends GameSprite>{

    //碰撞检测也会用到
     public isActive = false;

    public gameSpritesArr: Array<T> = null;

    constructor() {
        this.gameSpritesArr = new Array<T>();
        //因为泛型new不出T来，暂时不处理晦涩语法问题，手动写在子类里即可
    }

    protected AddToPool(gameSprite: T) {
        this.gameSpritesArr.push(gameSprite);
    }

    public Startup(){
        this.isActive=true;
    }

    protected GetFree(): T {
        for (let index = 0; index < this.gameSpritesArr.length; index++) {
            let bb = this.gameSpritesArr[index];
            if (bb.isActive == false) {
                return bb;
            }
        }
       // console.error("GameSpritesPool.GetFree，对象池已满！");
        return null;
    }

    public Update() {
       if(!this.isActive){
           return;
       }
        for (let index = 0; index < this.gameSpritesArr.length; index++) {
            let ss = this.gameSpritesArr[index];
            if (ss != null) {
                if (ss.isActive) {
                    ss.Update();
                }
            }
        }
    }

    

    public Render() {
        if(!this.isActive){
           return;
       }
        for (let index = 0; index < this.gameSpritesArr.length; index++) {
            let ss = this.gameSpritesArr[index];
            if (ss != null) {
                if (ss.isActive) {
                    ss.Render();
                }
            }
        }
    }

    //游戏结束要清理下GameWorld,Active都设置为false,清理世界
    public Clear() {

        this.isActive=false;
        
        for (let index = 0; index < this.gameSpritesArr.length; index++) {
            let ss = this.gameSpritesArr[index];
            if (ss != null) {
                ss.isActive=false;
            }
        }
    }

    //获取当前活跃数量
     public GetActiveGameSpritesCount():number{
        let count=0;
        for (let index = 0; index < this.gameSpritesArr.length; index++) {
            let bb = this.gameSpritesArr[index];
            if (bb.isActive ) {
                count++;
            }
        }
        return count;
    }

}