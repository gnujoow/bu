var React = require('react')

var MemulList = React.createClass({
	componentDidMount:function(){
		this.componentDidUpdate()
	},
	componentDidUpdate:function(){
		/*
		$.ajax({
			url: '/getMemul/'+this.props.name,
			dataType: 'json',
			cache: false,
			success: function(data){
				this.setState({data: data})
				console.log("매물로드ok")
				console.log(data);
			}.bind(this)
		})*/
	},
	render: function(){
		var self = this;
		/*
		if (this.stae.data.map != 'null'){
			var itemNodes = this.state.data.map(function(memul){
				<MemulItem key={memul.id} supply={memul.supply} only={memul.only} />
			});
		}*/
		return (
			<div className="col-md-3">
				<h1> ItemList1</h1>
				<p>{this.props.name}</p>
			</div>
		);
	}
});
module.exports = MemulList;