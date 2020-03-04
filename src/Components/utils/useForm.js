import {useState, useEffect} from 'react';
import useValidation from './formValidation';

function useForm(callback, FormFields){

    const [inputs, setInputs] = useState({}); // aqui guardaremos los valores de todos nuestros inputs
    
    useEffect(() => {
        let theseInputs = {};
        if (FormFields) {
            FormFields.map(({name}) => theseInputs[name] = "")
        }
        setInputs(theseInputs);
    }, []) // solo corre una vez al montar, sin dependencias (para establecer los controlled inputs)
   

    const { isValidated, errorMessages } = useValidation(inputs, FormFields)

    const handleSubmit = (event) => {
        if (event) event.preventDefault(); // prevents refresh
        if (isValidated) callback(inputs)
    }


    const handleInputChange = (event) => {
        event.persist(); // persists the value of your inputs in the virtual dom
        const {name, value } = event.target
        setInputs(prevInputs => ({...prevInputs, [name]:value})) 
    }

    return {
        inputs,
        errorMessages,
        handleSubmit,
        handleInputChange
    }
}

export default useForm;