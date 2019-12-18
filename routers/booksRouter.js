const express = require('express');
const debug = require('debug')('app:bookRoutes');
const sql = require('mssql');

function router(sqlConfig, optionsTopMenu) {
  const bookRouter = express.Router();

  bookRouter.get('/', (req, res) => {
    (async () => {
      await sql.connect(sqlConfig);
      const request = await new sql.Request();
      const { recordset } = await request.query('select * from books');

      debug(recordset);

      res.render(
        'books',
        {
          title: 'Books',
          nav: optionsTopMenu,
          books: recordset
        }
      );
    })();
  });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;

      (async () => {
        await sql.connect(sqlConfig);
        const request = await new sql.Request();
        await request.input('id', sql.Int, id);
        const { recordset } = await request.query('select * from books where id = @id');

        debug(recordset);

        res.render(
          'book',
          {
            title: 'Book',
            nav: optionsTopMenu,
            book: recordset[0]
          }
        );
      })();
    });

  return bookRouter;
}

module.exports = router;
