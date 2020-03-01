import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import useForm from "./useForm";

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

export default function EditLead({ editLead, leadID }) {
  const classes = useStyles();

  const { inputs, handleInputChange, handleSubmit } = useForm(editLead);

  const renderForm = () => {
    return (
      <Container component="main" className={classes.root} maxWidth="xs">
        <CssBaseline />
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="name"
                  variant="outlined"
                  value={inputs.name}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="name"
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
              Edit Lead {leadID}
            </Button>
          </form>
      </Container>
    );
  };

  return renderForm();
}
