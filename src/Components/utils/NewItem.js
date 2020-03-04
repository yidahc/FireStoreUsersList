import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ExpandLess from "@material-ui/icons/ExpandLess";
import { useFirestore } from "react-redux-firebase";
import useForm from "./useForm";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "90%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: "90%"
  }
}));

export default function NewLead() {
  const [formOpen, setFormOpen] = React.useState(false);
  const firestore = useFirestore();

  function addLead(props) {
    openForm();
    firestore.collection("leads").add(props);
  }

  const classes = useStyles();
  const openForm = () => {
    setFormOpen(!formOpen);
  };

  const FormFields = [
    { name: "first_name", required: true },
    { name: "last_name", required: true },
    { name: "email", required: true },
    { name: "status", required: false }
  ];

  const { inputs, errorMessages, handleInputChange, handleSubmit } = useForm(addLead, FormFields);

  const renderField = () => {

    const formatTitle = (original) => original.split("_").map(string=> `${string.charAt(0).toUpperCase()}${string.slice(1)} `)
    return (
      <Grid container className={classes.form} spacing={2}>
        {FormFields.map(({ name, required }, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <TextField
              key={index}
              name={name}
           //   variant="outlined"
              value={inputs[name]}
              onChange={handleInputChange}
              required={required}
              fullWidth
              id={name}
              label={formatTitle(name)}
              helperText={errorMessages[name]}
              autoFocus
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  if (formOpen) {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography
            component="h1"
            variant="h5"
            button="true"
            onClick={openForm}
          >
            Add New Lead
            <ExpandLess />
          </Typography>
          {renderField()}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Add Lead
          </Button>
        </div>
      </Container>
    );
  } else {
    return (
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={openForm}
      >
        New Lead
      </Button>
    );
  }
}

//https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-up/SignUp.js
