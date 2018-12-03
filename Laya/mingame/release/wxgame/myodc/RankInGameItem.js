
var Item = {
    CreatItem: function (p_playerInfo,p_pageLength,p_currentx,p_source)  {
        var t_temp = {
            //存储的玩家数据--，{avatarUrl,nickname,openid,KVData{key:string,value:string}}
            m_playerInfo:p_playerInfo,
            m_hight:70,
            m_width:70,
            //保留记录的原始的位置，复位后直接使用
            m_originX:p_currentx,
            //当前坐标的x值，小于0和自己宽度就会被干掉哦
            m_currentX:p_currentx,
            m_source:p_source,
            //边框
            m_borderImage:null,
            //脚丫子的图片
            m_footImage:null,
            //当前的图片信息
            m_image:null,
            //是否加载完成
            m_isLoad:false,
            //页面的大小
            m_pageLength:p_pageLength,
            //是否可以被移除
            m_canRemove:false,
            //是否被重置
            m_isReset:false,
            m_sc:null,
            m_ctx:null,
        };
        t_temp.Load = function () {
            t_temp.sc = wx.getSharedCanvas();
            t_temp.ctx = t_temp.sc.getContext('2d');

            //绘制图像
            t_temp.m_image = wx.createImage();
            t_temp.m_image.src = t_temp.m_playerInfo.avatarUrl;
            function onLoadOK() {
                t_temp.m_isLoad = true;
                t_temp.Update(0);
            }
            t_temp.m_image.onload = onLoadOK;
        }
        //复位，加载出来的就不用删除了
        t_temp.Reset=function()
        {
            t_temp.m_currentX=3000;
            t_temp.m_isReset=true;
        }
        //如果被重置过，需要重新赋值，但是加载过的就不要一直加载了
        t_temp.ResetLoad=function (p_x) {
            t_temp.m_canRemove = false;
            t_temp.m_isReset=false;
            t_temp.m_currentX=p_x;
        }
        t_temp.Update=function (p_x) {
            t_temp.m_currentX-=p_x;
            //1.判断时候该显示
            if (t_temp.m_currentX<=t_temp.m_pageLength+t_temp.m_hight&&t_temp.m_currentX>=-t_temp.m_width) {
                if (t_temp.m_isLoad) {
                    t_temp.ctx.drawImage(t_temp.m_image, t_temp.m_currentX, 10, t_temp.m_width, t_temp.m_hight);
                  t_temp.ctx.drawImage(t_temp.m_source[1], t_temp.m_currentX, 10, t_temp.m_width, t_temp.m_hight);
                    t_temp.ctx.font = "18px Impact";
                    t_temp.ctx.textAlign = "left";
                    t_temp.ctx.fillStyle = "#ffffff";
                    t_temp.ctx.fillText(t_temp.m_playerInfo.nickname, t_temp.m_currentX, t_temp.m_hight+ 30);                   
                    if (t_temp.m_currentX < t_temp.m_pageLength / 2)
                    {
                       //可以踩了
                      t_temp.ctx.drawImage(t_temp.m_source[0], t_temp.m_currentX, 10, t_temp.m_width, t_temp.m_hight);
                    }
                }               
            }
            else if (t_temp.m_currentX<-t_temp.m_width) {
                //可以删除了
                t_temp.m_canRemove=true;
            }
            else if(t_temp.m_currentX<t_temp.m_pageLength/2)
            {
                //可以踩了
                t_temp.ctx.font = "18px Impact";
                t_temp.ctx.textAlign = "center";
                t_temp.ctx.fillStyle = "#ff0000";
                t_temp.ctx.fillText("踩", t_temp.m_currentX, 10+t_temp.m_hight/2);
            }
        }
        return t_temp;
    }
}
module.exports = Item;