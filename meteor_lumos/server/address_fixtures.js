var Parser = Npm.require('node-dbf');

if (Addresses.find().count() == 0) {

    // TODO would like to make this a relative path somehow
    var parser = new Parser('/Users/corbin/Documents/Projects/FireFly/meteor_lumos/server/dbase/berkeley.dbf');

    parser.on('start', function(p) {
	console.log('Populating mongodb document of Berkeley addresses.');
    });
    
    parser.on('header', function(h) {
	console.log('dBase file header has been parsed');
    });
    var count = 0;
    parser.on('record', Meteor.bindEnvironment(function(record){
	Addresses.insert({'streetNum': record.StreetNum,
			  'streetName': record.StreetName,
			  'streetSufx': record.StreetSufx,
			  'city': record.City,
			  'state': record.State,
			  'zip': record.Zip,
			  'lat': record.latitude,
			  'lng': record.longitude});
    }, function(error) {console.log( error);}));

    parser.on('end', function(p) {
	console.log('Finished parsing the dBase file');
    });

    parser.parse()

}
