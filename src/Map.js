var React = require('react');

var Map = React.createClass({
	componentDidMount: function(){
		this.DrawMap();
		this.componentDidUpdate();
	},
	DrawMap: function(){
		//function from App
		parentFunc = this.props.handleResponse;

		//make map
		var options = { //지도를 생성할 때 필요한 기본 옵션
			center: new daum.maps.LatLng(this.props.center.lat, this.props.center.lng), //지도의 중심좌표.
			level: 3 //지도의 레벨(확대, 축소 정도)
		};
		map = new daum.maps.Map(document.getElementById('map'), options);

		//getborder
		daum.maps.event.addListener(map, 'tilesloaded',function(){
			var bounds = map.getBounds();
			console.log("bounds:",bounds);
		});

	},
	componentDidUpdate: function(){
		//add Infowindow
		var addInfoWindow = function(marker,msg,map){
			var infowindow = new daum.maps.InfoWindow({
				content: '<div style="padding:5px;">'+marker.data.name+'</div>'
			});
			//event for markers
			daum.maps.event.addListener(marker, 'mouseover', function() {
		    infowindow.open(map, marker);
			});
			daum.maps.event.addListener(marker, 'mouseout', function() {
				infowindow.close();
			});
			daum.maps.event.addListener(marker, 'click',function(){
				parentFunc(Number(marker.getTitle()));
			});
		}
		//
		for (var i=0, length = this.props.data.length; i < length; i++){
			//make marker
			var markerPosition = new daum.maps.LatLng(this.props.data[i].x, this.props.data[i].y);
			var marker = new daum.maps.Marker({
					position: markerPosition,
					title: this.props.data[i].id,
					clickable: true
				});
			marker.data = this.props.data[i];

			marker.setMap(map);
			addInfoWindow(marker, this.props.data[i].name,map);
		}
	},
	render: function(){
		return (
			<div className="map-holder col-md-9">
				<div id="map"></div>
			</div>
		);
	}
});

module.exports = Map;
