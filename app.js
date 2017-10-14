
	var toDo= {
		list: [],
		addToList: function(toDoText) {
			this.list.push({
				toDoText: toDoText,
				completed: false
			});
		},
		deleteListItem: function(position) {
			this.list.splice(position,1);
		},
		changeListItem: function(position,toDoText) {
			 this.list[position].toDoText = toDoText;
		},
		toggleCompleted: function(position) {
			  this.list[position].completed = !this.list[position].completed;
		},
		toggleAll: function() {
			var totalTodos = this.list.length;
			var completedTodos = 0;

			//get number of completed todos
			this.list.forEach(function(toDo) {
				if(toDo.completed === true) {
					completedTodos += 1;
				}	
			});

			this.list.forEach(function(toDo){
				if(completedTodos === totalTodos) {
					toDo.completed = false;
				} else {
					toDo.completed = true;
				}
			});
		}
	}


	var handlers = {

		toggleAll: function() {
			toDo.toggleAll();
			view.displayToDos();
		},
		addToDo: function() {
			var inputText = document.getElementById('addToDoText');
			toDo.addToList(inputText.value);
			inputText.value = ' ';
			view.displayToDos();
		},
		changeToDo: function() {
			var itemPos = document.getElementById('toDoPosition');
			var newInputText = document.getElementById('newToDoText');
			toDo.changeListItem(itemPos.valueAsNumber, newInputText.value);
			itemPos.value = ' ';
			newInputText.value = ' ';
			view.displayToDos();
		},
		removeToDo: function(position) {
			//position will be the li id
			toDo.deleteListItem(position);
			view.displayToDos();
		},
		toggleToDo: function() {
			var itemTogglePos = document.getElementById('toggleToDoPosition');
			toDo.toggleCompleted(itemTogglePos.valueAsNumber);
			itemTogglePos.value = ' ';
			view.displayToDos();
		}
	}


	var view = {
		displayToDos: function() {
			var toDoUl = document.querySelector('ul');
			toDoUl.innerHTML = ' ';

			toDo.list.forEach(function(todo,index){
				var toDoLi = document.createElement('li');
				var checkbox = document.createElement('input');
				var toDoTextWithCompletion = ' ';

				if(todo.completed === true) {
					toDoTextWithCompletion = '(x)' + todo.toDoText;
				} else {
					toDoTextWithCompletion = '()' + todo.toDoText;
				}

				toDoLi.id = index;
				toDoLi.textContent = toDoTextWithCompletion;
				toDoLi.appendChild(this.createDeleteButton())
				toDoUl.appendChild(toDoLi);

			},this);
		},
		createDeleteButton: function() {
			var deleteButton = document.createElement('button');
			deleteButton.textContent = 'Delete';
			deleteButton.className = 'deleteButton';
			return deleteButton;
		},
		setUpEventListeners: function() {
			var toDosUl = document.querySelector('ul');

			toDosUl.addEventListener('click', function(event) {
				//get element that was clicked on
				var elementClicked = event.target;
				//check if element clicked is the delete button
				if(elementClicked.className === 'deleteButton') {
					//run handlers deleteTodo on the parent li
					handlers.removeToDo(parseInt(elementClicked.parentNode.id));
				}
			});
		}
	}

view.setUpEventListeners();
