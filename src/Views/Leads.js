import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../Components/utils/firebase' 
// importamos el contexto de nuestra instancia de firebase para poder usar esa app con su contexto aqui
import 'firebase/firestore'
import LeadListContainer from '../Components/LeadListContainer';

function Leads () {
    
    const firebaseApp = useContext(FirebaseContext) 
    //firebaseApp es la instancia de la aplicacion que inizializamos con Firebase en utils/firebase (value={firebase}) 
    

    const [list, setList] = useState([]) 
    // creando variable list y setList para usar el State de React (list es el valor y setList es la funcion que cambia ese valor)
    const [error, setError] = React.useState(null) 
    const [loading, setLoading] = React.useState(true) 


    useEffect(() => { 
    // useEffect es la funcion que va a correr cada que pase un React lifecycle (ComponenentDidMount, ComponenetDidUpdate, etc)
        
        const unsubscribe = firebaseApp.firestore().collection('users').onSnapshot( snapshot => { 
            // con onSnapshot creamos un listener que regresa el snapshot de esta colecccion cada que cambie la coleccion
    
            const leads = snapshot.docs.map(doc=>({ // extraemos los docs (para apartar de los datos de headers)
                id: doc.id, 
                ...doc.data()  
            })); // .data() es una funcion de firebase para extraer el data de nuestro doc 
            setLoading(false) 
            setList(leads)}, // guardamos nuestra lista de users en el estado con valor List
    
            err => { setError(err) } ) // guardamos el error en el estado


        return () => unsubscribe()
        // regresamos la funcion en useEffect para que deje de escuchar al finalizar la funcion 
        // useEffect corre la funcion que tu regreses a (similar a componentWillUnmount, pero aplica para cada vez que corra esta funcion)

    },
    []) // segundo parametro es opcional para especificar cuando queremos que corra el useEffect (en vez de que corra en cada actualizacion) solo corre cuando este parametro cambie 
    // en este caso usamos un [] para especificar que no depende de ningun prop o valor en el estado, 
    // solo queremos que corra 1 sola vez al montar y que limpie con la funcion que regresamos solo 1 vez al desmontar


    const listItems = (inputObject) => {
        let finalArray = [];
        // extract from object and return key value pairs in arrays
        // one here to extract only name and last name
        // one in list to extract the rest of the information for just that one lead
    }

    return (
        <>
        {!loading && !error ? 
                <LeadListContainer list={list}/>
            : error}
        </>
    )
        
} 

export default Leads