import React from 'react';
import logo from './logo.svg';
import './App.css';

const TodoList = ({ list }) => {
  return (
    <div>
      {list.map((todo, index) => {
        return (
          <div key={index} className="list-item">
            <p>{todo}</p>
            {/* add button to remove list item (use 'this' somehow) */}
          </div>
        )
      })}
    </div>
  )
}
class App extends React.Component {
  state = {
    input: '',
    todos: []
  };
  formSubmit = event => {
    event.preventDefault();
    this.setState({
      todos: this.state.todos.concat(this.state.input),
      input: ''
    })
  }
  inputUpdate = event => {
    this.setState({
      input: event.target.value
    })
  };
  render() {
    return (
      <div className="App-header">
        <TodoList list={this.state.todos}/>
        <form onSubmit={this.formSubmit}>
          <input value={this.state.input} onChange={this.inputUpdate}/>
          <button>submit</button>
        </form>
      </div>
    )
  }
}

export default App;
