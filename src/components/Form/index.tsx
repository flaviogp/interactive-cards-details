import { ChangeEvent, FormEvent } from "react";
import { FormProps } from "../../interfaces";
import {useValidForm} from '../../hooks/useValidForm'
import Input from "../Input";
import Button from "../Button";

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
        if(formData.cardname.length === 0 ||
            formData.cardnumber.length === 0 ||
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
        console.log(formData)
    }

    return(
        <div className="form-container">
            <form className="form" onSubmit={e => handleSubmit(e)}>

            <label htmlFor="name">
                <p>CARDHOLDER NAME</p>
                <Input
                    id='cardname'
                    placeholder="e.g. Jane Appleseed"
                    name="name"
                    errorsMessage={errorsMessage}
                    checkEmptyField={checkEmptyField}
                    checkFieldLength={checkFieldLength}
                    minFieldLength={3}
                    handleChange={handleChange}
                />
                
                {
                    errorsMessage.find(err => err.type === 'cardname') && 
                        <p className="error">{errorsMessage.find(err => err.type === 'cardname')?.errorMessage}</p>
                }
            </label>


            <label htmlFor="number">
                <p>CARD NUMBER</p>
                <Input
                    id='cardnumber'
                    placeholder="e.g. 1234 5678 9123 0000"
                    name='number'
                    errorsMessage={errorsMessage}
                    // handleChange,
                    checkEmptyField={checkEmptyField}
                    checkFieldLength={checkFieldLength}
                    formatInputTextToNumber={formatInputTextToNumber}
                    minFieldLength={16}
                    maxFieldLength={16}
                    handleChange={handleChange}
                />

                {
                    errorsMessage.find(err => err.type === 'cardnumber') && 
                        <p className="error">{errorsMessage.find(err => err.type === 'cardnumber')?.errorMessage}</p>
                }
            </label>

            <label htmlFor="date">
                <p>EXP. DATE (MM/YY)</p>
                <div>
                    <Input
                        id='month'
                        placeholder="MM"
                        name="date"
                        errorsMessage={errorsMessage}
                        // handleChange,
                        checkEmptyField={checkEmptyField}
                        checkFieldLength={checkFieldLength}
                        formatInputTextToNumber={formatInputTextToNumber}
                        minFieldLength={2}
                        maxFieldLength={2}
                        checkValidMonthDate={checkValidMonthDate}
                        handleChange={handleChange}
                        />
                    <Input
                        id='year'
                        placeholder="YY"
                        name="date"
                        errorsMessage={errorsMessage}
                        // handleChange,
                        checkEmptyField={checkEmptyField}
                        checkFieldLength={checkFieldLength}
                        formatInputTextToNumber={formatInputTextToNumber}
                        minFieldLength={2}
                        maxFieldLength={2}
                        checkValidYearDate={checkValidYearDate}
                        handleChange={handleChange}
                        />
                </div>
                         
                {
                    errorsMessage.find(err => err.type === 'month') && 
                        <p className="error">{errorsMessage.find(err => err.type === 'month')?.errorMessage}</p>
                    ||
                    errorsMessage.find(err => err.type === 'year') && 
                        <p className="error">{errorsMessage.find(err => err.type === 'year')?.errorMessage}</p>
                }

            </label>


            <label htmlFor="cvc">
                <p>CVC</p>

                <Input
                    id='cvc'
                    placeholder="123"
                    name='cvc'
                    errorsMessage={errorsMessage}
                    // handleChange,
                    checkEmptyField={checkEmptyField}
                    checkFieldLength={checkFieldLength}
                    formatInputTextToNumber={formatInputTextToNumber}
                    minFieldLength={3}
                    maxFieldLength={3}
                    handleChange={handleChange}
                />

                {
                    errorsMessage.find(err => err.type === 'cvc') && 
                        <p className="error">{errorsMessage.find(err => err.type === 'cvc')?.errorMessage}</p>
                }

            </label>
            <Button text='Confirm' />
            </form>
        </div>
    )
}


                {/* <label htmlFor="name">
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
                </label> */}
