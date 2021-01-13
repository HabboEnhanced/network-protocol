const MessageComposer = require('../MessageComposer');
const Outgoing = require('../Outgoing').getInstance();

class InfoRetrieveComposer extends MessageComposer {
  constructor() {
    super();
  }

  compose() {
    this.response.init(Outgoing.InfoRetrieve);
  }
}

module.exports = InfoRetrieveComposer;