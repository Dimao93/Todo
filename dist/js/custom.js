
var slider1 = new Slider({
	elem:document.querySelector('#slider-1'),
	max:400
})
var slider2 = new Slider({
	elem:document.querySelector('#slider-2'),
	max:4000
})

changeButton();
onHover();



function changeButton(){
	var button = document.querySelector('.elem-button');
	button.addEventListener('click',change);
	function change(){
		button.querySelector('img').classList.toggle('hidden');
		button.querySelector('.fa').classList.toggle('visible')
	}
}
function onHover(){
	var wrapper = document.querySelector('.wrapper');
	var slider = document.querySelectorAll('.elem-slider__slider');
	wrapper.addEventListener('mouseover',over);
	wrapper.addEventListener('mouseout',out);

	
	function out() {
		for(var i =0;i<slider.length;i++){
		    slider[i].classList.remove('visible')	
	   }
	}
	
	function over(){
	for(var i =0;i<slider.length;i++){
		slider[i].classList.add('visible')
	   }
	}
}
