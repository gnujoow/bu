var React = require('react');

var AreaItem = React.createClass({
	render: function(){
		return(
			<div className="areaItem col-md-1">
				{this.props.name}
			</div>
		);
	}
});

module.exports = AreaItem;