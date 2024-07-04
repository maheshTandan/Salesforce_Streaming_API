const jsforce = require('jsforce');

//your org username
const username = '';
//your org password
const password = '';
//your org security Token (under profile click Settings :- Reset My Security Token)
const securityToken = '';

const conn = new jsforce.Connection();
conn.login(username, password + securityToken, function(err, res) {
  if (err) { 
      return console.error(err);
  }

  console.log('Authenticated');
  /*
  add your Platform event name here /event/ is permanent after it comes the Platform event Name
  I have created a custom Platform event named TandanPlatformEvent' using salesforce Interface setup -> Platform events.
  */
  conn.streaming.topic("/event/TandanPlatformEvent__e").subscribe(function(message) {
    // console.log('Event Type : ' + message.event.type);
    // console.log('Event Created : ' + message.event.createdDate);
    // console.log('Object Id : ' + message.sobject.Id);
    console.log('Event : ' + JSON.stringify(message));
  });
});