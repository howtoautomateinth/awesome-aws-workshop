const express = require("express");
const config = require("config");
const AWS = require("aws-sdk");
const app = express();
let dynamodb = null;

if (config.get("dbConfig.mode") == "local") {
  const appConfig = config.get("dbConfig");
  dynamodb = new AWS.DynamoDB({
    endpoint: `${appConfig.host}:${appConfig.port}`,
    region: `${appConfig.region}`,
  });
  console.log("=== Set database to local ===");
} else {
  dynamodb = new AWS.DynamoDB();
  console.log("=== Database witll base on your aws credential ===");
}

app.set("view engine", "ejs");
app.use("/static", express.static(__dirname + "/static"));

var port = process.env.PORT || 3000;

async function getAllToDoList() {
  return [
    {
      header: "Header 1",
      content: "Content 1",
    },
    {
      header: "Header 2",
      content: "Content 2",
    },
    {
      header: "Header 3",
      content: "Content 3",
    },
  ];
}

app.get("/", async function (req, res) {
  let todolist = await getAllToDoList();
  res.render("index.ejs", {
    todolist: todolist,
  });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
