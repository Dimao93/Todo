'use strict';

var todo = new Todo({
	template: _.template(document.querySelector('#myTemplate').innerHTML)
});
todo._getFromLocalStorage();
todo.render();

document.onclick = function (e) {
	var target = e.target;
	var doneList = document.querySelectorAll('.isDone');
	for (var i = 0; i < doneList.length; i++) {
		if (doneList[i] == target) {
			todo.isDone(i, target.checked);
		}
	}
};
window.onunload = todo._setToLocalStorage;