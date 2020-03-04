import {useState} from 'react';

function useValidation (inputs) {
    const [isValidated, setValidation] = useState(false); // aqui confirmamos si esta validado el form o aun no
    const [errorMessages, setMessages] = useState({}) // aqui guardamos los error messages de los inputs aun no validados

    const handleValidation = (value, name, required) => {
        if (required) {
            switch(name) {
                case "email":
                    checkEmail(value, name, checkValid)
                break;
                default: //case "string"
                    checkString(value, name, checkValid)
            }
        } else { checkValid()}
    }

    const checkValid = () => {
        if ((errorMessages.hasOwnProperty("submit") && Object.keys(errorMessages).length === 1) || Object.keys(errorMessages).length === 0) {
            setValidation(true);
        } else {setValidation(false)}
    }

    const checkEmail = (email, fieldName) => {
        const valid = /\S+@\S+\.\S/.test(email) 
        // verifica que sea un string (non-whitespace, minimo 3 chars de largo)+@+
        // string(minimo 4 chars de largo, max 15)+.+string(2-7 chars)
        if (valid) {
            setMessages(prevMessages => {delete prevMessages[fieldName];
                return ({...prevMessages})}, checkValid()) 
        } else {
            setMessages(prevMessages => ({...prevMessages, [fieldName]:"Please enter a valid email"}), checkValid())
        }
    }
    
    const checkString = (string, fieldName) => {
        const valid = /\w{2,}/.test(string.trim()) //trim quita el whitespace del principio y final del string
        // verifica que sea incluya minimo 3 "word characters" (0-9, a-z, A-Z)
        if (valid) {
            setMessages(prevMessages => {delete prevMessages[fieldName];
                 return ({...prevMessages})}, checkValid())   
        } else {
            setMessages(prevMessages => ({...prevMessages, [fieldName]:"This is a required field"}), checkValid())
        }
    }

    return {
        isValidated,
        errorMessages,
        handleValidation
    }
}

export default useValidation;