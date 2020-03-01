import {useState} from 'react';

function useForm(callback){

    const [inputs, setInputs] = useState({}); 
    
    const handleSubmit = (event) => {
        if (event) event.preventDefault(); // prevents refresh
        console.log(inputs)
        callback(inputs);
    }

    const handleInputChange = (event) => {
        event.persist(); // persists the value of your inputs in the virtual dom
        const {name, value} = event.target
        setInputs(prevInputs => ({...prevInputs, [name]:value}))
        console.log(inputs)
    }

    return {
        inputs,
        handleSubmit,
        handleInputChange
    }
}

export default useForm;