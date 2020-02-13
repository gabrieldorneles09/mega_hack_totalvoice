import { Router } from 'express';

const routes = new Router();

// rotas

routes.get('/', function (req, res) {
  res.send('Backend');
});

export default routes;
