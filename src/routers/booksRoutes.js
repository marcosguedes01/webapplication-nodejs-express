const express = require('express');
const debug = require('debug')('app:bookRoutes');
const { MongoClient, ObjectID } = require('mongodb');

function router(optionsTopMenu) {
  const bookRouter = express.Router();
  const url = 'mongodb://localhost:27017';
  const dbName = 'DbLibrary';

  bookRouter.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  });

  bookRouter.get('/', (req, res) => {
    (async () => {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

        const db = client.db(dbName);
        const col = await db.collection('books');
        const books = await col.find().toArray();

        res.render(
          'books',
          {
            title: 'Books',
            nav: optionsTopMenu,
            books
          }
        );
      } catch (err) {
        debug(err.stack);
      } finally {
        client.close();
      }
    })();
  });

  bookRouter.route('/:id')
    .all((req, res, next) => {
      const { id } = req.params;
      (async () => {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);
          const col = await db.collection('books');
          const book = await col.findOne({ _id: new ObjectID(id) });

          debug(book);

          req.book = book;
        } catch (err) {
          debug(err.stack);
        } finally {
          client.close();
        }

        next();
      })();
    })
    .get((req, res) => {
      res.render(
        'book',
        {
          title: 'Book',
          nav: optionsTopMenu,
          book: req.book
        }
      );
    });

  return bookRouter;
}

module.exports = router;
