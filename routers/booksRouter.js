const express = require('express');
const optionsTopMenu = require('../optionsTopMenu');

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

bookRouter.get('/books', (req, res) => {
  res.render(
    'books',
    {
      title: 'Books',
      nav: optionsTopMenu,
      books
    }
  );
});

bookRouter.route('/books/:id')
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

module.exports = bookRouter;
