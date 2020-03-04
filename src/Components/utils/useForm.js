import {useState, useEffect} from 'react';
import useValidation from './formValidation';

function useForm(callback, FormFields, EditFields){

    const [inputs, setInputs] = useState({}); // aqui guardaremos los valores de todos nuestros inputs
    
    useEffect(() => {
        let theseInputs = {};
        if (FormFields) {
            FormFields.map(({name}) => theseInputs[name] = "")
        }
        setInputs(theseInputs);
    }, []) // solo corre una vez al montar, sin dependencias (para establecer los controlled inputs)
   // ejemplo de inputs si mandamos los FormFields: {"first_name":"", "last_name":""}

       const inputsToValidate = FormFields ? FormFields.filter(field=>field.required) : null;
    /* filtra FormFields para solo tener los inputs de los fields que marcamos como required y lo
     regresa en un array con inputsToValidate (validaremos TODO el form, pero solo las fields que son required)
      si no pasamos FormFields es por que no queremos validar este form y inputsToValidate es null*/

      const inputsToConfirm = EditFields ? EditFields.map(({name, validationType})=> ({[name]:validationType})) : null
      /* EditFields es para no validar todos los campos en el form. SOLO validamos los campos que se van
       ingresando (para EditItem), pero TODOS los inputs populados se validan */

    const { isValidated, errorMessages } = useValidation(inputs, inputsToValidate, inputsToConfirm)


    const handleSubmit = (event) => {
        if (event) event.preventDefault(); // prevents refresh
        if (isValidated) callback(inputs)  
        // el callback es el handleSubmit(AddItem/EditItem) que le pasamos al momento de usar el hook
        // solo debe correr si ya ha sido validado ell form (si es que lo requiere)
    }


    const handleInputChange = (event) => {
        event.persist(); // persists the value of your inputs in the virtual dom
        const {name, value } = event.target // extraemos el nombre y valor del evento y lo seteamos en el state
        // bajo "inputs" para retornar este estado al form al momento de usar el hook
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