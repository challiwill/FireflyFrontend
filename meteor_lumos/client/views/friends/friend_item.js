// Manager for friend item
Template.friendItem.helpers({ 
    email: function() {
	return this.emails[0].address;
    },
    name: function() {
	return this._id;
    },
});
