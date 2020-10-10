import React from 'react';

function Form(props) {

	function handleSubmit(e) {
		e.preventDefault();
		props.todo === "" ? alert("The todo content can't be empty") : props.addTodosHandler(props.todo);
		e.preventDefault();
	}

	return (
		<div className="form-div">
		<form onSubmit={handleSubmit}>
			<input type="text" value={props.todo} id="todo-input" name="todo-input" onChange={props.changeTodoHandler} placeholder="Add here..." />
			<button type="submit" id="todo-submit-button" name="todo-submit-button">
				<i className="fa fa-plus-square"></i>
			</button>
		</form>
		<select name="group" id="group" onChange={props.changeGroupHandler} >
			<option value="all">All</option>
			<option value="completed">Completed</option>
			<option value="uncompleted">Uncompleted</option>
		</select>
		</div>
	);
}

export default Form;