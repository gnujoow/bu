//react
var React = require('react');
var ReactDOM = require('react-dom');
 
//application
var App = require('./src/App')

ReactDOM.render(
  <App url='/getDanji'/>,
  document.getElementById('main')
);