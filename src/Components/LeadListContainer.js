import React, {useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import SelectedLead from './SelectedLead';
import NewLead from './NewLead';
import EditLead from './NewLead';
import { FirebaseContext } from '../Components/utils/firebase' 
// importamos el contexto de nuestra instancia de firebase para poder usar esa app con su contexto aqui
import 'firebase/firestore'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  list: {
    width: '30%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
  },
  collapse: {
    width: '40%',
    backgroundColor: theme.palette.background.paper,
  }
}));

function MainList({ list }) {
  const classes = useStyles();
  const [selectedID, setSelected] = useState(null);
  const [edit, setEdit] = useState(false);
  const firebaseApp = useContext(FirebaseContext) 

  const handleClick = (id) => {
    setEdit(false); // para que nos muestre los datos del lead en vez del form para editarlo (si es que estabamos editando otro lead)
    setSelected(id) //guardamos el id del 'lead' seleccionado en el 'selectedID' state
  };

  const addLead = (params) => {
    console.log(params)
    firebaseApp.firestore().collection('users').add(params)
  }

  return (
    <div className={classes.root}>
      <List className={classes.list}>
        {list.map(e => (
          <ListItem key={e.id} button onClick={() => handleClick(e.id)}>
            <ListItemText primary={`${e.name} ${e.last_name}`} />
          </ListItem>
        ))}
        <NewLead addLead={addLead} />
      </List>
      <Collapse className={classes.collapse} in={true} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {selectedID && !edit ?
            <SelectedLead leadID={selectedID} setEdit={setEdit}/>
            : selectedID && edit ?
               <EditLead leadID={selectedID}/>
               : null
          }
        </List>
      </Collapse>
    </div>
  );
}

export default MainList