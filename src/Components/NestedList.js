import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ListItem, ListItemText } from "@material-ui/core";
import { FirebaseContext } from '../Components/utils/firebase';
import 'firebase/firestore'



function NestedList({ keyName, leadID, title, value }) {
  const [edit, setEdit] = useState(false);

  const editField = () => {
    setEdit(!edit)
    console.log(keyName, leadID)
  };

  const useStyles = makeStyles(theme => ({
    root: {
      paddingLeft: theme.spacing(4),
      textTransform: "capitalize"
    }
  }));

  const classes = useStyles();

  return (
    <ListItem key={title} className={classes.root}>
      <ListItemText primary={title} secondary={value} />
      <ListItemText button="true" secondary="edit" onClick={editField} />
    </ListItem>
  );
}

export default NestedList;
