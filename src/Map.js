var React = require('react');

var Map = React.createClass({
	componentDidMount: function(){
		this.DrawMap();
		this.componentDidUpdate();
	},
	DrawMap: function(){
		//function from App
		var parentFunc = this.props.handleResponse;

		//make map
		var options = { //지도를 생성할 때 필요한 기본 옵션
			center: new daum.maps.LatLng(this.props.center.lat, this.props.center.lng), //지도의 중심좌표.
			level: 3 //지도의 레벨(확대, 축소 정도)
		};
		this.map = new daum.maps.Map(document.getElementById('map'), options); 
	},
	componentDidUpdate: function(){
		//add Infowindow
		var addInfoWindow = function(marker,msg,map){
			var infowindow = new daum.maps.InfoWindow({
				content: '<div style="padding:5px;">'+marker.data.name+'</div>'
			});
			daum.maps.event.addListener(marker, 'mouseover', function() {
		    infowindow.open(map, marker);
			});
			daum.maps.event.addListener(marker, 'mouseout', function() {
				infowindow.close();
			});
			daum.maps.event.addListener(marker, 'click',function(){
				console.log("id",marker.getTitle());
				//parentFunc(Number(marker.getTitle()));
			});
		}
		//
		console.log(this.props.data);
		for (var i=0, length = this.props.data.length; i < length; i++){
			//make marker
			var markerPosition = new daum.maps.LatLng(this.props.data[i].x, this.props.data[i].y);
			var marker = new daum.maps.Marker({
					position: markerPosition,
					title: this.props.data[i].id,
					clickable: true
				});
			marker.data = this.props.data[i];

			marker.setMap(this.map);
			addInfoWindow(marker, this.props.data[i].name,this.map);
		}
	},
	render: function(){
		return (
			<div className="map-holder col-md-9">
			<h1>now okasdfa12 !</h1>
				<div id="map"></div>
			</div>
		);
	}
});

module.exports = Map;
