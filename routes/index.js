var express = require('express');
var router = express.Router();
const redis = require('./redis');
const dynamo = require('./dynamo');

router.use('/redis', redis);
router.use('/dynamo', dynamo);


module.exports = router;
