"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Todo = function () {
	function Todo(options) {
		_classCallCheck(this, Todo);

		this.tmpl = options.template;
		this.todos = [{ title: "Create Todo-list", done: true }, { title: "create drag", done: false }];
	}

	_createClass(Todo, [{
		key: "render",
		value: function render() {
			var result = this.tmpl(this.todos);
			var div = document.createElement('div');
			div.className = "todo-wrapper";
			div.innerHTML = result;
			document.body.appendChild(div);
			for (var i = 0; i < this.todos.length; i++) {
				if (this.todos[i].done) {
					document.querySelectorAll('.isDone')[i].checked = true;
					document.querySelectorAll('.item-title')[i].classList.toggle('done');
				}
			}
		}
	}, {
		key: "clear",
		value: function clear() {
			var div = document.querySelector('.todo-wrapper');
			document.body.removeChild(div);
		}
	}, {
		key: "add",
		value: function add(newTodo) {
			if (newTodo) {
				this.todos.push({ title: newTodo, done: false });
				this.clear();
				this.render();
			}
		}
	}, {
		key: "remove",
		value: function remove(elem) {
			this.todos.splice(elem, 1);
			this.clear();
			this.render();
		}
	}, {
		key: "_isDoneStyle",
		value: function _isDoneStyle(elem) {
			var titles = document.querySelectorAll('.item-title');
			titles[elem].classList.toggle('done');
		}
	}, {
		key: "isDone",
		value: function isDone(i, check) {
			check ? this.todos[i].done = true : this.todos[i].done = false;
			this._isDoneStyle(i);
		}
	}]);

	return Todo;
}();

document.onclick = function (e) {
	var target = e.target;
	var doneList = document.querySelectorAll('.isDone');
	for (var i = 0; i < doneList.length; i++) {
		if (doneList[i] == target) {
			todo.isDone(i, target.checked);
		}
	}
};

//	document.querySelectorAll('.list-group-item')[0].onmousedown = function(el){
//		let elemCoords = el.target.getBoundingClientRect();
//		console.log(elemCoords.left)
//	}

document.onmousedown = function (e) {
	var target = e.target;
	var newWidth = document.querySelector('.input-group').offsetWidth;
	var removeEl = document.querySelector('.remove');
	if (target.className != 'list-group-item') {
		return;
	}
	var targetCoords = target.getBoundingClientRect();
	var shiftX = e.clientX - targetCoords.left;
	document.onmousemove = function (e) {
		var newX = e.pageX - shiftX;
		newX > removeEl.offsetWidth ? removeEl.classList.remove('lightning') : removeEl.classList.add('lightning');
		if (newX < 0) {
			newX = 0;
		}
		var rigthEdge = document.body.offsetWidth - target.offsetWidth;
		if (newX > rigthEdge) {
			newX = rigthEdge;
		}
		target.classList.add('drop');
		target.style.width = newWidth + 'px';
		target.style.left = newX + 'px';
	};
	document.onmouseup = function (e) {
		var newX = e.pageX - shiftX;

		document.onmousemove = null;
	};
};

//let template = _.template(document.querySelector('#myTemplate').innerHTML);
//
//
//let obj = {
//	title:[1,2,3,4,5]
//};
//let result = template(obj)
//document.write(result)