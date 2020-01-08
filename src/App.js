import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  state = {
    isclicked: false
  };
  toggleClick = () => {
    this.setState({
      isclicked: !this.state.isclicked
    })
  };
  render() {
    return (
      <div className="App-header">
        <button onClick={this.toggleClick}>{this.state.isclicked.toString()}</button>
      </div>
    )
  }
}

export default App;
