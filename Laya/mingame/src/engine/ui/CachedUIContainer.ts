/**
 * 高级用法，新手可以不用
 * 缓存容器，防止被gc收走用的
 * 多个ui频繁切换，比如主机商店左右翻页
 * type :spr anim
 */
class CachedUIContainer{
    //改变外显
     //key是aniUrl,<string,Laya.Animation>
    private sprDict: Laya.Dictionary = null;
    //public是因为boss的state要用这个播放动画
    private currSpr: Laya.Sprite = null;
     private currUrl:string=null;

    constructor(private type:string,private parent:Laya.Sprite){
        this.sprDict=new Laya.Dictionary();
    }

   
    public Change( url:string){

        if(this.currUrl==url){
            return;
        }
        this.currUrl=url;

        if (this.currSpr) {
            this.parent.removeChild(this.currSpr);
            this.currSpr = null;
        }

        this.currSpr = this.sprDict.get(url);
        if(!this.currSpr){
            switch(this.type){
                case "spr":
                this.currSpr=GameUtils.CreateSprite(this.currUrl,1);
                break;
                case "anim":
                let a= new Laya.Animation();
                a.loadAnimation(url);
                this.currSpr=a;
                a.play();
                break;
            }
            
             
            this.sprDict.set(url, this.currSpr);
        }
        this.parent.addChild(this.currSpr);
        //this.currSpr.play();
    }

}