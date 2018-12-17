/**
 * 游戏数据
 * 
 * 类比于虚幻的GameState,存储游戏全局信息
 */
class GameData {
    //-单例-
    private static _inst: GameData;
    public static get inst() {
        if (GameData._inst == null) {
            GameData._inst = new GameData();
        }
        return GameData._inst;
    }

    //=================================================
    //本次gamePlay的金币数--同比与其他数据
    public coin: number = 0;
    //单次gamePlay的最高成绩
    public highCoinSD: SavedData;

    //总金币数,自开始玩游戏以来的总金币数
    public totalCoinSD: SavedData;

    //本次gamePlay的关卡
    public stageLevel: number;

    //GamePlay用到的数据，Hero的数值，放到这里是因为有多个地方在用
    public isHeroDie=false;
    //最大能量
    public maxPower:number=500;
    //最小的开启加速的能量
    public minAddSpeedPower:number=50;
    //加速能量
    public speedPower:number=50;
    //加速时减少的能量
    public releasePowerIndex:number=0;
    //行走时增加的能量
    public addPowerRadioIndex:number=0;
    //初始化，从本地存储读取总分和最高分
    public Initialize() {
      
        //-金币
        this.highCoinSD = new SavedData("voice_high_score");
        this.totalCoinSD = new SavedData("voice_total_score",0);

        this.highCoinSD.Load();
        this.totalCoinSD.Load();

        console.log("GameData.initilize", this.highCoinSD.value, this.totalCoinSD.value);
    }

    //开始一局之前，在gamePlay.onShow里做,初始化本局的各种得分
    public StartGamePlay() {

        this.stageLevel =GameDebug.debugStageLevel;//跳关用

        this.coin = 0;

        this.isHeroDie=false;
        

    }

    public RefreshCoin(){
         if (this.coin > this.highCoinSD.value) {
            this.highCoinSD.value = this.coin;
        }
        this.totalCoinSD.value += this.coin;

        //存储
        this.SaveMoney();
    }

    //gamePlay一局结束之后，更新、保存各种数据
    public EndGamePlay() {
       
    }

    //保存钱币
    public SaveMoney() {
        this.highCoinSD.Save();
        this.totalCoinSD.Save();
    }
   
}
