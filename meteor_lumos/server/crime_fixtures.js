var Cheerio = Npm.require('cheerio');

// TODO use OSM nominatim http://wiki.openstreetmap.org/wiki/Nominatim
//      or other geocoding API service
// TODO cache result effectively
var gm = Npm.require('googlemaps');

var counter = 0;

if (Crimes.find().count() == 0) {

    bmonth = '05';
    bday = '30';
    byear = '2014';
    emonth = '11';
    eday = '05';
    eyear = '2014';
    xmin = '-13616311.669473337';
    ymin = '4558847.172438941';
    xmax = '-13603260.046893662';
    ymax = '4563184.9737941185';

    crime_types = {
	'arson' : 'AR',
	'assault' : 'AS',
	'burglary' : 'BU',
	'disturbing the peace' : 'DP',
	'drugs/alcohol violations' : 'DR',
	'dui' : 'DU',
	'fraud' : 'FR',
	'homicide' : 'HO',
	'motor vehicle theft' : 'VT',
	'robbery' : 'RO',
	'sec crimes' : 'SX',
	'theft/larceny' : 'TH',
	'vandalism' : 'VA',
	'vehicle break-in/theft' : 'VB',
	'weapons' : 'WE'
    };

    order = ['description','case','address','agency','date'];

    for (crime in crime_types) {
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

	    	if(incident['address'] != '-') {
		    gm.geocode(incident['address'] + 'Berkeley CA', Meteor.bindEnvironment(function(err, data){
		    	if(err) {
		    	    console.log(err);
		    	}
		 	else {
		 	    incident['lat'] = data.results[0].geometry.location.lat;
		 	    incident['long'] = data.results[0].geometry.location.lng;
			    counter = counter + 1;
			    Crimes.insert(incident);
			    
			}
		    }, function(error) {console.log( error);}));
    		}
    	    }
    	});

    }
}
