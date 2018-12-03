/**
 * 9宫格的按钮，量不大，不用使用复杂优化
 * AutoBitmap来自laya.ui.js
 */
class Image9Grid extends Laya.Sprite{

     private _bitmap:Laya.AutoBitmap;

    //a是九宫格上下左右四个边距的距离
    constructor(private url:string,W:number,H:number,a:number){

        super();

        this.graphics=this._bitmap=new Laya.AutoBitmap();
        this._bitmap.source=<Laya.Texture>Laya.loader.getRes(url);
        this._bitmap.width=W;
        this._bitmap.height=H;
        this._bitmap.sizeGrid=[a,a,a,a,0];
        //鼠标点击用
       this.width=W;
       this.height=H;
    }

}
