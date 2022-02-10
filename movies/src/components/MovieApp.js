import React from 'react';
import {AppBar, Grid, Paper, Toolbar, Typography} from "@mui/material";
import SearchMovie from "./SearchMovie";
import "../assets/css/movie-app.css"
import MovieList from "./MovieList";

function MovieApp(props) {
  const searchMovie = (event) => {
    console.log('search movie:', event)
  }
  return (
    <Paper elevation={0}>
      <AppBar>
        <Toolbar>
          <Typography>Movies App</Typography>
        </Toolbar>
      </AppBar>
      <Grid container className="grid-container">
        <Grid item lg={6} md={8} xs={10}>
          <SearchMovie searchMovie={searchMovie}/>
          <MovieList />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default MovieApp;