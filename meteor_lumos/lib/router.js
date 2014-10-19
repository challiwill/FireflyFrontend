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
});

Router.onBeforeAction('loading');
