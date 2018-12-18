/**
 * 可以持久化的数据
 */
var SavedData = /** @class */ (function () {
    function SavedData(key, defaultValue) {
        if (defaultValue === void 0) { defaultValue = 0; }
        this.key = key;
        this.defaultValue = defaultValue;
        this.value = 0;
        this.value = this.defaultValue;
    }
    SavedData.prototype.DebugReset = function () {
        this.value = this.defaultValue;
        this.Save();
    };
    SavedData.prototype.Load = function () {
        var a = Laya.LocalStorage.getItem(this.key);
        if (a) {
            this.value = parseInt(a);
        }
        else {
            this.value = this.defaultValue;
        }
        console.log("读取数据", this.key, this.value);
    };
    SavedData.prototype.Save = function () {
        Laya.LocalStorage.setItem(this.key, this.value.toString());
        Laya.LocalStorage.setItem(this.key + "date", new Date().getTime().toString());
        console.log("存档数据", this.key, this.value);
    };
    return SavedData;
}());
//# sourceMappingURL=SavedData.js.map