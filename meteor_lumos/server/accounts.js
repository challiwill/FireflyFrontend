Accounts.validateNewUser(function(user) {
    if (!user.emails[0].address.endsWith('@berkeley.edu')) {
	throw new Meteor.Error(403, 'Currently Firefly is only available for UC Berkeley students with a valid @berkeley.edu email account.');
    }
    return true;
});

Accounts.validateLoginAttempt(function(info) {
    var user = info.user;
    if (!user) {
	return false;
    }
    if (!user.emails[0].address.endsWith('.edu')) {
	throw new Meteor.Error(403, 'You must use a .edu email address.');
    }
    if (!user.emails[0].address.endsWith('@berkeley.edu')) {
	throw new Meteor.Error(403, 'Currently Firefly is only available for UC Berkeley students.');
    }
    return true;
});
