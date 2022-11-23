const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const express = require('express');
// const Connect = require('connect-pg-simple')
// const session = require('express-session')
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const ensureLoggedIn = require('./config/ensureLoggedIn')

require('dotenv').config();
require('./config/database');

const app = express();

app.use(logger('dev'));
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use(require('./config/checkToken'));

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
app.use('/api/books', require('./routes/api/books'));
app.use('/api/bookshelves', require('./routes/api/bookshelves'));

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});

// const PORT = 3000

// const start = async () => {
//   const app = express()

//   const admin = new AdminJS({})

//   const adminRouter = AdminJSExpress.buildRouter(admin)
//   app.use(admin.options.rootPath, adminRouter)

//   app.listen(PORT, () => {
//     console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
//   })
// }

// start()