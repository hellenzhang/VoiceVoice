/**
 * 加速输入处理
 */
var AddSpeedInput = /** @class */ (function () {
    function AddSpeedInput() {
        //当前的加速
        this.m_currentAddSpeed = 0;
        //是否按下加速按钮
        this.m_isPress = false;
        var t_temp = Laya.loader.getRes("res/meta/addSpeed.json");
        this.m_speedArry = t_temp["speed"];
        this.m_addPowerRadioArry = t_temp["addPower"];
        this.m_releasePowerRadioArry = t_temp["releasePower"];
        this.InitSpeedData();
    }
    //初始化速度信息
    AddSpeedInput.prototype.InitSpeedData = function () {
        this.m_addPowerRadio = this.m_addPowerRadioArry[GameData.inst.addPowerRadioIndex];
        this.m_releasePowerRadio = this.m_releasePowerRadioArry[GameData.inst.releasePowerIndex];
    };
    /**
     * 设置控制的UI图片
     */
    AddSpeedInput.prototype.SetUI = function (p_sprites, p_cdSprites) {
        this.m_uiAddSpeedSprite = p_sprites;
        this.m_uiCDSprite = p_cdSprites;
        this.SetUIState(this.CheckCanAddSpeed());
    };
    AddSpeedInput.prototype.SetUIState = function (p_isShow) {
        if (p_isShow) {
            this.m_uiAddSpeedSprite.visible = false;
            this.m_uiCDSprite.visible = true;
        }
        else {
            this.m_uiAddSpeedSprite.visible = true;
            this.m_uiCDSprite.visible = false;
        }
    };
    /**
     * GetAddSpeed
   :number  */
    AddSpeedInput.prototype.GetAddSpeed = function () {
        return this.m_currentAddSpeed;
    };
    /**
     * PressSpeedButton
     */
    AddSpeedInput.prototype.PressSpeedButton = function () {
        this.m_isPress = true;
        //如果能量大于0，那就能加速，
        if (this.CheckCanAddSpeed()) {
            //将来这个从存储数据
            var t_speedLevel = 0;
            this.m_currentAddSpeed = this.m_speedArry[t_speedLevel];
        }
    };
    /**
     * ReleaseSpeedButton
     */
    AddSpeedInput.prototype.ReleaseSpeedButton = function () {
        this.m_isPress = false;
        this.m_currentAddSpeed = 0;
        this.SetUIState(this.CheckCanAddSpeed());
    };
    /**
     * PowerOff
     */
    AddSpeedInput.prototype.CheckPowerOff = function () {
        if (GameData.inst.speedPower <= this.m_releasePowerRadio) {
            if (this.m_currentAddSpeed != 0) {
                //能量不足===
                this.SetUIState(false);
            }
            this.m_currentAddSpeed = 0;
        }
    };
    /**
     * Update
     */
    AddSpeedInput.prototype.Update = function () {
        //如果一直按着，那就测试是不是能量够了
        if (this.m_isPress && this.m_currentAddSpeed == 0) {
            this.PressSpeedButton();
        }
    };
    /**
     * 检测是否可以加速了
     */
    AddSpeedInput.prototype.CheckCanAddSpeed = function () {
        if (GameData.inst.speedPower >= GameData.inst.minAddSpeedPower) {
            return true;
        }
        return false;
    };
    return AddSpeedInput;
}());
//# sourceMappingURL=AddSpeedInput.js.map