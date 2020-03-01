import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../Components/utils/firebase' 
// importamos el contexto de nuestra instancia de firebase para poder usar esa app con su contexto aqui
import 'firebase/firestore'
import LeadListContainer from '../Components/LeadListContainer';
import InfiniteScroll from 'react-infinite-scroll-component';

function Leads () {
    
    const firebaseApp = useContext(FirebaseContext) 
    //firebaseApp es la instancia de la aplicacion que inizializamos con Firebase en utils/firebase (value={firebase}) 
    

    const [list, setList] = useState([]) 
    // creando variable list y setList para usar el State de React (list es el valor y setList es la funcion que cambia ese valor)
    const [error, setError] = React.useState(null) 
    const [loading, setLoading] = React.useState(true) 
    const [last, setLast] = useState("A") 


    useEffect(() => { 
    // useEffect es la funcion que va a correr cada que pase un React lifecycle (ComponenentDidMount, ComponenetDidUpdate, etc)
        
        const unsubscribe = firebaseApp.firestore().collection('users').orderBy("name").limit(12).onSnapshot( snapshot => { 
            // con onSnapshot creamos un listener que regresa el snapshot de esta colecccion cada que cambie la coleccion
            const lastVisible = snapshot.docs[snapshot.docs.length-1];
            const leads = snapshot.docs.map(doc=>({ // extraemos los docs (para apartar de los datos de headers)
                id: doc.id, 
                name: doc.data().name,
                last_name: doc.data().last_name,
            })); // .data() es una funcion de firebase para extraer el data de nuestro doc 
            setLoading(false) 
            setLast(lastVisible)
            setList([...leads,...list])}, // guardamos nuestra lista de users en el estado con valor List
    
            err => { setError(err) } ) // guardamos el error en el estado


        return () => unsubscribe()
        // regresamos la funcion en useEffect para que deje de escuchar al finalizar la funcion 
        // useEffect corre la funcion que tu regreses a (similar a componentWillUnmount, pero aplica para cada vez que corra esta funcion)

    },
    []) // segundo parametro es opcional para especificar cuando queremos que corra el useEffect (en vez de que corra en cada actualizacion) solo corre cuando este parametro cambie 
    // en este caso usamos un [] para especificar que no depende de ningun prop o valor en el estado, 
    // solo queremos que corra 1 sola vez al montar y que limpie con la funcion que regresamos solo 1 vez al desmontar


    return (
        <>
        {!loading && !error ? 
        <InfiniteScroll 
        dataLength={list.length}
        next={useEffect}
        hasMore={true}>
             <LeadListContainer list={list}/>
      </InfiniteScroll>
                
            : error}
        </>
    )
        
} 

export default Leads

// firebase pagination: https://stackoverflow.com/questions/53044791/how-to-paginate-cloud-firestore-data-with-reactjs
// https://firebase.google.com/docs/firestore/query-data/query-cursors