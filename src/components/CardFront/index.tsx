import { CardProps } from "../../interfaces";

export default function CardFront ({ formData }: CardProps) {
    const formattedNumber = `${formData.cardnumber.slice(0, 4)}  ${formData.cardnumber.slice(4, 8)}  ${formData.cardnumber.slice(8, 12)}  ${formData.cardnumber.slice(12, 16)}`
    const fomattedMonth = formData.expDate.month.length > 2 ? formData.expDate.month.slice(0, -1) : formData.expDate.month;
    const fomattedYear = formData.expDate.year.length > 2 ? formData.expDate.year.slice(0, -1) : formData.expDate.year;
    return (
        <div className="card-front">
            <div className="card-brand">
                <div></div>
                <div></div>
            </div>

            <div className="card-info">
                <p className="card-number">{formData.cardnumber ? formattedNumber : '0000 0000 0000 0000'}</p>
                <p className="card-name">{formData.cardname ? formData.cardname : 'Jane Appleseed'}</p>
                <p className="card-date">{formData.expDate.month ? fomattedMonth : '00'} / {formData.expDate.year ? fomattedYear : '00'}</p>
            </div>
        </div>
    )
}