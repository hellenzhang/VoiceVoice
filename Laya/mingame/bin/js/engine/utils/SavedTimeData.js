var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/***存储有时间效益的数值 */
var SavedTimeData = /** @class */ (function (_super) {
    __extends(SavedTimeData, _super);
    function SavedTimeData(key, defaultValue) {
        if (defaultValue === void 0) { defaultValue = 0; }
        return _super.call(this, key, defaultValue) || this;
    }
    SavedTimeData.prototype.Load = function () {
        var a = Laya.LocalStorage.getItem(this.key);
        var t_date = Laya.LocalStorage.getItem(this.key + "date");
        if (t_date == null || t_date == "") {
            this.value = this.defaultValue;
        }
        else {
            //对比时间是否过期
            var t_datenum = parseInt(t_date);
            //小于一天
            if (GameUtils.CompareTime(new Date(), t_datenum, 86400000)) {
                this.value = parseInt(a);
            }
            else {
                this.value = this.defaultValue;
            }
        }
        console.log("读取数据", this.key, this.value);
    };
    SavedTimeData.prototype.Save = function () {
        _super.prototype.Save.call(this);
        Laya.LocalStorage.setItem(this.key + "date", GameUtils.GetOrderTime(new Date()).toString());
    };
    /**
     * 获取时间和数据的字符串，格式为数据_时间
     */
    SavedTimeData.prototype.GetDateValue = function () {
        return this.value + "_" + GameUtils.GetOrderTime(new Date());
    };
    return SavedTimeData;
}(SavedData));
//# sourceMappingURL=SavedTimeData.js.map