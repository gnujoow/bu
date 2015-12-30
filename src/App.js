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
        center: {lat: 37.52085679565041, lng:  127.04701312474145},
        bounds: {T:127.02884405627579,aa:127.06518448556062,ba:37.52558743753324,ca:37.51612335307927},
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
  getCenterPos: function(position){
    console.log('getGu called');
    this.setState({center: position});
    console.log(this.state.center);
  },
  render: function() {
    return (
      <div className="app col-md-12">
        <AreaList getGu={this.getGu} url='/getGu' onClick={this.getCenterPos} />
        <Map center={this.state.center} data={this.state.data}  getCenterPos={this.getCenterPos} handleResponse={this.handleResponse}/>
        <MemulList name={this.state.danji} />
      </div>
    );
  }
});

module.exports = App;
