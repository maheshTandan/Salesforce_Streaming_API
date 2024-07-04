const jsforce = require('jsforce');

const username = '';
const password = '';
const securityToken = '';

const conn = new jsforce.Connection();
conn.login(username, password + securityToken, function(err, res) {
  if (err) { 
      return console.error(err);
  }

  console.log('Authenticated');
  
  conn.streaming.topic("/data/AccountChangeEvent").subscribe(function(message) {
    // console.log('Event Type : ' + message.event.type);
    // console.log('Event Created : ' + message.event.createdDate);
    // console.log('Object Id : ' + message.sobject.Id);
    console.log('Event : ' + JSON.stringify(message));
  });
});