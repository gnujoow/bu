var React = require('react')

var ItemList = React.createClass({
	render: function(){
		return (
			<div className="col-md-3">
				<h1> ItemList1</h1>
				<p>{this.props.name}</p>
			</div>
		);
	}
});
module.exports = ItemList;