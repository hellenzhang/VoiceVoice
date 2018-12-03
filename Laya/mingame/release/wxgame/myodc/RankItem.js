/**
 * 排行榜中的图片数据
 */
var Item = {
    //用户信息，每一页的数量，间距，是否是自己
    CreatItem: function (p_playerInfo,p_count,p_space,p_isSelf)  {
        var t_temp = {
            //存储的玩家数据--，{avatarUrl,nickname,openid,KVData{key:string,value:string}}
            m_playerInfo:p_playerInfo,
            m_hight:70,
            m_width:70,
            m_posx:0,
            m_posy:0,
            m_count:5,
            m_space:120,
            m_isSelf:false,
            //当前的图片信息
            m_image:null,
            m_sc:null,
            m_ctx:null,
        };
        //计算自己的位置信息
        t_temp.Init=function()
        {
            //根据自己的排名，计算自己的位置
        }
        t_temp.Load = function () {
            t_temp.sc = wx.getSharedCanvas();
            t_temp.ctx = t_temp.sc.getContext('2d');
            
            //绘制图像
            t_temp.m_image = wx.createImage();
            t_temp.m_image.src = t_temp.m_playerInfo.avatarUrl;
            function onLoadOK() {
                t_temp.m_isLoad = true;
            }
            t_temp.m_image.onload = onLoadOK;
        }
        //绘制
        t_temp.Draw=function () {
            
        }
        return t_temp;
    }
}
module.exports = Item;