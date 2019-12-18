require('debug');

const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const path = require('path');
const bookRouter = require('./routers/booksRouter');
const authorRouter = require('./routers/authorsRouter');
const optionsTopMenu = require('./optionsTopMenu');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render(
    'index',
    {
      title: 'Home',
      nav: optionsTopMenu
    }
  );
});

app.use('/', bookRouter);
app.use('/', authorRouter);

app.listen(port, () => {
  console.log(`listening on port ${chalk.green(port)}.`);
});
