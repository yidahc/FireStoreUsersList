import {useState, useEffect} from 'react';

function useValidation (inputs, inputsToValidate, inputsToConfirm) {
    const [isValidated, setValidation] = useState(false); // aqui confirmamos si esta validado el form o aun no
    const [errorMessages, setMessages] = useState({}) // aqui guardamos los error messages de los inputs aun no validados
    
    /* ex inputsToValidate: [{ name: "first_name", required: true, validationType: "string", label: "First Name" },
            { name: "last_name", required: true, validationType: "string", label: "Last Name" }]*/
                            

    /* ex inputsToConfirm: [{ first_name:"string"}, { last_name:"string" }, {email:"email"}] */

    useEffect(() => {
            if ( inputsToValidate && Object.keys(inputs).length > 0){
                inputsToValidate.map(({name, validationType})=> {
                    handleValidation(inputs[name], name, validationType)
                    // carga todos los errorMessages para todos los inputs que hay por validar (ya que todos empiezan vacios)
                })
            } 
        return () => {
            // esta funcion corre cada que cambian los inputs
            if (inputsToConfirm){
                for (var key in inputs) {
                    // valida cada input que ha sido populado con el validationType que mapeamos a inputsToConfirm
                    handleValidation(inputs[key], key, inputsToConfirm[key] )
                }
            }
            checkValid() // siempre que los inputs camban, queremos revisar si esta listo el form para ser validado
        } 
    },[inputs]) // inputs es la dependencia de este hook ya que queremos que se actualize junto con los input vals

    const handleValidation = (value, name, validationType) => {
            switch(validationType) {
                case "email":
                    checkEmail(value, name) 
                    // revisamos el vaor del input conforme el validationType proveniente de FormFields o EditFields
                break;
                default: //case "string"
                    checkString(value, name)
        }
    }

    const checkValid = () => {
    /* los errorMessages estaran vacios si es un EditItem y los inputs que han sido llenados 
        ya fueron confirmado, o si es un form con validacion y TODOS sus required inputs han sido validado */
        if (Object.keys(errorMessages).length === 0) {
            setValidation(true);
        } else { // si aun hay errorMessages, faltan inputs para confirmar/validar
            setValidation(false)
        }
    }

    const checkEmail = (email, fieldName) => {
        const valid = /\S{5,}@\S{4,15}\.\S{2,5}/.test(email) 
        // verifica que sea un string (non-whitespace, minimo 5 chars de largo)+@+
        // string(minimo 4 chars de largo, max 15)+.+string(2-5 chars)
        if (!valid) {
            // si no es valido el input, agregamos el errorMessage para este field
            setMessages(prevMessages => ({...prevMessages, [fieldName]:"A valid email is required"}))
        } else {
            setMessages(prevMessages => {delete prevMessages[fieldName];
                return ({...prevMessages})}) // si ya es valido, borramos el errorMessage para este field
        }
    }
    
    const checkString = (string, fieldName) => {
        const valid = /\w{3,}/.test(string.trim()) //trim quita el whitespace del principio y final del string
        // verifica que sea incluya minimo 3 "word characters" (0-9, a-z, A-Z)
        if (!valid) {
            setMessages(prevMessages => ({...prevMessages, [fieldName]:"Please complete this field"}))
        } else {
            setMessages(prevMessages => {delete prevMessages[fieldName];
                return ({...prevMessages})})   
        }
    }

    return {
        isValidated,
        errorMessages,
        handleValidation
    }
}

export default useValidation;