const express = require('express');
const app = express();

require('dotenv').config();

app.use(express.json())
app.use(require('./src/routes/index'));

const appUrl = process.env.APP_URL;
const appPort = process.env.APP_PORT;

app.listen(appPort, ()=>{
    console.log("Server started on port " + appPort + ":" + appUrl + ":" + appPort)
})