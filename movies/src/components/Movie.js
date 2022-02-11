import React from 'react';
import {ListItem, ListItemText} from "@mui/material";

function Movie(props) {
  return (
    <>
      <ListItem>
        <ListItemText>
          {props.name}
        </ListItemText>
      </ListItem>
    </>
  );
}

export default Movie;