# SESAMm frontend technical interview

## API

To start the API, run the `start` script like this: `npm install` & `npm run dev`.

The API runs on `http://localhost:3000`.

The API exposes routes to access three entities: Movies, Genres and Reviews. The data itself can be explored in the db.json file, and comes from TMDB.

The documentation of the API can be found here: https://github.com/typicode/json-server/blob/master/README.md.

## How to get a movie poster image

Append the content of the field `poster_path` to this url: `https://image.tmdb.org/t/p/w500`, and make a GET request.

Exemple: https://image.tmdb.org/t/p/w500/13B6onhL6FzSN2KaNeQeMML05pS.jpg

## Data schemes

The data schemes can be found in the developer documentation: https://developers.themoviedb.org/3/movies/get-movie-details.
