/**
 * 微信平台的桥
 * 回调函数里不要用this,因为this是js函数fuction
 * wx的创建buttonAPI,采用的坐标系分辨率为Laya.Broweer.clientWidth,clientHeight,不是 540,960
 */
var WXPlatform = /** @class */ (function () {
    function WXPlatform() {
        //-----------------录音---
        //只要开启录音，我们就不会把他关掉了
        this.m_isRecord = false;
        this.m_isStop = false;
    }
    Object.defineProperty(WXPlatform, "inst", {
        get: function () {
            if (WXPlatform._inst == null) {
                WXPlatform._inst = new WXPlatform();
            }
            return WXPlatform._inst;
        },
        enumerable: true,
        configurable: true
    });
    WXPlatform.prototype.Initialize = function () {
        var wx = Laya.Browser.window.wx;
        if (wx) {
            wx.showShareMenu();
            wx.onShareAppMessage(function () {
                return {
                    title: "来自[转发按钮的分享]！",
                    imageUrl: "res/share1.jpg"
                };
            });
        }
    };
    //=============================暂停回调==============================
    WXPlatform.prototype.SetPauseCallback = function (callback) {
        var wx = Laya.Browser.window.wx;
        if (wx) {
            wx.onHide(function () {
                console.log("WXPlatform.wx.onHide");
                callback.run();
            });
        }
    };
    WXPlatform.prototype.Login = function (callback) {
        this.loginOKCB = callback;
        var wx = Laya.Browser.window.wx;
        if (!wx) {
            callback.runWith(false);
        }
        else {
            console.log("Login");
            wx.login({
                success: this.OnLoginOK
            });
        }
    };
    WXPlatform.prototype.OnLoginOK = function () {
        // console.log("WXPlatform.OnLoginOK",typeof this,this,this==WXPlatform.inst);
        var _this = this;
        var wx = Laya.Browser.window.wx;
        if (wx) {
            var button_1 = wx.createUserInfoButton({
                type: 'image',
                image: 'res/btn_login.png',
                style: {
                    left: (Laya.Browser.clientWidth - 192) / 2,
                    top: (Laya.Browser.clientHeight - 80) / 2,
                    width: 192,
                    height: 80
                }
            });
            //-
            button_1.onTap(function (res) {
                console.log("OnTabBtn", button_1, res);
                button_1.hide();
                button_1.destroy();
                WXPlatform.inst.userInfo = res.userInfo;
                console.log("userinfo", WXPlatform.inst.userInfo);
                WXPlatform.inst.loginOKCB.runWith(_this);
            });
        }
        else {
            console.log("WXPlatform.OnLoginOK ，不获取用户信息，直接进入游戏");
            WXPlatform.inst.loginOKCB.runWith(false);
        }
    };
    //=============================游戏论坛按钮==============================
    //创建游戏圈按钮，游戏论坛
    WXPlatform.prototype.ShowGameClubButton = function () {
        if (this.clubBtn) {
            this.clubBtn.show();
        }
    };
    WXPlatform.prototype.HideGameClubButton = function () {
        if (this.clubBtn) {
            this.clubBtn.hide();
        }
    };
    WXPlatform.prototype.CreateGameClubButton = function () {
        var wx = Laya.Browser.window.wx;
        if (wx) {
            this.clubBtn = wx.createGameClubButton({
                icon: 'light',
                style: {
                    left: 4,
                    top: 4,
                    width: 56,
                    height: 56
                }
            });
        }
    };
    //==================客服===============
    WXPlatform.prototype.Kefu = function () {
        console.log("Kefu");
        var wx = Laya.Browser.window.wx;
        if (wx) {
            console.log("!!", wx.openCustomerServiceConversation);
            wx.openCustomerServiceConversation({
                showMessageCard: true,
                sendMessageTitle: "反馈问题截图",
                // sendMessagePath:"res/share1.jpg",
                sendMessageImg: "res/share1.jpg" //这个是url,这个如果不传，发的是屏幕截图
            });
        }
    };
    //=============================发分享==============================
    //发邀请
    WXPlatform.prototype.Share = function (title, imageUrl, query) {
        console.log("Share");
        var wx = Laya.Browser.window.wx;
        if (wx) {
            wx.shareAppMessage({
                title: title,
                imageUrl: imageUrl,
                query: query
            });
        }
    };
    //=============================微信后台储存得分==============================
    //callback通知可以绘制排行榜了
    WXPlatform.prototype.SaveScore = function (score) {
        console.log("SaveScore", score);
        //存储的字段的名字
        var KEYNAME = "score";
        var wx = Laya.Browser.window.wx;
        if (!wx) {
            return;
        }
        var kvDataList = [{ key: "score", value: score.toString() }];
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
        });
    };
    //============================开放数据与绘图(未优化的)==============================
    //让odc知道我自己是谁
    WXPlatform.prototype.ODC_SetUserInfo = function () {
        var wx = Laya.Browser.window.wx;
        if (!wx) {
            return;
        }
        var odc = wx.getOpenDataContext();
        odc.postMessage({ cmd: "set_user_info", user_info: this.userInfo });
    };
    WXPlatform.prototype.ODC_DrawRank = function (pageIdx) {
        var wx = Laya.Browser.window.wx;
        if (!wx) {
            return;
        }
        var odc = wx.getOpenDataContext();
        //-
        var sc = odc.canvas;
        sc.width = 500;
        sc.height = 600;
        //-
        odc.postMessage({ cmd: "rank", score: GameData.inst.highCoinSD.value, page_idx: pageIdx });
    };
    WXPlatform.prototype.ODC_Clear = function (width, height) {
        this.SendCmdToODC("clear", width, height);
    };
    //========================hud数据==============================
    WXPlatform.prototype.ODC_InitHudData = function () {
        //this.SendCmdToODC("init_hud_data", 180, 120);
        var wx = Laya.Browser.window.wx;
        if (!wx) {
            return;
        }
        var odc = wx.getOpenDataContext();
        //-
        var sc = odc.canvas;
        sc.width = Laya.stage.width;
        sc.height = 120;
        var score = GameData.inst.highCoinSD.value;
        ;
        //-
        odc.postMessage({ cmd: "init_hud_data", score: score });
    };
    WXPlatform.prototype.ODC_UpdateHud = function () {
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
    };
    WXPlatform.prototype.SendCmdToODC = function (cmd, width, height) {
        var wx = Laya.Browser.window.wx;
        if (!wx) {
            return;
        }
        var odc = wx.getOpenDataContext();
        //-
        var sc = odc.canvas;
        sc.width = width;
        sc.height = height;
        //-
        odc.postMessage({ cmd: cmd });
    };
    //======================================游戏中排行榜
    WXPlatform.prototype.ODC_RankInGame = function (p_x) {
        var wx = Laya.Browser.window.wx;
        if (!wx) {
            return;
        }
        var odc = wx.getOpenDataContext();
        odc.postMessage({ cmd: "rank_in_game", p_x: p_x });
    };
    WXPlatform.prototype.ODC_RankInGameReset = function (p_score) {
        var wx = Laya.Browser.window.wx;
        if (!wx) {
            return;
        }
        var odc = wx.getOpenDataContext();
        //获取一下分数
        odc.postMessage({ cmd: "rank_in_game_reset", score: p_score });
    };
    WXPlatform.prototype.ODC_RankInGameExit = function () {
        var wx = Laya.Browser.window.wx;
        if (!wx) {
            return;
        }
        var odc = wx.getOpenDataContext();
        odc.postMessage({ cmd: "rank_in_game_exit" });
    };
    WXPlatform.prototype.InitVideoAD = function () {
        var _this = this;
        console.log("WXPlatform.InitVideoAD");
        //只需要初始化一次
        if (!OPEN_AD) {
            return;
        }
        var wx = Laya.Browser.window.wx;
        if (!wx) {
            return;
        }
        //-
        this.videoAD = wx.createRewardedVideoAd({ adUnitId: AD_UNIT_ID });
        //-
        this.videoAD.onClose(function (res) {
            // 用户点击了【关闭广告】按钮
            // 小于 2.1.0 的基础库版本，res 是一个 undefined
            if (res && res.isEnded || res === undefined) {
                console.log("ad正常播放完毕");
                // 正常播放结束，可以下发游戏奖励
                if (_this.videoADCloseCB) {
                    _this.videoADCloseCB.runWith(true);
                    _this.videoADCloseCB = null;
                }
            }
            else {
                console.log("ad播放中途退出");
                // 播放中途退出，不下发游戏奖励
                if (_this.videoADCloseCB) {
                    _this.videoADCloseCB.runWith(false);
                    _this.videoADCloseCB = null;
                }
            }
        });
    };
    WXPlatform.prototype.ShowVideoAD = function (callback) {
        var _this = this;
        console.log("WXPlatform.ShowViewAD");
        //只需要初始化一次
        if (!OPEN_AD) {
            return;
        }
        this.videoADCloseCB = callback;
        if (this.videoAD) {
            console.log("真正弹出广告");
            this.videoAD.show()
                .catch(function (err) {
                console.log("出错了", err);
                _this.videoAD.load()
                    .then(function () { return _this.videoAD.show(); });
            });
        }
        else { //TODO做个临时的假的，测试用
            console.log("模拟弹出广告");
            Laya.timer.frameOnce(180, this, function () { _this.videoADCloseCB.runWith(true); });
        }
    };
    WXPlatform.prototype.StartRecord = function () {
        var wx = Laya.Browser.window.wx;
        if (wx) {
            var recorderManager = wx.getRecorderManager();
            recorderManager.onStart(function () {
                console.log('recorder start');
            });
            recorderManager.onPause(function () {
                console.log('recorder pause');
            });
            recorderManager.onStop(function (res) {
                var tempFilePath = res.tempFilePath;
                wx.removeSavedFile({
                    filePath: res.tempFilePath,
                    complete: function (res) {
                        //如果真的是停止的，就不用重启了，如果不是停止的而是录音时间到了的就重新开始
                        if (this.m_isStop) {
                            this.m_isStop = false;
                        }
                        else {
                            WXPlatform.prototype.StartRecord();
                        }
                    }
                });
            });
            recorderManager.onFrameRecorded(function (res) {
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
            });
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
                else {
                    this.m_isRecord = true;
                    recorderManager.start(options);
                }
            }
        }
    };
    WXPlatform.prototype.RecorderPause = function () {
        var wx = Laya.Browser.window.wx;
        if (wx) {
            var recorderManager = wx.getRecorderManager();
            recorderManager.pause();
        }
    };
    WXPlatform.prototype.RecorderResume = function () {
        var wx = Laya.Browser.window.wx;
        if (wx) {
            var recorderManager = wx.getRecorderManager();
            recorderManager.resume();
        }
    };
    WXPlatform.prototype.RecorderStop = function () {
        var wx = Laya.Browser.window.wx;
        if (wx) {
            var recorderManager = wx.getRecorderManager();
            this.m_isStop = true;
            recorderManager.pause();
            //  recorderManager.stop();
        }
    };
    return WXPlatform;
}()); //end of class
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
//# sourceMappingURL=WXPlatform.js.map