import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './Reducers/index';
import { createFirestoreInstance } from 'redux-firestore';
import { logger } from 'redux-logger';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const firebaseConfig = { // configuraciones para conectarse a la base de datos de Firebase adecuada
    apiKey: "AIzaSyAQl41cnh2xg2NARZsNntPnaTfTfRBcE2o",
    authDomain: "tattoobookings-6f167.firebaseapp.com",
    databaseURL: "https://tattoobookings-6f167.firebaseio.com",
    projectId: "tattoobookings-6f167", 
    storageBucket: "tattoobookings-6f167.appspot.com",
    messagingSenderId: "76244954286",
    appId: "1:76244954286:web:06d1be16f4ee920842113f"
};

const rfConfig = {
  //  userProfile: 'users' // es usario con el podemos realizar el auth de firebase
     useFirestoreForProfile: true // para para guardar nuestros users en firestore 
  }
  
  firebase.initializeApp(firebaseConfig); // inicializamos nuestra instancia de firebase con las configuraciones de nuestra app 
  firebase.firestore() // inicializamos firestore en cloud a traves de nuestra instancia de firebase


  // Create store with reducers and initial state 
  export const store = createStore(rootReducer, applyMiddleware(logger));


  export const rrfProps = {
    firebase,
    config: rfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance 
  }