const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookController');

function bookController(bookService, optionsTopMenu) {
  const url = 'mongodb://localhost:27017';
  const dbName = 'DbLibrary';

  function getIndex(req, res) {
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
  }

  function getById(req, res) {
    res.render(
      'book',
      {
        title: 'Book',
        nav: optionsTopMenu,
        book: req.book
      }
    );
  }

  function middleware(req, res, next) {
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

        book.details = await bookService.getBookById(book.bookId);

        req.book = book;
      } catch (err) {
        debug(err.stack);
      } finally {
        client.close();
      }

      next();
    })();
  }

  return { getIndex, getById, middleware };
}

module.exports = bookController;
