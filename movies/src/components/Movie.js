import React, {useEffect, useState} from 'react';
import * as api from "../api/api";
import useToggleState from "../hooks/useToggleState";
import {getPageName} from "../helpers/helpers";
import {Chip, ListItemButton, ListItemSecondaryAction, Stack} from "@mui/material";
import {Box, Button, CircularProgress, Collapse, Grid} from "@material-ui/core";
import {ExpandLess, ExpandMore} from '@mui/icons-material';
import {withStyles} from "@mui/styles";
import styles from "../assets/styles/MovieStyles";


function Movie(props) {
  const {classes} = props;
  const [clicked, toggleClick] = useToggleState(false);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(null);
  const [imdb, setImdb] = useState(null);
  const [description, setDescription] = useState("No description available");

  const handleClick = () => {
    //do not fetch again on close or if already fetched
    if (!imdb  && !clicked) handleImdb()
    if (!url && !clicked) handleWiki()
    toggleClick()
  }
  const handleWiki = () => {
    setLoading(true)
    //search page by name from wiki
    api.searchWiki(props.name).then(res => {
      // returns an array containing page url eg. "https://en.wikipedia.org/wiki/Harry_Potter_and_the_Philosopher%27s_Stone"
      if(res.data[3][0]) {
        let url = res.data[3][0];
        // extracting page name from url eg. "Harry_Potter_and_the_Philosopher%27s_Stone"
        let pageName = getPageName(url);
        setUrl(url);
        // get short description by page name
        api.getWikiContent(pageName).then(res => {
          if (res.data && res.data.query.pages[0].extract) {
            let description = res.data.query.pages[0].extract
            setDescription(description)
          } else setLoading(false)
        })
      } else setLoading(false)
    })
  }
  const handleImdb = () => {
    //search movie by name from imdb
    api.searchImdb(props.name).then(res => {
      if(res.data && res.data.imdbID) {
        setImdb(`https://www.imdb.com/title/${res.data.imdbID}`)
      }
    })
  }
  const handleRelated = () => {
    props.handleRelated(props.id)
  }
  useEffect(() => {
    return () => {
      setLoading(false)
    };
  }, [description]);
  return (
    <div className={classes.container}>
      <Grid container>
        <ListItemButton onClick={handleClick} className={classes.listItemButtons}>
          {clicked ? <ExpandLess /> : <ExpandMore />}
          <Grid item xs={6} className={classes.title}>
            {props.name}
          </Grid>
          <Grid item xs={5}>
            <Stack direction="row" spacing={0.5} className={classes.chipContainer}>
              {props.genres.map(g => <Chip label={g.name} key={g.id} color={"primary"} />)}
            </Stack>
          </Grid>
          <ListItemSecondaryAction>
            <Grid item xs={1} aria-label='imdb'>
              {props.score}
            </Grid>
          </ListItemSecondaryAction>
        </ListItemButton>
      </Grid>
      <Collapse in={clicked} timeout="auto" unmountOnExit>
        {loading ?
          <Box className={classes.spinnerContainer}>
            <CircularProgress />
          </Box>
          :
          <>
            <Stack direction="row" spacing={2} className={classes.buttonContainer}>
              {url &&
                <Button variant="contained" href={url} target="_blank" color={"primary"}>
                  Wikipedia
                </Button>
              }
              {imdb &&
                <Button variant="contained" href={imdb} target="_blank" color={"primary"}>
                  IMDB
                </Button>
              }
              <Button variant="contained" color={"primary"} onClick={handleRelated}>
                Related
              </Button>
            </Stack>
            <Grid container className={classes.gridContainer}>
              <Grid item xs={12}>
                {description}
              </Grid>
            </Grid>
          </>
        }
      </Collapse>
    </div>
  );
}

export default withStyles(styles)(Movie);