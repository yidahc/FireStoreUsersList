import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import useForm from "./useForm";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: "-3%"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  submit: {
    alignSelf: "center",
    width: "100%"
  }
}));

export default function EditLead() {
  const leadID = useSelector(state => state.list.editID);
  //  useFirebaseConnect(`leads/${leadID}`)
  //const lead = useSelector(({ firebase: { ordered: { leads } } }) => leads && leads[leadId])
  const lead = useSelector(state => state.firestore.data.leads[leadID]);
  const firestore = useFirestore();

  function editItem(props) {
    firestore
      .collection("leads")
      .doc(leadID)
      .update(props);
  }

  const FormFields = [
    { name: "first_name", required: false },
    { name: "last_name", required: false },
    { name: "email", required: false },
    { name: "status", required: false }
  ];

  const { inputs, handleInputChange, handleSubmit } = useForm(editItem);

  const classes = useStyles();

  const renderField = () => {
    const formatTitle = (original) => original.split("_").map(string=> `${string.charAt(0).toUpperCase()}${string.slice(1)} `)

    return (
      <Grid container className={classes.form} spacing={2}>
        {FormFields.map(({name, required}) =>
        <Grid item xs={12} sm={6}>
          <TextField
            name={name}
            value={inputs[name]}
            onChange={handleInputChange}
            placeholder={lead[name]}
            variant="outlined"
            fullWidth
            id={name}
            label={formatTitle(name)}
            required={required}
            helperText={lead[name]}
          />
        </Grid>
        )}
      </Grid>
    );
  };

  const renderForm = () => {
    return (
      <Container component="main" className={classes.root} maxWidth="xs">
        <CssBaseline />
          {renderField()}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Edit Lead
          </Button>
      </Container>
    );
  };

  return renderForm();
}
