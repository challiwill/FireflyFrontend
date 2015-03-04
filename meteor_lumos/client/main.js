Meteor.subscribe('friends');
Meteor.subscribe('crimes');
Meteor.subscribe('profile');

// TODO pretty sure these shouldn't have to be here.
// TODO split these into 2 separate functions
Tracker.autorun(function () {
    var myGeo = Geolocation.latLng();
    if (myGeo) {
	console.log("[-] Setting profile position...");
	Profiles.update({_id:Meteor.userId()},{$set:{
	    'lat': myGeo.lat, 
	    'lng': myGeo.lng
	}});
    } else {
	console.log("[-] Cannot get my position...");
    }

    console.log("[+] Plotting friend positions...");
    Profiles.find({_id:{$ne: Meteor.userId()}}).forEach(function(friend) {
	var fLat = friend.lat;
	var fLng = friend.lng;
	if (fLat <= 90 && fLat >= -90 && fLng <= 180 && fLng >= -180 && gmaps.map) {
	    console.log("[-] friend's position is: " 
			+ fLat + ', ' + fLng);
	    fGeo = new google.maps.LatLng(fLat, fLng);
    
	    // TODO make friend.name
	    var contentString = friend._id;
	    var infowindow = new google.maps.InfoWindow({
		content: contentString
	    });

	    // TODO make better friend icon
	    var friendIcon = '/images/friendIcon.gif';
	    // TODO make sure that markers do not get placed multiple times
	    var friendMarker = new google.maps.Marker({
		position: fGeo,
		map: gmaps.map,
		icon: friendIcon,
		// TODO make friend.name
		title: friend._id,
	    });

	    google.maps.event.addListener(friendMarker, 'click', function() {
		infowindow.open(gmaps.map,friendMarker);
	    });
	} else {
	    console.log("[-] Cannot track friend's position.");
	}
    });
});
