var express = require('express');
var router = express.Router();
const ddb = require('../model/movie');

router.get('/', async (req, res) => {
  const { user_id } = req.query;

  try {
    const readResult = await ddb.readDocuments({
      user_id
    });
    res.status(200).json({
      code    : 200,
      result  : "success",
      data    : readResult
    });

  } catch (e) {
    res.status(500).json({
      code     : 500,
      result   : "fail",
      data     : e.message
    });
  }
})

router.post('/', async (req, res) => {
  const { user_id } = req.query;
  try { 
    const createResult = await ddb.createDocument(req.body);

    res.status(200).json({
      code    : 200,
      result  : "success",
      data    : createResult
    })

  } catch (e) {
    res.status(500).json({
      code    : 500,
      result  : "fail",
      data    : e.message 
    })
  }
});

router.put('/:title', async (req, res) => {
  const { user_id } = req.query;

  try {
    const updateResult = await ddb.updateDocument({
      title    : req.params,
      user_id  : user_id,
      data     : req.body
    });

    res.status(204).json({
      code     : 204,
      result   : "success",
      data     : updateResult
    })
  } catch (e) {
    res.status(500).json({
      code     : 500,
      result   : "fail", 
      data     : e.message
    })
  }
})

router.delete('/:title', async (req, res) => {
  const { user_id } = req.query;
  const { title } = req.params;

  try {
    const deleteResult = await ddb.deleteDocument({ user_id, title });
    
    res.status(204).json({
      code    : 204,
      result  : "success",
      data    : deleteResult
    });
  } catch (e) {
    res.status(500).json({
      code    : 500,
      result  : "fail",
      data    : e.message
    });
  }
})

router.get('/:title', async (req, res) => {
  const { user_id } = req.query;
  const { title } = req.params;

  try {
    const readOneResult = await ddb.readOneDocument({ title, user_id });
    res.status(200).json({
      code    : 200,
      result  : "success",
      data    : readOneResult
    });
  } catch (e) {
    res.status(500).json({
      code    : 500,
      result  : "fail",
      data    : e.message
    });
  }
});

module.exports = router;
