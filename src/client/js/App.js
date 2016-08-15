import React from 'react';
import ReactDOM from 'react-dom';
import Calendar  from './Calendar';

const App = () => (
  <div>
    <h1>Calendar</h1>
    <Calendar />
  </div>
);


ReactDOM.render(<App />, document.getElementById('app'));
