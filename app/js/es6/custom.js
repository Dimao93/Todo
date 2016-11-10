
class Todo {
	constructor(options){
		this.tmpl = options.template
		this.todos=[
			{title:"Create Todo-list",done:true},
			{title:"create drag",done:false}
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
	
//	document.querySelectorAll('.list-group-item')[0].onmousedown = function(el){
//		let elemCoords = el.target.getBoundingClientRect();
//		console.log(elemCoords.left)
//	}

document.onmousedown = function(e){
	let target = e.target;
	let newWidth = document.querySelector('.input-group').offsetWidth;
	let removeEl = document.querySelector('.remove');
	if(target.className != 'list-group-item'){return}
	let targetCoords = target.getBoundingClientRect();
	let shiftX = e.clientX - targetCoords.left;
	document.onmousemove = function(e){
		let newX = e.pageX - shiftX;
		newX>removeEl.offsetWidth ? removeEl.classList.remove('lightning') : removeEl.classList.add('lightning')
		if(newX<0){
			newX = 0;
		}
		let rigthEdge = document.body.offsetWidth - target.offsetWidth;
		if(newX>rigthEdge){
			newX = rigthEdge
		}
		target.classList.add('drop');
		target.style.width = newWidth + 'px'
		target.style.left = newX + 'px';
		
			
	}
document.onmouseup = function(e){
	let newX = e.pageX-shiftX;
	
	document.onmousemove = null;
}
}









//let template = _.template(document.querySelector('#myTemplate').innerHTML);
//
//
//let obj = {
//	title:[1,2,3,4,5]
//};
//let result = template(obj)
//document.write(result)