require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const MOVIES = require('./movies-data-small.json');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get('Authorization');

  if (!authToken || apiToken !== authToken.split(' ')[1]) {
    return res
      .status(401)
      .json({ error: 'unauthorized request' });
  }
  next();
});

app.get('/movie', (req, res) => {
  res.json(MOVIES[0]);
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});