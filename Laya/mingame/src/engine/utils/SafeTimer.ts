/**
 * //---------------------计时器的实现---------------
 * 无gc,且安全，在update里做
 */
class SafeTimer {
   
    //计时器的时间
    private nextTimeSec: number = 0;
    
    public enable = false;//紧急用，后续改好

    private startTimeSec:number=0;
    private durSec:number=0;

    constructor() { 
        //注册，为了pause,resume时处理
        SafeTimer.stArr.push(this);
    }

    public Start(sec: number) {

        this.startTimeSec= Laya.timer.currTimer * 0.001 ;
        this.durSec=sec;

        this.nextTimeSec =this.startTimeSec+this.durSec;

        this.enable = true;
    }

    public IsOK(): boolean {
        if (this.enable) {

            if (Laya.timer.currTimer * 0.001 > this.nextTimeSec) {
                this.enable = false;
                return true;
            }
        }
        return false;
    }
    public Percent():number
    {
        if(this.enable)
        {
            var t_during=  Laya.timer.currTimer * 0.001-  this.startTimeSec;
            var t_percent= t_during/this.durSec;
            return t_percent>=1?1:t_percent;
        }
        return -1;
    }

    public Clear() {
        this.enable = false;
    }

    //延长时间
    public AppendTime(sec:number){
        if(this.enable){
            this.nextTimeSec+=sec;
        }
    }

    //为了刷怪冲刺专用的
    public Scale(scale:number){
        this.nextTimeSec=this.startTimeSec+this.durSec*scale;
    }

    //=======================为相应微信全局的暂停，恢复而做====================
   //注册，为了pause,resume时处理
    private static stArr:Array<SafeTimer>;

    private static pauseStartTimer:number;//暂停开始的毫秒数
   
    public static S_Initialize(){
        SafeTimer.stArr=new Array<SafeTimer>();
    }
    public static S_Pause(){
        SafeTimer.pauseStartTimer=Laya.timer.currTimer;
    }
    public static S_Resume(){
        let pausedTimer=Laya.timer.currTimer-SafeTimer.pauseStartTimer;
        SafeTimer.stArr.forEach(st => {
            if(st.enable){
                //console.log("before", st.nextTimeSec);
                 //st.nextTimeSec+=pausedTimer*0.001;
                 st.AppendTime(pausedTimer*0.001);
                 //console.log("after",st.nextTimeSec);
            }
        });
    }
}