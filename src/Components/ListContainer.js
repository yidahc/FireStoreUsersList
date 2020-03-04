import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import SelectedItem from "./SelectedItem";
import NewItem from "./utils/NewItem";
import EditItem from "./utils/EditItem";
import { setSelected } from "../Redux-Firebase/list_actions";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import { useFirestore } from "react-redux-firebase";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    backgroundColor: theme.palette.background.paper
  },
  list: {
    width: "30%",
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper
  },
  collapse: {
    width: "40%",
    backgroundColor: theme.palette.background.paper
  }
}));

function MainList({ list }) {
  const classes = useStyles();

  const listState = useSelector(state => state.list);

  const { edit, selectedID } = listState;
  const dispatch = useDispatch();
  const firestore = useFirestore();

  const handleSelect = id => {
    console.log(id);
    dispatch(setSelected(id));
  };

  const handleDelete = id => {
    console.log(id);
    firestore.collection("leads").doc(id).delete()
      .then(() => {
        alert("Lead successfully deleted!");
      })
      .catch((error) => {
        alert("Error removing Lead");
      });
  };

  return (
    <div className={classes.root}>
      <List className={classes.list}>
        {list.map(item => (
          <ListItem key={item.id} button onClick={() => handleSelect(item.id)}>
            <ListItemText primary={`${item.first_name} ${item.last_name}`} />
            <ListItemSecondaryAction onClick={() => handleDelete(item.id)}>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        <NewItem />
      </List>
      <Collapse
        className={classes.collapse}
        in={true}
        timeout="auto"
        unmountOnExit
      >
        <List component="div" disablePadding>
          {selectedID && !edit ? (
            <SelectedItem />
          ) : selectedID && edit ? (
            <EditItem />
          ) : null}
        </List>
      </Collapse>
    </div>
  );
}

export default MainList;
