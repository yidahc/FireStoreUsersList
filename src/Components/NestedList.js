import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ListItem, ListItemText } from "@material-ui/core";
import { FirebaseContext } from "../Components/utils/firebase";
import "firebase/firestore";

function NestedList({ leadID }) {
  const firebaseApp = useContext(FirebaseContext);

  const [edit, setEdit] = useState(false);
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = React.useState(false);

  useEffect(() => {
    const unsubscribe = firebaseApp
      .firestore()
      .collection("users")
      .doc(leadID)
      .onSnapshot(
        snapshot => {
          const selectedLead = {
            id: snapshot.id,
            ...snapshot.data()
          };
          setLead(selectedLead);
          setLoading(false);
        },
        err => {
          setError(err);
        }
      ); // guardamos el error en el estado
    return () => unsubscribe();
  }, [leadID]); //useEffect solo va a correr cuando cambie el ID del lead seleccionado  
//https://benmcmahen.com/using-firebase-with-react-hooks/

  const editField = (title) => {
    const key = title.replace(" ", "_");
    setEdit(!edit);
    console.log(key, leadID);
  };

  const useStyles = makeStyles(theme => ({
    root: {
      paddingLeft: theme.spacing(4),
      textTransform: "capitalize"
    }
  }));

  const classes = useStyles();

  const renderDetails = () => {
    const finalArray = []
    for (var key in lead){
      if (key !== "id"){
       const title = key.replace("_", " ");
        finalArray.push (
        <ListItem key={title} className={classes.root}>
          <ListItemText primary={title} secondary={lead[key]} />
          <ListItemText button="true" secondary="edit" onClick={()=>editField(title)} /> {/* poner key como argumento para editField da como "status" para cada todos*/}
        </ListItem>
        )
      }
    }
    return finalArray
  }

  return (
    <>
      {loading ? null : (
        renderDetails()
      )}
    </>
  );
}

export default NestedList;
