import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ExpandLess from '@material-ui/icons/ExpandLess';
import { useFirestore } from "react-redux-firebase";
import useForm from './useForm';


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '90%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: '90%'
  },
}));

export default function NewLead() {

  const [formOpen, setFormOpen] = React.useState(false)
  const firestore  = useFirestore();

  function addLead(props) {
    openForm();
    firestore.collection('leads').add(props);
  }


  const classes = useStyles();
  const openForm = () =>{
    setFormOpen(!formOpen);
  }

 // const {  } = useForm();
  const { inputs, errorMessages, handleInputChange, handleSubmit } = useForm(addLead);


  const renderForm = () => {
    return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" button="true" onClick={openForm}>
          Add New Lead 
          <ExpandLess/>
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="first_name"
                variant="outlined"
                value={inputs.first_name}
                onChange={handleInputChange}
                required
                fullWidth
                id="first_name"
                label="First Name"
                helperText={errorMessages.first_name}
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
                helperText={errorMessages.last_name}
                id="last_name"
                label="Last Name"
                name="last_name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                required                
                value={inputs.email}
                onChange={handleInputChange}
                helperText={errorMessages.email}
                id="email"
                label="Email Address"
                name="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={inputs.status}
                onChange={handleInputChange}
                helperText={errorMessages.status}
                name="status"
                label="Status"
                id="status"
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
            Add Lead
          </Button>
        </form>
      </div>
    </Container>
    )
  }

  if (formOpen) {
    return (
      renderForm()
    )
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
    )
  }
 
}

//https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-up/SignUp.js