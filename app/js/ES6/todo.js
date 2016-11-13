 class Todo {
	constructor(options){
		this.tmpl = options.template
		this.todos=[
			{title:"Create todo-list",done:true},
			{title:"Create drag-and-drop",done:true}
		]
	}
	 _setToLocalStorage(){
		 let sTodos = JSON.stringify(todo.todos);
		 localStorage.setItem('todos',sTodos);
	 }
	 _getFromLocalStorage(){
		 if(window.localStorage.getItem('todos')){
		 	todo.todos = JSON.parse(window.localStorage.getItem('todos')) 
		 }
	 }
	 _clearFromLocalStorage(el){
		window.localStorage.removeItem(el);
	 }
	render(){
		let result = this.tmpl(this.todos)
		let div = document.createElement('div');
		div.className = "todo-wrapper";
		div.innerHTML = result;
		document.body.appendChild(div);
		for(let i=0;i<this.todos.length;i++){
			if(this.todos[i].done){
				document.querySelectorAll('.isDone')[i].checked = true;
				document.querySelectorAll('.item-title')[i].classList.toggle('done')
			}
		}
	}
	clear(){
		let div = document.querySelector('.todo-wrapper');
		document.body.removeChild(div);
	}

	add(newTodo){
		if(newTodo){
			this.todos.push({title:newTodo,done:false})
			this.clear()
			this.render()
		}
		
	}
	remove(elem){
		this.todos.splice(elem,1);
		this.clear();
		this.render();
		
	}
	_isDoneStyle(elem){
		let titles = document.querySelectorAll('.item-title');
		titles[elem].classList.toggle('done');
	}
	isDone(elem,check){
		check ? this.todos[elem].done = true : this.todos[elem].done = false;
		this._isDoneStyle(elem);
	}
}


	
	
