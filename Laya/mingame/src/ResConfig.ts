/**
 * 资源清单配表
 */
//------------------------------------------
//==============================预加载资源===============================
    //-资源加载的地址,meta和image
    const RES_URL_ARR: string[] = [
        "res/block0.png",
         "res/block1.png",
         "res/bg00.png",
        //-meta
        "res/meta/plane_meta.json",
        "res/meta/all_map.json",
        "res/meta/audio_decode.json",
        "res/meta/addSpeed.json",
        //-
        "res/atlas/gameworld.atlas",

      
        //-hero
        "res/atlas/hero/hero_0.atlas",
       

        //-ui
        "res/atlas/ui/ui_common.atlas",
        "res/atlas/ui/ui_gamemenu.atlas",
        "res/atlas/ui/ui_gamerank.atlas",

        "res/img_cover0.png",
        "res/ui_odc/img_high_card_fg.png"
    ];

    //动画，预热用，单个动画解析230ms,极高
    const ANIM_URL_ARR: string[] = [
        "res/hero_ani/hero_0.ani",
       
        "res/mob_ani/mob_100.ani",
      
    ];

    //加载字体
    const FONT_INFO_ARR: any[] = [
        { url: "res/font/bf_24.json", name: "bf_24" },
        { url: "res/font/bf_36.json", name: "bf_36" },
        { url: "res/font/bf_big_digi.json", name: "bf_big_digi" },
    ];
