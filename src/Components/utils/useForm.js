import {useState, useEffect} from 'react';
import useValidation from './formValidation';

function useForm(callback, FormFields){

    const [inputs, setInputs] = useState({}); // aqui guardaremos los valores de todos nuestros inputs

    useEffect(() => {
        let theseInputs = {};
        FormFields.map(({name, required}) => {
            if (required) theseInputs[name] = "";
        })
        setInputs(theseInputs);
        return () => {
            setInputs({})
        };
    }, []) // solo corre una vez al montar (setInputs(theseInputs) y una vez al desmontar (setInputs({}))
   

    const { isValidated, errorMessages, handleValidation } = useValidation(inputs)

    const handleSubmit = (event) => {
        if (event) event.preventDefault(); // prevents refresh
        console.log(errorMessages)

        if (isValidated) callback(inputs)
    }


    const handleInputChange = (event) => {
        event.persist(); // persists the value of your inputs in the virtual dom
        const {name, value, required} = event.target
        setInputs(prevInputs => ({...prevInputs, [name]:value}), 
                                handleValidation(value, name, required)) 

    }

    return {
        inputs,
        errorMessages,
        handleSubmit,
        handleInputChange
    }
}

export default useForm;