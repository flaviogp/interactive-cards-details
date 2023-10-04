import IComplete from '../../assets/images/icon-complete.svg'

export default function TanksSection() {
  return (
    <div className="tanks-section">
        <img src={IComplete} alt="icon complete" />
        <h1>Tank You!</h1>
        <p>we've added your card details</p>

        <button>Continue</button>
    </div>
  )
}
