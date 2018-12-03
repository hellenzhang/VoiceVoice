var OnePieceData = /** @class */ (function () {
    function OnePieceData() {
        this.m_text = "\u7389\u54E5\u54E5\u5E05\u7389\u54E5\u54E5\u5E05";
    }
    /**
     * 地形初始化
     */
    OnePieceData.prototype.Init = function (t_id, t_groundPath, t_posx, t_posy, t_width, t_height, t_groundType) {
        // console.log("$$$$$$$$$$:"+t_id,t_groundPath,t_posx,t_posy,t_width,t_height);
        this.m_id = t_id;
        this.m_groundPath = t_groundPath;
        this.m_posx = t_posx;
        this.m_posy = t_posy;
        this.m_width = t_width;
        this.m_height = t_height;
        this.m_groundType = t_groundType;
    };
    return OnePieceData;
}());
var GroundTypeEnum;
(function (GroundTypeEnum) {
    //地板
    GroundTypeEnum[GroundTypeEnum["Floor"] = 0] = "Floor";
    //屋顶
    GroundTypeEnum[GroundTypeEnum["Roof"] = 1] = "Roof";
    //火石，碰到就死--火石锚点与屋顶一致，在左上
    GroundTypeEnum[GroundTypeEnum["FireStone"] = 2] = "FireStone";
})(GroundTypeEnum || (GroundTypeEnum = {}));
//# sourceMappingURL=OnePieceData.js.map