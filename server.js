const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
AdminJS.registerAdapter(require('@adminjs/mongoose'));

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const connectDB = require('./config/database');

// Must require models for AdminJS
const Book = require('./models/book')
const Bookshelf = require('./models/bookshelf')
const User = require('./models/user')

require('dotenv').config();

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

if (require.main === module) {
  connectDB()
    .then(() => {
      app.listen(port, function () {
        console.log(`Express app running on port ${port}`);
      });
    })
    .catch((err) => {
      console.error('Failed to start server:', err.message);
      process.exit(1);
    });
}

module.exports = app;

/* --- AdminJS: local only (ENABLE_ADMINJS=true) --- */
if (require.main === module && process.env.ENABLE_ADMINJS === 'true') {
  const adminPort = 8000;

  const startAdmin = async () => {
    const adminApp = express();

    const admin = new AdminJS({
      resources: [Book, Bookshelf, User],
      rootPath: '/admin',
    });

    const adminRouter = AdminJSExpress.buildRouter(admin);
    adminApp.use(admin.options.rootPath, adminRouter);

    adminApp.listen(adminPort, () => {
      console.log(`AdminJS started on http://localhost:${adminPort}${admin.options.rootPath}`);
    });
  };

  startAdmin();
}