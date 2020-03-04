import {useState} from 'react';

function useForm(callback){

    const [inputs, setInputs] = useState({}); // aqui guardaremos los valores de todos nuestros inputs
    const [isValidated, setValidation] = useState(false); // aqui confirmamos si esta validado el form o aun no
    const [errorMessages, setMessages] = useState({}) // aqui guardamos los error messages de los inputs aun no validados
    
    const handleSubmit = (event) => {
        if (event) event.preventDefault(); // prevents refresh
        if (isValidated) {
            callback(inputs);
        } else {
            setMessages(prevMessages => ({...prevMessages, "submit":"Please enter a valid email"}))    
        }
    }

    const handleValidation = (value, requiredType, name) => {
        switch(requiredType) {
            case "email":
                checkEmail(value, name)
            break;
            case "string":
                checkString(value, name)
        }
        if (errorMessages.length === 0) setValidation(true)
    }

    const handleInputChange = (event) => {
        event.persist(); // persists the value of your inputs in the virtual dom
        const {name, value, requiredType} = event.target
        setInputs(prevInputs => ({...prevInputs, [name]:value}))
        if(requiredType) {
            handleValidation(value, requiredType, name)
        }        
    }

    const checkEmail = (email, fieldName) => {
        const valid = /\S+@\S+\.\S/.test(email) 
        // verifica que sea un string (non-whitespace, minimo 3 chars de largo)+@+
        // string(minimo 4 chars de largo, max 15)+.+string(2-7 chars)
        if (valid) {
            setMessages(prevMessages => {delete prevMessages[fieldName];
                return ({...prevMessages})}) 
        } else {
            setMessages(prevMessages => ({...prevMessages, [fieldName]:"Please enter a valid email"}))
        }
    }

    const checkString = (string, fieldName) => {
        const valid = /\w{2,}/.test(string.trim()) //trim quita el whitespace del principio y final del string
        // verifica que sea incluya minimo 2 "word characters" (0-9, a-z, A-Z)
        if (valid) {
            setMessages(prevMessages => {delete prevMessages[fieldName];
                 return ({...prevMessages})})   
        } else {
            setMessages(prevMessages => ({...prevMessages, [fieldName]:"This is a required field"}))
        }
    }

    return {
        inputs,
        errorMessages,
        handleSubmit,
        handleInputChange
    }
}

export default useForm;