
import { ErrorMessages } from "../../interfaces";

interface InputProps{
    id: string;
    placeholder: string;
    errorsMessage: ErrorMessages[];
    handleChange:(key: string, e: React.ChangeEvent<HTMLInputElement>) => void;
    checkEmptyField: (id: string, value: string) => void;
    checkFieldLength: (id: string, value: string, min?: number, max?: number) => void;
    formatInputTextToNumber?: (e: React.FormEvent<HTMLInputElement>) => void;
    checkValidMonthDate?:  (id: string, value: string) => void;
    checkValidYearDate?: (id: string, value: string) => void;
    maxFieldLength?: number;
    minFieldLength?: number;
    name: string;
}
export default function Input({
    id,
    placeholder,
    name,
    errorsMessage,
    handleChange,
    checkEmptyField,
    checkFieldLength,
    formatInputTextToNumber,
    checkValidMonthDate,
    checkValidYearDate,
    minFieldLength,
    maxFieldLength,

}: InputProps) {

  return (
    <>
    <input 
        type="text" 
        name={name}
        id={id} 
        placeholder={placeholder}
        // onChange={(e) => handleChange('cardName', e)}
        className={errorsMessage.find(err => err.type === id) ? 'input-error' : ''}
        onInput={e => formatInputTextToNumber && formatInputTextToNumber(e)}
        onChange={e => handleChange(id, e)}
        onBlur={(e) => {
            checkEmptyField(e.currentTarget.id, e.currentTarget.value)
            checkFieldLength(e.currentTarget.id, e.currentTarget.value, minFieldLength, maxFieldLength)
            checkValidMonthDate && checkValidMonthDate(e.currentTarget.id, e.currentTarget.value)
            checkValidYearDate && checkValidYearDate(e.currentTarget.id, e.currentTarget.value)
        }}

        maxLength={maxFieldLength && maxFieldLength}
    />
    </>
  )
}
