/**
 * //---------------------计时器的实现---------------
 * 无gc,且安全，在update里做
 */
var SafeTimer = /** @class */ (function () {
    function SafeTimer() {
        //计时器的时间
        this.nextTimeSec = 0;
        this.enable = false; //紧急用，后续改好
        this.startTimeSec = 0;
        this.durSec = 0;
        //注册，为了pause,resume时处理
        SafeTimer.stArr.push(this);
    }
    SafeTimer.prototype.Start = function (sec) {
        this.startTimeSec = Laya.timer.currTimer * 0.001;
        this.durSec = sec;
        this.nextTimeSec = this.startTimeSec + this.durSec;
        this.enable = true;
    };
    SafeTimer.prototype.IsOK = function () {
        if (this.enable) {
            if (Laya.timer.currTimer * 0.001 > this.nextTimeSec) {
                this.enable = false;
                return true;
            }
        }
        return false;
    };
    SafeTimer.prototype.Percent = function () {
        if (this.enable) {
            var t_during = Laya.timer.currTimer * 0.001 - this.startTimeSec;
            var t_percent = t_during / this.durSec;
            return t_percent >= 1 ? 1 : t_percent;
        }
        return -1;
    };
    SafeTimer.prototype.Clear = function () {
        this.enable = false;
    };
    //延长时间
    SafeTimer.prototype.AppendTime = function (sec) {
        if (this.enable) {
            this.nextTimeSec += sec;
        }
    };
    //为了刷怪冲刺专用的
    SafeTimer.prototype.Scale = function (scale) {
        this.nextTimeSec = this.startTimeSec + this.durSec * scale;
    };
    SafeTimer.S_Initialize = function () {
        SafeTimer.stArr = new Array();
    };
    SafeTimer.S_Pause = function () {
        SafeTimer.pauseStartTimer = Laya.timer.currTimer;
    };
    SafeTimer.S_Resume = function () {
        var pausedTimer = Laya.timer.currTimer - SafeTimer.pauseStartTimer;
        SafeTimer.stArr.forEach(function (st) {
            if (st.enable) {
                //console.log("before", st.nextTimeSec);
                //st.nextTimeSec+=pausedTimer*0.001;
                st.AppendTime(pausedTimer * 0.001);
                //console.log("after",st.nextTimeSec);
            }
        });
    };
    return SafeTimer;
}());
//# sourceMappingURL=SafeTimer.js.map