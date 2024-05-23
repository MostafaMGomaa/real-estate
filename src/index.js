const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

const app = require('./app');

dotenv.config({
  path: path.join(__dirname, '..', './.env'),
});

const PORT = process.env.PORT;

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log(`Uncaught Exception , 💥 Shutting down...`);

  process.exit(1);
});

const DB = process.env.DATABASE;

mongoose.set('strictQuery', false);

mongoose.connect(DB).then(() => {
  console.log('DB connection successfully!');
});

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log(`Unhandled Rejection, 💥 Shutting down...`);

  server.close(() => {
    process.exit(1);
  });
});
