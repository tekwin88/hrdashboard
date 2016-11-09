Meteor.subscribe('employees');

// console.log('client.js')

if (Meteor.isClient) {
  // console.log('Meteor.isClient')

  // Template.employees.helpers({
  Template.showrecords.helpers({
    employees: function() {
      return Employees.find({}, {sort: {createdAt: -1}});
    },
    employee: function(){
      var currUser = Meteor.user();
      console.log(currUser.emails[0].address);
      var employee = Employees.findOne({email: currUser.emails[0].address});
      console.log(employee);
      return employee;
    }
  });
  // Event handlers.
  Template.employees.events({
    "submit .add-employee": function(event){
      // console.log('submit .add-employee')
      // Prevent default browser form submit
      event.preventDefault();
      // Get value from form element
      var name = event.target.name.value;
      var empno = event.target.empno.value;
      var email = event.target.email.value;
      var contact = event.target.contact.value;
      var position = event.target.position.value;
      var leaveconsumed = event.target.leaveconsumed.value;
      var leavebalance = event.target.leavebalance.value;
      var joindate = event.target.joindate.value;

      Meteor.call('addEmployee', name, empno, email, contact, position, leaveconsumed, leavebalance, joindate);

      //Clear form
      event.target.name.value = '';
      event.target.empno.value = '';
      event.target.email.value = '';
      event.target.contact.value = '';
      event.target.position.value = '';
      event.target.leaveconsumed.value = '';
      event.target.leavebalance.value = '';
      event.target.joindate.value = '';

      return false;
    },

    "click .delete-employee": function(event){
      if(confirm('Delete Employee Record?')){
        Meteor.call('deleteEmployee', this._id);
      }
      return false;
    },
  });
}
