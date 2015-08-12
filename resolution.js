Resolutions = new Mongo.Collection('resolutions'); //gets data from mongo and not the arrays



if (Meteor.isClient) {      //all you need to display database collections
  Template.body.helpers({
    resolutions: function(){
      if (Session.get('hideFinished')){
        return Resolutions.find({checked: {$ne: true}}); //$ne = mongo way to check if true
      } else {

        return Resolutions.find(); //otherwise return all

      }
    },
    hideFinished: function() {
      return Session.get('hideFinished'); //session variable makes to be done at top
    }
  });

  Template.body.events({
    'submit .new-resolution': function(event){
      var title = event.target.title.value;

      Resolutions.insert({
        title : title,
        createdAt: new Date()
      });

      event.target.title.value = "";
      return false;
    },
    'change .hide-finished': function(event){ //hides the finished projects from others
      Session.set('hideFinished', event.target.checked ); //clicking the check starts the event and hides
    }
  });

  Template.resolution.events({
    'click .toggle-checked': function(){
      Resolutions.update(this._id, {$set: {checked: !this.checked}}); //whats current value of this.check checks value and updates
    },

    'click .delete': function(){ //this is an object need a comma
      Resolutions.remove(this._id); //mongo auto creates ids so we can just remove to elete item
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY" //adjusts sign in
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
