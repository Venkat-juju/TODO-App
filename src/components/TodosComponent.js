import React from 'react';

function Todo (props) {

	function setCompleted(e) {
		props.completeHandler(props.todo);
	}

	function setDeleted(e) {
		props.deleteHandler(props.todo);
	}

	return (
		<li>
			<p className={`${ props.todo.completed ? "completed-task" : ""}`}>{props.todo.text}</p>
			<button id="complete-btn" onClick={setCompleted} ><i className="fa fa-check"></i></button>
			<button id="delete-btn" onClick={setDeleted} ><i className="fa fa-trash"></i></button>
		</li>
	);
}


function Todos(props) {

	const renderTodos = props.todos.filter((todo) => {
			if(props.group === 'all') {
				return todo;
			}
			if(todo.completed && props.group === 'completed') {
				return todo;
			} else if(!todo.completed && props.group === 'uncompleted') {
				return todo
			}
		}).map((todo) => {
			return (
				<Todo key={todo.id} 
					  todo={todo}
					  completeHandler={props.completeHandler} 
					  deleteHandler={props.deleteHandler}
				/>
			);
	});

	return (
		<ul className="todos-content">
			{renderTodos}
		</ul>
	);
}

export default Todos;