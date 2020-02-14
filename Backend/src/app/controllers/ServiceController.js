import Service from '../models/Service';
import Provider from '../models/Provider';

class ServiceController {
  async index(req, res) {
    const services = await Service.findAll({
      where: {
        empresa_id: req.params.id,
      },
      include: [
        {
          model: Provider,
          as: 'provider',
          attributes: ['id', 'name', 'cidade', 'cnpj'],
        },
      ],
    });

    return res.json(services);
  }
}

export default new ServiceController();
