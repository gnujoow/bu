var React = require('react');

var AreaItem = React.createClass({
	handleClick: function(){
		this.props.onClick(this.props.center);
	}
	,
	render: function(){
		return(
			<div className="areaItem col-md-1" onClick={this.handleClick}>
				{this.props.name}
			</div>
		);
	}
});

module.exports = AreaItem;