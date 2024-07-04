const jsforce = require('jsforce');

// Configure your Salesforce connection details
const conn = new jsforce.Connection({
  // Replace with your credentials
  oauth2: {
    clientId: '',
    clientSecret: '',
    redirectUri: 'http://localhost:3000/oauth2/callback'
    // ... other connection details
  }
});

// Define the Platform Event channel to subscribe to
const channel = '/data/AccountChangeEvent';

// Connect to Salesforce and handle potential errors
conn.login(function(err, res) {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Authenticated to Salesforce');

  // Create a streaming client using the connection
  const fayeClient = conn.streaming.createClient();

  // Subscribe to the Platform Events channel
  fayeClient.subscribe(channel, function(message) {
    console.log('Received Platform Event:', message);

    // Access specific details from the message
    const eventType = message.event.type;
    const sobjectId = message.sobject.Id;
    const eventData = message; // Entire message object

    // Process the event data based on your requirements
    // You can perform actions like storing data in a database, updating UI, etc.
  });

  // Handle disconnection and reconnection logic (optional)
  fayeClient.onError(function(error) {
    console.error('Error in streaming client:', error);
    // Implement logic to reconnect if desired
  });
});
