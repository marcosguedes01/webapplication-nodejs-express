const express = require('express');

function router(nav) {
  const adminRouter = express.Router();

  adminRouter.route('/')
    .get((req, res) => {
      res.send('inserting books');
    });

  return adminRouter;
}

module.exports = router;
