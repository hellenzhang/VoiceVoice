/**
 * 
 */

    import WebGL = Laya.WebGL;
const GAME_VER:string="ver 1.0";

class Main {

	 //-单例-
	 //单例只是为了pause,resume方便而做，gamePlayPage,gamePlayHudPanel.clickPause,WXPlatform.onHide等
    private static _inst: Main;
    public static get inst() {
        if (Main._inst == null) {
            Main._inst = new Main();
        }
        return Main._inst;
    }
	constructor() {}
	//-----------------

	private isRunning:boolean=false;

	public Startup(){
		
		//-
		this.InitLaya();

		let spr=new Laya.Sprite();
		spr.loadImage("res/bg00.png");
		Laya.stage.addChild(spr);
		spr.scale(10,20)

		//-
		WXPlatform.inst.Initialize();
		WXPlatform.inst.SetPauseCallback(Laya.Handler.create(this,this.OnPlatformPause,null,false));

		//从本地存储提取数据,这个在LoadingPage.OnHide()里处理，因为加载处理数据，需要
        GameData.inst.Initialize();

		//-
		SafeTimer.S_Initialize();

		//-
		GameAudio.inst.Init();
       
		//初始化pages
		this.InitPages();

		//初始化alert
		let alertLayer=new Laya.Sprite();
		Laya.stage.addChild(alertLayer);
		GameAlert.inst.Init(alertLayer);

		//刷帧
		Laya.timer.frameLoop(1, this, this.OnMainLoop);
		this.isRunning=true;

		//-打开启动界面
		GamePagesManager.inst.SwitchPage(GameLoadingPage.ID, null);
	}

	private InitLaya() {
		
		//初始化微信小游戏
		Laya.MiniAdpter.init();

		//程序入口,长宽是屏幕的
		let W = 540;//320;
		let H =960;// 568;

		console.log("启动尺寸",W,H,"真实",Laya.Browser.clientWidth,Laya.Browser.clientHeight,"onMobile:"+Laya.Browser.onMobile);

		//!!这里出过严重问题，如果使用Laya.WebGL则卡顿严重，30秒才能启动
		Laya.init(W, H);
		
		Laya.stage.bgColor = "#ff0000";
	}

	private InitPages() {
		GamePagesManager.inst.AddPage(new GameLoadingPage());
		GamePagesManager.inst.AddPage(new GameMenuPage());
		GamePagesManager.inst.AddPage(new GamePlayPage());
		GamePagesManager.inst.AddPage(new GameRankPage());
	}

	//--
	private OnMainLoop() {
		if(this.isRunning){
			//游戏逻辑
			GamePagesManager.inst.UpdatePage();
			//-
			GameAlert.inst.Update();
		}
	}

	//-----------------暂停和恢复---------------
	public Pause() {
		console.log("Main.Pause", Laya.timer.delta);

		if (GamePagesManager.inst.IsCurrPage(GamePlayPage.ID)) {
			//0,laya的timer.sacle
			Laya.timer.scale = 0;
			//1,running停掉
			this.isRunning = false;
			//2,GameWorld的deltaTime处理好,~~不用处理
			//3,SafeTime处理
			SafeTimer.S_Pause();
			let gamePlay = GamePagesManager.inst.GetPage(GamePlayPage.ID) as GamePlayPage;
			gamePlay.OnPause();
		}
	}

	public Resume() {
		console.log("Main.Resume", Laya.timer.delta);

		if (GamePagesManager.inst.IsCurrPage(GamePlayPage.ID)) {
			//0,Laya.timer.scale
			Laya.timer.scale = 1;
			//1,running
			this.isRunning = true;
			//3,safeTimer
			SafeTimer.S_Resume();
			let gamePlay = GamePagesManager.inst.GetPage(GamePlayPage.ID) as GamePlayPage;
			gamePlay.OnResume();
		}
	}

	private OnPlatformPause(){
		console.log("Main.OnPlatformPause");
		this.Pause();
	
	}
}


//======================总入口====================
console.log("Main.startup ",GAME_VER)
Main.inst.Startup();