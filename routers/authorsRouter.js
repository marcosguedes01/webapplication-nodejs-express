const express = require('express');
const optionsTopMenu = require('../optionsTopMenu');

const authorRouter = express.Router();

authorRouter.get('/authors', (req, res) => {
  res.render(
    'authors',
    {
      title: 'Authors',
      nav: optionsTopMenu
    }
  );
});

module.exports = authorRouter;
