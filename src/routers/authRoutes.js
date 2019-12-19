const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');

function router() {
  const authRouter = express.Router();

  authRouter.route('/signUp')
    .post((req, res) => {
      debug(req.body);
      res.json(req.body);
    });

  return authRouter;
}

module.exports = router;
