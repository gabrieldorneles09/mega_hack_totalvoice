import { Router } from 'express';

import ProviderController from './app/controllers/ProviderController';

const routes = new Router();

import Provider from './app/models/Provider';
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

export default routes;
