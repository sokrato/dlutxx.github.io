!function(){if(window.XA)return alert("插件已经加载过了。");var t={loadScript:function(t,e){var i=document.createElement("script");i.src=t,e&&(i.onload=e),document.body.appendChild(i)},addStyles:function(t){var e=this.createElement("style");e.html(t),e.appendTo("head")},createElement:function(t,e,i,n){var o=$("<"+t+">");if(e)for(var r in e)o.attr(r,e[r]);return i&&o.css(i),n&&o.appendTo(n),o},_totalPrice:null,getTotalPrice:function(){return null===this._totalPrice&&(this._totalPrice=parseFloat($(".order_money").text())),this._totalPrice},getFinalPrice:function(){var t=$(".order_u_pay span").text();return t?parseFloat(t):null},checkDiscount:function(){var t=this.getTotalPrice(),e=this.getFinalPrice();return e&&e<t},getWantToUseCardNum:function(t){for(var e=null;;){var i=prompt("请选择要使用的银行卡号末四位");if(t[i]){e=i;break}alert("无效的卡号")}return e},_data:null,guide:function(){var t="请先校对您的电脑时钟, 并在开抢前5分钟内启动插件。";alert(t);var e=$(".more_list li");if(e.length<2)throw alert("您不足两张卡, 无法使用插件"),new Error("too less cards");var i={},n=(e.find("em").each(function(){var t=$(this).text().split(" ")[0];return t=t.slice(t.length-4),i[t]=$(this),t}),this.getWantToUseCardNum(i)),o=null;for(var r in i)if(r!=n){o=i[r];break}this._data={card:i[n],alt:o,cards:i}},pollInterval:500,poll:function(){if(!this._stopped){var t=this;setTimeout(function(){t._data.card.click()},t.pollInterval)}},setInterval:function(){for(;;){var t=prompt("请设置刷新间隔, 单位是毫秒(1秒=1000毫秒), \n当前间隔为: "+this.pollInterval);if(t=parseInt(t),t>=0){this.pollInterval=t,alert("设置成功, 新的刷新间隔是: "+t+"毫秒");break}alert("请输入 0 - 无穷大 的整数数字")}},_el:null,getEl:function(){return this._el},submitForm:function(){$("#btnCardPay").click().submit()},selectDiscount:function(){for(var t=0;t<2;++t)if($(".discount-chk-u").focus().click().prop("checked",!0),this.checkDiscount()){this.submitForm(),this.stop();break}},onDiscountInfo:function(t,e){var i=this;if(e==this.reqNo){if(++i.reqNo,t&&t.success&&t.discountList.length){t.discountList[0].resultMessage;i.selectDiscount()}i.poll()}},reqNo:0,inject:function(){var t=this;UPService._send=UPService.send,UPService.send=function(e,i,n,o,r){if(/showDiscount/.test(e)){var s=t.reqNo;o._onSuccess=o.onSuccess||$.noop,o.onSuccess=function(e){o._onSuccess(e),t.onDiscountInfo(e,s)},o._onComplete=o.onComplete||$.noop,o.onComplete=function(){o._onComplete(),t.onDiscountInfo(null,s)}}UPService._send(e,i,n,o,r)}},init:function(){this.guide(),this.inject(),this._el=this.createElement("div",{"class":"xa"},{width:"160px",height:"100px",position:"fixed",border:"2px solid #777",top:"20px",right:"30px",zIndex:9999,padding:"5px",fontSize:"18px",backgroundColor:"rgb(238, 245, 243)"},"body"),this.start()},updateTip:function(){var t=this._stopped?'插件已暂停<br/><a href="javascript:XA.start();">继续</a>':'插件运行中<br/> <a href="javascript:XA.stop();">暂停</a>',e=', <br/><a href="javascript:XA.setInterval();">设置刷新间隔</a>';this.getEl().html(t+e)},start:function(){this._stopped=!1,this.updateTip(),this.poll()},_stopped:!1,stop:function(){this._stopped=!0,this.updateTip(),this.getEl().html()},version:1};window.XA=t,window.jQuery?t.init():t.loadScript("https://cdn.bootcss.com/jquery/3.1.0/jquery.min.js",function(){t.init()})}();