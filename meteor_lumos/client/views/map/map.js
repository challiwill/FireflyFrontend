var dim = 4;
var zones = new Array(dim);
zones[1] = 0;
var crime_points = new Array();
var friend_points = new Array();
var user_point = new Array();

Meteor.subscribe('crimes', function() {
    Crimes.find().forEach(function(crime) {
        crime_points.push(new google.maps.LatLng(crime.lat, crime.long));
    })
});

Template.body.helpers({
    crime: function () {
      	return Crimes.find({});
    }
});

Template.map.rendered = function () {
    var mapOptions = {
        zoom: 14,
    };
    
    gmap = new google.maps.Map(document.getElementById("map"), mapOptions); 
    gmap.setCenter(new google.maps.LatLng(37.869929, -122.265146));

    heatmap = new google.maps.visualization.HeatmapLayer({
        data: crime_points,
        radius: 30,
        map: gmap
    });

    heatmap.setMap(gmap);

};

// // Not worrying about personal location yet
// var geo = Geolocation.latLng();
// new google.maps.LatLng(geo.lat, geo.lng)
// var infowindow = new google.maps.InfoWindow({
//     map: gmap,
//     position: geo,
//     content: 'Location found using HTML5.'
// });
