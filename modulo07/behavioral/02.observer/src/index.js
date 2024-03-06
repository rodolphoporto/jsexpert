import Payment from "./events/payment.js";
import Marketing from "./observers/marketing.js";
import Shipment from "./observers/shipment.js";
import PaymentSubject from "./subjects/paymentSubject.js";

const subject = new PaymentSubject()
const marketing = new Marketing()
subject.subscribe(marketing)

const shipment = new Shipment()
subject.subscribe(shipment)

const payment = new Payment(subject)
const data = { userName: 'rodolphoporto', id: Date.now() }
payment.creditCard(data)

subject.unsubscribe(marketing)
// só vai disparar para o shipment
payment.creditCard({ userName: 'valzinha', id: Date.now() })