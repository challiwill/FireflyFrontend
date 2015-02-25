var Cheerio = Npm.require('cheerio');

var city = "BERKELEY";
var state = "CA";

if (Crimes.find().count() == 0) {

    // TODO loop over one week at a time to get full data
    console.log("[+] Loading crime data for " + city + ', ' + state + "...");
    bmonth = '05';
    bday = '30';
    byear = '2014';
    emonth = '2';
    eday = '18';
    eyear = '2015';
    xmin = '-13616311.669473337';
    ymin = '4558847.172438941';
    xmax = '-13603260.046893662';
    ymax = '4563184.9737941185';

    var crime_types = {
	'assault' : 'AS',
	'disturbing the peace' : 'DP',
	'homicide' : 'HO',
	'robbery' : 'RO',
	'theft/larceny' : 'TH',
	'weapons' : 'WE'
    };



    for (crime in crime_types) {
	// BPD and UCPD share a crime report page
	var url = 'http://www.crimemapping.com/DetailedReport.aspx?db='+
	    bmonth+'/'+bday+'/'+byear+'+00:00:00&de='+emonth+'/'+eday+'/'+
	    eyear+'+23:59:00&ccs='+crime_types[crime]+'&xmin='+xmin+'&ymin='+
	    ymin+'&xmax='+xmax+'&ymax='+ymax;
	
	result = Meteor.http.get(url);
    	$ = Cheerio.load(result.content);
    	
    	$('.report tr').each(function(i) {
    	    if(i > 1){
	 	var incident = {'crimetype': crime_types[crime]};
		var order = ['description','case','address','agency','date'];
	    	$(this).find('td span').each(function(i) {
		    incident[order[i]] = $(this).text().trim();
	    	});

	    	if(incident['address'] != '-') {
		    if(incident['address'].indexOf('/') > -1) {
			// TODO geocode street intersections [remove indexOf check]
			// pos = geocodeIntersection(incident['address']);
			pos = null;
		    } else if(incident['address'].indexOf("BLOCK") > -1) {
			pos = geocodeAddress(incident['address']);
    		    } else {
			// TODO filter campus buildings
			// TODO geocode campus buildings
			pos = null;
		    }
		    if(pos && pos.lat && pos.lng){
			console.log("[+] " + incident['address']);
			console.log("[-] " + pos.lat + ', ' + pos.lng);
			incident['lat'] = pos.lat;
			incident['lng'] = pos.lng;
			Crimes.insert(incident);
		    } else {
			console.log("[0] " + incident['address']);
		    }
    		}
	    }
	});
    }
}

function geocodeAddress(address) {
    // format street name and number
    address = address.split("BLOCK");
    address[1] = address[1].split(' ');
    address[1].splice(address[1].indexOf(''),1)
    address[1].splice(address[1].length-1,1);
    address[1] = address[1].join(' ');
    if (address[1] == "MARTIN LUTHER KING")
	address[1] = "M L KING";
    var num = parseInt(address[0]);

    match = Addresses.findOne({streetNum: {$gte: num, $lt: num + 100},
			    streetName: address[1], 
			    city: city, 
			    state: state},
			   {_id: 0,
			    lat: 1,
			    lng: 1});
    if(match && match.lat && match.lng){
	return {'lat': match.lat, 'lng': match.lng};
    } else {
	return null;
    }
}


function geocodeIntersection(address) {
    address = address.split(" ");
    // TODO figure out which street comes first alphabetically
    var sn1 = 0, sn2 = 3;
    match = Intersections.find({streetName1: address[sn1], 
				streetName2: address[sn2], 
				city: address[5], 
				state: address[6]});
    if(match){
	return {'lat': match.lat, 'lng': match.lng};
    } else {
	return null;
    }
}
