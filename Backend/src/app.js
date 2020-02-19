import express from 'express';
import routes from './routes';
import cors from 'cors';

import './database';

class App {
  constructor() {
    this.server = express();
    this.cors();
    this.middlewares();
    this.routes();
  }

  cors() {
    this.server.use(cors({ origin: 'http://localhost:3000' }));
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
