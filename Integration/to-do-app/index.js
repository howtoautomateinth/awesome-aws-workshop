const express = require("express");
const config = require("config");
const AWS = require("aws-sdk");
const app = express();
const dynamodb = null;

if (config.has("LocalDbConfig")) {
  const appConfig = config.get("LocalDbConfig");
  console.log("=== Set database to local ===");
} else if (config.has("DbConfig")) {
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
