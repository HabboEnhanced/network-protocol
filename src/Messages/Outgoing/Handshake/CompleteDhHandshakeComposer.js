const MessageComposer = require('../MessageComposer');
const Outgoing = require('../Outgoing').getInstance();

class CompleteDhHandshakeComposer extends MessageComposer {
  constructor(clientPublicKey) {
    super();
    this.clientPublicKey = clientPublicKey;
  }

  compose() {
    this.response.init(Outgoing.CompleteDhHandshake);
    this.response.appendString(this.clientPublicKey);
  }
}

module.exports = CompleteDhHandshakeComposer;