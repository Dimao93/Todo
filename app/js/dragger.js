'use strict';

var Dragger = new function () {
	var dragObj = {};

	document.onmousedown = onMouseDown;
	document.onmousemove = onMouseMove;
	document.onmouseup = onMouseUp;

	function onMouseDown(e) {
		var target = e.target;
		if (target.className != 'list-group-item') {
			return;
		}
		dragObj.removeElem = document.getElementById("remove");
		dragObj.width = document.querySelector('.input-group').offsetWidth;
		dragObj.elem = target;
		dragObj.coords = target.getBoundingClientRect();
		dragObj.shiftX = e.clientX - dragObj.coords.left;
		var oldPos = {
			x: 0,
			parent: dragObj.elem.parentNode,
			nextSibling: dragObj.elem.nextElementSibling
		};
		dragObj.rollBack = function () {
			dragObj.elem.classList.remove('drop');
			oldPos.parent.insertBefore(target, oldPos.nextSibling);
			dragObj.elem.style.left = oldPos.x + "px";
		};
	}
	function onMouseMove(e) {
		if (!dragObj.elem) {
			return;
		}
		dragObj.newX = e.pageX - dragObj.shiftX;
		var rigthEdge = document.body.offsetWidth - dragObj.elem.offsetWidth;
		lightning(dragObj.newX, dragObj.removeElem);
		if (dragObj.newX < 0) {
			dragObj.newX = 0;
		}
		if (dragObj.newX > rigthEdge) {
			dragObj.newX = rigthEdge;
		};
		dropStyle(dragObj.elem);
	};
	function onMouseUp(e) {
		if (!dragObj.elem) {
			return;
		}
		var newX = e.pageX - dragObj.shiftX;
		var listItem = document.querySelectorAll(".list-group-item");
		if (newX < dragObj.removeElem.offsetWidth) {
			todo.remove(searchPos(listItem, dragObj.elem));
		} else {
			dragObj.rollBack();
		}
		dragObj = {};
	};
	function searchPos(arr, item) {
		var array = Array.prototype.slice.call(arr);
		return array.indexOf(item);
	};
	function lightning(leftCoord, elem) {
		leftCoord > elem.offsetWidth ? elem.classList.remove('lightning') : elem.classList.add('lightning');
	}
	function dropStyle(elem) {
		elem.classList.add('drop');
		elem.style.width = dragObj.width + 'px';
		elem.style.left = dragObj.newX + 'px';
	}
}();