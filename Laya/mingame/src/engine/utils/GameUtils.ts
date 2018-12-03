/**
 * 工具类
 */
class GameUtils {

	// //检查一下，防止重复设置
	// public static SetFilter(spr:Laya.Sprite,filters:Array<Laya.Filter>){
	// 	if(spr.filters!=filters){
	// 		spr.filters=filters;
	// 	}
	// }

	//创建并添加图层
	public static AddLayer(parent:Laya.Sprite):Laya.Sprite{
        let layer=new Laya.Sprite();
        parent.addChild(layer);
        return layer;
    }

	//!目前只处理0到180度，角度以外的没考虑
	//提取a到b的角度,注意atan返回的-90到90 各个象限真实值自己搞
	public static GetAngle(startX:number,startY:number,endX:number,endY:number):number{
		let dx=endX-startX;
		let dy=endY-startY;
		if(dx==0){
			if(dy>0){
				return 90;
			}else{
				return -90;
			}
		}else{
			let a= Laya.Utils.toAngle(Math.atan(dy/dx));
			if(dx<0&&dy>0){
				a+=180;
			}
			if(dx<0&&dy<0){
				a-=180;
			}
			return a;
		}
		
	}

	 //-hittet
    public static GetDistance2(x0:number,y0:number,x1:number,y1:number): number {
        let dx = x0-x1;
        let dy = y0-y1;
        let dist = dx * dx + dy * dy;
        return dist;
    }

	//两点的距离是否小于某半径
	public static IsInRadius(x0:number,y0:number,x1:number,y1:number,r:number):boolean{
		let d1=GameUtils.GetDistance2(x0,y0,x1,y1);
		let d2=r*r;
		return d1<=d2;
	}
	/**
	 * 在一个概率数组里，摇号，返回的是索引
	 * 比如[30,20,50],则以概率返回索引，0，1，
	 * !!注意为了简化使用和安全性，当概率都没命中时，返回0
	 */
	public static RandomRateArr(rateArr: Array<number>): number {
		let start: number = 1;
		let r = GameUtils.RandomInt(1, 100);
		for (var index = 0; index < rateArr.length; index++) {
			var end = rateArr[index] + start;
			if (r >= start && r < end) {
				return index;
			}
			start = end;
		}
		return 0;
	}
	/**
	 * 是否是此概率
	 * 
	 */
	public static IsRateOK(rate: number): boolean {
		let r = GameUtils.Random(1, 100);
		return r < rate;
	}

	//千分比概率
	public static IsRateOK1000(rate:number):boolean{
		let r = GameUtils.RandomInt(1, 1000);
		return r <= rate;
	}

	//a,b两个数组，a是概率，b是值，按a的概率返回b的内容
	//a:["apple","banana","orange"],b:[10,40,50],按b的概率返回app,banan或者orange
	public static GetRandomResult(a:Array<any>,b:Array<number>):any{
		let idx=GameUtils.RandomRateArr(b);
		return a[idx];
	}

	//专为粒子用的，注意鸟不要这样用
	public static IsOutOfStageBounds(x:number,y:number):boolean{
		let W=GameWorld.inst.stageW;
		let H=GameWorld.inst.stageH;

		if(x<0||x>W||y<0||y>H){
			return true;
		}
		return false;
	}

	
	//[min,max]
	public static Clamp(v: number, min: number, max: number): number {
		if (v < min) {
			v = min;
		}
		if (v > max) {
			v = max;
		}
		return v;
	}

	//左右滚值[min,max],不出超过一倍(max-min+1)
	public static Scroll(v: number, min: number, max: number): number {
		let count=max-min+1;
		if (v < min) {
			v=v+count;
		}
		if (v > max) {
			v =v-count;
		}
		return v;
	}

	public static SafeDivide(a: number, b: number): number {
		if (b == 0) {
			return 0;
		} else {
			return a / b;
		}
	}

	//返回[min,max],int
	public static RandomInt(min: number, max: number) {
		max += 1;
		return Math.floor(min + Math.random() * (max - min));
	}

	//返回[min,max)
	public static Random(min: number, max: number) {
		//max+=1;
		return min + Math.random() * (max - min);
	}

	//在扇形内随机生成一点(-160,-20)
	public static RandomInSector_PointTemp(fromRadius: number, toRadius: number, fromAngle: number, toAngle: number) {
		GameUtils.PolarToCart_PointTemp(GameUtils.Random(fromRadius, toRadius), GameUtils.Random(fromAngle, toAngle));
	}

	//在圆内随机生成一点(-160,-20)
	public static RandomInCircle_PointTemp(radius: number) {
		GameUtils.PolarToCart_PointTemp(GameUtils.Random(0, radius), GameUtils.Random(0, 360));
	}

	//-以固定速度向目标移动
	public static MoveTowards(x: number, target: number, speed: number): number {
		let deltaTimeSec: number = GameWorld.inst.deltaTimeSec;
		if (target - x > 0) {
			x += Math.abs(speed) * deltaTimeSec;
			if (x > target) {
				x = target;
			}
		} else if (target - x < 0) {
			x -= Math.abs(speed) * deltaTimeSec;
			if (x < target) {
				x = target;
			}
		}
		return x;
	}

	// //-弹簧系数移动到目标,springFactor,需要大于1，数字越小，移动越快
	// //返回x的新值
	// public static MoveTowardsSpring(x: number, target: number, springFactor: number = 3): number {

	// 	let deltaTimeSec: number = GameWorld.inst.deltaTimeSec;

	// 	let dist = target - x;
	// 	if (GameUtils.FloatEqual(dist, 0, 0.01)) {
	// 		return target;
	// 	}
	// 	let speed = dist / springFactor;

	// 	x += speed * deltaTimeSec;

	// 	return x;

	// }

	// //浮点相等判断,threhod是判断极限
	// public static FloatEqual(a: number, b: number, threhod: number): boolean {
	// 	return Math.abs(a - b) < threhod;

	// }

	//！！注意返回值存储在Point.TEMP里，为了减少gc
	public static PolarToCart_PointTemp(length: number, angle: number) {
		let rad: number = Laya.Utils.toRadian(angle);
		//console.log("PolarToCart",angle,rad);
		Laya.Point.TEMP.x = Math.cos(rad) * length;
		Laya.Point.TEMP.y = Math.sin(rad) * length;
	}

	//由左半部分的图片，合成出右半部分;最终图片由两片拼接出，居中
	//实验发现有条线
	public static CreateMirrorSprite(url:string):Laya.Sprite{
		let spr=new Laya.Sprite();
		let aa=GameUtils.CreateSprite(url,1);
		aa.pivotX=aa.width;
		let bb=GameUtils.CreateSprite(url,1);
		bb.pivotX=bb.width;
		
		//aa.x=-aa.width/2;
		//bb.x=aa.width/2-1;
		aa.x=0;
		bb.x=0;
		bb.scaleX=-1;
		
		spr.addChild(aa);
		spr.addChild(bb);
		return spr;
	}

	//工具函数，创建spr,要求资源要先加载进来，通过loader.getRes来做
	public static CreateSprite(url: string, scale: number): Laya.Sprite {
		let spr = new Laya.Sprite();

		spr.scaleX = spr.scaleY = scale;

		let texture = <Laya.Texture>Laya.loader.getRes(url);

		spr.graphics.drawTexture(texture);

		spr.pivotX = texture.width / 2;
		spr.pivotY = texture.height / 2;

		spr.width = texture.width;
		spr.height = texture.height;

		return spr;
	}

	public static SimpleCreateSprite(url: string): Laya.Sprite {
		let spr = new Laya.Sprite();

		let texture = <Laya.Texture>Laya.loader.getRes(url);

		spr.graphics.drawTexture(texture);

		spr.width = texture.width;
		spr.height = texture.height;

		return spr;
	}

}