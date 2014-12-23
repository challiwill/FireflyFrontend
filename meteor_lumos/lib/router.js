Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() { 
	return [Meteor.subscribe('friends')] 
    }
});

Router.map(function() {

    this.route('Home', {
	path: '/'
    });

    this.route('friendPage', {
    	path: '/users/:_id',
    	data: function() { return Friends.findOne(this.params._id); }
    });

    this.route('profile', {
	path: '/profile'
    });

});

var requireLogin = function() { 
    if (! Meteor.user())
	this.render('accessDenied');
    else 
	this.next();
}

Router.onBeforeAction(requireLogin, {except: 'Home'});
