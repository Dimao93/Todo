function Slider(options){ 
	var elem = options.elem;
	var max = options.max;
	var thumb= elem.querySelector('.slider-thumb');
	var value = elem.closest('.elem-slider').querySelector('.title-value');
	
	var shiftX, shiftY, thumbCoords, elemCoords, ratio;
	
	
	thumb.addEventListener('mousedown',startMove)
	function startMove (e){
		thumbCoords = thumb.getBoundingClientRect();
		elemCoords = elem.getBoundingClientRect();
		shiftX = e.clientX-thumbCoords.left;
		document.onselectstart = function(){
			return false;
		}
		document.addEventListener('mousemove',move);
		document.addEventListener('mouseup',endMove);
	}
	function move(e){
		var x = e.clientX-shiftX-elemCoords.left;
		var sliderWidth = elem.offsetWidth-thumb.offsetWidth;
		
		if(x<0){
			x=0;
		}
		if(x>sliderWidth){
			x=sliderWidth;
		}
		var ratio = Math.ceil(x*max/sliderWidth);
		var bcgPercent = x*100/sliderWidth+"%";
		
		changeBcg(bcgPercent); // Вызываем ф-цию которая меняет цвет слайдера
		thumb.style.left = x + "px";//Новые координаты ползунка
		value.innerHTML = "+" + ratio;//Меня тескт в диве "value"
		
	}
	function endMove(e){
		document.removeEventListener('mousemove',move);
		document.removeEventListener('moueseup',endMove);
	}
	function stopSelect(){
		return false;
	}
	function changeBcg(percent){
		elem.style.background = "linear-gradient(90deg, #25c5cc "+percent+", white 0%)";
	}
	
}