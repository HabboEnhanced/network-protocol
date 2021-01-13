const GameEndpoints = require('./GameEndpoints');
const Network = require('./Network');

class Client extends EventTarget {
  constructor(country, ssoTicket) {
    super();
    this.network = new Network(this, GameEndpoints.getEndpointByCountry(country), ssoTicket);
  }

  async connect() {
    await this.network.connect();
  }
}

module.exports = Client;