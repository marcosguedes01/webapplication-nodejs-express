require('debug')('app');
const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'library' }));

require('./src/config/passport')(app);

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

const authRouter = require('./src/routers/authRoutes')(optionsTopMenu);
const adminRouter = require('./src/routers/adminRoutes')();
const bookRouter = require('./src/routers/booksRoutes')(optionsTopMenu);
const authorRouter = require('./src/routers/authorsRoutes')(optionsTopMenu);

app.get('/', (req, res) => {
  res.render(
    'index',
    {
      title: 'Home',
      nav: optionsTopMenu
    }
  );
});

app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/books', bookRouter);
app.use('/authors', authorRouter);

app.listen(port, () => {
  console.log(`listening on port ${chalk.green(port)}.`);
});
