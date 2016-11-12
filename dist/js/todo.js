"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Todo = function () {
	function Todo(options) {
		_classCallCheck(this, Todo);

		this.tmpl = options.template;
		this.todos = [{ title: "Create todo-list", done: true }, { title: "Create drag-and-drop", done: true }];
	}

	_createClass(Todo, [{
		key: "_setToLocalStorage",
		value: function _setToLocalStorage() {
			var sTodos = JSON.stringify(todo.todos);
			localStorage.setItem('todos', sTodos);
		}
	}, {
		key: "_getFromLocalStorage",
		value: function _getFromLocalStorage() {
			if (window.localStorage.length) {
				todo.todos = JSON.parse(window.localStorage.getItem('todos'));
			}
		}
	}, {
		key: "_clearFromLocalStorage",
		value: function _clearFromLocalStorage(el) {
			window.localStorage.removeItem(el);
		}
	}, {
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