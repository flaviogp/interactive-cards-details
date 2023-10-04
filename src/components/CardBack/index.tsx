import { CardProps } from "../../interfaces";

export default function CardBack ({ formData }: CardProps) {
    const fomattedCvc = formData.cvc.length > 3 ? formData.cvc.slice(0, -1) : formData.cvc;
    return (
        <div className="card-back">
            {/* <p className="cvc">{formData.cvc}</p> */}
            <p className="cvc">{formData.cvc ? fomattedCvc : '123'}</p>
        </div>
    )
}