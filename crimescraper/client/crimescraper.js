if (Meteor.isClient) {

    var map;
    var dim = 4;
    var zones = new Array(dim);
    zones[1] = 0;
    var points = new Array();
    

    function test(x) {
        var min = 37.8565551;
        var max = 37.880698;
        var interval = (max - min)/dim;
        var no = (x - min)/interval;
        return parseInt(no);
    }

    Meteor.subscribe('crimes', function() {

        Crimes.find().forEach(function(crime) {

            //points.push(L.latLng(crime.lat, crime.long));
            points.push(new google.maps.LatLng(crime.lat, crime.long));

            //marker = L.marker([crime.lat, crime.long]).addTo(map);
            //marker.bindPopup(crime.lat.toString()).openPopup();
            
            /*new google.maps.Marker({
                position: new google.maps.LatLng(crime.lat, crime.long),
                map: map
            });*/
        })

  	});

    //L.Icon.Default.imagePath = 'packages/mrt_leaflet/images';

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

        //var pointArray = new google.maps.MVCArray(points);
        heatmap = new google.maps.visualization.HeatmapLayer({
            data: points,
            radius: 30,
            map: gmap
        });

        heatmap.setMap(gmap);

    
        /*map = L.map('map').setView([37.869929, -122.265146], 13);

        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                         '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
            maxZoom: 18,
            opacity: 0.5
        }).addTo(map);  

        var heat = L.heatLayer(points, {radius: 30, gradient: {0.2: 'yellow', 0.3: 'orange', 0.6: 'red'}, blur: 100}).addTo(map);*/

    };


}
