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
    marginLeft: "-3%",
    width: '70%'
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

  const EditFields = [
    { name: "first_name", label: "Name", validationType:"string"},
    { name: "last_name", label: "Last Name", validationType:"string" },
    { name: "email", label: "Email", validationType:"email"},
    { name: "status", label: "Status", validationType:"string" }
  ];

  const { inputs, errorMessages, handleInputChange, handleSubmit } = useForm(editItem, null, EditFields);

  const classes = useStyles();

  const renderField = () => {

    return (
      <Grid container className={classes.form} spacing={2}>
        {EditFields.map(({name, label}) =>
        <Grid item xs={12} sm={6} key={label}>
          <TextField
            key={label}
            name={name}
            value={inputs[name]}
            onChange={handleInputChange}
            placeholder={lead[name]}
            fullWidth
            id={name}
            label={label}
            helperText={errorMessages[name]}
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
