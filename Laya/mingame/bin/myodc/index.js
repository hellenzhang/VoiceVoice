/**
 * item特指一个条目{avatarUrl,nickname,openid,KVData{key:string,value:string}}
 * 
 * 排行榜只在第一次时拉取一次，以后缓存，排行时，玩家数据要传入，然后更新之
 * 
 * 尺寸按500*600来做
 */
var RandGameItem=require("./RankInGameItem.js");

//玩家(自己)信息，被外部传入，知道自己是谁
var userInfo; //

// //-好友数据数组，排序过的，{avatarUrl,nickname,openid,KVData{key:string,value:string}}
var friendItemArr;

//-
var hasGotRankData = false;

//玩家最高分，自己刷新排行榜用，排行版榜就取一次就可以了
var userScore = 0;

//-1表示默认显示前三名和自己，每页5个;其他表示页数
var rankPageIdx = -1;

//绘图时条目的间隔
var ITEM_GAP_Y = 120;

//var ITEM_HEIGHT = 120;
var userRankIdx = 0;

function onMsg(data) {
  //console.log("wx.onMessage", data);
  switch (data.cmd) {

    case "set_user_info": //预取数据，在封面的时候，loading的时候就提取，因为是多线程
      userInfo = data.user_info;
      break;

    case "rank": //game rank page

      userScore = data.score;//userHighCoin

      rankPageIdx = data.page_idx;
      if (rankPageIdx < -1) {
        rankPageIdx = -1;
      }

      exeCmd_drawRankList();

      break;

    case "init_hud_data": //提取排行榜数据，缓存
      InitRanKInGame();
    //  exeCmd_initHudData(data.score);
      break;
    case "update_hud": //左上角的标兵

      exeCmd_updateHud(data.score);
      break;
    case "rank_in_game":
      DrawRankInGame(data.p_x);
      break;
    case "rank_in_game_reset":
      FreshUserInGame(data.score);
      Reset();
      break;
    case "rank_in_game_exit":
      ExitInGame();
      break;

  }
}

//-监听来自主域消息
wx.onMessage(onMsg);


//获取玩家当前的rankIdx
function getUserRankIndex(dataArr) {

  //玩家信息没取到，默认展示前三
  if (!userInfo) {
    return 3;
  }
  var aa = -1;
  for (var i = 0; i < dataArr.length; i++) {
    var item = dataArr[i];
    //console.log(item.nickname, userInfo.nickName);
    if (item.nickname == userInfo.nickName) {
      aa = i;
      break;
    }
  }
  return aa;
}

//更新玩家自己数据,每次绘制排行榜的时候
function refreshUserScore() {

  for (var i = 0; i < friendItemArr.length; i++) {
    var item = friendItemArr[i];
    //console.log(item.nickname, userInfo.nickName);
    if (item.nickname == userInfo.nickName) {
      //item.KVDataList[0].value=userHighCoin;
      setScoreToItem(item, userScore);
      break;
    }
  }
}


//==============clear============
//-
function clear() {
  var sc = wx.getSharedCanvas();
  var ctx = sc.getContext('2d');

  ctx.fillStyle = "#ffff00";
  // ctx.fillRect(0,0,sc.width,sc.height);
  ctx.clearRect(0, 0, sc.width, sc.height);

  //console.log("clear", sc.width, sc.height);

}

//====================drawRank====================
function exeCmd_drawRankList() {
  // console.log("exeCmd_drawRank");

  clear();

  if (hasGotRankData) {
    console.log("fast draw");
    drawRankList();
  } else {
    fetchRankList(drawRankList);
  }
}

//提取好友得分数据,这个要预取。菜单界面就会提取
function fetchRankList(callback) {

  function onOK(res) {
    hasGotRankData = true;
    console.log("fetchData end", nowTime());

    friendItemArr = res.data;
    //friendDataArr.sort(func_sortItemByScore);

    if (callback) {
      callback();
    }
  }

  console.log("fetchData start ", nowTime());
  //读取数据
  wx.getFriendCloudStorage({
    keyList: ["score"],
    success: onOK
  });
}

//展示自己的前3和后一名
function drawRankList() {
  //更新自己数值
  refreshUserScore();
  //排序
  friendItemArr.sort(sortItemByScore);

  //获得自己的名次
  userRankIdx = getUserRankIndex(friendItemArr);

  //绘图
  var sc = wx.getSharedCanvas();
  var ctx = sc.getContext('2d');

  //展示
  if (rankPageIdx == -1) {//-1显示默认
    drawItem(0, 0, ctx);
    drawItem(1, 1, ctx);
    drawItem(2, 2, ctx);
    if (userRankIdx > 3) {
      drawItem(3, userRankIdx - 1, ctx);
    } else {
      drawItem(3, 3, ctx);
    }
    if (userRankIdx > 4) {
      drawItem(4, userRankIdx, ctx);
    } else {
      drawItem(4, 4, ctx);
    }
  } else {//其他值显示翻页值
    for (var i = 0; i < 5; i++) {
      drawItem(i, rankPageIdx * 5 + i + 3, ctx);
    }
  }

}

//index is posiIdx,rank is rankIdx
function drawItem(index, rank, ctx) {
  if (rank > friendItemArr.length - 1) {
    return;
  }
  if (rank < 0) {
    return;
  }

  var item = friendItemArr[rank];
  //console.log("drawRankItem", item);
  var tfColor = "#ffffff";
  if (rank == userRankIdx) {
    tfColor = "#ffff00";
  }

  //rank
  ctx.textAlign = "center";
  ctx.font = "60px Arial";
  ctx.fillStyle = tfColor;
  ctx.fillText(rank + 1, 40, 20 + index * ITEM_GAP_Y + 60);


  //avatar
  var img = wx.createImage();
  //if(item.avatarUrl && item.avatarUrl!="")
  img.src = item.avatarUrl;
  function onLoadOK() {
    ctx.drawImage(img, 140, 20 + index * ITEM_GAP_Y, 80, 80);

  }
  img.onload = onLoadOK;
  //name
  ctx.textAlign = "left";
  ctx.font = "20px Arial";
  ctx.fillStyle = tfColor;
  ctx.fillText(item.nickname, 240, 20 + index * ITEM_GAP_Y + 20);
  //score
  ctx.fillStyle = tfColor;
  ctx.font = "20px Arial";
  ctx.textAlign = "left";
  var score = getScoreFromItem(item);
  //ctx.fillText(item.KVDataList[0].value, 240, 60 + index * ITEM_GAP_Y + 20);
  ctx.fillText(score, 240, 60 + index * ITEM_GAP_Y + 20);
}

//---------------工具函数----------------
function getScoreFromItem(item) {
  var arr = item.KVDataList;
  for (var index = 0; index < arr.length; index++) {
    var ee = arr[index];
    if (ee.key == "score") {
      return parseInt(ee.value);
    }
  }
  return 0;
}

//刷新玩家本地分数用的
function setScoreToItem(item, score, plane) {
  var arr = item.KVDataList;
  for (var index = 0; index < arr.length; index++) {
    var ee = arr[index];
    if (ee.key == "score") {
      ee.value = score;

    }

  }

}


function nowTime() {
  return (new Date()).getTime();
}

function clamp(v, min, max) {
  if (v < min) {
    v = min;
  }
  if (v > max) {
    v = max;
  }
  return v;

}

//排序函数，必须是bb-aa
function sortItemByScore(a, b) {
  //var aa = a.KVDataList[0].value;
  //var bb = b.KVDataList[0].value;

  var aa = getScoreFromItem(a);
  var bb = getScoreFromItem(b);

  //console.log("!!", aa, bb);
  return bb - aa;
}

//=============================================================
///////////////////////////////////////////////////////////////
//=====================gamePlay左上角超越目标==========================
//======================超越目标数据======================
//================提取排行榜数据，以便确定榜样============

//面板的排行数据，只有score
var hudItemArr;

//榜样目标id,防止频繁重新绘图用的，
var currTargetItemOpenID;
var currTargetItem;

function exeCmd_initHudData(userScore) {
  //console.log("exeCmd_initHudData", userScore);

  clear();

  currTargetItemOpenID = null; //目标玩家id
  currTargetItem = null;

  function onOK(res) {
    // console.log("fetchData OK");

    hudItemArr = res.data;
    hudItemArr.sort(sortItemByScore);

    //
    exeCmd_updateHud(userScore);
  }

  //读取数据
  wx.getFriendCloudStorage({
    keyList: ["score"],
    success: onOK
  });
}

//==============updateHud==============
//更新我的榜样目标
function exeCmd_updateHud(userScore) {
  var rank = hudItemArr.length;//排名，先排在最后
  //console.log("exeCmd_updateHud",userScore);
  //找到目标数据
  for (var i = hudItemArr.length - 1; i >= 0; i--) {
    var item = hudItemArr[i];
    var otherScore = item.KVDataList[0].value;
    if (otherScore > userScore) {
      currTargetItem = item;
      rank = i;
      break;
    }
  }

  if (!currTargetItem && hudItemArr && hudItemArr.length > 0) {
    currTargetItem = hudItemArr[0];
    rank = 1;
  }

  //如果有变动则要更新
  if (currTargetItemOpenID != currTargetItem.openid) {
    currTargetItemOpenID = currTargetItem.openid;
    clear();
    //重绘
    drawTargetItem(currTargetItem, rank);
  }
}

//rank shi paiming
function drawTargetItem(item, rank) {
  var sc = wx.getSharedCanvas();
  var ctx = sc.getContext('2d');

  //avatar
  var img = wx.createImage();
 

  function onLoadOK() {
    ctx.drawImage(img, 10, 10, 70, 70);

    // //名次
    // ctx.globalAlpha = 0.8;
    // ctx.fillStyle = "#000000";
    // ctx.fillRect(10, 10 , ctx.measureText(rank).width, 24);
    // ctx.globalAlpha = 1;
    // ctx.font = "24px Impact";
    // ctx.fillStyle = "#ffff00";
    // ctx.textAlign = "left";
    // ctx.fillText(rank, 10+2, 10+24-2);
  }

  img.onload = onLoadOK;
   img.src = item.avatarUrl;

  //name
  ctx.font = "24px Impact";
  ctx.textAlign = "left";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(item.nickname, 10, 90 + 10 + 10);
  //score
  ctx.font = "40px Impact";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "left";
  ctx.fillText(item.KVDataList[0].value, 90, 35 + 40);



  //最高得分字
  //var img2 = wx.createImage();
  //img2.src = "res/ui_odc/img_high_card_fg.png";
  //img2.onload = () => {
  //  ctx.drawImage(img2, 0, 0); //, 70, 26);
  //};

}
//====================绘制游戏中的数据排行
var rankInGameArry=new Array();
//一页的大小，提前多加载多少路程
var onePageLength = Number(540);
//当前行走的页码
var currentPage = Number(-1);
//已经行走的步长
var totalLength=Number(270);
//总资源
var m_sourceArry=new Array();
/**
 * 初始化游戏
 */
function InitRanKInGame() {
   //加载资源
    if (m_sourceArry.length==0) {
         var t_image = wx.createImage();
         t_image.src = "res/foot.png";
          function onLoadOK() {
            m_sourceArry.push(t_image);
          }
          t_image.onload = onLoadOK;

         var t_imageborder = wx.createImage();
         t_imageborder.src = "res/borderLine.png";
          function onLoadOK() {
            m_sourceArry.push(t_imageborder);
          }
          t_imageborder.onload = onLoadOK;
    }

    function onOK(res) {    
    hudItemArr = res.data;
    hudItemArr.sort(sortItemByScore);
    DrawRankInGame(0);
  }

  //读取数据
  wx.getFriendCloudStorage({
    keyList: ["score"],
    success: onOK
  });
}
/**
 * 绘制游戏中的排行数据
 * @param {*} p_x, 屏幕的最右侧的距离，p_step步长
 */
function DrawRankInGame(p_x) {
  onePageLength=540
  //计算一共走的路程
  totalLength+=p_x;
  //检测是否需要下载新的页码了
  var t_page=parseInt(totalLength/onePageLength);
  //跟当前页做对比
  if (t_page!=currentPage) {
    currentPage=t_page;
    LoadRandInfo(t_page*onePageLength);
  }
  //清空，重汇
  clear();
  //1.移动 //2.删除
  for (var index = rankInGameArry.length-1; index >=0; index--) {
    var element = rankInGameArry[index];
    if (!element.m_canRemove) {
      element.Update(p_x);
    }
  }
}

//当时移动的距离
function LoadRandInfo(p_x) {
  //提前加载后面的距离，因为会一个page做一次加载，所以这里可以多加3个page的，这样就有两个page的缓冲
  var t_moreLength = 2*onePageLength;
  //1.根据位置信息，获取需要出现的人物
  //-好友数据数组，排序过的，{avatarUrl,nickname,openid,KVData{key:string,value:string}}
  for (var i = hudItemArr.length - 1; i >= 0; i--) {
    var item = hudItemArr[i];
    for (var index = 0; index < item.KVDataList.length; index++) {
      var element = item.KVDataList[index];
      //找到对应的键
      if (element.key == "score") {
        //对比当前数据,因为好友也就那几个，这里就不用做优化
        //获取当前数值大于上一次的距离，并且小于最大的10的距离，就把他加载出来[)左闭右开
        var t_pageLength=parseFloat(element.value)+270;
        if (t_pageLength >= p_x&&t_pageLength<p_x+t_moreLength) {
          //如果没有下载，那就开始添加
          var t_result=CheckContains(rankInGameArry,item.openid);
          if (t_result==null) {
            var t_itemRand=RandGameItem.CreatItem(item,onePageLength,t_pageLength-p_x,m_sourceArry);
            //加入队列
            rankInGameArry.push(t_itemRand);
            //下载
            t_itemRand.Load();
          }
          else
          {
            //如果包含的看看是不是重置过，如果重置过纠正回来
            if (t_result.m_isReset) {
              t_result.ResetLoad(t_pageLength-p_x);
            }
          }
        }
      }
    }
  }
}
function CheckContains(p_arry,p_openid) {
  for (var index = 0; index < p_arry.length; index++) {
    var element = p_arry[index];
    if (element.m_playerInfo.openid==p_openid) {
      return element;
    }
  }
  return null;
}
function Reset()
{
  totalLength=270;
  currentPage=-1;
  //我们只需要将已经加载出来的排行重新弄一下就行了
   for (var index = rankInGameArry.length-1; index >=0; index--) {
    var element = rankInGameArry[index];
      element.Reset();
  }
}
function ExitInGame()
{
  totalLength=270;
  currentPage=-1;
  rankInGameArry.length=0;
}
//如果是重新开始，本地缓存一下排行，如果是退出后开始就不要存了
function FreshUserInGame(p_data) {
  //找到自己
  for (var i = hudItemArr.length - 1; i >= 0; i--) {
    var item = hudItemArr[i];
    if (item.nickname == userInfo.nickname && item.avatarUrl == userInfo.avatarUrl) {
      for (var index = 0; index < item.KVDataList.length; index++) {
        var element = item.KVDataList[index];
        //找到对应的键
        if (element.key == "score") {
           element.value=p_data;
         }
      }
    }

  }
}