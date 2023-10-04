import { CardProps } from "../../interfaces";
import CardsContainer from "../CardsContainer";



export default function CardSection ({ formData }: CardProps) {
    return (
        <section className="card-section">
            <CardsContainer formData={formData}/>
        </section>
    )
}