/**
 * 飞机的meta,hero,mob,boss都用这个
 */
class AvatarMeta {

    public json:any;

    public id: number;

    //================静态方法==============

    //<id,meta>
    private static metaDict: Laya.Dictionary = null;

    public static GetMeta(id: number): AvatarMeta {
        return AvatarMeta.metaDict.get(id);
    }

    public static Parse(json: any) {

        //console.log("AvatarMeta.Parse");

        AvatarMeta.metaDict = new Laya.Dictionary();


        let jmetaArr = json["meta_arr"];

        for (let i: number = 0; i < jmetaArr.length; i++) {
            let jj = jmetaArr[i];

            // console.log(jj);

            let mm = new AvatarMeta();

            mm.json=jj;

            mm.id = parseInt(jj["id"]);
           
            //-
            AvatarMeta.metaDict.set(mm.id, mm);
            
        }
    }
}