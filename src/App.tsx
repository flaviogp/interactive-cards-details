import { useState } from 'react'
import CardSection from "./containers/CardSection"
import FormSection from "./containers/FormSection"
import { FormData } from "./interfaces"
import TanksSection from './containers/TanksSection'

function App() {
  const [sendForm, setSendForm] = useState(true)
  const [formData, setFormData] = useState<FormData>({
    cardName: '',
    cardNumber: '',
    expDate: {
        month: '',
        year: ''
    },
    cvc: '',
})
  return (
    <div className="app">
      <CardSection formData={formData}/>
      { 
        !sendForm ? 
          <FormSection setFormData={setFormData} formData={formData} setSendForm={setSendForm}/>
        :
          <TanksSection />
        
        }
    </div>
  )
}

export default App
