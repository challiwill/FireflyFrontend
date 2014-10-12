// Manager for Posts

Template.postsList.helpers({ 
    posts: function() {
	return Posts.find(); 
    }
});
