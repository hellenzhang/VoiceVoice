var OnePieceData = /** @class */ (function () {
    function OnePieceData() {
        this.m_text = "\u7389\u54E5\u54E5\u5E05\u7389\u54E5\u54E5\u5E05";
        this.m_textArry = new Array();
    }
    /**
     * 地形初始化
     */
    OnePieceData.prototype.Init = function (t_id, t_groundPath, t_posx, t_posy, t_width, t_height, t_groundType, t_textArry) {
        // console.log("$$$$$$$$$$:"+t_id,t_groundPath,t_posx,t_posy,t_width,t_height);
        this.m_id = t_id;
        this.m_groundPath = t_groundPath;
        this.m_posx = t_posx;
        this.m_posy = t_posy;
        this.m_width = t_width;
        this.m_height = t_height;
        this.m_groundType = t_groundType;
        for (var index = 0; index < t_textArry.length; index++) {
            var element = t_textArry[index];
            var t_gtd = new GroundTextData(element.m_text, element.m_textColor, element.m_fontSize, element.m_upLength, element.m_leftLength);
            this.m_textArry.push(t_gtd);
        }
    };
    return OnePieceData;
}());
var GroundTextData = /** @class */ (function () {
    function GroundTextData(p_text, p_textColor, p_fontSize, p_upLength, p_leftLength) {
        this.m_text = p_text;
        this.m_textColor = p_textColor;
        this.m_fontSize = p_fontSize;
        this.m_upLength = p_upLength;
        this.m_leftLength = p_leftLength;
    }
    return GroundTextData;
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