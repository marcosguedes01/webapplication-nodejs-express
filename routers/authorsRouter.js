const express = require('express');

function router(optionsTopMenu) {
  const authorRouter = express.Router();

  authorRouter.get('/', (req, res) => {
    res.render(
      'authors',
      {
        title: 'Authors',
        nav: optionsTopMenu
      }
    );
  });

  return authorRouter;
}
module.exports = router;
