Template.map.rendered = function () {
    if (! Session.get('map'))
    	gmaps.initialize();

    Deps.autorun(function() {
        console.log("[+] Intializing Heatmap...");
	var crimeMap = new Array();

	Crimes.find().forEach(function(incident) {
            crimeMap.push(new google.maps.LatLng(incident.lat, incident.lng));
	});

	heatmap = new google.maps.visualization.HeatmapLayer({
            data: crimeMap,
	    radius: 30,
	    dissipating: true,
	    opacity: 0.75,
	    // TODO come up with better gradient
	    gradient: [ 'rgba(255, 200, 0, 0)',
			'rgba(255, 100, 0, 1)',
			'rgba(255, 75, 0, 1)',
			'rgba(255, 50, 0, 1)',
			'rgba(255, 25, 0, 1)',
			'rgba(255, 0, 0, 1)'
		      ]
	});

	heatmap.setMap(gmaps.map);
    });

};

// // Not worrying about personal location yet
// var geo = Geolocation.latLng();
// new google.maps.LatLng(geo.lat, geo.lng)
// var infowindow = new google.maps.InfoWindow({
//     map: gmap,
//     position: geo,
//     content: 'Location found using HTML5.'
// });
