import Sequelize, { Model } from 'sequelize';

class Provider extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        cidade: Sequelize.STRING,
        cnpj: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

export default Provider;
