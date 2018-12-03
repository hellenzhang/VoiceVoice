/**
 * hero,mob,boss,ghost,slime的父类
 * 描述信息，动画，碰撞信息，机炮位置
 */
class Actor extends GameSprite{

    //身体容器
    protected bodyLayer:Laya.Sprite;

    //key是aniUrl,<string,Laya.Animation>
    protected bodyAnimDict: Laya.Dictionary = null;
    //public是因为boss的state要用这个播放动画
    public bodyAnim: Laya.Animation = null;

    private metaID:number=-1;
    public meta:AvatarMeta=null;

    constructor(){
        super();

         this.spr = new Laya.Sprite();
       
        this.bodyLayer=new Laya.Sprite();
        this.spr.addChild(this.bodyLayer);

        this.bodyAnimDict = new Laya.Dictionary();
    }

    public ChangeAvatar(metaID:number){
        if(this.metaID==metaID){
            return;
        }
        this.metaID=metaID;
        this.meta=AvatarMeta.GetMeta(metaID);
       
        //avatar
        this.DoChangeAvatar(this.meta.json.anim_url);

       //-碰撞区域
       this.DoChangeHitRect();

    }

   

    protected DoChangeHitRect(){
         //碰撞区域
        this.hitRectCenterX=this.meta.json.hit_rect[0];
        this.hitRectCenterY=this.meta.json.hit_rect[1];
        this.hitRectWidth=this.meta.json.hit_rect[2];
        this.hitRectHeight=this.meta.json.hit_rect[3];
    }

    //改变外显
    protected currAniUrl:string=null;
    protected DoChangeAvatar( aniUrl:string){

        if(this.currAniUrl==aniUrl){
            return;
        }
        this.currAniUrl=aniUrl;

        if (this.bodyAnim) {
            this.bodyLayer.removeChild(this.bodyAnim);
            this.bodyAnim = null;
        }

        this.bodyAnim = this.bodyAnimDict.get(aniUrl);
        if(!this.bodyAnim){
             this.bodyAnim = new Laya.Animation();
             this.bodyAnim.loadAnimation(aniUrl);
            // this.bodyAnim.pivotX=10;
             this.bodyAnim.pivotY=100;
           
           // Laya.DebugPanel.init();
            this.bodyAnimDict.set(aniUrl, this.bodyAnim);
        }
        this.bodyLayer.addChild(this.bodyAnim);
        this.bodyAnim.play();
    }
}