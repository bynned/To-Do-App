import React, { Component } from "react";
import "./App.css";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import axios from "axios";

class App extends Component {
  state = {
    todos: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:4040/api/v1/tasks/")
      .then(res => this.setState({ todos: res.data }));
  }

  // Toggle Complete
  markComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };

  // Delete Todo
  delTodo = id => {
    axios.delete(`http://localhost:4040/api/v1/tasks/${id}`).then(res =>
      this.setState({
        todos: this.state.todos.filter(todo => todo.id !== id)
      })
    );
  };

  // Add Todo
  addTodo = title => {
    axios
      .post("http://localhost:4040/api/v1/tasks/", {
        id: Math.floor(Math.random() * 100) + 3,
        title,
        completed: false
      })
      .then(res => {
        this.updateList();
        console.log(res);
        this.setState({ todos: [...this.state.todos, res.data] });
      });
  };

  async updateList() {
    // GET request using axios with async/await
    const response = await axios.get('http://localhost:4040/api/v1/tasks/');
    this.setState({ todos: response.data })
}

  render() {
    return (
        <div className="App">
          <div className="container">
                <React.Fragment>
                  <h1 className="Header">ToDo List</h1>
                  <AddTodo addTodo={this.addTodo} />
                  <Todos
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                  />
                </React.Fragment>
          </div>
        </div>
    );
  }
}

export default App;
