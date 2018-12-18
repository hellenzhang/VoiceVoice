/**
 * 封装了排行榜的sprite
 * 因为GameOverRank和GamePageRank都在用
 */
class RankPane extends Laya.Sprite {

    private rankSC: WXSCSprite;

    //20,190
    constructor() {
        super();

        this.rankSC = new WXSCSprite(500, 600);
        this.addChild(this.rankSC);
    }

    //true表示先把分数存一下，然后再get,这样提取数据比较准确
    public Show(needSaveCoin: boolean) {

        // //保存得分
        // if (needSaveCoin) {
        //     WXPlatform.inst.SaveScore(GameData.inst.highCoinSD.value);
        // }

        //退出的时候，sc要清理掉
        WXPlatform.inst.ODC_Clear(500, 600);
        //-
        this.rankSC.Clear();

    }

    //~show了以后，要turnPage
    public TurnPage(pageIdx: number) {
        WXPlatform.inst.ODC_DrawRank(pageIdx);
        this.rankSC.Start(0.5,6);
    }

    public Clear() {
        this.rankSC.Clear();
    }

    public Update() {
        this.rankSC.Update();
    }
}