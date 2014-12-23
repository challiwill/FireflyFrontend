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
    	path: '/friends/:_id',
    	data: function() { return Friends.findOne(this.params._id); }
    });

    this.route('profile', {
	path: '/profile'
    });

    this.route('postEdit', {
	path: '/posts/:_id/edit',
	data: function() { return Posts.findOne(this.params._id); }
    });

    this.route('postSubmit', { 
	path: '/submit'
    });

});

var requireLogin = function() { 
    if (! Meteor.user())
	this.render('accessDenied');
    else 
	this.next();
}

Router.onBeforeAction(requireLogin, {except: 'Home'});
