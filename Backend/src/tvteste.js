const totalvoice = require('totalvoice-node');
const { totalVoiceToken } = require('./config/totalvoiceToken');
const client = new totalvoice(totalVoiceToken);
const phoneToken = require('generate-sms-verification-code');

async function start() {
  const generatedToken = phoneToken(4, { type: 'number' });
  const data = await client.sms.enviar(
    '11986936992',
    `Este é o seu token para validação: ${generatedToken}`
  );

  const sms = await client.sms.buscar(data.dados.id);

  console.log(sms.dados.mensagem.substr(35, 4));
  console.log(generatedToken);

  if (sms.dados.mensagem.substr(35, 4) == generatedToken) {
    console.log('Validado');
  } else {
    console.log('Incorreto!');
  }
}

start();
