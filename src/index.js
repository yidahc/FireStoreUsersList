import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "firebase/firestore";
import "firebase/auth";
import "firebase/database";
import { Provider } from "react-redux";
import { store, rrfProps } from "./Redux-Firebase/Firebase";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      {/* pasamos nuestra redux store con instancia de firebase y firestore y se la pasamos al 
      FirebaseProvider como intermediaraio para usar sus HOCs y hooks(firebaseConnect, useFirestoreConnect) 
      y contectarnos al estado global de firebase (state.firebase/state.firestore)*/}
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
//https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
