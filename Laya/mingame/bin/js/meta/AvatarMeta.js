/**
 * 飞机的meta,hero,mob,boss都用这个
 */
var AvatarMeta = /** @class */ (function () {
    function AvatarMeta() {
    }
    AvatarMeta.GetMeta = function (id) {
        return AvatarMeta.metaDict.get(id);
    };
    AvatarMeta.Parse = function (json) {
        //console.log("AvatarMeta.Parse");
        AvatarMeta.metaDict = new Laya.Dictionary();
        var jmetaArr = json["meta_arr"];
        for (var i = 0; i < jmetaArr.length; i++) {
            var jj = jmetaArr[i];
            // console.log(jj);
            var mm = new AvatarMeta();
            mm.json = jj;
            mm.id = parseInt(jj["id"]);
            //-
            AvatarMeta.metaDict.set(mm.id, mm);
        }
    };
    //================静态方法==============
    //<id,meta>
    AvatarMeta.metaDict = null;
    return AvatarMeta;
}());
//# sourceMappingURL=AvatarMeta.js.map