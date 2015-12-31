var React = require('react')
var MemulItem = require('./MemulItem')

var MemulList = React.createClass({
	
	render: function(){
		if(typeof this.props.memul != 'undefined'){
			console.log(this.props.memul);
					
			var self = this;
			var itemNodes = this.props.memul.map(function(house){
				return(
						<MemulItem key = {house.id} supply={house.supply} only={house.only} price={house.price} />
				);
			});
			return (
				<div className="col-md-4 memulList">
					<h1> item# : {this.props.name}</h1>
					{itemNodes}
				</div>
			);
		}
		else{
			return (
				<div className="col-md-4 memulList">
					<h1> 로딩 </h1>
				</div>
			);
		}
	}
});
module.exports = MemulList;