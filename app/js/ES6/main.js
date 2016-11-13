let todo = new Todo({
	template:_.template(document.querySelector('#myTemplate').innerHTML)
})
todo._getFromLocalStorage()
todo.render()
			
document.onclick = function(e){
	let target = e.target;
	let doneList = document.querySelectorAll('.isDone');
	for(let i=0;i<doneList.length;i++){
		if(doneList[i]==target){
			todo.isDone(i,target.checked)
		}
	}
}
window.onunload = todo._setToLocalStorage;