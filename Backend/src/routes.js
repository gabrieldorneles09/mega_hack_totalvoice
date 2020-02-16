import { Router } from 'express';

import ProviderController from './app/controllers/ProviderController';
import SmsController from './app/controllers/SmsController';
import CustomerController from './app/controllers/CustomerController';
import ServiceController from './app/controllers/ServiceController';

import generateToken from './app/middlewares/generateToken';
import Provider from './app/models/Provider';

const routes = new Router();

// rotas

routes.get('/', async (req, res) => {
  const provider = await Provider.create({
    name: 'Claro',
    cidade: 'São Paulo',
    cnpj: '09333333/0001-20',
  });
  res.json(provider);
});

routes.get('/providers', ProviderController.index);
routes.post('/sms', generateToken, SmsController.store);
routes.post('/customers', CustomerController.store);
routes.get('/services/:id', ServiceController.index);

export default routes;
