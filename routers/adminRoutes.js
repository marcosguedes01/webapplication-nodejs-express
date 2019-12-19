const express = require('express');
const debug = require('debug')('app:adminRoutes');
const { MongoClient } = require('mongodb');

function router() {
  const adminRouter = express.Router();
  const books = [
    {
      id: 1,
      title: 'War and Peace',
      genre: 'Generical',
      author: 'Lev Nikolayevich Tolstoy',
      read: false
    },
    {
      id: 2,
      title: 'War and Peace 2',
      genre: 'Generical',
      author: 'Lev Nikolayevich Tolstoy',
      read: false
    },
  ];

  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'DbLibrary';

      (async () => {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);

          const response = await db.collection('books').insertMany(books);
          res.send(response);
        } catch (err) {
          debug(err.stack);
        } finally {
          client.close();
        }
      })();
    });

  return adminRouter;
}

module.exports = router;
