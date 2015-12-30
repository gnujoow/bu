var React = require('react');

var Map = require('./Map');
var AreaList = require('./AreaList');
var AreaItem = require('./AreaItem');
var MemulList = require('./MemulList');


var App = React.createClass({
	getInitialState: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({data: data});
      }.bind(this)
    });
		return ({
        //state for Map 
        center: {lat: 37.5301, lng:  127.124},
        danji: 0,

        //state of AreaNav
        gu: 0,
    });
	},
  //function for Map
  handleResponse: function(item){
    console.log("handleResponse called",item)
    this.setState({danji: item});
  },
  //funciton for AreaNav
  getGu: function(gu){
    console.log("getGu called");
  },
  render: function() {
    return (
      <div className="app col-md-12">
        <AreaList getGu={this.getGu} url='/getGu'/>
        <Map center={this.state.center} data={this.state.data}  handleResponse={this.handleResponse}/>
        <MemulList name={this.state.danji} />
      </div>
    );
  }
});

module.exports = App;
