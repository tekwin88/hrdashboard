Employees = new Mongo.Collection('employees');

Meteor.methods({
  addEmployee: function(name, empno, email, contact, position, leaveconsumed, leavebalance, joindate){

    if (!Meteor.userId()){
      throw new Meteor.Error('No Access!');
    }
    Employees.insert({
      name: name,
      empno: empno,
      email: email,
      contact: contact,
      position: position,
      leaveconsumed: leaveconsumed,
      leavebalance: leavebalance,
      joindate: joindate,
      createdAt: new Date(),
      userId: Meteor.userId()
    });
  },
  deleteEmployee: function(employeeId){
    Employees.remove(employeeId);
  }
});
