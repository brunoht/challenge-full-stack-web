const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    app.use(cors());
    next();
})

module.exports = router;