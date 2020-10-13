import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

function Todo (props) {

	function setCompleted(e) {
		props.completeHandler(props.todo);
	}

	function setDeleted(e) {
		props.deleteHandler(props.todo);
	}

	return (
		<li>
			<div className="dragger"></div>
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
		}).map((todo, index) => {
			return (
				<Draggable key={index} draggableId={index + ''} index={index}>
				{(provided) => (
					<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
					<Todo key={todo.id} 
					  todo={todo}
					  completeHandler={props.completeHandler} 
					  deleteHandler={props.deleteHandler}
					/>
					</div>
				)}
				
				</Draggable>
			);
	});

	return (
		<Droppable droppableId='dp1'>
			{(provided) => (<ul ref={provided.innerRef} {...provided.droppableProps}>
				{renderTodos}
				{provided.placeholder}
			</ul>)}
			
		</Droppable>
	);
}

export default Todos;