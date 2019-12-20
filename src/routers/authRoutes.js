const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');

function router() {
  const authRouter = express.Router();
  const url = 'mongodb://localhost:27017';
  const dbName = 'DbLibrary';

  authRouter.route('/signUp')
    .post((req, res) => {
      const { username, password } = req.body;

      (async () => {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);
          const col = await db.collection('users');
          const user = { username, password };

          const results = await col.insertOne(user);
          debug(results);

          req.login(results.ops[0], () => {
            res.redirect('/auth/profile');
          });
        } catch (err) {
          debug(err);
        } finally {
          client.close();
        }
      })();
    });

  authRouter.route('/profile')
    .get((req, res) => {
      res.json(req.user);
    });

  return authRouter;
}

module.exports = router;
