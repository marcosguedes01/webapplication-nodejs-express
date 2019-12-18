const express = require('express');
const sql = require('mssql');
const debug = require('debug')('app:bookRoutes');

function router(config, optionsTopMenu) {
  const bookRouter = express.Router();

  bookRouter.get('/', (req, res) => {
    (async () => {
      await sql.connect(config);
      const result = await sql.query('select * from books');

      debug(result);

      res.render(
        'books',
        {
          title: 'Books',
          nav: optionsTopMenu,
          books: result.recordset
        }
      );
    })();
  });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;

      (async () => {
        await await sql.connect(config);
        const result = await sql.query(`select * from books where id=${id}`);

        debug(result);

        res.render(
          'book',
          {
            title: 'Book',
            nav: optionsTopMenu,
            book: result.recordset[0]
          }
        );
      })();
    });

  return bookRouter;
}

module.exports = router;
