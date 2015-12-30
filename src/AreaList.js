var React = require('react');
var AreaItem = require('./AreaItem')

var AreaList = React.createClass({
	getInitialState: function() {
  	return {data: []};
	},
	componentDidMount: function(){
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data){
				this.setState({data: data});
				console.log("load Gu OK")
			}.bind(this)
		});
	},
	handleClick: function(){

	},
	render: function(){
		var self = this;
		var itemNodes = this.state.data.map(function(gu){
			var center = {lat: gu.x, lng: gu.y}
			return(
				<AreaItem key={gu.id} name={gu.name} center={center} onClick={self.props.onClick} />
			);
		});
		return(
			<div className="areaList col-md-12">
				{itemNodes}
			</div>
		);
	}
});

module.exports = AreaList;