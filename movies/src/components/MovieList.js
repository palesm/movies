import React from 'react';
import Movie from "./Movie";

function MovieList(props) {
  return (
    <>
      {props.movies.map(movie => <Movie key={movie.id} {...movie} />)}
    </>
  );
}

export default MovieList;