import { useState } from "react"



type ErrorMessages = {
    type: string,
    errorMessage: string
}

export const useValidForm = () => {

    const [errorsMessage, setErrorsMessage] = useState<ErrorMessages[]>([])


    const clearErrors = (id: string) => {
        const error = errorsMessage.filter(err => err.type === id)
        console.log(error)
        if(error.length > 0){
            const errors = [...errorsMessage]
            for(const err of error){
                const index = errorsMessage.indexOf(err);
                setErrorsMessage(errors.splice(0, index));
            }
        }
    }

    const checkEmptyField = (id: string, value: string) => {
        if(value.length === 0){
            setErrorsMessage([...errorsMessage, {type: id, errorMessage: 'O campo não pode estar vazio'}])
            return;
        }

        clearErrors(id)
    }

    const checkFieldLength = (id: string, value: string, min?: number, max?: number) => {
        if(min && value.length < min){
            setErrorsMessage([...errorsMessage, {type: id, errorMessage: `O campo deve ter ao menos ${min} caracteres`}])
            return;
        } 

        if(max && value.length > max){
            setErrorsMessage([...errorsMessage, {type: id, errorMessage: `O campo deve ter no maximo ${max} caracteres`}])
            return;
        } 

        clearErrors(id);
    }
    
    const checkValidYearDate  = ( id: string, value: string) => {
        const currentYear = new Date().getFullYear().toString().slice(2, 4)
        
        if(Number(value) < Number(currentYear)){
            setErrorsMessage([...errorsMessage, {type: id, errorMessage: `Ano Invalido`}])
            return;
        }
        clearErrors(id);
    }
    
    const checkValidMonthDate  = ( id: string, value: string) => {

        if(Number(value) > 12){
            setErrorsMessage([...errorsMessage, {type: id, errorMessage: `Mês Invalido`}])
            return;
        }
        clearErrors(id);

    }

    return {
        errorsMessage,
        checkEmptyField,
        checkFieldLength,
        checkValidYearDate,
        checkValidMonthDate
    }
} 
