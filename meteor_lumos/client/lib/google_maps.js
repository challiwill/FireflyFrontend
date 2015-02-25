// code from http://www.andrehonsberg.com/article/reactive-google-maps-markers-meteor-js

gmaps = {
    // map object
    map: null,
    
    // // google markers objects
    // markers: [],
    
    // // google lat lng objects
    // latLngs: [],
    
    // // our formatted marker data objects
    // markerData: [],
    
    // // add a marker given our formatted marker data object
    // addMarker: function(marker) {
    //     var gLatLng = new google.maps.LatLng(marker.lat, marker.lng);
    //     var gMarker = new google.maps.Marker({
    //         position: gLatLng,
    //         map: this.map,
    //         title: marker.title,
    //         // animation: google.maps.Animation.DROP,
    //         icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    //     });
    //     this.latLngs.push(gLatLng);
    //     this.markers.push(gMarker);
    //     this.markerData.push(marker);
    //     return gMarker;
    // },
    
    // // calculate and move the bound box based on our markers
    // calcBounds: function() {
    //     var bounds = new google.maps.LatLngBounds();
    //     for (var i = 0, latLngLength = this.latLngs.length; i < latLngLength; i++) {
    //         bounds.extend(this.latLngs[i]);
    //     }
    //     this.map.fitBounds(bounds);
    // },
    
    // // check if a marker already exists
    // markerExists: function(key, val) {
    //     _.each(this.markers, function(storedMarker) {
    //         if (storedMarker[key] == val)
    //             return true;
    //     });
    //     return false;
    // },
    
    // intialize the map
    initialize: function() {
        console.log("[+] Intializing Google Maps...");
        var mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(37.869929, -122.265146),
            mapTypeId: google.maps.MapTypeId.ROADMAP // HYBRID
        };
	
        this.map = new google.maps.Map(
            document.getElementById('map'),
            mapOptions
        );
	
        // global flag saying we intialized already
        Session.set('map', true);
    }
}

Template.map.destroyed = function() {
    Session.set('map', false);
}
