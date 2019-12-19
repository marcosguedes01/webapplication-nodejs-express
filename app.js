require('debug')('app');
const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

const optionsTopMenu = [
  { title: 'Books', link: '/books' },
  { title: 'Authors', link: '/authors' }
];

const adminRouter = require('./routers/adminRoutes')();
const bookRouter = require('./routers/booksRoutes')(optionsTopMenu);
const authorRouter = require('./routers/authorsRoutes')(optionsTopMenu);

app.get('/', (req, res) => {
  res.render(
    'index',
    {
      title: 'Home',
      nav: optionsTopMenu
    }
  );
});

app.use('/admin', adminRouter);
app.use('/books', bookRouter);
app.use('/authors', authorRouter);

app.listen(port, () => {
  console.log(`listening on port ${chalk.green(port)}.`);
});
