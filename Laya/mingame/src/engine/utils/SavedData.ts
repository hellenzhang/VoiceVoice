/**
 * 可以持久化的数据
 */
class SavedData{

    public value:number=0;
  
    constructor(protected key:string,protected defaultValue:number=0){
        this.value=this.defaultValue;
    }

    public DebugReset(){
        this.value=this.defaultValue;
        this.Save();
    }

    public Load(){
        let a=Laya.LocalStorage.getItem(this.key);       
        if(a){
            this.value=parseInt(a);
        }else{
           this.value=this.defaultValue;
        }

        console.log("读取数据",this.key,this.value);
    }

    public Save(){
        Laya.LocalStorage.setItem(this.key,this.value.toString());
         console.log("存档数据",this.key,this.value);
    }
    
}