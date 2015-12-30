var React = require('react');

var Map = React.createClass({
	getInitialState: function(){
		return({
			//data: this.props.data,
			center: this.props.center
		});
	},
	componentDidMount: function(){
		this.DrawMap();
		this.componentDidUpdate();	
	},
	DrawMap: function(){
		//function from App
		self = this;

		//make map
		var options = { //지도를 생성할 때 필요한 기본 옵션
			center: new daum.maps.LatLng(this.state.center.lat, this.state.center.lng), //지도의 중심좌표.
			level: 4 //지도의 레벨(확대, 축소 정도)
		};
		map = new daum.maps.Map(document.getElementById('map'), options);

		//clusterer
		clusterer = new daum.maps.MarkerClusterer({
			map: map,
			averageCenter: true,
			minLevel: 5
		});

		//getborder
		daum.maps.event.addListener(map, 'tilesloaded',function(){
			console.log("tilesloaded");
			var center = {lat:map.getCenter().getLat(), lng:map.getCenter().getLng()}
			var bounds = map.getBounds();
			self.props.getCenterPos(center);
			/*
			$.ajax({
		    url: '/getDanji',
		    dataType: 'json',
		    type: 'POST',
		    data: bounds,
		    success: function(data){
		      this.setState({data: data});
		      console.log("ok")
		    }.bind(this)
	  	});*/
		});
	},
	componentDidUpdate: function(){
		console.log("loaded");
		var moveLatLon = new daum.maps.LatLng(this.props.center.lat, this.props.center.lng);
		map.panTo(moveLatLon);
		//remove all markers
		clusterer.clear();

		//add Infowindow
		var addInfoWindow = function(marker,msg,map){
			marker.info = new daum.maps.InfoWindow({
				content: '<div style="padding:5px;">'+marker.data.name+'</div>'
			});
			//event for markers
			daum.maps.event.addListener(marker, 'mouseover', function() {
		    marker.info.open(map, marker);
			});
			daum.maps.event.addListener(marker, 'mouseout', function() {
				marker.info.close();
			});
			daum.maps.event.addListener(marker, 'click',function(){
				marker.info.close();
				self.props.handleResponse(Number(marker.getTitle()));
			});
		}

		if(typeof this.props.data != 'undefined'){
			var markerList = [];
			for (var i=0, length = this.props.data.length; i < length; i++){
				//make marker
				var markerPosition = new daum.maps.LatLng(this.props.data[i].x, this.props.data[i].y);
				var marker = new daum.maps.Marker({
						position: markerPosition,
						title: this.props.data[i].id,
						clickable: true
					});
				clusterer.addMarkers(marker);

				marker.data = this.props.data[i];
				addInfoWindow(marker, this.props.data[i].name,map);
				markerList.push(marker);
			}
			clusterer.addMarkers(markerList);
		};
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
