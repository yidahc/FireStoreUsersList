import React, { useState } from "react";
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
import NewItem from "./NewItem";
import EditItem from "./EditItem";
import DeleteIcon from "@material-ui/icons/Delete";
import { useFirestore } from "react-redux-firebase";
import Button from "@material-ui/core/Button";


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

  const [edit, setEdit] = useState(false);
  const [createItem, setCreate] = useState(false);
  const [selectedID, setSelected] = useState(null);

  const firestore = useFirestore();

  const handleSelect = id => {
    setSelected(id);
    setCreate(false);
    setEdit(false)
  };

  const handleEdit = () => {
    setEdit(!edit)
    setCreate(false)
  }

  const handleDelete = id => {
    console.log(id);
    firestore
      .collection("leads")
      .doc(id)
      .delete()
      .then(() => {
        alert("Lead successfully deleted!");
      })
      .catch(error => {
        alert("Error removing Lead");
      });
  };

  const NewItemButton = () => {
    return (
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={()=>setCreate(true)}
      >
        New Lead
      </Button>
    );
  }

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
        <NewItemButton/>
      </List>
      <Collapse
        className={classes.collapse}
        in={true}
        timeout="auto"
        unmountOnExit
      >
        <List component="div" disablePadding>
        
          {selectedID && !edit && !createItem
          ?               
              <SelectedItem leadID={selectedID} handleEdit={handleEdit} />
           : 
            selectedID && edit && !createItem ? 
              <EditItem leadID={selectedID} />
           : 
             createItem ?
           <NewItem setCreate={setCreate}/>
           : null
          }
        </List>
      </Collapse>
    </div>
  );
}

export default MainList;
