const express = require('express');
const sql = require('mssql');
const debug = require('debug')('app:bookRoutes');

function router(config, optionsTopMenu) {
  const bookRouter = express.Router();

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

  bookRouter.get('/', (req, res) => {
    sql.connect(config).then((pool) => {
      const request = pool.request();

      request.query('select * from books')
        .then((result) => {
          debug(result);

          res.render(
            'books',
            {
              title: 'Books',
              nav: optionsTopMenu,
              books: result.recordset
            }
          );
        });
    });
  });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;

      res.render(
        'book',
        {
          title: 'Book',
          nav: optionsTopMenu,
          book: books[id - 1]
        }
      );
    });

  return bookRouter;
}

module.exports = router;
