import Sequelize, { Model } from 'sequelize';

class Service extends Model {
  static init(sequelize) {
    super.init(
      {
        tipo: Sequelize.STRING,
        megas: Sequelize.STRING,
        velocidade_download: Sequelize.STRING,
        velocidade_upload: Sequelize.STRING,
        preco: Sequelize.FLOAT,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Provider, {
      foreignKey: 'empresa_id',
      as: 'provider',
    });
  }
}

export default Service;
