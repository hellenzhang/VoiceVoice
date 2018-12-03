/**
 * 金币图标按钮,方便快捷使用，规定背景图片和TF
 */
class CoinButton extends Laya.Sprite {

    public static GAP = 20;
    public static FONT = "bf_36";
    public static WIDTH = 220;
    public static HEIGHT = 80;
    public static BG_URL = "ui/ui_common/img_btn0_bg.png";
    public static COIN_ICON_URL = "ui/ui_common/img_coin.png";

    private tf: Laya.Text;

    constructor() {

        super();
        let gap = CoinButton.GAP;//图标距左边界的位置
        let bgUrl = CoinButton.BG_URL;
        let iconUrl = CoinButton.COIN_ICON_URL;
        let WW: number = CoinButton.WIDTH;
        let HH: number = CoinButton.HEIGHT;

        let bgImg = new Image9Grid(bgUrl, WW, HH, 20);
        bgImg.width = WW;
        bgImg.height = HH;
        bgImg.pivotX = WW / 2;
        bgImg.pivotY = HH / 2;

        //-前景图片可能有，也可能没有，有前景图片的是面板字用
        let iconImg = GameUtils.CreateSprite(iconUrl, 1);

        iconImg.x = WW / 2;
        iconImg.y = HH / 2;

        iconImg.x = WW - iconImg.width / 2 - gap;
        bgImg.addChild(iconImg);

        this.tf = UIUtils.CreateSimpleTextField(CoinButton.FONT, gap, 0, WW - gap * 2 - gap - iconImg.width, HH, bgImg);

        this.tf.align = "center";
        this.tf.valign = "middle";
        this.tf.changeText("000");
        bgImg.addChild(this.tf);

        //-
        iconImg.mouseEnabled = true;
        bgImg.mouseEnabled = true;
        this.tf.mouseEnabled = true;

        this.addChild(bgImg);

        this.width = CoinButton.WIDTH;
        this.height = CoinButton.HEIGHT;
    }

    public SetLabel(t: string) {
        this.tf.changeText(t);
    }
}