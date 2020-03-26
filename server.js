const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const MOVIES = require('./movies-data-small.json');

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());

app.get('/', (req, res) => {
  res.send('hi');
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});