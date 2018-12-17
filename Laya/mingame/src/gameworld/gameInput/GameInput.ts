import Tween = Laya.Tween;
class GameInput {
    private that: any;
    private m_managerHandler: any;
    //解析类型，0表示按照能量解析，1表示按照常量解析,2根据配表解析
    private m_decodeType: number = 2;
    //记录上一次的时间
    private m_recordTime: number = 0;
    //当前的能量值
    private m_currentPow: number = 0;
    //记录当前的能量值
    private m_powerx: number=0;
    private m_powery: number=0;

    private m_sendTimer: SafeTimer;
    
    private m_inputStateEnum:InputStateEnum=InputStateEnum.Off;

    public m_runConstCoff=1;
    public m_jumpConstCoff=1;
    //声音解析
    private m_audioDecodeArry=new Array<AudioDecodeData>();

    private m_currentDecodeData:AudioDecodeData=null;

    //加速处理
    m_addSpeedInput:AddSpeedInput;
    constructor(that: any, p_handler: any) {
        this.that = that;
        this.m_managerHandler = p_handler;

        var t_temp = Laya.loader.getRes("res/meta/audio_decode.json");
        for (var index = 0; index < t_temp["para"].length; index++) {
            var t_item = t_temp["para"][index];
            for (var i = 0; i < t_item["powerRange"].length; i++) {
                var element = t_item["powerRange"][i];
                //解析输入控制函数
                var t_audioDd = new AudioDecodeData(element.level, element.power, element.runCoffe, element.jumpCoffe);
                this.m_audioDecodeArry.push(t_audioDd);
            }
        }
        this.m_sendTimer = new SafeTimer();
        Laya.stage.addChild(this.m_showTimeText);
        Laya.stage.addChild(this.m_showRunPower);
        Laya.stage.addChild(this.m_showJumpPower);
        Laya.stage.addChild(this.m_showInputPower);
        this.m_addSpeedInput=new AddSpeedInput();
    }
    //启动输入
    public StartUp() {
        //0.启动录音
        this.m_recordTime = Laya.timer.currTimer;
        //1.从微信中获取输入
        WXPlatform.inst.StartRecord();
        this.m_inputStateEnum=InputStateEnum.On;
    }
    /**
     * Pause
     */
    public Pause() {
        WXPlatform.inst.RecorderPause();
        this.m_inputStateEnum = InputStateEnum.Pause;
    }
    /**
     * Resume
     */
    public Resume() {
        
          WXPlatform.inst.RecorderResume();
          this.m_inputStateEnum=InputStateEnum.On;
    }
    /**
     * Stop
     */
    public Stop() {
          WXPlatform.inst.RecorderStop();
          this.m_inputStateEnum=InputStateEnum.Off;
    }
    //显示时间间隔
    public m_showTimeText = new Laya.Text;
    public m_showRunPower = new Laya.Sprite;
    public m_showJumpPower = new Laya.Sprite;

    public m_showInputPower = new Laya.Sprite;
    /**
     * GetAudioResult
     * --对应数据方式：0-200 无法行动
     * 200-1200 移动--移动速度递增，单位像素--
     * 1200--   跳跃--跳跃高度递增
     */
    public GetAudioResult(p_arry: any) {
        //记录获取时间
        var t_timeLength = Laya.timer.currTimer - this.m_recordTime;
        this.m_recordTime = Laya.timer.currTimer;
        //获取音频能量  
        this.m_currentPow = p_arry;
        //解析数据
        if (this.m_decodeType == 0) {
            this.DecodePow(p_arry);
            // this.DecodeConst(p_arry);
        }
        else if (this.m_decodeType == 1) {
            this.DecodeConst(p_arry);
        }
        else if(this.m_decodeType == 2)
        {
            this.DecodeByData(p_arry);
        }
        //发送数据
        this.m_sendTimer.Start(t_timeLength * 0.001);
        this.m_recordPowerx = 0;
        this.m_recordPowery = 0;
        this.m_showTimeText.y=150;
        var t_tempShow=Math.floor(t_timeLength);
        this.m_showTimeText.text = "频率:"+t_tempShow.toString()+"能量:"+Math.floor(p_arry);
        this.m_showInputPower.graphics.clear();
        this.m_showInputPower.graphics.drawLine(0, 180,0+(p_arry / 100),180, "#0000ff", 4);
    }
    private DecodeByData(p_power: number) {
        //获取配置表
        for (var index = this.m_audioDecodeArry.length-1; index>=0; index--) {
            var element =  this.m_audioDecodeArry[index];
            // console.log("***************:"+p_power,element.m_power,element.m_level);
            if(p_power>=element.m_power)
            {               
                this.m_currentDecodeData=element;
                break;
            }            
        }
    }
    //解析为常量--
    private DecodeConst(p_power: number) {
        //行走域
        var t_minRunPower = 400; var t_maxRunPower = 1200; //var t_runCoeffi = 1;
        //跳跃能量，能量高度
        var t_JumpPower = 400; //var t_jumpCoeffi = 1;
        if (p_power <= t_minRunPower) {
            this.m_powerx = 0;
            this.m_powery = 0;
        }
        else {
            //行走没有问题。
            this.m_powerx = this.m_runConstCoff;
            if (p_power >= t_maxRunPower + t_JumpPower) {
                //可以跳跃了
                var t_jumpCount = (p_power - t_maxRunPower) / t_JumpPower;
                this.m_powery = t_jumpCount*this.m_jumpConstCoff;
            }
            else {
                this.m_powery = 0;
            }
        }

    }
    //根据能量解析
    private DecodePow(p_power: number) {

        var t_minRunPower = 400; var t_maxRunPower = 1200; var t_runCoeffi = 0.1;

        var t_jumpCoeffi = 0.01;
        if (p_power - t_minRunPower <= 0) {
            //能量，不能走，不能跳
            this.m_powerx = 0;
            this.m_powery = 0;
        }
        else {
            //如果正在跳跃中，暂时不接受任何输入
            if (!GameWorld.inst.hero.m_isJumping) {
                if ((p_power - t_maxRunPower) > 0) {
                    //可以跳了
                    this.m_powery = (p_power - t_maxRunPower) * t_jumpCoeffi;
                    this.m_powerx = t_maxRunPower * t_runCoeffi;
                }
                else {
                    this.m_powerx = p_power * t_jumpCoeffi;
                }

            }

        }
    }



    private m_recordPowerx: number;
    private m_recordPowery: number;
    public SendInput() {
      // console.log("=======:" + t_x + "  " + t_y, this.m_powerx, this.m_powery);
        if (this.m_decodeType == 0) {
            //这里应该是获取到微信的音频输入的bug，获取到分贝,
            if (this.m_sendTimer.enable && !this.m_sendTimer.IsOK()) {
                  var t_x = 0; var t_y = 0;
                //计算当前帧应该发送多少x移动
                var t_thisPower = this.m_sendTimer.Percent() * this.m_powerx;
                t_x = t_thisPower - this.m_recordPowerx;
                this.m_recordPowerx = t_thisPower;
                ////计算当前帧应该发送多少y移动

                var t_thisPowery = this.m_sendTimer.Percent() * this.m_powery;
                t_y = t_thisPowery - this.m_recordPowery;
                this.m_recordPowery = t_thisPowery;
                //发送
                if (this.m_managerHandler) {
                    this.m_showRunPower.graphics.clear();
                    this.m_showJumpPower.graphics.clear();
                    this.m_showRunPower.graphics.drawLine(50, 10, 50, 10 + (this.m_powerx - t_thisPower), "#ff0000", 4);
                    this.m_showJumpPower.graphics.drawLine(60, 10, 60, 10 + (this.m_powery - t_thisPowery), "#00ff00", 4);
                  //  console.log(" ++++:" + t_x + "  " + t_y, this.m_powerx, this.m_powery);
                    this.m_managerHandler.call(this.that, t_x, t_y);
                }
                //  console.log(" Percent:"+this.m_sendTimer.Percent()+"   "+this.m_powery+"  "+t_thisPowery+"  "+t_y);

            }
        }
        else if (this.m_decodeType == 1) {
            var t_x = 0; var t_y = 0;
            t_x = this.m_powerx;
            t_y = this.m_powery;
            //发送
            if (this.m_managerHandler) {
                this.m_showRunPower.graphics.clear();
                this.m_showJumpPower.graphics.clear();
                this.m_managerHandler.call(this.that, t_x, t_y);
            }
        }
        else if (this.m_decodeType == 2) {   
            //发送
            if (this.m_managerHandler&&this.m_currentDecodeData&&this.m_inputStateEnum==InputStateEnum.On) {
               //获取x输入
               var x_input=this.m_currentDecodeData.m_runCoffe+this.m_addSpeedInput.GetAddSpeed();
               //增加能量--根据行走的距离乘以系数
               GameData.inst.speedPower+=this.m_addSpeedInput.m_addPowerRadio*x_input;
               GameData.inst.speedPower=GameData.inst.speedPower>GameData.inst.maxPower?GameData.inst.maxPower:GameData.inst.speedPower;
               //减少能量
               if (this.m_addSpeedInput.GetAddSpeed() > 0) {
                   //减少能量                  
                   GameData.inst.speedPower -= this.m_addSpeedInput.m_releasePowerRadio*x_input;
                    GameData.inst.speedPower= GameData.inst.speedPower<0?0:GameData.inst.speedPower;
                   //检测是否可以继续
                   this.m_addSpeedInput.CheckPowerOff();
               }
               this.m_addSpeedInput.Update();
               this.m_managerHandler.call(this.that, x_input, this.m_currentDecodeData.m_jumpCoffe);
            }
        }

       

    }

}
enum InputStateEnum
{
    Off,
    On,
    Pause,
    Stop,
}