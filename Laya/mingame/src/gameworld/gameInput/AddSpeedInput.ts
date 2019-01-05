/**
 * 加速输入处理
 */
class AddSpeedInput {
    //加速的速度系数
    private m_speedArry:Array<any>;
    //增加能量的系数数组
    private m_addPowerRadioArry:Array<any>;
    //减少能量的系数数组
    private m_releasePowerRadioArry:Array<any>;
    //加速系数
    public m_addPowerRadio;
    //减速系数
    public m_releasePowerRadio;
    constructor()
    {
         var t_temp = Laya.loader.getRes("res/meta/addSpeed.json");
         this.m_speedArry=t_temp["speed"];
         this.m_addPowerRadioArry=t_temp["addPower"];
         this.m_releasePowerRadioArry=t_temp["releasePower"]; 
         this.InitSpeedData();        
    }
   //初始化速度信息
    private InitSpeedData() {
        this.m_addPowerRadio=this.m_addPowerRadioArry[GameData.inst.addPowerRadioIndex];
          this.m_releasePowerRadio=this.m_releasePowerRadioArry[GameData.inst.releasePowerIndex];
    }
    //当前的加速
  private m_currentAddSpeed:number=0;
  //是否按下加速按钮
  private m_isPress=false;
  private m_uiAddSpeedSprite:Laya.Sprite;
   private m_uiCDSprite:Laya.Sprite;
  /**
   * 设置控制的UI图片
   */
  public SetUI(p_sprites,p_cdSprites)
  {
      this.m_uiAddSpeedSprite=p_sprites;
      this.m_uiCDSprite=p_cdSprites;
      this.SetUIState(this.CheckCanAddSpeed());
  }
  private SetUIState(p_isShow) {
       if (p_isShow) {
          this.m_uiAddSpeedSprite.visible=false;
          this.m_uiCDSprite.visible=true;
      }
      else
      {
          this.m_uiAddSpeedSprite.visible=true;
          this.m_uiCDSprite.visible=false;
      }
  }
  /**
   * GetAddSpeed
 :number  */
  public  GetAddSpeed():number {
      return this.m_currentAddSpeed;
  }
  /**
   * PressSpeedButton
   */
  public PressSpeedButton() {
      this.m_isPress=true;
      //如果能量大于0，那就能加速，
      if (this.CheckCanAddSpeed()) {
          //将来这个从存储数据
          var t_speedLevel=0;
          this.m_currentAddSpeed=this.m_speedArry[t_speedLevel];
      }
  }
  
  /**
   * ReleaseSpeedButton
   */
  public ReleaseSpeedButton() {
      this.m_isPress=false;
      this.m_currentAddSpeed=0;
      this.SetUIState(this.CheckCanAddSpeed());
     
  }
  /**
   * PowerOff
   */
  public CheckPowerOff() {
       if (GameData.inst.speedPower<=this.m_releasePowerRadio) {           
           if (this.m_currentAddSpeed!=0) {
               //能量不足===
                this.SetUIState(false);
           }
           this.m_currentAddSpeed=0;
      }
  }
  /**
   * Update
   */
  public Update() {
      //如果一直按着，那就测试是不是能量够了
     if (this.m_isPress&&this.m_currentAddSpeed==0) {
         this.PressSpeedButton();
     }
  }
  /**
   * 检测是否可以加速了
   */
  public CheckCanAddSpeed():boolean {
      if (GameData.inst.speedPower>=GameData.inst.minAddSpeedPower) {
           return true;
      }
      return false;
  }

}