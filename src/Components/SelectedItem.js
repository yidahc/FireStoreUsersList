import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ListItem, ListItemText } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(4),
 //   textTransform: "capitalize"
  },
  submit: {
    alignSelf: "center",
    width: "50%"
  }
}));

function NestedList({handleEdit, leadID}) {
  
  const lead = useSelector(state => state.firestore.data.leads[leadID]);

  const classes = useStyles();

  const renderDetails = () => {
    const finalArray = [];
    for (var key in lead) {
      const title = key.split("_").map(string=> `${string.charAt(0).toUpperCase()}${string.slice(1)} `)
      //first_name => ["first", "name"].map => F+irst => N+ame
        finalArray.push(
          <ListItem key={title} className={classes.root}>
            <ListItemText primary={title} secondary={lead[key]} />
          </ListItem>
        );
    }
    return finalArray;
  };


  return (
    <>
          {renderDetails()}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleEdit}
          >
            Edit
          </Button>
  </>
  )
}

export default NestedList;
