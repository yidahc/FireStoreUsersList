import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ListItem, ListItemText } from "@material-ui/core";
import { FirebaseContext } from "./utils/firebase";
import Button from '@material-ui/core/Button';

function NestedList({ leadID, setEdit }) {
  const firebaseApp = useContext(FirebaseContext);

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

  const useStyles = makeStyles(theme => ({
    root: {
      paddingLeft: theme.spacing(4),
      textTransform: "capitalize"
    },
    submit: {
      alignSelf: "center",
      width: "50%"
    }
  }));

  const classes = useStyles();

  const renderDetails = () => {
    const finalArray = [];
    for (var key in lead) {
      const title = key.replace("_", " ");
      if (key !== "id") {
        finalArray.push(
          <ListItem key={title} className={classes.root}>
            <ListItemText primary={title} secondary={lead[key]} />
          </ListItem>
        );
      }
    }
    return finalArray;
  };

  return (
    <>
      {loading ? error : (
        <>
          {renderDetails()}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={setEdit}
          >
            Edit
          </Button>
        </>
      )}
    </>
  );
}

export default NestedList;
