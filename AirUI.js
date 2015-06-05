/*@Author: Anozer
 *@role:页面布局
 *给标签加上 role属性 role的值为:
 *header				顶部居中
 *header-left			顶部居左
 *header-right			顶部居右
 *global-center			水平垂直居中
 *globalX-center		水平垂直居中固定
 *footer				底部居中
 *footer-left 			底部居左
 *footer-right      	底部居右
 *footerX           	底部居中固定
 *footerX-left     	 	底部居左固定
 *footerX-right			底部居右固定
 *footerX-opacity   	底部居中背景透明[Add:2015-04-16]
 *footerX-left-opacity	底部居中背景透明[Add:2015-04-16]
 *footerX-right-opacity	底部居右背景透明[Add:2015-04-16]
 *
 *@role-shadow:阴影效果[Add:2015-04-17]
 *Explain:可以使用预设值也可以使用自定义的阴影值
 *_predefineExample:
 *	default 			阴影在元素右下方
 *	top 				阴影在元素左上方
 *_customExample:role-shadow="{x:'x-offset',y:'y-offset',blur:'blur-radius',spread:'spread-radius',color:'color',inset:'inset'}";
 *_Explain:
 *inset					阴影类型:为空是外阴影,inset内阴影
 *x						阴影水平偏移量，其值可以是正负值。如果值为正值，则阴影在对象的右边，其值为负值时，阴影在对象的左边；
 *y						阴影垂直偏移量，其值也可以是正负值。如果为正值，阴影在对象的底部，其值为负值时，阴影在对象的顶部；
 *blur					阴影模糊半径,此参数可为空。值只能是为正值，如果其值为0时，表示阴影不具有模糊效果，其值越大阴影的边缘就越模糊；
 *spread				阴影的尺寸,此参数可为空。可以是正负值，如果值为正，则整个阴影都延展扩大，反之值为负值时，则缩小；
 *color					阴影颜色,此参数可为空。如不设定颜色，浏览器会取默认色，但各浏览器默认取色不一致，特别是在webkit内核下的safari和chrome浏览器下表现为透明色，在Firefox/Opera下表现为黑色（已验证），建议不要省略此参数。
*/
$(window).load(function(){
	String.prototype.format=function()  
	{  
	  if(arguments.length==0) return this;  
	  for(var s=this, i=0; i<arguments.length; i++)  
	    s=s.replace(new RegExp("\\{"+i+"\\}","g"), arguments[i]);  
	  return s;  
	}; 
		var sourceElement=document.getElementsByTagName("*");
		var itemArray=new Array();
		var itemshadowArray=new Array();
		for(var i=0;i<sourceElement.length;i++)
		{
			if(null!=sourceElement[i].getAttribute("role")&&undefined!=sourceElement[i].getAttribute("role")){
			itemArray[itemArray.length]=sourceElement[i];
			}
			if(null!=sourceElement[i].getAttribute("role-shadow")&&undefined!=sourceElement[i].getAttribute("role-shadow"))
			{
				itemshadowArray[itemshadowArray.length]=sourceElement[i];
			}
		}


		for(var j=0;j<itemArray.length;j++)
		{
			switch(itemArray[j].getAttribute("role"))
			{
				case "center":
					center(itemArray[j]);
					break;
				case "footer":
					footer(itemArray[j]);
					break;
				case "centerX":
					centerX(itemArray[j]);
					break;
				case "footerX":
					footerX(itemArray[j]);
					break;
				case "footerX-opacity":
					footerX_opacity(itemArray[j]);
					break;
				case "footer-left":
					footer_left(itemArray[j]);
					break;
				case "footerX-left":
					footerX_left(itemArray[j]);
					break;
				case "footerX-left-opacity":
					footerX_left_opacity(itemArray[j]);
					break;
				case "footer-right":
					footer_right(itemArray[j]);
					break;
				case "footerX-right":
					footerX_right(itemArray[j]);
					break;
				case "footerX-right-opacity":
					footerX_right_opacity(itemArray[j]);
					break;
				case "headerX":
					headerX(itemArray[j]);
					break;
				default:
				console.error("请检查值是否拼写错误,\""+itemArray[j].getAttribute("role")+"\"未定义。");
			}
		}

		for(var _sd=0;_sd<itemshadowArray.length;_sd++)
		{
			switch(itemshadowArray[_sd].getAttribute("role-shadow")){
				case "default":
					itemShadow_default(itemshadowArray[_sd]);
					break;
				case "top":
					itemShadow_top(itemshadowArray[_sd]);
					break;
				default:
					itemShadow(itemshadowArray[_sd]);
					break;
			}
		}
});

//shadow
function itemShadow (ele) {
	var _sdText=ele.getAttribute("role-shadow");
	var _jsonArray=deserializationToItem(_sdText);
	ele.style.box_shadow="";
	ele.style.cssText+=" box-shadow:{0} {1} {2} {3} {4} {5}".format(
		_jsonArray[0].x,
		_jsonArray[0].y,
		_jsonArray[0].blur,
		_jsonArray[0].spread,
		_jsonArray[0].color,
		_jsonArray[0].inset
		);
}

//默认的阴影模式
function itemShadow_default(ele)
{
	ele.style.cssText+=" box-shadow:2px 2px 3px #aaaaaa;";
}

//阴影在元素的上方
function itemShadow_top(ele)
{
	ele.style.cssText+=" box-shadow:-2px -2px 3px #aaaaaa;";
}

//反序列化操作
function deserializationToItem(strJson)
{
	var _newstrJson="[{0}]".format(strJson);
	var _jsonArray=eval(_newstrJson);

	var _isArray=isArraylike(_jsonArray);
	if(_isArray)
	{
		if(undefined==_jsonArray[0].x)
		{
			console.error("检查格式,不应当带[]");
		}
		return _jsonArray;
	}
	else
	{
		console.error("shadow的格式不正确");
	}
}

//判断是对象还是数组
function isArraylike(obj)
{
	return obj instanceof Array;
}

//顶部固定浏览器上方
function headerX(ele)
{
	if(ele.style.width==""||ele.style.height=="")
	{
		console.error("在设置role=footer时,请先设置style.width的值以及style.height的值");
	}
	ele.style.position="fixed";
	ele.style.top=(document.documentElement.scrollTop)+"px";
	ele.style.left=(document.documentElement.scrollLeft+(document.documentElement.clientWidth-ele.offsetWidth)/2)+"px";
}

//居中
function center(ele){
	ele.remove();
	if(ele.style.width==null||ele.style.width==""){
		console.error("在设置role=center时,请先设置style.width的值");
	}
	ele.style.cssText+=" margin:auto;";
	$("body").append("<div style='width:100%;'>DIV:"+ele.outerHTML+"</div>")
	//ele.style.cssText+="";
}

//固定屏幕中心
function centerX(ele){
	if(ele.style.width==""||ele.style.height=="")
	{
		console.error("在设置role=centerX时,请先设置style.width的值以及style.height的值");
	}
	ele.style.cssText+="position: fixed;box-shadow:2px 2px 3px #aaaaaa;";
	ele.style.top=(document.documentElement.scrollTop+(document.documentElement.clientHeight-ele.offsetHeight)/2)+"px";
	ele.style.left=(document.documentElement.scrollLeft+(document.documentElement.clientWidth-ele.offsetWidth)/2)+"px";
}

//底部居中
function footer(ele)
{
	if(ele.style.width==""||ele.style.height=="")
	{
		console.error("在设置role=footer时,请先设置style.width的值以及style.height的值");
	}
	ele.style.position="absolute";
	ele.style.top=(document.documentElement.scrollTop+document.documentElement.clientHeight-ele.offsetHeight)+"px";
	ele.style.left=(document.documentElement.scrollLeft+(document.documentElement.clientWidth-ele.offsetWidth)/2)+"px";
}

//底部居中固定位置
function footerX(ele)
{
	if(ele.style.width==""||ele.style.height=="")
	{
		console.error("在设置role=footerX时,请先设置style.width的值以及style.height的值");
	}
	ele.style.position="fixed";
	ele.style.top=(document.documentElement.scrollTop+document.documentElement.clientHeight-ele.offsetHeight)+"px";
	ele.style.left=(document.documentElement.scrollLeft+(document.documentElement.clientWidth-ele.offsetWidth)/2)+"px";
}

//底部固定居中设置透明度
function footerX_opacity(ele)
{
	if(ele.style.width==""||ele.style.height=="")
	{
		console.error("在设置role=footerX_opacity时,请先设置style.width的值以及style.height的值");
	}

	if(null==ele.getAttribute("role-opacity")&&undefined==ele.getAttribute("role-opacity"))
	{
		console.log("未设置role-opacity属性,将使用默认值0.5");
		ele.style.cssText+="filter:alpha(opacity=50);-moz-opacity:0.5;opacity:0.5;";
	}
	else
	{
		var opacityVal=ele.getAttribute("role-opacity");
		var IEopacity=opacityVal*100;
		ele.style.cssText+="filter:alpha(opacity="+IEopacity+");-moz-opacity:"+opacityVal+";opacity:"+opacityVal+";";
	}
	ele.style.cssText+=" box-shadow:-2px -2px 3px #aaaaaa;";
	ele.style.position="fixed";
	ele.style.top=(document.documentElement.scrollTop+document.documentElement.clientHeight-ele.offsetHeight)+"px";
	ele.style.left=(document.documentElement.scrollLeft+(document.documentElement.clientWidth-ele.offsetWidth)/2)+"px";
}

//底部居左
function footer_left(ele)
{
	if(ele.style.width==""||ele.style.height=="")
	{
		console.error("在设置role=footer_left时,请先设置style.width的值以及style.height的值");
	}
	ele.style.position="absolute";
	ele.style.top=(document.documentElement.scrollTop+document.documentElement.clientHeight-ele.offsetHeight)+"px";
	ele.style.left=(document.documentElement.scrollLeft)+"px";
}

//底部固定居左
function footerX_left(ele)
{
	if(ele.style.width==""||ele.style.height=="")
	{
		console.error("在设置role=footerX_left时,请先设置style.width的值以及style.height的值");
	}
	ele.style.position="fixed";
	ele.style.top=(document.documentElement.scrollTop+document.documentElement.clientHeight-ele.offsetHeight)+"px";
	ele.style.left=(document.documentElement.scrollLeft)+"px";
}

//底部固定居左透明
function footerX_left_opacity(ele)
{
	if(ele.style.width==""||ele.style.height=="")
	{
		console.error("在设置role=footerX_left时,请先设置style.width的值以及style.height的值");
	}
	if(null==ele.getAttribute("role-opacity")&&undefined==ele.getAttribute("role-opacity"))
	{
		console.log("未设置role-opacity属性,将使用默认值0.5");
		ele.style.cssText+="filter:alpha(opacity=50);-moz-opacity:0.5;opacity:0.5;";
	}
	else
	{
		var opacityVal=ele.getAttribute("role-opacity");
		var IEopacity=opacityVal*100;
		ele.style.cssText+="filter:alpha(opacity="+IEopacity+");-moz-opacity:"+opacityVal+";opacity:"+opacityVal+";";
	}
	ele.style.position="fixed";
	ele.style.top=(document.documentElement.scrollTop+document.documentElement.clientHeight-ele.offsetHeight)+"px";
	ele.style.left=(document.documentElement.scrollLeft)+"px";
}

//底部居右
function footer_right(ele)
{
	if(ele.style.width==""||ele.style.height=="")
	{
		console.error("在设置role=footer_right时,请先设置style.width的值以及style.height的值");
	}
	ele.style.position="absolute";
	ele.style.top=(document.documentElement.scrollTop+document.documentElement.clientHeight-ele.offsetHeight)+"px";
	ele.style.left=(document.documentElement.scrollLeft+document.documentElement.clientWidth-ele.offsetWidth)+"px";
}

//底部固定居右
function footerX_right(ele)
{
	if(ele.style.width==""||ele.style.height=="")
	{
		console.error("在设置role=footer_right时,请先设置style.width的值以及style.height的值");
	}
	ele.style.position="fixed";
	ele.style.top=(document.documentElement.scrollTop+document.documentElement.clientHeight-ele.offsetHeight)+"px";
	ele.style.left=(document.documentElement.scrollLeft+document.documentElement.clientWidth-ele.offsetWidth)+"px";
}

//底部固定居右透明度
function footerX_right_opacity(ele)
{
	if(ele.style.width==""||ele.style.height=="")
	{
		console.error("在设置role=footer_right时,请先设置style.width的值以及style.height的值");
	}
	if(null==ele.getAttribute("role-opacity")&&undefined==ele.getAttribute("role-opacity"))
	{
		console.log("未设置role-opacity属性,将使用默认值0.5");
		ele.style.cssText+="filter:alpha(opacity=50);-moz-opacity:0.5;opacity:0.5;";
	}
	else
	{
		var opacityVal=ele.getAttribute("role-opacity");
		var IEopacity=opacityVal*100;
		ele.style.cssText+="filter:alpha(opacity="+IEopacity+");-moz-opacity:"+opacityVal+";opacity:"+opacityVal+";";
	}
	ele.style.position="fixed";
	ele.style.top=(document.documentElement.scrollTop+document.documentElement.clientHeight-ele.offsetHeight)+"px";
	ele.style.left=(document.documentElement.scrollLeft+document.documentElement.clientWidth-ele.offsetWidth)+"px";
}
