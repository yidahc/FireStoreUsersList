import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import NestedList from './NestedList';

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
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);

  const handleClick = (id) => {
    setOpen(!open);
    const selectedLead = list.filter(e => e.id === id)[0];
    console.log(selectedLead)
    setSelected(selectedLead) //guardamos el objeto del 'lead' seleccionado en el 'selected' state
  };

  const editField = (id, key) => {
    console.log (id, key)
  }

  const renderSelected = () => {
    let finalArray = [];
      for (var key in selected) {
        if (key !== "id"){
          const title = key.replace("_", " ");
        finalArray.push(
          <NestedList key={key} leadID={selected.id} keyName={key} title={title} value={selected[key]}/>
        )
        }
      }
    return finalArray;
  }

  return (
    <div className={classes.root}>
      <List className={classes.list}>
        {list.map(e => (
          <ListItem key={e.id} button onClick={() => handleClick(e.id)}>
            <ListItemText primary={`${e.name} ${e.last_name}`} />
          </ListItem>
        ))}
      </List>
      <Collapse className={classes.collapse} in={true} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {selected ?
           renderSelected()
            : null}
        </List>
      </Collapse>
    </div>
  );
}

export default MainList