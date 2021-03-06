import React, { Component } from 'react';
import Form from './FormComponent';
import Todos from './TodosComponent';
import 'font-awesome/css/font-awesome.css';
import { DragDropContext } from 'react-beautiful-dnd';

class Main extends Component {

	constructor(props) {
		super(props);

		this.state = {
			todos: [],
			group: 'all',
			todo: ''
		}

		this.addTodosHandler = this.addTodosHandler.bind(this);
		this.changeGroupHandler = this.changeGroupHandler.bind(this);
		this.changeTodoHandler = this.changeTodoHandler.bind(this);
		this.completeHandler = this.completeHandler.bind(this);
		this.deleteHandler = this.deleteHandler.bind(this);
		this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
		this.getFromLocalStorage = this.getFromLocalStorage.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);
	}

	componentDidUpdate() {
		this.saveToLocalStorage();
	}

	componentDidMount() {
		this.getFromLocalStorage();
	}

	addTodosHandler (value) {
		this.setState ({
			todo: "",
			todos: [
				...this.state.todos,
				{
					text: value,
					completed: false,
					id: Math.random() *1000
				}
			]
		});
	}

	saveToLocalStorage() {
		localStorage.setItem("todo", JSON.stringify(this.state.todos));
	}

	getFromLocalStorage() {
		if (localStorage.getItem("todo") == null) {
			localStorage.setItem("todo", []);
		} else {
			this.setState({
				todos: this.state.todos.concat(JSON.parse(localStorage.getItem("todo")))
			});
		}
	}

	changeTodoHandler(e) {
		this.setState ({
			todo: e.target.value
		})
	}

	changeGroupHandler(e) {
		this.setState ({
			group: e.target.value
		});
	}

	completeHandler(completed) {
		this.setState({
			todos: this.state.todos.map((todo) => {
				if(todo.id === completed.id) {
					return {
						...todo,
						completed: !todo.completed
					};
				} else {
					return todo;
				}
			})
		});
	};

	deleteHandler(deleted) {
		console.log("Delete handler called");
		this.setState({
			todos: this.state.todos.filter((todo) => todo.id !== deleted.id)
		});		
	};

	onDragEnd(result) {
		const {destination, source, reason} = result;

		if (!destination || reason === 'CANCEL') {
			return;
		}

		if (destination.droppableId === source.droppableId && destination.index === source.index) {
			return;
		}

		console.log("Destination index " + destination.index);
		console.log("Source index " + source.index)

		const newtodos = Object.assign([], this.state.todos);
		console.log(newtodos);
		const droppedTodo = this.state.todos[source.index];

		newtodos.splice(source.index, 1);
		console.log(newtodos);
		newtodos.splice(destination.index, 0, droppedTodo);
		console.log(newtodos);

		this.setState({
		 	todos: newtodos
		});
	}

	render() {
		return (
			<DragDropContext onDragEnd={this.onDragEnd} >
				<div className="heading">
					<h3>TODO List</h3>
				</div>
				<Form 
					changeTodoHandler={this.changeTodoHandler} 
					changeGroupHandler={this.changeGroupHandler} 
					todo={this.state.todo} 
					addTodosHandler= {this.addTodosHandler}
				/>
				<Todos todos={this.state.todos}
					completeHandler={this.completeHandler}
					deleteHandler={this.deleteHandler}
					group={this.state.group}
				 />
			</DragDropContext>
		)
	}
}

export default Main;