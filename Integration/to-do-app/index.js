const express = require("express");
const config = require("config");
const AWS = require("aws-sdk");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
var port = process.env.PORT || 3000;
let documentClient = null;
let tableName = null;

app.set("view engine", "ejs");
app.use("/static", express.static(__dirname + "/static"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", router);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

if (config.get("dbConfig.mode") == "local") {
  const appConfig = config.get("dbConfig");
  tableName = appConfig.tableName;
  AWS.config.update({
    endpoint: `http://${appConfig.host}:${appConfig.port}`,
    region: `${appConfig.region}`,
  });
  documentClient = new AWS.DynamoDB.DocumentClient();
  console.log("=== Set database to local ===");
} else {
  documentClient = new AWS.DynamoDB.DocumentClient();
  console.log("=== Database witll base on your aws credential ===");
}

// Middleware express router and AWS promise method to GetAllItems for render in ejs
router.use(async (req, res, next) => {
  var params = {
    TableName: "TodoTable",
    ReturnConsumedCapacity: "TOTAL",
  };
  req.todolist = [];
  await documentClient
    .scan(params)
    .promise()
    .then(
      function (data) {
        console.log("listItem succeeded:", JSON.stringify(data, null, 2));
        data.Items.forEach((element) => {
          req.todolist.push({
            header: element.header,
            content: element.content,
            tag: element.tag,
          });
        });
      },
      function (error) {
        console.error("Unable to list item. Error JSON:", JSON.stringify(err, null, 2));
      }
    );
  next();
});

router.get("/", async function (req, res) {
  res.render("index.ejs", {
    todolist: req.todolist,
  });
});

router.post("/write/todo", async function (req, res) {
  var params = {
    Item: {
      header: `${req.body.header}`,
      content: `${req.body.content}`,
      tag: `${req.body.tag}`,
    },
    TableName: tableName,
    ReturnValues: "ALL_OLD",
  };
  documentClient.put(params, function (err, data) {
    if (err) {
      console.error("Unable to putitem item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("PutItem succeeded:", JSON.stringify(data, null, 2));
    }
  });
  res.redirect("back");
});

router.post("/remove/todo", async function (req, res) {
  var params = {
    TableName: tableName,
    Key: {
      "header": `${req.body.todoid}`,
      "tag": `${req.body.tag}`
    }
  };
  documentClient.delete(params, function (err, data) {
    if (err) {
      console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
    }
  });
  res.redirect("back");
});
