import CardBack from "../../components/CardBack";
import CardFront from "../../components/CardFront";
import { CardProps } from "../../interfaces";



export default function CardsContainer ({ formData }: CardProps) {
    return (
        <div className="cards-container">
            <CardFront formData={formData}/>
            <CardBack formData={formData}/>
        </div>
    )
}