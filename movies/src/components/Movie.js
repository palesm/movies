import React from 'react';
import {Chip, ListItem, ListItemButton, ListItemSecondaryAction, ListItemText} from "@mui/material";
import {Collapse} from "@material-ui/core";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import useToggleState from "../hooks/useToggleState";


function Movie(props) {
  const [clicked, toggleClick] = useToggleState(false);
  const handleClick = () => {
    toggleClick()
    // open wiki
  }
  return (
    <>
      <ListItem>
        <ListItemButton onClick={handleClick}>
          {clicked ? <ExpandLess /> : <ExpandMore />}
          <ListItemText>
            {props.name}
          </ListItemText>
          <ListItemText>
            {props.genres.map(g => <Chip label={g.name} key={g.id} />)}
          </ListItemText>
          <ListItemSecondaryAction>
            <ListItemText aria-label='imdb'>
              {props.score}
            </ListItemText>
          </ListItemSecondaryAction>
        </ListItemButton>
      </ListItem>
      <Collapse in={clicked} timeout="auto" unmountOnExit>
        <ListItemText>
          lorem ipsumka lorem ipsumka lorem ipsumka lorem ipsumkalorem ipsumka lorem ipsumkalorem ipsumka lorem
          ipsumkalorem ipsumka lorem ipsumkalorem ipsumka lorem ipsumkalorem ipsumka lorem ipsumkalorem ipsumka lorem
          ipsumkalorem ipsumka lorem ipsumkalorem ipsumka lorem ipsumkalorem ipsumka lorem ipsumkalorem ipsumka lorem
          ipsumkalorem ipsumka lorem ipsumkalorem ipsumka lorem ipsumkalorem ipsumka lorem ipsumkalorem ipsumka lorem
          ipsumkalorem ipsumka lorem ipsumkalorem ipsumka lorem ipsumkalorem ipsumka lorem ipsumkalorem ipsumka lorem
          ipsumkalorem ipsumka lorem ipsumkalorem ipsumka lorem ipsumkalorem ipsumka lorem ipsumkalorem ipsumka lorem
          ipsumkalorem ipsumka lorem ipsumka
        </ListItemText>
      </Collapse>
    </>
  );
}

export default Movie;