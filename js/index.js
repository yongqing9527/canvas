$(function(){
	var $box=$(".box");
	var $parbox=$(".parent-box");
	var copy=null;
	var canvas=null;
	var $add=$(".add");
	var $save=$(".save");
	var $back=$(".back");
	var $call=$(".call");
	var $clear=$(".clear");

	var $divs=$(".box-top>div");
	$add.click(function(){
		var w=prompt("请输入画布宽度",500);
		var h=prompt("请输入画布高度",500);
		if(w&&h){
		$parbox.css({
			"width":w,
			"height":h
			});
		canvas=$("<canvas id='con'></canvas>");
		close=$("<div class='close'id='close'>×</div>");
		canvas.attr("width",w);
		canvas.attr("height",h);
		copy=$("<div id='copy'></div>");
		var parcan=$(".parent-box canvas");
		if(parcan.length>0){
			alert("请先保存上一张画布，并关闭");
		}else{
			$parbox.append(canvas).append(copy).append(close);
			$(".parent-box .close").click(function(){
				$(".parent-box").children("canvas[id]").remove();
				$(".parent-box").children("div[id]").remove(); 
			})
		}
		}else{
			return;
		}
		patt(canvas,copy);

		})
		$save.click(function(){
			var can64=canvas[0].toDataURL();
			location.href= can64.replace("image/png","image/octet-strenam");
		})
		
		function patt(con,copy){
		var p=new palette(con[0].getContext("2d"),con[0],copy[0]);
		$divs.click(function(index){
			var that=this;
			var attr=$(this).attr("role");
			if(attr==="undefined"){
				return;
			}
			else if(attr=="pencil"){
				p.pencil();
			}
			else if (attr=="earser"){
				p.earser();
			}
			
			else{
				p.draw();
				if (attr=="strokeStyle"){
					$(this).change(function(){
						p.strokeStyle=$(this).find('input').val();
					})
					
				}
				else if (attr=="fillStyle"){
					$(this).change(function(){
						p.fillStyle=$(this).find('input').val();
					})
				}
				else if(attr=="fill"||attr=="stroke"){
					p.style=attr;
				}
				else{
					if (attr=="poly"){
						var bnum=prompt("请输入边数","6");
						if(bnum){
							p.bnum=bnum || 5;
						}else{
							return;
						}
					}
					else if (attr=="polystar"){
						var degs=prompt("请输入角数","5");
						if(degs){
							p.degs=degs || 5;
						}else{
							return;
						}
						
					}
					p.type=attr;
					
					
				}
			}
		})


		/*撤销*/
		$back.click(function(){
			if (p.status.length>1)
			{
				var deldata=p.status.pop();
				p.newstatus.push(deldata);
				p.o.putImageData(p.status[p.status.length-1],0,0,0,0,p.width,p.height);
			}
			else if (p.status.length==1)
			{	
				deldata=p.status.pop();
				p.newstatus.push(deldata);
				p.o.clearRect(0,0,p.width,p.height);
				
			}
			else if(p.status.length<1)
			{
				alert("该画布中没有要撤销的元素");
				return;
			}
		})
		/*取消撤销*/
		$call.click(function(){
			if (p.newstatus.length>0){
				var deldata2=p.newstatus.pop();
				p.status.push(deldata2);
				p.o.putImageData(p.status[p.status.length-1],0,0,0,0,p.width,p.height);
			}
			else{
				alert("亲你刚刚只画到这里");
				return
			}
		})
		/*清空画布*/
		$clear.click(function(){
			if (p.status.length==0)
			{
				alert("你的画布很干净,无需清空");
				return
			}
			else{
				var af=confirm("确定要清空画布吗?");
				if (af==false)
				{
					return
				}
				else{
					p.o.clearRect(0,0,p.width,p.height);
					p.status=[];
				}
			}
			
		})


	}

	$(".topic-topic").click(function(){
		// $(".topic-topic ul").attr("id","diab");
		$(".ulu").toggleClass("diab");

	})


	var d="<div class='xin'>❤<div>"
			setInterval(function(){
				var f=$(document).width();
				var e=Math.random()*f-100;
				var o=0.3+Math.random();
				var fon=10+Math.random()*30;
				var l = e - 100 + 200 * Math.random();
				var k=2000 + 5000 * Math.random();
				$(d).clone().appendTo(".show4").css({
					left:e+"px",
					opacity:o,
					"font-size":fon,
				}).animate({
				  top:"400px",
					left:l+"px",
					opacity:0.1,
				},k,"linear",function(){$(this).remove()})
			},200)

		

})


