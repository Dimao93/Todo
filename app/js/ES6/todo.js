 class Todo {
	constructor(options){
		this.tmpl = options.template
		this.todos=[
			{title:"Create todo-list",done:true},
			{title:"Create drag-and-drop",done:true}
		]
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
		this.clear()
		this.render()
	}
	_isDoneStyle(elem){
		let titles = document.querySelectorAll('.item-title');
		titles[elem].classList.toggle('done');
	}
	isDone(i,check){
		check ? this.todos[i].done = true : this.todos[i].done = false;
		this._isDoneStyle(i);
	}
}


	document.onclick = function(e){
		let target = e.target;
		let doneList = document.querySelectorAll('.isDone');
		for(let i=0;i<doneList.length;i++){
			if(doneList[i]==target){
				todo.isDone(i,target.checked)
			}
		}
	}
	
