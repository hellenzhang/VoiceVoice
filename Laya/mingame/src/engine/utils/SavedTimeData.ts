/***存储有时间效益的数值 */
class SavedTimeData extends SavedData {
    //存储的日期
    private m_date: number;
    constructor(key: string, defaultValue: number = 0) {
        super(key, defaultValue);

    }
    public Load() {
        let a = Laya.LocalStorage.getItem(this.key);
        var t_date = Laya.LocalStorage.getItem(this.key + "date");
        if (t_date == null || t_date == "") {
            this.value = this.defaultValue;
        }
        else  {
            //对比时间是否过期
            var t_datenum=parseInt(t_date);
            //小于一天
            if (GameUtils.CompareTime(new Date(),t_datenum,86400000)) {
                 this.value = parseInt(a);
            }
            else
            {
             this.value = this.defaultValue;
            }
        }
        console.log("读取数据", this.key, this.value);
    }
    public Save() {
        super.Save();
        Laya.LocalStorage.setItem(this.key + "date",GameUtils.GetOrderTime(new Date()).toString());
    }
    /**
     * 获取时间和数据的字符串，格式为数据_时间
     */
    public GetDateValue() {
        return this.value+"_"+GameUtils.GetOrderTime(new Date());
    }
}