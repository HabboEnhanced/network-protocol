const MessageComposer = require('../MessageComposer');
const Outgoing = require('../Outgoing').getInstance();

class InitDhHandshakeComposer extends MessageComposer {
  constructor() {
    super();
  }

  compose() {
    this.response.init(Outgoing.InitDhHandshake);
  }
}

module.exports = InitDhHandshakeComposer;