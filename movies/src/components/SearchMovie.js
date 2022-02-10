import React from 'react';
import {Paper, TextField } from '@mui/material';
import useInputState from "../hooks/useInputState";

function SearchMovie(props) {
  const [movie, setMovie, resetMovie] = useInputState("");
  const handleSubmit = (event) => {
    event.preventDefault()
    props.searchMovie(movie)
    resetMovie()
  }
  return (
    <Paper>
      <form onSubmit={handleSubmit}>
        <TextField value={movie} onChange={setMovie} label={'Search for a movie...'} fullWidth />
      </form>
    </Paper>
  );
}

export default SearchMovie;