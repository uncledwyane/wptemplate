/*拖拽插件*/
export default function(el,binding){
  let oDiv=el;
  oDiv.onmousedown=function (ev)  
    {  
    	
			  if(binding.value && binding.value.isDisplay && !binding.value.isFullscreen){
			  	return;
			  }
        var oEvent=ev||event;  
        var disX=oEvent.clientX-oDiv.offsetLeft;  
        var disY=oEvent.clientY-oDiv.offsetTop;  
        var width = oDiv.offsetWidth;
        var height = oDiv.offsetHeight;
        var left,top;
        if(oDiv.setCapture)  
        {  
            oDiv.onmousemove=fnMove;  
            oDiv.onmouseup=fnUp;  
              
            oDiv.setCapture();  
        }  
        else  
        {  
            document.onmousemove=fnMove;  
            document.onmouseup=fnUp;  
        }  
          
        function fnMove(ev)  
        {  
            var oEvent=ev||event;  
         
            if(oEvent.clientX-disX <= 0){
            	left = 0;
            }else if(oEvent.clientX-disX >= document.documentElement.clientWidth - width){
            	left = document.documentElement.clientWidth - width;
            }else{
            	left = oEvent.clientX-disX;
            }
            
            if(oEvent.clientY-disY <= 0){
            	top = 0;
            }else if(oEvent.clientY-disY >= document.documentElement.clientHeight - height){
            	top = document.documentElement.clientHeight - height;
            }else{
            	top = oEvent.clientY-disY;
            }
            oDiv.style.marginLeft = 0;
            oDiv.style.marginTop = 0;
            oDiv.style.left=left+'px';  
            oDiv.style.top=top+'px';  
        }  
          
        function fnUp()  
        {  
            this.onmousemove=null;  
            this.onmouseup=null;  
            //用于处理IE下的问题  
            if(this.releaseCapture)  
            {  
                this.releaseCapture();  
            }  
        }  
        //用于处理FF和Chrome下的问题  
        return false;  
    };  
  
  
}