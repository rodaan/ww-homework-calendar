import React from 'react';
import ReactDOM from 'react-dom';
import Calendar  from './Calendar';

class App extends React.Component {
  render(){
    return (
      <div>
        <h1>Hello World</h1>
        <Calendar />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));