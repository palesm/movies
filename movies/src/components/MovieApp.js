import React, {useState} from 'react';
import {AppBar, Grid, Paper, Toolbar, Typography} from "@mui/material";
import SearchMovie from "./SearchMovie";
import "../assets/css/movie-app.css"
import MovieList from "./MovieList";
import {useLazyQuery} from "@apollo/client";
import {GET_MOVIES} from "../constants/query";


function MovieApp(props) {
  const [movies, setMovies] = useState(null);
  const [getData, { loading, data }] = useLazyQuery(GET_MOVIES);
  const searchMovie = (query) => {
    getData({variables: { query: query }}).then(r => {
      if (r.data && r.data.searchMovies) {
        setMovies(r.data.searchMovies);
      }
    })
  }
  if (loading) return <div>loading...</div>
  return (
    <Paper elevation={0}>
      <AppBar>
        <Toolbar>
          <Typography>Movies App</Typography>
        </Toolbar>
      </AppBar>
      <Grid container className="grid-container">
        <Grid item lg={6} md={8} xs={10}>
          <SearchMovie searchMovie={searchMovie} />
          {movies && <MovieList movies={movies} />}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default MovieApp;