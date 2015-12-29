var React = require('react');

var Map = require('./Map');
var AreaNav = require('./AreaNav');
var ItemList = require('./ItemList');


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
		return (
			{center: {lat: 37.5301, lng:  127.124}}
		);
	},

  render: function() {
    return (
      <div className="app col-md-12">
        <AreaNav />
        <Map center={this.state.center} data={this.state.data} />
        <ItemList />
      </div>
    );
  }
});

module.exports = App;
