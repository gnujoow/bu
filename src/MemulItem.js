var React = require('react');

var MemulItem = React.createClass({
	render: function(){
		return(
			<div>
				<div className = "col-md-4">{this.props.supply}</div>
				<div className = "col-md-4">{this.props.only}</div>
				<div className = "col-md-4">{this.props.price}</div>
			</div>
		);
	}
})

module.exports = MemulItem;