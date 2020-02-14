import Provider from '../models/Provider';

class ProviderController {
  async index(req, res) {
    const providers = await Provider.findAll();

    return res.json(providers);
  }
}

export default new ProviderController();
