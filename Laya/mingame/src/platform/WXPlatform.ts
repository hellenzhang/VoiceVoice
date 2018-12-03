/**
 * 微信平台的桥
 * 回调函数里不要用this,因为this是js函数fuction
 * wx的创建buttonAPI,采用的坐标系分辨率为Laya.Broweer.clientWidth,clientHeight,不是 540,960
 */
class WXPlatform {
    //-单例
    private static _inst: WXPlatform;
    public static get inst() {
        if (WXPlatform._inst == null) {
            WXPlatform._inst = new WXPlatform();
        }
        return WXPlatform._inst;
    }

    //-----------------

    public userInfo: any;

    constructor() { }

    public Initialize() {
        let wx = Laya.Browser.window.wx;
        if (wx) {

            wx.showShareMenu();

            wx.onShareAppMessage(function () {
                return {
                    title: "来自[转发按钮的分享]！",
                    imageUrl: "res/share1.jpg"

                }
            });
        }
    }

    //=============================暂停回调==============================
    public SetPauseCallback(callback: Laya.Handler) {

        let wx = Laya.Browser.window.wx;
        if (wx) {
            wx.onHide(() => {
                console.log("WXPlatform.wx.onHide");
                callback.run();
            }
            );
        }
    }

    //=============================登录==============================
    private loginOKCB: Laya.Handler;
    public Login(callback: Laya.Handler) {
        this.loginOKCB = callback;
        let wx = Laya.Browser.window.wx;
        if (!wx) {
            callback.runWith(false);
        } else {
            console.log("Login");
            wx.login({
                success: this.OnLoginOK
            })
        }
    }

    private OnLoginOK() {
        // console.log("WXPlatform.OnLoginOK",typeof this,this,this==WXPlatform.inst);


        let wx = Laya.Browser.window.wx;
        if (wx) {
            let button = wx.createUserInfoButton({
                type: 'image',
                image: 'res/btn_login.png',
                style: {
                    left: (Laya.Browser.clientWidth - 192) / 2,
                    top: (Laya.Browser.clientHeight - 80) / 2,
                    width: 192,
                    height: 80
                }
            })
            //-
            button.onTap((res) => {
                console.log("OnTabBtn", button, res);
                button.hide();
                button.destroy();
                WXPlatform.inst.userInfo = res.userInfo;
                console.log("userinfo", WXPlatform.inst.userInfo);
                WXPlatform.inst.loginOKCB.runWith(this);
            });

        } else {
            console.log("WXPlatform.OnLoginOK ，不获取用户信息，直接进入游戏");
            WXPlatform.inst.loginOKCB.runWith(false);
        }

    }

    //=============================游戏论坛按钮==============================
    //创建游戏圈按钮，游戏论坛
    public ShowGameClubButton() {
        if (this.clubBtn) {
            this.clubBtn.show();
        }
    }
    public HideGameClubButton() {
        if (this.clubBtn) {
            this.clubBtn.hide();
        }
    }
    private clubBtn: any;
    public CreateGameClubButton() {
        let wx = Laya.Browser.window.wx;
        if (wx) {
            this.clubBtn = wx.createGameClubButton({
                icon: 'light',
                style: {
                    left: 4,
                    top: 4,//Laya.Browser.clientHeight - 64 - 4,
                    width: 56,
                    height: 56
                }
            });
        }
    }

    //==================客服===============
    public Kefu() {
        console.log("Kefu");
        let wx = Laya.Browser.window.wx;
        if (wx) {
            console.log("!!", wx.openCustomerServiceConversation);
            wx.openCustomerServiceConversation({
                showMessageCard: true,
                sendMessageTitle: "反馈问题截图",
                // sendMessagePath:"res/share1.jpg",
                sendMessageImg: "res/share1.jpg"//这个是url,这个如果不传，发的是屏幕截图
            });
        }
    }

    //=============================发分享==============================
    //发邀请
    public Share(title: string, imageUrl: string, query: string) {
        console.log("Share");
        let wx = Laya.Browser.window.wx;
        if (wx) {
            wx.shareAppMessage({
                title: title,
                imageUrl: imageUrl,//"res/share1.jpg"
                query: query
            });
        }
    }

    //=============================微信后台储存得分==============================
    //callback通知可以绘制排行榜了
    public SaveScore(score: number) {
        console.log("SaveScore", score);
        //存储的字段的名字
        let KEYNAME = "score";

        let wx = Laya.Browser.window.wx;
        if (!wx) {
            return;
        }
        let kvDataList = [{ key: "score", value: score.toString() }];
        // kvDataList.push(
        //     { key: "score", value: highCoin.toString() },
        // );
        // { key: "total", value: totalCoin.toString() }
        wx.setUserCloudStorage({
            KVDataList: kvDataList,
            success: function (src) {
                console.log("setUserCloudStorage success", src);

            },
            fail: function (src) {
                console.log("setUserCloudStorage fail", src);
            }
        })
    }


    //============================开放数据与绘图(未优化的)==============================

    //让odc知道我自己是谁
    public ODC_SetUserInfo() {
        let wx = Laya.Browser.window.wx;
        if (!wx) {
            return;
        }

        let odc = wx.getOpenDataContext();
        odc.postMessage({ cmd: "set_user_info", user_info: this.userInfo });
    }

    public ODC_DrawRank(pageIdx: number) {
        let wx = Laya.Browser.window.wx;
        if (!wx) {
            return;
        }

        let odc = wx.getOpenDataContext();

        //-
        let sc = odc.canvas;
        sc.width = 500;
        sc.height = 600;

        //-
        odc.postMessage({ cmd: "rank", score: GameData.inst.highCoinSD.value, page_idx: pageIdx });
    }

    public ODC_Clear(width: number, height: number) {
        this.SendCmdToODC("clear", width, height);
    }

    //========================hud数据==============================
    public ODC_InitHudData() {
        //this.SendCmdToODC("init_hud_data", 180, 120);

        let wx = Laya.Browser.window.wx;
        if (!wx) {
            return;
        }

        let odc = wx.getOpenDataContext();

        //-
        let sc = odc.canvas;
        sc.width =Laya.stage.width;
        sc.height = 120;

        let score = GameData.inst.highCoinSD.value;;
        //-
        odc.postMessage({ cmd: "init_hud_data", score: score });
    }
    
    public ODC_UpdateHud() {
        //this.SendCmdToODC("update_hud", 180, 120);
        
        // let wx = Laya.Browser.window.wx;
        // if (!wx) {
        //     return;
        // }

        // let odc = wx.getOpenDataContext();

        // //-
        // let sc = odc.canvas;

        // //!!注意传入wh就会生成一张新的，导致闪烁
        // // sc.width = 180;
        // //  sc.height = 120;

        // let score = Math.max(GameData.inst.highCoinSD.value, GameData.inst.coin);
        // //-
        // odc.postMessage({ cmd: "update_hud", score: score });
    }


    private SendCmdToODC(cmd: string, width: number, height: number) {
        let wx = Laya.Browser.window.wx;
        if (!wx) {
            return;
        }

        let odc = wx.getOpenDataContext();

        //-
        let sc = odc.canvas;
        sc.width = width;
        sc.height = height;

        //-
        odc.postMessage({ cmd: cmd });
    }
    //======================================游戏中排行榜
    public ODC_RankInGame(p_x:number) {
         let wx = Laya.Browser.window.wx;
        if (!wx) {
            return;
        }
       let odc = wx.getOpenDataContext();
       odc.postMessage({ cmd: "rank_in_game", p_x:p_x });
    }
    public ODC_RankInGameReset(p_score) {
         let wx = Laya.Browser.window.wx;
        if (!wx) {
            return;
        }
       let odc = wx.getOpenDataContext();
       //获取一下分数
       odc.postMessage({ cmd: "rank_in_game_reset",score:p_score});
    }
    public ODC_RankInGameExit() {
        let wx = Laya.Browser.window.wx;
        if (!wx) {
            return;
        }
        let odc = wx.getOpenDataContext();
        odc.postMessage({ cmd: "rank_in_game_exit" });
    }
    //===================================视频广告(没调通)================================

    private videoAD: any;
    private videoADCloseCB: Laya.Handler;//视频广告被关闭的CD，可能播放完，也可能未完，参数true,false


    public InitVideoAD() {
        console.log("WXPlatform.InitVideoAD");
        //只需要初始化一次
        if (!OPEN_AD) {
            return;
        }

        let wx = Laya.Browser.window.wx;
        if (!wx) {
            return;
        }

        //-
        this.videoAD = wx.createRewardedVideoAd({ adUnitId: AD_UNIT_ID });
        //-
        this.videoAD.onClose(res => {
            // 用户点击了【关闭广告】按钮
            // 小于 2.1.0 的基础库版本，res 是一个 undefined
            if (res && res.isEnded || res === undefined) {
                console.log("ad正常播放完毕");
                // 正常播放结束，可以下发游戏奖励
                if (this.videoADCloseCB) {
                    this.videoADCloseCB.runWith(true);
                    this.videoADCloseCB = null;
                }
            }
            else {
                console.log("ad播放中途退出");
                // 播放中途退出，不下发游戏奖励
                if (this.videoADCloseCB) {
                    this.videoADCloseCB.runWith(false);
                    this.videoADCloseCB = null;
                }
            }
        })
    }

    public ShowVideoAD(callback: Laya.Handler) {
        console.log("WXPlatform.ShowViewAD");
        //只需要初始化一次
        if (!OPEN_AD) {
            return;
        }
        this.videoADCloseCB = callback;

        if (this.videoAD) {
            console.log("真正弹出广告");
            this.videoAD.show()
                .catch(err => {
                    console.log("出错了", err);
                    this.videoAD.load()
                        .then(() => this.videoAD.show())
                });
        } else {//TODO做个临时的假的，测试用
            console.log("模拟弹出广告");
            Laya.timer.frameOnce(180, this, () => { this.videoADCloseCB.runWith(true) });
        }
    }
    //-----------------录音---
    //只要开启录音，我们就不会把他关掉了
    private m_isRecord=false;
    private m_isStop=false;
    public StartRecord()
    {
         let wx = Laya.Browser.window.wx;
        if (wx) {
            const recorderManager = wx.getRecorderManager()

            recorderManager.onStart(() => {
            console.log('recorder start')
            })
            recorderManager.onPause(() => {
            console.log('recorder pause')
            })
            recorderManager.onStop((res) => {
            var tempFilePath = res.tempFilePath;
              wx.removeSavedFile({
                filePath: res.tempFilePath,
                complete(res) {
                  //如果真的是停止的，就不用重启了，如果不是停止的而是录音时间到了的就重新开始
                  if (this.m_isStop) {
                      this.m_isStop=false;
                  }
                  else
                  {
                    WXPlatform.prototype.StartRecord();
                  }
                 
                }
            })}
            )
            recorderManager.onFrameRecorded((res) => {
                var frameBuffer = res.frameBuffer;
                var decoder = Mp3.newDecoder(frameBuffer);
                var t_buf = decoder.decode();
                var ints = new Int16Array(t_buf, 0, t_buf.byteLength / 2);
                var t_totalNum = 0;
                for (var i = 0; i < ints.length; i++) {
                    t_totalNum += Math.abs(ints[i]);
                }
                t_totalNum /= ints.length;
                // var t_temp = GamePagesManager.inst.GetPage(GameMenuPage.ID);
                //t_temp.ShwoTest('----------ints.length' + ints.length + "   " + t_totalNum);
                GameWorld.inst.OnAudioBack(t_totalNum);
                // console.log('----------frameBuffer.byteLength', frameBuffer.byteLength)


            })

            var options = {
                duration: 60000,
                sampleRate: 32000,
                numberOfChannels: 1,
                encodeBitRate: 48000,
                format: 'mp3',
                frameSize: 0.5
            };
            if (this.m_isStop) {
                this.m_isStop = false;
                WXPlatform.inst.RecorderResume();
            }
            else {
                if (this.m_isRecord) {
                    WXPlatform.inst.RecorderResume();
                }
                else
                {
                 this.m_isRecord=true;
                 recorderManager.start(options);
                }
                 
            }
           

        }

        
    }
    public RecorderPause()  {
        let wx = Laya.Browser.window.wx;
        if (wx) {
            const recorderManager = wx.getRecorderManager();
            recorderManager.pause();
        }
    }
    public RecorderResume()  {
        let wx = Laya.Browser.window.wx;
        if (wx) {
            const recorderManager = wx.getRecorderManager();
             recorderManager.resume();
        }
    }
    public RecorderStop()  {
        let wx = Laya.Browser.window.wx;
        if (wx) {
            const recorderManager = wx.getRecorderManager();
            this.m_isStop=true;
            recorderManager.pause();
           //  recorderManager.stop();
        }
    }

}//end of class

// public ODC_InitHudData() {
//         //this.SendCmdToODC("init_hud_data", 180, 120);

//         let wx = Laya.Browser.window.wx;
//         if (!wx) {
//             return;
//         }

//         let odc = wx.getOpenDataContext();

//         //-
//         let sc = odc.canvas;
//         sc.width = 180;
//         sc.height = 120;

//         let score = GameData.inst.highCoinSD.value;;
//         //-
//         odc.postMessage({ cmd: "init_hud_data", score: score });
//     }

//     public ODC_UpdateHud() {
//         //this.SendCmdToODC("update_hud", 180, 120);

//         let wx = Laya.Browser.window.wx;
//         if (!wx) {
//             return;
//         }

//         let odc = wx.getOpenDataContext();

//         //-
//         let sc = odc.canvas;

//         let score = Math.max(GameData.inst.highCoinSD.value, GameData.inst.coin);
//         //-
//         odc.postMessage({ cmd: "update_hud", score: score });
//     }