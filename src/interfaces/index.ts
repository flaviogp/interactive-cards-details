export interface FormData{
    cardName: string;
    cardNumber: string;
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
}
export interface CardProps{
    formData: FormData;
}

// export interface IErrors{
//     cardnameError: string;
//     cardNumberError: string;
//     expDateMonthError: string;
//     expDateYearError: string;
//     cvcError: string;
// }