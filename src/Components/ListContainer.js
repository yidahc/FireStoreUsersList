import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import SelectedItem from './SelectedItem';
import NewItem from './utils/NewItem';
import EditItem from './utils/EditItem';
import { setSelected } from '../Redux-Firebase/list_actions';
import { useSelector, useDispatch } from 'react-redux';

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

  const listState = useSelector(state=> state.list)

  const { edit, selectedID } = listState
  const dispatch = useDispatch()

  const handleClick = (id) => {
    console.log(id)
    dispatch(setSelected(id))
  };

  return (
    <div className={classes.root}>
      <List className={classes.list}>
        {list.map(e => (
          <ListItem key={e.id} button onClick={() => handleClick(e.id)}>
            <ListItemText primary={`${e.first_name} ${e.last_name}`} />
          </ListItem>
        ))}
        <NewItem />
      </List>
      <Collapse className={classes.collapse} in={true} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {selectedID && !edit ?
            <SelectedItem />
            : selectedID && edit ?
               <EditItem />
               : null
          }
        </List>
      </Collapse>
    </div>
  );
}

export default MainList