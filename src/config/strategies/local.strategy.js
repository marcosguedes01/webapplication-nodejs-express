const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:local.strategy');

module.exports = () => {
  const url = 'mongodb://localhost:27017';
  const dbName = 'DbLibrary';

  passport.use(new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    }, (username, password, done) => {
      (async () => {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);
          const col = await db.collection('users');

          const user = await col.findOne({ username, password });

          debug(user);

          if (user != null && user.password === password) {
            done(null, user);
          } else {
            done(null, false);
          }
        } catch (err) {
          debug(err.stack);
        } finally {
          client.close();
        }
      })();
    }
  ));
};
