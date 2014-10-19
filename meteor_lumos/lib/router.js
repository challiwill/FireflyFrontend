Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() { return Meteor.subscribe('users');}
});

Router.map(function() {
    this.route('usersList', {path: '/'});

    this.route('userPage', {
	path: '/users/:_id',
	data: function() { return Users.findOne(this.params._id); }
    });
});

Router.onBeforeAction('loading');
