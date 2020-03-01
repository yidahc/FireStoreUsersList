import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import NestedList from './NestedList';
import NewLead from './NewLead';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  list: {
    width: '30%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
  },
  collapse: {
    width: '40%',
    backgroundColor: theme.palette.background.paper,
  }
}));

function MainList({ list }) {
  const classes = useStyles();
  const [selectedID, setSelected] = React.useState(null);

  const handleClick = (id) => {
    setSelected(id) //guardamos el id del 'lead' seleccionado en el 'selectedID' state
  };

  return (
    <div className={classes.root}>
      <List className={classes.list}>
        {list.map(e => (
          <ListItem key={e.id} button onClick={() => handleClick(e.id)}>
            <ListItemText primary={`${e.name} ${e.last_name}`} />
          </ListItem>
        ))}
        <NewLead />
      </List>
      <Collapse className={classes.collapse} in={true} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {selectedID ?
            <NestedList leadID={selectedID} />
            : null}
        </List>
      </Collapse>
    </div>
  );
}

export default MainList