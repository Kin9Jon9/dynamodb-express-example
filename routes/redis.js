var express = require('express');
var router = express.Router();
const redis = require('../config/redis');

router.get('/data', async (req, res) => {
  
  try {
    const result = await redis.get({
      key : 'data'
    });

    res.json({
      code    : 200,
      result  : "success",
      data    : result
    });
  } catch (e) {
    res.json({
      code    : 500,
      result  : "fail",
      data    : e.message
    })
  }
})

router.post('/data/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await redis.set({ 
      key    : 'data',
      value  : id 
    });

    res.json({
      code    : 200, 
      result  : "success",
      data    : result 
    });

  } catch (e) {
    res.json({
      code    : 500,
      result  : "fail",
      data    : e.message
    })
  }
})


module.exports = router;
