import IComplete from '../../assets/images/icon-complete.svg'
import Button from '../Button'

export default function Thanks() {
  return (
    <div className="tanks">
        <img src={IComplete} alt="icon complete" />
        <h1>Thank You!</h1>
        <p>we've added your card details</p>

        <Button text='Continue' />
    </div>
  )
}
