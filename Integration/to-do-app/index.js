const express = require('express')
const config = require('config')

const app = express()
const appConfig = config.get('dbConfig');

app.set("view engine", "ejs");
app.use("/static",express.static(__dirname + '/static'))

var port = process.env.PORT || 3000;

app.get('/', (req, res) => res.render('index.ejs'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))