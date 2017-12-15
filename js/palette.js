
/*
绘制对象  2d

*/


function palette(cobj,canvas,copy){
	this.o=cobj;
	this.canvas=canvas;
	this.copy=copy;
	this.width=canvas.width;
	this.height=canvas.height;
	this.style="stroke";//stroke||fill
	this.type="polystar";//line||rect||circle||triangle||pencil||poly

	this.lineWidth=1;
	this.strokeStyle="#000000";
	this.fillStyle="#000000";
	this.status=[];
	this.bnum=5;//边数
	this.degs=5; //角数
	this.newstatus=[];
	this.rnum=20;
	/*1.鼠标抬起截图保留上次绘制结果
	2. 鼠标移动填充最后一次保留的截图

	getImageData(0,0,getImageData(0,0,that.width,that.height))  获取画布上制定区域的像素

	putImageData(imgData,0,0,0,0,that.width,that.height) 
	*/ 

}

//初始化

palette.prototype.draw= function(){
	var that=this;
	that.copy.onmousedown=function(e){
		var dx=e.offsetX;
		var dy=e.offsetY;
		that.init();
		document.onmousemove=function(e){
			that.o.clearRect(0,0,that.width,that.height);
			if(that.status.length>0){
				that.o.putImageData(that.status[that.status.length-1],0,0,0,0,that.width,that.height);
			}
			var mx=e.offsetX;
			var my=e.offsetY;
			that[that.type](dx,dy,mx,my);
		}
		document.onmouseup=function(){
			that.status.push(that.o.getImageData(0,0,that.width,that.height));
			document.onmousemove=null;
			document.onmouseup=null;
		}
	}
}
palette.prototype.line=function(x1,y1,x2,y2){
	this.o.beginPath();
	this.o.lineTo(x1,y1);
	this.o.lineTo(x2,y2);
	this.o.closePath();
	this.o.stroke();
}
palette.prototype.rect= function(x1,y1,x2,y2){
	var w=x2-x1;
	var h=y2-y1;
	this.o.beginPath();
	this.o.rect(x1-.5,y1-.5,w,h);
	this.o.closePath();
	this.o[this.style]();
}

palette.prototype.circle= function(x1,y1,x2,y2){
	var r=this._r(x1,y1,x2,y2);
	this.o.beginPath();
	this.o.arc(x1,y1,r,0,Math.PI*2);
	this.o.closePath();
	this.o[this.style]();
}
palette.prototype._r= function(x1,y1,x2,y2){
	return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
}
palette.prototype.triangle= function(x1,y1,x2,y2){
	this.o.beginPath();
	this.o.lineTo(x1,y1);
	this.o.lineTo(x2,y2);
	this.o.lineTo(x1,y2);
	this.o.closePath();
	this.o[this.style]();
}
/*圆角矩形*/
palette.prototype.rounded=function(x1,y1,x2,y2){
	var r=this.rnum;
	this.o.beginPath();
	this.o.moveTo(x1,y2-r);
	this.o.arcTo(x1,y1,x2,y1,r);
	this.o.arcTo(x2,y1,x2,y2,r);
	this.o.arcTo(x2,y2,x1,y2,r);
	this.o.arcTo(x1,y2,x1,y1,r);
	this.o.closePath();
	this.o[this.style]();
}
palette.prototype.pencil= function(x1,y1,x2,y2){
	var that=this;
	this.copy.onmousedown=function(e){
		 e.preventDefault();
		that.init();
		that.o.beginPath();
		document.onmousemove=function(e){
			 e.preventDefault();
			 if (that.status.length>0) 
 			{
 				that.o.putImageData(that.status[that.status.length-1],0,0,0,0,that.width,that.height);
 			}
			var mx=e.offsetX;
			var my=e.offsetY;
			that.o.lineTo(mx,my);
			that.o.stroke();
		}
		document.onmouseup=function(){
			that.status.push(that.o.getImageData(0,0,that.width,that.height));
			that.o.closePath();
			document.onmousemove=null;
			document.onmouseup=null;
		}
	}
}

palette.prototype.init= function(){
	this.o.strokeStyle=this.strokeStyle;
	this.o.fillStyle=this.fillStyle;
	this.o.lineWidth=this.lineWidth;
	this.o.bnum=this.bnum;
	this.o.type=this.type;
	this.o.degs=this.degs; //角数
}

//多边形
palette.prototype.poly= function(x1,y1,x2,y2){
	var r=this._r(x1,y1,x2,y2);
	var ang=360/this.bnum;
	var n=this.bnum;
	this.o.beginPath();
	for(var i=0;i<n;i++){
		this.o.lineTo(x1+Math.cos(Math.PI/180*ang*i)*r,y1+Math.sin(Math.PI/180*ang*i)*r);
	}
	this.o.closePath();
	this.o[this.style]();
}
//多角形
palette.prototype.polystar= function(x1,y1,x2,y2){
	var r=this._r(x1,y1,x2,y2);
	var r2=r*0.35;
	var ang=360/this.degs/2;
	var n=this.degs*2;
	this.o.beginPath();
	for(var i=0;i<n;i++){
		if(i%2==0){
		this.o.lineTo(x1+Math.cos(Math.PI/180*ang*i)*r,y1+Math.sin(Math.PI/180*ang*i)*r);	
		}else{
		this.o.lineTo(x1+Math.cos(Math.PI/180*ang*i)*r2,y1+Math.sin(Math.PI/180*ang*i)*r2);	
		}
	}
	this.o.closePath();
	this.o[this.style]();
}
/*  360/5 deg    多角形 两个圆  两个半径 */

palette.prototype.earser= function(){
	var w=30;
	var that=this;
		that.copy.onmousedown=function(e){
		 e.preventDefault();
		var dx=e.offsetX;
		var dy=e.offsetY;
		var a=$("<div id='earser'></div>");
		// var a=document.createElement("div");
		a[0].style.cssText="width:"+w+"px;height:"+w+"px;position: absolute;";
		that.copy.parentNode.appendChild(a[0]);
		document.onmousemove=function(e){
			 e.preventDefault();
			var mx=e.offsetX;
			var my=e.offsetY;
			a[0].style.left=mx-w/2+"px";
			a[0].style.top=my-w/2+"px";
			that.o.clearRect(mx-w/2,my-w/2,w,w);
		}
		document.onmouseup=function(){
			that.status.push(that.o.getImageData(0,0,that.width,that.height));
			that.copy.parentNode.removeChild(a[0]);
			document.onmousemove=null;
			document.onmouseup=null;
		}
	}
}


// 保存 
// canvas.toDataURL()把画布转换成 base64 url