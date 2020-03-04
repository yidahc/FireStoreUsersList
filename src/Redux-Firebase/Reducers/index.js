import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from 'redux-firestore' // <- needed if using firestore
import list from './list_reducers';


const rootReducer = combineReducers({
    firebase:firebaseReducer, 
    firestore:firestoreReducer,
    list
});


export {
    rootReducer
} 
