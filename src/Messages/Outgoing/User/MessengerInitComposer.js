const MessageComposer = require('../MessageComposer');
const Outgoing = require('../Outgoing').getInstance();

class MessengerInitComposer extends MessageComposer {
  constructor() {
    super();
  }

  compose() {
    this.response.init(Outgoing.MessengerInit);
  }
}

module.exports = MessengerInitComposer;