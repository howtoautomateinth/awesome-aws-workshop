const AWS = require("aws-sdk");
AWS.config.update({
  region: "local",
  endpoint: "http://localhost:8000",
});
var dynamodb = new AWS.DynamoDB();
var params = {
    "TableName": "TodoTable"
};
dynamodb.deleteTable(params, function (err, data) {
  if (err) {
    console.error("Error JSON.", JSON.stringify(err, null, 2));
  } else {
    console.log("Table removed.", JSON.stringify(data, null, 2));
  }
});
