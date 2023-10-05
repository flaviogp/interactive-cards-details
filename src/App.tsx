import { useState } from 'react'
import CardSection from "./containers/CardSection"
import FormSection from "./containers/FormSection"
import { FormData } from "./interfaces"

function App() {
  const [sendForm, setSendForm] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    cardname: '',
    cardnumber: '',
    expDate: {
        month: '',
        year: ''
    },
    cvc: '',
})
  return (
    <div className="app">
      <CardSection formData={formData}/>
      <FormSection setFormData={setFormData} formData={formData} setSendForm={setSendForm} sendForm={sendForm}/>
    </div>
  )
}

export default App
