'use strict';
// Pubnub service configuration
// ===========================

let PubNub = require('pubnub');

let pubnub = new PubNub({
            publishKey: 'pub-c-2c67fe6b-f27e-4ca4-9567-1efba5afdfa9',
            subscribeKey: 'sub-c-d27aec50-4703-11e8-9bda-6e2bc5105594',
            secretKey: 'sec-c-ZDY3OGE0MjMtYzQzOC00YTA4LWIyZWEtZTAxYjFhOGY2ZTcw',
            ssl: true,
});


module.exports = {
  publish: function(channel, message) {
    pubnub.publish({
             channel: channel,
             message: JSON.stringify(message)},
             function(status, response) {
               if (status.error) {
                 console.log(status);
               } else {
                 console.log('Workout Published w/ timetoken', response.timetoken);
               }
             });
  },
  subscribe: function(channel, callback) {
    pubnub.addListener({

        message: function(m) {


            let msg = m.message;

            callback(msg);
            },
  });
  //demo channel sub
    pubnub.subscribe({
        channels: [channel],
    });
  },
};
