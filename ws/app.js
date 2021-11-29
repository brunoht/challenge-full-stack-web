const express = require('express');
const app = express();

require('dotenv').config();

app.use(express.json())

app.use(require('./src/middlewares/cors'));
app.use(require('./src/routes/index'));

const appHost = process.env.APP_HOST;
const appPort = process.env.APP_PORT;

app.listen(appPort, appHost,()=>{
    console.log("Server started on port " + appPort + ": http://" + appHost + ":" + appPort)
})