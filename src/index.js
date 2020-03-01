import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import FireStoreProvider from './Components/utils/firebase';

ReactDOM.render(
    <FireStoreProvider> {/* wrapeamos el app en el proveedor del contexto en el que estamos conectados a firebase */}
        <App /> 
    </FireStoreProvider>, document.getElementById('root'));
//https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


