const AWS = require("aws-sdk");
var dynamodb = new AWS.DynamoDB({
  endpoint: "http://localhost:8000",
  region: "local"
});
var params = {
  TableName: "TodoTable",
  KeySchema: [
    { AttributeName: "header", KeyType: "HASH" },
    { AttributeName: "tag", KeyType: "RANGE" }
  ],
  AttributeDefinitions: [
    { AttributeName: "header", AttributeType: "S" },
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
