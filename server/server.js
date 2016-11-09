Meteor.startup(() => {
  // code to run on server at startup
  if (Meteor.isServer) {
    Meteor.publish('employees', function(){
      return Employees.find();
    });

    var users = Meteor.users.find().fetch();
       _.each(users,function(userData){
       if(userData.emails[0].address === 'cindy@abc.com'){

           Roles.addUsersToRoles(userData,['admin']);
       }
   });
  }
});
