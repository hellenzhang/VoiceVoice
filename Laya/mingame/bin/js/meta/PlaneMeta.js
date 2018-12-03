/**
 * 飞机的meta,hero,mob,boss都用这个
 */
var PlaneMeta = /** @class */ (function () {
    function PlaneMeta() {
    }
    PlaneMeta.GetMeta = function (id) {
        return PlaneMeta.metaDict.get(id);
    };
    PlaneMeta.Parse = function (json) {
        //console.log("PlaneMeta.Parse");
        PlaneMeta.metaDict = new Laya.Dictionary();
        var jmetaArr = json["meta_arr"];
        for (var i = 0; i < jmetaArr.length; i++) {
            var jj = jmetaArr[i];
            // console.log(jmeta);
            var mm = new PlaneMeta();
            mm.json = jj;
            mm.id = parseInt(jj["id"]);
            //-
            PlaneMeta.metaDict.set(mm.id, mm);
        }
    };
    //================静态方法==============
    //<id,meta>
    PlaneMeta.metaDict = null;
    return PlaneMeta;
}());
//# sourceMappingURL=PlaneMeta.js.map