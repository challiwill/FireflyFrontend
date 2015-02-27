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
	    gradient: [ 'rgba(255, 0, 250, 0)',
			'rgba(255, 0, 225, 1)',
			'rgba(255, 0, 200, 1)',
			'rgba(255, 0, 175, 1)',
			'rgba(255, 0, 150, 1)',
			'rgba(255, 0, 125, 1)',
			'rgba(255, 0, 100, 1)',
			'rgba(255, 0, 75, 1)',
			'rgba(255, 0, 50, 1)',
			'rgba(255, 0, 25, 1)',
			'rgba(255, 0, 0, 1)'
		      ]
	});

	heatmap.setMap(gmaps.map);
    });
};

Tracker.autorun(function () {
    console.log("[+] Plotting personal position...");
    var myGeo = Geolocation.latLng();
    if (myGeo && gmaps.map) {
	console.log("[-] my position is: " + myGeo.lat + ', ' + myGeo.lng);
	myGeo = new google.maps.LatLng(myGeo.lat, myGeo.lng);
	var marker = new google.maps.Marker({
	    position: myGeo,
	    map: gmaps.map,
	    title: 'Here I am.'
	});
    } else {
	console.log("[-] Cannot track position.");
    }
});
