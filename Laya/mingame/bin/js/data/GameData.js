/**
 * 游戏数据
 *
 * 类比于虚幻的GameState,存储游戏全局信息
 */
var GameData = /** @class */ (function () {
    function GameData() {
        //=================================================
        //本次gamePlay的金币数--同比与其他数据
        this.coin = 0;
        //GamePlay用到的数据，Hero的数值，放到这里是因为有多个地方在用
        this.isHeroDie = false;
        //最大能量
        this.maxPower = 500;
        //最小的开启加速的能量
        this.minAddSpeedPower = 50;
        //加速能量
        this.speedPower = 50;
        //加速时减少的能量
        this.releasePowerIndex = 0;
        //行走时增加的能量
        this.addPowerRadioIndex = 0;
    }
    Object.defineProperty(GameData, "inst", {
        get: function () {
            if (GameData._inst == null) {
                GameData._inst = new GameData();
            }
            return GameData._inst;
        },
        enumerable: true,
        configurable: true
    });
    //初始化，从本地存储读取总分和最高分
    GameData.prototype.Initialize = function () {
        //-金币
        this.highCoinSD = new SavedData("voice_high_score");
        this.totalCoinSD = new SavedData("voice_total_score", 0);
        this.highCoinSD.Load();
        this.totalCoinSD.Load();
        console.log("GameData.initilize", this.highCoinSD.value, this.totalCoinSD.value);
    };
    //开始一局之前，在gamePlay.onShow里做,初始化本局的各种得分
    GameData.prototype.StartGamePlay = function () {
        this.stageLevel = GameDebug.debugStageLevel; //跳关用
        this.coin = 0;
        this.isHeroDie = false;
    };
    GameData.prototype.RefreshCoin = function () {
        if (this.coin > this.highCoinSD.value) {
            this.highCoinSD.value = this.coin;
        }
        this.totalCoinSD.value += this.coin;
        //存储
        this.SaveMoney();
    };
    //gamePlay一局结束之后，更新、保存各种数据
    GameData.prototype.EndGamePlay = function () {
    };
    //保存钱币
    GameData.prototype.SaveMoney = function () {
        this.highCoinSD.Save();
        this.totalCoinSD.Save();
    };
    return GameData;
}());
//# sourceMappingURL=GameData.js.map