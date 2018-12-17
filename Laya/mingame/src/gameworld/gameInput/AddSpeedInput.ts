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
  }
  /**
   * PowerOff
   */
  public CheckPowerOff() {
       if (GameData.inst.speedPower<=this.m_releasePowerRadio) {
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
  private CheckCanAddSpeed():boolean {
      if (GameData.inst.speedPower>=GameData.inst.minAddSpeedPower) {
           return true;
      }
      return false;
  }

}