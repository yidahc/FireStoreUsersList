import React, { createContext } from 'react'
import * as firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = { // configuraciones para conectarse a la base de datos de Firebase adecuada
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: "tattoobookings-6f167",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};


//let db;

export default ({ children }) => {
    if (!firebase.apps.length) { // confirmar que aun no este abierta la coneccion
        firebase.initializeApp(firebaseConfig); // inizializa nuestra firebase app con las configuraciones de arriba
    }
    return (
        <FirebaseContext.Provider value={ firebase }> 
        {/*Provider permite que los children tengan acceso a los cambios en este contexto(FirebaseContext)
        y le damos el valor de firebase, asi cada que haya un cambio en nuestra instancia de firebase 
        tambien habra un cambio en los componentes children*/}
            {children}
        </FirebaseContext.Provider>
    )
} // crea un wrapper para nuestra app que nos da acceso al firebase app que acabamos de inizializar

export const FirebaseContext = createContext(firebase)
// encapsulamos el contexto en el que esta nuestra instancia de firebase, para poder usarlo desde otros componentes
