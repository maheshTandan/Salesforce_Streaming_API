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
  add your change data capture event name here /data is permanent after it comes the Channel Name
  "/data/CampaignChangeEvent"
  for custom object
  "school__ChangeEvent"
  */
  conn.streaming.topic("/data/school__ChangeEvent").subscribe(function(message) {
    // console.log('Event Type : ' + message.event.type);
    // console.log('Event Created : ' + message.event.createdDate);
    // console.log('Object Id : ' + message.sobject.Id);
    console.log('Event : ' + JSON.stringify(message));
  });
});