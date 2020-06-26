// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-east-1'});

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var params = {
  MessageAttributes: {
    "Website": {
      DataType: "String",
      StringValue: "www.howtoautomate.in.th"
    },
    "Author": {
      DataType: "String",
      StringValue: "Mart - Tanathip Viriya"
    }
  },
  MessageBody: "Sample message from simple producer",
  MessageDeduplicationId: "HTA_AWS",  // Required for FIFO queues
  MessageGroupId: "Group1",  // Required for FIFO queues
  QueueUrl: "https://sqs.us-east-1.amazonaws.com/803902355889/SimpleQueueForIntegration.fifo"
};

sqs.sendMessage(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.MessageId);
  }
});