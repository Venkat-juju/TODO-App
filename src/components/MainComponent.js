import React, { Component } from 'react';
import Form from './FormComponent';
import Todos from './TodosComponent';
import 'font-awesome/css/font-awesome.css';

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
		//this.saveToLocalStorage();
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

		//this.saveToLocalStorage();
	};

	deleteHandler(deleted) {
		console.log("Delete handler called");
		this.setState({
			todos: this.state.todos.filter((todo) => todo.id !== deleted.id)
		});		
		
		//this.saveToLocalStorage();
	};

	render() {
		return (
			<>
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
			</>
		)
	}
}

export default Main;