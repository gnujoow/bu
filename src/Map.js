var React = require('react');

var Map = React.createClass({
	componentDidMount: function(){
		this.componentDidUpdate();
	},
	componentDidUpdate: function(){
		//make map
		var options = { //지도를 생성할 때 필요한 기본 옵션
			center: new daum.maps.LatLng(this.props.center.lat, this.props.center.lng), //지도의 중심좌표.
			level: 3 //지도의 레벨(확대, 축소 정도)
		};
		var map = new daum.maps.Map(document.getElementById('map'), options); 

		var addInfoWindow = function(marker,msg){
			var infowindow = new daum.maps.InfoWindow({
				content: '<div style="padding:5px;">'+msg+'</div>'
			});
			daum.maps.event.addListener(marker, 'mouseover', function() {
		    infowindow.open(map, marker);
			});
			daum.maps.event.addListener(marker, 'mouseout', function() {
				infowindow.close();
			});
		}

		for (var i=0, length = this.props.data.length; i < length; i++){
			//make marker
			var markerPosition = new daum.maps.LatLng(this.props.data[i].x, this.props.data[i].y);
			var marker = new daum.maps.Marker({
					position: markerPosition,
					clickable: true
				});
			marker.setMap(map);
			addInfoWindow(marker,this.props.data[i].name);
		}

	},
	render: function(){
		return (
			<div className="map-holder col-md-9">
			<h1>now  오오미오asdf!</h1>
				<div id="map"></div>
			</div>
		);
	}
});

module.exports = Map;
