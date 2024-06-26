const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const hpp = require('hpp');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const dataSanitize = require('express-mongo-sanitize');

const userRoutes = require('./routes/userRoutes');
const requestRoutes = require('./routes/requestRoutes');
const adRoutes = require('./routes/adRoutes');
const fakeRoutes = require('./routes/fakeRoutes');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(cors());
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
  })
);
app.use(express.json({ limit: '10kb' }));

app.use(cookieParser());
app.use(dataSanitize());
app.use(xss());
app.use(hpp());

app.use((req, res, next) => {
  res.header({ 'Access-Control-Allow-Credentials': true });
  next();
});

// Test server
app.get('/healthz', (req, res) => {
  res.status(200).json({
    status: 'success',
  });
});

app.use('/api/users', userRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/backup', fakeRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} in server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
