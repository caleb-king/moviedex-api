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

app.get('/movie', function handleGetMovie(req, res) {

  const { genre, country, avg_vote} = req.query;
  const allowedParams = ['genre', 'country', 'avg_vote'];
  
  Object.keys(req.query).forEach(key => {
    if(!allowedParams.includes(key)) {
      return res
        .status(400)
        .json({ error: 'The only allowed parameters are genre, country, and avg_vote' });
    }
  });

  let returnedMovies = MOVIES;
  
  //filter based on genre
  if (genre) {
    returnedMovies = returnedMovies.filter(movie =>
      movie['genre'].toLowerCase().includes(genre.toLowerCase())
    );
  }

  //filter based on country
  if (country) {
    returnedMovies = returnedMovies.filter(movie =>
      movie['country'].toLowerCase().includes(country.toLowerCase())
    );
  }

  //filter based on avg_vote
  if (avg_vote) {
    returnedMovies = returnedMovies.filter(movie =>
      Number(movie['avg_vote']) >= avg_vote
    );
  }
  res.json(returnedMovies);
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});