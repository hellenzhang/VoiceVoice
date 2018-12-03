/**
 * 音频管理器，单例
 */
class GameAudio {

    //-单例
    private static _inst: GameAudio;
    public static get inst() {
        if (GameAudio._inst == null) {
            GameAudio._inst = new GameAudio();
        }
        return GameAudio._inst;
    }

    constructor() { }

    public Init(){
        //音频
		Laya.SoundManager.autoReleaseSound=false;  

        this.enableSound=false;
        this.enableMusic=false;      
    }

    public enableSound:boolean=false;
    public enableMusic:boolean=true;

    private PlaySound(url:string):Laya.SoundChannel{
        if(!this.enableSound){
            return;
        }
         return Laya.SoundManager.playSound(url);
    }

    //-
    public EatCoin() {
        this.PlaySound("res/audio/sound/coin.wav");
    }
    public EatItem() {
        this.PlaySound("res/audio/sound/eat_item.wav");
    }
    

    public KillMob() {
        let sc=this.PlaySound("res/audio/sound/mob_die.wav");
      //  sc.volume=0.18;
    }

     public KillHero() {
        let sc=this.PlaySound("res/audio/sound/mob_die.wav");
      //  sc.volume=0.18;
    }
   
}