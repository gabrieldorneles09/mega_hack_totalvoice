import totalvoice from 'totalvoice-node';
import { totalVoiceToken } from '../../config/totalvoiceToken';

const client = new totalvoice(totalVoiceToken);

class SmsController {
  async store(req, res) {
    const { telephone } = req.body;
    const token = req.token;

    const data = await client.sms.enviar(
      telephone,
      `Este é o seu token para validação: ${token}`
    );

    return res.json(data.dados.id);
  }
}

export default new SmsController();
