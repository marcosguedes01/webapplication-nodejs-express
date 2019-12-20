const express = require('express');
const bookController = require('../controllers/bookController');
const bookService = require('../services/goodreadsService');

function router(optionsTopMenu) {
  const bookRouter = express.Router();
  const { getIndex, getById, middleware } = bookController(bookService, optionsTopMenu);

  bookRouter.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  });

  bookRouter.route('/')
    .get(getIndex);

  bookRouter.route('/:id')
    .all(middleware)
    .get(getById);

  return bookRouter;
}

module.exports = router;
