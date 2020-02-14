import Sequelize from 'sequelize';

import Provider from '../app/models/Provider';
import dbConfig from '../config/database';

const models = [Provider];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dbConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
