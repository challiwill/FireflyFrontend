var testData = [ //sample data to load into heatmap
	{location: new google.maps.LatLng(37.867774, -122.251919), weight: 1},
	{location: new google.maps.LatLng(37.875345, -122.258850), weight: 3},
	{location: new google.maps.LatLng(37.868740, -122.259172), weight: 5},
	{location: new google.maps.LatLng(37.867554, -122.253636), weight: 7},
	{location: new google.maps.LatLng(37.864250, -122.264944), weight: 9},
	{location: new google.maps.LatLng(37.865360, -122.263163), weight: 50}
];

//TODO: implement
//function getDataLocalFile(); 

//TODO: implement
//function setDataLocalFile();

//TODO: implement
//function getCurrLoc();

//TODO: populate
dataRadiusEnum = { //should this be proportional to intensity? / is this even necesssary?
	ASSAULT: 100,
	DIM_STREETLIGHT: 20
}

//TODO: populate
dataIntensityEnum = {
	ASSAULT: 50,
	DIM_STREETLIGHT: 5
}

function addHeatmapLayer(map, locations, pointRadius) {
	heatmap = new google.maps.visualization.HeatmapLayer({
		data: locations,
		radius: pointRadius,
		dissipating: true,
	});
}

function initialize() {
	var mapOptions = {
		zoomControl: false, //must disable zooming to fix datapoint radii
		scaleControl: false,
		scrollwheel: false,
		disableDoubleClickZoom: true,

	    center: new google.maps.LatLng(37.868740, -122.259172),
	    zoom: 16
	};
	map = new google.maps.Map(document.getElementById("map-canvas"),
	    mapOptions);

	addHeatmapLayer(map, testData, 50);

	heatmap.setMap(map);
}
google.maps.event.addDomListener(window, 'load', initialize);