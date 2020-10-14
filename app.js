if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//require path to the end points
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');
const cors = require('cors');
app.use(cors());

// Connection URL to dot env
const url = process.env.DATAURI;
// Database Name
mongoose.set('useCreateIndex', true);
// Use connect method to connect to the server
mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (err, client) {
    console.log('Connected successfully to server');
  }
);

app.use(morgan('dev'));
// app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

//use express middlewere to the end point of the path
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
