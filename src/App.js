import React from 'react';
import logo from './logo.svg';
import './App.css';

// const TodoList = ({ list, onDelete }) => {
//   return (
//     <div className="list-container">
//       {list.map((todo, index) => {
//         return (
//           <div key={index} className="list-item">
//             <p>{todo}</p>
//             <button onClick={() => onDelete(index)}>X</button>
//           </div>
//         )
//       })}
//     </div>
//   )
// }

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
    if (this.refs.editText.value.length > 0) {
      this.setState({
        isInEditMode: false
      })
      this.props.updateEntry(this.refs.editText.value, this.props.index)
    }
  }
  onKeyUp = (event) => {
    if (event.keyCode === 13)
      return this.saveEditedEntry();
    if (event.keyCode === 27)
      this.changeEditMode();
  }

  render() {
    return (
      this.state.isInEditMode ?
        <div key={this.props.index} className="list-item">
          <input type="text" defaultValue={this.props.entry} ref="editText" onKeyUp={this.onKeyUp} autoFocus="true"/>
          <button onClick={this.changeEditMode}>X</button>
          <button onClick={this.saveEditedEntry}>OK</button>
        </div>
        :
        <div key={this.props.index} className="list-item">
          <p onDoubleClick={this.changeEditMode}>{this.props.entry}</p>
          <button onClick={() => this.props.onDelete(this.props.index)}>X</button>
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
          <input value={this.state.input} onChange={this.inputUpdate} placeholder="type todo here"/>
          <button>submit</button>
        </form>
        <div className="list-container">
          {this.state.todos.map((todo, i) => <Todo entry={todo} index={i} onDelete={this.onDelete} updateEntry={this.updateTodo}/>)}
        </div>
        {/* <TodoList list={this.state.todos} onDelete={this.onDelete} /> */}
      </div>
    )
  }
}

export default App;
