import Sequelize from 'sequelize';

import Service from '../app/models/Service';
import Provider from '../app/models/Provider';
import Customer from '../app/models/Customer';
import dbConfig from '../config/database';

const models = [Provider, Customer, Service];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dbConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
