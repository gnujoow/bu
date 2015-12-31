var React = require('react')
var MemulItem = require('./MemulItem')

var MemulList = React.createClass({
	getInitialState: function(){
		console.log('asdf');
		return({
			memul:[]
		});
	},
	componentDidUpdate: function(){
		$.ajax({
	    	url: '/getMemul/'+this.props.name,
	    	dataType: 'json',
	    	cache: false,
	    	success: function(data){
	      this.setState({memul: data})
	      console.log("매물로드ok")
	      console.log(data);
      }.bind(this)
    })
	},
	render: function(){
		var self = this;
		var itemNodes = this.state.memul.map(function(house){
			return(
					<MemulItem key = {house.id} supply={house.supply} only={house.only} price={house.price} />
			);
		});
		return (
			<div className="col-md-3">
				<h1> ItemList1</h1>
				{itemNodes}
			</div>
		);
	}
});
module.exports = MemulList;