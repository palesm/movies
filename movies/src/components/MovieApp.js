import React, {useState} from 'react';
import {AppBar, Grid, Paper, Toolbar, Typography} from "@mui/material";
import SearchMovie from "./SearchMovie";
import MovieList from "./MovieList";
import {useLazyQuery} from "@apollo/client";
import {GET_MOVIES, GET_RELATED} from "../constants/query";
import {Box, CircularProgress, withStyles} from "@material-ui/core";
import styles from "../assets/styles/MovieAppStyles";


function MovieApp(props) {
  const {classes} = props;
  const [movies, setMovies] = useState(null);
  const [getData, { loading: loading, data }] = useLazyQuery(GET_MOVIES);
  const [getRelated, { loading: relatedLoading, related }] = useLazyQuery(GET_RELATED);
  const searchMovie = (query) => {
    getData({variables: { query: query }}).then(r => {
      if (r.data && r.data.searchMovies) {
        setMovies(r.data.searchMovies);
      }
    })
  }
  const handleRelated = (id) => {
    setMovies(null)
    getRelated({variables: { id: id }}).then(r => {
      if (r.data && r.data.movie.similar) {
        setMovies(r.data.movie.similar);
      }
    })
  }
  if (loading || relatedLoading) return (
    <Box className={classes.spinnerContainer}>
      <CircularProgress />
    </Box>
  )
  return (
    <Paper className={classes.paper} elevation={0}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography>Movies App</Typography>
        </Toolbar>
      </AppBar>
      <Grid container className={classes.gridContainer}>
        <Grid item lg={6} md={8} xs={10}>
          <SearchMovie searchMovie={searchMovie} />
          {movies && <MovieList movies={movies} handleRelated={handleRelated} />}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default withStyles(styles)(MovieApp);