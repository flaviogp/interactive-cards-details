export interface FormData{
    cardname: string;
    cardnumber: string;
    expDate: {
        month: string;
        year: string;
    }
    cvc: string
}
export interface FormProps{
    setFormData: (arg: FormData) => void;
    formData: FormData;
    setSendForm: (arg: boolean) => void;
    sendForm?: boolean
}
export interface CardProps{
    formData: FormData;
}


export interface ErrorMessages {
    type: string,
    errorMessage: string
}