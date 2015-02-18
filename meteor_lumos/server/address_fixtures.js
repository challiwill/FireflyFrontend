var Parser = Npm.require('node-dbf');

if (Addresses.find().count() == 0) {

    order = ['streetNum','streetName','streetSufx','city','state','zip','lat','lng'];

    // TODO would like to make this a relative path somehow
    var parser = new Parser('/Users/corbin/Documents/Projects/FireFly/meteor_lumos/server/dbase/berkeley.dbf');

    parser.on('start', function(p) {
	console.log('Creating mongodb document of Berkeley addresses.');
    });
    
    parser.on('header', function(h) {
	console.log('dBase file header has been parsed');
    });

    // TODO put in address collection
    parser.on('record', function(record) {
	console.log('Address: ' + record.StreetNum + ' ' 
		    + record.StreetName + ' ' 
		    + record.StreetSufx);
    });

    parser.on('end', function(p) {
	console.log('Finished parsing the dBase file');
    });

    parser.parse()

}
