const MessageComposer = require('../MessageComposer');
const Outgoing = require('../Outgoing').getInstance();

class PongComposer extends MessageComposer {
  constructor() {
    super();
  }

  compose() {
    this.response.init(Outgoing.Pong);
  }
}

module.exports = PongComposer;