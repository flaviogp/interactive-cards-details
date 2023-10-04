import { ChangeEvent, FormEvent } from "react";
import { FormProps } from "../../interfaces";
import {useValidForm} from '../../hooks/useValidForm'

export default function Form ({ setFormData, formData, setSendForm }: FormProps) {
    const { errorsMessage, 
            checkEmptyField, 
            checkFieldLength, 
            checkValidYearDate, 
            checkValidMonthDate
        } = useValidForm();

    const formatInputTextToNumber = (e:FormEvent<HTMLInputElement>) => {
        return  e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')   

    }
    const handleChange = (key: string, e: ChangeEvent<HTMLInputElement>) => { 
        const value = e.target.value

        if(key === 'month' || key === 'year') return changeExpDate(key, value);

        return setFormData({...formData, [key]: value})

    }
    
    const changeExpDate = (key: string, value: string) => {
        return setFormData({...formData, expDate: {...formData.expDate, [key]: value}})
    }
    const preventSubmitVoidForm = (): boolean =>{
        if(formData.cardName.length === 0 ||
            formData.cardNumber.length === 0 ||
            formData.expDate.month.length === 0 ||
            formData.expDate.year.length === 0 ||
            formData.cvc.length === 0) return false;

            return true
    } 
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(errorsMessage.length !== 0) return;
        if(!preventSubmitVoidForm()) return;
        setSendForm(true);
        console.log("enviado")
    }
    return(
        <div className="form-container">
            <form className="form" onSubmit={e => handleSubmit(e)}>
                <label htmlFor="name">
                    <p>CARDHOLDER NAME</p>
                    <input 
                        type="text" 
                        name="name"
                        id="cardhold-name" 
                        placeholder="e.g. Jane Appleseed"
                        onChange={(e) => handleChange('cardName', e)}
                        className={errorsMessage.find(err => err.type === 'cardhold-name') ? 'input-error' : ''}
                        onBlur={(e) => {
                            checkEmptyField(e.currentTarget.id, e.currentTarget.value)
                            checkFieldLength(e.currentTarget.id, e.currentTarget.value, 3)
                        }}
                    />
                    {
                        errorsMessage.find(err => err.type === 'cardhold-name') && 
                            <p className="error">{errorsMessage.find(err => err.type === 'cardhold-name')?.errorMessage}</p>
                    }
                </label>
                <label htmlFor="number">
                    <p>CARD NUMBER</p>
                    <input 
                        type="text" 
                        name="number" 
                        id="card-number" 
                        placeholder="e.g. 1234 5678 9123 0000"
                        maxLength={16}
                        onInput={e => formatInputTextToNumber(e)}
                        onChange={(e) => handleChange('cardNumber', e)}
                        className={errorsMessage.find(err => err.type === 'card-number') ? 'input-error' : ''}
                        onBlur={e => {
                            checkEmptyField(e.currentTarget.id, e.currentTarget.value)
                            checkFieldLength(e.currentTarget.id, e.currentTarget.value, 16, 16)
                        }}
                    />
                    {
                        errorsMessage.find(err => err.type === 'card-number') && 
                            <p className="error">{errorsMessage.find(err => err.type === 'card-number')?.errorMessage}</p>
                    }

                </label>
                <label htmlFor="date">
                    <p>EXP. DATE (MM/YY)</p>
                    <div>
                        <input 
                            type="text" 
                            name="date" 
                            id="month"  
                            placeholder="MM"
                            maxLength={2}
                            onInput={e => formatInputTextToNumber(e)}    
                            onChange={(e) => handleChange('month', e)}
                            className={errorsMessage.find(err => err.type === 'month') ? 'input-error' : ''}
                            onBlur={e => {
                                checkEmptyField(e.currentTarget.id, e.currentTarget.value)
                                checkFieldLength(e.currentTarget.id, e.currentTarget.value, 2, 2)
                                checkValidMonthDate(e.currentTarget.id, e.currentTarget.value)
                            }}
    
                            />
                        <input 
                            type="text" 
                            name="date" 
                            id="year" 
                            placeholder="YY"
                            maxLength={2}
                            onInput={e => formatInputTextToNumber(e)}    
                            onChange={(e) => handleChange('year', e)}                
                            className={errorsMessage.find(err => err.type === 'year') ? 'input-error' : ''}   
                            onBlur={(e) => {
                                checkValidYearDate(e.currentTarget.id, e.currentTarget.value)
                                checkEmptyField(e.currentTarget.id, e.currentTarget.value)
                                checkFieldLength(e.currentTarget.id, e.currentTarget.value, 2, 2)
                            }}           
                            />
                    </div>
                    {
                        errorsMessage.find(err => err.type === 'year') && 
                            <p className="error">{errorsMessage.find(err => err.type === 'year')?.errorMessage}</p>
                        ||
                        errorsMessage.find(err => err.type === 'month') && 
                        <p className="error">{errorsMessage.find(err => err.type === 'month')?.errorMessage}</p>
                    }
                    {/* {
                        errorsMessage.find(err => err.type === 'month') && 
                            <p className="error">{errorsMessage.find(err => err.type === 'month')?.errorMessage}</p>
                    } */}
                </label>
                <label htmlFor="cvc">
                    <p>CVC</p>
                    <input 
                        type="text" 
                        name="cvc" 
                        id="cvc" 
                        placeholder="e.g. 123"
                        maxLength={3}
                        onInput={e => formatInputTextToNumber(e)}    
                        onChange={(e) => handleChange('cvc', e)}
                        className={errorsMessage.find(err => err.type === 'cvc') ? 'input-error' : ''}
                        onBlur={e => {
                            checkEmptyField(e.currentTarget.id, e.currentTarget.value)
                            checkFieldLength(e.currentTarget.id, e.currentTarget.value, 3, 3)
                        }}

                    />
                    {
                        errorsMessage.find(err => err.type === 'cvc') && 
                            <p className="error">{errorsMessage.find(err => err.type === 'cvc')?.errorMessage}</p>
                    }
                </label>

                <button>
                    confirm
                </button>
            </form>
        </div>
    )
}
