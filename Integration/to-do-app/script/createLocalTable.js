const AWS = require("aws-sdk");
AWS.config.update({
  region: "local",
  endpoint: "http://localhost:8000",
});
var dynamodb = new AWS.DynamoDB();
var params = {
  TableName: "TodoTable",
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH" },
    { AttributeName: "tag", KeyType: "RANGE" }
  ],
  AttributeDefinitions: [
    { AttributeName: "id", AttributeType: "S" },
    { AttributeName: "tag", AttributeType: "S" }
    ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
};
dynamodb.createTable(params, function (err, data) {
  if (err) {
    console.error("Error JSON.", JSON.stringify(err, null, 2));
  } else {
    console.log("Created table.", JSON.stringify(data, null, 2));
  }
});
