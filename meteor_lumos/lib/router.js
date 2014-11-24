Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() { return Meteor.subscribe('friends');}
});

Router.map(function() {
    this.route('friendsList', {path: '/'});

    this.route('friendPage', {
	path: '/friends/:_id',
	data: function() { return Friends.findOne(this.params._id); }
    });

    this.route('userPage', {
	path: '/user/:_id',
	data: function() { return Meteor.users.findOne(this.params._id); }
    });

    this.route('postEdit', {
	path: '/posts/:_id/edit',
	data: function() { return Posts.findOne(this.params._id); }
    });

    this.route('postSubmit', { 
	path: '/submit'
    });
});

var requireLogin = function(pause) { 
    if (! Meteor.user()) {
	if (Meteor.loggingIn()) 
	    this.render('loading')
	else 
	    this.render('accessDenied');
	pause(); 
    }
}

Router.onBeforeAction('loading');
