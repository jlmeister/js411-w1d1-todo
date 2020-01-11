import React from 'react';
import logo from './logo.svg';
import './App.css';

const TodoList = (props) => {
  const { list, ...other } = props;
  return (
    <div className="list-container">
      {props.list.map((todo, i) => {
        return (
          <Todo {...other} entry={todo} key={i} index={i} onDelete={props.onDelete} />
        )
      })}
    </div>
  )
}

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInEditMode: false,
    }
  }
  changeEditMode = () => {
    this.setState({
      isInEditMode: !this.state.isInEditMode
    })
  }
  saveEditedEntry = () => {
    // only allow it to be saved if the entry isn't an empty string
    if (this.refs.editText.value.length > 0) {
      this.setState({
        isInEditMode: false
      })
      this.props.updateEntry(this.refs.editText.value, this.props.index)
    }
  }
  onKeyUp = (event) => {
    if (event.keyCode === 13) // 'RETURN' key
      return this.saveEditedEntry();
    if (event.keyCode === 27) // 'ESC' key
      this.changeEditMode();
  }

  render() {
    return (
      this.state.isInEditMode ?
        <div className="list-item">
          <input type="text" defaultValue={this.props.entry} ref="editText" onKeyUp={this.onKeyUp} autoFocus={true} />
          <button onClick={this.changeEditMode}>cancel</button>
          <button onClick={this.saveEditedEntry}>OK</button>
        </div>
        :
        <div className="list-item">
          <p onDoubleClick={this.changeEditMode}>{this.props.entry}</p>
          <button onClick={this.changeEditMode}>edit</button>
          <button onClick={() => this.props.onDelete(this.props.index)}>delete</button>
        </div>
    )
  }
}

class App extends React.Component {
  state = {
    input: '',
    todos: []
  };
  onDelete = (index) => {
    this.setState({
      todos: this.state.todos.filter((todo, i) => i !== index)
    })
    console.log(this.state.todos);
  }
  formSubmit = event => {
    event.preventDefault();
    if (this.state.input.length > 0) {
      this.setState({
        todos: this.state.todos.concat(this.state.input),
        input: ''
      })
    }
  }
  inputUpdate = event => {
    this.setState({
      input: event.target.value
    })
  };
  updateTodo = (editedText, editedIndex) => {
    // map over todo list
    // if the current index is not the editedIndex, just return the todo as is
    // if the current index IS the editedIndex, return the editedText
    this.setState({
      todos: this.state.todos.map((todo, index) => {
        if (index !== editedIndex) {
          return todo;
        }
        else
          return editedText;
      })
    })
  }
  render() {
    return (
      <div className="App-header">
        <h1>Let's make a To-Do List</h1>
        <form onSubmit={this.formSubmit}>
          <input value={this.state.input} onChange={this.inputUpdate} placeholder="type todo here" />
          <button>submit</button>
        </form>
        <TodoList list={this.state.todos} onDelete={this.onDelete} updateEntry={this.updateTodo} />
      </div>
    )
  }
}

export default App;
