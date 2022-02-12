import React, {useEffect, useState} from 'react';
import {Chip, ListItemButton, ListItemSecondaryAction, Stack} from "@mui/material";
import {Button, Collapse, Divider, Grid} from "@material-ui/core";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import useToggleState from "../hooks/useToggleState";
import {withStyles} from "@mui/styles";
import styles from "../assets/styles/MovieStyles";
import * as api from "../api/api";
import {getPageName} from "../helpers/helpers";


function Movie(props) {
  const {classes} = props;
  const [clicked, toggleClick] = useToggleState(false);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(null);
  const [description, setDescription] = useState("No description available");

  const handleClick = () => {
    //do not fetch again on close or if already fetched
    if (!url && !clicked) {
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
    toggleClick()
  }
  useEffect(() => {
    return () => {
      setLoading(false)
    };
  }, [description]);
  return (
    <div>
      <Grid container>
        <ListItemButton onClick={handleClick}>
          {clicked ? <ExpandLess /> : <ExpandMore />}
          <Grid item xs={6}>
            {props.name}
          </Grid>
          <Grid item xs={4}>
            <Stack direction="row" spacing={0.5}>
              {props.genres.map(g => <Chip label={g.name} key={g.id} />)}
            </Stack>
          </Grid>
          <ListItemSecondaryAction>
            <Grid item xs={2} aria-label='imdb'>
              {props.score}
            </Grid>
          </ListItemSecondaryAction>
        </ListItemButton>
      </Grid>
      <Collapse in={clicked} timeout="auto" unmountOnExit>
        {loading ?
          <div>loading...</div>
          :
          <>
            <Stack direction="row" spacing={2}>
              {url &&
              <Button variant="contained" href={url} target="_blank">
                Wikipedia
              </Button>
              }
              <Button variant="contained">
                IMDB
              </Button>
              <Button variant="contained">
                Related
              </Button>
            </Stack>
            <Grid container>
              <Grid item xs={12}>
                {description}
              </Grid>
            </Grid>
          </>
        }
      </Collapse>
      <Divider light />
    </div>
  );
}

export default withStyles(styles)(Movie);