const MessageComposer = require('../MessageComposer');
const Outgoing = require('../Outgoing').getInstance();

class GetFurniAliasesComposer extends MessageComposer {
  constructor() {
    super();
  }

  compose() {
    this.response.init(Outgoing.GetFurniAliases);
  }
}

module.exports = GetFurniAliasesComposer;