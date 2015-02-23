var Cheerio = Npm.require('cheerio');

// TODO use OSM nominatim http://wiki.openstreetmap.org/wiki/Nominatim
//      or other geocoding API service
// TODO cache result effectively
var gm = Npm.require('googlemaps');

if (Crimes.find().count() == 0) {

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

    crime_types = {
	// 'arson' : 'AR',
	'assault' : 'AS',
	// 'burglary' : 'BU',
	'disturbing the peace' : 'DP',
	// 'drugs/alcohol violations' : 'DR',
	// 'dui' : 'DU',
	// 'fraud' : 'FR',
	'homicide' : 'HO',
	// 'motor vehicle theft' : 'VT',
	'robbery' : 'RO',
	// 'sec crimes' : 'SX',
	'theft/larceny' : 'TH',
	// 'vandalism' : 'VA',
	// 'vehicle break-in/theft' : 'VB',
	'weapons' : 'WE'
    };

    order = ['description','case','address','agency','date'];

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
	    	$(this).find('td span').each(function(i) {
		    var field = order[i];
		    incident[field] = $(this).text().trim();

	    	});

	    	if(incident['address'] != '-' && 
		   incident['address'].indexOf('/') > -1) {
		    // TODO geocode street intersections [remove indexOf check]
		    // TODO geocode campus buildings
		    // TODO filter campus buildings
		    pos = geocode(incident['address'] + ' Berkeley CA');
		    if(pos){
			incident['lat'] = pos.lat;
			incident['lng'] = pos.lng;
		    } else {
			// TODO impossible values, make sure these are sorted out later
			incident['lat'] = 100; // goes from 90 to -90
			incident['lng'] = 200; // goes from 180 to -180
		    }
		    Crimes.insert(incident);
    		}
    	    }
    	});

    }
}

function geocode(address) {
    address = address.split(" ");
    match = Addresses.find({streetNum: parseInt(address[0]), 
			   streetName: address[2], 
			   city: address[4], 
			  state: address[5]});
    if(match){
	return {'lat': match.lat, 'lng': match.lng};
    } else {
	return null;
    }
}
