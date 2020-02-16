import Customer from '../models/Customer';
import totalvoice from 'totalvoice-node';
import { totalVoiceToken } from '../../config/totalvoiceToken';

const client = new totalvoice(totalVoiceToken);

class CustomerController {
  async store(req, res) {
    const customerExists = await Customer.findOne({
      where: {
        email: req.body.email,
        telephone: req.body.telephone,
        cep: req.body.cep,
      },
    });

    const sms = await client.sms.buscar(req.body.sms_id);

    const smsToken = sms.dados.mensagem.substr(35, 4);

    if (req.body.token !== smsToken) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    if (customerExists) {
      return res.json(customerExists);
    }

    const customer = await Customer.create(req.body);

    return res.json(customer);
  }
}

export default new CustomerController();
