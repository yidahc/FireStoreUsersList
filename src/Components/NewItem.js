import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useFirestore } from "react-redux-firebase";
import useForm from "./utils/useForm";

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: "-3%",
    width: '70%',
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    marginTop: theme.spacing(2),
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
  const firestore = useFirestore(); 
  // firestore nos regresa nuestra instancia de firestore que pasamos al contexto en el setup de redux

  function addLead(props) {
    // las props se las pasa useForm al momento de pasarlo como callback dentro de handleSubmit
    firestore.collection("leads").add(props); // pasa el objeto de nuestros 'inputs' ya validados como objeto a la colleccion
  }

  const classes = useStyles();

  const FormFields = [
    { name: "first_name", required: true, validationType: "string", label:"First Name"},
    { name: "last_name", required: true, validationType: "string", label:"Last Name"},
    { name: "email", required: true, validationType: "email", label:"Email"},
    { name: "status", required: false, label:"Status" } 
    // validationType determina el tipo de validacion que se realizara en useForm(en useValidation)
  ];

  const { inputs, errorMessages, handleInputChange, handleSubmit } = useForm(addLead, FormFields);

  // los inputs y sus estados se manejan en useForm pero se mandan y renderizan desde aqui

  const renderField = () => {

    return (
      <Grid container className={classes.form} spacing={2}>
        {FormFields.map(({ name, required, label }, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <TextField
              key={index}
              name={name}
              value={inputs[name]}
              onChange={handleInputChange}
              required={required}
              fullWidth
              id={name}
              label={label}
              helperText={errorMessages[name]}
              autoFocus
            />
          </Grid>
        ))}
      </Grid>
    );
  };

    return (
      <Container component="main" className={classes.root} maxWidth="xs">
        <CssBaseline />
          <Typography
            component="h1"
            variant="h5"
            button="true"
            className={classes.title}
          >
            Add New Lead
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
      </Container>
    );
}

//https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-up/SignUp.js
