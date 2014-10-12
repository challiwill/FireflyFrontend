if (Meteor.isClient) {
  function submit(submit_name) {
    Users.insert({name: submit_name});
  }

  Template.hello.greeting = function () {
    return "Welcome to meteor_lumos.";
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

