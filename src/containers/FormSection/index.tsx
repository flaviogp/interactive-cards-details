import Form from "../../components/Form";
import { FormProps } from "../../interfaces";
import Thanks from "../../components/Thanks";


export default function FormSection ({ sendForm, setSendForm, setFormData, formData }: FormProps) {
    return (
        <section className="form-section">
            {!sendForm ?
                <Form setFormData={setFormData} formData={formData} setSendForm={setSendForm}/>
                :
                <Thanks />
            }
        </section>
    )
}