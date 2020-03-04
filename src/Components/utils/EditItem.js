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
    marginLeft: '-3%'
  },
  form: {
    width: "100%", 
    marginTop: theme.spacing(3)
  },
  submit: {
    alignSelf: "center",
    width: "100%"
  }
}));

export default function EditLead() {
  
  const leadID = useSelector(state=> state.list.editID);
  //  useFirebaseConnect(`leads/${leadID}`)
  //const lead = useSelector(({ firebase: { ordered: { leads } } }) => leads && leads[leadId])
  const lead = useSelector(state => state.firestore.data.leads[leadID]);
  const firestore  = useFirestore();

  function editItem(props) {
    firestore.collection('leads').doc(leadID).update(props);
  }

  const { inputs, handleInputChange, handleSubmit } = useForm(editItem);

  const classes = useStyles();
  const renderForm = () => {
    return (
      <Container component="main" className={classes.root} maxWidth="xs">
        <CssBaseline />
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="first_name"
                  variant="outlined"
                  value={inputs.first_name}
                  onChange={handleInputChange}
                  placeholder={lead.first_name}
                  required
                  fullWidth
                  id="first_name"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  value={inputs.last_name}
                  onChange={handleInputChange}
                  placeholder={lead.last_name}
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  value={inputs.email}
                  onChange={handleInputChange}
                  placeholder={lead.email}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  value={inputs.status}
                  onChange={handleInputChange}
                  placeholder={lead.status}
                  name="status"
                  label="Status"
                  id="status"
                  autoComplete="status"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Edit Lead {lead.first_name}
            </Button>
          </form>
      </Container>
    );
  };

  return renderForm();
}
